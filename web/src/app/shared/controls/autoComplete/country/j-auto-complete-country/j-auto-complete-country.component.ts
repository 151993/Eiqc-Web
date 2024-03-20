import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountryService } from 'src/app/services/country/country.service';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteCountryComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-country',
  templateUrl: './j-auto-complete-country.component.html',
  styleUrls: ['./j-auto-complete-country.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteCountryComponent extends BaseAutoComplete implements OnInit {
  constructor(
    private countryService: CountryService // tslint:disable-line
  ) {
    super(countryService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
