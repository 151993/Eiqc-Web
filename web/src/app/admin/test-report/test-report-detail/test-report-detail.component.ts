/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { TestReportService } from 'src/app/services/test-report/test-report.service';
import { environment } from 'src/environments/environment';
import { UpdateTestReportModel } from 'src/app/model/test-report/update-test-report-model';
import { AddTestReportModel } from 'src/app/model/test-report/add-test-report-model';
import { TestReport } from 'src/app/model/test-report/test-report';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Commodity } from 'src/app/model/commodity/commodity';
import * as _ from 'lodash';

@Component({
  selector: 'app-test-report-detail',
  templateUrl: './test-report-detail.component.html',
  styleUrls: ['./test-report-detail.component.css']
})
export class TestReportDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    name: 'name',
    description: 'description',
    commodities: 'commodities'
  };
  testReport: TestReport;
  originalCommodityIds: number[];
  commodities: Commodity[];
  constructor(
    private formBuilder: FormBuilder,
    private apiService: TestReportService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.testReport = new TestReport();
    this.entity = this.testReport;
    this.initForm();
    this.cancelRoute = '/Admin/TestReport';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminTestReportCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminTestReportCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminTestReportCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      description: new FormControl(Constants.Empty,
        Validators.maxLength(250)
      ),
      commodities: new FormControl(Constants.Empty, Validators.required),
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
      setTimeout(() => {
        this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.testReport.name, this.properties.name));
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const testReport = new TestReport(data);

      this.formDetails = this.entity;
      this.entity = testReport;
      this.formInput.patchValue({
        id: testReport.id,
        name: testReport.name,
        description: testReport.description,
        commodities: testReport.commodities,
        isEnabled: testReport.isEnabled,
      });

      this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.testReport.name, this.properties.name));
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

      this.originalCommodityIds = JSON.parse(
        JSON.stringify(_.map(testReport.commodities, (x) => x.id))
      );
    });
  }

  getUpdateModel(): UpdateTestReportModel {
    const updateTestReportModel = new UpdateTestReportModel();
    Automapper.map(this.entity, updateTestReportModel);

    const commodityIds = _.map(
      this.formInput.controls[this.properties.commodities].value,
      this.properties.id
    );
    updateTestReportModel.addedCommodityIds = this.getAddedCommodityIds(commodityIds);
    updateTestReportModel.removedCommodityIds = this.getRemovedCommodityIds(commodityIds);

    return updateTestReportModel;
  }

  getAddModel(): AddTestReportModel {
    const addTestReportModel = new AddTestReportModel();
    Automapper.map(this.entity, addTestReportModel);

    const commodityIds = _.map(
      this.formInput.controls[this.properties.commodities].value,
      this.properties.id
    );
    addTestReportModel.addedCommodityIds = this.getAddedCommodityIds(commodityIds);
    return addTestReportModel;
  }

  getAddedCommodityIds(commodityIds: number[]) {
    const added = _.difference(commodityIds, this.originalCommodityIds);
    return added;
  }

  getRemovedCommodityIds(commodityIds: number[]) {
    const removed = _.difference(this.originalCommodityIds, commodityIds);
    return removed;
  }


  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isNameModified() {
    return this.isModified(this.properties.name);
  }

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }


  isNameExists() {
    return this.hasError(this.properties.name, ValidationErrorCodes.alreadyExists);
  }

  isNameHasWhiteSpace() {
    return this.hasError(this.properties.name, ValidationErrorCodes.validateWhiteSpace);
  }

  isCommoditiesEmpty() {
    return this.hasError(this.properties.commodities, ValidationErrorCodes.required);
  }

  isCommoditiesModified() {
    return this.isModified(this.properties.commodities);
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
