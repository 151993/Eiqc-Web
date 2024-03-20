/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UOMService } from 'src/app/services/{--entity}/{--entity}.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UOM } from 'src/app/model/uom/uom';
import { BaseBinocularsDirective } from '../base-binoculars';

export const CUSTOM_BINOCULAR_UOM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,   // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JBinocularsUOMComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-binoculars-uom',
  templateUrl: './j-binoculars-uom.component.html',
  styleUrls: ['./j-binoculars-uom.component.css'],
  providers: [CUSTOM_BINOCULAR_UOM_CONTROL_VALUE_ACCESSOR]
})
export class JBinocularsUOMComponent extends BaseBinocularsDirective
  implements OnInit {
  @Input() dropdown = false;

  @Output() sendSelectedValOnSearch = new EventEmitter();

  constructor(
    protected uOMService: UOMService, // tslint:disable-line
    protected translateService: TranslateService,
    protected modalService: NgbModal
  ) {
    super(uOMService, translateService, modalService, new UOM());

  }

  ngOnInit() {
  }

  shareSelected(val: any) {
    this.sendSelectedValOnSearch.emit(val);
  }

}
