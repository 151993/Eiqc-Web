/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormSAPParameterService } from 'src/app/services/supplier-form-sap-parameter/supplier-form-sap-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormSAPParameterModel } from 'src/app/model/supplier-form-sap-parameter/update-supplier-form-sap-parameter-model';
import { AddSupplierFormSAPParameterModel } from 'src/app/model/supplier-form-sap-parameter/add-supplier-form-sap-parameter-model';
import { SupplierFormSAPParameter } from 'src/app/model/supplier-form-sap-parameter/supplier-form-sap-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-sap-parameter-detail',
  templateUrl: './supplier-form-sap-parameter-detail.component.html',
  styleUrls: ['./supplier-form-sap-parameter-detail.component.css']
})
export class SupplierFormSAPParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    parameterName: 'parameterName',
    sAPParameterExpected: 'sAPParameterExpected',
    sAPParameterActual: 'sAPParameterActual',
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
    private apiService: SupplierFormSAPParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormSAPParameter();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormSAPParameter';

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
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      sAPParameterExpected: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      sAPParameterActual: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
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
      const supplierFormSAPParameter = new SupplierFormSAPParameter(data);

      this.formDetails = this.entity;
      this.entity = supplierFormSAPParameter;
      this.formInput.patchValue({
        id: supplierFormSAPParameter.id,
        parameterName: supplierFormSAPParameter.parameterName,
        sAPParameterExpected: supplierFormSAPParameter.sapParameterExpected,
        sAPParameterActual: supplierFormSAPParameter.sapParameterActual,
        supplierForm: supplierFormSAPParameter.supplierForm,
        isEnabled: supplierFormSAPParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormSAPParameterModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const updateSupplierFormSAPParameterModel = new UpdateSupplierFormSAPParameterModel();

    Automapper.map(this.entity, updateSupplierFormSAPParameterModel);
    updateSupplierFormSAPParameterModel.supplierFormId = supplierForm.id;
    updateSupplierFormSAPParameterModel.sAPParameterExpected = this.formInput.controls[this.properties.sAPParameterExpected].value;
    updateSupplierFormSAPParameterModel.sAPParameterActual = this.formInput.controls[this.properties.sAPParameterActual].value;

    return updateSupplierFormSAPParameterModel;
  }

  getAddModel(): AddSupplierFormSAPParameterModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const addSupplierFormSAPParameterModel = new AddSupplierFormSAPParameterModel();

    Automapper.map(this.entity, addSupplierFormSAPParameterModel);

    addSupplierFormSAPParameterModel.supplierFormId = supplierForm.id;
    addSupplierFormSAPParameterModel.sAPParameterExpected = this.formInput.controls[this.properties.sAPParameterExpected].value;
    addSupplierFormSAPParameterModel.sAPParameterActual = this.formInput.controls[this.properties.sAPParameterActual].value;

    return addSupplierFormSAPParameterModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }



  isParameterNameModified() {
    return this.isModified(this.properties.parameterName);
  }

  isParameterNameEmpty() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.required);
  }

  isParameterNameHasWhiteSpace() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.validateWhiteSpace);
  }

  isSAPParameterExpectedModified() {
    return this.isModified(this.properties.sAPParameterExpected);
  }

  isSAPParameterExpectedEmpty() {
    return this.hasError(this.properties.sAPParameterExpected, ValidationErrorCodes.required);
  }

  isSAPParameterExpectedHasWhiteSpace() {
    return this.hasError(this.properties.sAPParameterExpected, ValidationErrorCodes.validateWhiteSpace);
  }

  isSAPParameterActualModified() {
    return this.isModified(this.properties.sAPParameterActual);
  }

  isSAPParameterActualEmpty() {
    return this.hasError(this.properties.sAPParameterActual, ValidationErrorCodes.required);
  }

  isSAPParameterActualHasWhiteSpace() {
    return this.hasError(this.properties.sAPParameterActual, ValidationErrorCodes.validateWhiteSpace);
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
