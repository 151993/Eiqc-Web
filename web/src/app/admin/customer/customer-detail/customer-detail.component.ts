/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { environment } from 'src/environments/environment';
import { UpdateCustomerModel } from 'src/app/model/customer/update-customer-model';
import { AddCustomerModel } from 'src/app/model/customer/add-customer-model';
import { Customer } from 'src/app/model/customer/customer';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { User } from 'src/app/model/user/user';
import * as _ from 'lodash';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    name: 'name',
    cafPath: 'cafPath',
    dccSavePath: 'dccSavePath',
    cafTempPath: 'cafTempPath',
    backupSavePath: 'backupSavePath',
    users: 'users'
  };
  users: User[] = [];
  customer: Customer;
  originalUserIds: number[];
  constructor(
    private formBuilder: FormBuilder,
    private apiService: CustomerService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new Customer();
    this.initForm();
    this.cancelRoute = '/Admin/Customer';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminCustomerCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminCustomerCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminCustomerCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      cafPath: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      dccSavePath: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      cafTempPath: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      backupSavePath: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      users: new FormControl(Constants.Empty, Validators.required),
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
        // this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.customer.name, this.properties.name));

      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const customer = new Customer(data);

      this.formDetails = this.entity;
      this.entity = customer;
      this.formInput.patchValue({
        id: customer.id,
        name: customer.name,
        dccSavePath: customer.dccSavePath,
        cafTempPath: customer.cafTempPath,
        backupSavePath: customer.backupSavePath,
        users: customer.users,
        isEnabled: customer.isEnabled,
        cafPath: customer.cafPath,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

      this.originalUserIds = JSON.parse(
        JSON.stringify(_.map(this.customer.users, (x) => x.id))
      );
    });
  }

  getUpdateModel(): UpdateCustomerModel {

    const updateCustomerModel = new UpdateCustomerModel();

    Automapper.map(this.entity, updateCustomerModel);
    const usersIds = _.map(
      this.formInput.controls[this.properties.users].value,
      this.properties.id
    );
    updateCustomerModel.cAFPath = this.formInput.controls[this.properties.cafPath].value;
    updateCustomerModel.dCCSavePath = this.formInput.controls[this.properties.dccSavePath].value;
    updateCustomerModel.cAFTempPath = this.formInput.controls[this.properties.cafTempPath].value;
    updateCustomerModel.backupSavePath = this.formInput.controls[this.properties.backupSavePath].value;

    updateCustomerModel.addedUserIds = this.getAddedUserIds(usersIds);
    updateCustomerModel.removedUserIds = this.getRemovedUserIds(usersIds);
    return updateCustomerModel;
  }

  getAddModel(): AddCustomerModel {




    const addCustomerModel = new AddCustomerModel();

    Automapper.map(this.entity, addCustomerModel);
    addCustomerModel.cAFPath = this.formInput.controls[this.properties.cafPath].value;
    addCustomerModel.dCCSavePath = this.formInput.controls[this.properties.dccSavePath].value;
    addCustomerModel.cAFTempPath = this.formInput.controls[this.properties.cafTempPath].value;
    addCustomerModel.backupSavePath = this.formInput.controls[this.properties.backupSavePath].value;
    const usersIds = _.map(
      this.formInput.controls[this.properties.users].value,
      this.properties.id
    );
    addCustomerModel.addedUserIds = this.getAddedUserIds(usersIds);

    return addCustomerModel;
  }

  getAddedUserIds(userIds: number[]) {
    const added = _.difference(userIds, this.originalUserIds);
    return added;
  }

  getRemovedUserIds(userIds: number[]) {
    const removed = _.difference(this.originalUserIds, userIds);
    return removed;
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
