import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../../base-auto-complete';
import { SiteService } from 'src/app/services/site/site.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { environment } from 'src/environments/environment';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';

export const CUSTOM_AUTOCOMPLETE_SITE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteSiteComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-site',
  templateUrl: './j-auto-complete-site.component.html',
  styleUrls: ['./j-auto-complete-site.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_SITE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteSiteComponent extends BaseAutoComplete implements OnInit {
  pageSortFilterInfo = new PageSortFilterInfo();
  @Input() isSiteSME: boolean;
  @Input() siteCode: string;
  constructor(
    private siteService: SiteService // tslint:disable-line
  ) {
    super(siteService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getData() {
    if (this.isSiteSME && this.siteCode.length > 0) {
      this.getFilterByColumnName(this.siteCode, 'code', 'code', SearchOperator.IsEqualTo, ColumnType.String, this.pageSortFilterInfo);
        this.siteService.getAllData(this.pageSortFilterInfo).subscribe((data) => {
        this.autoCompleteConfig.suggestions = data.value;
        this.data = data.value;
      });
    }  else {
      super.getData(true);
    }
  }

  search(event) {
    this.pageSortFilterInfo = new PageSortFilterInfo();
     if (this.isSiteSME && this.siteCode.length > 0) {
      if (this.onCompleteMethod.observers.length === 0) {
        if (event.query.trim() !== Constants.Empty) {
          this.getFilterByMultipleColumnNames(this.siteCode, ['name', 'code'], ['name', 'code'], [SearchOperator.Contains, SearchOperator.Contains],
          [ColumnType.String, ColumnType.String] , this.pageSortFilterInfo, FilterCondition.Or);
          this.siteService.
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
    } else if (event.query.length > 0) {
      this.getFilterByMultipleColumnNames(event.query, ['name', 'code'], ['name', 'code'], [SearchOperator.Contains, SearchOperator.Contains],
          [ColumnType.String, ColumnType.String], this.pageSortFilterInfo, FilterCondition.Or);
          this.siteService.
            getAllData(this.pageSortFilterInfo)
            .subscribe(data => {
              this.autoCompleteConfig.suggestions = data.value.map((value) => { value['name'] = value['name'] + ' - ' + value['code']; return value; }).splice(
                0,
                environment.limit.maxResult
              );
            });
    } else {
      super.search(event, true);
    }
  }
}
