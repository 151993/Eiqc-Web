/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormResultOrientedParameterService } from 'src/app/services/form-result-oriented-parameter/form-result-oriented-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateFormResultOrientedParameterModel } from 'src/app/model/form-result-oriented-parameter/update-form-result-oriented-parameter-model';
import { AddFormResultOrientedParameterModel } from 'src/app/model/form-result-oriented-parameter/add-form-result-oriented-parameter-model';
import { FormResultOrientedParameter } from 'src/app/model/form-result-oriented-parameter/form-result-oriented-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-result-oriented-parameter-detail',
  templateUrl: './form-result-oriented-parameter-detail.component.html',
  styleUrls: ['./form-result-oriented-parameter-detail.component.css']
})
export class FormResultOrientedParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    parameterName: 'parameterName',
    resultExpected: 'resultExpected',
    resultActual: 'resultActual',
    testCondition: 'testCondition',
    inspectionDetails: 'inspectionDetails',
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
    private apiService: FormResultOrientedParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormResultOrientedParameter();
    this.initForm();
    this.cancelRoute = '/Admin/FormResultOrientedParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormResultOrientedParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormResultOrientedParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormResultOrientedParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      resultActual: new FormControl(null),
      resultExpected: new FormControl(null),

      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      testCondition: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      inspectionDetails: new FormControl(Constants.Empty, [
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
      const formResultOrientedParameter = new FormResultOrientedParameter(data);

      this.formDetails = this.entity;
      this.entity = formResultOrientedParameter;
      this.formInput.patchValue({
        id: formResultOrientedParameter.id,
        form: formResultOrientedParameter.form,
        parameterName: formResultOrientedParameter.parameterName,
        resultExpected: formResultOrientedParameter.resultExpected,
        resultActual: formResultOrientedParameter.resultActual,
        testCondition: formResultOrientedParameter.testCondition,
        inspectionDetails: formResultOrientedParameter.inspectionDetails,
        isEnabled: formResultOrientedParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormResultOrientedParameterModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormResultOrientedParameterModel = new UpdateFormResultOrientedParameterModel();

    Automapper.map(this.entity, updateFormResultOrientedParameterModel);
    updateFormResultOrientedParameterModel.formId = form.id;
    return updateFormResultOrientedParameterModel;
  }

  getAddModel(): AddFormResultOrientedParameterModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormResultOrientedParameterModel = new AddFormResultOrientedParameterModel();

    Automapper.map(this.entity, addFormResultOrientedParameterModel);

    addFormResultOrientedParameterModel.formId = form.id;

    return addFormResultOrientedParameterModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isformModified() {
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

  isResultExpectedModified() {
    return this.isModified(this.properties.resultExpected);
  }

  isResultExpectedEmpty() {
    return this.hasError(this.properties.resultExpected, ValidationErrorCodes.required);
  }

  isResultExpectedHasWhiteSpace() {
    return this.hasError(this.properties.resultExpected, ValidationErrorCodes.validateWhiteSpace);
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
