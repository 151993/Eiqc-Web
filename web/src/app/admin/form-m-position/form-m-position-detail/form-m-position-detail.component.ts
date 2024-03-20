/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormMPositionService } from 'src/app/services/form-m-position/form-m-position.service';
import { environment } from 'src/environments/environment';
import { UpdateFormMPositionModel } from 'src/app/model/form-m-position/update-form-m-position-model';
import { AddFormMPositionModel } from 'src/app/model/form-m-position/add-form-m-position-model';
import { FormMPosition } from 'src/app/model/form-m-position/form-m-position';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-form-m-position-detail',
  templateUrl: './form-m-position-detail.component.html',
  styleUrls: ['./form-m-position-detail.component.css']
})
export class FormMPositionDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    form: 'form',
    lineNo: 'lineNo',
    iTCode: 'iTCode',
    uOM: 'uOM',
    spec: 'spec',
    upperLimit: 'upperLimit',
    lowerLimit: 'lowerLimit',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
    upperLimit1: 'upperLimit1',
    lowerLimit1: 'lowerLimit1',
    iTCode1: 'iTCode1',
    upperLimit2: 'upperLimit2',
    lowerLimit2: 'lowerLimit2',
    iTCode2: 'iTCode2',
    upperLimit3: 'upperLimit3',
    lowerLimit3: 'lowerLimit3',
    iTCode3: 'iTCode3',
    positionType: 'positionType',

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
    private apiService: FormMPositionService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormMPosition();
    this.initForm();
    this.cancelRoute = '/Admin/FormMPosition';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormMPositionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormMPositionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormMPositionCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      lineNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      iTCode: new FormControl(Constants.Empty, [
        Validators.required,
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
      iTCode1: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      iTCode2: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      iTCode3: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
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
      const formMPosition = new FormMPosition(data);

      this.formDetails = this.entity;
      this.entity = formMPosition;
      this.formInput.patchValue({
        id: formMPosition.id,
        form: formMPosition.form,
        lineNo: formMPosition.lineNo,
        iTCode: formMPosition.itCode,
        uOM: formMPosition.uom,
        spec: formMPosition.spec,
        upperLimit: formMPosition.upperLimit,
        accuracy: formMPosition.accuracy,
        sampleSize: formMPosition.sampleSize,
        upperLimit1: formMPosition.upperLimit1,
        lowerLimit1: formMPosition.lowerLimit1,
        iTCode1: formMPosition.itCode1,
        upperLimit2: formMPosition.upperLimit2,
        lowerLimit2: formMPosition.lowerLimit2,
        iTCode2: formMPosition.itCode2,
        upperLimit3: formMPosition.upperLimit3,
        lowerLimit3: formMPosition.lowerLimit3,
        iTCode3: formMPosition.itCode3,
        positionType: formMPosition.positionType,

        isEnabled: formMPosition.isEnabled,
      });

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormMPositionModel {


    const form = this.formInput.controls[this.properties.form].value as Form;


    const updateFormMPositionModel = new UpdateFormMPositionModel();

    Automapper.map(this.entity, updateFormMPositionModel);
    updateFormMPositionModel.formId = form.id;


    return updateFormMPositionModel;
  }

  getAddModel(): AddFormMPositionModel {


    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormMPositionModel = new AddFormMPositionModel();

    Automapper.map(this.entity, addFormMPositionModel);


    addFormMPositionModel.formId = form.id;


    return addFormMPositionModel;
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

  isLineNoModified() {
    return this.isModified(this.properties.lineNo);
  }

  isLineNoEmpty() {
    return this.hasError(this.properties.lineNo, ValidationErrorCodes.required);
  }

  isLineNoHasWhiteSpace() {
    return this.hasError(this.properties.lineNo, ValidationErrorCodes.validateWhiteSpace);
  }

  isITCodeModified() {
    return this.isModified(this.properties.iTCode);
  }

  isITCodeEmpty() {
    return this.hasError(this.properties.iTCode, ValidationErrorCodes.required);
  }

  isITCodeHasWhiteSpace() {
    return this.hasError(this.properties.iTCode, ValidationErrorCodes.validateWhiteSpace);
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
