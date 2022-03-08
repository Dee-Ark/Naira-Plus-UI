import { Injectable } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { AuthShellComponent } from './auth-shell/auth-shell.component';
import { ShellComponent } from './shell.component';

@Injectable({
  providedIn: 'root'
})
export class Shell {

  static childRoutes(routes: Routes): Route { 
    return {
      path:'',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthGuard],
      data: { reuse:  true }
    };
  }

  static authRoutes(routes: Routes): Route {
    return {
      path: '',
      component: AuthShellComponent,
      children: routes,
      data: { reuse: true }
    }
  }
}
