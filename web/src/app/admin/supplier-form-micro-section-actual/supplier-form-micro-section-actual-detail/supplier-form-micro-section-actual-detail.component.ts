/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SupplierFormMicroSectionActualService } from 'src/app/services/supplier-form-micro-section-actual/supplier-form-micro-section-actual.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierFormMicroSectionActualModel } from 'src/app/model/supplier-form-micro-section-actual/update-supplier-form-micro-section-actual-model';
import { AddSupplierFormMicroSectionActualModel } from 'src/app/model/supplier-form-micro-section-actual/add-supplier-form-micro-section-actual-model';
import { SupplierFormMicroSectionActual } from 'src/app/model/supplier-form-micro-section-actual/supplier-form-micro-section-actual';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-supplier-form-micro-section-actual-detail',
  templateUrl: './supplier-form-micro-section-actual-detail.component.html',
  styleUrls: ['./supplier-form-micro-section-actual-detail.component.css']
})
export class SupplierFormMicroSectionActualDetailComponent extends BaseDetailComponent
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
    private apiService: SupplierFormMicroSectionActualService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new SupplierFormMicroSectionActual();
    this.initForm();
    this.cancelRoute = '/Admin/SupplierFormMicroSectionActual';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierFormMicroSectionActualCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierFormMicroSectionActualCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierFormMicroSectionActualCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      supplierForm: new FormControl(null),
      no: new FormControl(null),
      valueActual: new FormControl(null),

      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
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
      const supplierFormMicroSectionActual = new SupplierFormMicroSectionActual(data);

      this.formDetails = this.entity;
      this.entity = supplierFormMicroSectionActual;
      this.formInput.patchValue({
        id: supplierFormMicroSectionActual.id,
        parameterName: supplierFormMicroSectionActual.parameterName,
        no: supplierFormMicroSectionActual.no,
        valueActual: supplierFormMicroSectionActual.valueActual,
        supplierForm: supplierFormMicroSectionActual.supplierForm,
        isEnabled: supplierFormMicroSectionActual.isEnabled,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierFormMicroSectionActualModel {

    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;

    const updateSupplierFormMicroSectionActualModel = new UpdateSupplierFormMicroSectionActualModel();

    Automapper.map(this.entity, updateSupplierFormMicroSectionActualModel);

    updateSupplierFormMicroSectionActualModel.supplierFormId = supplierForm.id;
    updateSupplierFormMicroSectionActualModel.parameterName = this.formInput.controls[this.properties.parameterName].value;
    // addSupplierFormMicroSectionModel.uOM =  this.formInput.controls[this.properties.uOM].value;
    // addSupplierFormMicroSectionModel.iTCode =  this.formInput.controls[this.properties.iTCode].value;


    return updateSupplierFormMicroSectionActualModel;
  }

  getAddModel(): AddSupplierFormMicroSectionActualModel {


    const supplierForm = this.formInput.controls[this.properties.supplierForm].value as SupplierForm;


    const addSupplierFormMicroSectionActualModel = new AddSupplierFormMicroSectionActualModel();

    Automapper.map(this.entity, addSupplierFormMicroSectionActualModel);


    addSupplierFormMicroSectionActualModel.supplierFormId = supplierForm.id;
    addSupplierFormMicroSectionActualModel.parameterName = this.formInput.controls[this.properties.parameterName].value;


    return addSupplierFormMicroSectionActualModel;
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
    return;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
