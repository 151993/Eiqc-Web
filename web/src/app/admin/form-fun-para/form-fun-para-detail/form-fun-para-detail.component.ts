/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormFunParaService } from 'src/app/services/form-fun-para/form-fun-para.service';
import { environment } from 'src/environments/environment';
import { UpdateFormFunParaModel } from 'src/app/model/form-fun-para/update-form-fun-para-model';
import { AddFormFunParaModel } from 'src/app/model/form-fun-para/add-form-fun-para-model';
import { FormFunPara } from 'src/app/model/form-fun-para/form-fun-para';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-fun-para-detail',
  templateUrl: './form-fun-para-detail.component.html',
  styleUrls: ['./form-fun-para-detail.component.css']
})
export class FormFunParaDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    parameterName: 'parameterName',
    instrumentId: 'instrumentId',
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
  constructor(
    private formBuilder: FormBuilder,
    private apiService: FormFunParaService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormFunPara();
    this.initForm();
    this.cancelRoute = '/Admin/FormFunPara';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormFunParaCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormFunParaCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormFunParaCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      instrumentId: new FormControl(null),
      normalValue: new FormControl(null),
      lowerLimit: new FormControl(null),
      accuracy: new FormControl(null),

      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      uOM: new FormControl(Constants.Empty, [
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
      const formFunPara = new FormFunPara(data);

      this.formDetails = this.entity;
      this.entity = formFunPara;
      this.formInput.patchValue({
        id: formFunPara.id,
        form: formFunPara.form,
        parameterName: formFunPara.parameterName,
        instrumentId: formFunPara.instrumentId,
        uOM: formFunPara.uom,
        normalValue: formFunPara.normalValue,
        upperLimit: formFunPara.upperLimit,
        lowerLimit: formFunPara.lowerLimit,
        accuracy: formFunPara.accuracy,
        sampleSize: formFunPara.sampleSize,
        isEnabled: formFunPara.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormFunParaModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormFunParaModel = new UpdateFormFunParaModel();

    Automapper.map(this.entity, updateFormFunParaModel);
    updateFormFunParaModel.formId = form.id;
    updateFormFunParaModel.uOM = this.formInput.controls[this.properties.uOM].value;
    return updateFormFunParaModel;
  }

  getAddModel(): AddFormFunParaModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormFunParaModel = new AddFormFunParaModel();

    Automapper.map(this.entity, addFormFunParaModel);

    addFormFunParaModel.formId = form.id;
    addFormFunParaModel.uOM = this.formInput.controls[this.properties.uOM].value;


    return addFormFunParaModel;
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
