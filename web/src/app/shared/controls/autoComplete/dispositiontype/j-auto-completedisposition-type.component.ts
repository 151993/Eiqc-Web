/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { DispositionTypeService } from 'src/app/services/disposition-type/disposition-type.service';

export const CUSTOM_AUTOCOMPLETE_DISPOSITIONTYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteDispositionTypeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-disposition-type',
  templateUrl: './j-auto-complete-disposition-type.component.html',
  styleUrls: ['./j-auto-complete-disposition-type.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_DISPOSITIONTYPE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteDispositionTypeComponent extends BaseAutoComplete implements OnInit {
  
  constructor(
    private dispositionTypeService: DispositionTypeService // tslint:disable-line
  ) {
    super(dispositionTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
