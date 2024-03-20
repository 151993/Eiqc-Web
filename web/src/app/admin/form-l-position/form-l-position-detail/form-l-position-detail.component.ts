/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormLPositionService } from 'src/app/services/form-l-position/form-l-position.service';
import { environment } from 'src/environments/environment';
import { UpdateFormLPositionModel } from 'src/app/model/form-l-position/update-form-l-position-model';
import { AddFormLPositionModel } from 'src/app/model/form-l-position/add-form-l-position-model';
import { FormLPosition } from 'src/app/model/form-l-position/form-l-position';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-form-l-position-detail',
  templateUrl: './form-l-position-detail.component.html',
  styleUrls: ['./form-l-position-detail.component.css']
})
export class FormLPositionDetailComponent extends BaseDetailComponent
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
    private apiService: FormLPositionService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormLPosition();
    this.initForm();
    this.cancelRoute = '/Admin/FormLPosition';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormLPositionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormLPositionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormLPositionCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      spec: new FormControl(null),
      upperLimit: new FormControl(null),
      lowerLimit: new FormControl(null),
      accuracy: new FormControl(null),
      upperLimit1: new FormControl(null),
      lowerLimit1: new FormControl(null),
      upperLimit2: new FormControl(null),
      lowerLimit2: new FormControl(null),
      upperLimit3: new FormControl(null),
      lowerLimit3: new FormControl(null),
      positionType: new FormControl(null),
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
      const formLPosition = new FormLPosition(data);

      this.formDetails = this.entity;
      this.entity = formLPosition;
      this.formInput.patchValue({
        id: formLPosition.id,
        form: formLPosition.form,
        lineNo: formLPosition.lineNo,
        iTCode: formLPosition.itCode,
        uOM: formLPosition.uom,
        spec: formLPosition.spec,
        upperLimit: formLPosition.upperLimit,
        lowerLimit: formLPosition.lowerLimit,
        accuracy: formLPosition.accuracy,
        sampleSize: formLPosition.sampleSize,
        upperLimit1: formLPosition.upperLimit1,
        lowerLimit1: formLPosition.lowerLimit1,
        iTCode1: formLPosition.itCode1,
        upperLimit2: formLPosition.upperLimit2,
        lowerLimit2: formLPosition.lowerLimit2,
        iTCode2: formLPosition.itCode2,
        upperLimit3: formLPosition.upperLimit3,
        lowerLimit3: formLPosition.lowerLimit3,
        iTCode3: formLPosition.itCode3,
        positionType: formLPosition.positionType,
        isEnabled: formLPosition.isEnabled,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormLPositionModel {

    const form = this.formInput.controls[this.properties.form].value as Form;


    const updateFormLPositionModel = new UpdateFormLPositionModel();

    Automapper.map(this.entity, updateFormLPositionModel);
    updateFormLPositionModel.formId = form.id;
    updateFormLPositionModel.uOM = this.formInput.controls[this.properties.uOM].value;
    updateFormLPositionModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    updateFormLPositionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
    updateFormLPositionModel.iTCode1 = this.formInput.controls[this.properties.iTCode1].value;
    updateFormLPositionModel.iTCode2 = this.formInput.controls[this.properties.iTCode2].value;
    updateFormLPositionModel.iTCode3 = this.formInput.controls[this.properties.iTCode3].value;
    updateFormLPositionModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    updateFormLPositionModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    updateFormLPositionModel.lowerLimit2 = this.formInput.controls[this.properties.lowerLimit2].value;
    updateFormLPositionModel.lowerLimit3 = this.formInput.controls[this.properties.lowerLimit3].value;

    return updateFormLPositionModel;
  }

  getAddModel(): AddFormLPositionModel {


    const form = this.formInput.controls[this.properties.form].value as Form;


    const addFormLPositionModel = new AddFormLPositionModel();

    Automapper.map(this.entity, addFormLPositionModel);


    addFormLPositionModel.formId = form.id;
    addFormLPositionModel.uOM = this.formInput.controls[this.properties.uOM].value;
    addFormLPositionModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    addFormLPositionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
    addFormLPositionModel.iTCode1 = this.formInput.controls[this.properties.iTCode1].value;
    addFormLPositionModel.iTCode2 = this.formInput.controls[this.properties.iTCode2].value;
    addFormLPositionModel.iTCode3 = this.formInput.controls[this.properties.iTCode3].value;
    addFormLPositionModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    addFormLPositionModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    addFormLPositionModel.lowerLimit2 = this.formInput.controls[this.properties.lowerLimit2].value;
    addFormLPositionModel.lowerLimit3 = this.formInput.controls[this.properties.lowerLimit3].value;

    return addFormLPositionModel;
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
