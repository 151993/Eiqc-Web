/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { ReceiveGoodsInfoManualService } from 'src/app/services/receive-goods-info-manual/receive-goods-info-manual.service';
import { environment } from 'src/environments/environment';
import { UpdateReceiveGoodsInfoManualModel } from 'src/app/model/receive-goods-info-manual/update-receive-goods-info-manual-model';
import { AddReceiveGoodsInfoManualModel } from 'src/app/model/receive-goods-info-manual/add-receive-goods-info-manual-model';
import { ReceiveGoodsInfoManual } from 'src/app/model/receive-goods-info-manual/receive-goods-info-manual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';


@Component({
  selector: 'app-receive-goods-info-manual-detail',
  templateUrl: './receive-goods-info-manual-detail.component.html',
  styleUrls: ['./receive-goods-info-manual-detail.component.css']
})
export class ReceiveGoodsInfoManualDetailComponent extends BaseDetailComponent
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
    private apiService: ReceiveGoodsInfoManualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new ReceiveGoodsInfoManual();
    this.initForm();
    this.cancelRoute = '/Admin/ReceiveGoodsInfoManual';

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
      quantity: new FormControl(null),
      receivedDateTime: new FormControl(null),
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
      const receiveGoodsInfoManual = new ReceiveGoodsInfoManual(data);

      this.formDetails = this.entity;
      this.entity = receiveGoodsInfoManual;
      this.formInput.patchValue({
        id: receiveGoodsInfoManual.id,
        plant: receiveGoodsInfoManual.plant,
        matlGroup: receiveGoodsInfoManual.matlGroup,
        material: receiveGoodsInfoManual.material,
        quantity: receiveGoodsInfoManual.quantity,
        receivedDateTime: receiveGoodsInfoManual.receivedDateTime,
        mocDoc: receiveGoodsInfoManual.mocDoc,
        storLoc: receiveGoodsInfoManual.storLoc,
        mvmtType: receiveGoodsInfoManual.mvmtType,
        batch: receiveGoodsInfoManual.batch,
        vendor: receiveGoodsInfoManual.vendor,
        user: receiveGoodsInfoManual.user,
        specStock: receiveGoodsInfoManual.specStock,
        reference: receiveGoodsInfoManual.reference,

        isEnabled: receiveGoodsInfoManual.isEnabled,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateReceiveGoodsInfoManualModel {
    const quantity = this.formInput.controls[this.properties.quantity].value;
    const receivedDate = this.formInput.controls[this.properties.receivedDateTime].value;
    const updateReceiveGoodsInfoManualModel = new UpdateReceiveGoodsInfoManualModel();
    Automapper.map(this.entity, updateReceiveGoodsInfoManualModel);
    updateReceiveGoodsInfoManualModel.quantity = quantity;
    updateReceiveGoodsInfoManualModel.receivedDateTime = receivedDate;

    return updateReceiveGoodsInfoManualModel;
  }

  getAddModel(): AddReceiveGoodsInfoManualModel {
    const quantity = this.formInput.controls[this.properties.quantity].value;
    const receivedDate = this.formInput.controls[this.properties.receivedDateTime].value;
    const addReceiveGoodsInfoManualModel = new AddReceiveGoodsInfoManualModel();
    Automapper.map(this.entity, addReceiveGoodsInfoManualModel);
    addReceiveGoodsInfoManualModel.quantity = quantity;
    addReceiveGoodsInfoManualModel.receivedDateTime = receivedDate;


    return addReceiveGoodsInfoManualModel;
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
    // return;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
