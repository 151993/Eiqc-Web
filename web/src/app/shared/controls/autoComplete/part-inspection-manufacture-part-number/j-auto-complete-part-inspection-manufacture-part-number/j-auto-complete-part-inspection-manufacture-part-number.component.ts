/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SAPPartInspectionPlanService } from 'src/app/services/sap-part-inspection-plan/sap-part-inspection-plan.service';
import { Constants } from 'src/app/shared/constant/global';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { environment } from 'src/environments/environment';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_PARTINSPECTIONMANUFACTUREPARTNUMBER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompletePartInspectionManufacturePartNumberComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-part-inspection-manufacture-part-number',
  templateUrl: './j-auto-complete-part-inspection-manufacture-part-number.component.html',
  styleUrls: ['./j-auto-complete-part-inspection-manufacture-part-number.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PARTINSPECTIONMANUFACTUREPARTNUMBER_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompletePartInspectionManufacturePartNumberComponent extends BaseAutoComplete implements OnInit {
  @Input() sapPartInspectionPlanId: number;
  pageSortFilterInfo = new PageSortFilterInfo();

 constructor(
  private inspectionPlanService: SAPPartInspectionPlanService // tslint:disable-line
) {
  super(inspectionPlanService);
}

  ngOnInit() {
    super.ngOnInit();
  }

  getData() {
    this.pageSortFilterInfo = new PageSortFilterInfo();
    if (this.sapPartInspectionPlanId > 0) {
      this.inspectionPlanService.getDataById(this.sapPartInspectionPlanId).subscribe((data) => {
        if (data.value && data.value[0].manufacturePartNumber) {
          this.autoCompleteConfig.suggestions = data.value;
          this.data = data.value;
        }
      });
    }

  }

  search(event) {
    if (this.onCompleteMethod.observers.length === 0) {
      if (event.query.trim() !== Constants.Empty) {
        if (this.sapPartInspectionPlanId > 0) {
          this.inspectionPlanService.
          getDataById(this.sapPartInspectionPlanId)
            .subscribe(data => {
              if (data.value && data.value[0].manufacturePartNumber) {
                this.autoCompleteConfig.suggestions = data.value.splice(
                  0,
                  environment.limit.maxResult
                );
              }
            });
        }
      }
    } else {
      this.onCompleteMethod.emit(event);
    }
  }

}
