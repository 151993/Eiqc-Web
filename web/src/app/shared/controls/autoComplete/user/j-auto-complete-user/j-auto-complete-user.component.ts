import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../../base-auto-complete';
import { UserService } from 'src/app/services/user/user.service';

export const CUSTOM_AUTOCOMPLETE_USER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteUserComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-user',
  templateUrl: './j-auto-complete-user.component.html',
  styleUrls: ['./j-auto-complete-user.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_USER_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteUserComponent extends BaseAutoComplete
  implements OnInit {
  @Input() dropdown = false;

  constructor(
    private userService: UserService // tslint:disable-line
  ) {
    super(userService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name} (${value.userName})';
    }
  }
}
