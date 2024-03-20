import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { AddParameterManagementModel } from 'src/app/model/parameter-management/add-parameter-management-model';
import { ParameterManagement } from 'src/app/model/parameter-management/parameter-management';
import { UpdateParameterManagementModel } from 'src/app/model/parameter-management/update-parameter-management-model';
import { ParameterManagementService } from 'src/app/services/parameter-management/parameter-management.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { SelectItem } from 'primeng/api';
import { ParameterTypeCodeService } from 'src/app/services/parameter-type-code/parameter-type-code.service';
import { ParameterTypeCode } from 'src/app/model/parameter-type-code/parameter-type-code';


@Component({
  selector: 'app-parameter-management-detail',
  templateUrl: './parameter-management-detail.component.html',
  styleUrls: ['./parameter-management-detail.component.css']
})

export class ParameterManagementDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  parameterManagement: ParameterManagement;
  originalCommodityNameIds: number[];
  parameterManagements: SelectItem[];


  properties = {
    id: 'id',
    name: 'name',
    description: 'description',
    type: 'type',
    pcCodes: 'pcCodes',
    commodities: 'commodities'
  };

  constructor(private formBuilder: FormBuilder,
    private apiService: ParameterManagementService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService,
    private parameterTypeCodeService: ParameterTypeCodeService) {
    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService,
      apiService
    );
    this.initForm();
    this.parameterManagement = new ParameterManagement();
    this.entity = this.parameterManagement;
    this.cancelRoute = '/Admin/ParameterManagement';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminParameterManagementCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminParameterManagementCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminParameterManagementCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl(Constants.Empty, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(Constants.Empty, [Validators.maxLength(150)]),
      type: new FormControl(Constants.Empty, [Validators.required]),
      pcCodes: new FormControl({ value: Constants.Empty, disabled: true }),
      commodities: new FormControl(Constants.Empty, [Validators.required]),
      isEnabled: new FormControl(true, Validators.required)
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData();
  }

  getData() {
    if (this.recId === null) {
      setTimeout(() => {
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.parameterManagement = new ParameterManagement(data);
      this.formDetails = this.entity;
      this.entity = this.parameterManagement;
      this.formInput.patchValue({
        id: this.parameterManagement.id,
        name: this.parameterManagement.name,
        description: this.parameterManagement.description,
        type: this.parameterManagement.parameterTypeCode,
        pcCodes: this.parameterManagement.parameterTypeCode.pcCodes,
        commodities: this.parameterManagement.commodities,
        isEnabled: this.parameterManagement.isEnabled
      });
      this.onParameterTypeCodeSelect(this.parameterManagement.parameterTypeCode);
      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.parameterManagement.name,
          this.properties.name
        )
      );

      this.originalCommodityNameIds = JSON.parse(
        JSON.stringify(_.map(this.parameterManagement.commodities, (x) => x.id))
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateParameterManagementModel {
    const pTypeCode = this.formInput.controls[this.properties.type].value as ParameterTypeCode;
    const updateParameterManagementModel = new UpdateParameterManagementModel();
    Automapper.map(this.parameterManagement, updateParameterManagementModel);
    const commodityNameIds = _.map(
      this.formInput.controls[this.properties.commodities].value,
      this.properties.id
    );
    updateParameterManagementModel.parameterTypeCodeId = pTypeCode.id;
    updateParameterManagementModel.addedCommodityNameIds = this.getAddedCommodityNameIds(commodityNameIds);
    updateParameterManagementModel.removedCommodityNameIds = this.getRemovedCommodityNameIds(commodityNameIds);
    return updateParameterManagementModel;
  }

  getAddModel(): AddParameterManagementModel {
    const pTypeCode = this.formInput.controls[this.properties.type].value as ParameterTypeCode;
    const addParameterManagementModel = new AddParameterManagementModel();
    Automapper.map(this.parameterManagement, addParameterManagementModel);
    const commodityNameIds = _.map(
      this.formInput.controls[this.properties.commodities].value,
      this.properties.id
    );
    addParameterManagementModel.parameterTypeCodeId = pTypeCode.id;
    addParameterManagementModel.addedCommodityNameIds = this.getAddedCommodityNameIds(commodityNameIds);
    return addParameterManagementModel;
  }

  onParameterTypeCodeSelect(event) {
    this.parameterTypeCodeService.getDataById(event.id).subscribe((data) => {
      const parameterTypeCode = this.formInput.controls[this.properties.pcCodes];
      parameterTypeCode.setValue(data.pcCodes.map(x => x.code).join(','));
    });
  }

  getTypeCodeData() {
    this.parameterTypeCodeService.getAllData().subscribe((data) => {
      console.log(data);
    });
  }

  getAddedCommodityNameIds(CommodityNameIds: number[]) {
    const added = _.difference(CommodityNameIds, this.originalCommodityNameIds);
    return added;
  }

  getRemovedCommodityNameIds(CommodityNameIds: number[]) {
    const removed = _.difference(this.originalCommodityNameIds, CommodityNameIds);
    return removed;
  }
  //#region name validations

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameExists() {
    return this.hasError(this.properties.name, ValidationErrorCodes.alreadyExists);
  }

  isNameModified() {
    return this.isModified(this.properties.name);
  }

  isNameHasWhiteSpace() {
    return this.hasError(this.properties.name, ValidationErrorCodes.validateWhiteSpace);
  }

  isTypeEmpty() {
    return this.hasError(this.properties.type, ValidationErrorCodes.required);
  }

  isTypeModified() {
    return this.isModified(this.properties.type);
  }

  isTypeHasWhiteSpace() {
    return this.hasError(this.properties.type, ValidationErrorCodes.validateWhiteSpace);
  }

  isCommodityEmpty() {
    return this.hasError(this.properties.commodities, ValidationErrorCodes.required);
  }

  isCommodityModified() {
    return this.isModified(this.properties.commodities);
  }

  isCommodityHasWhiteSpace() {
    return this.hasError(this.properties.commodities, ValidationErrorCodes.validateWhiteSpace);
  }

  isAsyncValidationPending() {
    return (
      this.formInput.controls[this.properties.name].status ===
      ControlStates.PENDING
    );
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }
  //#endregion

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }

}
