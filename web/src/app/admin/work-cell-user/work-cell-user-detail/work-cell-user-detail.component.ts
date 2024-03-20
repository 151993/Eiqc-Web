/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkCellUserService } from 'src/app/services/work-cell-user/work-cell-user.service';
import { environment } from 'src/environments/environment';
import { UpdateWorkCellUserModel } from 'src/app/model/work-cell-user/update-work-cell-user-model';
import { AddWorkCellUserModel } from 'src/app/model/work-cell-user/add-work-cell-user-model';
import { WorkCellUser } from 'src/app/model/work-cell-user/work-cell-user';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Site } from 'src/app/model/site/site';
import * as _ from 'lodash';
import { Constants, Numbers, ToastMessage, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { WorkCell } from 'src/app/model/workcell/work-cell';

@Component({
  selector: 'app-work-cell-user-detail',
  templateUrl: './work-cell-user-detail.component.html',
  styleUrls: ['./work-cell-user-detail.component.css']
})
export class WorkCellUserDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    isDccApproval: 'isDccApproval',
    workCell: 'workCell',
    site: 'site',
    jabilUsers: 'jabilUsers',
    dccUsers: 'dccUsers',
    description: 'description'
  };
  workCellUser: WorkCellUser;
  originalJabilUserIds: number[];
  originalDccUserIds: number[];
  data: WorkCell[] = [];
  workCellId: number;
  siteId: number;
  isFieldDisabled: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: WorkCellUserService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.workCellUser = new WorkCellUser();
    this.entity = this.workCellUser;
    this.initForm();
    this.cancelRoute = '/Admin/WorkCellUser';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminWorkCellUserCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminWorkCellUserCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminWorkCellUserCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      workCell: new FormControl(Constants.Empty, Validators.required),
      description: new FormControl(Constants.Empty),
      site: new FormControl(Constants.Empty, Validators.required),
      jabilUsers: new FormControl(Constants.Empty, Validators.required),
      dccUsers: new FormControl(Constants.Empty),
      isDccApproval: new FormControl(Constants.Empty),
      isEnabled: new FormControl(true, Validators.required),
      changeReason: new FormControl(Constants.Empty)
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData();
    this.workCellId = 0;
    this.siteId = 0;
    this.isFieldDisabled = true;
  }

  getData() {
    // If create mode then return
    if (this.recId === null) {
      // In order to work properly need to add a delay
      setTimeout(() => {
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      this.workCellUser = new WorkCellUser(data);
      this.workCellUser.site.name = this.workCellUser.site.name + ' - ' + this.workCellUser.site.code;
      this.formDetails = this.entity;
      this.entity = this.workCellUser;
      this.formInput.patchValue({
        id: this.workCellUser.id,
        isDccApproval: this.workCellUser.isDccApproval,
        workCell: this.workCellUser.workCell,
        description: this.workCellUser.workCell.description,
        site: this.workCellUser.site,
        jabilUsers: this.workCellUser.jabilUsers,
        dccUsers: this.workCellUser.dccUsers,
        isEnabled: this.workCellUser.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

      this.originalJabilUserIds = JSON.parse(
        JSON.stringify(_.map(this.workCellUser.jabilUsers, (x) => x.id))
      );
      this.originalDccUserIds = JSON.parse(
        JSON.stringify(_.map(this.workCellUser.dccUsers, (x) => x.id))
      );
    });
  }

  getUpdateModel(): UpdateWorkCellUserModel {

    const workCell = this.formInput.controls[this.properties.workCell].value as WorkCell;
    const site = this.formInput.controls[this.properties.site].value as Site;

    const updateWorkCellUserModel = new UpdateWorkCellUserModel();

    Automapper.map(this.entity, updateWorkCellUserModel);

    updateWorkCellUserModel.workCellId = workCell.id;

    updateWorkCellUserModel.siteId = site.id;

    const jabilUserIds = _.map(
      this.formInput.controls[this.properties.jabilUsers].value,
      this.properties.id
    );
    const dccUserIds = _.map(
      this.formInput.controls[this.properties.dccUsers].value,
      this.properties.id
    );
    updateWorkCellUserModel.addedJabilUserIds = this.getAddedJabilUserIds(jabilUserIds);

    updateWorkCellUserModel.removedJabilUserIds = this.getRemovedJabilUserIds(jabilUserIds);

    updateWorkCellUserModel.addedDccUserIds = this.getAddedDccUserIds(dccUserIds);

    updateWorkCellUserModel.removedDccUserIds = this.getRemovedDccUserIds(dccUserIds);

    return updateWorkCellUserModel;
  }

  getAddModel(): AddWorkCellUserModel {

    const workCell = this.formInput.controls[this.properties.workCell].value as WorkCell;

    const site = this.formInput.controls[this.properties.site].value as Site;

    const addWorkCellUserModel = new AddWorkCellUserModel();

    Automapper.map(this.entity, addWorkCellUserModel);

    addWorkCellUserModel.workCellId = workCell.id;

    addWorkCellUserModel.siteId = site.id;

    const jabilUserIds = _.map(
      this.formInput.controls[this.properties.jabilUsers].value,
      this.properties.id
    );

    const dccUserIds = _.map(
      this.formInput.controls[this.properties.dccUsers].value,
      this.properties.id
    );
    addWorkCellUserModel.addedJabilUserIds = this.getAddedJabilUserIds(jabilUserIds);

    addWorkCellUserModel.addedDccUserIds = this.getAddedDccUserIds(dccUserIds);

    return addWorkCellUserModel;
  }

  onWorkCellSelect(event, workCellId?) {
    if (workCellId === undefined) {
      this.formInput.patchValue({
        description: event.description
      });
      this.workCellId = event.id;
    } else {
      this.workCellId = workCellId;
      this.siteId = event.id;
    }
    if (this.workCellId > 0 && this.siteId > 0) {
      this.apiService.getAllData().subscribe(data => {
        const dataExist = data.value.filter(x => x.workCellId === this.workCellId && x.siteId === this.siteId);
        if (dataExist.length > 0 && dataExist !== null) {
          this.enableSaveButton = false;
          this.notificationService.showError(ToastMessage.DataExist);
        }
      });
    }
  }

  onWorkCellClear() {
    this.workCellId = Numbers.Default;
    this.formInput.patchValue({
      description: Constants.Empty
    });
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  getAddedJabilUserIds(userIds: number[]) {
    const added = _.difference(userIds, this.originalJabilUserIds);
    return added;
  }

  getRemovedJabilUserIds(userIds: number[]) {
    const removed = _.difference(this.originalJabilUserIds, userIds);
    return removed;
  }

  getAddedDccUserIds(dccUserIds: number[]) {
    const added = _.difference(dccUserIds, this.originalDccUserIds);
    return added;
  }

  getRemovedDccUserIds(dccUserIds: number[]) {
    const removed = _.difference(this.originalDccUserIds, dccUserIds);
    return removed;
  }

  isWorkCellModified() {
    return this.isModified(this.properties.workCell);
  }

  isWorkCellDescriptionModified() {
    return this.isModified(this.properties.description);
  }

  isWorkCellDescriptionEmpty() {
    return this.hasError(this.properties.description, ValidationErrorCodes.required);
  }

  isWorkCellEmpty() {
    return this.hasError(this.properties.workCell, ValidationErrorCodes.required);
  }

  isSiteModified() {
    return this.isModified(this.properties.site);
  }

  isSiteEmpty() {
    return this.hasError(this.properties.site, ValidationErrorCodes.required);
  }

  isJabilUsersEmpty() {
    return this.hasError(this.properties.jabilUsers, ValidationErrorCodes.required);
  }

  isJabilUsersModified() {
    return this.isModified(this.properties.jabilUsers);
  }

  isDccUsersEmpty() {
    return this.hasError(this.properties.dccUsers, ValidationErrorCodes.required);
  }

  isDccUsersModified() {
    return this.isModified(this.properties.dccUsers);
  }

  isAsyncValidationPending() {
    return
      ;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

  setValidationForDCCUser() {
    if (this.formInput.value['isDccApproval']) {
      this.formInput.get('dccUsers').setValidators(Validators.required);
    } else {
      this.formInput.get('dccUsers').clearValidators();
    }

    this.formInput.get('dccUsers').updateValueAndValidity();
  }

}
