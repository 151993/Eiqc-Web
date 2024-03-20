import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionType } from '../shared/constant/roles';
import { DCCTasksComponent } from './dcc-tasks/dcc-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: DCCTasksComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminDCCTaskCanAccess] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DCCTasksRoutingModule { }
