import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { ParameterManagementService } from 'src/app/services/parameter-management/parameter-management.service';

export const CUSTOM_AUTOCOMPLETE_PARAMETERMANAGEMENT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteParameterManagementComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-parameter-management',
  templateUrl: './j-auto-complete-parameter-management.component.html',
  styleUrls: ['./j-auto-complete-parameter-management.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PARAMETERMANAGEMENT_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteParameterManagementComponent extends BaseAutoComplete implements OnInit {
  @Input() parameterManagementTypeId: number;
  constructor(
    private parameterManagementService: ParameterManagementService // tslint:disable-line
  ) {
    super(parameterManagementService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name}';
    }
  }

  getData() {
    if (this.dropdownClick.observers.length === 0) {
      this.parameterManagementService.getAllData().subscribe(response => {
        this.autoCompleteConfig.suggestions = response.value.filter(x => x.parameterManagementTypeId === this.parameterManagementTypeId);
      });
    } else {
      this.dropdownClick.emit();
    }
  }


}
