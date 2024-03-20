
import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefectSectionService } from 'src/app/services/defect-section/defect-section.service';
import { BaseAutoComplete } from '../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_DEFECTSECTION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteDefectSectionComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-defect-section',
  templateUrl: './j-auto-complete-defect-section.component.html',
  styleUrls: ['./j-auto-complete-defect-section.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_DEFECTSECTION_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteDefectSectionComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private defectSectionService: DefectSectionService // tslint:disable-line
  ) {
    super(defectSectionService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
