/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PartTestReportParameterService } from 'src/app/services/part-test-report-parameter/part-test-report-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdatePartTestReportParameterModel } from 'src/app/model/part-test-report-parameter/update-part-test-report-parameter-model';
import { AddPartTestReportParameterModel } from 'src/app/model/part-test-report-parameter/add-part-test-report-parameter-model';
import { PartTestReportParameter } from 'src/app/model/part-test-report-parameter/part-test-report-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Part } from 'src/app/model/part/part';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-part-test-report-parameter-detail',
  templateUrl: './part-test-report-parameter-detail.component.html',
  styleUrls: ['./part-test-report-parameter-detail.component.css']
})
export class PartTestReportParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    parameterName: 'parameterName',
    resultExpected: 'resultExpected',
    testCondition: 'testCondition',
    resultActual: 'resultActual',
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
    private apiService: PartTestReportParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PartTestReportParameter();
    this.initForm();
    this.cancelRoute = '/Admin/PartTestReportParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartTestReportParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartTestReportParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartTestReportParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      part: new FormControl(null, [Validators.required]),
      resultExpected: new FormControl(true),
      resultActual: new FormControl(true),

      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      testCondition: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
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
      const partTestReportParameter = new PartTestReportParameter(data);

      this.formDetails = this.entity;
      this.entity = partTestReportParameter;
      this.formInput.patchValue({
        id: partTestReportParameter.id,
        parameterName: partTestReportParameter.parameterName,
        resultExpected: partTestReportParameter.resultExpected,
        testCondition: partTestReportParameter.testCondition,
        resultActual: partTestReportParameter.resultActual,
        part: partTestReportParameter.part,
        isEnabled: partTestReportParameter.isEnabled,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartTestReportParameterModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;



    const updatePartTestReportParameterModel = new UpdatePartTestReportParameterModel();

    Automapper.map(this.entity, updatePartTestReportParameterModel);
    updatePartTestReportParameterModel.partNo = partNo.partNo;


    return updatePartTestReportParameterModel;
  }

  getAddModel(): AddPartTestReportParameterModel {


    const partNo = this.formInput.controls[this.properties.part].value as Part;


    const addPartTestReportParameterModel = new AddPartTestReportParameterModel();

    Automapper.map(this.entity, addPartTestReportParameterModel);


    addPartTestReportParameterModel.partNo = partNo.partNo;


    return addPartTestReportParameterModel;
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

  isResultExpectedModified() {
    return this.isModified(this.properties.resultExpected);
  }

  isResultExpectedEmpty() {
    return this.hasError(this.properties.resultExpected, ValidationErrorCodes.required);
  }

  isResultExpectedHasWhiteSpace() {
    return this.hasError(this.properties.resultExpected, ValidationErrorCodes.validateWhiteSpace);
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
