/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CTParameterService } from 'src/app/services/{--entity}/{--entity}.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CTParameter } from 'src/app/model/ct-parameter/ct-parameter';
import { BaseBinocularsDirective } from '../base-binoculars';

export const CUSTOM_BINOCULAR_CTPARAMETER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,   // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JBinocularsCTParameterComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-binoculars-ct-parameter',
  templateUrl: './j-binoculars-ct-parameter.component.html',
  styleUrls: ['./j-binoculars-ct-parameter.component.css'],
  providers: [CUSTOM_BINOCULAR_CTPARAMETER_CONTROL_VALUE_ACCESSOR]
})
export class JBinocularsCTParameterComponent extends BaseBinocularsDirective
  implements OnInit {
  @Input() dropdown = false;

  @Output() sendSelectedValOnSearch = new EventEmitter();

  constructor(
    protected cTParameterService: CTParameterService, // tslint:disable-line
    protected translateService: TranslateService,
    protected modalService: NgbModal
  ) {
    super(cTParameterService, translateService, modalService, new CTParameter());

  }

  ngOnInit() {
  }

  shareSelected(val: any) {
    this.sendSelectedValOnSearch.emit(val);
  }

}
