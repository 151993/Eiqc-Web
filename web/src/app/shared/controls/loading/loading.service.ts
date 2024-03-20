import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingState, LoadingIcon, LoadingMessage } from './loadingState';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new Subject<LoadingState>();

  loadingState = this.loadingSubject.asObservable();

  constructor(private spinnerService: NgxSpinnerService) {}

  show(_message: LoadingMessage, _icon: LoadingIcon, _fullPage: boolean = false, _static: boolean = false) {
    this.loadingSubject.next(<LoadingState>{
      show: true,
      message: _message,
      icon: _icon,
      static: _static,
      fullPage: _fullPage
    });
  }

  hide() {
    this.loadingSubject.next(<LoadingState>{ show: false });
  }

  showByName(name: string) {
    this.spinnerService.show(name);
  }

  hideByName(name: string) {
    this.spinnerService.hide(name);
  }
}
