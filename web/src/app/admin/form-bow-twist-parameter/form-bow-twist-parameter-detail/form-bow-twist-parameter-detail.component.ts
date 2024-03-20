/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormBowTwistParameterService } from 'src/app/services/form-bow-twist-parameter/form-bow-twist-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateFormBowTwistParameterModel } from 'src/app/model/form-bow-twist-parameter/update-form-bow-twist-parameter-model';
import { AddFormBowTwistParameterModel } from 'src/app/model/form-bow-twist-parameter/add-form-bow-twist-parameter-model';
import { FormBowTwistParameter } from 'src/app/model/form-bow-twist-parameter/form-bow-twist-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-bow-twist-parameter-detail',
  templateUrl: './form-bow-twist-parameter-detail.component.html',
  styleUrls: ['./form-bow-twist-parameter-detail.component.css']
})
export class FormBowTwistParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    warpType: 'warpType',
    spec: 'spec',
    length: 'length',
    width: 'width',
    unit: 'unit',
    upperLimit: 'upperLimit',
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
    private apiService: FormBowTwistParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormBowTwistParameter();
    this.initForm();
    this.cancelRoute = '/Admin/FormBowTwistParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormBowTwistParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormBowTwistParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormBowTwistParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      warpType: new FormControl(null),

      spec: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      length: new FormControl(Constants.Empty, [
        Validators.maxLength(53),
        validateWhiteSpace
      ]),
      width: new FormControl(Constants.Empty, [
        Validators.maxLength(53),
        validateWhiteSpace
      ]),
      unit: new FormControl(Constants.Empty, [
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      upperLimit: new FormControl(Constants.Empty, [
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
      const formBowTwistParameter = new FormBowTwistParameter(data);

      this.formDetails = this.entity;
      this.entity = formBowTwistParameter;
      this.formInput.patchValue({
        id: formBowTwistParameter.id,
        form: formBowTwistParameter.form,
        warpType: formBowTwistParameter.warpType,
        spec: formBowTwistParameter.spec,
        length: formBowTwistParameter.length,
        width: formBowTwistParameter.width,
        unit: formBowTwistParameter.unit,
        upperLimit: formBowTwistParameter.upperLimit,
        isEnabled: formBowTwistParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormBowTwistParameterModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormBowTwistParameterModel = new UpdateFormBowTwistParameterModel();

    Automapper.map(this.entity, updateFormBowTwistParameterModel);
    updateFormBowTwistParameterModel.formId = form.id;
    return updateFormBowTwistParameterModel;
  }

  getAddModel(): AddFormBowTwistParameterModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormBowTwistParameterModel = new AddFormBowTwistParameterModel();

    Automapper.map(this.entity, addFormBowTwistParameterModel);

    addFormBowTwistParameterModel.formId = form.id;

    return addFormBowTwistParameterModel;
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
