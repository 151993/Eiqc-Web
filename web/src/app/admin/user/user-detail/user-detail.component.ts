import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { UpdateUserModel } from 'src/app/model/user/update-user-model';
import { AddUserModel } from 'src/app/model/user/add-user-model';
import { User } from 'src/app/model/user/user';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {
  ControlStates,
  ValidationErrorCodes,
  Constants,
  UserType,
} from 'src/app/shared/constant/global';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { Role } from 'src/app/model/role/role';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Site } from 'src/app/model/site/site';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  user: User;

  originalFormInput: string;
  autoCompleteUserValue: string;

  properties = {
    id: 'id',
    name: 'name',
    email: 'email',
    userName: 'userName',
    roles: 'roles',
    employeeId: 'employeeId',
    allowNotification: 'allowNotification',
    managerName: 'managerName',
    departmentName: 'departmentName',
    site: 'site',
  };

  gettingUser = false;
  public triggerSearchUser$ = new Subject<string>();

  originalSiteDivisionIds: number[];

  userCollection: User[] = [];
  selectedData: User;

  roles: Role[] = [];

  originalRoleIds: number;
  role: Role;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: UserService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService
  ) {
    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService,
      apiService
    );
    this.initForm();
    this.user = new User();
    this.entity = this.user;
    this.cancelRoute = '/Admin/User';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminUserCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminUserCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminUserCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      email: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      isEnabled: new FormControl(Constants.Empty, Validators.required),
      userName: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      managerName: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      roles: new FormControl(null, Validators.required),
      employeeId: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      allowNotification: new FormControl(Constants.Empty, Validators.required),
      departmentName: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      site: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData();

    this.triggerSearchUser$
      .pipe(
        switchMap((input: string) =>
          this.apiService.searchBySamAccountOrName(input)
        )
      )
      .subscribe(
        (data: any[]) => {
          this.userCollection = data.splice(0, environment.limit.maxResult);
          this.gettingUser = false;
        },
        () => {
          this.gettingUser = false;
        }
      );
  }

  getData() {
    // If create mode then return
    if (this.recId === null) {
      // In order to work properly need to add a delay
      setTimeout(() => {
        this.formInput.controls[this.properties.name].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.user.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.user = new User(data);

      if (this.user && this.user.roles) {
        this.role = new Role();
        this.role.id = this.user.roles[0].id;
        this.role.name = this.user.roles[0].name;
        this.role.permissionTypeIds = this.user.roles[0].permissionTypeIds;
        this.role.roleEnumId = this.user.roles[0].roleEnumId;
        this.role.isEnabled = this.user.roles[0].isEnabled;
      }

      this.formDetails = this.entity;

      this.entity = this.user;

      this.formInput.patchValue({
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        allowNotification: (this.user != null && this.user.allowNotification != null ) ? this.user.allowNotification : Constants.Empty,
        isEnabled: this.user.isEnabled,
        userName: this.user.userName,
        employeeId: this.user.employeeId,
        roles: this.role,
        managerName: (this.user != null && this.user.manager != null ) ? this.user.manager.name : Constants.Empty,
        departmentName: (this.user != null && this.user.department != null ) ? this.user.department.name : Constants.Empty,
        site: this.user.site.name + ' - ' + this.user.site.code,
        userTypeId : this.user.userTypeId
      });

      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.user.name,
          this.properties.name
        )
      );

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

      this.autoCompleteUserValue =
        this.user.name + ' (' + this.user.userName + ')';

      this.originalRoleIds = (this.role == null || this.role === undefined) ? 0 : this.role.id;
    });
  }

  refreshFromAD() {
    this.gettingUser = true;
    this.apiService
      .searchBySamAccountOrName(this.formInput.controls['userName'].value)
      .subscribe((data) => {
        this.userCollection = data.splice(0, environment.limit.maxResult);
        if (this.userCollection) {
          const user = this.userCollection[0];
          this.formInput.patchValue({
            name: user.name,
            email: user.email,
            employeeId: user.employeeId,
            managerName: user.manager,
            departmentName: user.department
          });
          this.formInput.markAsDirty();
        }
      });
  }

  triggerSearchUser(event) {
    const input = event.query.trim();
    if (input !== '') {
      this.gettingUser = true;
      this.triggerSearchUser$.next(input);
    }
  }

  selectUser(value) {
    this.formInput.patchValue({
      id: value.id,
      name: value.name,
      isEnabled: true,
      userName: value.samAccountName,
      employeeId: value.employeeId,
      email: value.email,
      allowNotification: true,
      managerName: value.manager,
      departmentName: value.department
    });
    this.formInput.markAsDirty();
  }

  clearUser() {
    this.formInput.reset();
  }

  getUpdateModel(): UpdateUserModel {
    const site = this.formInput.controls[this.properties.site].value as Site;
    const updateUserModel = new UpdateUserModel();
    const employeeID = this.formInput.controls[this.properties.employeeId]
      .value;
    Automapper.map(this.user, updateUserModel);
    updateUserModel.site = null;
    updateUserModel.siteId = site.id;
    updateUserModel.employeeId = employeeID;
    updateUserModel.userTypeId = UserType.User;

    const role = this.formInput.controls[this.properties.roles].value;

    const roleId = (role == null || role === undefined) ? 0 : role.id;

    updateUserModel.addedRoleIds = (this.role.id !== roleId) ? roleId : 0 ;

    updateUserModel.removedRoleIds = (this.role.id !== roleId) ? this.role.id : 0;


    return updateUserModel;
  }


  getAddModel(): AddUserModel {
    const email = this.formInput.controls[this.properties.email].value;

    const employeeID = this.formInput.controls[this.properties.employeeId].value;

    const managerName = this.formInput.controls[this.properties.managerName].value;

    const departmentName = this.formInput.controls[this.properties.departmentName].value;

    const site = this.formInput.controls[this.properties.site].value as Site;

    const addUserModel = new AddUserModel();

    Automapper.map(this.user, addUserModel);

    addUserModel.site = null;

    addUserModel.siteId = site.id;

    addUserModel.email = email;

    addUserModel.employeeId = employeeID;

    addUserModel.managerName = managerName;

    addUserModel.departmentName = departmentName;

    addUserModel.userTypeId = UserType.User;

    const role = this.formInput.controls[this.properties.roles].value;

    const roleId = (role == null || role === undefined) ? 0 : role.id;

    addUserModel.addedRoleIds = roleId;

    return addUserModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }
  isSiteModified() {
    return this.isModified(this.properties.site);
}

isSiteEmpty() {
    return this.hasError(this.properties.site, ValidationErrorCodes.required);
}

  isAsycValidationPending() {
    return (
      this.formInput.controls[this.properties.name].status ===
      ControlStates.PENDING
    );
  }

  //#region name validations

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameHasWhiteSpace() {
    return this.hasError(
      this.properties.name,
      ValidationErrorCodes.validateWhiteSpace
    );
  }

  isNameExists() {
    return this.hasError(
      this.properties.name,
      ValidationErrorCodes.alreadyExists
    );
  }

  isNameModified() {
    return this.isModified(this.properties.name);
  }

  //#endregion

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }
}
