/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormPackagingService } from 'src/app/services/supplier-form-packaging/supplier-form-packaging.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormPackagingModel } from 'src/app/model/supplier-form-packaging/update-supplier-form-packaging-model';
import { AddSupplierFormPackagingModel } from 'src/app/model/supplier-form-packaging/add-supplier-form-packaging-model';
import { SupplierFormPackaging } from 'src/app/model/supplier-form-packaging/supplier-form-packaging';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-packaging-detail',
  templateUrl: './supplier-form-packaging-detail.component.html',
  styleUrls: ['./supplier-form-packaging-detail.component.css']
})
export class SupplierFormPackagingDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
  id: 'id',
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
  private apiService: SupplierFormPackagingService,
  authService: AuthService,
  activatedRoute: ActivatedRoute,
  notificationService: NotificationService,
  modalService: NgbModal,
  router: Router
) {
  super(modalService, activatedRoute, router, notificationService, authService, apiService);
  this.entity = new SupplierFormPackaging();
  this.initForm();
  this.cancelRoute = '/Admin/SupplierFormPackaging';

  this.getUpdateModelFn = this.getUpdateModel;
  this.getAddModelFn = this.getAddModel;

  this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
  this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
  this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
}

initForm() {
  this.formInput = this.formBuilder.group({
    id: 0,

    resultDesc: new FormControl(Constants.Empty, [
      Validators.required,
        Validators.maxLength(50),
      validateWhiteSpace
    ]),
    supplierForm: new FormControl(null),
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
    const supplierFormPackaging = new SupplierFormPackaging(data);
    this.formDetails = this.entity;
    this.entity = supplierFormPackaging;
    this.formInput.patchValue({
      id: supplierFormPackaging.id,
      resultDesc: supplierFormPackaging.resultDesc,
      result: supplierFormPackaging.result,
      supplierForm: supplierFormPackaging.supplierForm,
      isEnabled: supplierFormPackaging.isEnabled,
    });
   this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdateSupplierFormPackagingModel {

   const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

  const updateSupplierFormPackagingModel = new UpdateSupplierFormPackagingModel();

  Automapper.map(this.entity, updateSupplierFormPackagingModel);
   updateSupplierFormPackagingModel.supplierFormId = supplierForm.id;
  return updateSupplierFormPackagingModel;
}

getAddModel(): AddSupplierFormPackagingModel {

   const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

  const addSupplierFormPackagingModel = new AddSupplierFormPackagingModel();

  Automapper.map(this.entity, addSupplierFormPackagingModel);

  addSupplierFormPackagingModel.supplierFormId = supplierForm.id;

  return addSupplierFormPackagingModel;
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
