/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { FormTypeService } from 'src/app/services/form-type/form-type.service';

export const CUSTOM_AUTOCOMPLETE_FORMTYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteFormTypeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-form-type',
  templateUrl: './j-auto-complete-form-type.component.html',
  styleUrls: ['./j-auto-complete-form-type.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_FORMTYPE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteFormTypeComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private formTypeService: FormTypeService // tslint:disable-line
  ) {
    super(formTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
