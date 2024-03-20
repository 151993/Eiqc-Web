/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormStatusService } from 'src/app/services/form-status/form-status.service';
import { environment } from 'src/environments/environment';
import { UpdateFormStatusModel } from 'src/app/model/form-status/update-form-status-model';
import { AddFormStatusModel } from 'src/app/model/form-status/add-form-status-model';
import { FormStatus } from 'src/app/model/form-status/form-status';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-status-detail',
  templateUrl: './form-status-detail.component.html',
  styleUrls: ['./form-status-detail.component.css']
})
export class FormStatusDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    statusID: 'statusID',
    userName: 'userName',
    lastTime: 'lastTime',
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
    private apiService: FormStatusService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormStatus();
    this.initForm();
    this.cancelRoute = '/Admin/FormStatus';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormStatusCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormStatusCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormStatusCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      statusID: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      userName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(20),
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
      const formStatus = new FormStatus(data);

      this.formDetails = this.entity;
      this.entity = formStatus;
      this.formInput.patchValue({
        id: formStatus.id,
        form: formStatus.form,
        statusID: formStatus.statusID,
        userName: formStatus.userName,
        isEnabled: formStatus.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormStatusModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormStatusModel = new UpdateFormStatusModel();

    Automapper.map(this.entity, updateFormStatusModel);
    updateFormStatusModel.formId = form.id;
    return updateFormStatusModel;
  }

  getAddModel(): AddFormStatusModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormStatusModel = new AddFormStatusModel();

    Automapper.map(this.entity, addFormStatusModel);

    addFormStatusModel.formId = form.id;

    return addFormStatusModel;
  }



  // isModified(controlName: string) {
  //   return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  // }

  // isFormModified() {
  //   return this.isModified(this.properties.form);
  // }

  isformEmpty() {
    return this.hasError(this.properties.form, ValidationErrorCodes.required);
  }

  isformHasWhiteSpace() {
    return this.hasError(this.properties.form, ValidationErrorCodes.validateWhiteSpace);
  }

  // isStatusIDModified() {
  //   return this.isModified(this.properties.statusID);
  // }

  isStatusIDEmpty() {
    return this.hasError(this.properties.statusID, ValidationErrorCodes.required);
  }

  isStatusIDHasWhiteSpace() {
    return this.hasError(this.properties.statusID, ValidationErrorCodes.validateWhiteSpace);
  }

  // isUserNameModified() {
  //   return this.isModified(this.properties.userName);
  // }

  isUserNameEmpty() {
    return this.hasError(this.properties.userName, ValidationErrorCodes.required);
  }

  isUserNameHasWhiteSpace() {
    return this.hasError(this.properties.userName, ValidationErrorCodes.validateWhiteSpace);
  }

  // isLastTimeModified() {
  //   return this.isModified(this.properties.lastTime);
  // }

  isLastTimeEmpty() {
    return this.hasError(this.properties.lastTime, ValidationErrorCodes.required);
  }

  isLastTimeHasWhiteSpace() {
    return this.hasError(this.properties.lastTime, ValidationErrorCodes.validateWhiteSpace);
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
