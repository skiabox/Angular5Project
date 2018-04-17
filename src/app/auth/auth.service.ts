import { Injectable } from '@angular/core';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {

  // public authChange = new Subject<boolean>();
  //
  // private isAuthenticated: boolean = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UiService,
              private store: Store<fromRoot.State>) {
  }

  //methods
  public initAuthListener() {
    this.afAuth.authState.subscribe(
      user => {
        if (user) {
          // this.isAuthenticated = true;
          // this.authChange.next(true);
          this.store.dispatch(new Auth.SetAuthenticated());
          this.router.navigate(['/training']);
        }
        else {
          this.trainingService.cancelSubscriptions();
          // this.authChange.next(false);
          this.store.dispatch(new Auth.SetUnauthenticated());
          this.router.navigate(['/login']);
          // this.isAuthenticated = false;
        }
      }
    );
  }


  public registerUser(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);

    // dispatch start loading action
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // --old code-- this.uiService.loadingStateChanged.next(false);

        //dispatch stop loading action
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // --old code-- this.uiService.loadingStateChanged.next(false);

        //dispatch stop loading action when I catch an error
        this.store.dispatch(new UI.StopLoading());

        this.uiService.showSnackbar(error.message, null, 3000);
        // this.snackbar.open(error.message, null, {
        //   duration: 3000
        // });
      });
  }

  public login(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);

    // dispatch an action
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);

        // dispatch an action
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);

        // dispatch an action
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  // public isAuth(): boolean {
  //   return this.isAuthenticated;
  // }


}

