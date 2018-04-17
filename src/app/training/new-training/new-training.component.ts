import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {UiService} from '../../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  public exercises: Exercise[];
  private exerciseSubscription: Subscription;

  public isLoading$: Observable<boolean>;

  //private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => {
    //     this.isLoading = isLoading;
    //   }
    // );
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    //this.exercises = this.trainingService.getAvailableExercises();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });

    this.fetchExercises();
  }

  ngOnDestroy() {
    // this.loadingSubs.unsubscribe();
    if (this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();

    // if (this.loadingSubscription)
    //   this.loadingSubscription.unsubscribe();
  }

  //methods
  public onStartTraining(form: NgForm): void
  {
    this.trainingService.startExercise(form.value.exercise);
  }

  public fetchExercises(): void
  {
    this.trainingService.fetchAvailableExercises();
  }

}
