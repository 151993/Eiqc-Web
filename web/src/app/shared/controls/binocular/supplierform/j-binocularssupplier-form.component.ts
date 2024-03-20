/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SupplierFormService } from 'src/app/services/{--entity}/{--entity}.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { BaseBinocularsDirective } from '../base-binoculars';

export const CUSTOM_BINOCULAR_SUPPLIERFORM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,   // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JBinocularsSupplierFormComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-binoculars-supplier-form',
  templateUrl: './j-binoculars-supplier-form.component.html',
  styleUrls: ['./j-binoculars-supplier-form.component.css'],
  providers: [CUSTOM_BINOCULAR_SUPPLIERFORM_CONTROL_VALUE_ACCESSOR]
})
export class JBinocularsSupplierFormComponent extends BaseBinocularsDirective
  implements OnInit {
  @Input() dropdown = false;

  @Output() sendSelectedValOnSearch = new EventEmitter();

  constructor(
    protected supplierFormService: SupplierFormService, // tslint:disable-line
    protected translateService: TranslateService,
    protected modalService: NgbModal
  ) {
    super(supplierFormService, translateService, modalService, new SupplierForm());

  }

  ngOnInit() {
  }

  shareSelected(val: any) {
    this.sendSelectedValOnSearch.emit(val);
  }

}
