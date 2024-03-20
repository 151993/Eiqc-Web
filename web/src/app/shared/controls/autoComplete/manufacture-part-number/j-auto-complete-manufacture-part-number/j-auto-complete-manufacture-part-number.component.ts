import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColumnType } from 'src/app/model/table/table';
import { PartService } from 'src/app/services/part/part.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { environment } from 'src/environments/environment';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_MANUFACTUREPARTNUMBER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteManuFacturePartNumberComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-manufacture-part-number',
  templateUrl: './j-auto-complete-manufacture-part-number.component.html',
  styleUrls: ['./j-auto-complete-manufacture-part-number.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_MANUFACTUREPARTNUMBER_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteManuFacturePartNumberComponent extends BaseAutoComplete implements OnInit {


  pageSortFilterInfo = new PageSortFilterInfo();
  @Input() partNo: string;
  myArrayType = Array<{id: number, mpn: string, isEnabled: boolean}>();
  constructor(
    private sapPartService: PartService // tslint:disable-line
  ) {
    super(sapPartService);
  }

  getData() {
    if (this.partNo && this.partNo.length > 0) {
      this.pageSortFilterInfo = new PageSortFilterInfo();
      this.getFilterByColumnName(this.partNo, 'JABIL_PART_NO', 'JABIL_PART_NO',
      SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo);
      this.sapPartService.getAllData(this.pageSortFilterInfo).subscribe((data) => {
        this.autoCompleteConfig.suggestions = data.value;
        this.data = data.value;
      });
    }
  }


  search(event) {
    if (this.partNo && this.partNo.length > 0) {
      if (this.onCompleteMethod.observers.length === 0) {
        if (event.query.trim() !== Constants.Empty) {
          this.pageSortFilterInfo = new PageSortFilterInfo();
          this.getFilterByColumnName(this.partNo.trim(), this.autoCompleteConfig.mappingField, `${this.autoCompleteConfig.mappingField}`,
          SearchOperator.Contains, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo);
          this.getFilterByColumnName(this.partNo, 'JABIL_PART_NO', 'JABIL_PART_NO', SearchOperator.Contains, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo);
          this.sapPartService.
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
