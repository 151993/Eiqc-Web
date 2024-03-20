import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS, HttpClientModule, HttpClient
} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor';
import { LoadingInterceptor } from './shared/interceptors/loading-interceptor';
import { ErrorNotifierInterceptor } from './shared/interceptors/error-notifier-interceptor';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './shared/controls/loading/loading.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { TimeZonePipe } from './shared/pipe/timezone';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';
import { BaseDetailComponent } from './shared/base/base-detail/base-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { LoadingService } from './shared/controls/loading/loading.service';
import { WebHttpClient, WebHttpClientCreator } from './services/WebHttpClient';
import { CoreModule } from './shared/core.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuditModalComponent } from './shared/controls/modal/auditModal/audit-modal/audit-modal.component';
import { ChangeReasonModalComponent } from './shared/controls/modal/change-reason-modal/change-reason-modal.component';
import { ConfirmationModalComponent } from './shared/controls/modal/confirmation-modal/confirmation-modal.component';
import { BaseListComponent } from './shared/base/base-list/base-list.component';
import { CSVExportService } from './services/export/csv-export.service';
import { AuditLogService } from './services/auditLog/audit-log.service';
import { DemoComponent } from './demo/demo.component';
import { DemoTableComponent } from './demo/demo-table/demo-table.component';
import { GhostListLoadingComponent } from './demo/ghost-list-loading/ghost-list-loading.component';
import { AuditLogListComponent } from './auditLog/audit-log-list/audit-log-list.component';
import { AuditLogDetailComponent } from './auditLog/audit-log-detail/audit-log-detail.component';
import { NotificationIconComponent } from './shared/notification-icon/notification-icon.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CustomPrimengModule } from '@jabil/ui-ng';
import { SideOverlayComponent } from './shared/side-overlay/side-overlay.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TooltipModule } from 'primeng/tooltip';
import { WelComeComponent } from './wel-come/wel-come.component';
import { DatePipe } from '@angular/common';
import { QssUiChartsModule } from 'qss-ui-charts';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import 'chartjs-adapter-luxon';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import StreamingPlugin from 'chartjs-plugin-streaming';
/**
* Chart.js 3 is tree-shakeable, so it is necessary to import and register the controllers,
* elements, scales and plugins you are going to use.
*/
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  AnnotationPlugin,
  StreamingPlugin
);

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorNotifierInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoadingComponent,
    UnauthorizedComponent,
    TimeZonePipe,
    AuthCallbackComponent,
    AuditModalComponent,
    ChangeReasonModalComponent,
    ConfirmationModalComponent,
    BaseListComponent,
    BaseDetailComponent,
    DemoComponent,
    DemoTableComponent,
    GhostListLoadingComponent,
    AuditLogListComponent,
    AuditLogDetailComponent,
    NotificationIconComponent,
    NotificationListComponent,
    UserProfileComponent,
    SideOverlayComponent,
    FooterComponent,
    WelComeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    CoreModule.forRoot(),
    ToastrModule.forRoot(),
    CustomPrimengModule,
    TooltipModule,
    QssUiChartsModule
  ],
  providers: [
    CookieService,
    httpInterceptorProviders,
    {
      provide: WebHttpClient,
      useFactory: WebHttpClientCreator,
      deps: [HttpClient, LoadingService]
    },
    CSVExportService,
    AuditLogService,
    DatePipe
  ],
  entryComponents: [
    AuditModalComponent,
    ChangeReasonModalComponent,
    ConfirmationModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    '/assets/i18n/',
    '.json?random=' + new Date().getTime()
  );
}
