import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent
  ]
})
export class AuthModule { }
