import { Component, OnInit, forwardRef } from '@angular/core';
import { RoleService } from 'src/app/services/role/role.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../../base-auto-complete';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Input } from '@angular/core';
import { Constants } from 'src/app/shared/constant/global';
import { environment } from 'src/environments/environment';

export const CUSTOM_AUTOCOMPLETE_ROLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteRoleComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-role',
  templateUrl: './j-auto-complete-role.component.html',
  styleUrls: ['./j-auto-complete-role.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_ROLE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteRoleComponent extends BaseAutoComplete implements OnInit {
  pageSortFilterInfo = new PageSortFilterInfo();
  @Input() isNonJabilUser: boolean;
  @Input() isJabilUser: boolean;
  constructor(
    private roleService: RoleService // tslint:disable-line
  ) {
    super(roleService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getData() {
    if (this.isNonJabilUser) {
        this.roleService.getRoleForNonJabilUser().subscribe((data) => {
        this.autoCompleteConfig.suggestions = data.value;
        this.data = data.value;
      });
    } else if (this.isJabilUser) {
      this.roleService.getRoleForJabilUser().subscribe((data) => {
        this.autoCompleteConfig.suggestions = data.value;
        this.data = data.value;
      });
    } else {
      super.getData();
    }
  }

  search(event) {
    if (this.isNonJabilUser) {
      if (this.onCompleteMethod.observers.length === 0) {
        if (event.query.trim() !== Constants.Empty) {
          this.roleService.
            getRoleForNonJabilUser()
            .subscribe(data => {
              this.autoCompleteConfig.suggestions = data.value.splice(
                0,
                environment.limit.maxResult
              );
            });
        }
      } else {
        this.onCompleteMethod.emit(event);
      }
    } else if (this.isJabilUser) {
      if (this.onCompleteMethod.observers.length === 0) {
        if (event.query.trim() !== Constants.Empty) {
          this.roleService.
          getRoleForJabilUser()
            .subscribe(data => {
              this.autoCompleteConfig.suggestions = data.value.splice(
                0,
                environment.limit.maxResult
              );
            });
        }
      } else {
        this.onCompleteMethod.emit(event);
      }
    } else {
      super.search(event);
    }
  }

}
