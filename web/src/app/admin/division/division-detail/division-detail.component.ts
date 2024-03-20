import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { AddDivisionModel } from 'src/app/model/division/add-division-model';
import { Division } from 'src/app/model/division/division';
import { UpdateDivisionModel } from 'src/app/model/division/update-division-model';
import { DivisionService } from 'src/app/services/division/division.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-division-detail',
  templateUrl: './division-detail.component.html',
  styleUrls: ['./division-detail.component.css']
})
export class DivisionDetailComponent extends BaseDetailComponent implements OnInit, OnDestroy {

  division: Division;

  originalFormInput: string;
  autoCompleteDivisionValue: string;

  properties = {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: DivisionService,
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
    this.division = new Division();
    this.entity = this.division;
    this.cancelRoute = '/Admin/Division';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminDivisionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminDivisionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminDivisionCanCreate;
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
            this.division.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.division = new Division(data);

      this.formDetails = this.entity;

      this.entity = this.division;

      this.formInput.patchValue({
        id: this.division.id,
        name: this.division.name,
        description: this.division.description,
        isEnabled : this.division.isEnabled
      });

      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.division.name,
          this.properties.name
        )
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }
  getUpdateModel(): UpdateDivisionModel {
    const updateDivisionModel = new UpdateDivisionModel();
    Automapper.map(this.division, updateDivisionModel);
    return updateDivisionModel;
  }

  getAddModel(): AddDivisionModel {
    const addDivisionModel = new AddDivisionModel();
    Automapper.map(this.division, addDivisionModel);
    return addDivisionModel;
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
