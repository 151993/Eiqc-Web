import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaterialGroupService } from 'src/app/services/material-group/material-group.service';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_MATERIALGROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteMaterialGroupComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-material-group',
  templateUrl: './j-auto-complete-material-group.component.html',
  styleUrls: ['./j-auto-complete-material-group.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_MATERIALGROUP_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteMaterialGroupComponent extends BaseAutoComplete implements OnInit {
  constructor(
    private materialGroupService: MaterialGroupService // tslint:disable-line
  ) {
    super(materialGroupService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
