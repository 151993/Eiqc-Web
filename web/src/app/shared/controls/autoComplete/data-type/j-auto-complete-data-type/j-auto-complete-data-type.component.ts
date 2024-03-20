import { Component, forwardRef, OnInit } from '@angular/core';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';
import { BaseAutoComplete } from '../../base-auto-complete';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_AUTOCOMPLETE_DATATYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteDataTypeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-data-type',
  templateUrl: './j-auto-complete-data-type.component.html',
  styleUrls: ['./j-auto-complete-data-type.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_DATATYPE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteDataTypeComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  constructor(
    private dataTypeService: DataTypeService // tslint:disable-line
  ) {
    super(dataTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
