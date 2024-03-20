/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierFormBowTwistActualService } from 'src/app/services/supplier-form-bow-twist-actual/supplier-form-bow-twist-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormBowTwistActualModel } from 'src/app/model/supplier-form-bow-twist-actual/update-supplier-form-bow-twist-actual-model';
import { AddSupplierFormBowTwistActualModel } from 'src/app/model/supplier-form-bow-twist-actual/add-supplier-form-bow-twist-actual-model';
import { SupplierFormBowTwistActual } from 'src/app/model/supplier-form-bow-twist-actual/supplier-form-bow-twist-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-bow-twist-actual-detail',
  templateUrl: './supplier-form-bow-twist-actual-detail.component.html',
  styleUrls: ['./supplier-form-bow-twist-actual-detail.component.css']
})
export class SupplierFormBowTwistActualDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    warpType: 'warpType',
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
    private apiService: SupplierFormBowTwistActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormBowTwistActual();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormBowTwistActual';

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
      warpType: new FormControl(null),
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
      const supplierFormBowTwistActual = new SupplierFormBowTwistActual(data);

      this.formDetails = this.entity;
      this.entity = supplierFormBowTwistActual;
      this.formInput.patchValue({
        id: supplierFormBowTwistActual.id,
        warpType: supplierFormBowTwistActual.warpType,
        no: supplierFormBowTwistActual.no,
        valueActual: supplierFormBowTwistActual.valueActual,
        supplierForm: supplierFormBowTwistActual.supplierForm,
        isEnabled: supplierFormBowTwistActual.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormBowTwistActualModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const updateSupplierFormBowTwistActualModel = new UpdateSupplierFormBowTwistActualModel();

    Automapper.map(this.entity, updateSupplierFormBowTwistActualModel);
    updateSupplierFormBowTwistActualModel.supplierFormId = supplierForm.id;
    return updateSupplierFormBowTwistActualModel;
  }

  getAddModel(): AddSupplierFormBowTwistActualModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const addSupplierFormBowTwistActualModel = new AddSupplierFormBowTwistActualModel();

    Automapper.map(this.entity, addSupplierFormBowTwistActualModel);

    addSupplierFormBowTwistActualModel.supplierFormId = supplierForm.id;

    return addSupplierFormBowTwistActualModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }


  isWarpTypeModified() {
    return this.isModified(this.properties.warpType);
  }

  isWarpTypeEmpty() {
    return this.hasError(this.properties.warpType, ValidationErrorCodes.required);
  }

  isWarpTypeHasWhiteSpace() {
    return this.hasError(this.properties.warpType, ValidationErrorCodes.validateWhiteSpace);
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
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
