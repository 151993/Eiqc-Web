/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../base-auto-complete';
import { TestReportService } from 'src/app/services/test-report/test-report.service';

export const CUSTOM_AUTOCOMPLETE_TESTREPORT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteTestReportComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-test-report',
  templateUrl: './j-auto-complete-test-report.component.html',
  styleUrls: ['./j-auto-complete-test-report.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_TESTREPORT_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteTestReportComponent extends BaseAutoComplete implements OnInit {

  constructor(
    private testReportService: TestReportService // tslint:disable-line
  ) {
    super(testReportService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.config) {
      this.autoCompleteConfig.format = '${value.name}';
    }
  }

}
