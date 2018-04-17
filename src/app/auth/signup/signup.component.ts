import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public maxDate;
  public isLoading$: Observable<boolean>;

  //private loadingSubs: Subscription;


  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => {
    //     this.isLoading = isLoading;
    //   }
    // );
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  // ngOnDestroy() {
  //   if (this.loadingSubs)
  //     this.loadingSubs.unsubscribe();
  // }

  //methods
  public onSubmit(form: NgForm): void
  {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
