import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { PermissionType } from '../shared/constant/roles';
import { Operator } from '../shared/constant/global';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) { }

  /**
   * validate if user authenticated
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const isLoggedIn = await this.authService.isLoggedIn();

    const permissions = route.data.permissions as Array<PermissionType>;

    const permissionEvalMethod = route.data.condition as Operator;

    if (isLoggedIn) {
      let isUserAllowedToAccess = true;
      if (permissions) {
        if (permissionEvalMethod === Operator.Or) {
          isUserAllowedToAccess = this.authService.isAnyPermissionExists(permissions);
        } else {
          isUserAllowedToAccess = this.authService.isPermissionExists(permissions);
        }
      }
      return isUserAllowedToAccess;
    }

    this.authService.startAuthentication();
    return false;
  }
}
