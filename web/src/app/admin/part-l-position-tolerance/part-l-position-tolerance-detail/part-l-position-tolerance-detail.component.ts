/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PartLPositionToleranceService } from 'src/app/services/part-l-position-tolerance/part-l-position-tolerance.service';
import { environment } from 'src/environments/environment';
import { UpdatePartLPositionToleranceModel } from 'src/app/model/part-l-position-tolerance/update-part-l-position-tolerance-model';
import { AddPartLPositionToleranceModel } from 'src/app/model/part-l-position-tolerance/add-part-l-position-tolerance-model';
import { PartLPositionTolerance } from 'src/app/model/part-l-position-tolerance/part-l-position-tolerance';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Part } from 'src/app/model/part/part';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-part-l-position-tolerance-detail',
  templateUrl: './part-l-position-tolerance-detail.component.html',
  styleUrls: ['./part-l-position-tolerance-detail.component.css']
})
export class PartLPositionToleranceDetailComponent extends BaseDetailComponent
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
    private apiService: PartLPositionToleranceService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PartLPositionTolerance();
    this.initForm();
    this.cancelRoute = '/Admin/PartLPositionTolerance';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartLPositionToleranceCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartLPositionToleranceCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartLPositionToleranceCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      part: new FormControl(null, [Validators.required]),
      spec : new FormControl(null),
      upperLimit : new FormControl(null),
      lowerLimit : new FormControl(null),
      accuracy : new FormControl(null),
      lowerLimit1 : new FormControl(null),
      upperLimit2 : new FormControl(null),
      lowerLimit2 : new FormControl(null),
      upperLimit3 : new FormControl(null),
      lowerLimit3 : new FormControl(null),
      positionType : new FormControl(null),
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
      const partLPositionTolerance = new PartLPositionTolerance(data);

      this.formDetails = this.entity;
      this.entity = partLPositionTolerance;
      this.formInput.patchValue({
        id: partLPositionTolerance.id,
        lineNo: partLPositionTolerance.lineNo,
        iTCode: partLPositionTolerance.itCode,
        uOM: partLPositionTolerance.uom,
        spec: partLPositionTolerance.spec,
        upperLimit: partLPositionTolerance.upperLimit,
        lowerLimit: partLPositionTolerance.lowerLimit,
        accuracy: partLPositionTolerance.accuracy,
        sampleSize: partLPositionTolerance.sampleSize,
        upperLimit1: partLPositionTolerance.upperLimit1,
        lowerLimit1: partLPositionTolerance.lowerLimit1,
        iTCode1: partLPositionTolerance.itCode1,
        upperLimit2: partLPositionTolerance.upperLimit2,
        lowerLimit2: partLPositionTolerance.lowerLimit2,
        iTCode2: partLPositionTolerance.itCode2,
        upperLimit3: partLPositionTolerance.upperLimit3,
        lowerLimit3: partLPositionTolerance.lowerLimit3,
        iTCode3: partLPositionTolerance.itCode3,
        positionType: partLPositionTolerance.positionType,
        part: partLPositionTolerance.part,

        isEnabled: partLPositionTolerance.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartLPositionToleranceModel {

    const part = this.formInput.controls[this.properties.part].value as Part;

    const updatePartLPositionToleranceModel = new UpdatePartLPositionToleranceModel();

    Automapper.map(this.entity, updatePartLPositionToleranceModel);
    updatePartLPositionToleranceModel.partNo = part.partNo;
    updatePartLPositionToleranceModel.uOM = this.formInput.controls[this.properties.uOM].value;
    updatePartLPositionToleranceModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    updatePartLPositionToleranceModel.iTCode = this.formInput.controls[this.properties.lineNo].value;
    updatePartLPositionToleranceModel.iTCode1 = this.formInput.controls[this.properties.iTCode1].value;
    updatePartLPositionToleranceModel.iTCode2 = this.formInput.controls[this.properties.iTCode2].value;
    updatePartLPositionToleranceModel.iTCode3 = this.formInput.controls[this.properties.iTCode3].value;
    updatePartLPositionToleranceModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    updatePartLPositionToleranceModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    updatePartLPositionToleranceModel.lowerLimit2 = this.formInput.controls[this.properties.lowerLimit2].value;
    updatePartLPositionToleranceModel.lowerLimit3 = this.formInput.controls[this.properties.lowerLimit3].value;

    return updatePartLPositionToleranceModel;
  }

  getAddModel(): AddPartLPositionToleranceModel {

    const part = this.formInput.controls[this.properties.part].value as Part;

    const addPartLPositionToleranceModel = new AddPartLPositionToleranceModel();

    Automapper.map(this.entity, addPartLPositionToleranceModel);

    addPartLPositionToleranceModel.partNo = part.partNo;
    addPartLPositionToleranceModel.uOM = this.formInput.controls[this.properties.uOM].value;
    addPartLPositionToleranceModel.lineNo = this.formInput.controls[this.properties.lineNo].value;
    addPartLPositionToleranceModel.iTCode = this.formInput.controls[this.properties.lineNo].value;
    addPartLPositionToleranceModel.iTCode1 = this.formInput.controls[this.properties.iTCode1].value;
    addPartLPositionToleranceModel.iTCode2 = this.formInput.controls[this.properties.iTCode2].value;
    addPartLPositionToleranceModel.iTCode3 = this.formInput.controls[this.properties.iTCode3].value;
    addPartLPositionToleranceModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    addPartLPositionToleranceModel.lowerLimit1 = this.formInput.controls[this.properties.lowerLimit1].value;
    addPartLPositionToleranceModel.lowerLimit2 = this.formInput.controls[this.properties.lowerLimit2].value;
    addPartLPositionToleranceModel.lowerLimit3 = this.formInput.controls[this.properties.lowerLimit3].value;




    return addPartLPositionToleranceModel;
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
