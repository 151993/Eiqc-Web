/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { ParameterCategoryService } from 'src/app/services/parameter-category/parameter-category.service';

export const CUSTOM_AUTOCOMPLETE_PARAMETERCATEGORY_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteParameterCategoryComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-parameter-category',
  templateUrl: './j-auto-complete-parameter-category.component.html',
  styleUrls: ['./j-auto-complete-parameter-category.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PARAMETERCATEGORY_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteParameterCategoryComponent extends BaseAutoComplete implements OnInit {
  
  constructor(
    private parameterCategoryService: ParameterCategoryService // tslint:disable-line
  ) {
    super(parameterCategoryService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
