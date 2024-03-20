/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormMPositionActualService } from 'src/app/services/form-m-position-actual/form-m-position-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateFormMPositionActualModel } from 'src/app/model/form-m-position-actual/update-form-m-position-actual-model';
import { AddFormMPositionActualModel } from 'src/app/model/form-m-position-actual/add-form-m-position-actual-model';
import { FormMPositionActual } from 'src/app/model/form-m-position-actual/form-m-position-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-m-position-actual-detail',
  templateUrl: './form-m-position-actual-detail.component.html',
  styleUrls: ['./form-m-position-actual-detail.component.css']
})
export class FormMPositionActualDetailComponent extends BaseDetailComponent
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
    base1Actual: 'base1Actual',
    base2Actual: 'base2Actual',
    base3Actual: 'base3Actual',
    instrumentID1: ' instrumentID1',
    instrumentID2: ' instrumentID2',
    instrumentID3: ' instrumentID3',
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
    private apiService: FormMPositionActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormMPositionActual();
    this.initForm();
    this.cancelRoute = '/Admin/FormMPositionActual';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormMPositionActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormMPositionActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormMPositionActualCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      no: new FormControl(null),
      valueActual: new FormControl(null),
      positionCalcul: new FormControl(null),
      positionActual: new FormControl(null),
      base1Actual: new FormControl(null),
      base2Actual: new FormControl(null),
      base3Actual: new FormControl(null),
      instrumentID1: new FormControl(null),
      instrumentID2: new FormControl(null),
      instrumentID3: new FormControl(null),
      positionType: new FormControl(null),



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
      const formMPositionActual = new FormMPositionActual(data);

      this.formDetails = this.entity;
      this.entity = formMPositionActual;
      this.formInput.patchValue({
        id: formMPositionActual.id,
        form: formMPositionActual.form,
        lineNo: formMPositionActual.lineNo,
        no: formMPositionActual.no,
        valueActual: formMPositionActual.valueActual,
        positionCalcul: formMPositionActual.positionCalcul,
        positionActual: formMPositionActual.positionActual,
        result: formMPositionActual.result,
        instrumentID: formMPositionActual.instrumentID,
        base1Actual: formMPositionActual.base1Actual,
        base2Actual: formMPositionActual.base2Actual,
        base3Actual: formMPositionActual.base3Actual,
        instrumentID1: formMPositionActual.instrumentID1,
        instrumentID2: formMPositionActual.instrumentID2,
        instrumentID3: formMPositionActual.instrumentID3,
        positionType: formMPositionActual.positionType,
        isEnabled: formMPositionActual.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormMPositionActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormMPositionActualModel = new UpdateFormMPositionActualModel();

    Automapper.map(this.entity, updateFormMPositionActualModel);
    updateFormMPositionActualModel.formId = form.id;
    return updateFormMPositionActualModel;
  }

  getAddModel(): AddFormMPositionActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormMPositionActualModel = new AddFormMPositionActualModel();

    Automapper.map(this.entity, addFormMPositionActualModel);

    addFormMPositionActualModel.formId = form.id;
    return addFormMPositionActualModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  // isFormIdModified() {
  //   return this.isModified(this.properties.formId);
  // }

  // isFormIdEmpty() {
  //   return this.hasError(this.properties.formId, ValidationErrorCodes.required);
  // }

  // isFormIdHasWhiteSpace() {
  //   return this.hasError(this.properties.formId, ValidationErrorCodes.validateWhiteSpace);
  // }

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
