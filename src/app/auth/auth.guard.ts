import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

import * as fromRoot from '../app.reducer';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad
{

  constructor(private store: Store<fromRoot.State>, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.isAuth())
    //   return true;
    // else
    // {
    //   this.router.navigate(['/login']);
    // }



    return this.store.select(fromRoot.getIsAuth).pipe(take(1)); //returns observable
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.isAuth())
    //   return true;
    // else
    // {
    //   this.router.navigate(['/login']);
    // }
    return this.store.select(fromRoot.getIsAuth).pipe(take(1)); //returns observable


  }

}
