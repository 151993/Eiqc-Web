import { Input } from '@angular/core';
import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColumnType } from 'src/app/model/table/table';
import { NonJabilUserService } from 'src/app/services/non-jabil-user/non-jabil-user.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { environment } from 'src/environments/environment';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_SUPPLIERUSER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteSupplierUserComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-supplier-user',
  templateUrl: './j-auto-complete-supplier-user.component.html',
  styleUrls: ['./j-auto-complete-supplier-user.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_SUPPLIERUSER_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteSupplierUserComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  @Input() supplierId: number;
  constructor(
    private nonJabilUserService: NonJabilUserService // tslint:disable-line
  ) {
    super(nonJabilUserService);
  }

  getData() {
    if (this.supplierId > 0) {
      this.pageSortFilterInfo = new PageSortFilterInfo();
      this.getFilterByColumnName(this.supplierId, 'supplierId', 'supplierId', SearchOperator.IsEqualTo, ColumnType.Number, this.pageSortFilterInfo);
      this.nonJabilUserService.getAllData(this.pageSortFilterInfo).subscribe((data) => {
        this.autoCompleteConfig.suggestions = data.value;
        this.data = data.value;
      });
    } else {
      super.getData();
    }
  }

  search(event) {
    if (this.supplierId > 0) {
      if (this.onCompleteMethod.observers.length === 0) {
        if (event.query.trim() !== Constants.Empty) {
          this.pageSortFilterInfo = new PageSortFilterInfo();
          this.getFilterByColumnName(this.supplierId, 'supplierId', 'supplierId', SearchOperator.IsEqualTo, ColumnType.Number, this.pageSortFilterInfo);
          this.getFilterByColumnName(event.query, this.autoCompleteConfig.mappingField, `tolower(${this.autoCompleteConfig.mappingField})`,
            SearchOperator.Contains, ColumnType.String, this.pageSortFilterInfo);
          this.nonJabilUserService.
            getAllData(this.pageSortFilterInfo)
            .subscribe(data => {
              this.autoCompleteConfig.suggestions = data.value.splice(
                0,
                environment.limit.maxResult
              );
            });
        }
      } else {
        this.onCompleteMethod.emit(event);
      }
    } else {
      super.search(event);
    }
  }


}
