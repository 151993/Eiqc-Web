/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { ParameterTypeService } from 'src/app/services/parameter-type/parameter-type.service';
import { environment } from 'src/environments/environment';
import { UpdateParameterTypeModel } from 'src/app/model/parameter-type/update-parameter-type-model';
import { AddParameterTypeModel } from 'src/app/model/parameter-type/add-parameter-type-model';
import { ParameterType } from 'src/app/model/parameter-type/parameter-type';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-parameter-type-detail',
  templateUrl: './parameter-type-detail.component.html',
  styleUrls: ['./parameter-type-detail.component.css']
})
export class ParameterTypeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    code: 'code',
    description: 'description',
    comparationMethodDescription: 'comparationMethodDescription',
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ParameterTypeService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new ParameterType();
    this.initForm();
    this.cancelRoute = '/Admin/ParameterType';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      code: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      comparationMethodDescription: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
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
      const parameterType = new ParameterType(data);

      this.formDetails = this.entity;
      this.entity = parameterType;
      this.formInput.patchValue({
        id: parameterType.id,
        code: parameterType.code,
        description: parameterType.description,
        comparationMethodDescription: parameterType.comparationMethodDescription,
        isEnabled: parameterType.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateParameterTypeModel {


    const updateParameterTypeModel = new UpdateParameterTypeModel();

    Automapper.map(this.entity, updateParameterTypeModel);
    return updateParameterTypeModel;
  }

  getAddModel(): AddParameterTypeModel {


    const addParameterTypeModel = new AddParameterTypeModel();

    Automapper.map(this.entity, addParameterTypeModel);


    return addParameterTypeModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isCodeModified() {
    return this.isModified(this.properties.code);
  }

  isCodeEmpty() {
    return this.hasError(this.properties.code, ValidationErrorCodes.required);
  }

  isCodeHasWhiteSpace() {
    return this.hasError(this.properties.code, ValidationErrorCodes.validateWhiteSpace);
  }


  isAsyncValidationPending() {
    // return
    // ;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
