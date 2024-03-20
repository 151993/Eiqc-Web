/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormFunParaService } from 'src/app/services/supplier-form-fun-para/supplier-form-fun-para.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormFunParaModel } from 'src/app/model/supplier-form-fun-para/update-supplier-form-fun-para-model';
import { AddSupplierFormFunParaModel } from 'src/app/model/supplier-form-fun-para/add-supplier-form-fun-para-model';
import { SupplierFormFunPara } from 'src/app/model/supplier-form-fun-para/supplier-form-fun-para';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-fun-para-detail',
  templateUrl: './supplier-form-fun-para-detail.component.html',
  styleUrls: ['./supplier-form-fun-para-detail.component.css']
})
export class SupplierFormFunParaDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    parameterName: 'parameterName',
    instrumentID: 'instrumentID',
    iTCode: 'iTCode',
    uOM: 'uOM',
    normalValue: 'normalValue',
    upperLimit: 'upperLimit',
    lowerLimit: 'lowerLimit',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
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
    private apiService: SupplierFormFunParaService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormFunPara();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormFunPara';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminSupplierFormBowTwistActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormBowTwistActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormBowTwistActualCanCreate;
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
      instrumentID: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      normalValue: new FormControl(null),
      lowerLimit: new FormControl(null),
      upperLimit: new FormControl(null),
      accuracy: new FormControl(null),
      iTCode: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      uOM: new FormControl(Constants.Empty, [
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      sampleSize: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
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
      const supplierFormFunPara = new SupplierFormFunPara(data);

      this.formDetails = this.entity;
      this.entity = supplierFormFunPara;
      this.formInput.patchValue({
        id: supplierFormFunPara.id,
        parameterName: supplierFormFunPara.parameterName,
        instrumentID: supplierFormFunPara.instrumentID,
        iTCode: supplierFormFunPara.itCode,
        uOM: supplierFormFunPara.uom,
        normalValue: supplierFormFunPara.normalValue,
        upperLimit: supplierFormFunPara.upperLimit,
        lowerLimit: supplierFormFunPara.lowerLimit,
        accuracy: supplierFormFunPara.accuracy,
        sampleSize: supplierFormFunPara.sampleSize,
        supplierForm: supplierFormFunPara.supplierForm,
        isEnabled: supplierFormFunPara.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormFunParaModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const parameterName = this.formInput.controls[this.properties.parameterName].value;
    const upperLimit = this.formInput.controls[this.properties.upperLimit].value;
    const lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    const normalValue = this.formInput.controls[this.properties.normalValue].value;
    const updateSupplierFormFunParaModel = new UpdateSupplierFormFunParaModel();

    Automapper.map(this.entity, updateSupplierFormFunParaModel);
    updateSupplierFormFunParaModel.supplierFormId = supplierForm.id;
    updateSupplierFormFunParaModel.parameterName = parameterName;
    updateSupplierFormFunParaModel.upperLimit = upperLimit;
    updateSupplierFormFunParaModel.lowerLimit = lowerLimit;
    updateSupplierFormFunParaModel.normalValue = normalValue;
    return updateSupplierFormFunParaModel;
  }

  getAddModel(): AddSupplierFormFunParaModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const parameterName = this.formInput.controls[this.properties.parameterName].value;
    const upperLimit = this.formInput.controls[this.properties.upperLimit].value;
    const lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    const normalValue = this.formInput.controls[this.properties.normalValue].value;
    const addSupplierFormFunParaModel = new AddSupplierFormFunParaModel();

    Automapper.map(this.entity, addSupplierFormFunParaModel);

    addSupplierFormFunParaModel.supplierFormId = supplierForm.id;
    addSupplierFormFunParaModel.parameterName = parameterName;
    addSupplierFormFunParaModel.upperLimit = upperLimit;
    addSupplierFormFunParaModel.lowerLimit = lowerLimit;
    addSupplierFormFunParaModel.normalValue = normalValue;


    return addSupplierFormFunParaModel;
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
