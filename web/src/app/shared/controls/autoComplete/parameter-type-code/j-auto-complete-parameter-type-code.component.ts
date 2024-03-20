import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { ParameterTypeCodeService } from 'src/app/services/parameter-type-code/parameter-type-code.service';

export const CUSTOM_AUTOCOMPLETE_PARAMETERTYPECODE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteParameterTypeCodeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-parameter-type-code',
  templateUrl: './j-auto-complete-parameter-type-code.component.html',
  styleUrls: ['./j-auto-complete-parameter-type-code.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PARAMETERTYPECODE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteParameterTypeCodeComponent extends BaseAutoComplete implements OnInit {
  constructor(
    private parameterTypeCodeService: ParameterTypeCodeService // tslint:disable-line
  ) {
    super(parameterTypeCodeService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name}';
    }
  }

}
