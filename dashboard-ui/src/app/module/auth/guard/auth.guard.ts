import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../shared/authentication/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  /**
   * Checks whether user has needed role and is logged in
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.tokenService.getUser();

    if (
      this.tokenService.isLoggedIn() &&
      route.data['roles'] &&
      route.data['roles'].includes(user?.role)
    ) {
      return true;
    }

    if (!this.tokenService.isLoggedIn()) {
      this.router.navigate([
        '/login',
        { queryParams: { returnUrl: state.url } },
      ]);
    } else {
      this.router.navigate(['/']);
    }

    return false;
  }
}
