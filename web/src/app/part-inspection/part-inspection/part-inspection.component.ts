import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Page } from 'src/app/model/page/page';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PermissionType } from 'src/app/shared/constant/roles';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-part-inspection',
  templateUrl: './part-inspection.component.html',
  styleUrls: ['./part-inspection.component.css']
})
export class PartInspectionComponent implements OnInit, AfterViewInit, OnDestroy {
  partInspectionConfiguration: Page[] = [];

  inputFilterEvent = new Subject<KeyboardEvent>();
  filterValue = '';
  constructor(private authService: AuthService) {
    this.partInspectionConfiguration.push(
      {
        title: 'ApprovedInspectionPlan',
        url: 'ApprovedInspectionPlan',
        permissions: [PermissionType.AdminApprovedPartInspectionPlanCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'SAPPartInspectionPlan',
        url: 'SAPPartInspectionPlan',
        permissions: [PermissionType.AdminSAPPartInspectionPlanCanAccess],
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
    this.partInspectionConfiguration.forEach(page => {
      page.hasAccess = this.authService.isPermissionExists(page.permissions);
    });
  }

  getAllMenu() {
    this.partInspectionConfiguration.forEach(page => {
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
      this.partInspectionConfiguration.forEach(page => {
        page.visible = page.title.toLowerCase().includes(input);
      });

    }
  }

  sortConfigurations() {
    this.partInspectionConfiguration = _.orderBy(
      this.partInspectionConfiguration,
      ['title'],
      ['asc']
    );

  }
}
