import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import * as _ from 'lodash';
import { map } from 'rxjs/operators';
//import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    //private notification: NzNotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authenticationService.isAuthenticated) {
      const userPermissions = this.authenticationService.hasPermission;
      const allowedPermission = route.data['permission'].map((res: string) =>
        res.toLowerCase()
      );
      const userPermission = _.map(
        userPermissions,
        'name'
      ).map((res: any) => res.toLowerCase());
      const isUserAllowed =
        _.intersection(allowedPermission, userPermission).length > 0;

      if (isUserAllowed) {
        return isUserAllowed;
      }
    }

    //this.notification.warning("You don't have this access", 'Access Denied');
    this.router.navigate(['/']);
    return false;
  }
}
