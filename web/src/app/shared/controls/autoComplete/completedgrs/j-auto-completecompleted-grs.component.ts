/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { CompletedGRSService } from 'src/app/services/completed-grs/completed-grs.service';

export const CUSTOM_AUTOCOMPLETE_COMPLETEDGRS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteCompletedGRSComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-completed-grs',
  templateUrl: './j-auto-complete-completed-grs.component.html',
  styleUrls: ['./j-auto-complete-completed-grs.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_COMPLETEDGRS_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteCompletedGRSComponent extends BaseAutoComplete implements OnInit {
  @Input() dropdown = false;
  
  constructor(
    private completedGRSService: CompletedGRSService // tslint:disable-line
  ) {
    super(completedGRSService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
