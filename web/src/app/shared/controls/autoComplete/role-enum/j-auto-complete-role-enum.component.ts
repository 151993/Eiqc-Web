
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { RoleEnumService } from 'src/app/services/role-enum/role-enum.service';
import { Constants, RoleType, SearchOperator } from 'src/app/shared/constant/global';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';

export const CUSTOM_AUTOCOMPLETE_ROLEENUM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteRoleEnumComponent),
  multi: true
};

const roleEnumField = 'id';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-role-enum',
  templateUrl: './j-auto-complete-role-enum.component.html',
  styleUrls: ['./j-auto-complete-role-enum.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_ROLEENUM_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteRoleEnumComponent extends BaseAutoComplete implements OnInit {

  pageSortFilterInfo = new PageSortFilterInfo();
  @Input() isNonJabilUser: boolean;
  constructor(
    private roleEnumService: RoleEnumService, // tslint:disable-line
    private authService: AuthService,
  ) {
    super(roleEnumService);
  }

  getData() {
    if (this.isNonJabilUser) {
      this.pageSortFilterInfo = new PageSortFilterInfo();
       this.roleEnumService.getRoleForNonJabilUser(this.pageSortFilterInfo).subscribe((data) => {
        this.autoCompleteConfig.suggestions = data.value;
        this.data = data.value;
      });
    } else {
      this.pageSortFilterInfo = new PageSortFilterInfo();
      const currentUser = this.authService.retrieveUser();
        if (currentUser && currentUser.roles) {
            const roleEnumId = currentUser.roles[0].roleEnumId;
            this.validateListBasedOnRole(roleEnumId);
        }
      this.roleEnumService.getAllData(this.pageSortFilterInfo).subscribe((data) => {
       this.autoCompleteConfig.suggestions = data.value;
       this.data = data.value;
     });
    }
  }

   validateListBasedOnRole(roleEnumId: any) {
    if (roleEnumId === RoleType.Site_SME) {
      this.getFilterByColumnName(RoleType.Site_SME, roleEnumField, roleEnumField, SearchOperator.NotEqualTo,
        ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.And);
      this.getFilterByColumnName(RoleType.Global_Admin, roleEnumField, roleEnumField, SearchOperator.NotEqualTo,
        ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.And);
    } else if (roleEnumId === RoleType.Jabil_SQE) {
      this.getFilterByColumnName(RoleType.Supplier, roleEnumField, roleEnumField, SearchOperator.IsEqualTo,
        ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.Or);
      this.getFilterByColumnName(RoleType.Customer, roleEnumField, roleEnumField, SearchOperator.IsEqualTo,
        ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.Or);
    }
  }

  search(event) {
    if (this.isNonJabilUser) {
      if (this.onCompleteMethod.observers.length === 0) {
        if (event.query.trim() !== Constants.Empty) {
          this.pageSortFilterInfo = new PageSortFilterInfo();
          this.roleEnumService.
          getRoleForNonJabilUser(this.pageSortFilterInfo)
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

      if (this.onCompleteMethod.observers.length === 0) {
        if (event.query.trim() !== Constants.Empty) {
          const currentUser = this.authService.retrieveUser();
          this.pageSortFilterInfo = new PageSortFilterInfo();
          if (currentUser && currentUser.roles) {
            const roleEnumId = currentUser.roles[0].roleEnumId;
            this.validateListBasedOnRole(roleEnumId);
        }
          this.roleEnumService.
          getAllData(this.pageSortFilterInfo)
            .subscribe(data => {
              this.autoCompleteConfig.suggestions = data.value.splice(
                0,
                environment.limit.maxResult
              );
            });
        }
      }
    }
  }

}
