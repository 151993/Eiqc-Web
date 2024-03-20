/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormMPositionActualService } from 'src/app/services/supplier-form-m-position-actual/supplier-form-m-position-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormMPositionActualModel } from 'src/app/model/supplier-form-m-position-actual/update-supplier-form-m-position-actual-model';
import { AddSupplierFormMPositionActualModel } from 'src/app/model/supplier-form-m-position-actual/add-supplier-form-m-position-actual-model';
import { SupplierFormMPositionActual } from 'src/app/model/supplier-form-m-position-actual/supplier-form-m-position-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-supplier-form-m-position-actual-detail',
  templateUrl: './supplier-form-m-position-actual-detail.component.html',
  styleUrls: ['./supplier-form-m-position-actual-detail.component.css']
})
export class SupplierFormMPositionActualDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    lineNo: 'lineNo',
    no: 'no',
    valueActual: 'valueActual',
    positionCalcul: 'positionCalcul',
    positionActual: 'positionActual',
    result: 'result',
    instrumentID: 'instrumentID',
    base1Actual: 'base1Actual',
    base2Actual: 'base2Actual',
    base3Actual: 'base3Actual',
    instrumentID1: 'instrumentID1',
    instrumentID2: 'instrumentID2',
    instrumentID3: 'instrumentID3',
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
    private apiService: SupplierFormMPositionActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormMPositionActual();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormMPositionActual';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierFormMPositionActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormMPositionActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormMPositionActualCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      supplierForm: new FormControl(null),
      base1Actual: new FormControl(null),
      base2Actual: new FormControl(null),
      base3Actual: new FormControl(null),
      positionCalcul: new FormControl(null),
      no: new FormControl(null),
      valueActual: new FormControl(null),
      positionActual: new FormControl(null),
      positionType: new FormControl(null),
      instrumentID: new FormControl(null),
      result: new FormControl(null),
      lineNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      instrumentID1: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      instrumentID2: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      instrumentID3: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
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
      const supplierFormMPositionActual = new SupplierFormMPositionActual(data);

      this.formDetails = this.entity;
      this.entity = supplierFormMPositionActual;
      this.formInput.patchValue({
        id: supplierFormMPositionActual.id,
        lineNo: supplierFormMPositionActual.lineNo,
        no: supplierFormMPositionActual.no,
        valueActual: supplierFormMPositionActual.valueActual,
        positionCalcul: supplierFormMPositionActual.positionCalcul,
        positionActual: supplierFormMPositionActual.positionActual,
        result: supplierFormMPositionActual.result,
        instrumentID: supplierFormMPositionActual.instrumentID,
        base1Actual: supplierFormMPositionActual.base1Actual,
        base2Actual: supplierFormMPositionActual.base2Actual,
        base3Actual: supplierFormMPositionActual.base3Actual,
        instrumentID1: supplierFormMPositionActual.instrumentID1,
        instrumentID2: supplierFormMPositionActual.instrumentID2,
        instrumentID3: supplierFormMPositionActual.instrumentID3,
        positionType: supplierFormMPositionActual.positionType,
        supplierForm: supplierFormMPositionActual.supplierForm,
        isEnabled: supplierFormMPositionActual.isEnabled,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormMPositionActualModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;


    const updateSupplierFormMPositionActualModel = new UpdateSupplierFormMPositionActualModel();

    Automapper.map(this.entity, updateSupplierFormMPositionActualModel);
    updateSupplierFormMPositionActualModel.supplierFormId = supplierForm.id;
    updateSupplierFormMPositionActualModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    updateSupplierFormMPositionActualModel.instrumentID1 = this.formInput.controls[this.properties.instrumentID1].value;
    updateSupplierFormMPositionActualModel.instrumentID2 = this.formInput.controls[this.properties.instrumentID2].value;
    updateSupplierFormMPositionActualModel.instrumentID3 = this.formInput.controls[this.properties.instrumentID3].value;
    updateSupplierFormMPositionActualModel.base1Actual = this.formInput.controls[this.properties.base1Actual].value;
    updateSupplierFormMPositionActualModel.base2Actual = this.formInput.controls[this.properties.base2Actual].value;
    updateSupplierFormMPositionActualModel.base3Actual = this.formInput.controls[this.properties.base3Actual].value;
    updateSupplierFormMPositionActualModel.instrumentID = this.formInput.controls[this.properties.instrumentID].value;
    return updateSupplierFormMPositionActualModel;
  }

  getAddModel(): AddSupplierFormMPositionActualModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;


    const addSupplierFormMPositionActualModel = new AddSupplierFormMPositionActualModel();

    Automapper.map(this.entity, addSupplierFormMPositionActualModel);


    addSupplierFormMPositionActualModel.supplierFormId = supplierForm.id;
    addSupplierFormMPositionActualModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    addSupplierFormMPositionActualModel.instrumentID1 = this.formInput.controls[this.properties.instrumentID1].value;
    addSupplierFormMPositionActualModel.instrumentID2 = this.formInput.controls[this.properties.instrumentID2].value;
    addSupplierFormMPositionActualModel.instrumentID3 = this.formInput.controls[this.properties.instrumentID3].value;
    addSupplierFormMPositionActualModel.base1Actual = this.formInput.controls[this.properties.base1Actual].value;
    addSupplierFormMPositionActualModel.base2Actual = this.formInput.controls[this.properties.base2Actual].value;
    addSupplierFormMPositionActualModel.base3Actual = this.formInput.controls[this.properties.base3Actual].value;
    addSupplierFormMPositionActualModel.instrumentID = this.formInput.controls[this.properties.instrumentID].value;

    return addSupplierFormMPositionActualModel;
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

  isNoModified() {
    return this.isModified(this.properties.no);
  }

  isNoEmpty() {
    return this.hasError(this.properties.no, ValidationErrorCodes.required);
  }

  isNoHasWhiteSpace() {
    return this.hasError(this.properties.no, ValidationErrorCodes.validateWhiteSpace);
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
