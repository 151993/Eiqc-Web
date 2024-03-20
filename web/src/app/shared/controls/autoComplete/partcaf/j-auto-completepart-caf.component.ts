/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { PartCAFService } from 'src/app/services/part-caf/part-caf.service';

export const CUSTOM_AUTOCOMPLETE_PARTCAF_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompletePartCAFComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-part-caf',
  templateUrl: './j-auto-complete-part-caf.component.html',
  styleUrls: ['./j-auto-complete-part-caf.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PARTCAF_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompletePartCAFComponent extends BaseAutoComplete implements OnInit {
  
  constructor(
    private partCAFService: PartCAFService // tslint:disable-line
  ) {
    super(partCAFService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
