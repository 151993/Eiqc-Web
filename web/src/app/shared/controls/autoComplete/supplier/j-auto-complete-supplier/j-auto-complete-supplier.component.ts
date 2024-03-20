import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColumnType } from 'src/app/model/table/table';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_SUPPLIER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteSupplierComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-supplier',
  templateUrl: './j-auto-complete-supplier.component.html',
  styleUrls: ['./j-auto-complete-supplier.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_SUPPLIER_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteSupplierComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  maxResult = 500;
  constructor(
    private supplierService: SupplierService // tslint:disable-line
  ) {
    super(supplierService);
    this.autoCompleteConfig.suggestions = [];
    this.pageSortFilterInfo = new PageSortFilterInfo();
    this.pageSortFilterInfo.paginationInfo.pageSize = 1000;

    const purchanseOrgFilterInfo = new FilterInfo();
    purchanseOrgFilterInfo.columnName = 'PurchaseOrg';
    purchanseOrgFilterInfo.columnType = ColumnType.String;
    purchanseOrgFilterInfo.mappingField = '';
    purchanseOrgFilterInfo.operator = SearchOperator.IsNotNull;
    this.pageSortFilterInfo.filterInfo.push(purchanseOrgFilterInfo);

    const companyCodeFilterInfo = new FilterInfo();
    companyCodeFilterInfo.columnName = 'CompanyCode';
    companyCodeFilterInfo.columnType = ColumnType.String;
    companyCodeFilterInfo.mappingField = '';
    companyCodeFilterInfo.operator = SearchOperator.IsNotNull;
    this.pageSortFilterInfo.filterInfo.push(companyCodeFilterInfo);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.vendorName} (${value.vendorCode})';
    }
  }

  getData() {
    this.supplierService.getAllData(this.pageSortFilterInfo).subscribe((data) => {
      this.autoCompleteConfig.suggestions = data.value.splice(
        0,
        this.maxResult

      );
      this.data = data.value;
    });
  }

  search(event) {
    this.pageSortFilterInfo = new PageSortFilterInfo();
    this.pageSortFilterInfo.paginationInfo.pageSize = 1000;

    const purchanseOrgFilterInfo = new FilterInfo();
    purchanseOrgFilterInfo.columnName = 'PurchaseOrg';
    purchanseOrgFilterInfo.columnType = ColumnType.String;
    purchanseOrgFilterInfo.mappingField = '';
    purchanseOrgFilterInfo.operator = SearchOperator.IsNotNull;
    this.pageSortFilterInfo.filterInfo.push(purchanseOrgFilterInfo);

    const companyCodeFilterInfo = new FilterInfo();
    companyCodeFilterInfo.columnName = 'CompanyCode';
    companyCodeFilterInfo.columnType = ColumnType.String;
    companyCodeFilterInfo.mappingField = '';
    companyCodeFilterInfo.operator = SearchOperator.IsNotNull;
    this.pageSortFilterInfo.filterInfo.push(companyCodeFilterInfo);


    if (this.onCompleteMethod.observers.length === 0) {
      if (event.query.trim() !== Constants.Empty) {
        this.getFilterByColumnName(event.query.trim(), this.autoCompleteConfig.mappingField, `tolower(${this.autoCompleteConfig.mappingField})`,
          SearchOperator.Contains, ColumnType.String, this.pageSortFilterInfo);
        this.supplierService.
          getAllData(this.pageSortFilterInfo)
          .subscribe(data => {
            this.autoCompleteConfig.suggestions = data.value.splice(
              0,
              this.maxResult

            );
          });
      }
    } else {
      this.onCompleteMethod.emit(event);
    }
  }
}
