import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { Part } from 'src/app/model/part/part';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { PartService } from 'src/app/services/part/part.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseAutoComplete } from '../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_SAPPART_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteSAPPartComponent),
  multi: true
};


const dataLimit = 25;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-sap-part',
  templateUrl: './j-auto-complete-sap-part.component.html',
  styleUrls: ['./j-auto-complete-sap-part.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_SAPPART_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteSAPPartComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  Site = 'SITE';
  uniquePart: Part[];
  constructor(
    private sapPartService: PartService, // tslint:disable-line
    private _authService: AuthService
  ) {
    super(sapPartService);
    this.autoCompleteConfig.suggestions = [];
    this.pageSortFilterInfo = new PageSortFilterInfo();
    this.pageSortFilterInfo.paginationInfo.pageSize = dataLimit;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getData() {
    if (this.pageSortFilterInfo === undefined) {
      this.pageSortFilterInfo = new PageSortFilterInfo();
  }
    this.getFilterByColumnName(this._authService.retrieveSite().code, this.Site, this.Site, SearchOperator.IsEqualTo,
    ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo,  FilterCondition.And);
    this.sapPartService.getAllData(this.pageSortFilterInfo).subscribe((data) => {

      this.getUniqueList(data);

      this.autoCompleteConfig.suggestions = this.uniquePart.splice(
        0,
        dataLimit
      );
      this.data = this.uniquePart;
    });
  }


  getUniqueList(data: ApiResponse<Part>) {
   this.uniquePart = [];
    if (data.value) {
      data.value.forEach(element => {
        if (!this.uniquePart.find(k => k.partNo === element.partNo)) {
          this.uniquePart.push(element);
        }
      });
    }
  }

  search(event) {
    this.pageSortFilterInfo = new PageSortFilterInfo();
    this.pageSortFilterInfo.paginationInfo.pageSize = dataLimit;
    if (this.onCompleteMethod.observers.length === 0) {
      if (event.query.trim() !== Constants.Empty) {
        this.getFilterByColumnName(event.query.trim(), this.autoCompleteConfig.mappingField, `${this.autoCompleteConfig.mappingField}`,
          SearchOperator.Contains, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo);
        this.sapPartService.
          getAllData(this.pageSortFilterInfo)

          .subscribe(data => {

            this.getUniqueList(data);

            this.autoCompleteConfig.suggestions = this.uniquePart.splice(
              0,
              dataLimit
            );
          });
      }
    } else {
      this.onCompleteMethod.emit(event);
    }

  }


}
