import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../../base-auto-complete';
import { DepartmentService } from 'src/app/services/department/department.service';

export const CUSTOM_AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteDepartmentComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-department',
  templateUrl: './j-auto-complete-department.component.html',
  styleUrls: ['./j-auto-complete-department.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteDepartmentComponent extends BaseAutoComplete
  implements OnInit {
  constructor(
    private departmentService: DepartmentService // tslint:disable-line
  ) {
    super(departmentService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
