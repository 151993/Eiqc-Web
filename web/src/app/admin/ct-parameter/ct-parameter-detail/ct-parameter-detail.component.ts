/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { CTParameterService } from 'src/app/services/ct-parameter/ct-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateCTParameterModel } from 'src/app/model/ct-parameter/update-ct-parameter-model';
import { AddCTParameterModel } from 'src/app/model/ct-parameter/add-ct-parameter-model';
import { CTParameter } from 'src/app/model/ct-parameter/ct-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-ct-parameter-detail',
  templateUrl: './ct-parameter-detail.component.html',
  styleUrls: ['./ct-parameter-detail.component.css']
})
export class CTParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
properties = {
  id: 'id',
  name: 'name',
  description: 'description'
  };
  ctParameter: CTParameter;
constructor(
  private formBuilder: FormBuilder,
  private apiService: CTParameterService,
  authService: AuthService,
  activatedRoute: ActivatedRoute,
  notificationService: NotificationService,
  modalService: NgbModal,
  router: Router
) {
  super(modalService, activatedRoute, router, notificationService, authService, apiService);
  this.entity = new CTParameter();
  this.initForm();
  this.cancelRoute = '/Admin/CTParameter';

  this.getUpdateModelFn = this.getUpdateModel;
  this.getAddModelFn = this.getAddModel;

  this.canAccessPermissionType = PermissionType.AdminCTParameterCanAccess;
  this.canUpdatePermissionType = PermissionType.AdminCTParameterCanUpdate;
  this.canCreatPermissionType = PermissionType.AdminCTParameterCanCreate;
}

initForm() {
  this.formInput = this.formBuilder.group({
    id: 0,
    name: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(50),
      validateWhiteSpace
    ]),
    description: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
      validateWhiteSpace
    ]),
    isEnabled: new FormControl(true, Validators.required),
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
      // this.formInput.controls[this.properties.name].setAsyncValidators(
      //   uniqueAsyncValidator(
      //     this.apiService,
      //     this.ctParameter.name,
      //     this.properties.name
      //   )
      // );
    }, environment.timer.autoReturn);
    return;
  }

  this.apiService.getDataById(this.recId).subscribe(data => {
    const cTParameter = new CTParameter(data);

    this.formDetails = this.entity;
    this.entity = cTParameter;
    this.formInput.patchValue({
      id: cTParameter.id,
      name: cTParameter.name,
      description: cTParameter.description,
      isEnabled: cTParameter.isEnabled,
    });
    this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdateCTParameterModel {


  const updateCTParameterModel = new UpdateCTParameterModel();

  Automapper.map(this.entity, updateCTParameterModel);
  return updateCTParameterModel;
}

getAddModel(): AddCTParameterModel {


  const addCTParameterModel = new AddCTParameterModel();

  Automapper.map(this.entity, addCTParameterModel);


  return addCTParameterModel;
}



isModified(controlName: string) {
  return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
}

isNameModified() {
  return this.isModified(this.properties.name);
}

isNameEmpty() {
  return this.hasError(this.properties.name, ValidationErrorCodes.required);
}

isNameHasWhiteSpace() {
  return this.hasError(this.properties.name, ValidationErrorCodes.validateWhiteSpace);
}


isAsyncValidationPending() {
  return (
    this.formInput.controls[this.properties.name].status ===
    ControlStates.PENDING
  );
  // TO DO: Remove extra or(||)
}

isSaveDisabled() {
  return !this.enableSaveButton
    || !this.formInput.valid
    || !this.formInput.dirty;
}

}
