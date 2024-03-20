/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormLPositionActualService } from 'src/app/services/supplier-form-l-position-actual/supplier-form-l-position-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormLPositionActualModel } from 'src/app/model/supplier-form-l-position-actual/update-supplier-form-l-position-actual-model';
import { AddSupplierFormLPositionActualModel } from 'src/app/model/supplier-form-l-position-actual/add-supplier-form-l-position-actual-model';
import { SupplierFormLPositionActual } from 'src/app/model/supplier-form-l-position-actual/supplier-form-l-position-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-l-position-actual-detail',
  templateUrl: './supplier-form-l-position-actual-detail.component.html',
  styleUrls: ['./supplier-form-l-position-actual-detail.component.css']
})
export class SupplierFormLPositionActualDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    lineNo: 'lineNo',
    no: 'no',
    valueActual: 'valueActual',
    positionCalcul: 'positionCalcul',
    positionActual: 'positionActual',
    result: 'result',
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
    private apiService: SupplierFormLPositionActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormLPositionActual();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormLPositionActual';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierFormLPositionActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormLPositionActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormLPositionActualCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      supplierForm: new FormControl(null),
      no: new FormControl(null),

      valueActual: new FormControl(null),
      positionCalcul: new FormControl(null),
      positionActual: new FormControl(null),
      base1Actual: new FormControl(null),
      base2Actual: new FormControl(null),
      base3Actual: new FormControl(null),
      positionType: new FormControl(null),


      lineNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      result: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      instrumentID: new FormControl(Constants.Empty, [
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
      const supplierFormLPositionActual = new SupplierFormLPositionActual(data);

      this.formDetails = this.entity;
      this.entity = supplierFormLPositionActual;
      this.formInput.patchValue({
        id: supplierFormLPositionActual.id,
        lineNo: supplierFormLPositionActual.lineNo,
        no: supplierFormLPositionActual.no,
        valueActual: supplierFormLPositionActual.valueActual,
        positionCalcul: supplierFormLPositionActual.positionCalcul,
        positionActual: supplierFormLPositionActual.positionActual,
        result: supplierFormLPositionActual.result,
        base1Actual: supplierFormLPositionActual.base1Actual,
        base2Actual: supplierFormLPositionActual.base2Actual,
        base3Actual: supplierFormLPositionActual.base3Actual,
        instrumentID1: supplierFormLPositionActual.instrumentID1,
        instrumentID2: supplierFormLPositionActual.instrumentID2,
        instrumentID3: supplierFormLPositionActual.instrumentID3,
        positionType: supplierFormLPositionActual.positionType,
        isEnabled: supplierFormLPositionActual.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormLPositionActualModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const updateSupplierFormLPositionActualModel = new UpdateSupplierFormLPositionActualModel();

    Automapper.map(this.entity, updateSupplierFormLPositionActualModel);
    updateSupplierFormLPositionActualModel.supplierFormId = supplierForm.id;
    updateSupplierFormLPositionActualModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    updateSupplierFormLPositionActualModel.instrumentID1 = this.formInput.controls[this.properties.instrumentID1].value;
    updateSupplierFormLPositionActualModel.instrumentID2 = this.formInput.controls[this.properties.instrumentID2].value;
    updateSupplierFormLPositionActualModel.instrumentID3 = this.formInput.controls[this.properties.instrumentID3].value;
    updateSupplierFormLPositionActualModel.base1Actual = this.formInput.controls[this.properties.base1Actual].value;
    updateSupplierFormLPositionActualModel.base2Actual = this.formInput.controls[this.properties.base2Actual].value;

    updateSupplierFormLPositionActualModel.base3Actual = this.formInput.controls[this.properties.base3Actual].value;
    return updateSupplierFormLPositionActualModel;
  }

  getAddModel(): AddSupplierFormLPositionActualModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const addSupplierFormLPositionActualModel = new AddSupplierFormLPositionActualModel();

    Automapper.map(this.entity, addSupplierFormLPositionActualModel);

    addSupplierFormLPositionActualModel.supplierFormId = supplierForm.id;
    addSupplierFormLPositionActualModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    addSupplierFormLPositionActualModel.instrumentID1 = this.formInput.controls[this.properties.instrumentID1].value;
    addSupplierFormLPositionActualModel.instrumentID2 = this.formInput.controls[this.properties.instrumentID2].value;
    addSupplierFormLPositionActualModel.instrumentID3 = this.formInput.controls[this.properties.instrumentID3].value;
    addSupplierFormLPositionActualModel.base1Actual = this.formInput.controls[this.properties.base1Actual].value;
    addSupplierFormLPositionActualModel.base2Actual = this.formInput.controls[this.properties.base2Actual].value;

    addSupplierFormLPositionActualModel.base3Actual = this.formInput.controls[this.properties.base3Actual].value;


    return addSupplierFormLPositionActualModel;
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
