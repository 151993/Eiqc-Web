/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PCCodeInspectionToolsTypeService } from 'src/app/services/pc-code-inspection-tools-type/pc-code-inspection-tools-type.service';
import { environment } from 'src/environments/environment';
import { UpdatePCCodeInspectionToolsTypeModel } from 'src/app/model/pc-code-inspection-tools-type/update-pc-code-inspection-tools-type-model';
import { AddPCCodeInspectionToolsTypeModel } from 'src/app/model/pc-code-inspection-tools-type/add-pc-code-inspection-tools-type-model';
import { PCCodeInspectionToolsType } from 'src/app/model/pc-code-inspection-tools-type/pc-code-inspection-tools-type';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { PCCode } from 'src/app/model/pc-code/pc-code';
import { InspectionToolsType } from 'src/app/model/inspection-tools-type/inspection-tools-type';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-pc-code-inspection-tools-type-detail',
  templateUrl: './pc-code-inspection-tools-type-detail.component.html',
  styleUrls: ['./pc-code-inspection-tools-type-detail.component.css']
})
export class PCCodeInspectionToolsTypeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    pCCode: 'pCCode',
    inspectionToolsType: 'inspectionToolsType',
  };
  data: PCCode[] = [];
  public pcCodeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'pcCode',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'pcCode',
    format: '${value.pcCode}',
  };
  data1: InspectionToolsType[] = [];
  public inspectionToolsTypeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'pcCode',
    minLength: '1',
    suggestions: this.data1,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'pcCode',
    format: '${value.pcCode}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: PCCodeInspectionToolsTypeService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PCCodeInspectionToolsType();
    this.initForm();
    this.cancelRoute = '/Admin/PCCodeInspectionToolsType';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPCCodeInspectionToolsTypeCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPCCodeInspectionToolsTypeCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPCCodeInspectionToolsTypeCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      pCCode: new FormControl(null),

      inspectionToolsType: new FormControl(null),
      isEnabled: new FormControl(true, Validators.required),
      changeReason: new FormControl(Constants.Empty)
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
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const pCCodeInspectionToolsType = new PCCodeInspectionToolsType(data);

      this.formDetails = this.entity;
      this.entity = pCCodeInspectionToolsType;
      this.formInput.patchValue({
        id: pCCodeInspectionToolsType.id,
        pCCode: pCCodeInspectionToolsType.pcCode,
        inspectionToolsType: pCCodeInspectionToolsType.inspectionToolsType,
        isEnabled: pCCodeInspectionToolsType.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePCCodeInspectionToolsTypeModel {

    const pCCode = this.formInput.controls[this.properties.pCCode].value as PCCode;
    const inspectionToolsType = this.formInput.controls[this.properties.inspectionToolsType].value as InspectionToolsType;

    const updatePCCodeInspectionToolsTypeModel = new UpdatePCCodeInspectionToolsTypeModel();

    Automapper.map(this.entity, updatePCCodeInspectionToolsTypeModel);
    updatePCCodeInspectionToolsTypeModel.pCCodeId = pCCode.id;
    updatePCCodeInspectionToolsTypeModel.inspectionToolsTypeId = inspectionToolsType.id;
    return updatePCCodeInspectionToolsTypeModel;
  }

  getAddModel(): AddPCCodeInspectionToolsTypeModel {

    const pCCode = this.formInput.controls[this.properties.pCCode].value as PCCode;
    const inspectionToolsType = this.formInput.controls[this.properties.inspectionToolsType].value as InspectionToolsType;

    const addPCCodeInspectionToolsTypeModel = new AddPCCodeInspectionToolsTypeModel();

    Automapper.map(this.entity, addPCCodeInspectionToolsTypeModel);

    addPCCodeInspectionToolsTypeModel.pCCodeId = pCCode.id;
    addPCCodeInspectionToolsTypeModel.inspectionToolsTypeId = inspectionToolsType.id;

    return addPCCodeInspectionToolsTypeModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  ispCCodeModified() {
    return this.isModified(this.properties.pCCode);
  }

  ispCCodeEmpty() {
    return this.hasError(this.properties.pCCode, ValidationErrorCodes.required);
  }

  ispCCodeHasWhiteSpace() {
    return this.hasError(this.properties.pCCode, ValidationErrorCodes.validateWhiteSpace);
  }

  isinspectionToolsTypeModified() {
    return this.isModified(this.properties.inspectionToolsType);
  }

  isinspectionToolsTypeEmpty() {
    return this.hasError(this.properties.inspectionToolsType, ValidationErrorCodes.required);
  }

  isinspectionToolsTypeHasWhiteSpace() {
    return this.hasError(this.properties.inspectionToolsType, ValidationErrorCodes.validateWhiteSpace);
  }


  isAsyncValidationPending() {
    return;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
