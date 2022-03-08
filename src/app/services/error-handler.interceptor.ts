import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
//import { NzNotificationService } from 'ng-zorro-antd';


/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    //private notification: NzNotificationService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError(error => this.errorHandler(error)));
  }

  // // Customize the default error handler here if needed
  // private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
  //   if (!environment.production) {
  //     // Do something with the error
  //     log.error('Request error', response);
  //   }
  //   throw response;
  // }

  private errorHandler(
    response: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    //log.error('Request error', response.status);
    //console.log('response.status', response.status);
    if (response.status === 401) {
      this.authService.logout();
  
      this.createNotification("error", "Authorization ERROR", 'Please Login again');
    }

    if (response.status === 400) {
      this.createNotification("error", "ERROR", response.error.message);
    }

    if (response.status === 504) {
      this.createNotification("error", "ERROR", response.error.message);
    }
    if (response.status === 500) {
      this.createNotification("error", "ERROR", response.error.message);
    }

    throw response;
  }

  createNotification(type = 'info', title:string, message: string): void {
    // this.notification.create(
    //   type,
    //   title,
    //   message
    // );
  }
}

