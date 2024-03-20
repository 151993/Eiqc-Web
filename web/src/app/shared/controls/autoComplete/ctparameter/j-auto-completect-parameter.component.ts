/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { CTParameterService } from 'src/app/services/ct-parameter/ct-parameter.service';

export const CUSTOM_AUTOCOMPLETE_CTPARAMETER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteCTParameterComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-ct-parameter',
  templateUrl: './j-auto-complete-ct-parameter.component.html',
  styleUrls: ['./j-auto-complete-ct-parameter.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_CTPARAMETER_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteCTParameterComponent extends BaseAutoComplete implements OnInit {
  
  constructor(
    private cTParameterService: CTParameterService // tslint:disable-line
  ) {
    super(cTParameterService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
