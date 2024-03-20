/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { FormService } from 'src/app/services/form/form.service';

export const CUSTOM_AUTOCOMPLETE_FORM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteFormComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-form',
  templateUrl: './j-auto-complete-form.component.html',
  styleUrls: ['./j-auto-complete-form.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_FORM_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteFormComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private formService: FormService // tslint:disable-line
  ) {
    super(formService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name}';
    }
  }

}
