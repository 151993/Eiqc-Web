/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/model/customer/customer';
import { BaseBinocularsDirective } from '../base-binoculars';
import { CustomerService } from 'src/app/services/customer/customer.service';

export const CUSTOM_BINOCULAR_CUSTOMER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,   // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JBinocularsCustomerComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-binoculars-customer',
  templateUrl: './j-binoculars-customer.component.html',
  styleUrls: ['./j-binoculars-customer.component.css'],
  providers: [CUSTOM_BINOCULAR_CUSTOMER_CONTROL_VALUE_ACCESSOR]
})
export class JBinocularsCustomerComponent extends BaseBinocularsDirective
  implements OnInit {
  @Input() dropdown = false;

  @Output() sendSelectedValOnSearch = new EventEmitter();

  constructor(
    protected customerService: CustomerService, // tslint:disable-line
    protected translateService: TranslateService,
    protected modalService: NgbModal
  ) {
    super(customerService, translateService, modalService, new Customer());

  }

  ngOnInit() {
  }

  shareSelected(val: any) {
    this.sendSelectedValOnSearch.emit(val);
  }

}
