import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  ToastMessage,
  changeReasonModalConfig,
  Constants,
  SearchOperator,
} from '../../constant/global';
import { environment } from 'src/environments/environment';
import { ChangeReasonModalComponent } from '../../controls/modal/change-reason-modal/change-reason-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDataService } from '../base-data.service';
import { BaseModel } from 'src/app/model/base/base-model';
import { PermissionType } from '../../constant/roles';
import { AuthService } from 'src/app/auth/auth.service';
import { FilterInfo } from '../../odata-query-builder/page-sort-filter-config';
import { ColumnType } from 'src/app/model/table/table';

@Component({
  template: '',
})
export class BaseDetailComponent implements OnInit, OnDestroy {
  public recId = 0;
  protected formDetails: any;
  public formInput: FormGroup;
  protected originalFormInput: string;
  public enableSaveButton = true;
  public skipValueChangeEmit = false;
  public enableRejectButton = true;

  public checkingName = false;
  public originalName: string = Constants.Empty;
  public nameIsUnique = true;

  keyUpEvent = new Subject<KeyboardEvent>();

  protected cancelRoute: string;

  protected entity: BaseModel;

  protected getUpdateModelFn: any;

  protected getAddModelFn: any;

  public canAccess: boolean;
  public canCreate: boolean;
  public canUpdate: boolean;

  protected canAccessPermissionType: PermissionType;
  protected canCreatPermissionType: PermissionType;
  protected canUpdatePermissionType: PermissionType;

  filter: FilterInfo = {
    columnName: 'name',
    value: '',
    operator: SearchOperator.Contains,
    mappingField: '',
    columnType: ColumnType.String
  };
  constructor(
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    private baseService?: BaseDataService
  ) {
    this.recId = +this.activatedRoute.snapshot.params['id'];
    this.recId = Number.isNaN(this.recId) ? null : this.recId;
  }

  ngOnInit() {
    this.formOnChange();

    this.authService.userPermissions$.subscribe((x) => {
      this.checkPermissions();
    });

    this.checkPermissions();
  }

  formOnChange() {
    this.formInput.valueChanges.subscribe((val) => {
      const _form = JSON.stringify(this.formInput.getRawValue());
      // only enable save when there is difference in input
      this.enableSaveButton = !(_form === this.originalFormInput);
    });
  }

  checkPermissions() {
    this.canAccess = this.authService.isPermissionExists([
      this.canAccessPermissionType,
    ]);
    this.canCreate = this.authService.isPermissionExists([
      this.canCreatPermissionType,
    ]);
    this.canUpdate = this.authService.isPermissionExists([
      this.canUpdatePermissionType,
    ]);

    if (
      !(
        (this.canUpdate && this.recId) ||
        (this.canCreate && this.recId == null)
      )
    ) {
      this.formInput.disable();
    }
  }

  ngOnDestroy() {
    if (this.keyUpEvent) {
      this.keyUpEvent.unsubscribe();
    }
  }

  postSaved() {
    this.notificationService.showSuccess(ToastMessage.Saved);
    this.skipValueChangeEmit = true;
    // this.formInput.reset(this.formInput.getRawValue());

    setTimeout(() => {
      this.cancel();
    }, environment.timer.autoReturn);
  }

  cancel() {
    this.router.navigate([this.cancelRoute]);
  }

  showChangeReasonModal() {
    return this.modalService.open(
      ChangeReasonModalComponent,
      changeReasonModalConfig
    );
  }

  hasError(controlName: string, errorCode: string) {
    return this.formInput.controls[controlName].hasError(errorCode);
  }

  saveForm() {
    this.entity.loadFromInput(this.formInput);
    this.entity.trimAll();

    this.showChangeReasonModal().result.then((changeReason) => {
      if (this.recId != null) {
        const updateModel = this.getUpdateModelFn();
        updateModel.changeReason = changeReason;

        this.baseService.updateData(this.recId, updateModel).subscribe(() => {
          this.postSaved();
        });
      } else {
        const addModel = this.getAddModelFn();
        addModel.changeReason = changeReason;

        this.baseService.addData(addModel).subscribe(() => {
          this.postSaved();
        });
      }
    });
  }

  getPartNoForCommodity() {
    const partNo = this.activatedRoute.snapshot.params['partNo'];
    return partNo !== '' ? partNo : null;
  }

  getSiteNoForCommodity() {
    const siteNo = this.activatedRoute.snapshot.params['siteNo'];
    return siteNo !== '' ? siteNo : null;
  }
}
