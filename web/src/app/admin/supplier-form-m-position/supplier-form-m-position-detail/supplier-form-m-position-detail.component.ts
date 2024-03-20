/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormMPositionService } from 'src/app/services/supplier-form-m-position/supplier-form-m-position.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormMPositionModel } from 'src/app/model/supplier-form-m-position/update-supplier-form-m-position-model';
import { AddSupplierFormMPositionModel } from 'src/app/model/supplier-form-m-position/add-supplier-form-m-position-model';
import { SupplierFormMPosition } from 'src/app/model/supplier-form-m-position/supplier-form-m-position';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-supplier-form-m-position-detail',
  templateUrl: './supplier-form-m-position-detail.component.html',
  styleUrls: ['./supplier-form-m-position-detail.component.css']
})
export class SupplierFormMPositionDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
  id: 'id',
  lineNo: 'lineNo',
  iTCode: 'iTCode',
  uOM: 'uOM',
  spec: 'spec',
  upperLimit: 'upperLimit',
  lowerLimit: 'lowerLimit',
  accuracy: 'accuracy',
  sampleSize: 'sampleSize',
  upperLimit1: 'upperLimit1',
  lowerLimit1: 'lowerLimit1',
  iTCode1: 'iTCode1',
  upperLimit2: 'upperLimit2',
  lowerLimit2: 'lowerLimit2',
  iTCode2: 'iTCode2',
  upperLimit3: 'upperLimit3',
  lowerLimit3: 'lowerLimit3',
  iTCode3: 'iTCode3',
  positionType: 'positionType',
  supplierForm: 'supplierForm'

  };
  data: SupplierForm[] = [];
  public supplierFormAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'poNo',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'poNo',
    format: '${value.poNo}',
  };
constructor(
  private formBuilder: FormBuilder,
  private apiService: SupplierFormMPositionService,
  authService: AuthService,
  activatedRoute: ActivatedRoute,
  notificationService: NotificationService,
  modalService: NgbModal,
  router: Router
) {
  super(modalService, activatedRoute, router, notificationService, authService, apiService);
  this.entity = new SupplierFormMPosition();
  this.initForm();
  this.cancelRoute = '/Admin/SupplierFormMPosition';

  this.getUpdateModelFn = this.getUpdateModel;
  this.getAddModelFn = this.getAddModel;

  this.canAccessPermissionType = PermissionType.AdminSupplierFormMPositionCanAccess;
  this.canUpdatePermissionType = PermissionType.AdminSupplierFormMPositionCanUpdate;
  this.canCreatPermissionType = PermissionType.AdminSupplierFormMPositionCanCreate;
}

initForm() {
  this.formInput = this.formBuilder.group({
    id: 0,

    supplierForm: new FormControl(null),
    spec: new FormControl(null),
    upperLimit: new FormControl(null),
    lowerLimit: new FormControl(null),
    accuracy: new FormControl(null),
    upperLimit1: new FormControl(null),
    lowerLimit1: new FormControl(null),
    upperLimit2: new FormControl(null),
    lowerLimit3: new FormControl(null),
    positionType: new FormControl(null),
    upperLimit3: new FormControl(null),
    lowerLimit2: new FormControl(null),


    lineNo: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(20),
      validateWhiteSpace
    ]),
    iTCode: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(20),
      validateWhiteSpace
    ]),
    uOM: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(10),
      validateWhiteSpace
    ]),
    sampleSize: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
      validateWhiteSpace
    ]),
    iTCode1: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
      validateWhiteSpace
    ]),
    iTCode2: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
      validateWhiteSpace
    ]),
    iTCode3: new FormControl(Constants.Empty, [
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
    const supplierFormMPosition = new SupplierFormMPosition(data);

    this.formDetails = this.entity;
    this.entity = supplierFormMPosition;
    this.formInput.patchValue({
      id: supplierFormMPosition.id,
      lineNo: supplierFormMPosition.lineNo,
      iTCode: supplierFormMPosition.itCode,
      uOM: supplierFormMPosition.uom  ,
      spec: supplierFormMPosition.spec,
      upperLimit: supplierFormMPosition.upperLimit,
      lowerLimit: supplierFormMPosition.lowerLimit,
      accuracy: supplierFormMPosition.accuracy,
      sampleSize: supplierFormMPosition.sampleSize,
      upperLimit1: supplierFormMPosition.upperLimit1,
      lowerLimit1: supplierFormMPosition.lowerLimit1,
      iTCode1: supplierFormMPosition.itCode1,
      upperLimit2: supplierFormMPosition.upperLimit2,
      lowerLimit2: supplierFormMPosition.lowerLimit2,
      iTCode2: supplierFormMPosition.itCode2,
      upperLimit3: supplierFormMPosition.upperLimit3,
      lowerLimit3: supplierFormMPosition.lowerLimit3,
      iTCode3: supplierFormMPosition.itCode3,
      positionType: supplierFormMPosition.positionType,
      supplierForm: supplierFormMPosition.supplierForm,
      isEnabled: supplierFormMPosition.isEnabled,
    });


    this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdateSupplierFormMPositionModel {


  const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;


  const updateSupplierFormMPositionModel = new UpdateSupplierFormMPositionModel();

  Automapper.map(this.entity, updateSupplierFormMPositionModel);
  updateSupplierFormMPositionModel.supplierFormId = supplierForm.id;
  updateSupplierFormMPositionModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
  updateSupplierFormMPositionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
  updateSupplierFormMPositionModel.uOM = this.formInput.controls[this.properties.uOM].value;
  updateSupplierFormMPositionModel.upperLimit = this.formInput.controls[this.properties.upperLimit].value;
  updateSupplierFormMPositionModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
  updateSupplierFormMPositionModel.upperLimit1 = this.formInput.controls[this.properties.upperLimit1].value;
  updateSupplierFormMPositionModel.upperLimit2 = this.formInput.controls[this.properties.upperLimit2].value;
  updateSupplierFormMPositionModel.upperLimit3 = this.formInput.controls[this.properties.upperLimit3].value;

  return updateSupplierFormMPositionModel;
}

getAddModel(): AddSupplierFormMPositionModel {


  const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;


  const addSupplierFormMPositionModel = new AddSupplierFormMPositionModel();

  Automapper.map(this.entity, addSupplierFormMPositionModel);

  addSupplierFormMPositionModel.supplierFormId = supplierForm.id;
  addSupplierFormMPositionModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
  addSupplierFormMPositionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
  addSupplierFormMPositionModel.uOM = this.formInput.controls[this.properties.uOM].value;
  addSupplierFormMPositionModel.upperLimit = this.formInput.controls[this.properties.upperLimit].value;
  addSupplierFormMPositionModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
  addSupplierFormMPositionModel.upperLimit1 = this.formInput.controls[this.properties.upperLimit1].value;
  addSupplierFormMPositionModel.upperLimit2 = this.formInput.controls[this.properties.upperLimit2].value;
  addSupplierFormMPositionModel.upperLimit3 = this.formInput.controls[this.properties.upperLimit3].value;




  return addSupplierFormMPositionModel;
}




isModified(controlName: string) {
  return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
}

// isSupplierFormIdModified() {
//   return this.isModified(this.properties.supplierFormId);
// }

// isSupplierFormIdEmpty() {
//   return this.hasError(this.properties.supplierFormId, ValidationErrorCodes.required);
// }

// isSupplierFormIdHasWhiteSpace() {
//   return this.hasError(this.properties.supplierFormId, ValidationErrorCodes.validateWhiteSpace);
// }

isLineNoModified() {
  return this.isModified(this.properties.lineNo);
}

isLineNoEmpty() {
  return this.hasError(this.properties.lineNo, ValidationErrorCodes.required);
}

isLineNoHasWhiteSpace() {
  return this.hasError(this.properties.lineNo, ValidationErrorCodes.validateWhiteSpace);
}

isITCodeModified() {
  return this.isModified(this.properties.iTCode);
}

isITCodeEmpty() {
  return this.hasError(this.properties.iTCode, ValidationErrorCodes.required);
}

isITCodeHasWhiteSpace() {
  return this.hasError(this.properties.iTCode, ValidationErrorCodes.validateWhiteSpace);
}

isUOMModified() {
  return this.isModified(this.properties.uOM);
}

isUOMEmpty() {
  return this.hasError(this.properties.uOM, ValidationErrorCodes.required);
}

isUOMHasWhiteSpace() {
  return this.hasError(this.properties.uOM, ValidationErrorCodes.validateWhiteSpace);
}

isUpperLimitModified() {
  return this.isModified(this.properties.upperLimit);
}

isUpperLimitEmpty() {
  return this.hasError(this.properties.upperLimit, ValidationErrorCodes.required);
}

isUpperLimitHasWhiteSpace() {
  return this.hasError(this.properties.upperLimit, ValidationErrorCodes.validateWhiteSpace);
}

isLowerLimitModified() {
  return this.isModified(this.properties.lowerLimit);
}

isLowerLimitEmpty() {
  return this.hasError(this.properties.lowerLimit, ValidationErrorCodes.required);
}

isLowerLimitHasWhiteSpace() {
  return this.hasError(this.properties.lowerLimit, ValidationErrorCodes.validateWhiteSpace);
}


isAsyncValidationPending() {
  return

  ;
  // TO DO: Remove extra or(||)
}

isSaveDisabled() {
  return !this.enableSaveButton
    || !this.formInput.valid
    || !this.formInput.dirty;
}

}
