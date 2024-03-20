/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormMicroSectionService } from 'src/app/services/form-micro-section/form-micro-section.service';
import { environment } from 'src/environments/environment';
import { UpdateFormMicroSectionModel } from 'src/app/model/form-micro-section/update-form-micro-section-model';
import { AddFormMicroSectionModel } from 'src/app/model/form-micro-section/add-form-micro-section-model';
import { FormMicroSection } from 'src/app/model/form-micro-section/form-micro-section';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { Instrument } from 'src/app/model/instrument/instrument';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-micro-section-detail',
  templateUrl: './form-micro-section-detail.component.html',
  styleUrls: ['./form-micro-section-detail.component.css']
})
export class FormMicroSectionDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    parameterName: 'parameterName',
    instrument: 'instrument',
    uOM: 'uOM',
    normalValue: 'normalValue',
    upperLimit: 'upperLimit',
    lowerLimit: 'lowerLimit',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
  };
  data: Form[] = [];
  public formAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'dateCode',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'dateCode',
    format: '${value.dateCode}',
  };
  data1: Instrument[] = [];
  public instrumentAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'desc',
    minLength: '1',
    suggestions: this.data1,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'desc',
    format: '${value.desc}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: FormMicroSectionService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormMicroSection();
    this.initForm();
    this.cancelRoute = '/Admin/FormMicroSection';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormMicroSectionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormMicroSectionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormMicroSectionCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      normalValue: new FormControl(null),
      upperLimit: new FormControl(null),
      lowerLimit: new FormControl(null),
      accuracy: new FormControl(null),

      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),

      instrument: new FormControl(null),
      uOM: new FormControl(Constants.Empty, [
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      sampleSize: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
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
      const formMicroSection = new FormMicroSection(data);

      this.formDetails = this.entity;
      this.entity = formMicroSection;
      this.formInput.patchValue({
        id: formMicroSection.id,
        form: formMicroSection.form,
        parameterName: formMicroSection.parameterName,
        instrument: formMicroSection.instrument,
        uOM: formMicroSection.uom,
        normalValue: formMicroSection.normalValue,
        upperLimit: formMicroSection.upperLimit,
        lowerLimit: formMicroSection.lowerLimit,
        accuracy: formMicroSection.accuracy,
        sampleSize: formMicroSection.sampleSize,
        isEnabled: formMicroSection.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormMicroSectionModel {

    const form = this.formInput.controls[this.properties.form].value as Form;
    const instrument = this.formInput.controls[this.properties.instrument].value as Instrument;

    const updateFormMicroSectionModel = new UpdateFormMicroSectionModel();

    Automapper.map(this.entity, updateFormMicroSectionModel);
    updateFormMicroSectionModel.formId = form.id;
    updateFormMicroSectionModel.instrumentId = instrument.id;

    updateFormMicroSectionModel.uOM = this.formInput.controls[this.properties.uOM].value;
    updateFormMicroSectionModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;
    return updateFormMicroSectionModel;
  }

  getAddModel(): AddFormMicroSectionModel {

    const form = this.formInput.controls[this.properties.form].value as Form;
    const instrument = this.formInput.controls[this.properties.instrument].value as Instrument;

    const addFormMicroSectionModel = new AddFormMicroSectionModel();

    Automapper.map(this.entity, addFormMicroSectionModel);

    addFormMicroSectionModel.formId = form.id;
    addFormMicroSectionModel.instrumentId = instrument.id;
    addFormMicroSectionModel.uOM = this.formInput.controls[this.properties.uOM].value;
    addFormMicroSectionModel.lowerLimit = this.formInput.controls[this.properties.lowerLimit].value;

    return addFormMicroSectionModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isFormModified() {
    return this.isModified(this.properties.form);
  }

  isformEmpty() {
    return this.hasError(this.properties.form, ValidationErrorCodes.required);
  }

  isformHasWhiteSpace() {
    return this.hasError(this.properties.form, ValidationErrorCodes.validateWhiteSpace);
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
