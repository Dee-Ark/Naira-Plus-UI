import { ChangeTokenComponent } from './change-token/change-token.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    RecoverPasswordComponent,LoginComponent, ChangeTokenComponent, ResetPasswordComponent, ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //IconsProviderModule,
    //NgZorroAntdModule,
    SharedModule,
    AuthRoutingModule,
    StoreModule.forRoot({})
  ]
})
export class AuthModule { }
