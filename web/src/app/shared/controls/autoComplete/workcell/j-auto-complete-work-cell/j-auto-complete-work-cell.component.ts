import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { WorkCellService } from 'src/app/services/workcell/work-cell.service';
import { BaseAutoComplete } from '../../base-auto-complete';
export const CUSTOM_AUTOCOMPLETE_WorkCell_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteWorkCellComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-work-cell',
  templateUrl: './j-auto-complete-work-cell.component.html',
  styleUrls: ['./j-auto-complete-work-cell.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_WorkCell_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteWorkCellComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private workCellService: WorkCellService // tslint:disable-line
  ) {
    super(workCellService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
