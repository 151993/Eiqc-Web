/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormTestReportService } from 'src/app/services/form-test-report/form-test-report.service';
import { environment } from 'src/environments/environment';
import { UpdateFormTestReportModel } from 'src/app/model/form-test-report/update-form-test-report-model';
import { AddFormTestReportModel } from 'src/app/model/form-test-report/add-form-test-report-model';
import { FormTestReport } from 'src/app/model/form-test-report/form-test-report';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-test-report-detail',
  templateUrl: './form-test-report-detail.component.html',
  styleUrls: ['./form-test-report-detail.component.css']
})
export class FormTestReportDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    parameterName: 'parameterName',
    resultExpected: 'resultExpected',
    testCondition: 'testCondition',
    resultActual: 'resultActual',
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
  constructor(
    private formBuilder: FormBuilder,
    private apiService: FormTestReportService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormTestReport();
    this.initForm();
    this.cancelRoute = '/Admin/FormTestReport';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormTestReportCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormTestReportCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormTestReportCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      resultExpected: new FormControl(null),
      resultActual: new FormControl(null),

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
      const formTestReport = new FormTestReport(data);

      this.formDetails = this.entity;
      this.entity = formTestReport;
      this.formInput.patchValue({
        id: formTestReport.id,
        form: formTestReport.form,
        parameterName: formTestReport.parameterName,
        resultExpected: formTestReport.resultExpected,
        testCondition: formTestReport.testCondition,
        resultActual: formTestReport.resultActual,
        isEnabled: formTestReport.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormTestReportModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormTestReportModel = new UpdateFormTestReportModel();

    Automapper.map(this.entity, updateFormTestReportModel);
    updateFormTestReportModel.formId = form.id;
    return updateFormTestReportModel;
  }

  getAddModel(): AddFormTestReportModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormTestReportModel = new AddFormTestReportModel();

    Automapper.map(this.entity, addFormTestReportModel);

    addFormTestReportModel.formId = form.id;

    return addFormTestReportModel;
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
