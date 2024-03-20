
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParameterTypeCodeService } from 'src/app/services/parameter-type-code/parameter-type-code.service';
import { environment } from 'src/environments/environment';
import { UpdateParameterTypeCodeModel } from 'src/app/model/parameter-type-code/update-parameter-type-code-model';
import { AddParameterTypeCodeModel } from 'src/app/model/parameter-type-code/add-parameter-type-code-model';
import { ParameterTypeCode } from 'src/app/model/parameter-type-code/parameter-type-code';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { ParameterManagementType } from 'src/app/model/parameter-management-type/parameter-management-type';
import * as _ from 'lodash';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';

@Component({
  selector: 'app-parameter-type-code-detail',
  templateUrl: './parameter-type-code-detail.component.html',
  styleUrls: ['./parameter-type-code-detail.component.css']
})
export class ParameterTypeCodeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  originalPcCodeIds: number[];

  public parameterTypeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'description',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'description',
    format: '${value.description}',
  };
  // pcCodes
  properties = {
    id: 'id',
    type: 'type',
    pcCodes: 'pcCodes',
    description: 'description',
    name: 'name'
  };
  parameterTypeCode: ParameterTypeCode;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ParameterTypeCodeService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.parameterTypeCode = new ParameterTypeCode();
    this.entity = this.parameterTypeCode;
    this.initForm();
    this.cancelRoute = '/Admin/ParameterTypeCode';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminParameterTypeCodeCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminParameterTypeCodeCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminParameterTypeCodeCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      type: new FormControl(null),
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      pcCodes: new FormControl(Constants.Empty, [
        Validators.required
      ]),
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(255)
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
        this.formInput.controls[this.properties.name].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.parameterTypeCode.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const parameterTypeCode = new ParameterTypeCode(data);

      this.formDetails = this.entity;
      this.entity = parameterTypeCode;
      this.formInput.patchValue({
        id: parameterTypeCode.id,
        type: parameterTypeCode.parameterManagementType,
        name: parameterTypeCode.name,
        pcCodes: parameterTypeCode.pcCodes,
        description: parameterTypeCode.description,
        isEnabled: parameterTypeCode.isEnabled,
      });

      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.parameterTypeCode.name,
          this.properties.name
        )
      );

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

      this.originalPcCodeIds = JSON.parse(
        JSON.stringify(_.map(parameterTypeCode.pcCodes, (x) => x.id))
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateParameterTypeCodeModel {

    const parameterManagementType = this.formInput.controls[this.properties.type].value as ParameterManagementType;

    const updateParameterTypeCodeModel = new UpdateParameterTypeCodeModel();

    Automapper.map(this.entity, updateParameterTypeCodeModel);

    const pcCodeIds = _.map(
      this.formInput.controls[this.properties.pcCodes].value,
      this.properties.id
    );

    updateParameterTypeCodeModel.parameterManagementTypeId = parameterManagementType.id;

    updateParameterTypeCodeModel.addedPcCodeIds = this.getAddedParameterCodeIds(pcCodeIds);

    updateParameterTypeCodeModel.removedPcCodeIds = this.getRemovedParameterCodeIds(pcCodeIds);

    return updateParameterTypeCodeModel;
  }

  getAddModel(): AddParameterTypeCodeModel {

    const parameterManagementType = this.formInput.controls[this.properties.type].value as ParameterManagementType;

    const addParameterTypeCodeModel = new AddParameterTypeCodeModel();

    Automapper.map(this.entity, addParameterTypeCodeModel);

    const pcCodeIds = _.map(
      this.formInput.controls[this.properties.pcCodes].value,
      this.properties.id
    );

    addParameterTypeCodeModel.parameterManagementTypeId = parameterManagementType.id;

    addParameterTypeCodeModel.addedPcCodeIds = this.getAddedParameterCodeIds(pcCodeIds);

    return addParameterTypeCodeModel;
  }


  getAddedParameterCodeIds(pcCodeIds: number[]) {
    const added = _.difference(pcCodeIds, this.originalPcCodeIds);
    return added;
  }

  getRemovedParameterCodeIds(pcCodeIds: number[]) {
    const removed = _.difference(this.originalPcCodeIds, pcCodeIds);
    return removed;
  }


  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }



  isCodeModified() {
    return this.isModified(this.properties.pcCodes);
  }

  isCodeEmpty() {
    return this.hasError(this.properties.pcCodes, ValidationErrorCodes.required);
  }

  isCodeHasWhiteSpace() {
    return this.hasError(this.properties.pcCodes, ValidationErrorCodes.validateWhiteSpace);
  }

  isTypeEmpty() {
    return this.hasError(this.properties.type, ValidationErrorCodes.required);
  }

  isTypeModified() {
    return this.isModified(this.properties.type);
  }

  isTypeHasWhiteSpace() {
    return this.hasError(this.properties.type, ValidationErrorCodes.validateWhiteSpace);
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

  isAsyncValidationPending() {
    return (
      this.formInput.controls[this.properties.name].status ===
      ControlStates.PENDING
    );
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
