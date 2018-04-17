import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';

import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  public sidenavToggle = new EventEmitter<void>();

  // public isAuth: boolean = false;
  public isAuth$: Observable<boolean>;

  public authSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

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
  public onToggleSidenav(): void
  {
    this.sidenavToggle.emit();
  }

  public onLogout(): void
  {
    this.authService.logout();
  }

}
