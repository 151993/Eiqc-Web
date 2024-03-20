import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommodityCategoryService } from 'src/app/services/commodity-category/commodity-category.service';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_COMMODITYCATEGORY_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteCommodityCategoryComponent),
  multi: true
};
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-commodity-category',
  templateUrl: './j-auto-complete-commodity-category.component.html',
  styleUrls: ['./j-auto-complete-commodity-category.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_COMMODITYCATEGORY_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteCommodityCategoryComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private commodityCategoryService: CommodityCategoryService // tslint:disable-line
  ) {
    super(commodityCategoryService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
