import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ChangeTokenComponent } from './change-token/change-token.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '../shell/shell.service';


const routes: Routes = [
  Shell.authRoutes([
    { path: 'login', component: LoginComponent, data: {title: 'Login'}},
    { path: 'recover-password', component: RecoverPasswordComponent, data: {title: 'Recover Password'}},
    { path: 'change-token', component: ChangeTokenComponent, data: {title: 'Change Token'}},
    { path: 'reset-password', component: ResetPasswordComponent, data: {title: 'Reset Password'}},
    { path: 'change-password', component: ChangePasswordComponent, data: {title: 'Change Password'}}
  ])
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
