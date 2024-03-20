/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormMeasurementParameterService } from 'src/app/services/supplier-form-measurement-parameter/supplier-form-measurement-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormMeasurementParameterModel } from 'src/app/model/supplier-form-measurement-parameter/update-supplier-form-measurement-parameter-model';
import { AddSupplierFormMeasurementParameterModel } from 'src/app/model/supplier-form-measurement-parameter/add-supplier-form-measurement-parameter-model';
import { SupplierFormMeasurementParameter } from 'src/app/model/supplier-form-measurement-parameter/supplier-form-measurement-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-measurement-parameter-detail',
  templateUrl: './supplier-form-measurement-parameter-detail.component.html',
  styleUrls: ['./supplier-form-measurement-parameter-detail.component.css']
})
export class SupplierFormMeasurementParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    parameterName: 'parameterName',
    instrumentID: 'instrumentID',
    instrumentTypeID: 'instrumentTypeID',
    uOM: 'uOM',
    normalValue: 'normalValue',
    upperLimit: 'upperLimit',
    lowerLimit: 'lowerLimit',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
    supplierForm: 'supplierForm'
  };
  data: SupplierForm[] = [];
  public supplierFormAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'poNo',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'poNo',
    format: '${value.poNo}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: SupplierFormMeasurementParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormMeasurementParameter();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormMeasurementParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierFormMeasurementParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormMeasurementParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormMeasurementParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      supplierForm: new FormControl(null),
      normalValue: new FormControl(null),
      upperLimit: new FormControl(null),
      lowerLimit: new FormControl(null),
      accuracy: new FormControl(null),

      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      instrumentID: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      instrumentTypeID: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      uOM: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      sampleSize: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
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
      const supplierFormMeasurementParameter = new SupplierFormMeasurementParameter(data);

      this.formDetails = this.entity;
      this.entity = supplierFormMeasurementParameter;
      this.formInput.patchValue({
        id: supplierFormMeasurementParameter.id,
        parameterName: supplierFormMeasurementParameter.parameterName,
        instrumentID: supplierFormMeasurementParameter.instrumentID,
        instrumentTypeID: supplierFormMeasurementParameter.instrumentTypeID,
        uOM: supplierFormMeasurementParameter.uom,
        normalValue: supplierFormMeasurementParameter.normalValue,
        upperLimit: supplierFormMeasurementParameter.upperLimit,
        lowerLimit: supplierFormMeasurementParameter.lowerLimit,
        accuracy: supplierFormMeasurementParameter.accuracy,
        sampleSize: supplierFormMeasurementParameter.sampleSize,
        isEnabled: supplierFormMeasurementParameter.isEnabled,
        supplierForm: supplierFormMeasurementParameter.supplierForm
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormMeasurementParameterModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const updateSupplierFormMeasurementParameterModel = new UpdateSupplierFormMeasurementParameterModel();

    Automapper.map(this.entity, updateSupplierFormMeasurementParameterModel);
    updateSupplierFormMeasurementParameterModel.supplierFormId = supplierForm.id;
    updateSupplierFormMeasurementParameterModel.parameterName = this.formInput.controls[this.properties.parameterName].value;
    updateSupplierFormMeasurementParameterModel.uOM = this.formInput.controls[this.properties.uOM].value;
    updateSupplierFormMeasurementParameterModel.upperLimit = this.formInput.controls[this.properties.upperLimit].value;
    updateSupplierFormMeasurementParameterModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;

    return updateSupplierFormMeasurementParameterModel;
  }

  getAddModel(): AddSupplierFormMeasurementParameterModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const addSupplierFormMeasurementParameterModel = new AddSupplierFormMeasurementParameterModel();

    Automapper.map(this.entity, addSupplierFormMeasurementParameterModel);

    addSupplierFormMeasurementParameterModel.supplierFormId = supplierForm.id;
    addSupplierFormMeasurementParameterModel.parameterName = this.formInput.controls[this.properties.parameterName].value;
    addSupplierFormMeasurementParameterModel.uOM = this.formInput.controls[this.properties.uOM].value;
    addSupplierFormMeasurementParameterModel.upperLimit = this.formInput.controls[this.properties.upperLimit].value;
    addSupplierFormMeasurementParameterModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    return addSupplierFormMeasurementParameterModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  // isSupplierFormIdModified() {
  //   return this.isModified(this.properties.supplierFormId);
  // }

  // isSupplierFormIdEmpty() {
  //   return this.hasError(this.properties.supplierFormId, ValidationErrorCodes.required);
  // }

  // isSupplierFormIdHasWhiteSpace() {
  //   return this.hasError(this.properties.supplierFormId, ValidationErrorCodes.validateWhiteSpace);
  // }

  isParameterNameModified() {
    return this.isModified(this.properties.parameterName);
  }

  isParameterNameEmpty() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.required);
  }

  isParameterNameHasWhiteSpace() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.validateWhiteSpace);
  }

  isUOMModified() {
    return this.isModified(this.properties.uOM);
  }

  isUOMEmpty() {
    return this.hasError(this.properties.uOM, ValidationErrorCodes.required);
  }

  isUOMHasWhiteSpace() {
    return this.hasError(this.properties.uOM, ValidationErrorCodes.validateWhiteSpace);
  }

  isUpperLimitModified() {
    return this.isModified(this.properties.upperLimit);
  }

  isUpperLimitEmpty() {
    return this.hasError(this.properties.upperLimit, ValidationErrorCodes.required);
  }

  isUpperLimitHasWhiteSpace() {
    return this.hasError(this.properties.upperLimit, ValidationErrorCodes.validateWhiteSpace);
  }

  isLowerLimitModified() {
    return this.isModified(this.properties.lowerLimit);
  }

  isLowerLimitEmpty() {
    return this.hasError(this.properties.lowerLimit, ValidationErrorCodes.required);
  }

  isLowerLimitHasWhiteSpace() {
    return this.hasError(this.properties.lowerLimit, ValidationErrorCodes.validateWhiteSpace);
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

}
