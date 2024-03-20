/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PartDimensionService } from 'src/app/services/part-dimension/part-dimension.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartDimension } from 'src/app/model/part-dimension/part-dimension';
import { BaseBinocularsDirective } from '../base-binoculars';

export const CUSTOM_BINOCULAR_PART_DIMENSION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,   // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JBinocularsPartDimensionComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-binoculars-part-dimension',
  templateUrl: './j-binoculars-part-dimension.component.html',
  styleUrls: ['./j-binoculars-part-dimension.component.css'],
  providers: [CUSTOM_BINOCULAR_PART_DIMENSION_CONTROL_VALUE_ACCESSOR]
})
export class JBinocularsPartDimensionComponent extends BaseBinocularsDirective
  implements OnInit {
  @Input() dropdown = false;

  @Output() sendSelectedValOnSearch = new EventEmitter();

  constructor(
    protected partDimensionService: PartDimensionService, // tslint:disable-line
    protected translateService: TranslateService,
    protected modalService: NgbModal
  ) {
    super(partDimensionService, translateService, modalService, new PartDimension());

  }

  ngOnInit() {
  }

  shareSelected(val: any) {
    this.sendSelectedValOnSearch.emit(val);
  }

}
