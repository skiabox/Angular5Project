import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UiService {

  //public loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) { }

  //methods
  public showSnackbar(message, action, duration): void
  {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }

}
