/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { InspectionToolsTypeService } from 'src/app/services/inspection-tools-type/inspection-tools-type.service';
import { environment } from 'src/environments/environment';
import { UpdateInspectionToolsTypeModel } from 'src/app/model/inspection-tools-type/update-inspection-tools-type-model';
import { AddInspectionToolsTypeModel } from 'src/app/model/inspection-tools-type/add-inspection-tools-type-model';
import { InspectionToolsType } from 'src/app/model/inspection-tools-type/inspection-tools-type';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import * as _ from 'lodash';

@Component({
  selector: 'app-inspection-tools-type-detail',
  templateUrl: './inspection-tools-type-detail.component.html',
  styleUrls: ['./inspection-tools-type-detail.component.css']
})
export class InspectionToolsTypeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    type: 'type',
    description: 'description',
    pcCodes: 'pcCodes'
  };
  inspectionToolsType: InspectionToolsType;
  originalPcCodeIds: number[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: InspectionToolsTypeService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.inspectionToolsType = new InspectionToolsType();
    this.entity = this.inspectionToolsType;
    this.cancelRoute = '/Admin/InspectionToolsType';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
    this.initForm();
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      type: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(255)
      ]),
      pcCodes: new FormControl(Constants.Empty, Validators.required),
      isEnabled: new FormControl(true, Validators.required),
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData();
  }

  getData() {
    // If create mode then return
    if (this.recId === null) {
      // In order to work properly need to add a delay
      setTimeout(() => {
        this.formInput.controls[this.properties.type].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.inspectionToolsType.type,
            this.properties.type
          )
        );
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const inspectionToolsType = new InspectionToolsType(data);
      this.entity = inspectionToolsType;
      this.formDetails = this.entity;
      this.formInput.patchValue({
        id: inspectionToolsType.id,
        type: inspectionToolsType.type,
        description: inspectionToolsType.description,
        pcCodes: inspectionToolsType.pcCodes,
        isEnabled: inspectionToolsType.isEnabled,
      });

      this.originalPcCodeIds = JSON.parse(
        JSON.stringify(_.map(inspectionToolsType.pcCodes, (x) => x.id))
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateInspectionToolsTypeModel {
    const updateInspectionToolsTypeModel = new UpdateInspectionToolsTypeModel();
    Automapper.map(this.entity, updateInspectionToolsTypeModel);
    const pcCodeIds = _.map(
      this.formInput.controls[this.properties.pcCodes].value,
      this.properties.id
    );
    updateInspectionToolsTypeModel.addedPcCodeIds = this.getAddedPcCodeIds(pcCodeIds);
    updateInspectionToolsTypeModel.removedPcCodeIds = this.getRemovedPcCodeIds(pcCodeIds);
    return updateInspectionToolsTypeModel;
  }

  getAddModel(): AddInspectionToolsTypeModel {
    const addInspectionToolsTypeModel = new AddInspectionToolsTypeModel();
    Automapper.map(this.entity, addInspectionToolsTypeModel);
    const pcCodeIds = _.map(
      this.formInput.controls[this.properties.pcCodes].value,
      this.properties.id
    );
    addInspectionToolsTypeModel.addedPcCodeIds = this.getAddedPcCodeIds(pcCodeIds);
    return addInspectionToolsTypeModel;
  }

  getAddedPcCodeIds(pcCodeIds: number[]) {
    const added = _.difference(pcCodeIds, this.originalPcCodeIds);
    return added;
  }

  getRemovedPcCodeIds(pcCodeIds: number[]) {
    const removed = _.difference(this.originalPcCodeIds, pcCodeIds);
    return removed;
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isTypeModified() {
    return this.isModified(this.properties.type);
  }

  isTypeExists() {
    return this.hasError(
      this.properties.type,
      ValidationErrorCodes.alreadyExists
    );
  }

  isTypeEmpty() {
    return this.hasError(this.properties.type, ValidationErrorCodes.required);
  }

  isTypeHasWhiteSpace() {
    return this.hasError(this.properties.type, ValidationErrorCodes.validateWhiteSpace);
  }

  isPCCodeEmpty() {
    return this.hasError(this.properties.pcCodes, ValidationErrorCodes.required);
  }

  isPCCodeModified() {
    return this.isModified(this.properties.pcCodes);
  }

  isAsyncValidationPending() {
    return this.formInput.controls[this.properties.type].status === ControlStates.PENDING;
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
