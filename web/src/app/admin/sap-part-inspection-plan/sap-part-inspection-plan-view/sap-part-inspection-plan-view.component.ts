import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { Attachment } from 'src/app/model/attachment/attachment';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { SAPSamplingPlanModel } from 'src/app/model/sap-models/sap-sampling-plan-model';
import { SAPSupplierDetailModel } from 'src/app/model/sap-models/sap-supplier-detail-model';
import { ApproveRejectSAPPartInspectionPlanModel } from 'src/app/model/sap-part-inspection-plan/approve-reject-sap-part-inspection-plan-model';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { MyTasksService } from 'src/app/services/my-tasks/my-tasks.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Constants, dataTypes, PartPlanStateType, resultExpected, UserType } from 'src/app/shared/constant/global';
import { specType, tabConfiguration, TabType, Unit, ValidationErrorCodes, YesNoOptions, yesNoOptions } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { SAPPartInspectionPlanService } from 'src/app/services/sap-part-inspection-plan/sap-part-inspection-plan.service';
import { PartDrawingModel } from 'src/app/model/sap-part-inspection-plan/part-drawing-model';
import { PartSpecModel } from 'src/app/model/sap-part-inspection-plan/part-spec-model';
import { PartDrawingLabelModel } from 'src/app/model/sap-part-inspection-plan/part-drawing-label-model';
import { PartSpecLabelModel } from 'src/app/model/sap-part-inspection-plan/part-spec-label-model';
import { PartCountParameterLabelModel } from 'src/app/model/sap-part-inspection-plan/part-count-parameter/part-count-parameter-label-model';
import { PartResultOrientedParameterLabelModel } from 'src/app/model/sap-part-inspection-plan/part-result-oriented-parameter/part-result-oriented-parameter-label-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { PartDateCode } from 'src/app/model/part-date-code/part-date-code';
import { ParameterManagementService } from 'src/app/services/parameter-management/parameter-management.service';
import * as _ from 'lodash';
import { FunParameterModel } from 'src/app/model/sap-part-inspection-plan/fun-parameter/fun-parameter-model';
import { MeasurementParameterModel } from 'src/app/model/sap-part-inspection-plan/measurement-parameter/measurement-parameter-model';
import { PartTestReportParameterService } from 'src/app/services/part-test-report-parameter/part-test-report-parameter.service';
import { TestReportAttachment } from 'src/app/model/test-report-attachment/test-report-attachment';
import { MicroSectionParameterModel } from 'src/app/model/sap-part-inspection-plan/micro-section-parameter/micro-section-parameter-model';
import { MPositionToleranceModel } from 'src/app/model/sap-part-inspection-plan/m-position-tolerance/m-position-tolerance-model';
import { LPositionToleranceModel } from 'src/app/model/sap-part-inspection-plan/l-position-tolerance/l-position-tolerance-model';
import { SAPPartInspectionPlanComments } from 'src/app/model/sap-part-inspection-plan-comments/sap-part-inspection-plan-comments';
import { PartDrawingViewComponent } from '../part-drawing-view/part-drawing-view.component';
import { PartDrawingService } from 'src/app/services/part-drawing/part-drawing.service';
import { PartSpecViewComponent } from '../part-spec-view/part-spec-view.component';
import { PartSpecificationService } from 'src/app/services/part-specification/part-specification.service';
import { PartTestReportTab } from 'src/app/model/part-test-report/part-test-report-tab-model';
import { PartTestReportTabLabel } from 'src/app/model/part-test-report/part-test-report-tab-label-model';
import { PartTestReportAttachmentViewComponent } from '../part-test-report-attachment-view/part-test-report-attachment-view.component';

@Component({
  selector: 'app-sap-part-inspection-plan-view',
  templateUrl: './sap-part-inspection-plan-view.component.html',
  styleUrls: ['./sap-part-inspection-plan-view.component.css']
})
export class SapPartInspectionPlanViewComponent extends BaseDetailComponent implements OnInit {
  @Output() public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  sapPartInspectionPlan: SAPPartInspectionPlan;
  properties = {
    comment: 'comment',
    ismpnMatched: 'ismpnMatched',
    drawingFiles: 'drawingFiles',
    uploadSpecFiles: 'uploadSpecFiles',
  };

  dataTypeResult: Record<string, any[]> = {};

  //#region Drawing Section
  displayDrawingColumns: any;
  drawingDetails: PartDrawingModel[];
  drawingDetail = new PartDrawingModel();
  //#endregion Drawing Section

  //#region Specification Section
  displaySpecificationColumns: any;
  specificationDetails: PartSpecModel[];
  specificationDetail = new PartSpecModel();
  //#endregion Specification Section
  //#region BowTwist Section
  bowTwistTitles: any[] = [];
  specType: string;
  dataTypeList: any[];
  unitEnum = Unit;
  //#endregion BowTwist Section

  detail: any;
  isDCCTask: boolean;
  isSubmitted = true;
  isViewPlan = true;
  stateTypeId: number;
  testReportTabId: number;
  measurementParameterId: number;
  funParameterId: number;
  yesNoId: number;
  supplierDetails: SAPSupplierDetailModel[] = [];
  supplierDetailColumns = [
    { field: 'supplierName', header: 'SupplierName', isVisible: true },
    { field: 'supplierPhoneNumber', header: 'SupplierPhoneNumber', isVisible: true },
    { field: 'supplierEmail', header: 'SupplierEmail', isVisible: true }
  ];
  samplingPlans: SAPSamplingPlanModel[];
  samplingPlanColumns = [
    { field: 'mstrChar', header: 'MasterInspectionCharacteristic', isVisible: true },
    { field: 'smplProc', header: 'SamplingProcedure', isVisible: true }
  ];
  adminCertificationList: string;
  uploadSpecFiles: FileUpload[] = [];
  drawingFiles: FileUpload[] = [];
  uploadCertificationFiles: FileUpload[] = [];
  drawingAttachments: Attachment[] = [];
  uploadSpecAttachments: Attachment[] = [];
  uploadCertificationAttachments: Attachment[] = [];
  YesNoOptions: any;
  YesAndNoConfiguration: any;
  ismpnMatched: boolean;
  yesNoList: any;
  countParameters: PartCountParameterLabelModel[] = [];
  countParameterColumns: any;
  countParameter = new PartCountParameterLabelModel();
  funParameters: FunParameterModel[] = [];
  measurementParameters: MeasurementParameterModel[] = [];
  testReportTabDetails: PartTestReportTab[];
  microSectionParameters: MicroSectionParameterModel[] = [];
  microSectionParameter = new MicroSectionParameterModel();

  resultOrientedTabDetails: PartResultOrientedParameterLabelModel[] = [];
  resultOrientedtColumns: any;
  resultOrientedTabDetail = new PartResultOrientedParameterLabelModel();
  partTestReportAttachments: TestReportAttachment[];


  mPositionTolerances: MPositionToleranceModel[] = [];
  lPositionTolerances: LPositionToleranceModel[] = [];
  partCommentDetails: SAPPartInspectionPlanComments[];

  isResultOrientedExpanded: boolean;
  isCountParameterExpanded: boolean;
  isDateCodeExpanded: boolean;
  isBowTwistExpanded: boolean;
  isMeasurementExpanded: boolean;
  isTestReportExpanded: boolean;
  isFUNParameterExpanded: boolean;
  isMicroSectionExpanded: boolean;
  isMPositionToleranceExpanded: boolean;
  isLPositionToleranceExpanded: boolean;

  countParameterTabId: number;
  resultOrientedParameterTabId: number;
  dateCodeParameterTabId: number;
  tabConfig: any[];
  testReportParameterId: any;
  testReportId: any;
  savePath = 'sap-part-inspection-plan';
  testReportSavePath = 'part-inspection-test-report';
  displayTestReportColumns: any;
  microSectionParameterTabId: number;
  bowTwistParameterTabId: number;
  mPositionToleranceParameterTabId: number;
  lPositionToleranceParameterTabId: number;

  funMicroMeasurementParameterColumns: any;
  microSectionParameterColumns: any;
  mPositionToleranceColumns: any;
  lPositionToleranceColumns: any;
  isVisibleSection: boolean;
  isApprovedRejectVisible: boolean;
  isApprovedInspectionPlan = true;
  constructor(private formBuilder: FormBuilder,
    private _apiService: MyTasksService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    public _router: Router,
    authService: AuthService,
    private activeModal: NgbActiveModal,
    private attachmentService: AttachmentService,
    private sapPartInspectionPlanService: SAPPartInspectionPlanService,
    private _parameterManagementService: ParameterManagementService,
    private partTestReportParameterService: PartTestReportParameterService,
    private partInspectionDrawingService: PartDrawingService,
    private partInspectionSpecificationService: PartSpecificationService,
  ) {
    super(
      modalService,
      activatedRoute,
      _router,
      notificationService,
      authService,
      _apiService
    );
    this.initForm();

    this.cancelRoute = this.isDCCTask ? '/DCCTasks' : '/SQETasks';
    this.canAccessPermissionType = PermissionType.AdminSAPPartInspectionPlanCanAccess;
    this.canCreatPermissionType = PermissionType.AdminSAPPartInspectionPlanCanCreate;

    this.displayTestReportColumns = (new PartTestReportTabLabel()).displayColumns();
    this.displayDrawingColumns = (new PartDrawingLabelModel()).displayColumns();
    this.displaySpecificationColumns = (new PartSpecLabelModel()).displayColumns();
    this.countParameterColumns = (new PartCountParameterLabelModel()).displayColumns();
    this.resultOrientedtColumns = (new PartResultOrientedParameterLabelModel()).displayColumns();
    this.initializeDrawingSpecTable();
  }


  initializeDrawingSpecTable() {
    this.drawingDetails = [];
    this.specificationDetails = [];
    this.drawingDetails.push(this.drawingDetail);
    this.specificationDetails.push(this.specificationDetail);
  }

  ngOnInit(): void {
    this.yesNoList = yesNoOptions;
    this.yesNoId = this.detail.ismpnMatched ? YesNoOptions.Yes : YesNoOptions.No;
    this.sapPartInspectionPlan = new SAPPartInspectionPlan(this.detail);
    if (this.isDCCTask) {
      this.recId = this.detail.id;
      this.canUpdatePermissionType = PermissionType.AdminDCCTaskCanUpdate;
    }
    super.ngOnInit();
    this.specificationDetails = [];
    this.specificationDetails = this.sapPartInspectionPlanService.setSpecProperties(this.sapPartInspectionPlan, this.authService.retrieveUser().id);
    this.drawingDetails = [];
    this.drawingDetails = this.sapPartInspectionPlanService.setDrawingProperties(this.sapPartInspectionPlan, this.authService.retrieveUser().id);

    this.ismpnMatched = this.detail.ismpnMatched;
    this.formDetails = this.entity;
    this.entity = this.sapPartInspectionPlan;
    this.getCommonColumnsTabs();
    this.getSamplingPlanDetails();
    this.getSupplierDetails();
    this.adminCertificationDetails();
    this.getFiles();
    this.initializeTabExpandedSetting();
    this.initializeTabIds();
    this.initializeDateCodeTabControls();
    this.getTabConfigurationData(this.sapPartInspectionPlan, this.sapPartInspectionPlan.commodityId);

    this.getPartComments();
    this.visibleSectionByState();
  }


  getPartComments() {
    this.partCommentDetails = [];
    const timezone = JSON.parse(localStorage.getItem('timezone'));
    this.partCommentDetails = this.sapPartInspectionPlanService.setPartCommentDetails(this.sapPartInspectionPlan, timezone);
  }

  visibleSectionByState() {
    const currentUser = this.authService.retrieveUser();
    if (currentUser.userTypeId === UserType.Supplier) {
      this.isVisibleSection = false;
    } else if (currentUser.userTypeId === UserType.User && this.isApprovedRejectVisible) {
      this.isVisibleSection = true;
      this.isApprovedInspectionPlan = this.isApprovedInspectionPlan ? true : false;
    } else if (currentUser.userTypeId === UserType.DCC && this.isApprovedRejectVisible) {
      this.isVisibleSection = true;
    } else {
      this.isVisibleSection = false;
    }
  }

  getCommonColumnsTabs() {
    this.funMicroMeasurementParameterColumns = this.sapPartInspectionPlanService.funMicroMeasurementParameterColumns;
    this.microSectionParameterColumns = this.sapPartInspectionPlanService.microSectionParameterColumns;
    this.mPositionToleranceColumns = this.sapPartInspectionPlanService.mPositionToleranceColumns;
    this.lPositionToleranceColumns = this.sapPartInspectionPlanService.lPositionToleranceColumns;
  }

  initializeTabIds() {
    this.testReportTabId = TabType.TestReport;
    this.measurementParameterId = TabType.Measurement;
    this.funParameterId = TabType.FUN;
    this.countParameterTabId = TabType.Count;
    this.microSectionParameterTabId = TabType.MicroSection;
    this.dateCodeParameterTabId = TabType.DateCode;
    this.resultOrientedParameterTabId = TabType.ResultOriented;
    this.bowTwistParameterTabId = TabType.BowAndTwist;
    this.mPositionToleranceParameterTabId = TabType.MPositionTolerance;
    this.lPositionToleranceParameterTabId = TabType.LPositionTolerance;
  }

  initializeDateCodeTabControls() {
    this.sapPartInspectionPlan.partDateCode = new PartDateCode();
    this.sapPartInspectionPlan.partDateCode.manufactureDate = null;
    this.sapPartInspectionPlan.partDateCode.shelfLifeMonths = null;
    this.sapPartInspectionPlan.partDateCode.manufactureDCWeeks = null;
    this.sapPartInspectionPlan.partDateCode.manufactureDCYears = null;
    this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate = null;
    this.sapPartInspectionPlan.partDateCode.dateCodeDetails = null;
    this.sapPartInspectionPlan.partDateCode.expireDate = null;
  }

  close() {
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      comment: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(256),
        validateWhiteSpace]),
      isEnabled: new FormControl(true),
      ismpnMatched: new FormControl(Constants.Empty)
    });
  }

  Approved() {
    this.close();
    const updateModel = this.getUpdateModel();
    const partComments = this.updatePartComments(updateModel);
    if (partComments.comments) {
      updateModel.partComments.push(partComments);
    }
    updateModel.approveRejectedId = this.authService.retrieveUser().id;
    updateModel.approveRejectedDate = new Date();
    updateModel.assignToUserId = null;
    updateModel.stateTypeId = this.isDCCTask ? PartPlanStateType.Approved_By_DCC : PartPlanStateType.Approved_By_SQE;
    this._apiService.updateData(this.recId, updateModel).subscribe(() => {
      this.cancelRoute = this.isDCCTask ? '/DCCTasks' : '/SQETasks';
      this.postSaved();
      this.activeModal.dismiss('Click X');
    });
  }

  Rejected() {
    this.close();
    const updateModel = this.getUpdateModel();
    const partComments = this.updatePartComments(updateModel);
    if (partComments.comments) {
      updateModel.partComments.push(partComments);
    }
    updateModel.approveRejectedId = this.authService.retrieveUser().id;
    updateModel.approveRejectedDate = new Date();
    updateModel.stateTypeId = this.isDCCTask ? PartPlanStateType.Rejected_By_DCC : PartPlanStateType.Rejected_By_SQE;
    this._apiService.updateData(this.recId, updateModel).subscribe(() => {
      this.cancelRoute = this.isDCCTask ? '/DCCTasks' : '/SQETasks';
      this.postSaved();
      this.activeModal.dismiss('Click X');
      setTimeout(() => {
        if (!this.isDCCTask) {
          this._router.navigate(['/PartInspection/EditSAPPartInspectionPlan/', this.recId]);
        }
      }, 3000);
    });
  }

  deactivate() {
    this.close();
    const updateModel = this.getUpdateModel();
    const partComments = this.updatePartComments(updateModel);
    if (partComments.comments) {
      updateModel.partComments.push(partComments);
    }
    updateModel.stateTypeId = PartPlanStateType.Deactivated_By_SQE;
    this._apiService.updateData(this.recId, updateModel).subscribe(() => {
      this.postSaved();
      this.activeModal.dismiss('Click X');
    });
  }

  updatePartComments(updateModel: ApproveRejectSAPPartInspectionPlanModel) {
    const partComments = this.specifyPartComments();
    updateModel.partComments = [];
    return partComments;
  }

  specifyPartComments() {
    const partComments = new SAPPartInspectionPlanComments();
    partComments.comments = this.formInput.controls[this.properties.comment].value;
    partComments.submittedByUserId = this.authService.retrieveUser().id;
    partComments.submittedByUser = null;
    partComments.sAPPartInspectionPlanId = this.sapPartInspectionPlan.id;
    return partComments;
  }



  openDrawingAttachmentPopUp(partInspectionDrawingRow: any) {
    const modalRef = this.modalService.open(PartDrawingViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = partInspectionDrawingRow;
    modalRef.componentInstance.isFileUploadDisabled = true;
    modalRef.result.then(
      (response) => {
      },
      () => {
      }
    );
  }

  editDrawingRecord(record: any): void {

    const selectedDrawingRow = this.sapPartInspectionPlanService.getSelectedDrawingRow(this.drawingDetails, this.sapPartInspectionPlan.id, record);

    this.getDrawingDetails(selectedDrawingRow, record.id);
  }



  getDrawingDetails(selectedDrawingRow: PartDrawingModel, id: number) {

    const pageSortFilterInfo = new PageSortFilterInfo();

    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setDrawingAttachmentSortFilterInfo(pageSortFilterInfo);

    this.partInspectionDrawingService.getDrawingDataById(id, pageSortFilterInfo).subscribe(data => {

      if (data && data.value.length > 0) {

        if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && data != null && data.value[0] != null) {

          selectedDrawingRow.partInspectionDrawingAttachments = [];

          selectedDrawingRow.partInspectionDrawingAttachments = data.value[0].partInspectionDrawingAttachments;
        }
      } else {

        selectedDrawingRow.partInspectionDrawingAttachments = [];
      }

      selectedDrawingRow.isExpanded = true;

      selectedDrawingRow.isEnabled = false;

      selectedDrawingRow.originalDrawingAttachmentIds = this.sapPartInspectionPlanService.setOriginalDrawingAttachmentIds(selectedDrawingRow);

      this.openDrawingAttachmentPopUp(selectedDrawingRow);

    });
  }


  editSpecRecord(record: any): void {

    const selectedSpecRow = this.sapPartInspectionPlanService.getSelectedSpecRow(this.specificationDetails, this.sapPartInspectionPlan.id, record);

    this.getSpecAttachments(selectedSpecRow, record.id);
  }


  getSpecAttachments(selectedSpecRow: PartSpecModel, id: number) {

    const pageSortFilterInfo = new PageSortFilterInfo();

    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setSpecAttachmentSortFilterInfo(pageSortFilterInfo);

    this.partInspectionSpecificationService.getSpecDataById(id, pageSortFilterInfo).subscribe(data => {

      selectedSpecRow.isExpanded = true;

      selectedSpecRow.isEnabled = false;

      if (data && data.value.length > 0) {

        if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && data != null && data.value[0] != null) {

          selectedSpecRow.partInspectionSpecAttachments = [];

          selectedSpecRow.partInspectionSpecAttachments = data.value[0].partInspectionSpecAttachments;
        }
      } else {

        selectedSpecRow.partInspectionSpecAttachments = [];
      }

      selectedSpecRow.originalSpecAttachmentIds = this.sapPartInspectionPlanService.setOriginalSpecAttachmentIds(selectedSpecRow);

      this.openSpecAttachmentPopUp(selectedSpecRow);

    });
  }

  openSpecAttachmentPopUp(partInspectionSpecAttachments: any) {
    partInspectionSpecAttachments.isEnabled = false;
    const modalRef = this.modalService.open(PartSpecViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = partInspectionSpecAttachments;
    modalRef.componentInstance.isFileUploadDisabled = true;
    modalRef.result.then(
      (response) => {
      },
      () => {
      }
    );
  }

  getSamplingPlanDetails() {
    this.samplingPlans = this.detail.sapPartInspectionPlanSamplingPlans;
  }

  getSupplierDetails() {
    this.supplierDetails.push({
      supplierName: this.detail.supplier !== undefined ? this.detail.supplier.vendorName : '',
      supplierEmail: this.detail.supplier !== undefined ? this.detail.supplier.email : '',
      supplierPhoneNumber: this.detail.supplier !== undefined ? this.detail.supplier.phoneNo : ''
    });
  }

  isCommentEmpty() {
    return this.hasError(this.properties.comment, ValidationErrorCodes.required);
  }

  isCommentHasWhiteSpace() {
    return this.hasError(
      this.properties.comment,
      ValidationErrorCodes.validateWhiteSpace
    );
  }

  isCommentModified() {
    return this.isModified(this.properties.comment);
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  getUpdateModel(): ApproveRejectSAPPartInspectionPlanModel {

    const approveRejectSAPPartInspectionPlanModel = new ApproveRejectSAPPartInspectionPlanModel();

    Automapper.map(this.detail, approveRejectSAPPartInspectionPlanModel);
    this.recId = approveRejectSAPPartInspectionPlanModel.id;
    approveRejectSAPPartInspectionPlanModel.approveRejectedDate = new Date();
    approveRejectSAPPartInspectionPlanModel.comment = this.formInput.controls[this.properties.comment].value;
    const currentUser = this.authService.retrieveUser();
    approveRejectSAPPartInspectionPlanModel.assignToUserId = currentUser.id;
    approveRejectSAPPartInspectionPlanModel.approveRejectedId = currentUser.id;

    return approveRejectSAPPartInspectionPlanModel;
  }


  getFiles() {
    if (this.detail.partInspectionDrawingAttachments != null &&
      this.detail.partInspectionDrawingAttachments.length > 0) {
      this.drawingFiles = [];
      this.detail.partInspectionDrawingAttachments.forEach(element => {
        this.drawingAttachments.push(element.attachment);
        this.drawingFiles.push(this.attachmentService.getFilesFromUpload(element));
      });
    }
    if (this.detail.partInspectionSpecAttachments != null &&
      this.detail.partInspectionSpecAttachments.length > 0) {
      this.uploadSpecFiles = [];
      this.detail.partInspectionSpecAttachments.forEach(element => {
        this.uploadSpecAttachments.push(element.attachment);
        this.uploadSpecFiles.push(this.attachmentService.getFilesFromUpload(element));
      });
    }
    if (this.detail.partInspectionCertificationAttachments != null &&
      this.detail.partInspectionCertificationAttachments.length > 0) {
      this.uploadCertificationFiles = [];
      this.detail.partInspectionCertificationAttachments.forEach(element => {
        this.uploadCertificationAttachments.push(element.attachment);
        this.uploadCertificationFiles.push(this.attachmentService.getFilesFromUpload(element));
      });
    }
  }

  adminCertificationDetails() {
    this.adminCertificationList = this.detail.adminCertifications && this.detail.adminCertifications.map(x => x.name).join(', ');
  }

  initializeTabExpandedSetting() {
    this.isResultOrientedExpanded = false;
    this.isCountParameterExpanded = false;
    this.isDateCodeExpanded = false;
    this.isFUNParameterExpanded = false;
    this.isTestReportExpanded = false;
    this.isMeasurementExpanded = false;
    this.isMicroSectionExpanded = false;
    this.isMPositionToleranceExpanded = false;
    this.isLPositionToleranceExpanded = false;
  }

  private returnResultOrientedDataArray(element: any): any {
    return {
      id: element.id,
      name: element.name ?? element.parameterManagement.name,
      testRequirement: element.testRequirement ?? '',
      resultExpected: element.resultId === resultExpected[0].id ? resultExpected[0].name : resultExpected[1].name,
      isChecked: element.isChecked,
      isEnabled: element.isEnabled,
      sAPPartInspectionPlanId: this.recId ?? 0
    };
  }

  expandTabDynamic(tabId: number) {
    const pageSortFilterInfo = new PageSortFilterInfo();
    switch (tabId) {
      case TabType.Count:
        if (!this.isCountParameterExpanded) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setCountParameterPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedCountParameters(pageSortFilterInfo);
        }
        break;
      case TabType.ResultOriented:
        if (!this.isResultOrientedExpanded) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setResultOrientedPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartResultOrientedParameters(pageSortFilterInfo);
        }
        break;
      case TabType.DateCode:
        if (!this.isDateCodeExpanded) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setDateCodePageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartDateCode(pageSortFilterInfo);
        }
        break;
      case TabType.BowAndTwist:
        if (!this.isBowTwistExpanded) {
          this.expandSetBowTwist();
        }
        break;
      case TabType.FUN:
        if (!this.isFUNParameterExpanded && this.sapPartInspectionPlanService.isEditOrView(this.sapPartInspectionPlan.id)) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setFUNPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartFunParameters(pageSortFilterInfo);
        }
        break;
      case TabType.Measurement:
        if (!this.isMeasurementExpanded && this.sapPartInspectionPlanService.isEditOrView(this.sapPartInspectionPlan.id)) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setMeasurementParametersPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartMeasurementParameters(pageSortFilterInfo);
        }
        break;
      case TabType.MicroSection:
        if (!this.isMicroSectionExpanded) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setMicroSectionPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartMicroSectionParameters(pageSortFilterInfo);
        }
        break;
      case TabType.MPositionTolerance:
        if (!this.isMPositionToleranceExpanded) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setMPositionTolerancePageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartInspectionMPositionTolerances(pageSortFilterInfo);
        }
        break;
      case TabType.LPositionTolerance:
        if (!this.isLPositionToleranceExpanded) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setLPositionTolerancePageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartInspectionLPositionTolerances(pageSortFilterInfo);
        }
        break;
      default:
        break;
    }
  }


  expandTestReportTabDynamic() {
    if (!this.isTestReportExpanded && this.sapPartInspectionPlanService.isEditOrView(this.sapPartInspectionPlan.id)) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setTestReportPageSortFilterInfo(pageSortFilterInfo);
      this.getExpandedPartTestReportParameters(pageSortFilterInfo);
    }
  }

  getExpandedPartMicroSectionParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
          this.sapPartInspectionPlan.partMicrosectionParameters = data.value[0].partMicrosectionParameters;
          this.entity = this.sapPartInspectionPlan;
          this.microSectionParameters = this.sapPartInspectionPlanService.getMicroSectionParameters(this.sapPartInspectionPlan);
          this.isMicroSectionExpanded = true;
        }
      }
    });
  }
  getExpandedPartFunParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
        this.sapPartInspectionPlan.partFunParameters = data.value[0].partFunParameters;
        this.entity = this.sapPartInspectionPlan;
        this.funParameters = this.sapPartInspectionPlanService.mapFunParameterModel(this.sapPartInspectionPlan.partFunParameters);
        this.isFUNParameterExpanded = true;
      } else {
        this.funParameters = [];
      }
    });
  }

  getExpandedPartMeasurementParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
        this.sapPartInspectionPlan.partMeasurementParameters = data.value[0].partMeasurementParameters;
        this.entity = this.sapPartInspectionPlan;
        this.measurementParameters = this.sapPartInspectionPlanService.mapMeasurementParameterModel(this.sapPartInspectionPlan.partMeasurementParameters);
        this.isMeasurementExpanded = true;
      } else {
        this.measurementParameters = [];
      }
    });
  }


  getExpandedPartTestReportParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
        this.sapPartInspectionPlan.partTestReportParameters = data.value[0].partTestReportParameters;
        this.entity = this.sapPartInspectionPlan;
        if (this.sapPartInspectionPlanService.isPartTestReportParameterHasValue(this.sapPartInspectionPlan.partTestReportParameters)) {
          this.testReportTabDetails = [];
          this.testReportTabDetails = this.sapPartInspectionPlanService.mapTestReportModel(this.sapPartInspectionPlan.partTestReportParameters, this.sapPartInspectionPlan.id);
        }
        this.isTestReportExpanded = true;
      }
    });
  }


  getExpandedPartResultOrientedParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
        this.sapPartInspectionPlan.partResultOrientedParameters = data.value[0].partResultOrientedParameters;
        this.entity = this.sapPartInspectionPlan;
        if (this.sapPartInspectionPlan.partResultOrientedParameters !== null && this.sapPartInspectionPlan.partResultOrientedParameters !== undefined &&
          this.sapPartInspectionPlan.partResultOrientedParameters.length > 0) {
          this.resultOrientedTabDetails = [];
          this.sapPartInspectionPlan.partResultOrientedParameters.map(record => {
            this.resultOrientedTabDetail = this.returnResultOrientedDataArray(record);
            this.resultOrientedTabDetails.push(this.resultOrientedTabDetail);
          });
        }
        this.isResultOrientedExpanded = true;
      }
    });
  }

  getExpandedCountParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
        this.sapPartInspectionPlan.partCountParameters = data.value[0].partCountParameters;
        this.entity = this.sapPartInspectionPlan;
        if (this.sapPartInspectionPlan.partCountParameters !== null && this.sapPartInspectionPlan.partCountParameters !== undefined &&
          this.sapPartInspectionPlan.partCountParameters.length > 0) {
          this.countParameters = [];
          this.sapPartInspectionPlan.partCountParameters.map(record => {
            this.countParameter = this.sapPartInspectionPlanService.returnCountParameterArray(record, record.id);
            this.countParameters.push(this.countParameter);
          });
        }
        this.isCountParameterExpanded = true;
      }
    });
  }

  getExpandedPartDateCode(pageSortFilterInfo: PageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
        this.sapPartInspectionPlan.partDateCode = data.value[0].partDateCode;
        this.entity = this.sapPartInspectionPlan;
        if (this.sapPartInspectionPlan.partDateCode !== null && this.sapPartInspectionPlan.partDateCode !== undefined) {
          this.sapPartInspectionPlan.partDateCode.manufactureDate = this.sapPartInspectionPlan.partDateCode.manufactureDate != null ?
            new Date(this.sapPartInspectionPlan.partDateCode.manufactureDate) : null;
          this.sapPartInspectionPlan.partDateCode.shelfLifeMonths = this.sapPartInspectionPlan.partDateCode.shelfLifeMonths;
          this.sapPartInspectionPlan.partDateCode.manufactureDCWeeks = this.sapPartInspectionPlan.partDateCode.manufactureDCWeeks;
          this.sapPartInspectionPlan.partDateCode.manufactureDCYears = this.sapPartInspectionPlan.partDateCode.manufactureDCYears;
          this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate = this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate != null ?
            new Date(this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate) : null;
          this.sapPartInspectionPlan.partDateCode.dateCodeDetails = this.sapPartInspectionPlan.partDateCode.dateCodeDetails;
          this.sapPartInspectionPlan.partDateCode.expireDate = this.sapPartInspectionPlan.partDateCode.expireDate != null ?
            new Date(this.sapPartInspectionPlan.partDateCode.expireDate) : null;
          this.isDateCodeExpanded = true;
        } else {
          this.initializeDateCodeTabControls();
        }
      }
    });
  }

  getExpandedPartInspectionMPositionTolerances(pageSortFilterInfo: PageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
          this.sapPartInspectionPlan.partMPositionTolerances = data.value[0].partMPositionTolerances;
          this.entity = this.sapPartInspectionPlan;
          this.mPositionTolerances = this.sapPartInspectionPlanService.getMPositionToleranceParameters(this.sapPartInspectionPlan);
          this.isMPositionToleranceExpanded = true;
        } else {
          this.mPositionTolerances = [];
        }
      }
    });
  }

  getExpandedPartInspectionLPositionTolerances(pageSortFilterInfo: PageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
          this.sapPartInspectionPlan.partLPositionTolerances = data.value[0].partLPositionTolerances;
          this.entity = this.sapPartInspectionPlan;
          this.lPositionTolerances = this.sapPartInspectionPlanService.getLPositionToleranceParameters(this.sapPartInspectionPlan);
          this.isLPositionToleranceExpanded = true;
        } else {
          this.lPositionTolerances = [];
        }
      }
    });
  }


  expandSetBowTwist() {
    this.dataTypeList = dataTypes;
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setBowTwistPageSortFilterInfo(pageSortFilterInfo);
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlan.id, pageSortFilterInfo).subscribe(data => {
      if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
        this.sapPartInspectionPlan.partInspectionBowTwistParameters = data.value[0].partInspectionBowTwistParameters;
        this.specType = specType.get(this.sapPartInspectionPlan.specTypeId);
        this.entity = this.sapPartInspectionPlan;
        this.formInput.patchValue({
          partInspectionBowTwistParameters: data.value[0].partInspectionBowTwistParameters,
        });
        const partInspectionBowTwistParametersSortedArray = _.sortBy(this.sapPartInspectionPlan.partInspectionBowTwistParameters, 'warPageTypeId');
        this.sapPartInspectionPlan.partInspectionBowTwistParameters = partInspectionBowTwistParametersSortedArray;
        if (partInspectionBowTwistParametersSortedArray != null
          && partInspectionBowTwistParametersSortedArray !== undefined) {
          this.bowTwistTitles = this.sapPartInspectionPlanService.initializeBowTwistHeaderInfo(this.sapPartInspectionPlan.specTypeId);
        }
      }
    });
    this.isBowTwistExpanded = true;
  }

  showHideTab(data) {
    tabConfiguration.filter(x => x.isVisible === true).map(k => {
      if (k.isVisible === true) {
        k.isVisible = false;
      }
    });
    if (data && data !== null) {
      const uniqueTabs = [...new Set(data.map(item => item.parameterManagementTypeId))];

      tabConfiguration.map(t => {
        uniqueTabs.map(d => {
          if (t.id === d) {
            t.isVisible = true;
          }
        });
      });
    }
    this.tabConfig = tabConfiguration.filter(x => x.isVisible === true);
  }

  getTabConfigurationData(sAPPartInspectionPlan, commodityId) {
    const commodityID = sAPPartInspectionPlan != null ? sAPPartInspectionPlan.commodityId : commodityId;
    this._parameterManagementService.getParameterManagementDataByCommodityId(commodityID, this.sapPartInspectionPlanService.getPcCodes(this.samplingPlans))
      .subscribe(data => {
        this.showHideTab(data.value);
      });
  }


  editTestReportRecord(record: any): void {

    this.testReportParameterId = this.sapPartInspectionPlanService.getTestReportParameterId(record);

    this.testReportId = record.id;

    const selectedTestReportTabRow = this.sapPartInspectionPlanService.getSelectedTestReportRow(this.testReportTabDetails, this.sapPartInspectionPlan.id, this.testReportId);

    if (this.sapPartInspectionPlanService.isTestReportOnEditAndNotExpanded(selectedTestReportTabRow, this.sapPartInspectionPlan.id)) {

      const pageSortFilterInfo = new PageSortFilterInfo();

      pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setTestReportAttachmentSortFilterInfo(pageSortFilterInfo);

      this.partTestReportParameterService.getTestReportDataById(this.testReportParameterId, pageSortFilterInfo).subscribe(data => {

        if (data && data.value.length > 0) {

          if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && data != null && data.value[0] != null) {

            this.partTestReportAttachments = data.value[0].partTestReportAttachments;

            selectedTestReportTabRow.partTestReportAttachments = [];

            selectedTestReportTabRow.partTestReportAttachments = this.partTestReportAttachments;
          }
        } else {

          selectedTestReportTabRow.partTestReportAttachments = [];
        }

        selectedTestReportTabRow.originalTestReportAttachmentIds = this.sapPartInspectionPlanService.setOriginalTestReportAttachmentIds(selectedTestReportTabRow);

        selectedTestReportTabRow.isExpanded = true;

        this.openTestReportPopUp(selectedTestReportTabRow);

      });
    } else if (this.sapPartInspectionPlanService.isTestReportOnEditAndExpanded(selectedTestReportTabRow, this.sapPartInspectionPlan.id)) {

      this.openTestReportPopUp(selectedTestReportTabRow);

    } else {

      this.openTestReportPopUp(selectedTestReportTabRow);

    }

  }

  openTestReportPopUp(partTestReportAttachments: any) {
    const modalRef = this.modalService.open(PartTestReportAttachmentViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = partTestReportAttachments;
    modalRef.componentInstance.isFileUploadDisabled = true;
    modalRef.result.then(
      (response) => {
        const selectedPartTestReportFiles = response;

        const selectedTestReportTabRow = this.testReportTabDetails.find(k => k.id === this.testReportId);

        if (this.sapPartInspectionPlanService.isTestReportOnEditAndExpanded(selectedTestReportTabRow, this.sapPartInspectionPlan.id)) {

          selectedTestReportTabRow.partTestReportAttachments = [];

          selectedPartTestReportFiles.testReportAttachments.forEach(element => {

            selectedTestReportTabRow.partTestReportAttachments = this.sapPartInspectionPlanService.setPartTestReportAttachments(element, selectedTestReportTabRow, this.testReportSavePath);
          });

          selectedTestReportTabRow.currentTestReportAttachmentIds = this.sapPartInspectionPlanService.setCurrentTestReportAttachmentIds(selectedTestReportTabRow, selectedPartTestReportFiles);

          selectedTestReportTabRow.removedTestReportAttachmentIds = this.sapPartInspectionPlanService.setRemovedTestReportAttachmentIds(selectedTestReportTabRow);

          selectedTestReportTabRow.partTestReportAttachments = this.sapPartInspectionPlanService.clearRemovedTestReportAttachments(selectedTestReportTabRow);

        }
      },
      () => {
      }
    );
  }
}
