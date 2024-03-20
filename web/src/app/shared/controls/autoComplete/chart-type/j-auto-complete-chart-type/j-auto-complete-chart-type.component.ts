import { Component, forwardRef, OnInit } from '@angular/core';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseAutoComplete } from '../../base-auto-complete';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChartTypeService } from 'src/app/services/chart-type/chart-type.service';

export const CUSTOM_AUTOCOMPLETE_CHARTTYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteChartTypeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-chart-type',
  templateUrl: './j-auto-complete-chart-type.component.html',
  styleUrls: ['./j-auto-complete-chart-type.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_CHARTTYPE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteChartTypeComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  constructor(
    private chartTypeService: ChartTypeService // tslint:disable-line
  ) {
    super(chartTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
