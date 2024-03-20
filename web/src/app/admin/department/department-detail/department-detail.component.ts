import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from 'src/app/services/department/department.service';
import { UpdateDepartmentModel } from 'src/app/model/department/update-department-model';
import { AddDepartmentModel } from 'src/app/model/department/add-department-model';
import { Department } from 'src/app/model/department/department';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {
  ControlStates,
  ValidationErrorCodes,
  Constants,
} from 'src/app/shared/constant/global';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  department: Department;

  originalFormInput: string;
  autoCompleteDepartmentValue: string;

  properties = {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: DepartmentService,
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
    this.department = new Department();
    this.entity = this.department;
    this.cancelRoute = '/Admin/Department';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminDepartmentCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminDepartmentCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminDepartmentCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
        ]
      ),
      isEnabled: new FormControl(true, Validators.required)
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
        this.formInput.controls[this.properties.name].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.department.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.department = new Department(data);

      this.formDetails = this.entity;

      this.entity = this.department;

      this.formInput.patchValue({
        id: this.department.id,
        name: this.department.name,
        description: this.department.description,
      });

      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.department.name,
          this.properties.name
        )
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }
  clearDepartment() {
    this.formInput.reset();
  }

  getUpdateModel(): UpdateDepartmentModel {
    const updateDepartmentModel = new UpdateDepartmentModel();
    Automapper.map(this.department, updateDepartmentModel);
    return updateDepartmentModel;
  }

  getAddModel(): AddDepartmentModel {
    const addDepartmentModel = new AddDepartmentModel();
    Automapper.map(this.department, addDepartmentModel);
    return addDepartmentModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
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

