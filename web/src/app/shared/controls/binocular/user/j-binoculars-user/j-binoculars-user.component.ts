import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseBinocularsDirective } from '../../base-binoculars';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user/user';


export const CUSTOM_BINOCULAR_USER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,   // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JBinocularsUserComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-binoculars-user',
  templateUrl: './j-binoculars-user.component.html',
  styleUrls: ['./j-binoculars-user.component.css'],
  providers: [CUSTOM_BINOCULAR_USER_CONTROL_VALUE_ACCESSOR]
})

export class JBinocularsUserComponent extends BaseBinocularsDirective
  implements OnInit {
  @Input() dropdown = false;

  @Output() sendSelectedValOnSearch = new EventEmitter();

  constructor(
    protected userService: UserService, // tslint:disable-line
    protected translateService: TranslateService,
    protected modalService: NgbModal
  ) {
    super(userService, translateService, modalService, new User());
  }

  ngOnInit() {
  }

  shareSelected(val: any) {
    this.sendSelectedValOnSearch.emit(val);
  }

}
