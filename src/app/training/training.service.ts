import { Injectable } from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {UiService} from '../shared/ui.service';

import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class TrainingService {



  private runningExercise: Exercise;

  private availableExercises: Exercise[] = [];

  private fbSubs: Subscription[] = [];

  public exerciseChanged = new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  public finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromRoot.State>) { }

  //methods
  public fetchAvailableExercises()
  { //trying to fetch the collection
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db.collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {                  //Observables map
        return docArray.map(doc => {      //Array map
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories
          };
        });
      })
      .subscribe((exercises: Exercise[]) => {
        //collection fetched
        //this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        //this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
        this.exercisesChanged.next(null);
      })

    );
  }

  public startExercise(selectedId: string)
  {
    //add new field to document
    //this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  public getRunningExercise(): Exercise
  {
    return { ...this.runningExercise };
  }

  public completeExercise()
  {
    this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public cancelExercise(progress: number)
  {
    this.addDataToDatabase({ ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled' });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public fetchCompletedOrCancelledExercises()
  {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      })
    );
  }

  public cancelSubscriptions()
  {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise)
  {
    this.db.collection('finishedExercises').add(exercise);
  }
}
