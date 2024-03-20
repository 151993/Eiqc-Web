/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { PCCodeService } from 'src/app/services/pc-code/pc-code.service';

export const CUSTOM_AUTOCOMPLETE_PCCODE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompletePCCodeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-pc-code',
  templateUrl: './j-auto-complete-pc-code.component.html',
  styleUrls: ['./j-auto-complete-pc-code.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PCCODE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompletePCCodeComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private pCCodeService: PCCodeService // tslint:disable-line
  ) {
    super(pCCodeService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.code}';
    }
  }

}
