/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buyer } from 'src/app/model/buyer/buyer';
import { BaseBinocularsDirective } from '../base-binoculars';
import { BuyerService } from 'src/app/services/buyer/buyer.service';

export const CUSTOM_BINOCULAR_BUYER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,   // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JBinocularsBuyerComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-binoculars-buyer',
  templateUrl: './j-binoculars-buyer.component.html',
  styleUrls: ['./j-binoculars-buyer.component.css'],
  providers: [CUSTOM_BINOCULAR_BUYER_CONTROL_VALUE_ACCESSOR]
})
export class JBinocularsBuyerComponent extends BaseBinocularsDirective
  implements OnInit {
  @Input() dropdown = false;

  @Output() sendSelectedValOnSearch = new EventEmitter();

  constructor(
    protected buyerService: BuyerService, // tslint:disable-line
    protected translateService: TranslateService,
    protected modalService: NgbModal
  ) {
    super(buyerService, translateService, modalService, new Buyer());

  }

  ngOnInit() {
  }

  shareSelected(val: any) {
    this.sendSelectedValOnSearch.emit(val);
  }

}
