/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormMeasurementParameterService } from 'src/app/services/form-measurement-parameter/form-measurement-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateFormMeasurementParameterModel } from 'src/app/model/form-measurement-parameter/update-form-measurement-parameter-model';
import { AddFormMeasurementParameterModel } from 'src/app/model/form-measurement-parameter/add-form-measurement-parameter-model';
import { FormMeasurementParameter } from 'src/app/model/form-measurement-parameter/form-measurement-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { Instrument } from 'src/app/model/instrument/instrument';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
@Component({
  selector: 'app-form-measurement-parameter-detail',
  templateUrl: './form-measurement-parameter-detail.component.html',
  styleUrls: ['./form-measurement-parameter-detail.component.css']
})
export class FormMeasurementParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    parameterName: 'parameterName',
    instrument: 'instrument',
    uOM: 'uOM',
    normalValue: 'normalValue',
    upperLimit: 'upperLimit',
    lowerLimit: 'lowerLimit',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
  };
  data: Form[] = [];
  public formAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'dateCode',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'dateCode',
    format: '${value.dateCode}',
  };
  data1: Instrument[] = [];
  public instrumentAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'desc',
    minLength: '1',
    suggestions: this.data1,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'desc',
    format: '${value.desc}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: FormMeasurementParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormMeasurementParameter();
    this.initForm();
    this.cancelRoute = '/Admin/FormMeasurementParameter';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminFormMeasurementParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormMeasurementParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormMeasurementParameterCanCreate;
  }
  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      form: new FormControl(null),
      normalValue: new FormControl(null),
      upperLimit: new FormControl(null),
      lowerLimit: new FormControl(null),
      accuracy: new FormControl(null),
      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      instrument: new FormControl(null),
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
      const formMeasurementParameter = new FormMeasurementParameter(data);
      this.formDetails = this.entity;
      this.entity = formMeasurementParameter;
      this.formInput.patchValue({
        id: formMeasurementParameter.id,
        form: formMeasurementParameter.form,
        parameterName: formMeasurementParameter.parameterName,
        instrument: formMeasurementParameter.instrument,
        uOM: formMeasurementParameter.uom,
        normalValue: formMeasurementParameter.normalValue,
        upperLimit: formMeasurementParameter.upperLimit,
        lowerLimit: formMeasurementParameter.lowerLimit,
        accuracy: formMeasurementParameter.accuracy,
        sampleSize: formMeasurementParameter.sampleSize,
        isEnabled: formMeasurementParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }
  getUpdateModel(): UpdateFormMeasurementParameterModel {
    const form = this.formInput.controls[this.properties.form].value as Form;
    const instrument = this.formInput.controls[this.properties.instrument].value as Instrument;
    const updateFormMeasurementParameterModel = new UpdateFormMeasurementParameterModel();
    Automapper.map(this.entity, updateFormMeasurementParameterModel);
    updateFormMeasurementParameterModel.formId = form.id;
    updateFormMeasurementParameterModel.instrumentId = instrument.id;
    updateFormMeasurementParameterModel.uOM = this.formInput.controls[this.properties.uOM].value;
    updateFormMeasurementParameterModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    return updateFormMeasurementParameterModel;
  }
  getAddModel(): AddFormMeasurementParameterModel {
    const form = this.formInput.controls[this.properties.form].value as Form;
    const instrument = this.formInput.controls[this.properties.instrument].value as Instrument;
    const addFormMeasurementParameterModel = new AddFormMeasurementParameterModel();
    Automapper.map(this.entity, addFormMeasurementParameterModel);
    addFormMeasurementParameterModel.formId = form.id;
    addFormMeasurementParameterModel.instrumentId = instrument.id;
    addFormMeasurementParameterModel.uOM = this.formInput.controls[this.properties.uOM].value;
    addFormMeasurementParameterModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    return addFormMeasurementParameterModel;
  }
  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }
  isFormModified() {
    return this.isModified(this.properties.form);
  }
  isformEmpty() {
    return this.hasError(this.properties.form, ValidationErrorCodes.required);
  }
  isformHasWhiteSpace() {
    return this.hasError(this.properties.form, ValidationErrorCodes.validateWhiteSpace);
  }
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
