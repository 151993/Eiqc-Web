/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { ReceiveGoodsInfoService } from 'src/app/services/receive-goods-info/receive-goods-info.service';
import { environment } from 'src/environments/environment';
import { UpdateReceiveGoodsInfoModel } from 'src/app/model/receive-goods-info/update-receive-goods-info-model';
import { AddReceiveGoodsInfoModel } from 'src/app/model/receive-goods-info/add-receive-goods-info-model';
import { ReceiveGoodsInfo } from 'src/app/model/receive-goods-info/receive-goods-info';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';


@Component({
  selector: 'app-receive-goods-info-detail',
  templateUrl: './receive-goods-info-detail.component.html',
  styleUrls: ['./receive-goods-info-detail.component.css']
})
export class ReceiveGoodsInfoDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    plant: 'plant',
    matlGroup: 'matlGroup',
    material: 'material',
    quantity: 'quantity',
    receivedDateTime: 'receivedDateTime',
    mocDoc: 'mocDoc',
    storLoc: 'storLoc',
    mvmtType: 'mvmtType',
    batch: 'batch',
    vendor: 'vendor',
    user: 'user',
    specStock: 'specStock',
    reference: 'reference',
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ReceiveGoodsInfoService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new ReceiveGoodsInfo();
    this.initForm();
    this.cancelRoute = '/Admin/ReceiveGoodsInfo';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      plant: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      matlGroup: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      material: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      mocDoc: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      storLoc: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      mvmtType: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      quantity: new FormControl(null),
      receivedDateTime: new FormControl(null),
      batch: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      vendor: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      user: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      specStock: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      reference: new FormControl(Constants.Empty, [
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
      const receiveGoodsInfo = new ReceiveGoodsInfo(data);

      this.formDetails = this.entity;
      this.entity = receiveGoodsInfo;
      this.formInput.patchValue({
        id: receiveGoodsInfo.id,
        plant: receiveGoodsInfo.plant,
        matlGroup: receiveGoodsInfo.matlGroup,
        material: receiveGoodsInfo.material,
        quantity: receiveGoodsInfo.quantity,
        receivedDateTime: receiveGoodsInfo.receivedDateTime,
        mocDoc: receiveGoodsInfo.mocDoc,
        storLoc: receiveGoodsInfo.storLoc,
        mvmtType: receiveGoodsInfo.mvmtType,
        batch: receiveGoodsInfo.batch,
        vendor: receiveGoodsInfo.vendor,
        user: receiveGoodsInfo.user,
        specStock: receiveGoodsInfo.specStock,
        reference: receiveGoodsInfo.reference,
        isEnabled: receiveGoodsInfo.isEnabled,
      });

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateReceiveGoodsInfoModel {


    const quantity = this.formInput.controls[this.properties.quantity].value;
    const receivedDate = this.formInput.controls[this.properties.receivedDateTime].value;


    const updateReceiveGoodsInfoModel = new UpdateReceiveGoodsInfoModel();

    Automapper.map(this.entity, updateReceiveGoodsInfoModel);

    updateReceiveGoodsInfoModel.quantity = quantity;
    updateReceiveGoodsInfoModel.receivedDateTime = receivedDate;
    return updateReceiveGoodsInfoModel;
  }

  getAddModel(): AddReceiveGoodsInfoModel {

    const quantity = this.formInput.controls[this.properties.quantity].value;
    const receivedDate = this.formInput.controls[this.properties.receivedDateTime].value;

    const addReceiveGoodsInfoModel = new AddReceiveGoodsInfoModel();

    Automapper.map(this.entity, addReceiveGoodsInfoModel);

    addReceiveGoodsInfoModel.quantity = quantity;
    addReceiveGoodsInfoModel.receivedDateTime = receivedDate;

    return addReceiveGoodsInfoModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isReceivedDateTimeModified() {
    return this.isModified(this.properties.receivedDateTime);
  }

  isReceivedDateTimeEmpty() {
    return this.hasError(this.properties.receivedDateTime, ValidationErrorCodes.required);
  }

  isReceivedDateTimeHasWhiteSpace() {
    return this.hasError(this.properties.receivedDateTime, ValidationErrorCodes.validateWhiteSpace);
  }



  isAsyncValidationPending() {
    //  return;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
