import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  public displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  public dataSource = new MatTableDataSource<Exercise>();

  private exChangedSubscription: Subscription;

  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });

    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngOnDestroy() {
    if (this.exChangedSubscription)
      this.exChangedSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //methods
  public doFilter(filterValue: string): void
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
