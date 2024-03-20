import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DivisionService } from 'src/app/services/division/division.service';
import { BaseAutoComplete } from '../../base-auto-complete';
export const CUSTOM_AUTOCOMPLETE_DIVISION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteDivisionComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-division',
  templateUrl: './j-auto-complete-division.component.html',
  styleUrls: ['./j-auto-complete-division.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_DIVISION_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteDivisionComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private divisionService: DivisionService // tslint:disable-line
  ) {
    super(divisionService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
