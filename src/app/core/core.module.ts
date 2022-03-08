import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { ErrorHandlerInterceptor } from "../services/error-handler.interceptor";

import { ApiPrefixInterceptor } from "./interceptors/api-prefix.interceptor";
import { PermissionGuard } from "./permission.guard";

@NgModule({
  providers: [
    PermissionGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    AuthService
    
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
