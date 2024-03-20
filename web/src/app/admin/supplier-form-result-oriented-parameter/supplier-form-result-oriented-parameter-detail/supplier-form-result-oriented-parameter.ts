/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { environment } from 'src/environments/environment';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { SupplierFormResultOrientedParameterService } from 'src/app/services/supplier-form-result-oriented-parameter/supplier-form-result-oriented-parameter.service';
import { SupplierFormResultOrientedParameter } from 'src/app/model/supplier-form-result-oriented-parameter/supplier-form-result-oriented-parameter';
import { UpdateSupplierFormResultOrientedParameterModel } from 'src/app/model/supplier-form-result-oriented-parameter/update-supplier-form-result-oriented-parameter-model';
import { AddSupplierFormResultOrientedParameterModel } from 'src/app/model/supplier-form-result-oriented-parameter/add-supplier-form-result-oriented-parameter-model';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-result-oriented-parameter-detail',
  templateUrl: './supplier-form-result-oriented-parameter-detail.component.html',
  styleUrls: ['./supplier-form-result-oriented-parameter-detail.component.css']
})
export class SupplierFormResultOrientedParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    parameterName: 'parameterName',
    resultExpected: 'resultExpected',
    resultActual: 'resultActual',
    testCondition: 'testCondition',
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
    private apiService: SupplierFormResultOrientedParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormResultOrientedParameter();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormResultOrientedParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierFormResultOrientedParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormResultOrientedParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormResultOrientedParameterCanCreate;
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
      resultExpected: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      resultActual: new FormControl(Constants.Empty),
      testCondition: new FormControl(Constants.Empty),
      inspectionDetails: new FormControl(Constants.Empty),
      isEnabled: new FormControl(true, Validators.required),
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
      const supplierFormResultOrientedParameter = new SupplierFormResultOrientedParameter(data);

      this.formDetails = this.entity;
      this.entity = supplierFormResultOrientedParameter;
      this.formInput.patchValue({
        id: supplierFormResultOrientedParameter.id,
        parameterName: supplierFormResultOrientedParameter.parameterName,
        resultExpected: supplierFormResultOrientedParameter.resultExpected,
        resultActual: supplierFormResultOrientedParameter.resultActual,
        testCondition: supplierFormResultOrientedParameter.testCondition,
        inspectionDetails: supplierFormResultOrientedParameter.inspectionDetails,
        supplierForm: supplierFormResultOrientedParameter.supplierForm,
        isEnabled: supplierFormResultOrientedParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormResultOrientedParameterModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const updateSupplierFormResultOrientedParameterModel = new UpdateSupplierFormResultOrientedParameterModel();

    Automapper.map(this.entity, updateSupplierFormResultOrientedParameterModel);

    updateSupplierFormResultOrientedParameterModel.supplierFormId = supplierForm.id;
    updateSupplierFormResultOrientedParameterModel.parameterName = this.formInput.controls[this.properties.parameterName].value;


    return updateSupplierFormResultOrientedParameterModel;
  }

  getAddModel(): AddSupplierFormResultOrientedParameterModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const addSupplierFormResultOrientedParameterModel = new AddSupplierFormResultOrientedParameterModel();

    Automapper.map(this.entity, addSupplierFormResultOrientedParameterModel);

    addSupplierFormResultOrientedParameterModel.supplierFormId = supplierForm.id;
    addSupplierFormResultOrientedParameterModel.parameterName = this.formInput.controls[this.properties.parameterName].value;

    return addSupplierFormResultOrientedParameterModel;
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

  // isSAPParameterExpectedModified() {
  //   return this.isModified(this.properties.sAPParameterExpected);
  // }

  // isSAPParameterExpectedEmpty() {
  //   return this.hasError(this.properties.sAPParameterExpected, ValidationErrorCodes.required);
  // }

  // isSAPParameterExpectedHasWhiteSpace() {
  //   return this.hasError(this.properties.sAPParameterExpected, ValidationErrorCodes.validateWhiteSpace);
  // }

  // isSAPParameterActualModified() {
  //   return this.isModified(this.properties.sAPParameterActual);
  // }

  // isSAPParameterActualEmpty() {
  //   return this.hasError(this.properties.sAPParameterActual, ValidationErrorCodes.required);
  // }

  // isSAPParameterActualHasWhiteSpace() {
  //   return this.hasError(this.properties.sAPParameterActual, ValidationErrorCodes.validateWhiteSpace);
  // }


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
