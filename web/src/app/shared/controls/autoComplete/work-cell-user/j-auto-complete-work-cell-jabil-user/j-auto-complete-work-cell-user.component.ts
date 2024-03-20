import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { WorkCellService } from 'src/app/services/workcell/work-cell.service';
import { BaseAutoComplete } from '../../base-auto-complete';
import { AuthService } from 'src/app/auth/auth.service';

export const CUSTOM_AUTOCOMPLETE_WorkCell_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteWorkCellUserComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-work-cell-user',
  templateUrl: './j-auto-complete-work-cell-user.component.html',
  styleUrls: ['./j-auto-complete-work-cell-user.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_WorkCell_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteWorkCellUserComponent extends BaseAutoComplete implements OnInit {

  constructor(
    protected authService: AuthService,
    private workCellService: WorkCellService
  ) {
    super(workCellService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getWorkCell() {

    const userId = this.authService.retrieveUser().id;
    const siteId = this.authService.retrieveSite().id;

    this.workCellService.getWorkCellByUserAndSite(userId, siteId).subscribe(response => {
      this.autoCompleteConfig.suggestions = this.getConcatData(response.value);
    });
  }

  getConcatData(response) {
    response.map(element => {
      element.name = element.name;
    });
    return response;
  }

}
