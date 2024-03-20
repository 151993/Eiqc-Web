/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { DispositionTypeService } from 'src/app/services/disposition-type/disposition-type.service';
import { environment } from 'src/environments/environment';
import { UpdateDispositionTypeModel } from 'src/app/model/disposition-type/update-disposition-type-model';
import { AddDispositionTypeModel } from 'src/app/model/disposition-type/add-disposition-type-model';
import { DispositionType } from 'src/app/model/disposition-type/disposition-type';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';


@Component({
  selector: 'app-disposition-type-detail',
  templateUrl: './disposition-type-detail.component.html',
  styleUrls: ['./disposition-type-detail.component.css']
})
export class DispositionTypeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
  id: 'id',
  description: 'description',
  };

constructor(
  private formBuilder: FormBuilder,
  private apiService: DispositionTypeService,
  authService: AuthService,
  activatedRoute: ActivatedRoute,
  notificationService: NotificationService,
  modalService: NgbModal,
  router: Router
) {
  super(modalService, activatedRoute, router, notificationService, authService, apiService);
  this.entity = new DispositionType();
  this.initForm();
  this.cancelRoute = '/Admin/DispositionType';

  this.getUpdateModelFn = this.getUpdateModel;
  this.getAddModelFn = this.getAddModel;

  this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
  this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
  this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
}

initForm() {
  this.formInput = this.formBuilder.group({
    id: 0,
    description: new FormControl(Constants.Empty, [
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
    const dispositionType = new DispositionType(data);

    this.formDetails = this.entity;
    this.entity = dispositionType;
    this.formInput.patchValue({
      id: dispositionType.id,
      description: dispositionType.description,

      isEnabled: dispositionType.isEnabled,
    });


    this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdateDispositionTypeModel {




  const updateDispositionTypeModel = new UpdateDispositionTypeModel();

  Automapper.map(this.entity, updateDispositionTypeModel);

  return updateDispositionTypeModel;
}

getAddModel(): AddDispositionTypeModel {




  const addDispositionTypeModel = new AddDispositionTypeModel();

  Automapper.map(this.entity, addDispositionTypeModel);




  return addDispositionTypeModel;
}




isModified(controlName: string) {
  return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
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
