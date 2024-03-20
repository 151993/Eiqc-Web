/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormBowTwistParameterService } from 'src/app/services/supplier-form-bow-twist-parameter/supplier-form-bow-twist-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormBowTwistParameterModel } from 'src/app/model/supplier-form-bow-twist-parameter/update-supplier-form-bow-twist-parameter-model';
import { AddSupplierFormBowTwistParameterModel } from 'src/app/model/supplier-form-bow-twist-parameter/add-supplier-form-bow-twist-parameter-model';
import { SupplierFormBowTwistParameter } from 'src/app/model/supplier-form-bow-twist-parameter/supplier-form-bow-twist-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-form-bow-twist-parameter-detail',
  templateUrl: './supplier-form-bow-twist-parameter-detail.component.html',
  styleUrls: ['./supplier-form-bow-twist-parameter-detail.component.css']
})
export class SupplierFormBowTwistParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    warpType: 'warpType',
    spec: 'spec',
    length: 'length',
    width: 'width',
    unit: 'unit',
    upperLimit: 'upperLimit',
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
    private apiService: SupplierFormBowTwistParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormBowTwistParameter();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormBowTwistParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierFormBowTwistParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormBowTwistParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormBowTwistParameterCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      spec: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      length: new FormControl(Constants.Empty, [
        Validators.maxLength(53),
        validateWhiteSpace
      ]),
      width: new FormControl(Constants.Empty, [
        Validators.maxLength(53),
        validateWhiteSpace
      ]),
      unit: new FormControl(Constants.Empty, [
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      upperLimit: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      supplierForm: new FormControl(null),
      warpType: new FormControl(null),

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
      const supplierFormBowTwistParameter = new SupplierFormBowTwistParameter(data);

      this.formDetails = this.entity;
      this.entity = supplierFormBowTwistParameter;
      this.formInput.patchValue({
        id: supplierFormBowTwistParameter.id,
        warpType: supplierFormBowTwistParameter.warpType,
        spec: supplierFormBowTwistParameter.spec,
        length: supplierFormBowTwistParameter.length,
        width: supplierFormBowTwistParameter.width,
        unit: supplierFormBowTwistParameter.unit,
        upperLimit: supplierFormBowTwistParameter.upperLimit,
        supplierForm: supplierFormBowTwistParameter.supplierForm,
        isEnabled: supplierFormBowTwistParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormBowTwistParameterModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const warpType = this.formInput.controls[this.properties.warpType].value;
    const updateSupplierFormBowTwistParameterModel = new UpdateSupplierFormBowTwistParameterModel();

    Automapper.map(this.entity, updateSupplierFormBowTwistParameterModel);
    updateSupplierFormBowTwistParameterModel.supplierFormId = supplierForm.id;
    updateSupplierFormBowTwistParameterModel.warpType = warpType;
    return updateSupplierFormBowTwistParameterModel;
  }

  getAddModel(): AddSupplierFormBowTwistParameterModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const warpType = this.formInput.controls[this.properties.warpType].value;

    const addSupplierFormBowTwistParameterModel = new AddSupplierFormBowTwistParameterModel();

    Automapper.map(this.entity, addSupplierFormBowTwistParameterModel);

    addSupplierFormBowTwistParameterModel.supplierFormId = supplierForm.id;
    addSupplierFormBowTwistParameterModel.warpType = warpType;


    return addSupplierFormBowTwistParameterModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isAsyncValidationPending() {
    //   return
    //  ;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
