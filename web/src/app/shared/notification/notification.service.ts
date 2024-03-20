import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from '../constant/global';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastOptionsSuccess: {};
  private toastOptionsError: {};
  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.toastOptionsSuccess = {
      timeOut: environment.timer.expirationTime,
      progressBar: true
    };
    this.toastOptionsError = {
      timeOut: environment.timer.expirationTimeError,
      progressBar: true
    };
  }

  showSuccess(_message: ToastMessage, _customMessage = '', title = '') {
    if (_message === ToastMessage.Blank) {
      this.toastr.success(_customMessage, title, this.toastOptionsSuccess);
    } else {
      this.translateService.get(_message).subscribe(response => {
        this.toastr.success(response, title, this.toastOptionsSuccess);
      });
    }
  }

  showInfo(_message: ToastMessage, _customMessage = '', title = '') {
    if (_message === ToastMessage.Blank) {
      this.toastr.info(_customMessage, title, this.toastOptionsSuccess);
    } else {
      this.translateService.get(_message).subscribe(response => {
        this.toastr.info(response, title, this.toastOptionsSuccess);
      });
    }
  }

  showWarning(_message: ToastMessage, _customMessage = '', title = '') {
    if (_message === ToastMessage.Blank) {
      this.toastr.warning(_customMessage, title, this.toastOptionsError);
    } else {
      this.translateService.get(_message).subscribe(response => {
        this.toastr.warning(response, title, this.toastOptionsError);
      });
    }
  }

  showError(_message: ToastMessage, _customMessage = '', title = '') {
    if (_message === ToastMessage.Blank) {
      this.toastr.error(_customMessage, title, this.toastOptionsError);
    } else {
      this.translateService.get(_message).subscribe(response => {
        this.toastr.error(response, title, this.toastOptionsError);
      });
    }
  }
}
