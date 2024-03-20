import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AdminCertificationService } from 'src/app/services/admin-certification/admin-certification.service';
import { BaseAutoComplete } from '../../base-auto-complete';

export const CUSTOM_AUTOCOMPLETE_ADMIN_CERTIFICATION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteAdminCertificationComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-admin-certification',
  templateUrl: './j-auto-complete-admin-certification.component.html',
  styleUrls: ['./j-auto-complete-admin-certification.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_ADMIN_CERTIFICATION_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteAdminCertificationComponent extends BaseAutoComplete implements OnInit {
  constructor(
    private adminCertificationService: AdminCertificationService // tslint:disable-line
  ) {
    super(adminCertificationService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
