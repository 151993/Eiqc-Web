/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormMicroSectionService } from 'src/app/services/supplier-form-micro-section/supplier-form-micro-section.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormMicroSectionModel } from 'src/app/model/supplier-form-micro-section/update-supplier-form-micro-section-model';
import { AddSupplierFormMicroSectionModel } from 'src/app/model/supplier-form-micro-section/add-supplier-form-micro-section-model';
import { SupplierFormMicroSection } from 'src/app/model/supplier-form-micro-section/supplier-form-micro-section';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-supplier-form-micro-section-detail',
  templateUrl: './supplier-form-micro-section-detail.component.html',
  styleUrls: ['./supplier-form-micro-section-detail.component.css']
})
export class SupplierFormMicroSectionDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    parameterName: 'parameterName',
    instrumentID: 'instrumentID',
    iTCode: 'iTCode',
    uOM: 'uOM',
    normalValue: 'normalValue',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
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
    private apiService: SupplierFormMicroSectionService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormMicroSection();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormMicroSection';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierFormMicroSectionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormMicroSectionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormMicroSectionCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      supplierForm: new FormControl(null),
      normalValue: new FormControl(null),
      accuracy: new FormControl(null),

      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      instrumentID: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      iTCode: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      uOM: new FormControl(Constants.Empty, [
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      sampleSize: new FormControl(Constants.Empty, [
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
      const supplierFormMicroSection = new SupplierFormMicroSection(data);

      this.formDetails = this.entity;
      this.entity = supplierFormMicroSection;
      this.formInput.patchValue({
        id: supplierFormMicroSection.id,
        parameterName: supplierFormMicroSection.parameterName,
        instrumentID: supplierFormMicroSection.instrumentID,
        iTCode: supplierFormMicroSection.itCode,
        uOM: supplierFormMicroSection.uom,
        normalValue: supplierFormMicroSection.normalValue,
        accuracy: supplierFormMicroSection.accuracy,
        sampleSize: supplierFormMicroSection.sampleSize,
        supplierForm: supplierFormMicroSection.supplierForm,
        isEnabled: supplierFormMicroSection.isEnabled,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormMicroSectionModel {


    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;


    const updateSupplierFormMicroSectionModel = new UpdateSupplierFormMicroSectionModel();

    Automapper.map(this.entity, updateSupplierFormMicroSectionModel);
    updateSupplierFormMicroSectionModel.supplierFormId = supplierForm.id;
    updateSupplierFormMicroSectionModel.parameterName = this.formInput.controls[this.properties.parameterName].value;
    updateSupplierFormMicroSectionModel.uOM = this.formInput.controls[this.properties.uOM].value;
    updateSupplierFormMicroSectionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;

    return updateSupplierFormMicroSectionModel;
  }

  getAddModel(): AddSupplierFormMicroSectionModel {


    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;


    const addSupplierFormMicroSectionModel = new AddSupplierFormMicroSectionModel();

    Automapper.map(this.entity, addSupplierFormMicroSectionModel);

    addSupplierFormMicroSectionModel.supplierFormId = supplierForm.id;
    addSupplierFormMicroSectionModel.parameterName = this.formInput.controls[this.properties.parameterName].value;
    addSupplierFormMicroSectionModel.uOM = this.formInput.controls[this.properties.uOM].value;
    addSupplierFormMicroSectionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;

    return addSupplierFormMicroSectionModel;
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
    return;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
