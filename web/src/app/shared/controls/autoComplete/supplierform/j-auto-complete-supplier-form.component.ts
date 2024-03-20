/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { SupplierFormService } from 'src/app/services/supplier-form/supplier-form.service';

export const CUSTOM_AUTOCOMPLETE_SUPPLIERFORM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteSupplierFormComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-supplier-form',
  templateUrl: './j-auto-complete-supplier-form.component.html',
  styleUrls: ['./j-auto-complete-supplier-form.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_SUPPLIERFORM_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteSupplierFormComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private supplierFormService: SupplierFormService // tslint:disable-line
  ) {
    super(supplierFormService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.Id} (${value.code})';
    }
  }

}
