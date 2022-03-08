import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { InputValidatorDirective } from './validators/input-validator.directive';
//import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AuthLogoComponent } from './auth-logo/auth-logo.component';
import { FeaturePermissionDirective } from '../core/feature-permission.directive';
import { RbacAllowDirective } from '../core/rbac-allow.directive';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [InputComponent, InputErrorComponent, InputValidatorDirective, AuthLogoComponent, FeaturePermissionDirective, RbacAllowDirective],
  exports: [InputComponent, InputErrorComponent, InputValidatorDirective, AuthLogoComponent, FeaturePermissionDirective, RbacAllowDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
    //NgZorroAntdModule,
  ]
})
export class SharedModule { }
