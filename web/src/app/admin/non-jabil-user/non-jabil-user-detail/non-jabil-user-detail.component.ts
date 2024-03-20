import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { NonJabilUserService } from 'src/app/services/non-jabil-user/non-jabil-user.service';
import { environment } from 'src/environments/environment';
import { UpdateNonJabilUserModel } from 'src/app/model/non-jabil-user/update-non-jabil-user-model';
import { AddNonJabilUserModel } from 'src/app/model/non-jabil-user/add-non-jabil-user-model';
import { NonJabilUser } from 'src/app/model/non-jabil-user/non-jabil-user';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes, userTypes, UserType, roleTypes, RoleType } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Role } from 'src/app/model/role/role';
import { Supplier } from 'src/app/model/supplier/supplier';
import { Site } from 'src/app/model/site/site';
import * as _ from 'lodash';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-non-jabil-user-detail',
  templateUrl: './non-jabil-user-detail.component.html',
  styleUrls: ['./non-jabil-user-detail.component.css']
})
export class NonJabilUserDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    userName: 'userName',
    name: 'name',
    allowNotification: 'allowNotification',
    email: 'email',
    phone: 'phone',
    site: 'site',
    supplier: 'supplier',
    roles: 'roles'
  };

  public supplierAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'vendorName',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'vendorName',
    format: '${value.vendorName} (${value.vendorCode}) (${value.purchaseOrg}-${value.companyCode})'
  };

  roles: Role[] = [];
  userTypeList: any[];
  originalRoleIds: number;
  role: Role;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: NonJabilUserService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new NonJabilUser();
    this.initForm();
    this.cancelRoute = '/Admin/NonJabilUser';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminNonJabilUserCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminNonJabilUserCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminNonJabilUserCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      userName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(100),
        validateWhiteSpace
      ]),
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(300),
        validateWhiteSpace
      ]),
      email: new FormControl(Constants.Empty, [
        Validators.maxLength(100),
        validateWhiteSpace
      ]),
      phone: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      isEnabled: new FormControl(true, Validators.required),
      roles: new FormControl(null, Validators.required),
      allowNotification: new FormControl(true, Validators.required),
      site: new FormControl(null, Validators.required),
      supplier: new FormControl(null, Validators.required),
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
      const nonJabilUser = new NonJabilUser(data);
      if (nonJabilUser && nonJabilUser.roles) {
        this.role = new Role();
        this.role.id = nonJabilUser.roles[0].id;
        this.role.name = nonJabilUser.roles[0].name;
        this.role.permissionTypeIds = nonJabilUser.roles[0].permissionTypeIds;
        this.role.roleEnumId = nonJabilUser.roles[0].roleEnumId;
        this.role.isEnabled = nonJabilUser.roles[0].isEnabled;
      }
      this.formDetails = this.entity;
      this.entity = nonJabilUser;
      this.formInput.patchValue({
        id: nonJabilUser.id,
        userName: nonJabilUser.userName,
        name: nonJabilUser.name,
        allowNotification: nonJabilUser.allowNotification,
        email: nonJabilUser.email,
        phone: nonJabilUser.phone,
        userType: nonJabilUser.userTypeId === UserType.Supplier ? userTypes[0].name : userTypes[1].name,
        isEnabled: nonJabilUser.isEnabled,
        supplier: nonJabilUser.supplier,
        roles: this.role,
        site: nonJabilUser.site.name + ' - ' + nonJabilUser.site.code

      });
      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          nonJabilUser.email,
          this.properties.email
        )
      );

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

      this.originalRoleIds = (this.role == null || this.role === undefined) ? 0 : this.role.id;
    });
  }

  getUpdateModel(): UpdateNonJabilUserModel {

    const site = this.formInput.controls[this.properties.site].value as Site;

    const supplier = this.formInput.controls[this.properties.supplier].value as Supplier;

    const updateNonJabilUserModel = new UpdateNonJabilUserModel();

    Automapper.map(this.entity, updateNonJabilUserModel);

    updateNonJabilUserModel.site = null;

    updateNonJabilUserModel.siteId = site.id;

    updateNonJabilUserModel.supplier = null;

    updateNonJabilUserModel.supplierId = supplier.id;

    const role = this.formInput.controls[this.properties.roles].value;

    const roleId = (role == null || role === undefined) ? 0 : role.id;

    updateNonJabilUserModel.addedRoleIds = (this.role.id !== roleId) ? roleId : 0 ;

    updateNonJabilUserModel.removedRoleIds = (this.role.id !== roleId) ? this.role.id : 0;

    updateNonJabilUserModel.userTypeId = role.name === roleTypes[RoleType.Supplier - 1].name ? UserType.Supplier : UserType.Customer;

    return updateNonJabilUserModel;
  }

  getAddModel(): AddNonJabilUserModel {

    const email = this.formInput.controls[this.properties.email].value;

    const site = this.formInput.controls[this.properties.site].value as Site;

    const supplier = this.formInput.controls[this.properties.supplier].value as Supplier;

    const addNonJabilUserModel = new AddNonJabilUserModel();

    Automapper.map(this.entity, addNonJabilUserModel);

    addNonJabilUserModel.site = null;

    addNonJabilUserModel.siteId = site.id;

    addNonJabilUserModel.supplier = null;

    addNonJabilUserModel.supplierId = supplier.id;

    addNonJabilUserModel.email = email;

    const role = this.formInput.controls[this.properties.roles].value;

    const roleId = (role == null || role === undefined) ? 0 : role.id;

    addNonJabilUserModel.addedRoleIds = roleId;

    addNonJabilUserModel.userTypeId = role.name === roleTypes[RoleType.Supplier - 1].name ? UserType.Supplier : UserType.Customer;

    return addNonJabilUserModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isSiteModified() {
    return this.isModified(this.properties.site);
  }

  isSiteEmpty() {
    return this.hasError(this.properties.site, ValidationErrorCodes.required);
  }

  isSupplierEmpty() {
    return this.hasError(this.properties.supplier, ValidationErrorCodes.required);
  }

  isSupplierModified() {
    return this.isModified(this.properties.supplier);
  }

  isNameModified() {
    return this.isModified(this.properties.name);
  }

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameHasWhiteSpace() {
    return this.hasError(this.properties.name, ValidationErrorCodes.validateWhiteSpace);
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

  isPhoneModified() {
    return this.isModified(this.properties.phone);
  }

  isPhoneEmpty() {
    return this.hasError(this.properties.phone, ValidationErrorCodes.required);
  }

  isPhoneHasWhiteSpace() {
    return this.hasError(this.properties.phone, ValidationErrorCodes.validateWhiteSpace);
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
