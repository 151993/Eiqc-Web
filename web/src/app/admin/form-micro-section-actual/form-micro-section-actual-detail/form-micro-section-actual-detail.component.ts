/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormMicroSectionActualService } from 'src/app/services/form-micro-section-actual/form-micro-section-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateFormMicroSectionActualModel } from 'src/app/model/form-micro-section-actual/update-form-micro-section-actual-model';
import { AddFormMicroSectionActualModel } from 'src/app/model/form-micro-section-actual/add-form-micro-section-actual-model';
import { FormMicroSectionActual } from 'src/app/model/form-micro-section-actual/form-micro-section-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-micro-section-actual-detail',
  templateUrl: './form-micro-section-actual-detail.component.html',
  styleUrls: ['./form-micro-section-actual-detail.component.css']
})
export class FormMicroSectionActualDetailComponent extends BaseDetailComponent
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
    private apiService: FormMicroSectionActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormMicroSectionActual();
    this.initForm();
    this.cancelRoute = '/Admin/FormMicroSectionActual';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminFormMicroSectionActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormMicroSectionActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormMicroSectionActualCanCreate;

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
      const formMicroSectionActual = new FormMicroSectionActual(data);

      this.formDetails = this.entity;
      this.entity = formMicroSectionActual;
      this.formInput.patchValue({
        id: formMicroSectionActual.id,
        form: formMicroSectionActual.form,
        parameterName: formMicroSectionActual.parameterName,
        no: formMicroSectionActual.no,
        valueActual: formMicroSectionActual.valueActual,
        isEnabled: formMicroSectionActual.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormMicroSectionActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormMicroSectionActualModel = new UpdateFormMicroSectionActualModel();

    Automapper.map(this.entity, updateFormMicroSectionActualModel);
    updateFormMicroSectionActualModel.formId = form.id;
    return updateFormMicroSectionActualModel;
  }

  getAddModel(): AddFormMicroSectionActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormMicroSectionActualModel = new AddFormMicroSectionActualModel();

    Automapper.map(this.entity, addFormMicroSectionActualModel);

    addFormMicroSectionActualModel.formId = form.id;

    return addFormMicroSectionActualModel;
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
