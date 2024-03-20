import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionType } from '../shared/constant/roles';
import { SupplierTasksComponent } from './supplier-tasks/supplier-tasks.component';


const routes: Routes = [
  {
    path: '',
    component: SupplierTasksComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.HomeCanAccess] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierTasksRoutingModule { }
