import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from '../controls/loading/loading.service';
import { LoadingIcon, LoadingMessage } from '../controls/loading/loadingState';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private loadingService: LoadingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const skipAuth = req.url.includes('asset') ||  req.url.indexOf('X-Amz-Security-Token') > 0;

    if (skipAuth) {
      return next.handle(req);
    }

    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationHeaderValue();
    if (authToken != null) {
     // Clone; the; request; and; replace; the; original; headers; with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers
          .set('Authorization', authToken)
          .set('Cache-Control', 'no-store')
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    } else {
      this.loadingService.show(
        LoadingMessage.LoggedOutLogIn,
        LoadingIcon.Fussion,
        true,
        true
      );
    }
    return next.handle(req);
  }
}
