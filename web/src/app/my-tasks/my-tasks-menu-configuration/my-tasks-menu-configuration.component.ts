import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Page } from 'src/app/model/page/page';
import { PermissionType } from 'src/app/shared/constant/roles';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-my-tasks-menu-configuration',
  templateUrl: './my-tasks-menu-configuration.component.html',
  styleUrls: ['./my-tasks-menu-configuration.component.css']
})
export class MyTasksMenuConfigurationComponent implements OnInit, AfterViewInit, OnDestroy {
  myTasksConfiguration: Page[] = [];

  inputFilterEvent = new Subject<KeyboardEvent>();
  filterValue = '';
  constructor(private authService: AuthService) {
    this.myTasksConfiguration.push(

      {
        title: 'SAPPartInspectionPlan',
        url: 'SQETasks',
        permissions: [PermissionType.AdminSQETaskCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'SupplierMeasurementSubmission',
        url: 'SMSMyTasks',
        permissions: [PermissionType.AdminSMSMyTaskCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      });
      this.sortConfigurations();
    }

 ngOnInit() {
    this.authService.userPermissions$.subscribe(x => {
      this.verifyAccess();
    });
    this.verifyAccess();
  }

  verifyAccess() {
    this.myTasksConfiguration.forEach(page => {
      page.hasAccess = this.authService.isPermissionExists(page.permissions);
    });
  }

  getAllMenu() {
    this.myTasksConfiguration.forEach(page => {
      page.visible = true;
    });
  }

  ngOnDestroy() {
    if (this.inputFilterEvent) {
      this.inputFilterEvent.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.inputFilterEvent
      .pipe(
        debounceTime(environment.timer.debounceTimer),
        distinctUntilChanged(),
        map((event: any) => event.target.value)
      )
      .subscribe(val => {
        this.filterMenu(val.toLowerCase());
      });
  }

  clearFilter() {
    this.filterValue = '';
    this.getAllMenu();
  }

  filterMenu(input: string) {
    if (!input) {
      this.getAllMenu();
    } else {
      input = input.toLowerCase();
      this.myTasksConfiguration.forEach(page => {
        page.visible = page.title.toLowerCase().includes(input);
      });

    }
  }

  sortConfigurations() {
    this.myTasksConfiguration = _.orderBy(
      this.myTasksConfiguration,
      ['title'],
      ['asc']
    );

  }
}
