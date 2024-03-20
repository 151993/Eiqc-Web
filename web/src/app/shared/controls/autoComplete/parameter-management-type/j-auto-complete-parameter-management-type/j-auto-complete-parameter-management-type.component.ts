import { Component, forwardRef, OnInit } from '@angular/core';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { ParameterManagementTypeService } from 'src/app/services/parameter-management-type/parameter-managment-type.service';
import { BaseAutoComplete } from '../../base-auto-complete';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_AUTOCOMPLETE_PARAMETERMANAGEMENTTYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteParameterManagementTypeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-parameter-management-type',
  templateUrl: './j-auto-complete-parameter-management-type.component.html',
  styleUrls: ['./j-auto-complete-parameter-management-type.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PARAMETERMANAGEMENTTYPE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteParameterManagementTypeComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  constructor(
    private parameterManagementTypeService: ParameterManagementTypeService // tslint:disable-line
  ) {
    super(parameterManagementTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
