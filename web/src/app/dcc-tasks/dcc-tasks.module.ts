import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../shared/core.module';
import { DCCTasksRoutingModule } from './dcc-tasks-routing.module';
import { DCCTasksComponent } from './dcc-tasks/dcc-tasks.component';

@NgModule({
  imports: [
    CommonModule,
    DCCTasksRoutingModule,
    CoreModule
  ],
  declarations: [
    DCCTasksComponent
  ]
})
export class DCCTasksModule { }
