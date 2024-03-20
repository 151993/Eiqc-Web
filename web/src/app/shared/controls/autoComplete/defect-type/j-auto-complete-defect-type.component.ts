/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { ColumnType } from 'src/app/model/table/table';
import { SearchOperator } from 'src/app/shared/constant/global';
import { DefectTypeService } from 'src/app/services/defect-type/defect-type.service';

export const CUSTOM_AUTOCOMPLETE_DEFECTTYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteDefectTypeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-defect-type',
  templateUrl: './j-auto-complete-defect-type.component.html',
  styleUrls: ['./j-auto-complete-defect-type.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_DEFECTTYPE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteDefectTypeComponent extends BaseAutoComplete implements OnInit {
  @Input() sectionId: number;
  constructor(
    private defectManagementService: DefectTypeService // tslint:disable-line
  ) {
    super(defectManagementService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.defectTypeName} ';
    }
  }

  getData() {

    if (this.dropdownClick.observers.length === 0) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      pageSortFilterInfo.filterInfo = [];
      const filterInfo = new FilterInfo();
      filterInfo.columnName = 'DefectSectionId';
      filterInfo.columnType = ColumnType.Number;
      filterInfo.mappingField = 'DefectSectionId';
      filterInfo.value = this.sectionId ?? 1;
      filterInfo.operator = SearchOperator.IsEqualTo;
      pageSortFilterInfo.filterInfo.push(filterInfo);
      this.defectManagementService.getDefectTypeNameBySection(this.sectionId).subscribe(response => {
        this.autoCompleteConfig.suggestions = response.value;
      });
    } else {
      this.dropdownClick.emit();
    }
  }

}
