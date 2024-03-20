/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { InstrumentTypeService } from 'src/app/services/instrument-type/instrument-type.service';
import { environment } from 'src/environments/environment';
import { UpdateInstrumentTypeModel } from 'src/app/model/instrument-type/update-instrument-type-model';
import { AddInstrumentTypeModel } from 'src/app/model/instrument-type/add-instrument-type-model';
import { InstrumentType } from 'src/app/model/instrument-type/instrument-type';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';

@Component({
  selector: 'app-instrument-type-detail',
  templateUrl: './instrument-type-detail.component.html',
  styleUrls: ['./instrument-type-detail.component.css']
})
export class InstrumentTypeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
    properties = {
      id: 'id',
      code: 'code',
      description: 'description'
    };
    instrumentType: InstrumentType;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: InstrumentTypeService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.instrumentType = new InstrumentType();
    this.entity = this.instrumentType;
    this.cancelRoute = '/Admin/InstrumentType';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
    this.initForm();
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      code: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
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
        this.formInput.controls[this.properties.code].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.instrumentType.code,
            this.properties.code
          )
        );
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const instrumentType = new InstrumentType(data);

      this.formDetails = this.entity;
      this.entity = instrumentType;
      this.formInput.patchValue({
        id: instrumentType.id,
        code: instrumentType.code,
        description: instrumentType.description,
        isEnabled: instrumentType.isEnabled,
      });
      this.formInput.controls[this.properties.code].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          instrumentType.code,
          this.properties.code
        )
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateInstrumentTypeModel {
    const updateInstrumentTypeModel = new UpdateInstrumentTypeModel();

    Automapper.map(this.entity, updateInstrumentTypeModel);
    return updateInstrumentTypeModel;
  }

  getAddModel(): AddInstrumentTypeModel {

    const addInstrumentTypeModel = new AddInstrumentTypeModel();

    Automapper.map(this.entity, addInstrumentTypeModel);


    return addInstrumentTypeModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  isAsyncValidationPending() {
    return (
      this.formInput.controls[this.properties.code].status ===
      ControlStates.PENDING
    );
  }

  //#region name validations

  isCodeEmpty() {
    return this.hasError(this.properties.code, ValidationErrorCodes.required);
  }

  isCodeHasWhiteSpace() {
    return this.hasError(
      this.properties.code,
      ValidationErrorCodes.validateWhiteSpace
    );
  }

  isCodeExists() {
    return this.hasError(
      this.properties.code,
      ValidationErrorCodes.alreadyExists
    );
  }

  isCodeModified() {
    return this.isModified(this.properties.code);
  }

  //#endregion

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }
}
