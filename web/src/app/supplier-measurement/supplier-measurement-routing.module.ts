import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { Operator } from '../shared/constant/global';
import { PermissionType } from '../shared/constant/roles';
import { ApprovedSupplierMeasurementSubmissionComponent } from './approved-supplier-measurement-form/approved-supplier-measurement-form.component';
import { SupplierMeasurementDetailComponent } from './supplier-measurement-detail/supplier-measurement-detail.component';
import { SupplierMeasurementListComponent } from './supplier-measurement-list/supplier-measurement-list.component';
import { SupplierMeasurementMenuConfigurationComponent } from './supplier-measurement-menu-configuration/supplier-measurement-menu-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierMeasurementMenuConfigurationComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSupplierMeasurementCanAccess] },
  },
  {
    path: 'SupplierMeasurementSubmission',
    component: SupplierMeasurementListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSupplierMeasurementCanAccess] },
  },
  {
    path: 'AddSupplierMeasurementSubmission',
    component: SupplierMeasurementDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSupplierMeasurementCanCreate] },
  },
  {
    path: 'EditSupplierMeasurementSubmission/:id',
    component: SupplierMeasurementDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminSupplierMeasurementCanAccess,
        PermissionType.AdminSupplierMeasurementCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'ApprovedSupplierMeasurementSubmission',
    component: ApprovedSupplierMeasurementSubmissionComponent,
    canActivate: [AuthGuard],
    data: { roles: [],
    permissions: [
      PermissionType.AdminApprovedSupplierMeasurementCanAccess
    ],
    condition: Operator.Or,
   },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierMeasurementRoutingModule { }
