import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../shared/core.module';
import { SupplierMeasurementDetailComponent } from './supplier-measurement-detail/supplier-measurement-detail.component';
import { SupplierMeasurementListComponent } from './supplier-measurement-list/supplier-measurement-list.component';
import { SupplierMeasurementRoutingModule } from './supplier-measurement-routing.module';
import { SupplierMeasurementMenuConfigurationComponent } from './supplier-measurement-menu-configuration/supplier-measurement-menu-configuration.component';
import { TranslateModule } from '@ngx-translate/core';
import { TimeZonePipe } from '../shared/pipe/timezone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SupplierMeasurementViewComponent } from './supplier-measurement-view/supplier-measurement-view.component';
import { ApprovedSupplierMeasurementSubmissionComponent } from './approved-supplier-measurement-form/approved-supplier-measurement-form.component';

@NgModule({
  imports: [
    CommonModule,
    SupplierMeasurementRoutingModule,
    CoreModule,
    TranslateModule
  ],
  declarations: [
    SupplierMeasurementListComponent,
    SupplierMeasurementDetailComponent,
    SupplierMeasurementMenuConfigurationComponent,
    SupplierMeasurementViewComponent,
    ApprovedSupplierMeasurementSubmissionComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TimeZonePipe]
})
export class SupplierMeasurementModule { }
