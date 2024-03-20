import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FunctionTestItemService } from 'src/app/services/function-test-item/function-test-item.service';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_FUNCTIONTESTITEM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteFunctionTestItemComponent),
  multi: true
};
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-function-test-item',
  templateUrl: './j-auto-complete-function-test-item.component.html',
  styleUrls: ['./j-auto-complete-function-test-item.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_FUNCTIONTESTITEM_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteFunctionTestItemComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private functionTestItemService: FunctionTestItemService // tslint:disable-line
  ) {
    super(functionTestItemService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
