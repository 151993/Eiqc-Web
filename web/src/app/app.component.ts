import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './shared/animation/animation';
import { environment } from 'src/environments/environment';
import { Cookie, LocalStorage } from './shared/constant/global';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Language, MockLanguage } from './model/language/language';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'qss-eiqc-web';
  updateUserExpireTime: any;
  triggeredNotification: boolean;
  hideSideNav = false;
  isAuth = false;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    const lang: Language = JSON.parse(
      localStorage.getItem(LocalStorage.DefaultLanguage)
    );
    if (lang) {
      this.translate.use(lang.code);
    } else {
      this.translate.setDefaultLang('en');
      localStorage.setItem(
        LocalStorage.DefaultLanguage,
        JSON.stringify(MockLanguage[0])
      );
    }

    this.setTimeout();

    this.authService.isAuth$.subscribe(x => {
      this.isAuth = x;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  setTimeout() {
    this.saveInCookie();

    this.updateUserExpireTime = setInterval(() => {
      this.checkIdle();
    }, environment.sessionExpiry.checkInterval * 1000);
  }

  checkIdle() {
    const expireTime = new Date(this.cookieService.get(Cookie.ExpireTime));

    const dtNow = new Date();
    dtNow.setSeconds(+dtNow.getSeconds() + environment.sessionExpiry.countdown);
    if (expireTime <= dtNow) {
      if (!this.triggeredNotification) {
        this.triggeredNotification = true;
        this.authService.startSessionExpiry();
      }
    } else {
      this.triggeredNotification = false;
      this.authService.stopSessionExpiry();
    }
  }

  saveInCookie() {
    const dtNow = new Date();
    dtNow.setSeconds(
      +dtNow.getSeconds() +
        environment.sessionExpiry.inactivityDelay +
        environment.sessionExpiry.countdown
    );

    this.cookieService.set(
      Cookie.ExpireTime,
      dtNow.toString(),
      99,
      '/',
      environment.domain.CookieDomain
    );
  }

  @HostListener('window:mousemove') onmousemove() {
    this.newSessionExpiry();
  }

  @HostListener('window:keypress') onkeydown() {
    this.newSessionExpiry();
  }

  newSessionExpiry() {
    this.triggeredNotification = false;
    clearTimeout(this.updateUserExpireTime);
    this.setTimeout();
    this.authService.stopSessionExpiry();
  }

  toggleMenuEventClicked($event) {
    this.hideSideNav = $event;
  }
}
