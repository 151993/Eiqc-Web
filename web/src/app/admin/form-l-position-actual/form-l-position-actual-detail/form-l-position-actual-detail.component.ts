/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormLPositionActualService } from 'src/app/services/form-l-position-actual/form-l-position-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateFormLPositionActualModel } from 'src/app/model/form-l-position-actual/update-form-l-position-actual-model';
import { AddFormLPositionActualModel } from 'src/app/model/form-l-position-actual/add-form-l-position-actual-model';
import { FormLPositionActual } from 'src/app/model/form-l-position-actual/form-l-position-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-l-position-actual-detail',
  templateUrl: './form-l-position-actual-detail.component.html',
  styleUrls: ['./form-l-position-actual-detail.component.css']
})
export class FormLPositionActualDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    lineNo: 'lineNo',
    no: 'no',
    valueActual: 'valueActual',
    positionCalcul: 'positionCalcul',
    positionActual: 'positionActual',
    result: 'result',
    instrumentID: 'instrumentID',
    instrumentID2: 'instrumentID2',
    base1Actual: 'base1Actual',
    base2Actual: 'base2Actual',
    base3Actual: 'base3Actual',
    InstrumentID1: 'InstrumentID1',
    InstrumentID2: 'InstrumentID2',
    InstrumentID3: 'InstrumentID3',
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
    private apiService: FormLPositionActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormLPositionActual();
    this.initForm();
    this.cancelRoute = '/Admin/FormLPositionActual';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormLPositionActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormLPositionActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormLPositionActualCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      lineNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      result: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      instrumentID: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      instrumentID2: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      InstrumentID1: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      InstrumentID2: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      InstrumentID3: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
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
      const formLPositionActual = new FormLPositionActual(data);

      this.formDetails = this.entity;
      this.entity = formLPositionActual;
      this.formInput.patchValue({
        id: formLPositionActual.id,
        form: formLPositionActual.form,
        lineNo: formLPositionActual.lineNo,
        no: formLPositionActual.no,
        valueActual: formLPositionActual.valueActual,
        positionCalcul: formLPositionActual.positionCalcul,
        positionActual: formLPositionActual.positionActual,
        result: formLPositionActual.result,
        instrumentID: formLPositionActual.instrumentID,
        instrumentID2: formLPositionActual.instrumentID2,
        base1Actual: formLPositionActual.base1Actual,
        base2Actual: formLPositionActual.base2Actual,
        base3Actual: formLPositionActual.base3Actual,
        InstrumentID1: formLPositionActual.InstrumentID1,
        InstrumentID2: formLPositionActual.InstrumentID2,
        InstrumentID3: formLPositionActual.InstrumentID3,
        positionType: formLPositionActual.positionType,
        isEnabled: formLPositionActual.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormLPositionActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormLPositionActualModel = new UpdateFormLPositionActualModel();

    Automapper.map(this.entity, updateFormLPositionActualModel);
    updateFormLPositionActualModel.formId = form.id;
    return updateFormLPositionActualModel;
  }

  getAddModel(): AddFormLPositionActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormLPositionActualModel = new AddFormLPositionActualModel();

    Automapper.map(this.entity, addFormLPositionActualModel);

    addFormLPositionActualModel.formId = form.id;

    return addFormLPositionActualModel;
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

  isNoModified() {
    return this.isModified(this.properties.no);
  }

  isNoEmpty() {
    return this.hasError(this.properties.no, ValidationErrorCodes.required);
  }

  isNoHasWhiteSpace() {
    return this.hasError(this.properties.no, ValidationErrorCodes.validateWhiteSpace);
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
