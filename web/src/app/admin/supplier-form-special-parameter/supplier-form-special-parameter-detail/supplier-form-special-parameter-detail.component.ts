/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormSpecialParameterService } from 'src/app/services/supplier-form-special-parameter/supplier-form-special-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormSpecialParameterModel } from 'src/app/model/supplier-form-special-parameter/update-supplier-form-special-parameter-model';
import { AddSupplierFormSpecialParameterModel } from 'src/app/model/supplier-form-special-parameter/add-supplier-form-special-parameter-model';
import { SupplierFormSpecialParameter } from 'src/app/model/supplier-form-special-parameter/supplier-form-special-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-special-parameter-detail',
  templateUrl: './supplier-form-special-parameter-detail.component.html',
  styleUrls: ['./supplier-form-special-parameter-detail.component.css']
})
export class SupplierFormSpecialParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
  id: 'id',
  parameterName: 'parameterName',
  resultDesc: 'resultDesc',
  result: 'result',
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
  private apiService: SupplierFormSpecialParameterService,
  authService: AuthService,
  activatedRoute: ActivatedRoute,
  notificationService: NotificationService,
  modalService: NgbModal,
  router: Router
) {
  super(modalService, activatedRoute, router, notificationService, authService, apiService);
  this.entity = new SupplierFormSpecialParameter();
  this.initForm();
  this.cancelRoute = '/Admin/SupplierFormSpecialParameter';

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
    resultDesc: new FormControl(Constants.Empty, [
      Validators.required,
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
    const supplierFormSpecialParameter = new SupplierFormSpecialParameter(data);

    this.formDetails = this.entity;
    this.entity = supplierFormSpecialParameter;
    this.formInput.patchValue({
      id: supplierFormSpecialParameter.id,
      parameterName: supplierFormSpecialParameter.parameterName,
      resultDesc: supplierFormSpecialParameter.resultDesc,
      result: supplierFormSpecialParameter.result,
      isEnabled: supplierFormSpecialParameter.isEnabled,
      supplierForm: supplierFormSpecialParameter.supplierForm

    });
    this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdateSupplierFormSpecialParameterModel {

  const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

  const updateSupplierFormSpecialParameterModel = new UpdateSupplierFormSpecialParameterModel();

  Automapper.map(this.entity, updateSupplierFormSpecialParameterModel);
  updateSupplierFormSpecialParameterModel.supplierFormId = supplierForm.id;
  return updateSupplierFormSpecialParameterModel;
}

getAddModel(): AddSupplierFormSpecialParameterModel {

  const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

  const addSupplierFormSpecialParameterModel = new AddSupplierFormSpecialParameterModel();

  Automapper.map(this.entity, addSupplierFormSpecialParameterModel);

  addSupplierFormSpecialParameterModel.supplierFormId = supplierForm.id;

  return addSupplierFormSpecialParameterModel;
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

isResultDescModified() {
  return this.isModified(this.properties.resultDesc);
}

isResultDescEmpty() {
  return this.hasError(this.properties.resultDesc, ValidationErrorCodes.required);
}

isResultDescHasWhiteSpace() {
  return this.hasError(this.properties.resultDesc, ValidationErrorCodes.validateWhiteSpace);
}

isResultModified() {
  return this.isModified(this.properties.result);
}

isResultEmpty() {
  return this.hasError(this.properties.result, ValidationErrorCodes.required);
}

isResultHasWhiteSpace() {
  return this.hasError(this.properties.result, ValidationErrorCodes.validateWhiteSpace);
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
