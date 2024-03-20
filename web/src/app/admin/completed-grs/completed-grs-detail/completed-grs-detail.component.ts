/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { CompletedGRSService } from 'src/app/services/completed-grs/completed-grs.service';
import { environment } from 'src/environments/environment';
import { UpdateCompletedGRSModel } from 'src/app/model/completed-grs/update-completed-grs-model';
import { AddCompletedGRSModel } from 'src/app/model/completed-grs/add-completed-grs-model';
import { CompletedGRS } from 'src/app/model/completed-grs/completed-grs';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-completed-grs-detail',
  templateUrl: './completed-grs-detail.component.html',
  styleUrls: ['./completed-grs-detail.component.css']
})
export class CompletedGRSDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
 properties = {
  id: 'id',
  partNo: 'partNo',
  uDCode: 'uDCode',
  gRSNo: 'gRSNo',
  };

constructor(
  private formBuilder: FormBuilder,
  private apiService: CompletedGRSService,
  activatedRoute: ActivatedRoute,
  notificationService: NotificationService,
  modalService: NgbModal,
  router: Router,
  authService: AuthService
) {
  super(modalService, activatedRoute, router, notificationService, authService, apiService);
  this.entity = new CompletedGRS();
  this.initForm();
  this.cancelRoute = '/Admin/CompletedGRS';

  this.getUpdateModelFn = this.getUpdateModel;
  this.getAddModelFn = this.getAddModel;

  this.canAccessPermissionType = PermissionType.AdminDepartmentCanAccess;
  this.canUpdatePermissionType = PermissionType.AdminDepartmentCanUpdate;
  this.canCreatPermissionType = PermissionType.AdminDepartmentCanCreate;
}

initForm() {
  this.formInput = this.formBuilder.group({
    id: 0,
    partNo: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
      validateWhiteSpace
    ]),
    uDCode: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
      validateWhiteSpace
    ]),
    gRSNo: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
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
    const completedGRS = new CompletedGRS(data);

    this.formDetails = this.entity;
    this.entity = completedGRS;
    this.formInput.patchValue({
      id: completedGRS.id,
      partNo: completedGRS.partNo,
      uDCode: completedGRS.udCode,
      gRSNo: completedGRS.grsNo,
      isEnabled: completedGRS.isEnabled,
    });
    this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdateCompletedGRSModel {
  const grsNo = this.formInput.controls[this.properties.gRSNo].value;
  const udCode = this.formInput.controls[this.properties.uDCode].value;
  const updateCompletedGRSModel = new UpdateCompletedGRSModel();
  Automapper.map(this.entity, updateCompletedGRSModel);
  updateCompletedGRSModel.gRSNo = grsNo;
  updateCompletedGRSModel.uDCode = udCode;
  return updateCompletedGRSModel;
}

getAddModel(): AddCompletedGRSModel {
  const grsNo = this.formInput.controls[this.properties.gRSNo].value;
  const udCode = this.formInput.controls[this.properties.uDCode].value;
  const addCompletedGRSModel = new AddCompletedGRSModel();
  Automapper.map(this.entity, addCompletedGRSModel);
  addCompletedGRSModel.gRSNo = grsNo;
  addCompletedGRSModel.uDCode = udCode;
  return addCompletedGRSModel;
}



isModified(controlName: string) {
  return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
}


isAsyncValidationPending() {
  return (
    this.formInput.controls[this.properties.partNo].status ===
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
