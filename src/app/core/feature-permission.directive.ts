import {
  TemplateRef,
  ViewContainerRef,
  Directive,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
//import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[featurePermission]'
})
export class FeaturePermissionDirective implements OnDestroy, OnInit {
  allowedPermission!: string[];
  permission: any;

  sub!: Subscription;

  constructor(
    private authService:AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.permission = this.authService.hasPermission;
    this.showIfFeaturePermission();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.showIfFeaturePermission();
  }

  @Input()
  set featurePermission(allowedPermission: string[]) {
    this.allowedPermission = allowedPermission;
    this.showIfFeaturePermission();
  }

  showIfFeaturePermission() {
    if (
      !this.allowedPermission ||
      this.allowedPermission.length === 0 ||
      !this.permission
    ) {
      this.viewContainer.clear();
      return;
    }

    const getPermission = _.chain(this.permission)
      .filter(
        permission =>
          permission.name.toLowerCase() ===
          this.allowedPermission[0].toLowerCase()
      )
      .first()
      .value();
    const permit = _.has(getPermission, this.allowedPermission[1]);
    /* console.log('getPermission', getPermission);
    console.log('this.allowedPermission[1]', this.allowedPermission[1]);
    console.log('getPermission[this.allowedPermission[1]]', getPermission[this.allowedPermission[1]]);
    console.log('permit', permit); */

    if (permit && getPermission[this.allowedPermission[1]]) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
