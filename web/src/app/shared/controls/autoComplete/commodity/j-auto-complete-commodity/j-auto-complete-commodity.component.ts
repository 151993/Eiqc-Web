import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { Commodity } from 'src/app/model/commodity/commodity';
import { ColumnType } from 'src/app/model/table/table';
import { CommodityService } from 'src/app/services/commodity/commodity.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { PageSortFilterInfo, SortingInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseAutoComplete } from '../../base-auto-complete';


export const CUSTOM_AUTOCOMPLETE_COMMODITY_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteCommodityComponent),
  multi: true
};


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-commodity',
  templateUrl: './j-auto-complete-commodity.component.html',
  styleUrls: ['./j-auto-complete-commodity.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_COMMODITY_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteCommodityComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  maxResult = 50;
  constructor(
    private commodityService: CommodityService // tslint:disable-line
  ) {
    super(commodityService);
    this.autoCompleteConfig.suggestions = [];
    this.pageSortFilterInfo = new PageSortFilterInfo();
    this.pageSortFilterInfo.paginationInfo.pageSize = 1000;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getData() {
    this.commodityService.getAllData(this.pageSortFilterInfo).subscribe((data) => {
      if (data.value.length > 0) {
        const commodityData = this.getDistinctCommodity(data);
        this.autoCompleteConfig.suggestions = commodityData.splice(
          0,
          this.maxResult
        );
        this.data = commodityData;
      }
    });
  }


  search(event) {
    this.pageSortFilterInfo = new PageSortFilterInfo();
    this.pageSortFilterInfo.paginationInfo.pageSize = 1000;
    if (event.query.trim() === Constants.Empty) {
      const sortingInfo = new SortingInfo();
      sortingInfo.columnType = ColumnType.String;
      sortingInfo.mappingField = this.autoCompleteConfig.mappingField;
      sortingInfo.columnName = `tolower(${this.autoCompleteConfig.mappingField})`;
      sortingInfo.sortBy = 'asc';
      this.pageSortFilterInfo.sortingInfo.push(sortingInfo);
    }

    if (this.onCompleteMethod.observers.length === 0) {
      if (event.query.trim() !== Constants.Empty) {
        this.getFilterByColumnName(event.query.trim(), this.autoCompleteConfig.mappingField, `tolower(${this.autoCompleteConfig.mappingField})`,
          SearchOperator.StartsWith, ColumnType.String, this.pageSortFilterInfo);
        this.commodityService.
          getAllData(this.pageSortFilterInfo)
          .subscribe(data => {
            if (data.value.length > 0) {
              const commodityData = this.getDistinctCommodity(data);
              this.autoCompleteConfig.suggestions = commodityData.splice(
                0,
                this.maxResult
              );
            }
          });
      }
    } else {
      this.onCompleteMethod.emit(event);
    }

  }


  private getDistinctCommodity(data: ApiResponse<Commodity>) {
    return data.value.filter((v, i, a) => a.findIndex(v2 => (v.name === v2.name)) === i);
  }


}
