/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierFormService } from 'src/app/services/supplier-form/supplier-form.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormModel } from 'src/app/model/supplier-form/update-supplier-form-model';
import { AddSupplierFormModel } from 'src/app/model/supplier-form/add-supplier-form-model';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-supplier-form-detail',
  templateUrl: './supplier-form-detail.component.html',
  styleUrls: ['./supplier-form-detail.component.css']
})
export class SupplierFormDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    pONo: 'pONo',
    partNo: 'partNo',
    dateCode: 'dateCode',
    dateCodeActual: 'dateCodeActual',
    approveTime: 'approveTime',
    approveUser: 'approveUser',
    totalQty: 'totalQty',
    sampleQty: 'sampleQty',
    inspector: 'inspector',
    verify: 'verify',
    importStatus: 'importStatus',
    importError: 'importError',
    mO: 'mO',
    movedPath: 'movedPath',
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: SupplierFormService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierForm();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierForm';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      pONo: new FormControl(Constants.Empty ),
      partNo: new FormControl(Constants.Empty),
      fileName: new FormControl(Constants.Empty),
      dateCode: new FormControl(Constants.Empty),
      approveUser: new FormControl(Constants.Empty ),
      inspector: new FormControl(Constants.Empty ),
      verify: new FormControl(Constants.Empty ),
      importError: new FormControl(Constants.Empty),
      mO: new FormControl(Constants.Empty),
      importStatus: new FormControl(null),
      movedPath: new FormControl(Constants.Empty),
      dateCodeActual: new FormControl(true),
      approveTime:  new FormControl(null),
      totalQty: new FormControl(null),
      sampleQty: new FormControl(null),
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
      const supplierForm = new SupplierForm(data);

      this.formDetails = this.entity;
      this.entity = supplierForm;
      this.formInput.patchValue({
        id: supplierForm.id,
        pONo: supplierForm.poNo,
        partNo: supplierForm.partNo,
        dateCode: supplierForm.dateCode,
        dateCodeActual: supplierForm.dateCodeActual,
        approveTime: supplierForm.approveTime,
        approveUser: supplierForm.approveUser,
        totalQty: supplierForm.totalQty,
        sampleQty: supplierForm.sampleQty,
        inspector: supplierForm.inspector,
        verify: supplierForm.verify,
        importStatus: supplierForm.importStatus,
        importError: supplierForm.importError,
        mO: supplierForm.mo,
        movedPath: supplierForm.movedPath,
        isEnabled: supplierForm.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormModel {

    const pono = this.formInput.controls[this.properties.pONo].value;
    const mo = this.formInput.controls[this.properties.mO].value;

    const updateSupplierFormModel = new UpdateSupplierFormModel();

    Automapper.map(this.entity, updateSupplierFormModel);

    updateSupplierFormModel.pONo = pono;
    updateSupplierFormModel.mO = mo;

    return updateSupplierFormModel;
  }

  getAddModel(): AddSupplierFormModel {

    const pono = this.formInput.controls[this.properties.pONo].value;
    const mo = this.formInput.controls[this.properties.mO].value;
    const addSupplierFormModel = new AddSupplierFormModel();

    Automapper.map(this.entity, addSupplierFormModel);
    addSupplierFormModel.pONo = pono;
    addSupplierFormModel.mO = mo;

    return addSupplierFormModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isPONoModified() {
    return this.isModified(this.properties.pONo);
  }

  isPONoEmpty() {
    return this.hasError(this.properties.pONo, ValidationErrorCodes.required);
  }

  isPONoHasWhiteSpace() {
    return this.hasError(this.properties.pONo, ValidationErrorCodes.validateWhiteSpace);
  }

  // isFileNameModified() {
  //   return this.isModified(this.properties.fileName);
  // }

  // isFileNameEmpty() {
  //   return this.hasError(this.properties.fileName, ValidationErrorCodes.required);
  // }

  // isFileNameHasWhiteSpace() {
  //   return this.hasError(this.properties.fileName, ValidationErrorCodes.validateWhiteSpace);
  // }

  isApproveUserModified() {
    return this.isModified(this.properties.approveUser);
  }

  isApproveUserEmpty() {
    return this.hasError(this.properties.approveUser, ValidationErrorCodes.required);
  }

  isApproveUserHasWhiteSpace() {
    return this.hasError(this.properties.approveUser, ValidationErrorCodes.validateWhiteSpace);
  }

  isTotalQtyModified() {
    return this.isModified(this.properties.totalQty);
  }

  isTotalQtyEmpty() {
    return this.hasError(this.properties.totalQty, ValidationErrorCodes.required);
  }

  isTotalQtyHasWhiteSpace() {
    return this.hasError(this.properties.totalQty, ValidationErrorCodes.validateWhiteSpace);
  }

  isSampleQtyModified() {
    return this.isModified(this.properties.sampleQty);
  }

  isSampleQtyEmpty() {
    return this.hasError(this.properties.sampleQty, ValidationErrorCodes.required);
  }

  isSampleQtyHasWhiteSpace() {
    return this.hasError(this.properties.sampleQty, ValidationErrorCodes.validateWhiteSpace);
  }

  isInspectorModified() {
    return this.isModified(this.properties.inspector);
  }

  isInspectorEmpty() {
    return this.hasError(this.properties.inspector, ValidationErrorCodes.required);
  }

  isInspectorHasWhiteSpace() {
    return this.hasError(this.properties.inspector, ValidationErrorCodes.validateWhiteSpace);
  }

  isVerifyModified() {
    return this.isModified(this.properties.verify);
  }

  isVerifyEmpty() {
    return this.hasError(this.properties.verify, ValidationErrorCodes.required);
  }

  isVerifyHasWhiteSpace() {
    return this.hasError(this.properties.verify, ValidationErrorCodes.validateWhiteSpace);
  }

  isImportStatusModified() {
    return this.isModified(this.properties.importStatus);
  }

  isImportStatusEmpty() {
    return this.hasError(this.properties.importStatus, ValidationErrorCodes.required);
  }

  isImportStatusHasWhiteSpace() {
    return this.hasError(this.properties.importStatus, ValidationErrorCodes.validateWhiteSpace);
  }

  isImportErrorModified() {
    return this.isModified(this.properties.importError);
  }

  isImportErrorEmpty() {
    return this.hasError(this.properties.importError, ValidationErrorCodes.required);
  }

  isImportErrorHasWhiteSpace() {
    return this.hasError(this.properties.importError, ValidationErrorCodes.validateWhiteSpace);
  }

  isMOModified() {
    return this.isModified(this.properties.mO);
  }

  isMOEmpty() {
    return this.hasError(this.properties.mO, ValidationErrorCodes.required);
  }

  isMOHasWhiteSpace() {
    return this.hasError(this.properties.mO, ValidationErrorCodes.validateWhiteSpace);
  }

  isMovedPathModified() {
    return this.isModified(this.properties.movedPath);
  }

  isMovedPathEmpty() {
    return this.hasError(this.properties.movedPath, ValidationErrorCodes.required);
  }

  isMovedPathHasWhiteSpace() {
    return this.hasError(this.properties.movedPath, ValidationErrorCodes.validateWhiteSpace);
  }


  // isAsyncValidationPending() {
  //   return
  //     ;
  //   // TO DO: Remove extra or(||)
  // }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
