import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { WarPageService } from 'src/app/services/war-page/war-page.service';

export const CUSTOM_AUTOCOMPLETE_WARPAGE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteWarPageComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-war-page',
  templateUrl: './j-auto-complete-war-page.component.html',
  styleUrls: ['./j-auto-complete-war-page.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_WARPAGE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteWarPageComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private warPageService: WarPageService // tslint:disable-line
  ) {
    super(warPageService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
