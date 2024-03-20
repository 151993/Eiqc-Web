/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { InspectionToolsService } from 'src/app/services/inspection-tools/inspection-tools.service';

export const CUSTOM_AUTOCOMPLETE_INSPECTIONTOOLS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteInspectionToolsComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-inspection-tools',
  templateUrl: './j-auto-complete-inspection-tools.component.html',
  styleUrls: ['./j-auto-complete-inspection-tools.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_INSPECTIONTOOLS_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteInspectionToolsComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private inspectionToolsService: InspectionToolsService // tslint:disable-line
  ) {
    super(inspectionToolsService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
