/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormPackagingService } from 'src/app/services/form-packaging/form-packaging.service';
import { environment } from 'src/environments/environment';
import { UpdateFormPackagingModel } from 'src/app/model/form-packaging/update-form-packaging-model';
import { AddFormPackagingModel } from 'src/app/model/form-packaging/add-form-packaging-model';
import { FormPackaging } from 'src/app/model/form-packaging/form-packaging';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-packaging-detail',
  templateUrl: './form-packaging-detail.component.html',
  styleUrls: ['./form-packaging-detail.component.css']
})
export class FormPackagingDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    resultDesc: 'resultDesc',
    result: 'result',
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
    private apiService: FormPackagingService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormPackaging();
    this.initForm();
    this.cancelRoute = '/Admin/FormPackaging';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormPackagingCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormPackagingCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormPackagingCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      result: new FormControl(null),
      resultDesc: new FormControl(Constants.Empty, [
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
      const formPackaging = new FormPackaging(data);

      this.formDetails = this.entity;
      this.entity = formPackaging;
      this.formInput.patchValue({
        id: formPackaging.id,
        form: formPackaging.form,
        resultDesc: formPackaging.resultDesc,
        result: formPackaging.result,
        isEnabled: formPackaging.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormPackagingModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormPackagingModel = new UpdateFormPackagingModel();

    Automapper.map(this.entity, updateFormPackagingModel);
    updateFormPackagingModel.formId = form.id;
    return updateFormPackagingModel;
  }

  getAddModel(): AddFormPackagingModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormPackagingModel = new AddFormPackagingModel();

    Automapper.map(this.entity, addFormPackagingModel);

    addFormPackagingModel.formId = form.id;

    return addFormPackagingModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isFormModified() {
    return this.isModified(this.properties.form);
  }

  isFormEmpty() {
    return this.hasError(this.properties.form, ValidationErrorCodes.required);
  }

  isFormHasWhiteSpace() {
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
