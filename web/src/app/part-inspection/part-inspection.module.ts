import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartInspectionRoutingModule } from './part-inspection-routing.module';
import { CoreModule } from 'src/app/shared/core.module';
import { TimeZonePipe } from 'src/app/shared/pipe/timezone';
import { SAPPartInspectionPlanListComponent } from 'src/app/admin/sap-part-inspection-plan/sap-part-inspection-plan-list/sap-part-inspection-plan-list.component';
import { SAPPartInspectionPlanDetailComponent } from 'src/app/admin/sap-part-inspection-plan/sap-part-inspection-plan-detail/sap-part-inspection-plan-detail.component';
import { PartInspectionComponent } from './part-inspection/part-inspection.component';
import { TranslateModule } from '@ngx-translate/core';
import { MeasurementParameterComponent } from '../admin/sap-part-inspection-plan/measurement-parameter/measurement-parameter.component';
import { FunParameterComponent } from '../admin/sap-part-inspection-plan/fun-parameter/fun-parameter.component';
import { MicroSectionParameterComponent } from '../admin/sap-part-inspection-plan/micro-section-parameter/micro-section-parameter.component';
import { MPositionToleranceComponent } from '../admin/sap-part-inspection-plan/m-position-tolerance/m-position-tolerance.component';
import { LPositionToleranceComponent } from '../admin/sap-part-inspection-plan/l-position-tolerance/l-position-tolerance.component';
import { ApprovedInspectionPlanComponent } from './approved-inspection-plan/approved-inspection-plan.component';


@NgModule({
  imports: [
    CommonModule,
    PartInspectionRoutingModule,
    CoreModule,
    TranslateModule
  ],
  declarations: [
    PartInspectionComponent,
    SAPPartInspectionPlanListComponent,
    SAPPartInspectionPlanDetailComponent,
    MeasurementParameterComponent,
    FunParameterComponent,
    MicroSectionParameterComponent,
    MPositionToleranceComponent,
    LPositionToleranceComponent,
    ApprovedInspectionPlanComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TimeZonePipe]
})
export class PartInspectionModule { }
