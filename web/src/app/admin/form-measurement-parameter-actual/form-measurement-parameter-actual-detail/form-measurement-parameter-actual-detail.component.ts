/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormMeasurementParameterActualService } from 'src/app/services/form-measurement-parameter-actual/form-measurement-parameter-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateFormMeasurementParameterActualModel } from 'src/app/model/form-measurement-parameter-actual/update-form-measurement-parameter-actual-model';
import { AddFormMeasurementParameterActualModel } from 'src/app/model/form-measurement-parameter-actual/add-form-measurement-parameter-actual-model';
import { FormMeasurementParameterActual } from 'src/app/model/form-measurement-parameter-actual/form-measurement-parameter-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-measurement-parameter-actual-detail',
  templateUrl: './form-measurement-parameter-actual-detail.component.html',
  styleUrls: ['./form-measurement-parameter-actual-detail.component.css']
})
export class FormMeasurementParameterActualDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    parameterName: 'parameterName',
    no: 'no',
    valueActual: 'valueActual',
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
    private apiService: FormMeasurementParameterActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormMeasurementParameterActual();
    this.initForm();
    this.cancelRoute = '/Admin/FormMeasurementParameterActual';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormMeasurementParameterActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormMeasurementParameterActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormMeasurementParameterActualCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      no: new FormControl(null),
      valueActual: new FormControl(null),

      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
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
      const formMeasurementParameterActual = new FormMeasurementParameterActual(data);

      this.formDetails = this.entity;
      this.entity = formMeasurementParameterActual;
      this.formInput.patchValue({
        id: formMeasurementParameterActual.id,
        form: formMeasurementParameterActual.form,
        parameterName: formMeasurementParameterActual.parameterName,
        no: formMeasurementParameterActual.no,
        valueActual: formMeasurementParameterActual.valueActual,
        isEnabled: formMeasurementParameterActual.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormMeasurementParameterActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormMeasurementParameterActualModel = new UpdateFormMeasurementParameterActualModel();

    Automapper.map(this.entity, updateFormMeasurementParameterActualModel);
    updateFormMeasurementParameterActualModel.formId = form.id;
    return updateFormMeasurementParameterActualModel;
  }

  getAddModel(): AddFormMeasurementParameterActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormMeasurementParameterActualModel = new AddFormMeasurementParameterActualModel();

    Automapper.map(this.entity, addFormMeasurementParameterActualModel);

    addFormMeasurementParameterActualModel.formId = form.id;

    return addFormMeasurementParameterActualModel;
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
    return;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
