import { Component, forwardRef, OnInit } from '@angular/core';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { ProductLifeCycleStageService } from 'src/app/services/product-life-cycle-stage/product-life-cycle-stage.service';
import { BaseAutoComplete } from '../../base-auto-complete';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_AUTOCOMPLETE_PRODUCTLIFECYCLESTAGE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteProductLifeCycleStageComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-product-life-cycle-stage',
  templateUrl: './j-auto-complete-product-life-cycle-stage.component.html',
  styleUrls: ['./j-auto-complete-product-life-cycle-stage.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PRODUCTLIFECYCLESTAGE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteProductLifeCycleStageComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  constructor(
    private productLifeCycleStageService: ProductLifeCycleStageService // tslint:disable-line
  ) {
    super(productLifeCycleStageService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
