import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';

import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output()
  public closeSidenav = new EventEmitter<void>();

  // public isAuth: boolean = false;
  public isAuth$: Observable<boolean>;

  public authSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }

  //methods
  public onClose(): void
  {
    this.closeSidenav.emit();
  }

  public onLogout(): void
  {
    this.authService.logout();
    this.onClose();
  }
}
