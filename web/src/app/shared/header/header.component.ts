import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import * as moment from 'moment-timezone';
import { Language, MockLanguage } from 'src/app/model/language/language';
import { LocalStorage, ToastMessage } from '../constant/global';
import { environment } from 'src/environments/environment';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
/* Modification Author: Abril Gomez
Create date: 08/05/2020
Description: Add User services */
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from '../notification/notification.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class HeaderComponent implements OnInit {
  version: string;
  helpUrl: string;
  timeZoneList: string[];
  selectedTimeZone: any;
  searchText: string;
  linkConfig: any[] = [];
  linkConfigMenu: any[] = [];
  userData: any;
  isActive = true;
  languageDropdown = false;

  userTimeZone: any;

  selectedLanguage: Language;
  languages: Language[];

  userId: number;
  userInfo: User;

  @Output() toggleMenuEvent = new EventEmitter<boolean>();
  hideSideNav = false;

  constructor(public authService: AuthService, private apiService: UserService, config: NgbModalConfig, private modalService: NgbModal, private notificationService: NotificationService) {
    this.languages = MockLanguage;
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.selectedLanguage = JSON.parse(
      localStorage.getItem(LocalStorage.DefaultLanguage)
    );

    this.timeZoneList = moment.tz.names();

    if (localStorage.getItem('timezone') != null) {
      this.selectedTimeZone = JSON.parse(localStorage.getItem('timezone'));
    } else {
      this.selectedTimeZone = moment.tz.guess();
      this.setTimeZone();
    }

    this.getVersion();
    this.userId = this.authService.getUserId();
    this.getUserInfo();
  }

  getVersion() {
    this.version = environment.version.current;
  }

  hideSideNavEvent() {
    this.hideSideNav = !this.hideSideNav;
    this.toggleMenuEvent.emit(this.hideSideNav);
  }

  toggleDropdown(event: any) {
    this.languageDropdown = !this.languageDropdown;
    event.stopPropagation();
    event.preventDefault();
  }

  hideSubMenu(event: any) {
    this.languageDropdown = false;
  }
  /*Open the modal with the user data */
  open(content) {
    this.getUserInfo();
    this.modalService.open(content);
  }

  getUserInfo() {
    if (this.userId != null) {
      this.apiService.getDataById(this.userId).subscribe(data => {
        this.userInfo = new User(data);
      });
    }
  }

  logout(): void {
    this.authService.signOut();
  }

  setTimeZone() {
    localStorage.setItem('timezone', JSON.stringify(this.selectedTimeZone));
  }

  setLanguage(language: Language) {
    this.selectedLanguage = language;
    localStorage.setItem(
      LocalStorage.DefaultLanguage,
      JSON.stringify(language)
    );
    setTimeout(function () {
      this.translateService.use(this.selectedLanguage.code);
    }, 1000);
    window.location.reload(true);
  }

  reEvaluatePermissions() {
    this.authService.getUserPermissions(true);
    this.notificationService.showSuccess(ToastMessage.PermissionsReEvaluation);
  }
}
