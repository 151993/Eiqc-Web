/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../../base-auto-complete';
import { PartService } from 'src/app/services/part/part.service';

export const CUSTOM_AUTOCOMPLETE_PART_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompletePartComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-part',
  templateUrl: './j-auto-complete-part.component.html',
  styleUrls: ['./j-auto-complete-part.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PART_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompletePartComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private partService: PartService // tslint:disable-line
  ) {
    super(partService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
