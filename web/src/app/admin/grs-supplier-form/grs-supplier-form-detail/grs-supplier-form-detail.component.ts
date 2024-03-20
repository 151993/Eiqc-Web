/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { GRSSupplierFormService } from 'src/app/services/grs-supplier-form/grs-supplier-form.service';
import { environment } from 'src/environments/environment';
import { UpdateGRSSupplierFormModel } from 'src/app/model/grs-supplier-form/update-grs-supplier-form-model';
import { AddGRSSupplierFormModel } from 'src/app/model/grs-supplier-form/add-grs-supplier-form-model';
import { GRSSupplierForm } from 'src/app/model/grs-supplier-form/grs-supplier-form';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { GRS } from 'src/app/model/grs/grs';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-grs-supplier-form-detail',
  templateUrl: './grs-supplier-form-detail.component.html',
  styleUrls: ['./grs-supplier-form-detail.component.css']
})
export class GRSSupplierFormDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    supplierForm: 'supplierForm',
    submitUser: 'submitUser',
    submitTime: 'submitTime',
    status: 'status',
    gRS: 'gRS'

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
  data1: GRS[] = [];
  public grsAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'grsNo',
    minLength: '1',
    suggestions: this.data1,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'grsNo',
    format: '${value.grsNo}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: GRSSupplierFormService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new GRSSupplierForm();
    this.initForm();
    this.cancelRoute = '/Admin/GRSSupplierForm';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminGRSSupplierFormCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminGRSSupplierFormCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminGRSSupplierFormCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      supplierForm: new FormControl(null),

      gRS: new FormControl(null),
      status: new FormControl(1),
      submitTime: new FormControl(null),

      submitUser: new FormControl(Constants.Empty, [
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
      const gRSSupplierForm = new GRSSupplierForm(data);

      this.formDetails = this.entity;
      this.entity = gRSSupplierForm;
      this.formInput.patchValue({
        id: gRSSupplierForm.id,
        supplierForm: gRSSupplierForm.supplierForm,
        submitUser: gRSSupplierForm.submitUser,
        submitTime: gRSSupplierForm.submitTime,
        gRS: gRSSupplierForm.grs,
        status: gRSSupplierForm.status,
        isEnabled: gRSSupplierForm.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateGRSSupplierFormModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const gRSNo = this.formInput.controls[this.properties.gRS].value as GRS;

    const updateGRSSupplierFormModel = new UpdateGRSSupplierFormModel();

    Automapper.map(this.entity, updateGRSSupplierFormModel);
    updateGRSSupplierFormModel.supplierFormId = supplierForm.id;
    updateGRSSupplierFormModel.gRSNo = gRSNo.grsNo;
    updateGRSSupplierFormModel.submitTime = this.formInput.controls[this.properties.submitTime].value;
    return updateGRSSupplierFormModel;
  }

  getAddModel(): AddGRSSupplierFormModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;
    const gRSNo = this.formInput.controls[this.properties.gRS].value as GRS;

    const addGRSSupplierFormModel = new AddGRSSupplierFormModel();

    Automapper.map(this.entity, addGRSSupplierFormModel);

    addGRSSupplierFormModel.supplierFormId = supplierForm.id;
    addGRSSupplierFormModel.gRSNo = gRSNo.grsNo;
    addGRSSupplierFormModel.submitTime = this.formInput.controls[this.properties.submitTime].value;


    return addGRSSupplierFormModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  issupplierFormModified() {
    return this.isModified(this.properties.supplierForm);
  }

  issupplierFormEmpty() {
    return this.hasError(this.properties.supplierForm, ValidationErrorCodes.required);
  }

  issupplierFormHasWhiteSpace() {
    return this.hasError(this.properties.supplierForm, ValidationErrorCodes.validateWhiteSpace);
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
