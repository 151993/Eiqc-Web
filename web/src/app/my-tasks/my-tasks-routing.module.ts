import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionType } from '../shared/constant/roles';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import * as _ from 'lodash';
import { MyTasksMenuConfigurationComponent } from './my-tasks-menu-configuration/my-tasks-menu-configuration.component';
import { SmsMyTasksComponent } from './sms-my-tasks/sms-my-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: MyTasksMenuConfigurationComponent,
    canActivate: [AuthGuard],
    data: {roles: [], permissions: [PermissionType.AdminSQETaskCanAccess] },
  },
  {
    path: 'SQETasks',
    component: MyTasksComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSQETaskCanAccess] }
  },
  {
    path: 'SMSMyTasks',
    component: SmsMyTasksComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSMSMyTaskCanAccess] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTasksRoutingModule { }
