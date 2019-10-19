import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

import {AuthorizationService} from '../services/authorization/authorization.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthorizationService,
    private readonly router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.currentUser
      .pipe(
        map(user => !!user),
        tap((granted: boolean) => {
          if (!granted) {
            this.router.navigate(['/welcome']);
          }
        })
      );
  }


}
