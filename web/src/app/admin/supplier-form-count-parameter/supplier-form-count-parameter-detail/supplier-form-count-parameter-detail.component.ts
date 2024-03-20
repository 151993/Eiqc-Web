/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormCountParameterService } from 'src/app/services/supplier-form-count-parameter/supplier-form-count-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormCountParameterModel } from 'src/app/model/supplier-form-count-parameter/update-supplier-form-count-parameter-model';
import { AddSupplierFormCountParameterModel } from 'src/app/model/supplier-form-count-parameter/add-supplier-form-count-parameter-model';
import { SupplierFormCountParameter } from 'src/app/model/supplier-form-count-parameter/supplier-form-count-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-count-parameter-detail',
  templateUrl: './supplier-form-count-parameter-detail.component.html',
  styleUrls: ['./supplier-form-count-parameter-detail.component.css']
})
export class SupplierFormCountParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    parameterName: 'parameterName',
    failedQTYExpected: 'failedQTYExpected',
    failedQTYActual: 'failedQTYActual',
    iToolsID: 'iToolsID',
    remark: 'remark',
    inspectionDetails: 'inspectionDetails',
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
    private apiService: SupplierFormCountParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormCountParameter();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormCountParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      supplierForm: new FormControl(null),
      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      failedQTYExpected:  new FormControl(null),
      failedQTYActual:    new FormControl(null),
      iToolsID:           new FormControl(null),
      remark: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      inspectionDetails: new FormControl(Constants.Empty, [
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
      const supplierFormCountParameter = new SupplierFormCountParameter(data);

      this.formDetails = this.entity;
      this.entity = supplierFormCountParameter;
      this.formInput.patchValue({
        id: supplierFormCountParameter.id,
        parameterName: supplierFormCountParameter.parameterName,
        failedQTYExpected: supplierFormCountParameter.failedQTYExpected,
        failedQTYActual: supplierFormCountParameter.failedQTYActual,
        iToolsID: supplierFormCountParameter.iToolsID,
        remark: supplierFormCountParameter.remark,
        inspectionDetails: supplierFormCountParameter.inspectionDetails,
        supplierForm: supplierFormCountParameter.supplierForm,
        isEnabled: supplierFormCountParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormCountParameterModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const failedQTYActual = this.formInput.controls[this.properties.failedQTYActual].value;
    const failedQTYExpected = this.formInput.controls[this.properties.failedQTYExpected].value;
    const iToolsID = this.formInput.controls[this.properties.iToolsID].value;

    const updateSupplierFormCountParameterModel = new UpdateSupplierFormCountParameterModel();

    Automapper.map(this.entity, updateSupplierFormCountParameterModel);
    updateSupplierFormCountParameterModel.supplierFormId = supplierForm.id;
    updateSupplierFormCountParameterModel.failedQTYActual = failedQTYActual;
    updateSupplierFormCountParameterModel.failedQTYExpected = failedQTYExpected;
    updateSupplierFormCountParameterModel.iToolsID = iToolsID;
    return updateSupplierFormCountParameterModel;
  }

  getAddModel(): AddSupplierFormCountParameterModel {

     const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
     const failedQTYActual = this.formInput.controls[this.properties.failedQTYActual].value;
     const failedQTYExpected = this.formInput.controls[this.properties.failedQTYExpected].value;
     const iToolsID = this.formInput.controls[this.properties.iToolsID].value;


    const addSupplierFormCountParameterModel = new AddSupplierFormCountParameterModel();

    Automapper.map(this.entity, addSupplierFormCountParameterModel);

    addSupplierFormCountParameterModel.supplierFormId = supplierForm.id;
    addSupplierFormCountParameterModel.failedQTYActual = failedQTYActual;
    addSupplierFormCountParameterModel.failedQTYExpected = failedQTYExpected;
    addSupplierFormCountParameterModel.iToolsID = iToolsID;


    return addSupplierFormCountParameterModel;
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

  isParameterNameModified() {
    return this.isModified(this.properties.parameterName);
  }

  isParameterNameEmpty() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.required);
  }

  isParameterNameHasWhiteSpace() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.validateWhiteSpace);
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
