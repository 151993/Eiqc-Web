import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';
import { PermissionType } from './shared/constant/roles';
import { DemoComponent } from './demo/demo.component';
import { AuditLogListComponent } from './auditLog/audit-log-list/audit-log-list.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CanDeactivateGuard } from './auth/can-deactivate.guard';
import { WelComeComponent } from './wel-come/wel-come.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
   { path: 'welcome', component: WelComeComponent },
  { path: '404', component: PageNotFoundComponent, canActivate: [AuthGuard] },
  {
    path: 'Demo',
    component: DemoComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'Home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    data: {
      permission: [PermissionType.HomeCanAccess],
    },
  },
  {
    path: 'SQETasks',
    loadChildren: () => import('./my-tasks/my-tasks.module').then(m => m.MyTasksModule),
    canActivate: [AuthGuard],
    data: {
      permission: [PermissionType.AdminSQETaskCanAccess] ,
    },
  },
  {
    path: 'SupplierTasks',
    loadChildren: () => import('./supplier-tasks/supplier-tasks.module').then(m => m.SupplierTasksModule),
    canActivate: [AuthGuard],
    data: {
      permission: [PermissionType.AdminSupplierTaskCanAccess],
    },
  },
  {
    path: 'DCCTasks',
    loadChildren: () => import('./dcc-tasks/dcc-tasks.module').then(m => m.DCCTasksModule),
    canActivate: [AuthGuard],
    data: {
      permission: [PermissionType.AdminDCCTaskCanAccess],
    },
  },
  {
    path: 'SupplierMeasurement',
    loadChildren: () => import('./supplier-measurement/supplier-measurement.module').then(m => m.SupplierMeasurementModule),
    canActivate: [AuthGuard],
    data: {
      permission: [PermissionType.AdminSupplierMeasurementCanAccess],
    },
  },
  {
    path: 'Admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      permission: [PermissionType.AdminCanAccess],
    },
  },
  {
    path: 'PartInspection',
    loadChildren: () => import('./part-inspection/part-inspection.module').then(m => m.PartInspectionModule),
    canActivate: [AuthGuard],
    data: {
      permission: [PermissionType.AdminCanAccess],
    },
  },
  {
    path: 'AuditTrail',
    component: AuditLogListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Notifications',
    component: NotificationListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'UserProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
