/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PartMicrosectionService } from 'src/app/services/part-microsection/part-microsection.service';
import { environment } from 'src/environments/environment';
import { UpdatePartMicrosectionModel } from 'src/app/model/part-microsection/update-part-microsection-model';
import { AddPartMicrosectionModel } from 'src/app/model/part-microsection/add-part-microsection-model';
import { PartMicrosection } from 'src/app/model/part-microsection/part-microsection';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Part } from 'src/app/model/part/part';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-part-microsection-detail',
  templateUrl: './part-microsection-detail.component.html',
  styleUrls: ['./part-microsection-detail.component.css']
})
export class PartMicrosectionDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    part: 'part',
    parameterName: 'parameterName',
    iTCode: 'iTCode',
    uOM: 'uOM',
    normalValue: 'normalValue',
    upperLimit: 'upperLimit',
    lowerLimit: 'lowerLimit',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
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
    private apiService: PartMicrosectionService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PartMicrosection();
    this.initForm();
    this.cancelRoute = '/Admin/PartMicrosection';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartMicrosectionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartMicrosectionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartMicrosectionCanCreate;

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
      const partMicrosection = new PartMicrosection(data);

      this.formDetails = this.entity;
      this.entity = partMicrosection;
      this.formInput.patchValue({
        id: partMicrosection.id,
        parameterName: partMicrosection.parameterName,
        iTCode: partMicrosection.itCode,
        uOM: partMicrosection.uom,
        normalValue: partMicrosection.normalValue,
        upperLimit: partMicrosection.upperLimit,
        lowerLimit: partMicrosection.lowerLimit,
        accuracy: partMicrosection.accuracy,
        sampleSize: partMicrosection.sampleSize,
        isEnabled: partMicrosection.isEnabled,
        part: partMicrosection.part,

      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartMicrosectionModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const updatePartMicrosectionModel = new UpdatePartMicrosectionModel();

    Automapper.map(this.entity, updatePartMicrosectionModel);
    updatePartMicrosectionModel.partNo = partNo.partNo;
    updatePartMicrosectionModel.uOM = this.formInput.controls[this.properties.uOM].value;
    updatePartMicrosectionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
    updatePartMicrosectionModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    updatePartMicrosectionModel.upperLimit = this.formInput.controls[this.properties.upperLimit].value;
    return updatePartMicrosectionModel;
  }

  getAddModel(): AddPartMicrosectionModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const addPartMicrosectionModel = new AddPartMicrosectionModel();

    Automapper.map(this.entity, addPartMicrosectionModel);

    addPartMicrosectionModel.partNo = partNo.partNo;
    addPartMicrosectionModel.uOM = this.formInput.controls[this.properties.uOM].value;
    addPartMicrosectionModel.iTCode = this.formInput.controls[this.properties.iTCode].value;
    addPartMicrosectionModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    addPartMicrosectionModel.upperLimit = this.formInput.controls[this.properties.upperLimit].value;

    return addPartMicrosectionModel;
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
