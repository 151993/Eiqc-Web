/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompletedGRS } from 'src/app/model/completed-grs/completed-grs';
import { BaseBinocularsDirective } from '../base-binoculars';
import { CompletedGRSService } from 'src/app/services/completed-grs/completed-grs.service';

export const CUSTOM_BINOCULAR_COMPLETEDGRS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,   // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JBinocularsCompletedGRSComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-binoculars-completed-grs',
  templateUrl: './j-binoculars-completed-grs.component.html',
  styleUrls: ['./j-binoculars-completed-grs.component.css'],
  providers: [CUSTOM_BINOCULAR_COMPLETEDGRS_CONTROL_VALUE_ACCESSOR]
})
export class JBinocularsCompletedGRSComponent extends BaseBinocularsDirective
  implements OnInit {
  @Input() dropdown = false;

  @Output() sendSelectedValOnSearch = new EventEmitter();

  constructor(
    protected completedGRSService: CompletedGRSService, // tslint:disable-line
    protected translateService: TranslateService,
    protected modalService: NgbModal
  ) {
    super(completedGRSService, translateService, modalService, new CompletedGRS());

  }

  ngOnInit() {
  }

  shareSelected(val: any) {
    this.sendSelectedValOnSearch.emit(val);
  }

}
