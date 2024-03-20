/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormCountParameterService } from 'src/app/services/form-count-parameter/form-count-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateFormCountParameterModel } from 'src/app/model/form-count-parameter/update-form-count-parameter-model';
import { AddFormCountParameterModel } from 'src/app/model/form-count-parameter/add-form-count-parameter-model';
import { FormCountParameter } from 'src/app/model/form-count-parameter/form-count-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { InspectionTools } from 'src/app/model/inspection-tools/inspection-tools';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-form-count-parameter-detail',
  templateUrl: './form-count-parameter-detail.component.html',
  styleUrls: ['./form-count-parameter-detail.component.css']
})
export class FormCountParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    form: 'form',
    parameterName: 'parameterName',
    failedQTYExpected: 'failedQTYExpected',
    failedQTYActual: 'failedQTYActual',
    inspectionTools: 'inspectionTools',
    remark: 'remark',
    inspectionDetails: 'inspectionDetails',

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
  data1: InspectionTools[] = [];
  public inspectionToolAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'iToolsName',
    minLength: '1',
    suggestions: this.data1,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'iToolsName',
    format: '${value.iToolsName}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: FormCountParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormCountParameter();
    this.initForm();
    this.cancelRoute = '/Admin/FormCountParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormCountParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormCountParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormCountParameterCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),

      inspectionTools: new FormControl(null),
      remark: new FormControl(Constants.Empty, [
        Validators.maxLength(4000),
        validateWhiteSpace
      ]),
      inspectionDetails: new FormControl(Constants.Empty, [
        Validators.maxLength(4000),
        validateWhiteSpace
      ]),
      failedQTYExpected: new FormControl(null),
      failedQTYActual: new FormControl(null),
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
      const formCountParameter = new FormCountParameter(data);

      this.formDetails = this.entity;
      this.entity = formCountParameter;
      this.formInput.patchValue({
        id: formCountParameter.id,
        form: formCountParameter.form,
        parameterName: formCountParameter.parameterName,
        failedQTYExpected: formCountParameter.failedQTYExpected,
        failedQTYActual: formCountParameter.failedQTYActual,
        inspectionTools: formCountParameter.inspectionTools,
        remark: formCountParameter.remark,
        inspectionDetails: formCountParameter.inspectionDetails,

        isEnabled: formCountParameter.isEnabled,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormCountParameterModel {


    const form = this.formInput.controls[this.properties.form].value as Form;
    const inspectionTools = this.formInput.controls[this.properties.inspectionTools].value as InspectionTools;


    const updateFormCountParameterModel = new UpdateFormCountParameterModel();

    Automapper.map(this.entity, updateFormCountParameterModel);
    updateFormCountParameterModel.formId = form.id;
    updateFormCountParameterModel.inspectionToolsId = inspectionTools.id;


    return updateFormCountParameterModel;
  }

  getAddModel(): AddFormCountParameterModel {


    const form = this.formInput.controls[this.properties.form].value as Form;
    const inspectionTools = this.formInput.controls[this.properties.inspectionTools].value as InspectionTools;

    const addFormCountParameterModel = new AddFormCountParameterModel();

    Automapper.map(this.entity, addFormCountParameterModel);

    addFormCountParameterModel.formId = form.id;
    addFormCountParameterModel.inspectionToolsId = inspectionTools.id;


    return addFormCountParameterModel;
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
