/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { InspectionToolsService } from 'src/app/services/inspection-tools/inspection-tools.service';
import { environment } from 'src/environments/environment';
import { UpdateInspectionToolsModel } from 'src/app/model/inspection-tools/update-inspection-tools-model';
import { AddInspectionToolsModel } from 'src/app/model/inspection-tools/add-inspection-tools-model';
import { InspectionTools } from 'src/app/model/inspection-tools/inspection-tools';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ControlStates, PrimeNGDateSelectionMode, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { InspectionToolsType } from 'src/app/model/inspection-tools-type/inspection-tools-type';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';

@Component({
  selector: 'app-inspection-tools-detail',
  templateUrl: './inspection-tools-detail.component.html',
  styleUrls: ['./inspection-tools-detail.component.css']
})
export class InspectionToolsDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    inspectionToolsType: 'inspectionToolsType',
    name: 'name',
    validDate: 'validDate',
  };
  inspectionTools: InspectionTools;
  selectionModeSingle = PrimeNGDateSelectionMode.Single;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: InspectionToolsService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.inspectionTools = new InspectionTools();
    this.entity = this.inspectionTools;
    this.cancelRoute = '/Admin/InspectionTools';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminInspectionToolsCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminInspectionToolsCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminInspectionToolsCanCreate;
    this.initForm();

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      inspectionToolsType: new FormControl(Constants.Empty, Validators.required),
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      validDate: new FormControl(new Date(), Validators.required),
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
            this.inspectionTools.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const inspectionTools = new InspectionTools(data);

      this.formDetails = this.entity;
      this.entity = inspectionTools;
      this.formInput.patchValue({
        id: inspectionTools.id,
        inspectionToolsType: inspectionTools.inspectionToolsType,
        name: inspectionTools.name,
        validDate: inspectionTools.validDate ? new Date(inspectionTools.validDate) : null,
        isEnabled: inspectionTools.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateInspectionToolsModel {

    const inspectionToolsType = this.formInput.controls[this.properties.inspectionToolsType].value as InspectionToolsType;
    const updateInspectionToolsModel = new UpdateInspectionToolsModel();
    Automapper.map(this.entity, updateInspectionToolsModel);
    updateInspectionToolsModel.inspectionToolsTypeId = inspectionToolsType.id;
    return updateInspectionToolsModel;
  }

  getAddModel(): AddInspectionToolsModel {

    const inspectionToolsType = this.formInput.controls[this.properties.inspectionToolsType].value as InspectionToolsType;
    const addInspectionToolsModel = new AddInspectionToolsModel();
    Automapper.map(this.entity, addInspectionToolsModel);
    addInspectionToolsModel.inspectionToolsTypeId = inspectionToolsType.id;
    return addInspectionToolsModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isInspectionToolsTypeModified() {
    return this.isModified(this.properties.inspectionToolsType);
  }

  isInspectionToolsTypeEmpty() {
    return this.hasError(this.properties.inspectionToolsType, ValidationErrorCodes.required);
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

  isNameExists() {
    return this.hasError(
      this.properties.name,
      ValidationErrorCodes.alreadyExists
    );
  }

  isValidDateModified() {
    return this.isModified(this.properties.validDate);
  }
  isValidDateEmpty() {
    return this.hasError(this.properties.validDate, ValidationErrorCodes.required);
  }

  isAsyncValidationPending() {
    return this.formInput.controls[this.properties.name].status === ControlStates.PENDING;
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
