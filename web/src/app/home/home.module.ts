import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../shared/core.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
