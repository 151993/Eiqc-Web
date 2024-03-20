import { Component, OnInit } from '@angular/core';
import { NavItem } from '@jabil/ui-ng';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { PermissionType } from '../constant/roles';

const SupplierTask = 'SupplierTasks';
const DCCTask = 'DCCTasks';
const SQETask = 'SQETasks';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  applicationName = environment.application.name;

  //#region  permissions
  canAccessAdmin = false;
  canAccessHome = false;
  //#endregion

  elements: NavItem[] = [
    {
      name: 'Home',
      icon: 'fa fa-home',
      href: 'Home',
      isActive: true,
      isHeading: false
    },
    {
      name: 'SQETasks',
      icon: 'fa fa-tasks',
      href: 'SQETasks',
      isActive: true,
      isHeading: false
    },
    {
      name: 'PartInspection',
      icon: 'fa fa-cogs',
      href: 'PartInspection',
      isActive: true,
      isHeading: false,
    },
    {
      name: 'SupplierTasks',
      icon: 'fa fa-tasks',
      href: 'SupplierTasks',
      isActive: true,
      isHeading: false
    },
    {
      name: 'SupplierMeasurementSubmission',
      icon: 'fa fa-tasks',
      href: 'SupplierMeasurement',
      isActive: true,
      isHeading: false
    },
    {
      name: 'DCCTasks',
      icon: 'fa fa-tasks',
      href: 'DCCTasks',
      isActive: true,
      isHeading: false
    },
    {
      name: 'Notifications',
      icon: 'fa fa-bell',
      href: 'Notifications',
      isActive: true,
      isHeading: false
    },
    {
      name: 'Admin',
      icon: 'fa fa-user',
      href: 'Admin',
      isActive: true,
      isHeading: false,
    },
    {
      name: 'Demo',
      icon: 'fa fa-cogs',
      href: 'Demo',
      isActive: true,
      isHeading: false,
    }
  ];
  canAccessDCCTask: boolean;
  canAccessSupplierTask: boolean;
  canAccessSQETask: boolean;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    //#region permissions

    this.authService.userPermissions$.subscribe(x => {
      this.verifyAccess();
    });

    this.verifyAccess();
    //#endregion

  }

  verifyAccess() {
    this.canAccessAdmin = this.authService.isPermissionExists([PermissionType.AdminCanAccess]);
    this.canAccessHome = this.authService.isPermissionExists([PermissionType.HomeCanAccess]);
    this.canAccessDCCTask = this.authService.isPermissionExists([PermissionType.AdminDCCTaskCanAccess]);
    this.canAccessSupplierTask = this.authService.isPermissionExists([PermissionType.AdminSupplierTaskCanAccess]);
    this.canAccessSQETask = this.authService.isPermissionExists([PermissionType.AdminSQETaskCanAccess]);
    this.elements.forEach(element => {
      if (element.name === DCCTask) {
        element.isActive = (this.canAccessDCCTask) ? true : false;
      } else if (element.name === SupplierTask) {
        element.isActive = (this.canAccessSupplierTask) ? true : false;
      } else if (element.name === SQETask) {
        element.isActive = (this.canAccessSQETask) ? true : false;
      }
    });
  }

}
