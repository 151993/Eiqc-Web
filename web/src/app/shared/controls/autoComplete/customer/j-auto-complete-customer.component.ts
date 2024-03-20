/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { CustomerService } from 'src/app/services/customer/customer.service';

export const CUSTOM_AUTOCOMPLETE_CUSTOMER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteCustomerComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-customer',
  templateUrl: './j-auto-complete-customer.component.html',
  styleUrls: ['./j-auto-complete-customer.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_CUSTOMER_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteCustomerComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private customerService: CustomerService // tslint:disable-line
  ) {
    super(customerService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name}';
    }
  }

}
