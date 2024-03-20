import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { finalize, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CustomHeader } from '../constant/global';
import { LoadingService } from '../controls/loading/loading.service';
import { LoadingIcon, LoadingMessage } from '../controls/loading/loadingState';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  loadingCount: number;

  constructor(private loadingService: LoadingService) {
    this.loadingCount = 0;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let skipSpinner = false;

    if (req.headers.has(CustomHeader.SkipLoadingHeader)) {
      req.headers.delete(CustomHeader.SkipLoadingHeader);
      skipSpinner = true;
    }

    const oDataCall = req.url.toLowerCase().includes('odata');

    if (!skipSpinner) {
      if (this.loadingCount <= 0) {
        if (oDataCall) {
          this.loadingService.show(LoadingMessage.Loading, LoadingIcon.Default);
        } else {
          this.loadingService.show(
            LoadingMessage.Loading,
            LoadingIcon.Default,
            true
          );
        }
      }
      this.loadingCount++;
    }

    const includeCache = req.url.includes('asset') || req.url.includes('X-Amz-Security-Token');
    let nextReq = req.clone();
    if (!includeCache) {
      nextReq = req.clone({
        headers: req.headers
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', '01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0')
        // Purposely set to expired so that browser will get the latest
      });
    }

    return next.handle(nextReq).pipe(
      catchError(this.handleError<any>()),
      // Log when response observable either completes or errors
      finalize(() => {
        this.loadingCount--;
        if (this.loadingCount <= 0) {
          this.loadingService.hide();
        }
      })
    );
  }

  private handleError<T>() {
    return (response: any): Observable<T> => {
      this.loadingService.hide();
      return throwError(response);
    };
  }
}
