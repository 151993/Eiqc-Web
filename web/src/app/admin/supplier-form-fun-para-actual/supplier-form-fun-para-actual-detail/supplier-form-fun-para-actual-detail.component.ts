/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormFunParaActualService } from 'src/app/services/supplier-form-fun-para-actual/supplier-form-fun-para-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormFunParaActualModel } from 'src/app/model/supplier-form-fun-para-actual/update-supplier-form-fun-para-actual-model';
import { AddSupplierFormFunParaActualModel } from 'src/app/model/supplier-form-fun-para-actual/add-supplier-form-fun-para-actual-model';
import { SupplierFormFunParaActual } from 'src/app/model/supplier-form-fun-para-actual/supplier-form-fun-para-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-fun-para-actual-detail',
  templateUrl: './supplier-form-fun-para-actual-detail.component.html',
  styleUrls: ['./supplier-form-fun-para-actual-detail.component.css']
})
export class SupplierFormFunParaActualDetailComponent extends BaseDetailComponent
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
    private apiService: SupplierFormFunParaActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormFunParaActual();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormFunParaActual';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierFormFunParaActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormFunParaActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormFunParaActualCanCreate;
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
      valueActual: new FormControl(null),
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
      const supplierFormFunParaActual = new SupplierFormFunParaActual(data);

      this.formDetails = this.entity;
      this.entity = supplierFormFunParaActual;
      this.formInput.patchValue({
        id: supplierFormFunParaActual.id,
        parameterName: supplierFormFunParaActual.parameterName,
        no: supplierFormFunParaActual.no,
        valueActual: supplierFormFunParaActual.valueActual,
        isEnabled: supplierFormFunParaActual.isEnabled,
        supplierForm: supplierFormFunParaActual.supplierForm
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormFunParaActualModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const no = this.formInput.controls[this.properties.no].value;
    const valueActual = this.formInput.controls[this.properties.valueActual].value;
    const updateSupplierFormFunParaActualModel = new UpdateSupplierFormFunParaActualModel();

    Automapper.map(this.entity, updateSupplierFormFunParaActualModel);
    updateSupplierFormFunParaActualModel.supplierFormId = supplierForm.id;
    updateSupplierFormFunParaActualModel.no = no;
    updateSupplierFormFunParaActualModel.valueActual = valueActual;

    return updateSupplierFormFunParaActualModel;
  }

  getAddModel(): AddSupplierFormFunParaActualModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const addSupplierFormFunParaActualModel = new AddSupplierFormFunParaActualModel();
    const no = this.formInput.controls[this.properties.no].value;
    const valueActual = this.formInput.controls[this.properties.valueActual].value;
    Automapper.map(this.entity, addSupplierFormFunParaActualModel);

    addSupplierFormFunParaActualModel.supplierFormId = supplierForm.id;

    addSupplierFormFunParaActualModel.no = no;
    addSupplierFormFunParaActualModel.valueActual = valueActual;

    return addSupplierFormFunParaActualModel;
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

  isNoModified() {
    return this.isModified(this.properties.no);
  }

  isNoEmpty() {
    return this.hasError(this.properties.no, ValidationErrorCodes.required);
  }

  isNoHasWhiteSpace() {
    return this.hasError(this.properties.no, ValidationErrorCodes.validateWhiteSpace);
  }

  isValueActualModified() {
    return this.isModified(this.properties.valueActual);
  }

  isValueActualEmpty() {
    return this.hasError(this.properties.valueActual, ValidationErrorCodes.required);
  }

  isValueActualHasWhiteSpace() {
    return this.hasError(this.properties.valueActual, ValidationErrorCodes.validateWhiteSpace);
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
