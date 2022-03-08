import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import * as _ from 'lodash';
//import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService } from "src/app/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    //private notification: NzNotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }

  createNotification(type = 'info', title:string, message: string): void {
    // this.notification.create(
    //   type,
    //   title,
    //   message
    // );
  }

}
