/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormTypeService } from 'src/app/services/form-type/form-type.service';
import { environment } from 'src/environments/environment';
import { UpdateFormTypeModel } from 'src/app/model/form-type/update-form-type-model';
import { AddFormTypeModel } from 'src/app/model/form-type/add-form-type-model';
import { FormType } from 'src/app/model/form-type/form-type';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-form-type-detail',
  templateUrl: './form-type-detail.component.html',
  styleUrls: ['./form-type-detail.component.css']
})
export class FormTypeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    type: 'type',

  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: FormTypeService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormType();
    this.initForm();
    this.cancelRoute = '/Admin/FormType';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormTypeCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormTypeCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormTypeCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      type: new FormControl(Constants.Empty, [
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
        this.formInput.controls[this.properties.type].setAsyncValidators(uniqueAsyncValidator(this.apiService, Constants.Empty, this.properties.type));

      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const formType = new FormType(data);

      this.formDetails = this.entity;
      this.entity = formType;
      this.formInput.patchValue({
        id: formType.id,
        type: formType.type,

        isEnabled: formType.isEnabled,
      });
      this.formInput.controls[this.properties.type].setAsyncValidators(uniqueAsyncValidator(this.apiService, formType.type, this.properties.type));


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormTypeModel {



    const updateFormTypeModel = new UpdateFormTypeModel();

    Automapper.map(this.entity, updateFormTypeModel);


    return updateFormTypeModel;
  }

  getAddModel(): AddFormTypeModel {




    const addFormTypeModel = new AddFormTypeModel();

    Automapper.map(this.entity, addFormTypeModel);




    return addFormTypeModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isTypeModified() {
    return this.isModified(this.properties.type);
  }

  isTypeEmpty() {
    return this.hasError(this.properties.type, ValidationErrorCodes.required);
  }

  isTypeHasWhiteSpace() {
    return this.hasError(this.properties.type, ValidationErrorCodes.validateWhiteSpace);
  }

  isTypeExists() {
    return this.hasError(this.properties.type, ValidationErrorCodes.alreadyExists);
  }

  isAsyncValidationPending() {
    // return
    // this.formInput.controls[this.properties.type].status === ControlStates.PENDING ||
    // ;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
