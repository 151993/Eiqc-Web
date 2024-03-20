/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PartMeasurementParameterService } from 'src/app/services/part-measurement-parameter/part-measurement-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdatePartMeasurementParameterModel } from 'src/app/model/part-measurement-parameter/update-part-measurement-parameter-model';
import { AddPartMeasurementParameterModel } from 'src/app/model/part-measurement-parameter/add-part-measurement-parameter-model';
import { PartMeasurementParameter } from 'src/app/model/part-measurement-parameter/part-measurement-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Part } from 'src/app/model/part/part';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-part-measurement-parameter-detail',
  templateUrl: './part-measurement-parameter-detail.component.html',
  styleUrls: ['./part-measurement-parameter-detail.component.css']
})
export class PartMeasurementParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    parameterName: 'parameterName',
    iTCode: 'iTCode',
    uOM: 'uOM',
    normalValue: 'normalValue',
    upperLimit: 'upperLimit',
    lowerLimit: 'lowerLimit',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
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
    private apiService: PartMeasurementParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PartMeasurementParameter();
    this.initForm();
    this.cancelRoute = '/Admin/PartMeasurementParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartMeasurementParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartMeasurementParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartMeasurementParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      part: new FormControl(null, [Validators.required]),
      upperLimit: new FormControl(null),
      lowerLimit: new FormControl(null),
      normalValue: new FormControl(null),
      sampleSize: new FormControl(null),



      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
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
      const partMeasurementParameter = new PartMeasurementParameter(data);

      this.formDetails = this.entity;
      this.entity = partMeasurementParameter;
      this.formInput.patchValue({
        id: partMeasurementParameter.id,
        parameterName: partMeasurementParameter.parameterName,
        iTCode: partMeasurementParameter.itCode,
        uOM: partMeasurementParameter.uom,
        normalValue: partMeasurementParameter.normalValue,
        upperLimit: partMeasurementParameter.upperLimit,
        lowerLimit: partMeasurementParameter.lowerLimit,
        accuracy: partMeasurementParameter.accuracy,
        sampleSize: partMeasurementParameter.sampleSize,
        isEnabled: partMeasurementParameter.isEnabled,
        part: partMeasurementParameter.part
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartMeasurementParameterModel {
    const partNo = this.formInput.controls[this.properties.part].value as Part;


    const updatePartMeasurementParameterModel = new UpdatePartMeasurementParameterModel();

    Automapper.map(this.entity, updatePartMeasurementParameterModel);
    updatePartMeasurementParameterModel.partNo = partNo.partNo;
    updatePartMeasurementParameterModel.uOM = this.formInput.controls[this.properties.uOM].value;
    updatePartMeasurementParameterModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
    updatePartMeasurementParameterModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    updatePartMeasurementParameterModel.upperLimit = this.formInput.controls[this.properties.upperLimit].value;
    return updatePartMeasurementParameterModel;
  }

  getAddModel(): AddPartMeasurementParameterModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const addPartMeasurementParameterModel = new AddPartMeasurementParameterModel();

    Automapper.map(this.entity, addPartMeasurementParameterModel);

    addPartMeasurementParameterModel.partNo = partNo.partNo;
    addPartMeasurementParameterModel.uOM = this.formInput.controls[this.properties.uOM].value;
    addPartMeasurementParameterModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
    addPartMeasurementParameterModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    addPartMeasurementParameterModel.upperLimit = this.formInput.controls[this.properties.upperLimit].value;

    return addPartMeasurementParameterModel;
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
  isParameterNameModified() {
    return this.isModified(this.properties.parameterName);
  }

  isParameterNameEmpty() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.required);
  }

  isParameterNameHasWhiteSpace() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.validateWhiteSpace);
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
