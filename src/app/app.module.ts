import { ShellModule } from './shell/shell.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FundwalletComponent } from './pages/fundwallet/fundwallet.component';
import { BillspaymentComponent } from './pages/billspayment/billspayment.component';


registerLocaleData(en);
//import { AuthLogoComponent } from './shared/auth-logo/auth-logo.component';
//import { InputComponent } from './shared/input/input.component';
//import { InputErrorComponent } from './shared/input-error/input-error.component';
//import { AuthShellComponent } from './shell/auth-shell/auth-shell.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FundwalletComponent,
    BillspaymentComponent,
    //AuthLogoComponent,
    //InputComponent,
    //InputErrorComponent,
    //AuthShellComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule,
    FormsModule,
    BrowserAnimationsModule,
    ShellModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
