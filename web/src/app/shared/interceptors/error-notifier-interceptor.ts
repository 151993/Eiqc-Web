import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';
import { ToastMessage, ErrorCodes } from '../constant/global';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class ErrorNotifierInterceptor implements HttpInterceptor {
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request).pipe(
      tap(
        (event) => {},
        (response) => {
          if (response) {
            if (!response.ok) {
              switch (response.status) {
                case 401:
                case 403:
                  {
                    this.notificationService.showError(
                      ToastMessage.NotPermitted
                    );
                  }
                  return;
                case 404:
                  this.notificationService.showError(ToastMessage.NotFound);
                  return;
                default:
                  break;
              }
            }

            if (response.error) {
              if (response.error.errorCode) {
                switch (response.error.errorCode) {
                  case ErrorCodes.UnableToDeleteRecord:
                    {
                      this.notificationService.showError(
                        ToastMessage.UnableToDeleteRecord
                      );
                    }
                    return;
                  case ErrorCodes.NoPermission:
                    {
                      this.authService.getUserPermissions(true);

                      this.notificationService.showError(
                        ToastMessage.NotPermitted
                      );
                    }
                    return;
                  default:
                    {
                      this.notificationService.showError(
                        ToastMessage.Blank,
                        `Encountered ${response.error.message}`
                      );
                    }
                    return;
                }
              }

              if (response.error.error) {
                if (response.error.error.message) {
                  this.notificationService.showError(
                    ToastMessage.Blank,
                    response.error.error.message
                  );
                  return;
                }
              }

              if (response.error.message) {
                this.notificationService.showError(
                  ToastMessage.Blank,
                  response.error.message
                );
                return;
              }
            }

            this.notificationService.showError(
              ToastMessage.Blank,
              `Encountered ${response.message}`
            );
          }
        }
      )
    );
  }
}
