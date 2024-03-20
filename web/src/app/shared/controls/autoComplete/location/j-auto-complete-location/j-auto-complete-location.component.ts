import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { LocationService } from 'src/app/services/location/location.service';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_LOCATION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteLocationComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-location',
  templateUrl: './j-auto-complete-location.component.html',
  styleUrls: ['./j-auto-complete-location.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_LOCATION_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteLocationComponent extends BaseAutoComplete
  implements OnInit {
  constructor(
    private locationService: LocationService // tslint:disable-line
  ) {
    super(locationService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
