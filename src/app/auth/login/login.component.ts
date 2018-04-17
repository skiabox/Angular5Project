import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoading$: Observable<boolean>;

  //private loadingSubs: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.store.subscribe(
      data => {
        console.log(data);
      }
    );

    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => {
    //     this.isLoading = isLoading;
    //   }
    // );
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  // ngOnDestroy() {
  //   if (this.loadingSubs)
  //     this.loadingSubs.unsubscribe();
  // }

  //methods
  public onSubmit(): void
  {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
