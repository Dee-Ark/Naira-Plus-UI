import {
  TemplateRef,
  ViewContainerRef,
  Directive,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[rbacAllow]'
})
export class RbacAllowDirective implements OnDestroy, OnInit {
  allowedRoles!: string[];
  userPermissions: any;

  sub!: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.userPermissions = this.authenticationService.hasPermission;
    this.showIfUserAllowed();
  }

  ngOnInit() {
    console.log('rbacallow', this.allowedRoles);
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
    this.showIfUserAllowed();
  }

  @Input()
  set rbacAllow(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
    this.showIfUserAllowed();
  }

  showIfUserAllowed() {
    console.log("this.userPermissions.data", this.userPermissions)
    if (
      !this.allowedRoles ||
      this.allowedRoles.length === 0 ||
      !this.userPermissions
    ) {
      this.viewContainer.clear();
      return;
    }

    const isUserAllowed =
      _.intersection(
        this.allowedRoles,
        _.map(this.userPermissions, 'name')
      ).length > 0;
    console.log('isUserAllowed', _.map(this.userPermissions, 'name'));
    if (isUserAllowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
