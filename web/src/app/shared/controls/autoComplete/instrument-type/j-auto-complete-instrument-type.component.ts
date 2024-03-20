import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { InstrumentTypeService } from 'src/app/services/instrument-type/instrument-type.service';

export const CUSTOM_AUTOCOMPLETE_INSTRUMENTTYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteInstrumentTypeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-instrument-type',
  templateUrl: './j-auto-complete-instrument-type.component.html',
  styleUrls: ['./j-auto-complete-instrument-type.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_INSTRUMENTTYPE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteInstrumentTypeComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private instrumentTypeService: InstrumentTypeService // tslint:disable-line
  ) {
    super(instrumentTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name}';
    }
  }

}
