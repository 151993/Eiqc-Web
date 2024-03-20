/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PartMPositionToleranceService } from 'src/app/services/part-m-position-tolerance/part-m-position-tolerance.service';
import { environment } from 'src/environments/environment';
import { UpdatePartMPositionToleranceModel } from 'src/app/model/part-m-position-tolerance/update-part-m-position-tolerance-model';
import { AddPartMPositionToleranceModel } from 'src/app/model/part-m-position-tolerance/add-part-m-position-tolerance-model';
import { PartMPositionTolerance } from 'src/app/model/part-m-position-tolerance/part-m-position-tolerance';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Part } from 'src/app/model/part/part';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-part-m-position-tolerance-detail',
  templateUrl: './part-m-position-tolerance-detail.component.html',
  styleUrls: ['./part-m-position-tolerance-detail.component.css']
})
export class PartMPositionToleranceDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    lineNo: 'lineNo',
    iTCode: 'iTCode',
    uOM: 'uOM',
    spec: 'spec',
    upperLimit: 'upperLimit',
    lowerLimit: 'lowerLimit',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
    upperLimit1: 'upperLimit1',
    lowerLimit1: 'lowerLimit1',
    iTCode1: 'iTCode1',
    upperLimit2: 'upperLimit2',
    lowerLimit2: 'lowerLimit2',
    iTCode2: 'iTCode2',
    upperLimit3: 'upperLimit3',
    lowerLimit3: 'lowerLimit3',
    iTCode3: 'iTCode3',
    positionType: 'positionType',
    part: 'part'
  };
  data: Part[] = [];
  public partAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'partNo',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'partNo',
    format: '${value.partNo}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: PartMPositionToleranceService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PartMPositionTolerance();
    this.initForm();
    this.cancelRoute = '/Admin/PartMPositionTolerance';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartMPositionToleranceCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartMPositionToleranceCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartMPositionToleranceCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      part: new FormControl(null, [Validators.required]),
      spec: new FormControl(null),
      upperLimit: new FormControl(null),
      lowerLimit: new FormControl(null),
      accuracy: new FormControl(null),
      lowerLimit1: new FormControl(null),
      upperLimit2: new FormControl(null),
      lowerLimit2: new FormControl(null),
      upperLimit3: new FormControl(null),
      lowerLimit3: new FormControl(null),
      positionType: new FormControl(null),
      upperLimit1: new FormControl(null),
      lineNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      iTCode: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      uOM: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      sampleSize: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      iTCode1: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      iTCode2: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      iTCode3: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
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
      const partMPositionTolerance = new PartMPositionTolerance(data);

      this.formDetails = this.entity;
      this.entity = partMPositionTolerance;
      this.formInput.patchValue({
        id: partMPositionTolerance.id,
        lineNo: partMPositionTolerance.lineNo,
        iTCode: partMPositionTolerance.itCode,
        uOM: partMPositionTolerance.uom,
        spec: partMPositionTolerance.spec,
        upperLimit: partMPositionTolerance.upperLimit,
        lowerLimit: partMPositionTolerance.lowerLimit,
        accuracy: partMPositionTolerance.accuracy,
        sampleSize: partMPositionTolerance.sampleSize,
        upperLimit1: partMPositionTolerance.upperLimit1,
        lowerLimit1: partMPositionTolerance.lowerLimit1,
        iTCode1: partMPositionTolerance.itCode1,
        upperLimit2: partMPositionTolerance.upperLimit2,
        lowerLimit2: partMPositionTolerance.lowerLimit2,
        iTCode2: partMPositionTolerance.itCode2,
        upperLimit3: partMPositionTolerance.upperLimit3,
        lowerLimit3: partMPositionTolerance.lowerLimit3,
        iTCode3: partMPositionTolerance.itCode3,
        positionType: partMPositionTolerance.positionType,
        isEnabled: partMPositionTolerance.isEnabled,
        part: partMPositionTolerance.part
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartMPositionToleranceModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const updatePartMPositionToleranceModel = new UpdatePartMPositionToleranceModel();

    Automapper.map(this.entity, updatePartMPositionToleranceModel);
    updatePartMPositionToleranceModel.partNo = partNo.partNo;
    updatePartMPositionToleranceModel.uOM = this.formInput.controls[this.properties.uOM].value;
    updatePartMPositionToleranceModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    updatePartMPositionToleranceModel.iTCode = this.formInput.controls[this.properties.lineNo].value;
    updatePartMPositionToleranceModel.iTCode1 = this.formInput.controls[this.properties.iTCode1].value;
    updatePartMPositionToleranceModel.iTCode2 = this.formInput.controls[this.properties.iTCode2].value;
    updatePartMPositionToleranceModel.iTCode3 = this.formInput.controls[this.properties.iTCode3].value;
    updatePartMPositionToleranceModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    updatePartMPositionToleranceModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    updatePartMPositionToleranceModel.lowerLimit2 = this.formInput.controls[this.properties.lowerLimit2].value;
    updatePartMPositionToleranceModel.lowerLimit3 = this.formInput.controls[this.properties.lowerLimit3].value;
    return updatePartMPositionToleranceModel;
  }

  getAddModel(): AddPartMPositionToleranceModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const addPartMPositionToleranceModel = new AddPartMPositionToleranceModel();

    Automapper.map(this.entity, addPartMPositionToleranceModel);

    addPartMPositionToleranceModel.partNo = partNo.partNo;
    addPartMPositionToleranceModel.uOM = this.formInput.controls[this.properties.uOM].value;
    addPartMPositionToleranceModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    addPartMPositionToleranceModel.iTCode = this.formInput.controls[this.properties.lineNo].value;
    addPartMPositionToleranceModel.iTCode1 = this.formInput.controls[this.properties.iTCode1].value;
    addPartMPositionToleranceModel.iTCode2 = this.formInput.controls[this.properties.iTCode2].value;
    addPartMPositionToleranceModel.iTCode3 = this.formInput.controls[this.properties.iTCode3].value;
    addPartMPositionToleranceModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    addPartMPositionToleranceModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    addPartMPositionToleranceModel.lowerLimit2 = this.formInput.controls[this.properties.lowerLimit2].value;
    addPartMPositionToleranceModel.lowerLimit3 = this.formInput.controls[this.properties.lowerLimit3].value;

    return addPartMPositionToleranceModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }
  isPartModified() {
    return this.isModified(this.properties.part);
  }

  isPartEmpty() {
    return this.hasError(this.properties.part, ValidationErrorCodes.required);
  }

  isPartNoHasWhiteSpace() {
    return this.hasError(this.properties.part, ValidationErrorCodes.validateWhiteSpace);
  }

  isLineNoModified() {
    return this.isModified(this.properties.lineNo);
  }

  isLineNoEmpty() {
    return this.hasError(this.properties.lineNo, ValidationErrorCodes.required);
  }

  isLineNoHasWhiteSpace() {
    return this.hasError(this.properties.lineNo, ValidationErrorCodes.validateWhiteSpace);
  }

  isITCodeModified() {
    return this.isModified(this.properties.iTCode);
  }

  isITCodeEmpty() {
    return this.hasError(this.properties.iTCode, ValidationErrorCodes.required);
  }

  isITCodeHasWhiteSpace() {
    return this.hasError(this.properties.iTCode, ValidationErrorCodes.validateWhiteSpace);
  }

  isUOMModified() {
    return this.isModified(this.properties.uOM);
  }

  isUOMEmpty() {
    return this.hasError(this.properties.uOM, ValidationErrorCodes.required);
  }

  isUOMHasWhiteSpace() {
    return this.hasError(this.properties.uOM, ValidationErrorCodes.validateWhiteSpace);
  }

  isUpperLimitModified() {
    return this.isModified(this.properties.upperLimit);
  }

  isUpperLimitEmpty() {
    return this.hasError(this.properties.upperLimit, ValidationErrorCodes.required);
  }

  isUpperLimitHasWhiteSpace() {
    return this.hasError(this.properties.upperLimit, ValidationErrorCodes.validateWhiteSpace);
  }

  isLowerLimitModified() {
    return this.isModified(this.properties.lowerLimit);
  }

  isLowerLimitEmpty() {
    return this.hasError(this.properties.lowerLimit, ValidationErrorCodes.required);
  }

  isLowerLimitHasWhiteSpace() {
    return this.hasError(this.properties.lowerLimit, ValidationErrorCodes.validateWhiteSpace);
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
