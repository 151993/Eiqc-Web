/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormBowTwistActualService } from 'src/app/services/form-bow-twist-actual/form-bow-twist-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateFormBowTwistActualModel } from 'src/app/model/form-bow-twist-actual/update-form-bow-twist-actual-model';
import { AddFormBowTwistActualModel } from 'src/app/model/form-bow-twist-actual/add-form-bow-twist-actual-model';
import { FormBowTwistActual } from 'src/app/model/form-bow-twist-actual/form-bow-twist-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-bow-twist-actual-detail',
  templateUrl: './form-bow-twist-actual-detail.component.html',
  styleUrls: ['./form-bow-twist-actual-detail.component.css']
})
export class FormBowTwistActualDetailComponent extends BaseDetailComponent
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
    private apiService: FormBowTwistActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormBowTwistActual();
    this.initForm();
    this.cancelRoute = '/Admin/FormBowTwistActual';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormBowTwistActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormBowTwistActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormBowTwistActualCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      sAPParameterExpected: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      sAPParameterActual: new FormControl(Constants.Empty, [
        Validators.required,
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
      const formBowTwistActual = new FormBowTwistActual(data);

      this.formDetails = this.entity;
      this.entity = formBowTwistActual;
      this.formInput.patchValue({
        id: formBowTwistActual.id,
        form: formBowTwistActual.form,
        parameterName: formBowTwistActual.parameterName,
        sAPParameterExpected: formBowTwistActual.sapParameterExpected,
        sAPParameterActual: formBowTwistActual.sapParameterActual,
        isEnabled: formBowTwistActual.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormBowTwistActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;
    const updateFormBowTwistActualModel = new UpdateFormBowTwistActualModel();

    Automapper.map(this.entity, updateFormBowTwistActualModel);
    updateFormBowTwistActualModel.formId = form.id;
    updateFormBowTwistActualModel.sAPParameterExpected = this.formInput.controls[this.properties.sAPParameterExpected].value;
    updateFormBowTwistActualModel.sAPParameterActual = this.formInput.controls[this.properties.sAPParameterActual].value;
    return updateFormBowTwistActualModel;
  }

  getAddModel(): AddFormBowTwistActualModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormBowTwistActualModel = new AddFormBowTwistActualModel();

    Automapper.map(this.entity, addFormBowTwistActualModel);

    addFormBowTwistActualModel.formId = form.id;
    addFormBowTwistActualModel.sAPParameterExpected = this.formInput.controls[this.properties.sAPParameterExpected].value;
    addFormBowTwistActualModel.sAPParameterActual = this.formInput.controls[this.properties.sAPParameterActual].value;


    return addFormBowTwistActualModel;
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

  isSAPParameterActualModified() {
    return this.isModified(this.properties.sAPParameterActual);
  }

  isSAPParameterActualEmpty() {
    return this.hasError(this.properties.sAPParameterActual, ValidationErrorCodes.required);
  }

  isSAPParameterActualHasWhiteSpace() {
    return this.hasError(this.properties.sAPParameterActual, ValidationErrorCodes.validateWhiteSpace);
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
