import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../shared/core.module';
import { MyTasksRoutingModule } from './my-tasks-routing.module';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { MyTasksMenuConfigurationComponent } from './my-tasks-menu-configuration/my-tasks-menu-configuration.component';
import { SmsMyTasksComponent } from './sms-my-tasks/sms-my-tasks.component';

@NgModule({
  imports: [
    CommonModule,
    MyTasksRoutingModule,
    CoreModule
  ],
  declarations: [
    MyTasksComponent,
    SmsMyTasksComponent,
    MyTasksMenuConfigurationComponent
  ]
})
export class MyTasksModule { }
