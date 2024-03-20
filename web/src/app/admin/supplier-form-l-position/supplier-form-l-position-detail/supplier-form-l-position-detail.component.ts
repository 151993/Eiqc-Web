/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormLPositionService } from 'src/app/services/supplier-form-l-position/supplier-form-l-position.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormLPositionModel } from 'src/app/model/supplier-form-l-position/update-supplier-form-l-position-model';
import { AddSupplierFormLPositionModel } from 'src/app/model/supplier-form-l-position/add-supplier-form-l-position-model';
import { SupplierFormLPosition } from 'src/app/model/supplier-form-l-position/supplier-form-l-position';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-l-position-detail',
  templateUrl: './supplier-form-l-position-detail.component.html',
  styleUrls: ['./supplier-form-l-position-detail.component.css']
})
export class SupplierFormLPositionDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    supplierForm: 'supplierForm',
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
    upperLimit3: 'upperLimit3',
    iTCode3: 'iTCode3',
    positionType: 'positionType',

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
    private apiService: SupplierFormLPositionService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormLPosition();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormLPosition';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierFormLPositionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormLPositionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormLPositionCanCreate;

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
      upperLimit3: new FormControl(null),
      lowerLimit2: new FormControl(null),
      upperLimit2: new FormControl(null),
      positionType: new FormControl(null),
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
      const supplierFormLPosition = new SupplierFormLPosition(data);

      this.formDetails = this.entity;
      this.entity = supplierFormLPosition;
      this.formInput.patchValue({
        id: supplierFormLPosition.id,
        supplierForm: supplierFormLPosition.supplierForm,
        lineNo: supplierFormLPosition.lineNo,
        iTCode: supplierFormLPosition.itCode,
        uOM: supplierFormLPosition.uom,
        spec: supplierFormLPosition.spec,
        upperLimit: supplierFormLPosition.upperLimit,
        lowerLimit: supplierFormLPosition.lowerLimit,
        accuracy: supplierFormLPosition.accuracy,
        sampleSize: supplierFormLPosition.sampleSize,
        upperLimit1: supplierFormLPosition.upperLimit1,
        lowerLimit1: supplierFormLPosition.lowerLimit1,
        iTCode1: supplierFormLPosition.iTCode1,
        upperLimit2: supplierFormLPosition.upperLimit2,
        lowerLimit2: supplierFormLPosition.lowerLimit2,
        upperLimit3: supplierFormLPosition.upperLimit3,
        iTCode3: supplierFormLPosition.iTCode3,
        positionType: supplierFormLPosition.positionType,

        isEnabled: supplierFormLPosition.isEnabled,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormLPositionModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const updateSupplierFormLPositionModel = new UpdateSupplierFormLPositionModel();

    Automapper.map(this.entity, updateSupplierFormLPositionModel);
    updateSupplierFormLPositionModel.supplierFormId = supplierForm.id;
    updateSupplierFormLPositionModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    updateSupplierFormLPositionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
    updateSupplierFormLPositionModel.upperLimit1 = this.formInput.controls[this.properties.upperLimit1].value;
    updateSupplierFormLPositionModel.upperLimit2 = this.formInput.controls[this.properties.upperLimit2].value;
    updateSupplierFormLPositionModel.upperLimit3 = this.formInput.controls[this.properties.upperLimit3].value;
    updateSupplierFormLPositionModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    updateSupplierFormLPositionModel.lowerLimit2 = this.formInput.controls[this.properties.lowerLimit2].value;
    updateSupplierFormLPositionModel.uOM = this.formInput.controls[this.properties.uOM].value;


    return updateSupplierFormLPositionModel;
  }

  getAddModel(): AddSupplierFormLPositionModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const addSupplierFormLPositionModel = new AddSupplierFormLPositionModel();

    Automapper.map(this.entity, addSupplierFormLPositionModel);

    addSupplierFormLPositionModel.supplierFormId = supplierForm.id;
    addSupplierFormLPositionModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    addSupplierFormLPositionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
    addSupplierFormLPositionModel.upperLimit1 = this.formInput.controls[this.properties.upperLimit1].value;
    addSupplierFormLPositionModel.upperLimit2 = this.formInput.controls[this.properties.upperLimit2].value;
    addSupplierFormLPositionModel.upperLimit3 = this.formInput.controls[this.properties.upperLimit3].value;
    addSupplierFormLPositionModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    addSupplierFormLPositionModel.lowerLimit2 = this.formInput.controls[this.properties.lowerLimit2].value;
    addSupplierFormLPositionModel.uOM = this.formInput.controls[this.properties.uOM].value;



    return addSupplierFormLPositionModel;
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
    // return !this.enableSaveButton
    //   || !this.formInput.valid
    //   || !this.formInput.dirty;
  }

}
