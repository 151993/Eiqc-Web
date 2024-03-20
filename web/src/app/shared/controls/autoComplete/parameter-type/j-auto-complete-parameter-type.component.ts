import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { ParameterTypeService } from 'src/app/services/parameter-type/parameter-type.service';

export const CUSTOM_AUTOCOMPLETE_PARAMETERTYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteParameterTypeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-parameter-type',
  templateUrl: './j-auto-complete-parameter-type.component.html',
  styleUrls: ['./j-auto-complete-parameter-type.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PARAMETERTYPE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteParameterTypeComponent extends BaseAutoComplete implements OnInit {
  constructor(
    private parameterTypeService: ParameterTypeService // tslint:disable-line
  ) {
    super(parameterTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
