/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { GRSService } from 'src/app/services/grs/grs.service';

export const CUSTOM_AUTOCOMPLETE_GRS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteGRSComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-grs',
  templateUrl: './j-auto-complete-grs.component.html',
  styleUrls: ['./j-auto-complete-grs.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_GRS_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteGRSComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private gRSService: GRSService // tslint:disable-line
  ) {
    super(gRSService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name}';
    }
  }

}
