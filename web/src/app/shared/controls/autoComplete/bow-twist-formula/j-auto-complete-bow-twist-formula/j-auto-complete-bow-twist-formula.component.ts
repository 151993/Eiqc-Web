import { Input } from '@angular/core';
import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColumnType } from 'src/app/model/table/table';
import { BowTwistFormulaService } from 'src/app/services/bow-twist-formula/bow-twist-formula.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { environment } from 'src/environments/environment';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_BOWTWISTFORMULA_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteBowTwistFormulaComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-bow-twist-formula',
  templateUrl: './j-auto-complete-bow-twist-formula.component.html',
  styleUrls: ['./j-auto-complete-bow-twist-formula.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_BOWTWISTFORMULA_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteBowTwistFormulaComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  @Input() warPageId: number;
  constructor(
    private bowTwistFormulaService: BowTwistFormulaService // tslint:disable-line
  ) {
    super(bowTwistFormulaService);
  }

  getData() {
    if (this.warPageId > 0) {
      this.pageSortFilterInfo = new PageSortFilterInfo();
      this.getFilterByColumnName(this.warPageId, 'warPageId', 'warPageId', SearchOperator.IsEqualTo, ColumnType.Number, this.pageSortFilterInfo);
      this.bowTwistFormulaService.getAllData(this.pageSortFilterInfo).subscribe((data) => {
        this.autoCompleteConfig.suggestions = data.value;
        this.data = data.value;
      });
    } else {
      super.getData();
    }
  }

  search(event) {
    if (this.warPageId > 0) {
      if (this.onCompleteMethod.observers.length === 0) {
        if (event.query.trim() !== Constants.Empty) {
          this.pageSortFilterInfo = new PageSortFilterInfo();
          this.getFilterByColumnName(this.warPageId, 'warPageId', 'warPageId', SearchOperator.IsEqualTo, ColumnType.Number, this.pageSortFilterInfo);
          this.getFilterByColumnName(event.query, this.autoCompleteConfig.mappingField, `tolower(${this.autoCompleteConfig.mappingField})`,
            SearchOperator.Contains, ColumnType.String, this.pageSortFilterInfo);
          this.bowTwistFormulaService.
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
