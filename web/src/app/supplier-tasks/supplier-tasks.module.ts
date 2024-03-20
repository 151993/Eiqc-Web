import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierTasksRoutingModule } from './supplier-tasks-routing.module';
import { SupplierTasksComponent } from './supplier-tasks/supplier-tasks.component';
import { CoreModule } from '../shared/core.module';


@NgModule({
  declarations: [SupplierTasksComponent],
  imports: [
    CommonModule,
    SupplierTasksRoutingModule,
    CoreModule
  ]
})
export class SupplierTasksModule { }
