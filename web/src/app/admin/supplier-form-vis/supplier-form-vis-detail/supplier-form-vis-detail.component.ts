/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierFormVISService } from 'src/app/services/supplier-form-vis/supplier-form-vis.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormVISModel } from 'src/app/model/supplier-form-vis/update-supplier-form-vis-model';
import { AddSupplierFormVISModel } from 'src/app/model/supplier-form-vis/add-supplier-form-vis-model';
import { SupplierFormVIS } from 'src/app/model/supplier-form-vis/supplier-form-vis';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import * as _ from 'lodash';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
@Component({
  selector: 'app-supplier-form-vis-detail',
  templateUrl: './supplier-form-vis-detail.component.html',
  styleUrls: ['./supplier-form-vis-detail.component.css']
})
export class SupplierFormVISDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    acceptanceQTY: 'acceptanceQTY',
    totalFailedQTY: 'totalFailedQTY',
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
  pageSortFilterInfo = new PageSortFilterInfo(new SupplierForm());
  constructor(
    private formBuilder: FormBuilder,
    private apiService: SupplierFormVISService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormVIS();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormVIS';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminSupplierFormVISCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormVISCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormVISCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      supplierForm: new FormControl(null),
      totalFailedQTY: new FormControl(null),
      acceptanceQTY: new FormControl(null),
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
      const supplierFormVIS = new SupplierFormVIS(data);

      this.formDetails = this.entity;
      this.entity = supplierFormVIS;
      this.formInput.patchValue({
        id: supplierFormVIS.id,
        acceptanceQTY: supplierFormVIS.acceptanceQTY,
        totalFailedQTY: supplierFormVIS.totalFailedQTY,
        supplierForm: supplierFormVIS.supplierForm,
        isEnabled: supplierFormVIS.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormVISModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const updateSupplierFormVISModel = new UpdateSupplierFormVISModel();

    Automapper.map(this.entity, updateSupplierFormVISModel);
    updateSupplierFormVISModel.supplierFormId = supplierForm.id;
    return updateSupplierFormVISModel;
  }

  getAddModel(): AddSupplierFormVISModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const addSupplierFormVISModel = new AddSupplierFormVISModel();

    Automapper.map(this.entity, addSupplierFormVISModel);

    addSupplierFormVISModel.supplierFormId = supplierForm.id;

    return addSupplierFormVISModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }


  isAcceptanceQTYModified() {
    return this.isModified(this.properties.acceptanceQTY);
  }

  isAcceptanceQTYEmpty() {
    return this.hasError(this.properties.acceptanceQTY, ValidationErrorCodes.required);
  }

  isAcceptanceQTYHasWhiteSpace() {
    return this.hasError(this.properties.acceptanceQTY, ValidationErrorCodes.validateWhiteSpace);
  }

  isTotalFailedQTYModified() {
    return this.isModified(this.properties.totalFailedQTY);
  }

  isTotalFailedQTYEmpty() {
    return this.hasError(this.properties.totalFailedQTY, ValidationErrorCodes.required);
  }

  isTotalFailedQTYHasWhiteSpace() {
    return this.hasError(this.properties.totalFailedQTY, ValidationErrorCodes.validateWhiteSpace);
  }


  isAsyncValidationPending() {
    return
      ;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    // return !this.enableSaveButton
    //   || !this.formInput.valid
    //   || !this.formInput.dirty;
  }

}
