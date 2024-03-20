/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierAttachmentService } from 'src/app/services/supplier-attachment/supplier-attachment.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierAttachmentModel } from 'src/app/model/supplier-attachment/update-supplier-attachment-model';
import { AddSupplierAttachmentModel } from 'src/app/model/supplier-attachment/add-supplier-attachment-model';
import { SupplierAttachment } from 'src/app/model/supplier-attachment/supplier-attachment';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-supplier-attachment-detail',
  templateUrl: './supplier-attachment-detail.component.html',
  styleUrls: ['./supplier-attachment-detail.component.css']
})
export class SupplierAttachmentDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    supplierForm: 'supplierForm',
    aTType: 'aTType',
    path: 'path',
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
    private apiService: SupplierAttachmentService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierAttachment();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierAttachment';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierAttachmentCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierAttachmentCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierAttachmentCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      supplierForm: new FormControl(null),
      aTType: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      path: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(20),
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
      const supplierAttachment = new SupplierAttachment(data);

      this.formDetails = this.entity;
      this.entity = supplierAttachment;
      this.formInput.patchValue({
        id: supplierAttachment.id,
        supplierForm: supplierAttachment.supplierForm,
        aTType: supplierAttachment.atType,
        path: supplierAttachment.path,
        isEnabled: supplierAttachment.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierAttachmentModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const updateSupplierAttachmentModel = new UpdateSupplierAttachmentModel();

    Automapper.map(this.entity, updateSupplierAttachmentModel);
    updateSupplierAttachmentModel.supplierFormId = supplierForm.id;
    return updateSupplierAttachmentModel;
  }

  getAddModel(): AddSupplierAttachmentModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const addSupplierAttachmentModel = new AddSupplierAttachmentModel();

    Automapper.map(this.entity, addSupplierAttachmentModel);

    addSupplierAttachmentModel.supplierFormId = supplierForm.id;

    return addSupplierAttachmentModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }



  isATTypeModified() {
    return this.isModified(this.properties.aTType);
  }

  isATTypeEmpty() {
    return this.hasError(this.properties.aTType, ValidationErrorCodes.required);
  }

  isATTypeHasWhiteSpace() {
    return this.hasError(this.properties.aTType, ValidationErrorCodes.validateWhiteSpace);
  }

  isPathModified() {
    return this.isModified(this.properties.path);
  }

  isPathEmpty() {
    return this.hasError(this.properties.path, ValidationErrorCodes.required);
  }

  isPathHasWhiteSpace() {
    return this.hasError(this.properties.path, ValidationErrorCodes.validateWhiteSpace);
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
