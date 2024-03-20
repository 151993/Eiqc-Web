import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';
import { LoadingState, LoadingIcon, LoaderName } from './loadingState';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  hideColor = 'rgba(51, 51, 51, 0)';
  displayColor = '#fff';
  color = '#fff';
  progressMessage = '';
  static = false;
  loadingIcon: LoadingIcon = LoadingIcon.Default;

  showLoader = false;

  fullPage: boolean;

  constructor(
    private loadingService: LoadingService,
    private spinnerService: NgxSpinnerService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.progressMessage = '';
    this.subscription = this.loadingService.loadingState.subscribe(
      (state: LoadingState) => {
        if (!this.static) {
          if (state.show) {
            this.fullPage = state.fullPage;

            this.translateService.get(state.message).subscribe(response => {
              this.progressMessage = response;
            });

            if (state.static) {
              this.static = state.static;
            }

            if (state.icon.toLowerCase() === LoadingIcon.Blank.toLowerCase()) {
              this.displayColor = this.hideColor;
              this.loadingIcon = state.icon;
            }

            if (state.icon) {
              this.loadingIcon = state.icon;
            }

            this.show();
          } else {
            this.progressMessage = '';
            this.hide();
          }

          this.cdr.detectChanges();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private show() {
    this.spinnerService.show(LoaderName.GlobalLoading, {
      type: this.loadingIcon.toString(),
      color: this.displayColor
    });
    this.showLoader = true;
  }

  private hide() {
    this.spinnerService.hide(LoaderName.GlobalLoading);

    this.showLoader = false;
  }
}
