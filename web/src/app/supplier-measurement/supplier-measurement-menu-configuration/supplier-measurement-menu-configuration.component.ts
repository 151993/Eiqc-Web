import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Page } from 'src/app/model/page/page';
import { PermissionType } from 'src/app/shared/constant/roles';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-supplier-measurement-menu-configuration',
  templateUrl: './supplier-measurement-menu-configuration.component.html',
  styleUrls: ['./supplier-measurement-menu-configuration.component.css']
})
export class SupplierMeasurementMenuConfigurationComponent implements OnInit, AfterViewInit, OnDestroy {
  supplierMeasurementConfiguration: Page[] = [];

  inputFilterEvent = new Subject<KeyboardEvent>();
  filterValue = '';
  constructor(private authService: AuthService) {
    this.supplierMeasurementConfiguration.push(

      {
        title: 'SupplierMeasurementSubmission',
        url: 'SupplierMeasurementSubmission',
        permissions: [PermissionType.AdminSupplierMeasurementCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'ApprovedSupplierMeasurementSubmission',
        url: 'ApprovedSupplierMeasurementSubmission',
        permissions: [PermissionType.AdminApprovedSupplierMeasurementCanAccess],
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
    this.supplierMeasurementConfiguration.forEach(page => {
      page.hasAccess = this.authService.isPermissionExists(page.permissions);
    });
  }

  getAllMenu() {
    this.supplierMeasurementConfiguration.forEach(page => {
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
      this.supplierMeasurementConfiguration.forEach(page => {
        page.visible = page.title.toLowerCase().includes(input);
      });

    }
  }

  sortConfigurations() {
    this.supplierMeasurementConfiguration = _.orderBy(
      this.supplierMeasurementConfiguration,
      ['title'],
      ['asc']
    );

  }
}
