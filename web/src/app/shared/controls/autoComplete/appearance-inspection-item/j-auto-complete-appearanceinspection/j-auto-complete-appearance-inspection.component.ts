import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppearanceInspectionService } from 'src/app/services/appearance-inspection/appearance-inspection.service';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_COMMODITYNAME_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteAppearanceInspectionComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-appearance-inspection',
  templateUrl: './j-auto-complete-appearance-inspection.component.html',
  styleUrls: ['./j-auto-complete-appearance-inspection.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_COMMODITYNAME_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteAppearanceInspectionComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private appearanceInspectionService: AppearanceInspectionService // tslint:disable-line
  ) {
    super(appearanceInspectionService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
