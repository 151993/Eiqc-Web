/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { GroupService } from 'src/app/services/group/group.service';

export const CUSTOM_AUTOCOMPLETE_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteGroupComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-group',
  templateUrl: './j-auto-complete-group.component.html',
  styleUrls: ['./j-auto-complete-group.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_GROUP_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteGroupComponent extends BaseAutoComplete implements OnInit {
  
  constructor(
    private groupService: GroupService // tslint:disable-line
  ) {
    super(groupService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.code})';
    }
  }

}
