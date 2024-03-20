/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { PartDimensionService } from 'src/app/services/part-dimension/part-dimension.service';

export const CUSTOM_AUTOCOMPLETE_PARTDIMENSION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompletePartDimensionComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-part-dimension',
  templateUrl: './j-auto-complete-part-dimension.component.html',
  styleUrls: ['./j-auto-complete-part-dimension.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PARTDIMENSION_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompletePartDimensionComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private partDimensionService: PartDimensionService // tslint:disable-line
  ) {
    super(partDimensionService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name}';
    }
  }

}
