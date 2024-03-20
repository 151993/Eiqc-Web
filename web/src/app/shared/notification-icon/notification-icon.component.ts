import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css']
})
export class NotificationIconComponent implements OnInit {
  notificationNumber = '99+';
  notificationComponentPath = '/Notifications';

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === this.notificationComponentPath) {
          this.notificationNumber = '';
        }
      }
    });
  }

  ngOnInit() {
  }
}
