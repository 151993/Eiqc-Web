/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { BuyerService } from 'src/app/services/buyer/buyer.service';
import { environment } from 'src/environments/environment';
import { UpdateBuyerModel } from 'src/app/model/buyer/update-buyer-model';
import { AddBuyerModel } from 'src/app/model/buyer/add-buyer-model';
import { Buyer } from 'src/app/model/buyer/buyer';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-buyer-detail',
  templateUrl: './buyer-detail.component.html',
  styleUrls: ['./buyer-detail.component.css']
})
export class BuyerDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    name: 'name',
    buyerCode: 'buyerCode',
    buyerMail: 'buyerMail',
    isValid: 'isValid'
  };
  buyer: Buyer;
  originalFormInput: string;
  autoCompleteBuyerValue: string;

constructor(
  private formBuilder: FormBuilder,
  private apiService: BuyerService,
  activatedRoute: ActivatedRoute,
  notificationService: NotificationService,
  modalService: NgbModal,
  router: Router,
  authService: AuthService
) {
  super(modalService, activatedRoute, router, notificationService, authService, apiService);
  this.entity = new Buyer();
  this.initForm();
  this.cancelRoute = '/Admin/Buyer';

  this.getUpdateModelFn = this.getUpdateModel;
  this.getAddModelFn = this.getAddModel;

  this.canAccessPermissionType = PermissionType.AdminDepartmentCanAccess;
  this.canUpdatePermissionType = PermissionType.AdminDepartmentCanUpdate;
  this.canCreatPermissionType = PermissionType.AdminDepartmentCanCreate;
}

initForm() {
  this.formInput = this.formBuilder.group({
    id: 0,
    name: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(50),
      validateWhiteSpace
    ]),
    buyerCode: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(100),
      validateWhiteSpace
    ]),
    buyerMail: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(50),
      validateWhiteSpace
    ]),
    isValid: new FormControl(true),
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
      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.buyer.name,
          this.properties.name
        )
      );
    }, environment.timer.autoReturn);

    return;
  }

  this.apiService.getDataById(this.recId).subscribe(data => {
    this.buyer = new Buyer(data);

    this.formDetails = this.entity;
    this.entity = this.buyer;
    this.formInput.patchValue({
      id: this.buyer.id,
      name: this.buyer.name,
      buyerCode: this.buyer.buyerCode,
      buyerMail: this.buyer.buyerMail,
      isEnabled: this.buyer.isEnabled,
    });
    this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdateBuyerModel {

  const updateBuyerModel = new UpdateBuyerModel();

  Automapper.map(this.entity, updateBuyerModel);
  return updateBuyerModel;
}

getAddModel(): AddBuyerModel {

  const addBuyerModel = new AddBuyerModel();

  Automapper.map(this.entity, addBuyerModel);

  return addBuyerModel;
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

isBuyerCodeModified() {
  return this.isModified(this.properties.buyerCode);
}

isBuyerCodeEmpty() {
  return this.hasError(this.properties.buyerCode, ValidationErrorCodes.required);
}

isBuyerCodeHasWhiteSpace() {
  return this.hasError(this.properties.buyerCode, ValidationErrorCodes.validateWhiteSpace);
}

isBuyerMailModified() {
  return this.isModified(this.properties.buyerMail);
}

isBuyerMailEmpty() {
  return this.hasError(this.properties.buyerMail, ValidationErrorCodes.required);
}

isBuyerMailHasWhiteSpace() {
  return this.hasError(this.properties.buyerMail, ValidationErrorCodes.validateWhiteSpace);
}

isNameExists() {
  return this.hasError(
    this.properties.name,
    ValidationErrorCodes.alreadyExists
  );
}

isAsycValidationPending() {
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
