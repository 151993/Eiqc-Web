import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { GoodsReceiveUser } from 'src/app/model/goods-receive-user/goods-receive-user';
import { GoodsReceiveUserService } from 'src/app/services/goods-receive-user/goods-receive-user.service';
import { UpdateGoodsReceiveUserModel } from 'src/app/model/goods-receive-user/update-goods-receive-user-model';
import { AddGoodsReceiveUserModel } from 'src/app/model/goods-receive-user/add-goods-receive-user-model';
import { Constants } from 'src/app/shared/constant/global';

@Component({
  selector: 'app-goods-receive-user-detail',
  templateUrl: './goods-receive-user-detail.component.html',
  styleUrls: ['./goods-receive-user-detail.component.css']
})
export class GoodsReceiveUserDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  goodsReceiveUser: GoodsReceiveUser;

  originalFormInput: string;
  autoCompleteGoodsReceiveUserValue: string;

  properties = {
    id: 'id',
    wareHouse: 'wareHouse',
    sAPUser: 'sAPUser',
    userName: 'userName',
    supervisorMail: 'supervisorMail',
    leaderMail: 'leaderMail'
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: GoodsReceiveUserService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService
  ) {
    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService,
      apiService
    );
    this.initForm();
    this.goodsReceiveUser = new GoodsReceiveUser();
    this.entity = this.goodsReceiveUser;
    this.cancelRoute = '/Admin/GoodsReceiveUser';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminGoodsReceiveUserCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminGoodsReceiveUserCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminGoodsReceiveUserCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      wareHouse: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      sAPUser: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
      ]
      ),
      userName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      supervisorMail: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      leaderMail: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      isEnabled: new FormControl(true, Validators.required)
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
        //     this.goodsReceiveUser.userName,
        //     this.properties.name
        //   )
        // );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.goodsReceiveUser = new GoodsReceiveUser(data);

      this.formDetails = this.entity;

      this.entity = this.goodsReceiveUser;

      this.formInput.patchValue({
        id: this.goodsReceiveUser.id,
        wareHouse: this.goodsReceiveUser.wareHouse,
        sAPUser: this.goodsReceiveUser.sAPUser,
        userName: this.goodsReceiveUser.sAPUser,
        supervisorMail: this.goodsReceiveUser.sAPUser,
        leaderMail: this.goodsReceiveUser.sAPUser,
      });

      //   this.formInput.controls[this.properties.name].setAsyncValidators(
      //     uniqueAsyncValidator(
      //       this.apiService,
      //       this.goodsReceiveUser.name,
      //       this.properties.name
      //     )
      //   );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateGoodsReceiveUserModel {
    const updateGoodsReceiveUserModel = new UpdateGoodsReceiveUserModel();
    Automapper.map(this.goodsReceiveUser, updateGoodsReceiveUserModel);
    return updateGoodsReceiveUserModel;
  }

  getAddModel(): AddGoodsReceiveUserModel {
    const addGoodsReceiveUserModel = new AddGoodsReceiveUserModel();
    Automapper.map(this.goodsReceiveUser, addGoodsReceiveUserModel);
    return addGoodsReceiveUserModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  isAsycValidationPending() {
    // return (
    //   this.formInput.controls[this.properties.name].status ===
    //   ControlStates.PENDING
    // );
  }

  //  #GoodsReceiveUser name validations

  isNameEmpty() {
    // return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  // isNameHasWhiteSpace() {
  //   return this.hasError(
  //     this.properties.name,
  //     ValidationErrorCodes.validateWhiteSpace
  //   );
  // }

  // isNameExists() {
  //   return this.hasError(
  //     this.properties.name,
  //     ValidationErrorCodes.alreadyExists
  //   );
  // }

  // isNameModified() {
  //   return this.isModified(this.properties.name);
  // }

  // #endGoodsReceiveUser

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }
}
