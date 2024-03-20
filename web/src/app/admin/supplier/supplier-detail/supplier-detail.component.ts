/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { environment } from 'src/environments/environment';
import { UpdateSupplierModel } from 'src/app/model/supplier/update-supplier-model';
import { AddSupplierModel } from 'src/app/model/supplier/add-supplier-model';
import { Supplier } from 'src/app/model/supplier/supplier';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';


@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    sapSupplierModel_ID: 'sapSupplierModel_ID',
    siteCode: 'siteCode',
    email: 'email',
    phoneNo: 'phoneNo',
    faxNo: 'faxNo',
    vendorCode: 'vendorCode',
    vendorName: 'vendorName',
    address: 'address',
    streetNo: 'streetNo',
    city: 'city',
    postalCode: 'postalCode',
    country: 'country',
    supplierStatus: 'supplierStatus',
    searchTerm: 'searchTerm',
    siteName: 'siteName',
    vendorName2: 'vendorName2',
    vendorName3: 'vendorName3',
    vendorName4: 'vendorName4',
    icSite: 'icSite',
    vendorAcctGrp: 'vendorAcctGrp',
    purchaseOrg: 'purchaseOrg',
    salesOrgPoc: 'salesOrgPoc',
    companyCode: 'companyCode',
    valuationArea: 'valuationArea',
    icVendorOfPlant: 'icVendorOfPlant',
    createdDate: 'createdDate',
    region: 'region',
    landCode: 'landCode',

  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: SupplierService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new Supplier();
    this.initForm();
    this.cancelRoute = '/Admin/Supplier';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      sapSupplierModel_ID: new FormControl({ value: Constants.Empty, disabled: true }, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      siteCode: new FormControl(Constants.Empty, [
        Validators.maxLength(10)
      ]),
      email: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(250)
      ]),
      phoneNo: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      faxNo: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      vendorCode: new FormControl({ value: Constants.Empty, disabled: true }, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      vendorName: new FormControl({ value: Constants.Empty, disabled: true }, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      address: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      streetNo: new FormControl(Constants.Empty, [
        Validators.maxLength(100)
      ]),
      city: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      postalCode: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      country: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      supplierStatus: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      searchTerm: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      siteName: new FormControl(Constants.Empty, [
        Validators.maxLength(30)
      ]),
      vendorName2: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      vendorName3: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      vendorName4: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      icSite: new FormControl(Constants.Empty, [
        Validators.maxLength(10)
      ]),
      vendorAcctGrp: new FormControl(Constants.Empty, [
        Validators.maxLength(10)
      ]),
      purchaseOrg: new FormControl(Constants.Empty, [
        Validators.maxLength(10)
      ]),
      salesOrgPoc: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      companyCode: new FormControl(Constants.Empty, [
        Validators.maxLength(10)
      ]),
      valuationArea: new FormControl({ value: Constants.Empty, disabled: true }, [
        Validators.required,
        Validators.maxLength(10)
      ]),
      icVendorOfPlant: new FormControl(Constants.Empty, [
        Validators.maxLength(15)
      ]),
      createdDate: new FormControl(Constants.Empty, [
        Validators.maxLength(15)
      ]),
      region: new FormControl(Constants.Empty, [
        Validators.maxLength(10)
      ]),
      landCode: new FormControl(Constants.Empty, [
        Validators.maxLength(10)
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
      const supplier = new Supplier(data);

      this.formDetails = this.entity;
      this.entity = supplier;
      this.formInput.patchValue({
        id: supplier.id,
        sapSupplierModel_ID: supplier.sapSupplierModel_ID,
        siteCode: supplier.siteCode,
        email: supplier.email,
        phoneNo: supplier.phoneNo,
        faxNo: supplier.faxNo,
        vendorCode: supplier.vendorCode,
        vendorName: supplier.vendorName,
        address: supplier.address,
        streetNo: supplier.streetNo,
        city: supplier.city,
        postalCode: supplier.postalCode,
        country: supplier.country,
        supplierStatus: supplier.supplierStatus,
        searchTerm: supplier.searchTerm,

        siteName: supplier.siteName,
        vendorName2: supplier.vendorName2,
        vendorName3: supplier.vendorName3,
        vendorName4: supplier.vendorName4,
        icSite: supplier.icSite,
        vendorAcctGrp: supplier.vendorAcctGrp,
        purchaseOrg: supplier.purchaseOrg,
        salesOrgPoc: supplier.salesOrgPoc,
        companyCode: supplier.companyCode,
        valuationArea: supplier.valuationArea,
        icVendorOfPlant: supplier.icVendorOfPlant,
        createdDate: supplier.createdDate,
        region: supplier.region,
        landCode: supplier.landCode,

        isEnabled: supplier.isEnabled,
      });

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateSupplierModel {
    const updateSupplierModel = new UpdateSupplierModel();
    Automapper.map(this.entity, updateSupplierModel);
    return updateSupplierModel;
  }

  getAddModel(): AddSupplierModel {
    const addSupplierModel = new AddSupplierModel();
    Automapper.map(this.entity, addSupplierModel);
    return addSupplierModel;
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isSiteNameModified() {
    return this.isModified(this.properties.valuationArea);
  }

  isSiteNameEmpty() {
    return this.hasError(this.properties.valuationArea, ValidationErrorCodes.required);
  }

  isSiteNameHasWhiteSpace() {
    return this.hasError(this.properties.valuationArea, ValidationErrorCodes.validateWhiteSpace);
  }

  isEmailModified() {
    return this.isModified(this.properties.email);
  }

  isEmailEmpty() {
    return this.hasError(this.properties.email, ValidationErrorCodes.required);
  }

  isEmailHasWhiteSpace() {
    return this.hasError(this.properties.email, ValidationErrorCodes.validateWhiteSpace);
  }

  isVendorCodeModified() {
    return this.isModified(this.properties.vendorCode);
  }

  isVendorCodeEmpty() {
    return this.hasError(this.properties.vendorCode, ValidationErrorCodes.required);
  }

  isVendorCodeHasWhiteSpace() {
    return this.hasError(this.properties.vendorCode, ValidationErrorCodes.validateWhiteSpace);
  }

  isVendorNameModified() {
    return this.isModified(this.properties.vendorName);
  }

  isVendorNameEmpty() {
    return this.hasError(this.properties.vendorName, ValidationErrorCodes.required);
  }

  isVendorNameHasWhiteSpace() {
    return this.hasError(this.properties.vendorName, ValidationErrorCodes.validateWhiteSpace);
  }



  isAsyncValidationPending() {
    return (
      this.formInput.controls[this.properties.vendorCode].status ===
      ControlStates.PENDING
    );
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
