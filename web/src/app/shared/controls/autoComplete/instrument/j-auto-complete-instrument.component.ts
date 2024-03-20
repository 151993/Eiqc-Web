/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { InstrumentService } from 'src/app/services/instrument/instrument.service';

export const CUSTOM_AUTOCOMPLETE_INSTRUMENT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteInstrumentComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-instrument',
  templateUrl: './j-auto-complete-instrument.component.html',
  styleUrls: ['./j-auto-complete-instrument.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_INSTRUMENT_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteInstrumentComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private instrumentService: InstrumentService // tslint:disable-line
  ) {
    super(instrumentService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
