/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { CommodityCategoryService } from 'src/app/services/commodity-category/commodity-category.service';
import { Options, SearchOperator } from 'src/app/shared/constant/global';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { ColumnType } from 'src/app/model/table/table';

export const CUSTOM_AUTOCOMPLETE_COMMODITYCATEGORYNAME_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteCommodityCategoryNameComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-commodity-category-name',
  templateUrl: './j-auto-complete-commodity-category-name.component.html',
  styleUrls: ['./j-auto-complete-commodity-category-name.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_COMMODITYCATEGORYNAME_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteCommodityCategoryNameComponent extends BaseAutoComplete implements OnInit {
  @Input() commodityCategoryOptionId: number;
  constructor(
    private commodityCategoryService: CommodityCategoryService // tslint:disable-line
  ) {
    super(commodityCategoryService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getData() {
    if (this.dropdownClick.observers.length === 0) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      pageSortFilterInfo.filterInfo = [];
      const filterInfo = new FilterInfo();
      filterInfo.columnName = 'CommodityCategoryOptionId';
      filterInfo.columnType = ColumnType.Number;
      filterInfo.mappingField = 'CommodityCategoryOptionId';
      filterInfo.value = this.commodityCategoryOptionId ?? 1;
      filterInfo.operator = SearchOperator.IsEqualTo;
      pageSortFilterInfo.filterInfo.push(filterInfo);
      pageSortFilterInfo.expandInfo = {
        expand: [
          {
            'commodityCategoryType': {
            }
          }
        ]
      };
      this.commodityCategoryService.getAllData(pageSortFilterInfo).subscribe(response => {
        this.autoCompleteConfig.suggestions = this.getConcatData(response.value);
      });
    } else {
      this.dropdownClick.emit();
    }
  }

  getConcatData(response) {
    response.map(element => {
      if (element.name === Options.Other) {
        element.name = element.name;
      } else {
        element.name = `${element.commodityCategoryType.name}${'-'}${element.name}`;
      }
    });
    return response;
  }
}
