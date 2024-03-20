import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../../base-auto-complete';
import { RegionService } from 'src/app/services/region/region.service';

export const CUSTOM_AUTOCOMPLETE_REGION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteRegionComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-region',
  templateUrl: './j-auto-complete-region.component.html',
  styleUrls: ['./j-auto-complete-region.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_REGION_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteRegionComponent extends BaseAutoComplete
  implements OnInit {
  constructor(
    private regionService: RegionService // tslint:disable-line
  ) {
    super(regionService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
