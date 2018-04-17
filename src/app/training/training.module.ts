import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {TrainingComponent} from './training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StopTrainingComponent} from './stop-training/stop-training.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {SharedModule} from '../shared/shared.module';
import {TrainingRoutingModule} from './training-routing.module';
import {StoreModule} from '@ngrx/store';
import {trainingReducer} from './training.reducer';

@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
