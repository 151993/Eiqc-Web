/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormSAPParameterService } from 'src/app/services/form-sap-parameter/form-sap-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateFormSAPParameterModel } from 'src/app/model/form-sap-parameter/update-form-sap-parameter-model';
import { AddFormSAPParameterModel } from 'src/app/model/form-sap-parameter/add-form-sap-parameter-model';
import { FormSAPParameter } from 'src/app/model/form-sap-parameter/form-sap-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-sap-parameter-detail',
  templateUrl: './form-sap-parameter-detail.component.html',
  styleUrls: ['./form-sap-parameter-detail.component.css']
})
export class FormSAPParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    parameterName: 'parameterName',
    sAPParameterExpected: 'sAPParameterExpected',
    sAPParameterActual: 'sAPParameterActual',
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
    private apiService: FormSAPParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormSAPParameter();
    this.initForm();
    this.cancelRoute = '/Admin/FormSAPParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormSAPParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormSAPParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormSAPParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      sAPParameterExpected: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      sAPParameterActual: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
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
      const formSAPParameter = new FormSAPParameter(data);

      this.formDetails = this.entity;
      this.entity = formSAPParameter;
      this.formInput.patchValue({
        id: formSAPParameter.id,
        form: formSAPParameter.form,
        parameterName: formSAPParameter.parameterName,
        sAPParameterExpected: formSAPParameter.sapParameterExpected,
        sAPParameterActual: formSAPParameter.sapParameterActual,
        isEnabled: formSAPParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormSAPParameterModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormSAPParameterModel = new UpdateFormSAPParameterModel();

    Automapper.map(this.entity, updateFormSAPParameterModel);
    updateFormSAPParameterModel.formId = form.id;
    updateFormSAPParameterModel.sAPParameterActual = this.formInput.controls[this.properties.sAPParameterActual].value;
    updateFormSAPParameterModel.sAPParameterExpected = this.formInput.controls[this.properties.sAPParameterExpected].value;

    return updateFormSAPParameterModel;
  }

  getAddModel(): AddFormSAPParameterModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormSAPParameterModel = new AddFormSAPParameterModel();

    Automapper.map(this.entity, addFormSAPParameterModel);

    addFormSAPParameterModel.formId = form.id;

    addFormSAPParameterModel.sAPParameterActual = this.formInput.controls[this.properties.sAPParameterActual].value;
    addFormSAPParameterModel.sAPParameterExpected = this.formInput.controls[this.properties.sAPParameterExpected].value;

    return addFormSAPParameterModel;
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

  isSAPParameterExpectedModified() {
    return this.isModified(this.properties.sAPParameterExpected);
  }

  isSAPParameterExpectedEmpty() {
    return this.hasError(this.properties.sAPParameterExpected, ValidationErrorCodes.required);
  }

  isSAPParameterExpectedHasWhiteSpace() {
    return this.hasError(this.properties.sAPParameterExpected, ValidationErrorCodes.validateWhiteSpace);
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
