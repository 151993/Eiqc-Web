/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormPartDateCodeService } from 'src/app/services/supplier-form-part-date-code/supplier-form-part-date-code.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormPartDateCodeModel } from 'src/app/model/supplier-form-part-date-code/update-supplier-form-part-date-code-model';
import { AddSupplierFormPartDateCodeModel } from 'src/app/model/supplier-form-part-date-code/add-supplier-form-part-date-code-model';
import { SupplierFormPartDateCode } from 'src/app/model/supplier-form-part-date-code/supplier-form-part-date-code';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-part-date-code-detail',
  templateUrl: './supplier-form-part-date-code-detail.component.html',
  styleUrls: ['./supplier-form-part-date-code-detail.component.css']
})
export class SupplierFormPartDateCodeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
 properties = {
  id: 'id',
  requirement: 'requirement',
  supplierDC: 'supplierDC',
  mFGDate: 'mFGDate',
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
  private apiService: SupplierFormPartDateCodeService,
  authService: AuthService,
  activatedRoute: ActivatedRoute,
  notificationService: NotificationService,
  modalService: NgbModal,
  router: Router
) {
  super(modalService, activatedRoute, router, notificationService, authService, apiService);
  this.entity = new SupplierFormPartDateCode();
  this.initForm();
  this.cancelRoute = '/Admin/SupplierFormPartDateCode';

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
    requirement: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(255),
      validateWhiteSpace
    ]),
    supplierDC: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(255),
      validateWhiteSpace
    ]),
    mFGDate: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(100),
      validateWhiteSpace
    ]),
    result: new FormControl(Constants.Empty, [
      Validators.required,
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
    const supplierFormPartDateCode = new SupplierFormPartDateCode(data);

    this.formDetails = this.entity;
    this.entity = supplierFormPartDateCode;
    this.formInput.patchValue({
      id: supplierFormPartDateCode.id,
      requirement: supplierFormPartDateCode.requirement,
      supplierDC: supplierFormPartDateCode.supplierDC,
      mFGDate: supplierFormPartDateCode.mfgDate,
      result: supplierFormPartDateCode.result,
      isEnabled: supplierFormPartDateCode.isEnabled,
      supplierForm: supplierFormPartDateCode.supplierForm,
    });
    this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdateSupplierFormPartDateCodeModel {

  const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

  const updateSupplierFormPartDateCodeModel = new UpdateSupplierFormPartDateCodeModel();

  Automapper.map(this.entity, updateSupplierFormPartDateCodeModel);
  updateSupplierFormPartDateCodeModel.supplierFormId = supplierForm.id;
  updateSupplierFormPartDateCodeModel.mFGDate =  this.formInput.controls[this.properties.mFGDate].value;

  return updateSupplierFormPartDateCodeModel;
}

getAddModel(): AddSupplierFormPartDateCodeModel {

  const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

  const addSupplierFormPartDateCodeModel = new AddSupplierFormPartDateCodeModel();

  Automapper.map(this.entity, addSupplierFormPartDateCodeModel);

  addSupplierFormPartDateCodeModel.supplierFormId = supplierForm.id;
addSupplierFormPartDateCodeModel.mFGDate =  this.formInput.controls[this.properties.mFGDate].value;
  return addSupplierFormPartDateCodeModel;
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

isRequirementModified() {
  return this.isModified(this.properties.requirement);
}

isRequirementEmpty() {
  return this.hasError(this.properties.requirement, ValidationErrorCodes.required);
}

isRequirementHasWhiteSpace() {
  return this.hasError(this.properties.requirement, ValidationErrorCodes.validateWhiteSpace);
}

isSupplierDCModified() {
  return this.isModified(this.properties.supplierDC);
}

isSupplierDCEmpty() {
  return this.hasError(this.properties.supplierDC, ValidationErrorCodes.required);
}

isSupplierDCHasWhiteSpace() {
  return this.hasError(this.properties.supplierDC, ValidationErrorCodes.validateWhiteSpace);
}

isMFGDateModified() {
  return this.isModified(this.properties.mFGDate);
}

isMFGDateEmpty() {
  return this.hasError(this.properties.mFGDate, ValidationErrorCodes.required);
}

isMFGDateHasWhiteSpace() {
  return this.hasError(this.properties.mFGDate, ValidationErrorCodes.validateWhiteSpace);
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
