/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { UOMService } from 'src/app/services/uom/uom.service';

export const CUSTOM_AUTOCOMPLETE_UOM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteUOMComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-uom',
  templateUrl: './j-auto-complete-uom.component.html',
  styleUrls: ['./j-auto-complete-uom.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_UOM_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteUOMComponent extends BaseAutoComplete implements OnInit {
 constructor(
    private uOMService: UOMService // tslint:disable-line
  ) {
    super(uOMService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name}';
    }
  }

}
