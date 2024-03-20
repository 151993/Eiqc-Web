/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormMeasurementParameterActualService } from 'src/app/services/supplier-form-measurement-parameter-actual/supplier-form-measurement-parameter-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormMeasurementParameterActualModel } from 'src/app/model/supplier-form-measurement-parameter-actual/update-supplier-form-measurement-parameter-actual-model';
import { AddSupplierFormMeasurementParameterActualModel } from 'src/app/model/supplier-form-measurement-parameter-actual/add-supplier-form-measurement-parameter-actual-model';
import { SupplierFormMeasurementParameterActual } from 'src/app/model/supplier-form-measurement-parameter-actual/supplier-form-measurement-parameter-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-measurement-parameter-actual-detail',
  templateUrl: './supplier-form-measurement-parameter-actual-detail.component.html',
  styleUrls: ['./supplier-form-measurement-parameter-actual-detail.component.css']
})
export class SupplierFormMeasurementParameterActualDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
 properties = {
  id: 'id',
  parameterName: 'parameterName',
  no: 'no',
  valueActual: 'valueActual',
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
  private apiService: SupplierFormMeasurementParameterActualService,
  authService: AuthService,
  activatedRoute: ActivatedRoute,
  notificationService: NotificationService,
  modalService: NgbModal,
  router: Router
) {
  super(modalService, activatedRoute, router, notificationService, authService, apiService);
  this.entity = new SupplierFormMeasurementParameterActual();
  this.initForm();
  this.cancelRoute = '/Admin/SupplierFormMeasurementParameterActual';

  this.getUpdateModelFn = this.getUpdateModel;
  this.getAddModelFn = this.getAddModel;

  this.canAccessPermissionType = PermissionType.AdminSupplierFormMeasurementParameterActualCanAccess;
  this.canUpdatePermissionType = PermissionType.AdminSupplierFormMeasurementParameterActualCanUpdate;
  this.canCreatPermissionType = PermissionType.AdminSupplierFormMeasurementParameterActualCanCreate;

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
    no: new FormControl(null),
    valueActual : new FormControl(0),
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
    const supplierFormMeasurementParameterActual = new SupplierFormMeasurementParameterActual(data);

    this.formDetails = this.entity;
    this.entity = supplierFormMeasurementParameterActual;
    this.formInput.patchValue({
      id: supplierFormMeasurementParameterActual.id,
      parameterName: supplierFormMeasurementParameterActual.parameterName,
      no: supplierFormMeasurementParameterActual.no,
      valueActual: supplierFormMeasurementParameterActual.valueActual,
      supplierForm: supplierFormMeasurementParameterActual.supplierForm,
      isEnabled: supplierFormMeasurementParameterActual.isEnabled,
    });
    this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdateSupplierFormMeasurementParameterActualModel {

  const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

  const updateSupplierFormMeasurementParameterActualModel = new UpdateSupplierFormMeasurementParameterActualModel();

  Automapper.map(this.entity, updateSupplierFormMeasurementParameterActualModel);
  updateSupplierFormMeasurementParameterActualModel.supplierFormId = supplierForm.id;
  updateSupplierFormMeasurementParameterActualModel.parameterName =  this.formInput.controls[this.properties.parameterName].value;
  return updateSupplierFormMeasurementParameterActualModel;
}

getAddModel(): AddSupplierFormMeasurementParameterActualModel {

  const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

  const addSupplierFormMeasurementParameterActualModel = new AddSupplierFormMeasurementParameterActualModel();

  Automapper.map(this.entity, addSupplierFormMeasurementParameterActualModel);

  addSupplierFormMeasurementParameterActualModel.supplierFormId = supplierForm.id;
  addSupplierFormMeasurementParameterActualModel.parameterName =  this.formInput.controls[this.properties.parameterName].value;

  return addSupplierFormMeasurementParameterActualModel;
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
