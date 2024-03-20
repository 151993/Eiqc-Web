import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SAPPartInspectionPlanDetailComponent } from 'src/app/admin/sap-part-inspection-plan/sap-part-inspection-plan-detail/sap-part-inspection-plan-detail.component';
import { SAPPartInspectionPlanListComponent } from 'src/app/admin/sap-part-inspection-plan/sap-part-inspection-plan-list/sap-part-inspection-plan-list.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Operator } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { ApprovedInspectionPlanComponent } from './approved-inspection-plan/approved-inspection-plan.component';
import { PartInspectionComponent } from './part-inspection/part-inspection.component';


const routes: Routes = [
  {
    path: '',
    component: PartInspectionComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSAPPartInspectionPlanCanAccess] },
  },
  {
    path: 'SAPPartInspectionPlan',
    component: SAPPartInspectionPlanListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSAPPartInspectionPlanCanAccess] },
  },
  {
    path: 'AddSAPPartInspectionPlan',
    component: SAPPartInspectionPlanDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSAPPartInspectionPlanCanCreate] },
  },
  {
    path: 'EditSAPPartInspectionPlan/:id',
    component: SAPPartInspectionPlanDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
      permissions: [
        PermissionType.AdminSAPPartInspectionPlanCanAccess,
        PermissionType.AdminSAPPartInspectionPlanCanUpdate,
        PermissionType.AdminSupplierTaskCanAccess,
        PermissionType.AdminSupplierTaskCanUpdate,
        PermissionType.AdminDCCTaskCanAccess,
        PermissionType.AdminDCCTaskCanUpdate,
        PermissionType.AdminSQETaskCanAccess,
        PermissionType.AdminSQETaskCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'ApprovedInspectionPlan',
    component: ApprovedInspectionPlanComponent,
    canActivate: [AuthGuard],
    data: { roles: [],
    permissions: [
      PermissionType.AdminSAPPartInspectionPlanCanAccess,
      PermissionType.AdminApprovedPartInspectionPlanCanAccess,
      PermissionType.AdminDCCTaskCanAccess],
    condition: Operator.Or,
   },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartInspectionRoutingModule { }
