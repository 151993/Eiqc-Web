/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { InspectionToolsTypeService } from 'src/app/services/inspection-tools-type/inspection-tools-type.service';

export const CUSTOM_AUTOCOMPLETE_INSPECTIONTOOLSTYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteInspectionToolsTypeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-inspection-tools-type',
  templateUrl: './j-auto-complete-inspection-tools-type.component.html',
  styleUrls: ['./j-auto-complete-inspection-tools-type.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_INSPECTIONTOOLSTYPE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteInspectionToolsTypeComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private inspectionToolsTypeService: InspectionToolsTypeService // tslint:disable-line
  ) {
    super(inspectionToolsTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.type} ';
    }
  }

}
