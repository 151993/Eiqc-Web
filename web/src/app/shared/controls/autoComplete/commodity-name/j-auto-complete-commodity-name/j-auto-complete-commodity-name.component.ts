import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommodityNameService } from 'src/app/services/commodity-name/commodity-name.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_COMMODITYNAME_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteCommodityNameComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-commodity-name',
  templateUrl: './j-auto-complete-commodity-name.component.html',
  styleUrls: ['./j-auto-complete-commodity-name.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_COMMODITYNAME_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteCommodityNameComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  constructor(
    private commodityNameService: CommodityNameService // tslint:disable-line
  ) {
    super(commodityNameService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
