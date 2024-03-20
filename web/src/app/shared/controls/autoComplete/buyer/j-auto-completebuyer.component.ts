
import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { BuyerService } from 'src/app/services/buyer/buyer.service';

export const CUSTOM_AUTOCOMPLETE_BUYER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteBuyerComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-buyer',
  templateUrl: './j-auto-complete-buyer.component.html',
  styleUrls: ['./j-auto-complete-buyer.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_BUYER_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteBuyerComponent extends BaseAutoComplete implements OnInit {
  constructor(
    private buyerService: BuyerService // tslint:disable-line
  ) {
    super(buyerService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
