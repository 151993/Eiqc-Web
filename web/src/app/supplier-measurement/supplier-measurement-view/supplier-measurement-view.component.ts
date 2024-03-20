import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {
  acceptRejectOptions,
  Constants, DataType, dataTypes, DefaultCommonConstants, DefectSection, DimensionDefaultConstant, Numbers, PartPlanStateType, PrimeNGDateSelectionMode, purchaseOrderState,
  PurchaseOrderState, result, resultExpected, SearchOperator, specType, tabConfiguration, tabType, TabType, ValidationErrorCodes, yesNoOptions, ToastMessage, UserType, ChartType, unitType
} from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import * as _ from 'lodash';
import { ExpandSelectCountInfo, FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Location } from '@angular/common';
import { AddSupplierMeasurementSubmissionModel } from 'src/app/model/supplier-measurement-submission/add-supplier-measurement-submission-model';
import { SupplierMeasurementSubmissionService } from 'src/app/services/supplier-measurement-submission/supplier-measurement-submission.service';
import { SupplierMeasurementSubmission } from 'src/app/model/supplier-measurement-submission/supplier-measurement-submission';
import { UpdateSupplierMeasurementSubmissionModel } from 'src/app/model/supplier-measurement-submission/update-supplier-measurement-submission-model';
import { SAPPartInspectionPlanService } from 'src/app/services/sap-part-inspection-plan/sap-part-inspection-plan.service';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { SapPartInspectionPlanViewComponent } from 'src/app/admin/sap-part-inspection-plan/sap-part-inspection-plan-view/sap-part-inspection-plan-view.component';
import { ParameterManagementService } from 'src/app/services/parameter-management/parameter-management.service';
import { SAPSamplingPlanModel } from 'src/app/model/sap-models/sap-sampling-plan-model';
import { SupplierFunctionAttribute } from 'src/app/model/supplier-measurement-submission/supplier-function-attribute/supplier-function-attribute';
import { DefectTypeComponent } from 'src/app/admin/defect-type/defect-type.component';
import { MicroSectionParameterModel } from 'src/app/model/sap-part-inspection-plan/micro-section-parameter/micro-section-parameter-model';
import { InstrumentService } from 'src/app/services/instrument/instrument.service';
import { SupplierMicroSectionParameterModel, SupplierMicroSectionParameterModelColumns } from 'src/app/model/supplier-measurement-submission/supplier-micro-section-parameter/supplier-micro-section-parameter-model';
import { environment } from 'src/environments/environment';
import { SupplierSamplingPlan } from 'src/app/model/supplier-sampling-plan/supplier-sampling-plan';
import { SupplierSapBasedParameter } from 'src/app/model/supplier-measurement-submission/supplier-sap-based-parameter/supplier-sap-based-parameter';
import { ColumnInfo, ColumnType, TableColumn } from 'src/app/model/table/table';
import { CertificateTypeService } from 'src/app/services/certificate-type/certificate-type.service';
import { SupplierDimensionMeasurementModel } from 'src/app/model/supplier-measurement-submission/supplier-dimension-measurement/supplier-dimension-measurement-model';
import { MeasurementParameterModel } from 'src/app/model/sap-part-inspection-plan/measurement-parameter/measurement-parameter-model';
import { FunParameterModel } from 'src/app/model/sap-part-inspection-plan/fun-parameter/fun-parameter-model';
import { SupplierFunctionVariableModel } from 'src/app/model/supplier-measurement-submission/supplier-function-variable/supplier-function-variable-model';
import { SupplierTestReport } from 'src/app/model/supplier-test-report/supplier-test-report';
import { DefectTypeService } from 'src/app/services/defect-type/defect-type.service';
import { SupplierTestReportService } from 'src/app/services/supplier-test-report/supplier-test-report.service';
import { SupplierTestReportAttachment } from 'src/app/model/supplier-test-report-attachment/supplier-test-report-attachment';
import { PartTestReportParameterService } from 'src/app/services/part-test-report-parameter/part-test-report-parameter.service';
import { SupplierTestReportAttachmentViewComponent } from '../supplier-test-report-attachment-view/supplier-test-report-attachment-view.component';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { PartTestReportTab } from 'src/app/model/part-test-report/part-test-report-tab-model';
import { SupplierDateCode } from 'src/app/model/supplier-date-code/supplier-date-code';
import { SupplierDateCodeService } from 'src/app/services/supplier-date-code/supplier-date-code.service';
import { DatePipe } from '@angular/common';
import { CommodityEnum } from 'src/app/model/sap-part-inspection-plan/commodity.enum';
import { SupplierBowTwist } from 'src/app/model/supplier-measurement-submission/supplier-bow-twist/supplier-bow-twist';
import { SupplierBowTwistActual } from 'src/app/model/supplier-measurement-submission/supplier-bow-twist-actual/supplier-bow-twist-actual';
import { MPositionToleranceModel } from 'src/app/model/sap-part-inspection-plan/m-position-tolerance/m-position-tolerance-model';
import { SupplierMPosition } from 'src/app/model/supplier-m-position/supplier-m-position';
import { TranslateService } from '@ngx-translate/core';
import { DimensionDefaultService } from 'src/app/services/dimension-default/dimension-default.service';
import { DimensionDefault } from 'src/app/model/dimension-default/dimension-default';
import { InstrumentTypeService } from 'src/app/services/instrument-type/instrument-type.service';
import { UOMService } from 'src/app/services/uom/uom.service';
import { SupplierMPositionActual } from 'src/app/model/supplier-m-position-actual/supplier-m-position-actual';
import { SupplierFunctionVariableActual } from 'src/app/model/supplier-measurement-submission/supplier-function-variable-actual/supplier-function-variable-actual-model';
import { isNumeric } from 'rxjs/internal/util/isNumeric';
import { SupplierVisualInspectionModel } from 'src/app/model/supplier-measurement-submission/supplier-visual-inspection/supplier-visual-inspection';
import { InspectionToolsService } from 'src/app/services/inspection-tools/inspection-tools.service';
import { DefectTypeVisualInspectionComponent } from 'src/app/admin/defect-type-visual-inspection/defect-type-visual-inspection.component';

import { LPositionToleranceModel } from 'src/app/model/sap-part-inspection-plan/l-position-tolerance/l-position-tolerance-model';
import { SupplierLPosition } from 'src/app/model/supplier-l-position/supplier-l-position';
import { SupplierLPositionActual } from 'src/app/model/supplier-l-position-actual/supplier-l-position-actual';

import { SupplierMicroSectionActual } from 'src/app/model/supplier-measurement-submission/supplier-micro-section-parameter/supplier-micro-section-actual';
import { SupplierFunctionAttributeActual } from 'src/app/model/supplier-measurement-submission/supplier-function-attribute/supplier-function-attribute-actual';
import { SupplierDimensionMeasurementActual } from 'src/app/model/supplier-measurement-submission/supplier-dimension-measurement-actual/supplier-dimension-measurement-actual-model';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { Attachment } from 'src/app/model/attachment/attachment';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { SMSMyTasksService } from 'src/app/services/sms-my-tasks/smsmy-tasks.service';
import { ApproveRejectSupplierMeasurementSubmissionPlanModel } from 'src/app/model/supplier-measurement-submission/approve-reject-sap-part-inspection-plan-model';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { SupplierFunctionAttributeLabelModel } from 'src/app/model/supplier-measurement-submission/supplier-function-attribute/supplier-function-attribute-label-model';
import { SupplierMicroSectionParameterLabelModelColumns } from 'src/app/model/supplier-measurement-submission/supplier-micro-section-parameter/supplier-micro-section-parameter-label-model';
import { SupplierTestReportLabelModel } from 'src/app/model/supplier-test-report/supplier-test-report-label-model';
import { SupplierVisualInspectionLabelModel } from 'src/app/model/supplier-measurement-submission/supplier-visual-inspection/supplier-visual-inspection-label-model';
import { SupplierSapBasedParameterLabelModel } from 'src/app/model/supplier-measurement-submission/supplier-sap-based-parameter/supplier-sap-based-parameter-label-model';
import { SpcChartMicroSectionComponent } from 'src/app/admin/spc-chart-micro-section/spc-chart-micro-section.component';
import { SpcChartDimensionMeasurementComponent } from 'src/app/admin/spc-chart-dimension-measurement/spc-chart-dimension-measurement.component';
import { SpcChartFunctionVariableComponent } from 'src/app/admin/spc-chart-function-variable/spc-chart-function-variable.component';
import { SupplierSpcChartCalculation } from 'src/app/model/supplier-measurement-submission/supplier-spc-chart-calculation/supplier-spc-chart-calculation';
import { SupplierSpcChartSummary } from 'src/app/model/supplier-measurement-submission/supplier-spc-chart-summary/supplier-spc-chart-summary';
import { FailedQuantity } from 'src/app/model/failed-quantity/failed-quantity';

const regexOnlyNumbers = '^[0-9]*$';
const monthsToDaysConstant = 30;
const yearConstantLength = 4;
const weekConstantLength = 3;
let calculatedSampleSize = 0;
const maxFileSize = 5;
const maxFileLimit = 5;
const cpkTargetValue = 1.67;


const DIM = 'DIM';
const FUN = 'FUN';


@Component({
  selector: 'app-supplier-measurement-view',
  templateUrl: './supplier-measurement-view.component.html',
  styleUrls: ['./supplier-measurement-view.component.css']
})
export class SupplierMeasurementViewComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  isRejected: boolean;
  canAddChartType = true;
  countValue = 30;
  skipValue = 0;

  standardDeviationValue: any;
  averageValue: any;
  spcStdAvg: SupplierSpcChartCalculation[] = [];
  spcMicroSectionStdAvg: SupplierSpcChartCalculation[] = [];
  supplierSPCchartData: SupplierSpcChartCalculation[] = [];

  spcDiamensionmeasurement30StdAvg: any[] = [];
  spcDiamensionmeasurement25StdAvg: any[] = [];
  spcMicroSectionRecent25StdAvg: any[] = [];
  spcMicroSectionRecent30StdAvg: any[] = [];
  spcFunRecent25StdAvg: any[] = [];
  spcFunRecent30StdAvg: any[] = [];

  parameterMicroSectionActualValuesFor30: SupplierSpcChartCalculation[] = [];
  parameterMicroSectionActualValuesFor25: SupplierSpcChartCalculation[] = [];
  parameterFunVariableActualValuesFor30: SupplierSpcChartCalculation[] = [];
  parameterFunVariableActualValuesFor25: SupplierSpcChartCalculation[] = [];
  parameterDimMeasurementActualValuesFor30: SupplierSpcChartCalculation[] = [];
  parameterDimMeasurementActualValuesFor25: SupplierSpcChartCalculation[] = [];

  xBarRActualValueFor25: SupplierSpcChartCalculation[] = [];
  xBarRActualValueFor30: SupplierSpcChartCalculation[] = [];
  spcFunctionVariableRecent30SMSRangeBarR: SupplierSpcChartCalculation[] = [];
  testReportResultIndicator = 2;
  visualInspectionResultIndicator = 2;
  microSectionResultIndicator = 2;
  summaryResultId: number;
  setDateCodeSummaryResult = '';
  setSpecWithMMCSummaryResult = '';
  setSpecWithLMCSummaryResult = '';
  setBowTwistSummaryResult = '';
  setSapBasedSummaryResult = '';
  setPackingInspectionSummaryResult = '';
  setTestReportSummaryResult = '';
  setVisualInspectionSummaryResult = '';
  setFunctionAttributePassFailSummaryResult = '';
  isSummarySectionVisible: boolean;
  microSectionFailIndicator: number;
  visualInspectionFailIndicator: number;
  testReportFailIndicator: number;
  packingInspectionFailIndicator: number;
  sapBasedFailIndicator: number;
  bowTwistFailIndicator: number;
  mPositionFailIndicator: number;
  lPositionFailIndicator: number;
  dateCodeFailIndicator: number;
  functionVariableFailIndicator: number;
  dimentionFailIndicator: number;
  functionAttributeFailIndicator: number;
  supplierSpcChartSummary: SupplierSpcChartSummary[] = [];
  sapBasedParameterTabId = 14;
  packingInspectionTabId = 13;
  supplierTestReportTabId = 11;
  isSupplierFunctionAttributeSummaryResult: boolean;
  isMicroSectionParameterSummaryResult: boolean;
  isDimensionMeasurementSummaryResult = false;
  isFunctionVariableSummaryResult: boolean;
  isSpecWithMMCSummaryResult: boolean;
  isSpecWithLMCSummaryResult: boolean;
  isDateCodeSummaryResult: boolean;
  isBowTwistSummaryResult: boolean;
  isSupplierVisualInspectionsSummaryResult: boolean;
  isSupplierSapBasedTabSummaryResult: boolean;
  isSupplierPackingInspectionTabSummaryResult: boolean;
  isSupplierVisualInspectionTabSummaryResult: boolean;
  isSupplierTestReportTabSummaryResult: boolean;
  isSummaryPass: any;
  isMavericLotDetected: boolean;
  isAllTabResultPass: boolean;
  setFunctionVariablePassFailSummaryResult = '';
  setDimensionMeasurementPassFailSummaryResult = '';
  setMicroSectionPassFailSummaryResult = '';
  summaryResult = '';
  supplierFailedQuantity: FailedQuantity[];
  isSamplingPlanNumbersOnly: boolean;
  isPassFailResultFunctionAttribute: boolean;
  isPassFailResultSapBased: boolean;
  isPassFailResultVisualInspection: boolean;

  // TODO : To be implemented
  isDimensionalMeasurementFail: boolean;
  isFunctionVariableFail: boolean;
  isMicroSectionParameterFail: boolean;
  isBowTwistFail: boolean;
  isFunctionAttributeFail: boolean;
  // isDateCodeFail: boolean;
  isMPositionToleranceFail: boolean;
  isLPositionToleranceFail: boolean;
  isPackingInspectionFail: boolean;
  isTestReportFail: boolean;

  constructor(
    private _apiService: SMSMyTasksService,
    private formBuilder: FormBuilder,
    private apiService: SupplierMeasurementSubmissionService,
    authService: AuthService,
    protected activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    private location: Location,
    private sapPartInspectionPlanService: SAPPartInspectionPlanService,
    private _parameterManagementService: ParameterManagementService,
    private _instrumentService: InstrumentService,
    private _defectTypeService: DefectTypeService,
    private _toolsService: InspectionToolsService,
    private supplierTestReportService: SupplierTestReportService,
    private partTestReportParameterService: PartTestReportParameterService,
    private _certificateTypeService: CertificateTypeService,
    private _supplierDateCodeService: SupplierDateCodeService,
    private _dimensionDefaultService: DimensionDefaultService,
    private _instrumentTypeService: InstrumentTypeService,
    private _UOMService: UOMService,
    public datePipe: DatePipe,
    public translateService: TranslateService,
    private activeModal: NgbActiveModal,
    private attachmentService: AttachmentService,

  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.supplierMeasurement = new SupplierMeasurementSubmission();
    this.entity = new SupplierMeasurementSubmission();
    this.initForm();
    this.cancelRoute = '/PartInspection/SupplierMeasurementSubmission';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSupplierMeasurementCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierMeasurementCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierMeasurementCanCreate;

    this.maxNumber = 99999;
    this.minNumber = 0;
    this.size = 20.0;
    this.displaySupplierFunctionAttributeColumns = (new SupplierFunctionAttributeLabelModel()).displayColumns();
    this.funMicroMeasurementParameterColumns = (new SupplierMicroSectionParameterLabelModelColumns()).displayColumns();
    this.functionVariableColumns = (new SupplierMicroSectionParameterLabelModelColumns()).displayColumns();
    this.dimensionMeasurementColumns = (new SupplierMicroSectionParameterLabelModelColumns()).displayColumns();
    this.displayMasterInspectionColumns = (new SAPSamplingPlanModel()).displayColumns();
    this.displaySupplierSapBasedParameterColumns = (new SupplierSapBasedParameterLabelModel()).displayColumns();
    this.displaySupplierTestReportColumns = (new SupplierTestReportLabelModel()).displayColumns();
    this.microSectionParameterColumns = (new SupplierMicroSectionParameterLabelModelColumns()).displayColumns();
    this.displaySupplierVisualInspectionColumns = (new SupplierVisualInspectionLabelModel()).displayColumns();
    this.generateSpecWithMMCMainRowColumns();

    this.displaySupplierBowTwistColumns = (new SupplierBowTwist()).displayColumns();
    this.specType = specType;
    this.generateSpecWithLMCMainRowColumns();
  }
  formInput: FormGroup;
  displaySupplierFunctionAttributeColumns: any;
  resultOrientedData: any;
  supplierFunctionAttribute = new SupplierFunctionAttribute();
  supplierTestReport = new SupplierTestReport();
  sapPartInspectionPlan = new SAPPartInspectionPlan();
  isFunctionAttributeInspectionDetailEmpty: boolean;
  isTestReportDefectTypeTestReportEmpty: boolean;
  resultVisualInspectionData: any;
  isSupplierVisualInspectionDetailEmpty: boolean;
  isSubmitted = true;
  // MicroSection tab
  isMicroSectionExpanded: boolean;
  microSectionParameters: MicroSectionParameterModel[] = [];
  supplierMicroSectionParameter = new SupplierMicroSectionParameterModel();
  supplierMicroSectionParameters: SupplierMicroSectionParameterModel[] = [];
  microSectionParameterTabId: number;
  // DimensionMeasurement tab
  isDimensionMeasurementExpanded: boolean;
  dimensionMeasurements: MeasurementParameterModel[] = [];
  supplierDimensionMeasurement = new SupplierDimensionMeasurementModel();
  supplierDimensionMeasurements: SupplierDimensionMeasurementModel[] = [];
  dimensionMeasurementTabId: number;
  // FunVariable tab
  isFunctionVariableExpanded: boolean;
  functionVariables: FunParameterModel[] = [];
  supplierFunctionVariable = new SupplierFunctionVariableModel();
  supplierFunctionVariables: SupplierFunctionVariableModel[] = [];
  functionVariableTabId: number;
  // Visual Inspection Tab
  visualInspectionSampleSize = '0';
  visualInspectionRejectionQty = '0';
  supplierVisualInspection = new SupplierVisualInspectionModel();
  supplierVisualInspectionDetails: SupplierVisualInspectionModel[] = [];
  displaySupplierVisualInspectionColumns: any;
  isSupplierVisualInspectionExpanded: boolean;
  supplierVisualInspectionsTabId: number;
  supplierDateCodeTabId: number;
  funMicroMeasurementParameterColumns: any;
  microSectionParameterColumns: any;
  functionVariableColumns: any;
  dimensionMeasurementColumns: any;
  supplierFunctionAttributeDetails: SupplierFunctionAttribute[] = [];
  resultExpectedResultActualParameter: Record<string, any[]> = {};
  supplierSapBasedParameter = new SupplierSapBasedParameter();
  supplierSapBasedParameters: SupplierSapBasedParameter[] = [];
  displaySupplierSapBasedParameterColumns: any;
  isSapBasedParameterDetailEmpty: boolean;
  displaySupplierTestReportColumns: any;
  supplierTestReportTabDetails: SupplierTestReport[] = [];
  isDateCodeExpanded: boolean;
  selectionModeSingle = PrimeNGDateSelectionMode.Single;
  tabConfig: any[];
  supplierFunctionAttributeTabId: number;
  isSupplierFunctionAttributeExpanded: boolean;
  isSupplierTestReportExpanded: boolean;
  samplingPlans: any;
  //#region Comment Attachment
  uploadSMSCommentFiles: FileUpload[] = [];
  uploadSMSCommentAttachments: Attachment[] = [];
  tempFolder = '';
  savePath = 'supplier-measurement-submission';
  //#endregion Comment Attachment




  partSapRequestFieldValue = { mediaCode: '', maskedMPN: '', manufacturer: '' };
  partSapRequestFields = [{ id: 1, parameterName: 'Media Code' }, { id: 2, parameterName: 'MFG' }, { id: 3, parameterName: 'MPN' }];
  public supplierAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'vendorName',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'vendorName',
    format: '${value.vendorName} (${value.vendorCode})',
  };


  public manuFacturePartNumberAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'manufacturePartNumber',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'manufacturePartNumber',
    format: '${value.manufacturePartNumber}',
  };


  public partNoAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'partNo',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'partNo',
    format: '${value.partNo}',
  };


  public pOAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'purchaseOrderNo',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'purchaseOrderNo',
    format: '${value.purchaseOrderNo}',
  };


  properties = {
    id: 'id',
    partNo: 'partNo',
    manufacturePartNumber: 'manufacturePartNumber',
    manufacturer: 'manufacturer',
    workCell: 'workCell',
    supplier: 'supplier',
    supplierContact: 'supplierContact',
    ip: 'ip',
    smsNo: 'smsNo',
    pONumber: 'pONumber',
    quantity: 'quantity',
    batchNo: 'batchNo',
    batchQuantity: 'batchQuantity',
    quantityBalance: 'quantityBalance',
    inspector: 'inspector',
    smsStatus: 'smsStatus',
    isEnabled: 'isEnabled',
    supplierFunctionAttribute: 'supplierFunctionAttribute',
    defectTypes: 'defectTypes',
    supplierSampling: 'supplierSampling',
    supplierSapBasedParameter: 'supplierSapBasedParameter',
    resultDescription: 'resultDescription',
    packagingQuantity: 'packagingQuantity',
    result: 'result',
    supplierTestReport: 'supplierTestReport',
    manufactureDate: 'manufactureDate',
    shelfLifeMonths: 'shelfLifeMonths',
    manufactureDCWeeks: 'manufactureDCWeeks',
    manufactureDCYears: 'manufactureDCYears',
    surfaceFinishingDate: 'surfaceFinishingDate',
    dateCodeDetails: 'dateCodeDetails',
    expireDate: 'expireDate',
    acceptReject: 'acceptReject',
    remainingDays: 'remainingDays',
    supplierTestReportTabDetails: 'supplierTestReportTabDetails',
    specType: 'specType',
    dataType: 'dataType',
    supplierBowTwists: 'supplierBowTwists',
    supplierVisualInspection: 'supplierVisualInspection',
    uploadSMSCommentFiles: 'uploadSMSCommentFiles',
    comments: 'comments'
  };

  supplierMeasurement: SupplierMeasurementSubmission;
  supplierId: number;
  stateTypeId: number;
  submittedById: number;
  submittedByDate: Date;
  currentUser: any;
  partCollection: SupplierMeasurementSubmission[] = [];
  selectedData: SupplierMeasurementSubmission;
  maxNumber: number;
  minNumber: number;
  size: number;
  vendorCode: string;
  site: any;
  isbatchQuantityValid: boolean;
  purchaseOrderState: Map<number, string>;
  purchaseOrderId: any;
  ipAttachmentLink: (string | { isSupplierViewFromSMSForm: boolean; })[];
  sapPartInspectionPlanId: number;
  workCellId: number;
  suppliercontactId: number;
  ip: string;
  batchQuantity: number;
  partNo: string;
  originalSMSPartManufactureIds: number[];
  commodityId: any;
  dynamicTypeCollection: Record<string, any[]> = {};
  dynamicTypeTestReportCollection: Record<string, any[]> = {};
  dynamicTypeInstrumentCollection: Record<string, any[]> = {};
  dynamicToolsCollection: Record<string, any[]> = {};
  dynamicTypeFunctionAttributeCollection: Record<string, any[]> = {};

  resultPassFail: any;
  originalDefectTypeIds: number[];
  supplierSamplingPlans: SupplierSamplingPlan[] = [];
  supplierTestReportAttachments: SupplierTestReportAttachment[];
  resultExpectedTestReport: Record<string, any[]> = {};
  pageSortFilterInfo: PageSortFilterInfo;
  displayMasterInspectionColumns: any;
  masterInspectionExpanded: boolean;
  isPassFailResult: boolean;
  isExceedInspectionQtyVisualInspection: boolean;

  canAddDefectTypesQty = true;
  canAddDefectTypes = true;
  sapBasedParameterExpanded: boolean;
  resultPassFailSapBased: string;
  resultPassVisualInspection: string;
  acceptRejectResults: any[];

  supplierTestReportId: any;
  testReportId: any;
  partTestReportAttachments: any;
  partTestReportParameterId: any;
  partTestReportTabDetails: SupplierTestReport[];
  isSupplierTestReportAttachmentUploaded: boolean;
  isInspectionDetailsMaxCharactersValid: boolean;
  isVisualInspectionDetailsMaxCharactersValid: boolean;
  dateCodeTabId: TabType;
  isCommodityPCBOrPWB: boolean;
  isSurfaceFinishingDateEnabled: boolean;
  acceptRejectList: any;
  supplierDateCodeId: number;
  isRemainingDaysWithinLimit: boolean;
  filteredSupplierTestReportTabDetails: SupplierTestReport[];
  maxDate: any;
  isBowTwistExpanded: boolean;
  bowTwistTabId: number;
  dataTypeList: any[];
  bowTwistTitles: any[] = [];
  displaySupplierBowTwistColumns: any;
  supplierBowTwist = new SupplierBowTwist();
  supplierBowTwists: SupplierBowTwist[] = [];
  specType: Map<number, string>;
  specTypeId: number;
  dataTypeId: number;
  isDisplayColumnReload: boolean;
  specWithMMCId: TabType;
  supplierMPositionToleranceTabDetails: SupplierMPosition[] = [];
  supplierAddMPositionToleranceTabDetails: SupplierMPosition[] = [];
  partMPositionToleranceTabDetails: SupplierMPosition[] = [];
  partMPositionTolerances: MPositionToleranceModel[] = [];
  isMPositionToleranceExpanded: boolean;
  supplierMPositionToleranceColumns: any;
  mPositionTolerance: SupplierMPosition;
  childDisplayColumnsMMC: any;
  specWithLMCId: TabType;
  supplierLPositionToleranceTabDetails: SupplierLPosition[] = [];
  supplierAddLPositionToleranceTabDetails: SupplierLPosition[] = [];
  partLPositionToleranceTabDetails: SupplierLPosition[] = [];
  partLPositionTolerances: LPositionToleranceModel[] = [];
  isLPositionToleranceExpanded: boolean;
  supplierLPositionToleranceColumns: any;
  lPositionTolerance: SupplierLPosition;
  childDisplayColumnsLMC: any;

  sapRejectQty: Number;
  private readonly geometryTolerance = 'geometry tolerance';
  private readonly actualmeasuredgeometry = 'actual measured geometry';
  dimensionDefaults: DimensionDefault[];
  dynamicInstrumentNoCollection: any;
  supplierLPositionActuals: any;

  supplierMPositionActuals: any;
  actualValueMMC = 'ActualValueMMC';
  actualValueLMC = 'ActualValueLMC';
  actualValueMicroSection = 'ActualValueMicroSection';
  actualValueBowTwist = 'ActualValueBowTwist';
  actualValueFunctionVariable = 'ActualValueFunctionVariable';
  actualValueFunctionAttribute = 'FunctionAttributeResult';
  actualValueDimensionMeasurement = 'ActualValueDimensionMeasurement';
  tableWidthForMMCLMC: number;
  tableWidthForFunctionAttribute: number;
  private readonly constantTablewidth = 100;
  private readonly approximateWidthForEachTextBox = 9;
  tableWidthForMicroSection: number;
  tableWidthForFunctionVariable: number;
  tableWidthForBowTwist: number;
  resultPassFailVisualInspection: string;
  visualInspectionResultPassFailId: number;
  details: any;
  @Output() public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();


  maxFileUploadLimit: number;
  maxFileSize: number;
  savePathFilUpload = 'sms-file-upload';

  isApprovedInspectionPlan = false;
  isApprovedRejectVisible: boolean;
  totalApprovedBatchQuantity: number;

  funSampleSize = 0;
  dimSampleSize = 0;
  visSampleSize = 0;


  generateSpecWithMMCMainRowColumns() {
    this.supplierMPositionToleranceColumns = (new SupplierMPosition()).displayColumns();
    let mainRowExclusionColumnsforMMC: string[];
    mainRowExclusionColumnsforMMC = ['InstrumentNo', 'SpecLimitAtMMC', 'SpecLimitAtLMC'];
    for (let i = this.supplierMPositionToleranceColumns.length - 1; i >= 0; i--) {
      if (mainRowExclusionColumnsforMMC.some(k => k.toLowerCase() === this.supplierMPositionToleranceColumns[i].header.toLowerCase())) {
        this.supplierMPositionToleranceColumns.splice(i, 1);
      }
    }
  }
  generateSpecWithLMCMainRowColumns() {
    this.supplierLPositionToleranceColumns = (new SupplierLPosition()).displayColumns();
    let mainRowExclusionColumnsforLMC: string[];
    mainRowExclusionColumnsforLMC = ['InstrumentNo', 'SpecLimitAtLMC', 'SpecLimitAtMMC'];
    for (let i = this.supplierLPositionToleranceColumns.length - 1; i >= 0; i--) {
      if (mainRowExclusionColumnsforLMC.some(k => k.toLowerCase() === this.supplierLPositionToleranceColumns[i].header.toLowerCase())) {
        this.supplierLPositionToleranceColumns.splice(i, 1);
      }
    }
  }


  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      partNo: new FormControl({ value: null, disabled: true }),
      manufacturePartNumber: new FormControl({ value: null, disabled: true }),
      manufacturer: new FormControl({ value: '', disabled: true }),
      workCell: new FormControl({ value: null, disabled: true }),
      supplier: new FormControl({ value: null, disabled: true }),
      supplierContact: new FormControl({ value: null, disabled: true }),
      ip: new FormControl({ value: null, disabled: true }),
      smsNo: new FormControl({ value: Constants.Empty, disabled: true }),
      pONumber: new FormControl({ value: null, disabled: true }),

      quantity: new FormControl({ value: null, disabled: true }),

      batchNo: new FormControl({ value: null, disabled: true }),

      batchQuantity: new FormControl({ value: null, disabled: true }),
      quantityBalance: new FormControl({ value: null, disabled: true }),
      inspector: new FormControl({ value: null, disabled: true }),
      smsStatus: new FormControl({ value: null, disabled: true }),
      isEnabled: new FormControl(true),
      changeReason: new FormControl(Constants.Empty),
      supplierFunctionAttribute: new FormControl({ value: null, disabled: true }),
      supplierVisualInspection: new FormControl({ value: null, disabled: true }),
      supplierMicroSection: new FormControl({ value: null, disabled: true }),
      supplierSampling: new FormControl({ value: null, disabled: true }),
      supplierSapBasedParameter: new FormControl({ value: null, disabled: true }),
      supplierDimensionMeasurement: new FormControl({ value: null, disabled: true }),
      supplierFunctionVariable: new FormControl({ value: null, disabled: true }),
      result: new FormControl(Constants.Empty),
      packagingQuantity: new FormControl({ value: Numbers.Default, disabled: true }),
      resultDescription: new FormControl({ value: null, disabled: true }),
      supplierTestReport: new FormControl({ value: null, disabled: true }),
      manufactureDate: new FormControl({ value: null, disabled: true }),
      shelfLifeMonths: new FormControl({ value: null, disabled: true }),
      manufactureDCWeeks: new FormControl({ value: null, disabled: true }),
      manufactureDCYears: new FormControl({ value: null, disabled: true }),
      surfaceFinishingDate: new FormControl({ value: null, disabled: true }),
      dateCodeDetails: new FormControl({ value: null, disabled: true }),
      expireDate: new FormControl({ value: null, disabled: true }, [
      ]),
      acceptReject: new FormControl({ value: null, disabled: true }),
      remainingDays: new FormControl({ value: null, disabled: true }),
      supplierTestReportTabDetails: new FormControl({ value: null, disabled: true }),
      supplierBowTwists: new FormControl({ value: null, disabled: true }),
      uploadSMSCommentFiles: new FormControl(null),
      comments: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(256),
        validateWhiteSpace])
    });
  }




  ngOnInit() {
    this.recId = this.details.id;
    this.maxFileUploadLimit = maxFileLimit;
    this.maxFileSize = maxFileSize;
    this.acceptRejectList = acceptRejectOptions;
    this.bowTwistTitles = this.emptyDisplayMessage();
    super.ngOnInit();
    this.getAllInstrumentNo();
    this.getAllDefectTypes();
    this.getData();
    this.initializeTabExpandedSetting();
    this.initializeTabIds();
    this.getAllInstrumentTypes();
    this.getAllUnits();
    this.isRejected = false;
    this.currentUser = this.authService.retrieveUser();

    this.formInput.patchValue({
      inspector: this.currentUser.name
    });

    this.purchaseOrderState = purchaseOrderState;

    this.supplierId = (this.currentUser.supplier != null) ? this.currentUser.supplier.id : Constants.Empty;

    this.getDefaultResult();

    this.getAllDimensionDefault();

    this.tempFolder = this.apiService.getFileUploadId();

    this.isCommentDisabled();
  }

  isCommentEmpty() {
    return this.hasError(this.properties.comments, ValidationErrorCodes.required);
  }

  isCommentHasWhiteSpace() {
    return this.hasError(
      this.properties.comments,
      ValidationErrorCodes.validateWhiteSpace
    );
  }

  isCommentModified() {
    return this.isModified(this.properties.comments);
  }

  isCommentDisabled() {
    const currentUser = this.authService.retrieveUser();
    if (currentUser.userTypeId === UserType.Supplier) {
      this.formInput.controls[this.properties.comments].disable();
    } else if (currentUser.userTypeId === UserType.User && this.isApprovedRejectVisible) {
      this.formInput.controls[this.properties.comments].enable();
      this.isApprovedInspectionPlan = this.isApprovedInspectionPlan ? true : false;
    } else {
      this.formInput.controls[this.properties.comments].disable();
    }
  }

  isCommentFileUploadVisible(): boolean {
    const currentUser = this.authService.retrieveUser();
    if (currentUser.userTypeId === UserType.Supplier) {
      if (this.supplierMeasurement?.stateTypeId === PartPlanStateType.Approved_By_SQE || this.supplierMeasurement.stateTypeId === PartPlanStateType.Rejected_By_SQE) {
        return true;
      }
      return false;
    } else if (currentUser.userTypeId === UserType.User && this.isApprovedRejectVisible || (currentUser.userTypeId === UserType.User &&
      (this.supplierMeasurement?.stateTypeId === PartPlanStateType.Approved_By_SQE || this.supplierMeasurement.stateTypeId === PartPlanStateType.Rejected_By_SQE))) {
      return true;
    } else {
      return false;
    }
  }

  isActionButtonVisible(): boolean {
    const currentUser = this.authService.retrieveUser();
    if (currentUser.userTypeId === UserType.Supplier) {
      return false;
    } else if (currentUser.userTypeId === UserType.User) {
      return this.isApprovedRejectVisible ? true : false;
    } else {
      return false;
    }
  }

  emptyDisplayMessage() {
    this.bowTwistTitles.push(
      {
        id: 1,
        spec: 1,
        displayMessage: '',
        rows: [
        ]
      }
    );
    return this.bowTwistTitles;
  }

  mapSupplierSamplingPlan() {

    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    this.supplierSamplingPlans = [];
    if (this.samplingPlans !== undefined) {
      this.samplingPlans.forEach((ele) => {

        this.apiService.getSampleSize(this.partNo, this.vendorCode, ele.mstrChar, batchQuantity, ele.smplProc.split('=')[0]).subscribe(data => {
          if (data && data.value.length > 0) {
            ele.sampleSize = data.value[0].smplSize;
          } else {
            ele.sampleSize = '0';
          }
          // Map
          this.supplierSamplingPlans = this.samplingPlans.map(element => {
            return {
              mstrChar: element.mstrChar,
              smplProc: element.smplProc,
              site: element.site,
              certificateType: element.certificateType,
              partInspectionSamplingPlanId: element.id,
              sMSId: this.recId != null ? this.recId : 0,
              sapPartInspectionPlanId: element.sapPartInspectionPlanId,
              failedQuantity: element.failedQuantity,
              sampleSize: element.sampleSize
            };
          });

        });
      });
    }
  }

  getData() {
    if (this.recId === null) {
      // In order to work properly need to add a delay
      setTimeout(() => {
      }, environment.timer.autoReturn);
      return;
    } const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = this.expandRelatedData();
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        this.supplierMeasurement = new SupplierMeasurementSubmission(data.value[0]);
        this.formDetails = this.entity;
        this.entity = this.supplierMeasurement;
        this.formInput.patchValue({
          partNo: this.supplierMeasurement.partNo,
          ip: this.supplierMeasurement.ip,
          smsNo: this.supplierMeasurement.smsNo,
          smsSerialNumber: this.supplierMeasurement.smsSerialNumber,
          workCell: this.supplierMeasurement.workCell.name,
          manufacturer: this.supplierMeasurement.manufacturer,
          supplier: this.supplierMeasurement.supplier,
          supplierContact: this.supplierMeasurement.supplierContact.name,
          manufacturePartNumber: this.supplierMeasurement.manufacturePartNumber,
          smsStatus: (this.supplierMeasurement.smspoStateTypeId === PurchaseOrderState.Complete ? this.purchaseOrderState.get(PurchaseOrderState.Complete)
            : this.purchaseOrderState.get(PurchaseOrderState.Pending)),
          batchNo: this.supplierMeasurement.batchNo,
          batchQuantity: this.supplierMeasurement.batchQuantity,
          pONumber: this.supplierMeasurement.purchaseOrder.purchaseOrderNo,
          quantity: this.supplierMeasurement.purchaseOrder.quantity,
          isEnabled: this.supplierMeasurement.isEnabled,
          quantityBalance: (this.supplierMeasurement.purchaseOrder.quantity - this.supplierMeasurement.batchQuantity),
          resultDescription: this.supplierMeasurement.resultDescription,
          packagingQuantity: this.supplierMeasurement.packagingQuantity,
          result: this.supplierMeasurement.resultId === acceptRejectOptions[0].id ? acceptRejectOptions[0].name : acceptRejectOptions[1].name,
          supplierDateCodeId: this.supplierMeasurement.supplierDateCodeId,
          comments: this.supplierMeasurement.comments,
          uploadSMSCommentFiles: this.supplierMeasurement.smsCommentAttachments
        });

        this.isRejected = this.supplierMeasurement.stateTypeId === PartPlanStateType.Rejected_By_SQE ? true : false;

        this.vendorCode = (this.supplierMeasurement.supplier != null) ? this.supplierMeasurement.supplier.vendorCode : Constants.Empty;

        this.site = this.currentUser.site.code;

        this.supplierId = (this.currentUser.supplier != null) ? this.currentUser.supplier.id : Constants.Empty;

        this.sapPartInspectionPlanId = this.supplierMeasurement.sapPartInspectionPlanId;

        this.suppliercontactId = this.supplierMeasurement.supplierContactId;

        this.purchaseOrderId = this.supplierMeasurement.purchaseOrderId;

        this.workCellId = this.supplierMeasurement.workCellId;

        this.ip = this.supplierMeasurement.ip;

        this.getSummaryResults();

        this.partNo = this.supplierMeasurement.partNo;

        this.batchQuantity = this.supplierMeasurement.batchQuantity;

        this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

        this.setSMSStatus();

        this.getSMSCommentFiles();

        this.isbatchQuantityValid = this.supplierMeasurement.batchQuantity > this.supplierMeasurement.purchaseOrder.quantity ? false : true;
        this.sapPartInspectionPlanId = data.value[0].sapPartInspectionPlanId;
        this.sapPartInspectionPlan = data.value[0].sapPartInspectionPlan;
        this.commodityId = this.sapPartInspectionPlan.commodityId;
        this.getSapPartInspectionSamplingPlans(this.sapPartInspectionPlanId);
        if (this.sapPartInspectionPlanId && !this.isSupplierTestReportExpanded) {
          const sapPageSortFilterInfo = new PageSortFilterInfo();
          sapPageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setTestReportPageSortFilterInfo(sapPageSortFilterInfo);
          this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, sapPageSortFilterInfo).subscribe(testReportData => {
            this.dataTypeId = testReportData.value[0].dataTypeId;
            this.specTypeId = testReportData.value[0].specTypeId;

            this.getDefaultTestReportDetails(testReportData);
          });
        }
        this.getDefaultSAPDateCode();
      }

    });
  }

  getSummaryResults() {
    if (this.supplierMeasurement.stateTypeId !== undefined && this.supplierMeasurement.stateTypeId !== PartPlanStateType.Draft) {
      this.isSummarySectionVisible = true;
      this.getSupplierSpcChartSummary(this.ip, this.recId);
    }
  }

  getSMSCommentFiles() {
    if (this.supplierMeasurement.smsCommentAttachments != null && this.supplierMeasurement.smsCommentAttachments.length > 0) {
      this.uploadSMSCommentFiles = [];
      this.supplierMeasurement.smsCommentAttachments.forEach(element => {
        this.uploadSMSCommentAttachments.push(element.attachment);
        this.uploadSMSCommentFiles.push(this.attachmentService.getFilesFromUpload(element));
      });
      this.formInput.patchValue({
        uploadSMSCommentFiles: this.uploadSMSCommentFiles
      });
    }
  }

  setSMSCommentAttachment(path: string, updateSAPPartInspectionPlanModel: ApproveRejectSupplierMeasurementSubmissionPlanModel) {
    this.uploadSMSCommentFiles = this.formInput.controls[this.properties.uploadSMSCommentFiles].value;
    const fArrayUploadCertification: Attachment[] = [];
    if (this.uploadSMSCommentFiles != null) {
      this.uploadSMSCommentFiles.forEach(function (value) {
        const file = new Attachment();
        file.name = value.file.name;
        file.savePath = path;
        file.tempSavePath = value.filePath;
        fArrayUploadCertification.push(file);
      });
      updateSAPPartInspectionPlanModel.uploadSMSCommentAttachments = fArrayUploadCertification;
    }
  }

  updateRemovedSMSCommentAttachmentIds(updateSAPPartInspectionPlanModel: UpdateSupplierMeasurementSubmissionModel) {
    updateSAPPartInspectionPlanModel.removedSMSCommentAttachmentIds = [];
    this.uploadSMSCommentAttachments.forEach(a => {
      if (!this.uploadSMSCommentFiles.map(f => Number(f.id)).includes(a.id)) {
        updateSAPPartInspectionPlanModel.removedSMSCommentAttachmentIds.push(a.id);
      }
    });
  }


  isSMSCommentUploadModified() {
    return this.isModified(this.properties.uploadSMSCommentFiles);
  }

  isSMSCommentUploaEmpty() {
    return this.hasError(this.properties.uploadSMSCommentFiles, ValidationErrorCodes.required);
  }


  getSapPartInspectionSamplingPlans(sapPartInspectionPlanId) {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.sapPartInspectionPlanService.expandCommodity(),
            this.sapPartInspectionPlanService.expandPartInspectionSamplingPlans()
          ]
      };


    this.sapPartInspectionPlanService.getDataById(sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
      if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.sapPartInspectionPlanService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.commodity = data.value[0].commodity;
        this.sapPartInspectionPlan.sapPartInspectionPlanSamplingPlans = data.value[0].sapPartInspectionPlanSamplingPlans;
        this.samplingPlans = this.sapPartInspectionPlan.sapPartInspectionPlanSamplingPlans;
        this.mapSupplierSamplingPlan();
        this.getDefaultCommodityResultParameter(this.sapPartInspectionPlan, null);
        this.getDefaultVisualInspectionParameter(this.sapPartInspectionPlan, null);
      }
    });
  }

  getCommentUpdateModel(): ApproveRejectSupplierMeasurementSubmissionPlanModel {

    const approveRejectSupplierMeasurementSubmissionPlanModel = new ApproveRejectSupplierMeasurementSubmissionPlanModel();

    Automapper.map(this.details, approveRejectSupplierMeasurementSubmissionPlanModel);
    this.recId = approveRejectSupplierMeasurementSubmissionPlanModel.id;
    approveRejectSupplierMeasurementSubmissionPlanModel.approveRejectedDate = new Date();
    approveRejectSupplierMeasurementSubmissionPlanModel.comments = this.formInput.controls[this.properties.comments].value;
    this.setSMSCommentAttachment(this.savePath, approveRejectSupplierMeasurementSubmissionPlanModel);
    return approveRejectSupplierMeasurementSubmissionPlanModel;
  }



  Rejected() {
    this.close();
    const updateModel = this.getCommentUpdateModel();
    updateModel.approveRejectedId = this.authService.retrieveUser().id;
    updateModel.approveRejectedDate = new Date();
    updateModel.submittedByUserId = this.authService.retrieveUser().id;
    updateModel.stateTypeId = PartPlanStateType.Rejected_By_SQE;
    this._apiService.updateData(this.recId, updateModel).subscribe(() => {
      this.cancelRoute = '/SQETasks';
      this.postSaved();
      this.activeModal.dismiss('Click X');

    });
  }

  Approved() {
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value;
    const poQuantity = this.formInput.controls[this.properties.quantity].value;
    this.apiService.getTotalSubmittedApprovedBatchQty(this.sapPartInspectionPlanId, this.purchaseOrderId).subscribe(data => {
      if (data) {
        this.totalApprovedBatchQuantity = data;
        this.isbatchQuantityValid = (batchQuantity + this.totalApprovedBatchQuantity) > poQuantity ? false : true;
        if (!this.isbatchQuantityValid) {
          this.notificationService.showWarning(ToastMessage.BatchQuantityExceeds);
          return;
        }
      }
    }, () => { }, () => {
      this.close();
      const updateModel = this.getCommentUpdateModel();
      updateModel.approveRejectedId = this.authService.retrieveUser().id;
      updateModel.approveRejectedDate = new Date();
      updateModel.submittedByUserId = this.authService.retrieveUser().id;
      updateModel.stateTypeId = PartPlanStateType.Approved_By_SQE;
      this._apiService.updateData(this.recId, updateModel).subscribe(() => {
        this.cancelRoute = '/SQETasks';
        this.postSaved();
        this.activeModal.dismiss('Click X');
      });
    });
  }

  getUpdateModel(): UpdateSupplierMeasurementSubmissionModel {

    const updateSupplierMeasurementModel = new UpdateSupplierMeasurementSubmissionModel();

    Automapper.map(this.entity, updateSupplierMeasurementModel);

    updateSupplierMeasurementModel.workCellId = this.workCellId;

    updateSupplierMeasurementModel.supplierContactId = this.suppliercontactId;

    updateSupplierMeasurementModel.purchaseOrderId = this.purchaseOrderId;

    updateSupplierMeasurementModel.isEnabled = this.formInput.controls[this.properties.isEnabled].value == null
      ? false : this.formInput.controls[this.properties.isEnabled].value;

    updateSupplierMeasurementModel.ip = this.formInput.controls[this.properties.ip].value;
    updateSupplierMeasurementModel.smsNo = this.formInput.controls[this.properties.smsNo].value;

    updateSupplierMeasurementModel.inspectorId = this.currentUser.id;

    updateSupplierMeasurementModel.batchNo = this.formInput.controls[this.properties.batchNo].value;

    updateSupplierMeasurementModel.batchQuantity = this.formInput.controls[this.properties.batchQuantity].value;

    updateSupplierMeasurementModel.quantity = this.formInput.controls[this.properties.quantity].value;

    updateSupplierMeasurementModel.manufacturer = this.formInput.controls[this.properties.manufacturer].value;

    updateSupplierMeasurementModel.manufacturePartNumber = this.supplierMeasurement.manufacturePartNumber;

    updateSupplierMeasurementModel.supplierFunctionAttributes = this.returnFunctionAttributeObject();

    updateSupplierMeasurementModel.supplierFunctionAttributes = this.removeFunctionAttributeExpandModels(this.supplierFunctionAttributeDetails, this.recId);

    updateSupplierMeasurementModel.supplierMicroSectionParameters = this.returnSupplierMicroSectionObject();

    updateSupplierMeasurementModel.supplierMicroSectionParameters = this.removeMicroSectionParameterExpandModels(this.supplierMicroSectionParameters, this.recId);

    updateSupplierMeasurementModel.supplierSapBasedParameters = this.returnSupplierSapBasedObject(this.supplierSapBasedParameters, this.recId);

    updateSupplierMeasurementModel.supplierDimensionMeasurements = this.returnSupplierDimensionMeasurementObject();
    updateSupplierMeasurementModel.supplierDimensionMeasurements = this.removeDimensionMeasurementExpandModels(updateSupplierMeasurementModel.supplierDimensionMeasurements, this.recId);
    // updateSupplierMeasurementModel.supplierDimensionMeasurements = this.removeDimensionMeasurementExpandModels(this.supplierDimensionMeasurements, this.recId);

    // updateSupplierMeasurementModel.supplierVisualInspections = this.returnSupplierVisualInspectionObj(this.supplierVisualInspectionDetails, this.recId);
    updateSupplierMeasurementModel.supplierVisualInspections = this.removeVisualInspectionExpandModels(this.supplierVisualInspectionDetails, this.recId);

    updateSupplierMeasurementModel.supplierFunctionVariables = this.returnSupplierFunctionVariableObject();

    updateSupplierMeasurementModel.supplierFunctionVariables = this.removeFunctionVariableExpandModels(updateSupplierMeasurementModel.supplierFunctionVariables, this.recId);
    // updateSupplierMeasurementModel.supplierFunctionVariables = this.removeFunctionVariableExpandModels(this.supplierFunctionVariables, this.recId);

    updateSupplierMeasurementModel.supplierSamplingPlans = this.masterInspectionExpanded ? this.supplierSamplingPlans : null;

    updateSupplierMeasurementModel.resultId = this.getAcceptRejectResult();

    updateSupplierMeasurementModel.sapPartInspectionPlanId = this.sapPartInspectionPlanId;

    updateSupplierMeasurementModel.smspoStateTypeId =
      this.formInput.controls[this.properties.smsStatus].value === this.purchaseOrderState.get(PurchaseOrderState.Complete)
        ? PurchaseOrderState.Complete : PurchaseOrderState.Pending;

    updateSupplierMeasurementModel.supplierTestReports = this.updateSupplierTestReportExpandModels(this.supplierTestReportTabDetails);

    const supplierDateCode = this.getSupplierDateCode();

    updateSupplierMeasurementModel.supplierDateCode = this.isDateCodeExpanded ? supplierDateCode : null;

    updateSupplierMeasurementModel.supplierBowTwists = this.returnSupplierBowTwistObject();

    updateSupplierMeasurementModel.supplierBowTwists = this.DeserilizeObjectSupplierBowTwist(updateSupplierMeasurementModel.supplierBowTwists);

    updateSupplierMeasurementModel.supplierMPositions = this.isMPositionToleranceExpanded ? this.updateSupplierMPositions() : null;

    updateSupplierMeasurementModel.supplierLPositions = this.isLPositionToleranceExpanded ? this.updateSupplierLPositions() : null;

    updateSupplierMeasurementModel.comments = this.formInput.controls[this.properties.comments].value;

    return updateSupplierMeasurementModel;
  }

  setSupplierLPositions(): SupplierLPosition[] {
    const supplierAddLPositionToleranceTabDetails = JSON.parse(JSON.stringify(this.supplierLPositionToleranceTabDetails));
    supplierAddLPositionToleranceTabDetails.forEach(element => {
      if (element.childDataSource != null && element.childDataSource !== undefined) {
        element.partLPositionToleranceId = element.id;
        element.childDataSource.forEach(childElement => {
          this.lPositionTolerance = new SupplierLPosition();
          childElement.partLPositionToleranceId = element.id;
          childElement.parameterManagementId = element.parameterManagementId;
          this.lPositionTolerance = this.returnSupplierLPositionObj(childElement);
          const lPositionActualParsedArray = JSON.parse(JSON.stringify(childElement));

          for (const key in lPositionActualParsedArray) {
            if (lPositionActualParsedArray.hasOwnProperty(key)) {
              if (key.includes(this.actualValueLMC) && key !== Constants.Empty && lPositionActualParsedArray[key] !== Constants.Empty) {
                const supplierLPositionActual = new SupplierLPositionActual();
                supplierLPositionActual.actualText = key;
                supplierLPositionActual.actualValue = lPositionActualParsedArray[key];
                if (!this.supplierLPositionActuals) {
                  this.supplierLPositionActuals = [];
                }
                this.supplierLPositionActuals.push(supplierLPositionActual);
              }
            }
          }
          supplierAddLPositionToleranceTabDetails.push(this.lPositionTolerance);
          if (this.matchinglPositionData(supplierAddLPositionToleranceTabDetails)
            && this.matchinglPositionData(supplierAddLPositionToleranceTabDetails).supplierLPositionActuals === undefined) {
            this.matchinglPositionData(supplierAddLPositionToleranceTabDetails).supplierLPositionActuals = [];
          }
          if (this.supplierLPositionActuals
            && this.matchinglPositionData(supplierAddLPositionToleranceTabDetails)) {
            this.matchinglPositionData(supplierAddLPositionToleranceTabDetails).supplierLPositionActuals = this.supplierLPositionActuals;
            this.supplierLPositionActuals = [];
          }
        });

      }

    });

    supplierAddLPositionToleranceTabDetails.forEach(element => {
      this.updateIdFromZeroToNullForLMC(element);
    });
    return supplierAddLPositionToleranceTabDetails;
  }


  updateIdFromZeroToNullForLMC(element: any) {
    element.id = 0,
      element.partLPositionToleranceId = (element.partLPositionToleranceId === 0 ? null : element.partLPositionToleranceId);
    element.instrumentId = ((element.instrumentId === 0 || element.instrumentId === '0') ? null : element.instrumentId);
    element.instrumentTypeId = ((element.instrumentTypeId === 0 || element.instrumentTypeId === '0') ? null : element.instrumentTypeId);
    element.uomId = ((element.uomId === 0 || element.uomId === '0') ? null : element.uomId);
    element.parameterManagement = null;
    element.partDimension = null;
    element.instrumentType = null;
    element.childDataSource = [];
  }


  updateIdFromZeroToNullForMMC(element: any) {
    element.id = 0,
      element.partMPositionToleranceId = (element.partMPositionToleranceId === 0 ? null : element.partMPositionToleranceId);
    element.instrumentId = ((element.instrumentId === 0 || element.instrumentId === '0') ? null : element.instrumentId);
    element.instrumentTypeId = ((element.instrumentTypeId === 0 || element.instrumentTypeId === '0') ? null : element.instrumentTypeId);
    element.uomId = ((element.uomId === 0 || element.uomId === '0') ? null : element.uomId);
    element.parameterManagement = null;
    element.partDimension = null;
    element.instrumentType = null;
    element.childDataSource = [];
  }

  updateSupplierLPositions(): SupplierLPosition[] {
    const supplierUpdateLPositionToleranceTabDetails = JSON.parse(JSON.stringify(this.supplierLPositionToleranceTabDetails));
    supplierUpdateLPositionToleranceTabDetails.forEach(element => {
      if (element.childDataSource != null && element.childDataSource !== undefined) {
        element.childDataSource.forEach(childElement => {
          this.lPositionTolerance = new SupplierLPosition();
          this.lPositionTolerance = this.returnSupplierLPositionObj(childElement);
          const lPositionActualParsedArray = JSON.parse(JSON.stringify(childElement));
          for (const key in lPositionActualParsedArray) {
            if (lPositionActualParsedArray.hasOwnProperty(key)) {
              if (key.includes(this.actualValueLMC) && key !== Constants.Empty && lPositionActualParsedArray[key] !== Constants.Empty) {
                const supplierLPositionActual = new SupplierLPositionActual();
                supplierLPositionActual.actualText = key;
                supplierLPositionActual.actualValue = lPositionActualParsedArray[key];
                if (!this.supplierLPositionActuals) {
                  this.supplierLPositionActuals = [];
                }
                this.supplierLPositionActuals.push(supplierLPositionActual);
              }
            }
          }
          supplierUpdateLPositionToleranceTabDetails.push(this.lPositionTolerance);
          if (this.matchinglPositionData(supplierUpdateLPositionToleranceTabDetails)
            && this.matchinglPositionData(supplierUpdateLPositionToleranceTabDetails).supplierLPositionActuals === undefined) {
            this.matchinglPositionData(supplierUpdateLPositionToleranceTabDetails).supplierLPositionActuals = [];
          }
          if (this.supplierLPositionActuals
            && this.matchinglPositionData(supplierUpdateLPositionToleranceTabDetails)) {
            this.matchinglPositionData(supplierUpdateLPositionToleranceTabDetails).supplierLPositionActuals = this.supplierLPositionActuals;
            this.supplierLPositionActuals = [];
          }
        });
      }
    });

    supplierUpdateLPositionToleranceTabDetails.forEach(element => {
      this.updateIdFromZeroToNullForLMC(element);
    });
    return supplierUpdateLPositionToleranceTabDetails;
  }

  private matchingmPositionData(supplierAddMPositionToleranceTabDetails: any) {
    return supplierAddMPositionToleranceTabDetails
      .find(k => k.partMPositionToleranceId === this.mPositionTolerance.partMPositionToleranceId
        && k.dimensionNumber === this.mPositionTolerance.dimensionNumber);
  }

  private matchinglPositionData(supplierAddLPositionToleranceTabDetails: any) {
    return supplierAddLPositionToleranceTabDetails
      .find(k => k.partLPositionToleranceId === this.lPositionTolerance.partLPositionToleranceId
        && k.dimensionNumber === this.lPositionTolerance.dimensionNumber);
  }


  getAddModel(): AddSupplierMeasurementSubmissionModel {

    const addSupplierMeasurementModel = new AddSupplierMeasurementSubmissionModel();

    Automapper.map(this.entity, addSupplierMeasurementModel);

    addSupplierMeasurementModel.workCellId = this.workCellId;

    addSupplierMeasurementModel.supplierId = this.supplierId;

    addSupplierMeasurementModel.supplierContactId = this.suppliercontactId;

    addSupplierMeasurementModel.purchaseOrderId = this.purchaseOrderId;

    addSupplierMeasurementModel.isEnabled = this.formInput.controls[this.properties.isEnabled].value == null
      ? false : this.formInput.controls[this.properties.isEnabled].value;

    addSupplierMeasurementModel.ip = this.formInput.controls[this.properties.ip].value;
    addSupplierMeasurementModel.smsNo = this.formInput.controls[this.properties.smsNo].value;
    addSupplierMeasurementModel.batchNo = this.formInput.controls[this.properties.batchNo].value;

    addSupplierMeasurementModel.batchQuantity = this.formInput.controls[this.properties.batchQuantity].value;

    addSupplierMeasurementModel.quantity = this.formInput.controls[this.properties.quantity].value;

    addSupplierMeasurementModel.manufacturer = this.formInput.controls[this.properties.manufacturer].value;

    addSupplierMeasurementModel.manufacturePartNumber = this.formInput.controls[this.properties.manufacturePartNumber].value;

    addSupplierMeasurementModel.sapPartInspectionPlanId = this.sapPartInspectionPlanId;

    addSupplierMeasurementModel.resultId = this.getAcceptRejectResult();

    addSupplierMeasurementModel.supplierFunctionAttributes = this.returnFunctionAttributeObject();

    addSupplierMeasurementModel.supplierFunctionAttributes = this.removeFunctionAttributeExpandModels(this.supplierFunctionAttributeDetails, 0);

    addSupplierMeasurementModel.supplierMicroSectionParameters = this.returnSupplierMicroSectionObject();
    addSupplierMeasurementModel.supplierMicroSectionParameters = this.removeMicroSectionParameterExpandModels(this.supplierMicroSectionParameters, 0);

    addSupplierMeasurementModel.supplierSapBasedParameters = this.returnSupplierSapBasedObject(this.supplierSapBasedParameters, 0);

    // const resultPassFailId = this.isPassFailResultVisualInspection;
    addSupplierMeasurementModel.supplierVisualInspections = this.removeVisualInspectionExpandModels(this.supplierVisualInspectionDetails, 0);

    addSupplierMeasurementModel.supplierDimensionMeasurements = this.returnSupplierDimensionMeasurementObject();
    addSupplierMeasurementModel.supplierDimensionMeasurements = this.removeDimensionMeasurementExpandModels(addSupplierMeasurementModel.supplierDimensionMeasurements, 0);
    // addSupplierMeasurementModel.supplierDimensionMeasurements = this.removeDimensionMeasurementExpandModels(this.supplierDimensionMeasurements, 0);

    addSupplierMeasurementModel.supplierFunctionVariables = this.returnSupplierFunctionVariableObject();
    addSupplierMeasurementModel.supplierFunctionVariables = this.removeFunctionVariableExpandModels(addSupplierMeasurementModel.supplierFunctionVariables, 0);
    // addSupplierMeasurementModel.supplierFunctionVariables = this.removeFunctionVariableExpandModels(this.supplierFunctionVariables, 0);

    addSupplierMeasurementModel.inspectorId = this.currentUser.id;

    addSupplierMeasurementModel.smspoStateTypeId =
      this.formInput.controls[this.properties.smsStatus].value === this.purchaseOrderState.get(PurchaseOrderState.Complete)
        ? PurchaseOrderState.Complete : PurchaseOrderState.Pending;


    addSupplierMeasurementModel.supplierSamplingPlans = this.supplierSamplingPlans;

    addSupplierMeasurementModel.supplierTestReports = this.setSupplierTestReportExpandModels(this.supplierTestReportTabDetails);

    const supplierDateCode = this.getSupplierDateCode();
    addSupplierMeasurementModel.supplierDateCode = supplierDateCode;
    addSupplierMeasurementModel.supplierLPositions = this.setSupplierLPositions();

    addSupplierMeasurementModel.supplierBowTwists = this.returnSupplierBowTwistObject();
    addSupplierMeasurementModel.supplierMPositions = this.setSupplierMPositions();

    addSupplierMeasurementModel.supplierBowTwists = this.DeserilizeObjectSupplierBowTwist(addSupplierMeasurementModel.supplierBowTwists);

    return addSupplierMeasurementModel;
  }

  setSupplierMPositions(): SupplierMPosition[] {
    const supplierAddMPositionToleranceTabDetails = JSON.parse(JSON.stringify(this.supplierMPositionToleranceTabDetails));
    supplierAddMPositionToleranceTabDetails.forEach(element => {
      if (element.childDataSource != null && element.childDataSource !== undefined) {
        element.partMPositionToleranceId = element.id;
        element.childDataSource.forEach(childElement => {
          this.mPositionTolerance = new SupplierMPosition();
          childElement.partMPositionToleranceId = element.id;
          childElement.parameterManagementId = element.parameterManagementId;
          this.mPositionTolerance = this.returnSupplierMPositionObj(childElement);
          const mPositionActualParsedArray = JSON.parse(JSON.stringify(childElement));

          for (const key in mPositionActualParsedArray) {
            if (mPositionActualParsedArray.hasOwnProperty(key)) {
              if (key.includes(this.actualValueMMC) && key !== Constants.Empty && mPositionActualParsedArray[key] !== Constants.Empty) {
                const supplierMPositionActual = new SupplierMPositionActual();
                supplierMPositionActual.actualText = key;
                supplierMPositionActual.actualValue = mPositionActualParsedArray[key];
                if (!this.supplierMPositionActuals) {
                  this.supplierMPositionActuals = [];
                }
                this.supplierMPositionActuals.push(supplierMPositionActual);
              }
            }
          }
          supplierAddMPositionToleranceTabDetails.push(this.mPositionTolerance);
          if (this.matchingmPositionData(supplierAddMPositionToleranceTabDetails)
            && this.matchingmPositionData(supplierAddMPositionToleranceTabDetails).supplierMPositionActuals === undefined) {
            this.matchingmPositionData(supplierAddMPositionToleranceTabDetails).supplierMPositionActuals = [];
          }
          if (this.supplierMPositionActuals
            && this.matchingmPositionData(supplierAddMPositionToleranceTabDetails)) {
            this.matchingmPositionData(supplierAddMPositionToleranceTabDetails).supplierMPositionActuals = this.supplierMPositionActuals;
            this.supplierMPositionActuals = [];
          }
        });

      }

    });
    supplierAddMPositionToleranceTabDetails.forEach(element => {
      this.updateIdFromZeroToNullForMMC(element);
    });
    return supplierAddMPositionToleranceTabDetails;
  }


  updateSupplierMPositions(): SupplierMPosition[] {
    const supplierUpdateMPositionToleranceTabDetails = JSON.parse(JSON.stringify(this.supplierMPositionToleranceTabDetails));
    supplierUpdateMPositionToleranceTabDetails.forEach(element => {
      if (element.childDataSource != null && element.childDataSource !== undefined) {
        element.childDataSource.forEach(childElement => {
          this.mPositionTolerance = new SupplierMPosition();
          this.mPositionTolerance = this.returnSupplierMPositionObj(childElement);
          const mPositionActualParsedArray = JSON.parse(JSON.stringify(childElement));
          for (const key in mPositionActualParsedArray) {
            if (mPositionActualParsedArray.hasOwnProperty(key)) {
              if (key.includes(this.actualValueMMC) && key !== Constants.Empty && mPositionActualParsedArray[key] !== Constants.Empty) {
                const supplierMPositionActual = new SupplierMPositionActual();
                supplierMPositionActual.actualText = key;
                supplierMPositionActual.actualValue = mPositionActualParsedArray[key];
                if (!this.supplierMPositionActuals) {
                  this.supplierMPositionActuals = [];
                }
                this.supplierMPositionActuals.push(supplierMPositionActual);
              }
            }
          }
          supplierUpdateMPositionToleranceTabDetails.push(this.mPositionTolerance);
          if (this.matchingmPositionData(supplierUpdateMPositionToleranceTabDetails)
            && this.matchingmPositionData(supplierUpdateMPositionToleranceTabDetails).supplierMPositionActuals === undefined) {
            this.matchingmPositionData(supplierUpdateMPositionToleranceTabDetails).supplierMPositionActuals = [];
          }
          if (this.supplierMPositionActuals
            && this.matchingmPositionData(supplierUpdateMPositionToleranceTabDetails)) {
            this.matchingmPositionData(supplierUpdateMPositionToleranceTabDetails).supplierMPositionActuals = this.supplierMPositionActuals;
            this.supplierMPositionActuals = [];
          }
        });

      }

    });

    supplierUpdateMPositionToleranceTabDetails.forEach(element => {
      this.updateIdFromZeroToNullForMMC(element);
    });
    return supplierUpdateMPositionToleranceTabDetails;
  }


  returnSupplierBowTwistObject(): any {
    // tslint:disable-next-line: no-unused-expression
    this.recId !== null ? this.supplierBowTwists.map(x => x.supplierBowTwistActuals = []) : '';
    const supplierBowTwistList = this.supplierBowTwists;
    supplierBowTwistList.map(s => {
      const keys = Object.keys(s);
      keys.map((key) => {
        if (key.includes('ActualValue')) {
          const supplierBowTwistActual = new SupplierBowTwistActual();
          supplierBowTwistActual.actualTextName = key;
          supplierBowTwistActual.actualTextValue = s[key];
          s.supplierBowTwistActuals.push(supplierBowTwistActual);
        }
      });
    });
    return supplierBowTwistList;
  }

  returnSupplierFunctionVariableObject(): any {
    // tslint:disable-next-line: no-unused-expression
    this.recId !== null ? this.supplierFunctionVariables.map(x => x.supplierFunctionVariableActuals = []) : '';
    const supplierFunctionVariableList = this.supplierFunctionVariables;
    supplierFunctionVariableList.map(s => {
      const keys = Object.keys(s).slice(16, 200);
      keys.map((key) => {
        if (key.includes('ActualValue')) {
          const supplierFunctionVariableActual = new SupplierFunctionVariableActual();
          supplierFunctionVariableActual.actualTextName = key;
          supplierFunctionVariableActual.actualTextValue = s[key];
          s.supplierFunctionVariableActuals.push(supplierFunctionVariableActual);
        }
      });
    });
    return supplierFunctionVariableList;
  }

  returnSupplierMicroSectionObject(): any {
    // tslint:disable-next-line: no-unused-expression
    this.recId !== null ? this.supplierMicroSectionParameters.map(x => x.supplierMicroSectionActuals = []) : '';
    const supplierMicroSectionList = this.supplierMicroSectionParameters;
    supplierMicroSectionList.map(s => {
      const keys = Object.keys(s);
      keys.map((key) => {
        if (key.includes('ActualValue')) {
          const supplierMicroSectionActual = new SupplierMicroSectionActual();
          supplierMicroSectionActual.actualTextName = key;
          supplierMicroSectionActual.actualTextValue = s[key];
          s.supplierMicroSectionActuals.push(supplierMicroSectionActual);
        }
      });
    });
    return supplierMicroSectionList;
  }

  returnSupplierDimensionMeasurementObject(): any {
    // tslint:disable-next-line: no-unused-expression
    this.recId !== null ? this.supplierDimensionMeasurements.map(x => x.supplierDimensionMeasurementActuals = []) : '';
    const supplierDimensionMeasurementList = this.supplierDimensionMeasurements;
    supplierDimensionMeasurementList.map(s => {
      const keys = Object.keys(s);
      keys.map((key) => {
        if (key.includes('ActualValue')) {
          const supplierDimensionMeasurementActual = new SupplierDimensionMeasurementActual();
          supplierDimensionMeasurementActual.actualTextName = key;
          supplierDimensionMeasurementActual.actualTextValue = s[key];
          s.supplierDimensionMeasurementActuals.push(supplierDimensionMeasurementActual);
        }
      });
    });
    return supplierDimensionMeasurementList;
  }

  DeserilizeObjectSupplierBowTwist(supplierBowTwists): any {
    const supplierBowTwistObj = supplierBowTwists.map(element => {
      return {
        spec: Numbers.Default,
        length: Numbers.Default,
        width: Numbers.Default,
        unit: Constants.Empty,
        upperLimit: Numbers.Default,
        warPageId: Numbers.Default,
        bowTwistFormulaId: Numbers.Default,
        bowTwistFormula: null,
        warPage: null,
        dataType: Constants.Empty,
        warPageTypeId: Numbers.Default,
        partBowTwistParameterId: element.partBowTwistParameterId,
        supplierBowTwistActuals: element.supplierBowTwistActuals
      };
    });
    return supplierBowTwistObj;
  }

  setSupplierTestReportExpandModels(supplierTestReport): SupplierTestReport[] {
    if (supplierTestReport != null || supplierTestReport !== undefined) {
      supplierTestReport.forEach(testReport => {
        if (testReport.supplierTestReportAttachments != null && testReport.supplierTestReportAttachments !== undefined) {
          testReport.supplierTestReportAttachments.forEach((testReportAttachment) => {
            testReportAttachment.id = testReportAttachment.id === Constants.Empty ? 0 : testReportAttachment.id;
          });
        }
      });
    }
    if (supplierTestReport !== undefined && supplierTestReport != null) {
      const testReportParametersObj = supplierTestReport.map(element => {
        return {
          supplierTestReportId: element.id,
          inspectionDetails: element.inspectionDetails ?? '',
          isChecked: element.isChecked,
          isEnabled: element.isEnabled,
          defectTypeId: element.selectedDynamicId === 0 ? null : element.selectedDynamicId,
          partTestReportParameterId: element.partTestReportParameterId ?? 0,
          testReportAttachments: null,
          resultId: element.resultId,
          supplierTestReportAttachments: element.supplierTestReportAttachments != null ?
            element.supplierTestReportAttachments.filter(k => k.attachment.canDelete === true) : null,
        };
      });
      return testReportParametersObj;
    } else {
      return null;
    }
  }


  updateSupplierTestReportExpandModels(supplierTestReport): SupplierTestReport[] {
    if (supplierTestReport != null || supplierTestReport !== undefined) {
      supplierTestReport.forEach(testReport => {
        if (testReport.supplierTestReportAttachments !== undefined && testReport.supplierTestReportAttachments !== null) {
          const supplierTestReportAttachments = testReport.supplierTestReportAttachments;
          testReport.supplierTestReportAttachments = [];
          supplierTestReportAttachments.forEach(supplierTestReportAttachment => {
            if (supplierTestReportAttachment.attachment.id === Numbers.Default) {
              if (testReport.supplierTestReportAttachments === undefined) {
                testReport.supplierTestReportAttachments = [];
              }
              testReport.supplierTestReportAttachments.push(supplierTestReportAttachment);
            }
          });
        } else {
          testReport.supplierTestReportAttachments = null;
        }
      });
    }
    if (supplierTestReport !== undefined && supplierTestReport != null) {
      const supplierTestReportsObj = supplierTestReport.map(element => {
        return {
          id: element.supplierTestReportId,
          supplierMeasurementSubmissionId: element.supplierMeasurementSubmissionId,
          inspectionDetails: element.inspectionDetails ?? '',
          isChecked: element.isChecked,
          isEnabled: element.isEnabled,
          defectTypeId: element.selectedDynamicId === 0 ? null : element.selectedDynamicId,
          partTestReportParameterId: element.partTestReportParameterId ?? 0,
          testReportAttachments: null,
          resultId: element.resultId,
          supplierTestReportAttachments: element.supplierTestReportAttachments != null ?
            element.supplierTestReportAttachments.filter(k => k.attachment.canDelete === true) : null,
          removedSupplierTestReportAttachmentIds: element.removedSupplierTestReportAttachmentIds
        };
      });
      return supplierTestReportsObj;
    } else {
      return null;
    }
  }

  removeMicroSectionParameterExpandModels(microSectionParameters, supplierMeasurementSubmissionId?: number): SupplierMicroSectionParameterModel[] {
    const microSectionParametersObj = microSectionParameters.map(element => {
      return {
        uom: null,
        instrumentType: null,
        parameterManagement: null,
        dataTypeId: element.dataTypeId,
        uomId: element.uomId,
        instrumentTypeId: element.instrumentTypeId,
        instrumentId: element.instrumentId,
        parameterManagementId: element.parameterManagementId,
        normalValue: element.normalValue,
        upperTolerance: element.upperTolerance,
        lowerTolerance: element.lowerTolerance,
        accuracy: element.accuracy,
        supplierMeasurementSubmissionId: supplierMeasurementSubmissionId,
        supplierMicroSectionActuals: element.supplierMicroSectionActuals
      };
    });
    return microSectionParametersObj;
  }

  removeDimensionMeasurementExpandModels(dimensionMeasurements, supplierMeasurementSubmissionId?: number): SupplierDimensionMeasurementModel[] {
    const dimensionMeasurementsObj = dimensionMeasurements.map(element => {
      return {
        uom: null,
        instrumentType: null,
        parameterManagement: null,
        dataTypeId: element.dataTypeId,
        uomId: element.uomId,
        instrumentTypeId: element.instrumentTypeId,
        instrumentId: element.instrumentId,
        parameterManagementId: element.parameterManagementId,
        normalValue: element.normalValue,
        upperTolerance: element.upperTolerance,
        lowerTolerance: element.lowerTolerance,
        accuracy: element.accuracy,
        supplierMeasurementSubmissionId: supplierMeasurementSubmissionId,
        supplierDimensionMeasurementActuals: element.supplierDimensionMeasurementActuals
      };
    });
    return dimensionMeasurementsObj;
  }

  removeVisualInspectionExpandModels(supplierVisualInspectionDetails, supplierMeasurementSubmissionId?: number): SupplierVisualInspectionModel[] {
    const supplierVisualInspectionDetailsObj = supplierVisualInspectionDetails.map(element => {
      return {
        name: null,
        parameterManagement: null,
        dataTypeId: element.dataTypeId,
        samplingSize: this.visualInspectionSampleSize,
        toolsType: null,
        inspectionToolsTypeId: element.inspectionToolsTypeId,
        inspectionToolsType: null,
        partCountParameterId: element.id,
        parameterManagementId: element.parameterManagementId,
        dataTypes: null,
        inspectionTools: null,
        inspectionToolsId: element.selectedDynamicId,
        inspectionToolsName: null,
        detailsDefine: element.detailsDefine,
        inspectionDetails: element.inspectionDetails,
        sAPPartInspectionPlanId: element.sAPPartInspectionPlanId,
        isChecked: element.isChecked,
        isEnabled: element.isEnabled,
        defectTypes: null,
        totalDefectQty: element.totalDefectQty,
        resultActualId: null,
        addedDefectTypeIds: null,
        resultPassFailId: this.visualInspectionResultPassFailId,
        supplierMeasurementSubmissionId: supplierMeasurementSubmissionId,
        supplierVisualInspectionDefectTypes: element.supplierVisualInspectionDefectTypes
      };
    });
    return supplierVisualInspectionDetailsObj;
  }

  removeFunctionVariableExpandModels(functionVariables, supplierMeasurementSubmissionId?: number): SupplierFunctionVariableModel[] {
    const functionVariableObj = functionVariables.map(element => {
      return {
        uom: null,
        instrumentType: null,
        parameterManagement: null,
        dataTypeId: element.dataTypeId,
        uomId: element.uomId,
        instrumentTypeId: element.instrumentTypeId,
        instrumentId: element.instrumentId,
        parameterManagementId: element.parameterManagementId,
        normalValue: element.normalValue,
        upperTolerance: element.upperTolerance,
        lowerTolerance: element.lowerTolerance,
        accuracy: element.accuracy,
        supplierMeasurementSubmissionId: supplierMeasurementSubmissionId,
        supplierFunctionVariableActuals: element.supplierFunctionVariableActuals
      };
    });
    return functionVariableObj;
  }


  removeFunctionAttributeExpandModels(obj: any, recId: number): any {
    const functionAttributeObj = obj.map(element => {
      return {
        id: this.recId !== 0 ? 0 : element.id,
        parameterManagementId: element.parameterManagementId,
        testRequirement: element.testRequirement ?? '',
        inspectionDetails: element.inspectionDetails ?? '',
        resultExpected: this.getResult(element, recId),
        isChecked: element.isChecked,
        isEnabled: element.isEnabled,
        resultPassFailId: element.resultPassFailId,
        resultActualId: element.resultActualId,
        resultId: recId !== undefined && element.resultId === resultExpected[0].id ? resultExpected[0].id : resultExpected[1].id,
        supplierMeasurementSubmissionId: recId ?? 0,
        addedDefectTypeIds: element.addedDefectTypeIds,
        supplierFunctionAttributeActuals: element.supplierFunctionAttributeActuals

      };
    });
    return functionAttributeObj;
  }

  returnFunctionAttributeObject(): any {
    // tslint:disable-next-line: no-unused-expression
    this.recId !== null ? this.supplierFunctionAttributeDetails.map(x => x.supplierFunctionAttributeActuals = []) : '';
    const functionAttributeObj = this.supplierFunctionAttributeDetails;
    functionAttributeObj.map(s => {
      const keys = Object.keys(s);
      keys.map((key) => {
        if (key.includes('FunctionAttributeResult')) {
          const supplierFunctionAttributeActual = new SupplierFunctionAttributeActual();
          supplierFunctionAttributeActual.actualTextName = key;
          supplierFunctionAttributeActual.actualTextValue = s[key];
          s.supplierFunctionAttributeActuals.push(supplierFunctionAttributeActual);
        }
      });
    });
    return functionAttributeObj;
  }

  returnSupplierSapBasedObject(obj: any, recId: number): any {
    const functionAttributeObj = obj.map(element => {
      return {
        id: this.recId !== 0 ? 0 : element.id,
        certificateTypeParameterId: element.certificateTypeParameterId,
        sapRequest: element.sapRequest ?? '',
        physicalInspection: element.physicalInspection ?? '',
        matchId: element.matchId,
        resultPassFailId: element.resultPassFailId,
        supplierMeasurementSubmissionId: recId ?? 0,
        addedDefectTypeIds: element.addedDefectTypeIds
      };
    });
    return functionAttributeObj;
  }

  getAddedSMSPartManufactureIds(PartManufactureIds: number[]) {
    const added = _.difference(PartManufactureIds, this.originalSMSPartManufactureIds);
    return added;
  }


  getRemovedSMSPartManufactureIds(PartManufactureIds: number[]) {
    const removed = _.difference(this.originalSMSPartManufactureIds, PartManufactureIds);
    return removed;
  }

  onPartSelect(value) {
    this.ip = value.ip;
    this.sapPartInspectionPlanId = value.id;
    this.partNo = value.partNo;
    this.supplierId = value.supplier != null ? value.supplier.id : Numbers.Default;
    this.workCellId = value.workCell != null ? value.workCell.id : Numbers.Default;
    this.suppliercontactId = value.supplierContact != null ? value.supplierContact.id : Numbers.Default;
    this.vendorCode = (this.currentUser.supplier != null) ? this.currentUser.supplier.vendorCode : Constants.Empty;
    this.site = this.currentUser.site.code;
    const supplierval = this.supplierValue(value);
    this.samplingPlans = [];
    this.supplierMicroSectionParameters = [];
    this.supplierDimensionMeasurements = [];
    this.supplierFunctionVariables = [];
    this.supplierFunctionAttributeDetails = [];
    this.supplierTestReportTabDetails = [];
    this.supplierVisualInspectionDetails = [];
    this.getDefaultVisualInspectionParameter(null, value.commodityId);
    this.samplingPlans = value.sapPartInspectionPlanSamplingPlans;
    this.getDefaultCommodityResultParameter(null, value.commodityId);
    this.commodityId = value.commodityId;
    this.partSapRequestFieldValue = { mediaCode: value.mediacode, maskedMPN: value.maskedMPN, manufacturer: value.manufacturer };
    this.formInput.patchValue({
      partNo: value.partNo,
      manufacturer: value.manufacturer,
      manufacturePartNumber: value.manufacturePartNumber,
      supplier: supplierval,
      supplierContact: value.supplierContact.name ?? Constants.Empty,
      workCell: value.workCell.name ?? Constants.Empty,
      ip: value.ip,
      smsNo: value.ip,
      isEnabled: value.isEnabled,
    });
    this.formInput.markAsDirty();

    this.sapPartInspectionPlan.commodity = value.commodity;

    this.mapSupplierSamplingPlan();
    // this.mapSupplierFunctionAttribute(value.partResultOrientedParameters);
    // this.mapSupplierMicroSection(value.partMicrosectionParameters);
    // this.mapDimensionMeasurment(value.partMeasurementParameters);
    // this.mapFunctionVariable(value.partFunParameters);
    this.expandSupplierTestReportTabDynamic();
    //  this.expandVisualInspectionTabDynamic();
  }

  mapSupplierFunctionAttribute(partFunctionAttributes) {
    this.supplierFunctionAttributeDetails = [];
    if (partFunctionAttributes !== null && partFunctionAttributes !== undefined) {
      partFunctionAttributes.map(record => {
        this.supplierFunctionAttribute = new SupplierFunctionAttribute();
        this.supplierFunctionAttribute = this.returnDataArray(record);
        this.supplierFunctionAttributeDetails.push(this.supplierFunctionAttribute);
      });
    }
  }

  mapSupplierMicroSection(partMicrosectionParameters) {
    this.supplierMicroSectionParameters = [];
    if (partMicrosectionParameters !== null && partMicrosectionParameters !== undefined) {
      partMicrosectionParameters.map(record => {
        this.supplierMicroSectionParameter = new SupplierMicroSectionParameterModel();
        this.supplierMicroSectionParameter = this.returnSupplierMicroSectionParameterObj(record);
        this.supplierMicroSectionParameters.push(this.supplierMicroSectionParameter);
      });
    }
  }

  mapDimensionMeasurment(partMeasurementParameters) {
    this.supplierDimensionMeasurements = [];
    if (partMeasurementParameters !== null && partMeasurementParameters !== undefined) {
      partMeasurementParameters.map(record => {
        this.supplierDimensionMeasurement = new SupplierDimensionMeasurementModel();
        this.supplierDimensionMeasurement = this.returnSupplierMicroSectionParameterObj(record);
        this.supplierDimensionMeasurements.push(this.supplierDimensionMeasurement);
      });
    }
  }

  mapFunctionVariable(partFunParameters) {
    this.supplierFunctionVariables = [];
    if (partFunParameters !== null && partFunParameters !== undefined) {
      partFunParameters.map(record => {
        this.supplierFunctionVariable = new SupplierFunctionVariableModel();
        this.supplierFunctionVariable = this.returnSupplierMicroSectionParameterObj(record);
        this.supplierFunctionVariables.push(this.supplierFunctionVariable);
      });
    }
  }


  expandMasterInspectionTabDynamic() {
    if (this.sapPartInspectionPlanId > 0 && !this.masterInspectionExpanded && this.recId) {
      this.pageSortFilterInfo = new PageSortFilterInfo();
      this.pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
        {
          expand: <Record<string, ExpandSelectCountInfo>[]>
            [
              this.apiService.expandSupplierSamplingPlans()
            ]
        };
      this.apiService.getDataById(this.recId, this.pageSortFilterInfo).subscribe(data => {
        if (data && data.value.length > 0) {
          this.masterInspectionExpanded = true;
          this.supplierMeasurement.supplierSamplingPlans = data.value[0].supplierSamplingPlans;
          if (this.supplierMeasurement.supplierSamplingPlans) {
            this.supplierSamplingPlans = this.supplierSamplingPlans
              .map((item, i) => Object.assign({}, item, this.supplierMeasurement.supplierSamplingPlans[i]));
          }
        }
      });
    }
  }

  onPartUnselect(value) {
    this.formInput.patchValue({
      partNo: '',
      manufacturer: '',
      manufacturePartNumber: '',
      supplier: '',
      supplierContact: '',
      workCell: '',
      ip: '',
      smsNo: '',
      pONumber: '',
      quantity: Numbers.Default,
      batchQuantity: Numbers.Default,
      quantityBalance: Numbers.Default,
      smsStatus: ''
    });
    this.ip = Constants.Empty;


    this.site = Constants.Empty;

    this.vendorCode = Constants.Empty;

    this.supplierMicroSectionParameters = [];
    this.supplierDimensionMeasurements = [];
    this.supplierFunctionVariables = [];
    this.supplierSapBasedParameters = [];
    this.supplierFunctionAttributeDetails = [];

    this.partSapRequestFieldValue = null;

    tabConfiguration.filter(x => x.isVisible === true).map(k => {

      if (k.isVisible === true) {

        k.isVisible = false;

      }

    });
    this.isSupplierFunctionAttributeExpanded = false;
    this.isMicroSectionExpanded = false;
    this.isSupplierTestReportExpanded = false;
    this.supplierSamplingPlans = [];
    this.supplierVisualInspectionDetails = [];

  }


  onPOSelect(value) {
    this.purchaseOrderId = value.id;
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value;
    const poQuantity = value.quantity;
    this.isbatchQuantityValid = batchQuantity > poQuantity ? false : true;
    this.formInput.patchValue({
      quantityBalance: (poQuantity - batchQuantity)
    });
    this.formInput.patchValue({
      quantity: value.quantity
    });
    this.setSMSStatus();
  }


  onPOUnselect(value) {
    this.formInput.patchValue({
      poQuantity: Constants.Empty,
      quantity: Constants.Empty,
      quantityBalance: Constants.Empty,
      smsStatus: Constants.Empty
    });
  }


  onBatchQuantityChange(value) {
    this.setQuantityBalance(value);
    this.setSMSStatus();
  }

  onBatchQuantityFocusOut() {
    this.mapSupplierSamplingPlan();
    this.reloadSpecWithMMC();
    this.reloadSpecWithLMC();
    this.reloadMicroSection();
    this.reloadBowTwist();
    this.reloadFunctionVariable();
    this.reloadFunctionAttribute();
    this.reloadDimensionMeasurement();
  }


  reloadSpecWithMMC() {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setMPositionPageSortFilterInfo(pageSortFilterInfo);
    this.getExpandedPartInspectionMPositionTolerances(pageSortFilterInfo);
  }

  reloadSpecWithLMC() {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setLPositionPageSortFilterInfo(pageSortFilterInfo);
    this.getExpandedPartInspectionLPositionTolerances(pageSortFilterInfo);
  }

  reloadFunctionAttribute() {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setResultOrientedPageSortFilterInfo(pageSortFilterInfo);
    this.getExpandedFunctionAttributes(pageSortFilterInfo);
  }

  reloadMicroSection() {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setMicroSectionPageSortFilterInfo(pageSortFilterInfo);
    this.getExpandedSupplierMicroSectionParameters(pageSortFilterInfo);
  }

  reloadFunctionVariable() {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setFUNPageSortFilterInfo(pageSortFilterInfo);
    this.getExpandedSupplierFunctionVariables(pageSortFilterInfo);
  }

  reloadDimensionMeasurement() {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setMeasurementParametersPageSortFilterInfo(pageSortFilterInfo);
    this.getExpandedSupplierDimensionMeasurements(pageSortFilterInfo);
  }

  reloadBowTwist() {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setBowTwistPageSortFilterInfo(pageSortFilterInfo);
    this.getExpandedSupplierBowTwist(pageSortFilterInfo);
  }

  setQuantityBalance(value: any) {
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value;
    const poQuantity = this.formInput.controls[this.properties.quantity].value;
    this.isbatchQuantityValid = batchQuantity > poQuantity ? false : true;
    this.formInput.patchValue({
      quantityBalance: (poQuantity - value)
    });
  }

  getIPAttachment(record: any) {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.sapPartInspectionPlanService.expandPartInspectionSpecifications(),
            this.sapPartInspectionPlanService.expandPartInspectionDrawings(),
            this.sapPartInspectionPlanService.expandPartInspectionCertificationAttachments(),
            this.sapPartInspectionPlanService.expandProductLifeCycleStage(),
            this.sapPartInspectionPlanService.expandAdminCertifications(),
            this.sapPartInspectionPlanService.expandSAPPartInspectionPlanAdminCertifications(),
            this.sapPartInspectionPlanService.expandPartWorkCell(),
            this.sapPartInspectionPlanService.expandCommodity(),
            this.sapPartInspectionPlanService.expandPartInspectionSamplingPlans(),
            this.sapPartInspectionPlanService.expandSupplier(),
            this.sapPartInspectionPlanService.expandSupplierContact(),
            this.sapPartInspectionPlanService.expandComments()
          ]
      };
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        const sAPPartInspectionPlan = new SAPPartInspectionPlan(data.value[0]);

        const modalRef = this.modalService.open(SapPartInspectionPlanViewComponent, {
          ariaLabelledBy: 'modal-basic-title',
          windowClass: 'table-modal',
          size: 'lg'
        });
        modalRef.componentInstance.detail = sAPPartInspectionPlan;
        modalRef.componentInstance.isSubmitted = false;
      }
    });
  }



  setSMSStatus() {
    const quantityBalance = this.formInput.controls[this.properties.quantityBalance].value;
    if (quantityBalance === 0) {
      this.formInput.patchValue({
        smsStatus: this.purchaseOrderState.get(PurchaseOrderState.Complete)
      });
    } else {
      this.formInput.patchValue({
        smsStatus: this.purchaseOrderState.get(PurchaseOrderState.Pending)
      });
    }
  }


  expandRelatedData(): ExpandSelectCountInfo {
    return <ExpandSelectCountInfo>{
      expand: <Record<string, ExpandSelectCountInfo>[]>[
        this.apiService.expandSMSPOStateType(),
        this.apiService.expandPartWorkCell(),
        this.apiService.expandSupplier(),
        this.apiService.expandSupplierContact(),
        this.apiService.expandPurchaseOrder(),
        this.apiService.expandSMSCommentAttachment(),
        this.sapPartInspectionPlanService.expandSAPPartInspectionPlan()
      ]
    };
  }
  saveDraftForm() {
    this.entity = this.supplierMeasurement;
    this.stateTypeId = PartPlanStateType.Draft;
    this.submittedById = this.currentUser.id;
    this.submittedByDate = new Date();
    super.saveForm();
  }

  saveSubmitForm() {
    this.entity = this.supplierMeasurement;
    this.submittedById = this.currentUser.id;
    this.submittedByDate = new Date();
    super.saveForm();
  }


  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }



  isSaveDisabled() {
    if (this.isbatchQuantityValid !== undefined && !this.isbatchQuantityValid) {
      return true;
    }
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty
      ;
  }

  saveAsValidation() {
    if (this.recId) {
      if (!this.formInput.valid || !this.formInput.dirty) {
        document.getElementById('buttonSaveAsDraft').setAttribute('disabled', 'true');
      } else {
        document.getElementById('buttonSaveAsDraft').removeAttribute('disabled');
      }
    }
  }


  onSupplierSelect(event) {
    this.supplierId = event.id;
    this.formInput.patchValue({
      supplierContact: null
    });
  }

  onSupplierUnSelect(event) {
    this.supplierId = null;
    this.formInput.patchValue({
      supplierContact: null
    });
  }

  cancel() {
    this.location.back();
  }

  getResultOrientedData(colId) {
    this.supplierFunctionAttributeDetails = [];
    this.resultOrientedData.filter(x => x.parameterManagementTypeId === colId).map(element => {
      if (element && element !== null) {
        this.supplierFunctionAttributeDetails.push(this.returnDataArray(element));
      }
    });
  }



  returnSupplierFunctionVariableObj(element, supplierMeasurementSubmissionId?: number, isSapPartInspectionPlan?: boolean): any {
    let upperToleranceValue: any;
    let lowerToleranceValue: any;
    let rangeBarAverageFor30: number;
    let rangeBarAverageFor25: number;
    let rangeXBarUclRAndLclR: any = {};
    let xBarSUcl: number;
    let xBarSLcl: number;

    let rangeXBarSAverageFor30: number;
    let rangeXBarSUclRAndLclR: any = {};
    if (supplierMeasurementSubmissionId !== null && supplierMeasurementSubmissionId !== 0 && !isSapPartInspectionPlan) {
      upperToleranceValue = parseFloat(element.upperTolerance).toFixed(element.accuracy);
      lowerToleranceValue = parseFloat(element.lowerTolerance).toFixed(element.accuracy);
    } else {
      upperToleranceValue = parseFloat(String(Number(element.normalValue) + Number(element.upperTolerance))).toFixed(element.accuracy);
      lowerToleranceValue = parseFloat(String(Number(element.normalValue) + Number(element.lowerTolerance))).toFixed(element.accuracy);
    }
    let plotDataValues;
    let rangeAverageFor25;
    if (element.chartTypeId === ChartType.xBarR) {
      this.xBarRActualValueFor25 = this.parameterFunVariableActualValuesFor25.filter(x => x.chartTypeId === ChartType.xBarR);
      this.xBarRActualValueFor30 = this.parameterFunVariableActualValuesFor30.filter(x => x.chartTypeId === ChartType.xBarR);
      if (this.parameterFunVariableActualValuesFor30 && this.parameterFunVariableActualValuesFor30.length > 0) {
        plotDataValues = this.parameterFunVariableActualValuesFor30.filter(x => x.parameterId === element.parameterManagementId
          && x.chartTypeId === ChartType.xBarR || x.chartTypeId === ChartType.RangeXBarR);
        const smsFormDataRangeXBarR = this.parameterFunVariableActualValuesFor30.filter(y => y.chartTypeId === ChartType.RangeXBarR);
        rangeBarAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeXBarR);
        rangeXBarUclRAndLclR = this.apiService.getUCLRandLCLRCalculationForRangeXBarR(rangeBarAverageFor30, this.funSampleSize);


      }
    } else if (element.chartTypeId === ChartType.xBarS) {

      ({ plotDataValues, xBarSUcl, xBarSLcl } =
        this.getXBarSCalculationDataForFUN(plotDataValues, element, xBarSUcl, xBarSLcl));
      // RangeXBarS
      const smsFormDataRangeXBarS = this.parameterFunVariableActualValuesFor30.filter(z => z.chartTypeId === ChartType.RangeXBarS);
      rangeXBarSAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeXBarS);
      rangeXBarSUclRAndLclR = this.apiService.getUCLRandLCLRCalculationForRangeXBarS(rangeXBarSAverageFor30, this.funSampleSize);

    } else if (element.chartTypeId === ChartType.IMR) {
      ({ plotDataValues, rangeBarAverageFor30, rangeBarAverageFor25 } =
        this.getIMRCalculationDataForFUN(plotDataValues, element, rangeBarAverageFor30, rangeBarAverageFor25));
      if (this.xBarRActualValueFor25 && this.xBarRActualValueFor25.length > 0) {
        rangeAverageFor25 = this.xBarRActualValueFor25[0].rangeAverageFor25;
      }
    }


    const stdAvgFor30 = this.apiService.calculateSPSChartAverageStandardDeviationParameterFor30SMS(this.xBarRActualValueFor30, element.parameterManagementId, element.chartTypeId);
    const stdAvgFor25 = this.apiService.calculateSPSChartAverageStandardDeviationParameterFor25SMS(this.xBarRActualValueFor25, element.parameterManagementId);

    const { cpk, ucl, lcl, cpkU, cpkL } = this.getCPKFromUpperLowerTolerance(stdAvgFor25, stdAvgFor30,
      upperToleranceValue, lowerToleranceValue, element.chartTypeId, rangeAverageFor25);


    return {
      supplierMeasurementSubmissionId: 0,
      parameterManagement: element.parameterManagement, parameterManagementId: element.parameterManagementId, uom: element.uom,
      uomId: element.uomId,
      normalValue: parseFloat(element.normalValue).toFixed(element.accuracy),
      upperTolerance: upperToleranceValue,
      lowerTolerance: lowerToleranceValue,
      instrumentType: element.instrumentType, instrumentTypeId: element.instrumentTypeId, instrument: element.instrument, instrumentId: element.instrumentId,
      accuracy: element.accuracy, parameterName: element.parameterName, unit: element.unit,
      instrumentTypeCode: element.instrumentTypeCode,
      instrumentNo: (element.instrument !== undefined && element.instrument !== null) ? element.instrument.instrumentNo : '', dataTypeId: element.dataTypeId,
      dataType: this.getDataType(element.dataTypeId),
      selectedDynamicId: element.instrumentId ?? 0,
      supplierFunctionVariableActuals: this.recId !== null ? element.supplierFunctionVariableActuals : [],
      cpk: this.recId !== 0 && this.recId !== null ? cpk !== undefined ? cpk.toFixed(2) : 0 :
        (this.recId === null || this.recId === 0 || this.recId === undefined) && cpk !== undefined ? cpk.toFixed(2) : 0,
      ucl: ucl ?? 0,
      lcl: lcl ?? 0,
      cpkU: cpkU ?? 0,
      cpkL: cpkL ?? 0,
      isLableWarning: (cpk < cpkTargetValue) ? true : false,
      average25: stdAvgFor25 !== undefined ? stdAvgFor25.averageValueFor25SMS ?? 0 : 0,
      average30: stdAvgFor30 !== undefined ? stdAvgFor30.averageValueFor30SMS ?? 0 : 0,
      chartTypeId: element.chartTypeId ?? 0,
      rangeXBarUclR: rangeXBarUclRAndLclR.uclR ?? 0,
      rangeXBarLclR: rangeXBarUclRAndLclR.lclR ?? 0,
      xBarSUcl: xBarSUcl ?? 0,
      xBarsLcl: xBarSLcl ?? 0,
      rangeBarAverageFor30: rangeBarAverageFor30,
      rangeBarAverageFor25: rangeBarAverageFor25,
      plotValues: plotDataValues,
      chartType: element.chartType,
      rangeXBarSAverageFor30: rangeXBarSAverageFor30,
      rangeXBarSUclR: rangeXBarSUclRAndLclR.uclR ?? 0,
      rangeXBarSLclR: rangeXBarSUclRAndLclR.lclR ?? 0
    };
  }


  private getXBarSCalculationDataForFUN(plotDataValues: any, element: any, xBarSUcl: number, xBarSLcl: number) {
    this.xBarRActualValueFor25 = this.parameterFunVariableActualValuesFor25.filter(x => x.chartTypeId === ChartType.xBarS);
    this.xBarRActualValueFor30 = this.parameterFunVariableActualValuesFor30.filter(x => x.chartTypeId === ChartType.xBarS || x.chartTypeId === ChartType.RangeXBarS);
    if (this.xBarRActualValueFor30 && this.xBarRActualValueFor30.length > 0) {
      plotDataValues = this.xBarRActualValueFor30.filter(x => x.parameterId === element.parameterManagementId
        && x.chartTypeId === ChartType.xBarS || x.chartTypeId === ChartType.RangeXBarS);
    }

    if (this.xBarRActualValueFor25 && this.xBarRActualValueFor25.length > 0) {

      const stdAvgFor25 = this.apiService.calculateSPSChartAverageStandardDeviationParameterFor25SMS(this.xBarRActualValueFor25, element.parameterManagementId);
      xBarSUcl = this.apiService.getSPCChartCalculationUCL(stdAvgFor25.averageValueFor25SMS, stdAvgFor25.standardDeviation25, this.funSampleSize);
      xBarSLcl = this.apiService.getSPCChartCalculationLCL(stdAvgFor25.averageValueFor25SMS, stdAvgFor25.standardDeviation25, this.funSampleSize);
    }
    return { plotDataValues, xBarSUcl, xBarSLcl };
  }

  private getIMRCalculationDataForFUN(plotDataValues: any, element: any, rangeBarAverageFor30: number, rangeBarAverageFor25: number) {
    this.xBarRActualValueFor25 = this.parameterFunVariableActualValuesFor25.filter(x => x.chartTypeId === ChartType.IMR);
    this.xBarRActualValueFor30 = this.parameterFunVariableActualValuesFor30.filter(x => x.chartTypeId === ChartType.IMR);
    if (this.parameterFunVariableActualValuesFor30 && this.parameterFunVariableActualValuesFor30.length > 0) {
      plotDataValues = this.parameterFunVariableActualValuesFor30.filter(x => x.parameterId === element.parameterManagementId
        && (x.chartTypeId === ChartType.IMR || x.chartTypeId === ChartType.RangeIMR));
      const smsFormDataRangeIMRFor30 = this.parameterFunVariableActualValuesFor30.filter(y => y.chartTypeId === ChartType.RangeIMR);
      rangeBarAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeIMRFor30);
    }
    if (this.parameterFunVariableActualValuesFor25 && this.parameterFunVariableActualValuesFor25.length > 0) {
      const smsFormDataRangeIMRFor25 = this.parameterFunVariableActualValuesFor25.filter(y => y.chartTypeId === ChartType.RangeIMR);
      rangeBarAverageFor25 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeIMRFor25);
    }
    return { plotDataValues, rangeBarAverageFor30, rangeBarAverageFor25 };
  }

  returnSupplierMicroSectionParameterObj(element, supplierMeasurementSubmissionId?: number, isSapPartInspectionPlan?: boolean): any {
    let upperToleranceValue: any;
    let lowerToleranceValue: any;
    let rangeBarAverageFor30: number;
    let rangeBarAverageFor25: number;
    let rangeXBarUclRAndLclR: any = {};
    let xBarSUcl: number;
    let xBarSLcl: number;
    let rangeXBarSAverageFor30: number;
    let rangeXBarSUclRAndLclR: any = {};

    if (supplierMeasurementSubmissionId !== null && supplierMeasurementSubmissionId !== 0 && !isSapPartInspectionPlan) {
      upperToleranceValue = parseFloat(element.upperTolerance).toFixed(element.accuracy);
      lowerToleranceValue = parseFloat(element.lowerTolerance).toFixed(element.accuracy);
    } else {
      upperToleranceValue = parseFloat(String(Number(element.normalValue) + Number(element.upperTolerance))).toFixed(element.accuracy);
      lowerToleranceValue = parseFloat(String(Number(element.normalValue) + Number(element.lowerTolerance))).toFixed(element.accuracy);
    }
    let plotDataValues;
    let rangeAverageFor25;
    if (element.chartTypeId === ChartType.xBarR) {
      this.xBarRActualValueFor25 = this.parameterMicroSectionActualValuesFor25.filter(x => x.chartTypeId === ChartType.xBarR);
      this.xBarRActualValueFor30 = this.parameterMicroSectionActualValuesFor30.filter(x => x.chartTypeId === ChartType.xBarR);
      // range control xBarR

      if (this.parameterMicroSectionActualValuesFor30 && this.parameterMicroSectionActualValuesFor30.length > 0) {
        plotDataValues = this.parameterMicroSectionActualValuesFor30.filter(x => x.parameterId === element.parameterManagementId
          && x.chartTypeId === ChartType.xBarR || x.chartTypeId === ChartType.RangeXBarR);
        const smsFormDataRangeXBarR = this.parameterMicroSectionActualValuesFor30.filter(y => y.chartTypeId === ChartType.RangeXBarR);
        rangeBarAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeXBarR);
        rangeXBarUclRAndLclR = this.apiService.getUCLRandLCLRCalculationForRangeXBarR(rangeBarAverageFor30, this.dimSampleSize);

      }
    } else if (element.chartTypeId === ChartType.xBarS) {
      ({ plotDataValues, xBarSUcl, xBarSLcl } =
        this.getXBarSCalculationDataForMicroSection(plotDataValues, element, xBarSUcl, xBarSLcl));
      // RangeXBarS
      const smsFormDataRangeXBarS = this.parameterMicroSectionActualValuesFor30.filter(z => z.chartTypeId === ChartType.RangeXBarS);
      rangeXBarSAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeXBarS);
      rangeXBarSUclRAndLclR = this.apiService.getUCLRandLCLRCalculationForRangeXBarS(rangeXBarSAverageFor30, this.dimSampleSize);

    } else if (element.chartTypeId === ChartType.IMR) {
      ({ plotDataValues, rangeBarAverageFor30, rangeBarAverageFor25 } =
        this.getIMRCalculationDataForMicroSection(plotDataValues, element, rangeBarAverageFor30, rangeBarAverageFor25));
      if (this.xBarRActualValueFor25 && this.xBarRActualValueFor25.length > 0) {
        rangeAverageFor25 = this.xBarRActualValueFor25[0].rangeAverageFor25;
      }
    }

    const stdAvgFor30 = this.apiService.calculateSPSChartAverageStandardDeviationParameterFor30SMS(this.xBarRActualValueFor30, element.parameterManagementId, element.chartTypeId);
    const stdAvgFor25 = this.apiService.calculateSPSChartAverageStandardDeviationParameterFor25SMS(this.xBarRActualValueFor25, element.parameterManagementId);

    const { cpk, ucl, lcl, cpkU, cpkL } = this.getCPKFromUpperLowerTolerance(stdAvgFor25, stdAvgFor30, upperToleranceValue,
      lowerToleranceValue, element.chartTypeId, rangeAverageFor25);


    return {
      supplierMeasurementSubmissionId: 0,
      parameterManagement: element.parameterManagement, parameterManagementId: element.parameterManagementId, uom: element.uom,
      uomId: element.uomId,
      normalValue: parseFloat(element.normalValue).toFixed(element.accuracy),
      upperTolerance: upperToleranceValue,
      lowerTolerance: lowerToleranceValue,
      instrumentType: element.instrumentType, instrumentTypeId: element.instrumentTypeId, instrument: element.instrument, instrumentId: element.instrumentId,
      accuracy: element.accuracy, parameterName: element.parameterName, unit: element.unit,
      instrumentTypeCode: element.instrumentTypeCode,
      instrumentNo: (element.instrument !== undefined && element.instrument !== null) ? element.instrument.instrumentNo : '', dataTypeId: element.dataTypeId,
      dataType: this.getDataType(element.dataTypeId),
      selectedDynamicId: element.instrumentId ?? 0,
      supplierMicroSectionActuals: this.recId !== 0 && this.recId !== null ? element.supplierMicroSectionActuals : [],
      cpk: this.recId !== 0 && this.recId !== null ? cpk !== undefined ? cpk.toFixed(2) : 0 : cpk,
      ucl: ucl ?? 0,
      lcl: lcl ?? 0,
      cpkU: cpkU ?? 0,
      cpkL: cpkL ?? 0,
      isLableWarning: (cpk < cpkTargetValue) ? true : false,
      average25: stdAvgFor25 !== undefined ? stdAvgFor25.averageValueFor25SMS ?? 0 : 0,
      average30: stdAvgFor30 !== undefined ? stdAvgFor30.averageValueFor30SMS ?? 0 : 0,
      chartTypeId: element.chartTypeId ?? 0,
      rangeXBarUclR: rangeXBarUclRAndLclR.uclR ?? 0,
      rangeXBarLclR: rangeXBarUclRAndLclR.lclR ?? 0,
      xBarSUcl: xBarSUcl ?? 0,
      xBarsLcl: xBarSLcl ?? 0,
      rangeBarAverageFor30: rangeBarAverageFor30,
      rangeBarAverageFor25: rangeBarAverageFor25,
      plotValues: plotDataValues,
      ipNo: this.ip,
      chartType: element.chartType,
      rangeXBarSAverageFor30: rangeXBarSAverageFor30,
      rangeXBarSUclR: rangeXBarSUclRAndLclR.uclR ?? 0,
      rangeXBarSLclR: rangeXBarSUclRAndLclR.lclR ?? 0
    };
  }

  private getXBarSCalculationDataForMicroSection(plotDataValues: any, element: any, xBarSUcl: number, xBarSLcl: number) {

    this.xBarRActualValueFor25 = this.parameterMicroSectionActualValuesFor25.filter(x => x.chartTypeId === ChartType.xBarS);
    this.xBarRActualValueFor30 = this.parameterMicroSectionActualValuesFor30.filter(x => x.chartTypeId === ChartType.xBarS || x.chartTypeId === ChartType.RangeXBarS);

    if (this.xBarRActualValueFor30 && this.xBarRActualValueFor30.length > 0) {
      plotDataValues = this.xBarRActualValueFor30.filter(x => x.parameterId === element.parameterManagementId
        && x.chartTypeId === ChartType.xBarS || x.chartTypeId === ChartType.RangeXBarS);
    }
    if (this.xBarRActualValueFor25 && this.xBarRActualValueFor25.length > 0) {
      const stdAvgFor25 = this.apiService.calculateSPSChartAverageStandardDeviationParameterFor25SMS(this.xBarRActualValueFor25, element.parameterManagementId);
      xBarSUcl = this.apiService.getSPCChartCalculationUCL(stdAvgFor25.averageValueFor25SMS, stdAvgFor25.standardDeviation25, this.dimSampleSize);
      xBarSLcl = this.apiService.getSPCChartCalculationLCL(stdAvgFor25.averageValueFor25SMS, stdAvgFor25.standardDeviation25, this.dimSampleSize);
    }
    return { plotDataValues, xBarSUcl, xBarSLcl };
  }

  private getIMRCalculationDataForMicroSection(plotDataValues: any, element: any, rangeBarAverageFor30: number, rangeBarAverageFor25: number) {
    this.xBarRActualValueFor25 = this.parameterMicroSectionActualValuesFor25.filter(x => x.chartTypeId === ChartType.IMR);
    this.xBarRActualValueFor30 = this.parameterMicroSectionActualValuesFor30.filter(x => x.chartTypeId === ChartType.IMR);
    if (this.parameterMicroSectionActualValuesFor30 && this.parameterMicroSectionActualValuesFor30.length > 0) {
      plotDataValues = this.parameterMicroSectionActualValuesFor30.filter(x => x.parameterId === element.parameterManagementId
        && (x.chartTypeId === ChartType.IMR || x.chartTypeId === ChartType.RangeIMR));
      const smsFormDataRangeIMRFor30 = this.parameterMicroSectionActualValuesFor30.filter(y => y.chartTypeId === ChartType.RangeIMR);
      rangeBarAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeIMRFor30);
    }
    if (this.parameterMicroSectionActualValuesFor25 && this.parameterMicroSectionActualValuesFor25.length > 0) {
      const smsFormDataRangeIMRFor25 = this.parameterMicroSectionActualValuesFor25.filter(y => y.chartTypeId === ChartType.RangeIMR);
      rangeBarAverageFor25 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeIMRFor25);
    }
    return { plotDataValues, rangeBarAverageFor30, rangeBarAverageFor25 };
  }

  returnSupplierDimensionMeasurementObj(element, supplierMeasurementSubmissionId?: number, isSapPartInspectionPlan?: boolean): any {

    let upperToleranceValue: any;
    let lowerToleranceValue: any;
    let rangeBarAverageFor30: number;
    let rangeBarAverageFor25: number;
    let rangeXBarUclRAndLclR: any = {};
    let xBarSUcl: number;
    let xBarSLcl: number;

    let rangeXBarSAverageFor30: number;
    let rangeXBarSUclRAndLclR: any = {};
    if (supplierMeasurementSubmissionId !== null && supplierMeasurementSubmissionId !== 0 && !isSapPartInspectionPlan) {
      upperToleranceValue = parseFloat(element.upperTolerance).toFixed(element.accuracy);
      lowerToleranceValue = parseFloat(element.lowerTolerance).toFixed(element.accuracy);
    } else {
      upperToleranceValue = parseFloat(String(Number(element.normalValue) + Number(element.upperTolerance))).toFixed(element.accuracy);
      lowerToleranceValue = parseFloat(String(Number(element.normalValue) + Number(element.lowerTolerance))).toFixed(element.accuracy);
    }
    let plotDataValues;
    let rangeAverageFor25;
    if (element.chartTypeId === ChartType.xBarR) {
      this.xBarRActualValueFor25 = this.parameterDimMeasurementActualValuesFor25.filter(x => x.chartTypeId === ChartType.xBarR);
      this.xBarRActualValueFor30 = this.parameterDimMeasurementActualValuesFor30.filter(x => x.chartTypeId === ChartType.xBarR);
      // range control xBarR
      if (this.parameterDimMeasurementActualValuesFor30 && this.parameterDimMeasurementActualValuesFor30.length > 0) {
        plotDataValues = this.parameterDimMeasurementActualValuesFor30.filter(x => x.parameterId === element.parameterManagementId
          && x.chartTypeId === ChartType.xBarR || x.chartTypeId === ChartType.RangeXBarR);
        const smsFormDataRangeXBarR = this.parameterDimMeasurementActualValuesFor30.filter(y => y.chartTypeId === ChartType.RangeXBarR);
        rangeBarAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeXBarR);
        rangeXBarUclRAndLclR = this.apiService.getUCLRandLCLRCalculationForRangeXBarR(rangeBarAverageFor30, this.dimSampleSize);


      }
    } else if (element.chartTypeId === ChartType.xBarS) {
      ({ plotDataValues, xBarSUcl, xBarSLcl } =
        this.getXBarSCalculationDataForDIM(plotDataValues, element, xBarSUcl, xBarSLcl));
      // RangeXBarS
      const smsFormDataRangeXBarS = this.parameterDimMeasurementActualValuesFor30.filter(z => z.chartTypeId === ChartType.RangeXBarS);
      rangeXBarSAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeXBarS);
      rangeXBarSUclRAndLclR = this.apiService.getUCLRandLCLRCalculationForRangeXBarS(rangeXBarSAverageFor30, this.dimSampleSize);

    } else if (element.chartTypeId === ChartType.IMR) {
      ({ plotDataValues, rangeBarAverageFor30, rangeBarAverageFor25 } =
        this.getIMRCalculationDataForDIM(plotDataValues, element, rangeBarAverageFor30, rangeBarAverageFor25));
      if (this.xBarRActualValueFor25 && this.xBarRActualValueFor25.length > 0) {
        rangeAverageFor25 = this.xBarRActualValueFor25[0].rangeAverageFor25;
      }
    }

    const stdAvgFor30 = this.apiService.calculateSPSChartAverageStandardDeviationParameterFor30SMS(this.xBarRActualValueFor30, element.parameterManagementId, element.chartTypeId);
    const stdAvgFor25 = this.apiService.calculateSPSChartAverageStandardDeviationParameterFor25SMS(this.xBarRActualValueFor25, element.parameterManagementId);

    const { cpk, ucl, lcl, cpkU, cpkL } = this.getCPKFromUpperLowerTolerance(stdAvgFor25, stdAvgFor30,
      upperToleranceValue, lowerToleranceValue, element.chartTypeId, rangeAverageFor25);

    return {
      supplierMeasurementSubmissionId: 0,
      parameterManagement: element.parameterManagement, parameterManagementId: element.parameterManagementId, uom: element.uom,
      uomId: element.uomId,
      normalValue: parseFloat(element.normalValue).toFixed(element.accuracy),
      upperTolerance: upperToleranceValue,
      lowerTolerance: lowerToleranceValue,
      instrumentType: element.instrumentType, instrumentTypeId: element.instrumentTypeId, instrument: element.instrument, instrumentId: element.instrumentId,
      accuracy: element.accuracy, parameterName: element.parameterName, unit: element.unit,
      instrumentTypeCode: element.instrumentTypeCode,
      instrumentNo: (element.instrument !== undefined && element.instrument !== null) ? element.instrument.instrumentNo : '', dataTypeId: element.dataTypeId,
      dataType: this.getDataType(element.dataTypeId),
      selectedDynamicId: element.instrumentId ?? 0,
      supplierDimensionMeasurementActuals: this.recId !== null ? element.supplierDimensionMeasurementActuals : [],
      cpk: this.recId !== 0 && this.recId !== null ? cpk !== undefined ? cpk.toFixed(2) : 0 :
        (this.recId === null || this.recId === 0 || this.recId === undefined) && cpk !== undefined ? cpk.toFixed(2) : 0,
      ucl: ucl ?? 0,
      lcl: lcl ?? 0,
      cpkU: cpkU ?? 0,
      cpkL: cpkL ?? 0,
      isLableWarning: (cpk < cpkTargetValue) ? true : false,
      average25: stdAvgFor25 !== undefined ? stdAvgFor25.averageValueFor25SMS ?? 0 : 0,
      average30: stdAvgFor30 !== undefined ? stdAvgFor30.averageValueFor30SMS ?? 0 : 0,
      chartTypeId: element.chartTypeId ?? 0,
      rangeXBarUclR: rangeXBarUclRAndLclR.uclR ?? 0,
      rangeXBarLclR: rangeXBarUclRAndLclR.lclR ?? 0,
      xBarSUcl: xBarSUcl ?? 0,
      xBarsLcl: xBarSLcl ?? 0,
      rangeBarAverageFor30: rangeBarAverageFor30,
      rangeBarAverageFor25: rangeBarAverageFor25,
      plotValues: plotDataValues,
      ipNo: this.ip,
      chartType: element.chartType,
      rangeXBarSAverageFor30: rangeXBarSAverageFor30,
      rangeXBarSUclR: rangeXBarSUclRAndLclR.uclR ?? 0,
      rangeXBarSLclR: rangeXBarSUclRAndLclR.lclR ?? 0
    };
  }

  private getXBarSCalculationDataForDIM(plotDataValues: any, element: any, xBarSUcl: number, xBarSLcl: number) {
    this.xBarRActualValueFor25 = this.parameterDimMeasurementActualValuesFor25.filter(x => x.chartTypeId === ChartType.xBarS);
    this.xBarRActualValueFor30 = this.parameterDimMeasurementActualValuesFor30.filter(x => x.chartTypeId === ChartType.xBarS || x.chartTypeId === ChartType.RangeXBarS);

    if (this.xBarRActualValueFor30 && this.xBarRActualValueFor30.length > 0) {
      plotDataValues = this.xBarRActualValueFor30.filter(x => x.parameterId === element.parameterManagementId
        && x.chartTypeId === ChartType.xBarS || x.chartTypeId === ChartType.RangeXBarS);
    }
    if (this.xBarRActualValueFor25 && this.xBarRActualValueFor25.length > 0) {
      const stdAvgFor25 = this.apiService.calculateSPSChartAverageStandardDeviationParameterFor25SMS(this.xBarRActualValueFor25, element.parameterManagementId);
      xBarSUcl = this.apiService.getSPCChartCalculationUCL(stdAvgFor25.averageValueFor25SMS, stdAvgFor25.standardDeviation25, this.dimSampleSize);
      xBarSLcl = this.apiService.getSPCChartCalculationLCL(stdAvgFor25.averageValueFor25SMS, stdAvgFor25.standardDeviation25, this.dimSampleSize);
    }
    return { plotDataValues, xBarSUcl, xBarSLcl };
  }



  private getIMRCalculationDataForDIM(plotDataValues: any, element: any, rangeBarAverageFor30: number, rangeBarAverageFor25: number) {
    this.xBarRActualValueFor25 = this.parameterDimMeasurementActualValuesFor25.filter(x => x.chartTypeId === ChartType.IMR);
    this.xBarRActualValueFor30 = this.parameterDimMeasurementActualValuesFor30.filter(x => x.chartTypeId === ChartType.IMR);
    if (this.parameterDimMeasurementActualValuesFor30 && this.parameterDimMeasurementActualValuesFor30.length > 0) {
      plotDataValues = this.parameterDimMeasurementActualValuesFor30.filter(x => x.parameterId === element.parameterManagementId
        && (x.chartTypeId === ChartType.IMR || x.chartTypeId === ChartType.RangeIMR));
      const smsFormDataRangeIMRFor30 = this.parameterDimMeasurementActualValuesFor30.filter(y => y.chartTypeId === ChartType.RangeIMR);
      rangeBarAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeIMRFor30);
    }
    if (this.parameterDimMeasurementActualValuesFor25 && this.parameterDimMeasurementActualValuesFor25.length > 0) {
      const smsFormDataRangeIMRFor25 = this.parameterDimMeasurementActualValuesFor25.filter(y => y.chartTypeId === ChartType.RangeIMR);
      rangeBarAverageFor25 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeIMRFor25);
    }
    return { plotDataValues, rangeBarAverageFor30, rangeBarAverageFor25 };
  }

  getCPKFromUpperLowerTolerance(spcCalculationObject25, spcCalculationObject30, upperToleranceValue: number,
    lowerToleranceValue: number, chartTypeId: number, rangeAverage?: number) {

    let ucl;
    let lcl;
    let cpkU;
    let cpkL;
    let cpk;

    if (spcCalculationObject25) {

      if (chartTypeId === ChartType.IMR) {
        ucl = this.apiService.getSPCChartCalculationUCLForIMR(spcCalculationObject25.averageValueFor25SMS, rangeAverage);
        lcl = this.apiService.getSPCChartCalculationLCLForIMR(spcCalculationObject25.averageValueFor25SMS, rangeAverage);
      } else {
        ucl = this.apiService.getSPCChartCalculationUSL(spcCalculationObject25.averageValueFor25SMS, spcCalculationObject25.standardDeviation25);
        lcl = this.apiService.getSPCChartCalculationLSL(spcCalculationObject25.averageValueFor25SMS, spcCalculationObject25.standardDeviation25);
      }
    }

    if (spcCalculationObject30) {
      cpkU = this.apiService.getSPCChartCalculationCpkU(upperToleranceValue, spcCalculationObject30.averageValueFor30SMS, spcCalculationObject30.standardDeviation30);
      cpkL = this.apiService.getSPCChartCalculationCpkL(lowerToleranceValue, spcCalculationObject30.averageValueFor30SMS, spcCalculationObject30.standardDeviation30);
      cpk = this.apiService.getSPCCPKCalculation(cpkU, cpkL);
    }
    return { cpk, ucl, lcl, cpkU, cpkL };
  }



  getDataType(dataTypeId: number) {
    return dataTypes[0].id === dataTypeId ? dataTypes[0].name : dataTypes[1].name;
  }

  returnSupplierFunctionAttributeObj(element, supplierMeasurementSubmissionId?: number): any {

    return {
      id: element.id,
      name: element.name ?? element.parameterManagement.name,
      testRequirement: element.testRequirement ?? '',
      inspectionDetails: element.inspectionDetails ?? '',
      resultExpected: this.getResult(element, supplierMeasurementSubmissionId),
      isChecked: element.isChecked,
      isEnabled: false,
      resultId: element.resultId === resultExpected[0].id ? resultExpected[0].id : resultExpected[1].id,
      supplierMeasurementSubmissionId: supplierMeasurementSubmissionId ?? 0,
      parameterManagementId: element.parameterManagementId ?? 0,
      resultPassFailId: element.resultPassFailId,
      resultActualId: element.resultActualId,
      resultActual: element.resultActualId === resultExpected[0].id ? resultExpected[0].name : resultExpected[1].name,
      defectType: element.defectTypes.map(x => x.defectTypeName).join(','),
      addedDefectTypeIds: this.getDefectTypeIds(element.defectTypes.map(x => x.id)),
      enableRowAddDefectTypes: element.supplierFunctionAttributeActuals.some(x => x.actualTextValue.includes('2')),
      supplierFunctionAttributeActuals: this.recId !== 0 ? element.supplierFunctionAttributeActuals : [],
      // isDisabled is used for row disabling for controls.
      isDisabled: true
    };
  }


  getDefectTypeIds(ids) {
    const x: number[] = [];
    ids.forEach(element => {
      x.push(element);
    });
    return x;
  }

  getExpandedFunctionAttributes(pageSortFilterInfo: PageSortFilterInfo) {
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('FUN')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('FUN'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, 'FUN', batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        calculatedSampleSize = Number(data.value[0].smplSize);
        this.displaySupplierFunctionAttributeColumns = (new SupplierFunctionAttributeLabelModel()).displayColumns();
        Array(Number(calculatedSampleSize))
          .fill(1)
          .forEach((value, index) => {
            const tableColumn = new TableColumn();
            this.dynamicTypeFunctionAttributeCollection[`${this.actualValueFunctionAttribute}${value + index}`] = [];
            resultExpected.forEach(e => {
              this.dynamicTypeFunctionAttributeCollection[`${this.actualValueFunctionAttribute}${value + index}`][e.id] = e.name;
            });
            tableColumn.field = `${this.actualValueFunctionAttribute}${value + index}`;
            tableColumn.header = `ResultValue${value + index}`;
            const objColumnInfo = new ColumnInfo();
            objColumnInfo.type = ColumnType.MultipleDropDownTableDynamicType;
            objColumnInfo.mappingField = 'name';
            tableColumn.columnInfo = objColumnInfo;
            tableColumn.isVisible = true;
            tableColumn.isExport = true;
            tableColumn.valueMember = `${this.actualValueFunctionAttribute}${value + index}`;
            this.displaySupplierFunctionAttributeColumns.push(tableColumn);
          });
        this.tableWidthForFunctionAttribute = this.constantTablewidth + (this.approximateWidthForEachTextBox * Number(calculatedSampleSize));
      }
    }, () => { }, () => {

      if (this.recId != null && !this.isSupplierFunctionAttributeExpanded) {
        this.getUpdateSupplierFunctionAttribute(pageSortFilterInfo);
      } else {
        if (!this.isSupplierFunctionAttributeExpanded) {
          this.getAddSupplierFunctionAttribute(pageSortFilterInfo);
        }
      }
    });
  }

  getExpandedSupplierMicroSectionParameters(pageSortFilterInfo: PageSortFilterInfo) {


    let microSectionSampleSize = '0';
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, 'DIM', batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        microSectionSampleSize = data.value[0].smplSize;
        this.microSectionParameterColumns = (new SupplierMicroSectionParameterLabelModelColumns()).displayColumns();
        if (microSectionSampleSize !== null) {
          Array(Number(microSectionSampleSize))
            .fill(1)
            .forEach((value, index) => {
              const tableColumn = new TableColumn();
              tableColumn.field = `${this.actualValueMicroSection}${value + index}`;
              tableColumn.header = `ActualValue${value + index}`;
              const objColumnInfo = new ColumnInfo();
              objColumnInfo.type = ColumnType.String;
              tableColumn.columnInfo = objColumnInfo;
              tableColumn.isVisible = true;
              tableColumn.isExport = true;
              this.microSectionParameterColumns.push(tableColumn);
            });
          // this.tableWidthForMicroSection = this.constantTablewidth + (this.approximateWidthForEachTextBox * Number(microSectionSampleSize));
        }
        // this.generateTextBoxesForSupplierMicroSection(microSectionSampleSize);
      } else {
        microSectionSampleSize = '0';
      }
    }, () => { }, () => {
      if (this.recId !== null && !this.isMicroSectionExpanded) {
        this.getUpdateSupplierMicroSection(pageSortFilterInfo);
      } else {
        if (!this.isMicroSectionExpanded) {
          this.getAddSupplierMicroSection(pageSortFilterInfo);
        }
      }
    });
  }

  returnSupplierVisualInspectionObj(element, supplierMeasurementSubmissionId?: number): any {
    return {
      id: element.id,
      supplierMeasurementSubmissionId: element.supplierMeasurementSubmissionId,
      name: element.name ?? element.parameterManagement.name,
      detailsDefine: element.detailsDefine ?? '',
      toolsType: element.inspectionToolsType !== null ? element.inspectionToolsType.type : '',
      inspectionToolsTypeId: element.inspectionToolsTypeId ?? null,
      isChecked: element.isChecked,
      isEnabled: element.isEnabled,
      parameterManagementId: element.parameterManagementId ?? null,
      sAPPartInspectionPlanId: element.sapPartInspectionPlanId ?? null,
      dataTypes: element.dataTypeId === dataTypes[1].id ? dataTypes[1].name : dataTypes[0].name,
      dataTypeId: element.dataTypeId === dataTypes[1].id ? dataTypes[1].id : dataTypes[0].id,
      inspectionDetails: element.inspectionDetails,

      selectedDynamicId: element.inspectionToolsId ?? 0,
      samplingSize: this.recId !== null ? element.samplingSize : this.visualInspectionSampleSize,

      supplierVisualInspectionDefectTypes: [],
      defectType: this.recId !== null ? element.defectTypes.map(x => x.defectTypeName).join(',') : '',
      addedDefectTypeIds: this.recId !== null ? this.getDefectTypeIds(element.defectTypes.map(x => x.id)) : '',
      totalDefectQty: this.recId !== null ? element.totalDefectQty : null,
      enableRowAddDefectTypes: element.enableRowAddDefectTypes,
      resultActualId: this.recId !== null ? element.resultActualId : 2,
      isDisabled: true


    };
  }
  inspectionDetailsTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      this.formInput.markAsDirty();
    }
  }


  visualInspectionDetailsMaxCharactersValid() {
    this.isVisualInspectionDetailsMaxCharactersValid = true;
    if (this.supplierVisualInspectionDetails) {
      const supplierVisualInspection = this.formInput.controls[this.properties.supplierVisualInspection];
      this.supplierVisualInspectionDetails.forEach(element => {
        if (element.inspectionDetails !== undefined) {
          if (element.inspectionDetails.length > 256) {
            this.isVisualInspectionDetailsMaxCharactersValid = false;
          }
        }
      });

      if (!this.isVisualInspectionDetailsMaxCharactersValid) {
        supplierVisualInspection.setValidators(Validators.required);
        supplierVisualInspection.updateValueAndValidity();
      } else {
        supplierVisualInspection.setErrors(null);
        supplierVisualInspection.clearValidators();
        supplierVisualInspection.updateValueAndValidity();
      }
    }
    return this.isVisualInspectionDetailsMaxCharactersValid;
  }

  getActiveInspectionTools() {
    this._toolsService.getActiveData()
      .subscribe(data => {
        this.dynamicToolsCollection['inspectionTools'] = [];
        data.value.map(e => {
          this.dynamicToolsCollection['inspectionTools'][e.id] = e.name;
        });
      });
  }


  getSampleSizeForVisualInspection(pageSortFilterInfo: PageSortFilterInfo) {
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('VIS')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('VIS'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, 'VIS', batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        this.visualInspectionSampleSize = data.value[0].smplSize;
        this.visualInspectionRejectionQty = data.value[0].rejNo == null ? '0' : data.value[0].rejNo;
      } else {
        this.visualInspectionSampleSize = '0';
        this.visualInspectionRejectionQty = '0';
      }
    }, () => { }, () => {
      this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
        if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.sapPartInspectionPlanService.isReturnedDataHasValue(data)) {
          this.sapPartInspectionPlan.partCountParameters = data.value[0].partCountParameters;
          this.entity = this.sapPartInspectionPlan;
          if (this.sapPartInspectionPlan.partCountParameters !== null && this.sapPartInspectionPlan.partCountParameters !== undefined &&
            this.sapPartInspectionPlan.partCountParameters.length > 0) {
            this.supplierVisualInspectionDetails = [];
            this.sapPartInspectionPlan.partCountParameters.map(record => {
              this.supplierVisualInspection = this.returnSupplierVisualInspectionObj(record);
              this.supplierVisualInspectionDetails.push(this.supplierVisualInspection);
            });
          }
          this.isSupplierVisualInspectionExpanded = true;
        } this.getActiveInspectionTools();
        // this.checkIsPassFailVisualInspection(this.supplierVisualInspectionDetails);
      });
    });
  }

  getExpandedSupplierDimensionMeasurements(pageSortFilterInfo: PageSortFilterInfo) {
    let supplierDimensionMeasurementSampleSize = '0';
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, 'DIM', batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        supplierDimensionMeasurementSampleSize = data.value[0].smplSize;
        if (supplierDimensionMeasurementSampleSize !== null) {
          this.dimensionMeasurementColumns = (new SupplierMicroSectionParameterLabelModelColumns()).displayColumns();
          Array(Number(supplierDimensionMeasurementSampleSize))
            .fill(1)
            .forEach((value, index) => {
              const tableColumn = new TableColumn();
              tableColumn.field = `${this.actualValueDimensionMeasurement}${value + index}`;
              tableColumn.header = `ActualValue${value + index}`;
              const objColumnInfo = new ColumnInfo();
              objColumnInfo.type = ColumnType.String;
              tableColumn.columnInfo = objColumnInfo;
              tableColumn.isVisible = true;
              tableColumn.isExport = true;
              this.dimensionMeasurementColumns.push(tableColumn);
            });
          // this.tableWidthForFunctionVariable = this.constantTablewidth + (this.approximateWidthForEachTextBox * Number(sampleSize));
        }
      } else {
        supplierDimensionMeasurementSampleSize = '0';
      }
    }, () => { }, () => {
      if (this.recId !== null && !this.isDimensionMeasurementExpanded) {
        this.getUpdateSupplierDimensionMeasurement(pageSortFilterInfo);
      } else {
        if (!this.isDimensionMeasurementExpanded) {
          this.getAddSupplierDimensionMeasurement(pageSortFilterInfo);
        }
      }
    });
  }

  getExpandedSupplierFunctionVariables(pageSortFilterInfo: PageSortFilterInfo) {
    let functionVariableSampleSize = '0';
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('FUN')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('FUN'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, 'FUN', batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        functionVariableSampleSize = data.value[0].smplSize;
        if (functionVariableSampleSize !== null) {
          this.functionVariableColumns = (new SupplierMicroSectionParameterLabelModelColumns()).displayColumns();
          Array(Number(functionVariableSampleSize))
            .fill(1)
            .forEach((value, index) => {
              const tableColumn = new TableColumn();
              tableColumn.field = `${this.actualValueFunctionVariable}${value + index}`;
              tableColumn.header = `ActualValue${value + index}`;
              const objColumnInfo = new ColumnInfo();
              objColumnInfo.type = ColumnType.String;
              tableColumn.columnInfo = objColumnInfo;
              tableColumn.isVisible = true;
              tableColumn.isExport = true;
              this.functionVariableColumns.push(tableColumn);
            });
          // this.tableWidthForFunctionVariable = this.constantTablewidth + (this.approximateWidthForEachTextBox * Number(sampleSize));
        }
      } else {
        functionVariableSampleSize = '0';
      }
    }, () => { }, () => {
      if (this.recId !== null && !this.isFunctionVariableExpanded) {
        this.getUpdateSupplierFunctionVariable(pageSortFilterInfo);
      } else {
        if (!this.isFunctionVariableExpanded) {
          this.getAddSupplierFunctionVariable(pageSortFilterInfo);
        }
      }
    });

    // if (this.recId != null && !this.isFunctionVariableExpanded) {
    //   this.getSampleSizeForSupplierFunctionVariable(pageSortFilterInfo);
    // } else {
    //   if (!this.isFunctionVariableExpanded) {
    //     this.getSampleSizeForSupplierFunctionVariable(pageSortFilterInfo);
    //   }
    // }
  }

  private returnDataArray(element: any): any {
    this.recId = null;
    this.resultPassFail = result[0].name;
    return {
      id: element.id,
      name: element.name ?? element.parameterManagement.name,
      testRequirement: element.testRequirement ?? '',
      inspectionDetails: element.inspectionDetails ?? '',
      resultExpected: this.getResult(element, this.recId),
      isChecked: element.isChecked,
      isEnabled: element.isEnabled,
      parameterManagementId: element.parameterManagementId,
      resultId: this.recId !== undefined && element.resultId === resultExpected[0].id ? resultExpected[0].id : resultExpected[1].id,
      sAPPartInspectionPlanId: this.sapPartInspectionPlanId ?? 0,
      defectType: '',
      defectTypes: [],
      resultPassFailId: result[0].id,
      addedDefectTypeIds: [],
      supplierMeasurementSubmissionId: this.recId,
      enableRowAddDefectTypes: false,
      supplierFunctionAttributeActuals: [],
    };
  }

  getResult(element, recId: number): any {
    if (recId) {
      if (element.resultId === undefined) {
        return resultExpected[0].name;
      }
      return element.resultId === resultExpected[0].id ? resultExpected[0].name : resultExpected[1].name;
    } else {
      return resultExpected[0].name;
    }
  }

  getParameterManagementId(element): number {
    if (this.recId) {
      if (element.parameterManagementId === undefined) {
        return element.id;
      }
      return element.parameterManagementId;
    } else {
      return element.id;
    }
  }

  isSamplingPlanDataNumbersOnly() {
    this.isSamplingPlanNumbersOnly = true;
    const supplierSampling = this.formInput.controls[this.properties.supplierSampling];
    const regex = new RegExp(regexOnlyNumbers);
    if (this.supplierSamplingPlans) {
      this.supplierSamplingPlans.forEach(element => {
        if (element.failedQuantity !== undefined && !regex.test(element.failedQuantity.toString())) {
          this.isSamplingPlanNumbersOnly = false;
        }
      });
    }
    if (!this.isSamplingPlanNumbersOnly) {
      supplierSampling.setValidators(Validators.required);
      supplierSampling.updateValueAndValidity();
    } else {
      supplierSampling.setErrors(null);
      supplierSampling.clearValidators();
      supplierSampling.updateValueAndValidity();
    }
    return this.isSamplingPlanNumbersOnly;
  }

  supplierTestReportAttachmentUploaded() {
    this.isSupplierTestReportAttachmentUploaded = true;
    if (this.isSupplierTestReportExpanded) {
      const supplierTestReport = this.formInput.controls[this.properties.supplierTestReport];
      if (this.supplierTestReportTabDetails) {
        this.filteredSupplierTestReportTabDetails = this.supplierTestReportTabDetails.filter(k => k.isChecked === true);
        this.filteredSupplierTestReportTabDetails.forEach(element => {
          if (!this.recId && this.isDefectTypeEmpty(element) && (element.hasSupplierAttachments === undefined || element.hasSupplierAttachments === false)) {
            this.isSupplierTestReportAttachmentUploaded = false;
          } else if (this.recId && this.isDefectTypeEmpty(element) && element.hasSupplierAttachments !== undefined && element.hasSupplierAttachments === false) {
            this.isSupplierTestReportAttachmentUploaded = false;
          }
        });
      }
      if (!this.isSupplierTestReportAttachmentUploaded || !this.isInspectionDetailsMaxCharactersValid) {
        supplierTestReport.setValidators(Validators.required);
        supplierTestReport.updateValueAndValidity();
      } else {
        supplierTestReport.setErrors(null);
        supplierTestReport.clearValidators();
        supplierTestReport.updateValueAndValidity();
      }
    }
    return this.isSupplierTestReportAttachmentUploaded;
  }

  inspectionDetailsMaxCharactersValid() {
    this.isInspectionDetailsMaxCharactersValid = true;
    if (this.supplierTestReportTabDetails) {
      const supplierTestReport = this.formInput.controls[this.properties.supplierTestReport];
      this.supplierTestReportTabDetails.forEach(element => {
        if (element.inspectionDetails !== undefined) {
          if (element.inspectionDetails.length > 256) {
            this.isInspectionDetailsMaxCharactersValid = false;
          }
        }
      });

      if (!this.isInspectionDetailsMaxCharactersValid || !this.isSupplierTestReportAttachmentUploaded) {
        supplierTestReport.setValidators(Validators.required);
        supplierTestReport.updateValueAndValidity();
      } else {
        supplierTestReport.setErrors(null);
        supplierTestReport.clearValidators();
        supplierTestReport.updateValueAndValidity();
      }
    }
    return this.isInspectionDetailsMaxCharactersValid;
  }

  getExpandedCountParameters(pageSortFilterInfo: PageSortFilterInfo) {
    if (this.recId != null && !this.isSupplierVisualInspectionExpanded) {
      // this.getSampleSizeForVisualInspection();
      this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
        this.supplierMeasurement.supplierVisualInspections = data.value[0].supplierVisualInspections;
        if (this.supplierMeasurement.supplierVisualInspections !== null && this.supplierMeasurement.supplierVisualInspections !== undefined &&
          this.supplierMeasurement.supplierVisualInspections.length > 0) {
          this.supplierVisualInspectionDetails = [];
          this.supplierMeasurement.supplierVisualInspections.map(record => {
            this.supplierVisualInspection = new SupplierVisualInspectionModel();
            this.supplierVisualInspection = this.returnSupplierVisualInspectionObj(record, this.recId);
            this.supplierVisualInspectionDetails.push(this.supplierVisualInspection);
          });
        }
        this.isSupplierVisualInspectionExpanded = true;
        this.getActiveInspectionTools();
        this.checkIsPassFailVisualInspection(this.supplierVisualInspectionDetails);
      });


    } else {
      if (!this.isSupplierVisualInspectionExpanded) {
        this.getSampleSizeForVisualInspection(pageSortFilterInfo);
      }
    }


  }

  getDefaultVisualInspectionParameter(sAPPartInspectionPlan, commodityId: number) {
    const commodityID = sAPPartInspectionPlan != null ? sAPPartInspectionPlan.commodityId : commodityId;
    this._parameterManagementService.getParameterManagementDataByCommodityId(commodityID, this.sapPartInspectionPlanService.getPcCodes(this.samplingPlans)).subscribe(data => {
      this.resultVisualInspectionData = data.value;
      this.showHideTab(data.value);
    });
  }

  isDefectTypeEmpty(element: SupplierTestReport) {
    return (element.selectedDynamicId === undefined || element.selectedDynamicId === Constants.Empty
      || element.selectedDynamicId == null || element.selectedDynamicId === '0' || element.selectedDynamicId === Numbers.Default);
  }


  functionAttributeCheckBoxChangedEvent() {
    this.formInput.markAsDirty();
    // this.saveAsDraftButtonValidation();
  }

  getAllInstrumentNo() {
    const pageSortFilterInfo = this.filterEnabled();
    this._instrumentService.getAllData(pageSortFilterInfo)
      .subscribe(data => {
        // this.dynamicTypeCollection['instrumentNo'] = [];
        // data.value.map(e => {
        //   this.dynamicTypeCollection['instrumentNo'][e.id] = e.instrumentNo;
        // });

        this.dynamicTypeCollection['instrumentNo'] = [];
        const instrument = [];
        data.value.forEach((e: any) => {
          if (e !== undefined) {

            instrument.push({ colValToMatch: e.instrumentTypeId, optionKey: e.id, optionValue: e.instrumentNo });


          }
        });
        this.dynamicTypeCollection['instrumentNo'] = [instrument];
      });
  }

  private filterEnabled() {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.filterInfo = [];
    const filterInfo = new FilterInfo();
    filterInfo.columnName = 'IsEnabled';
    filterInfo.columnType = ColumnType.Boolean;
    filterInfo.mappingField = 'IsEnabled';
    filterInfo.value = true;
    filterInfo.operator = SearchOperator.IsEqualTo;
    pageSortFilterInfo.filterInfo.push(filterInfo);
    return pageSortFilterInfo;
  }

  getAllDefectTypes() {
    this._defectTypeService.getDefectTypeNameBySection(DefectSection.Test_Report)
      .subscribe(data => {
        this.dynamicTypeTestReportCollection['defectTypeName'] = [];
        data.value.map(e => {
          this.dynamicTypeTestReportCollection['defectTypeName'][e.id] = e.defectTypeName;
        });
      });
  }

  getAllInstrumentTypes() {
    this._instrumentTypeService.getAllData()
      .subscribe(data => {
        this.dynamicTypeCollection['instrumentTypeCode'] = [];
        data.value.map(e => {
          this.dynamicTypeCollection['instrumentTypeCode'][e.id] = e.code;
        });
      });
  }

  getAllUnits() {
    this._UOMService.getAllData()
      .subscribe(data => {
        this.dynamicTypeCollection['unit'] = [];
        data.value.map(e => {
          this.dynamicTypeCollection['unit'][e.id] = e.name;
        });
      });
  }

  getAllDimensionDefault() {
    this._dimensionDefaultService.getAllData()
      .subscribe(data => {
        this.dimensionDefaults = data.value;
      });
  }

  instrumentDropDownChangeEvent(event, tabId) {

    if (event !== undefined && event.row !== undefined) {
      const instrumentId = event.dropDownChangedEvent.target.value;
      switch (tabId) {
        case TabType.MicroSection:
          const microInstrumentData = this.supplierMicroSectionParameters.filter(x => x.parameterManagementId === event.row.parameterManagementId)[0];
          microInstrumentData.instrumentNo = '';
          microInstrumentData.instrumentId = instrumentId === 0 ? null : +instrumentId;
          break;
        case TabType.Measurement:
          const measurementInstrumentData = this.supplierDimensionMeasurements.filter(x => x.parameterManagementId === event.row.parameterManagementId)[0];
          measurementInstrumentData.instrumentNo = '';
          measurementInstrumentData.instrumentId = instrumentId === 0 ? null : +instrumentId;
          break;
        case TabType.FUN:
          const functionInstrumentData = this.supplierFunctionVariables.filter(x => x.parameterManagementId === event.row.parameterManagementId)[0];
          functionInstrumentData.instrumentNo = '';
          functionInstrumentData.instrumentId = instrumentId === 0 ? null : +instrumentId;
          break;
        default:
          break;
      }

      this.formInput.markAsDirty();
    }
  }

  isSapBasedParameterDetailsEmpty() {
    const supplierSapBasedParameter = this.formInput.controls[this.properties.supplierSapBasedParameter];
    this.isSapBasedParameterDetailEmpty = false;
    if (this.supplierSapBasedParameters) {
      this.supplierSapBasedParameters.forEach(element => {
        if (element.matchResult === yesNoOptions[1].name && (element.defectType === undefined || element.defectType === Constants.Empty)) {
          supplierSapBasedParameter.setValidators(Validators.required);
          supplierSapBasedParameter.updateValueAndValidity();
          this.isSapBasedParameterDetailEmpty = true;
        }
      });
    }
    if (this.isSapBasedParameterDetailEmpty) {
      supplierSapBasedParameter.setValidators(Validators.required);
      supplierSapBasedParameter.updateValueAndValidity();
    } else {
      supplierSapBasedParameter.setErrors(null);
      supplierSapBasedParameter.clearValidators();
      supplierSapBasedParameter.updateValueAndValidity();
      this.formInput.markAsDirty();
      this.saveAsValidation();
    }
    return this.isSapBasedParameterDetailEmpty;
  }

  supplierTestReportDropDownChangeEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      if (this.recId != null && this.recId !== 0) {
        const pageSortFilterInfo = new PageSortFilterInfo();
        pageSortFilterInfo.expandInfo = this.apiService.setSupplierTestReportAttachmentSortFilterInfo(pageSortFilterInfo);
        const selectedTestReportTabRow = this.supplierTestReportTabDetails.find(k => k.partTestReportParameterId === event.row.partTestReportParameterId);
        if (!selectedTestReportTabRow.isSupplierAttachmentExpanded) {
          this.supplierTestReportService.getTestReportDataById(event.row.supplierTestReportId, pageSortFilterInfo).subscribe(data => {
            if (data.value[0].supplierTestReportAttachments && data.value[0].supplierTestReportAttachments.length > 0) {
              selectedTestReportTabRow.hasSupplierAttachments = true;
            } else {
              selectedTestReportTabRow.hasSupplierAttachments = false;
            }
          });
        } else {
          this.setSupplierTestReportAttachmentHasUpload(selectedTestReportTabRow);
        }
      }
      this.formInput.markAsDirty();
    }
  }

  isFunctionAttributeInspectionDetailsEmpty() {
    const functionAttributeInspectionDetails = this.formInput.controls[this.properties.supplierFunctionAttribute];
    this.isFunctionAttributeInspectionDetailEmpty = false;
    if (this.supplierFunctionAttributeDetails) {
      this.supplierFunctionAttributeDetails.forEach(element => {
        const keys = Object.keys(element);
        keys.map((key) => {
          if (key.includes('FunctionAttributeResult')) {
            if (Number(element[key]) === resultExpected[1].id && (element.defectType === undefined || element.defectType === Constants.Empty)) {
              functionAttributeInspectionDetails.setValidators(Validators.required);
              functionAttributeInspectionDetails.updateValueAndValidity();
              this.isFunctionAttributeInspectionDetailEmpty = true;
            }
          }
        });
      });
    }
    if (this.isFunctionAttributeInspectionDetailEmpty) {
      functionAttributeInspectionDetails.setValidators(Validators.required);
      functionAttributeInspectionDetails.updateValueAndValidity();
    } else {
      functionAttributeInspectionDetails.setErrors(null);
      functionAttributeInspectionDetails.clearValidators();
      functionAttributeInspectionDetails.updateValueAndValidity();
      this.formInput.markAsDirty();
      this.saveAsValidation();
    }
    return this.isFunctionAttributeInspectionDetailEmpty;
  }

  checkIsPassFail(supplierFunctionAttributes?, sapBasedParameters?) {
    if (supplierFunctionAttributes && supplierFunctionAttributes != null) {
      supplierFunctionAttributes.map(element => {
        if (this.recId && this.recId !== null && this.recId !== 0 && element.supplierFunctionAttributeActuals.some(x => x.actualTextValue.includes('2'))) {
          this.resultPassFail = result[1].name;
          supplierFunctionAttributes.resultPassFailId = result[1].id;
          this.isPassFailResult = true;
        } else {
          this.resultPassFail = result[0].name;
          supplierFunctionAttributes.resultPassFailId = result[0].id;
          this.isPassFailResult = false;
        }

      });
    }
    if (sapBasedParameters && sapBasedParameters !== null) {
      if (this.checkSapBasedMatchFailRecord(sapBasedParameters)) {
        this.resultPassFailSapBased = result[1].name;
        this.isPassFailResultSapBased = true;
      } else {
        this.resultPassFailSapBased = result[0].name;
        this.isPassFailResultSapBased = true;
      }

    }
  }

  checkSapBasedMatchFailRecord(objectModelData: any): boolean {
    return objectModelData.some(r => (r.matchId === Numbers.Default));
  }


  checkIsPassFailVisualInspection(supplierVisualInspections?) {
    if (supplierVisualInspections && supplierVisualInspections != null) {
      const BreakException = {};

      if (supplierVisualInspections.length > 0) {
        const totalFailedQty = supplierVisualInspections.map(x => Number(x.totalDefectQty)).reduce((a, b) => a + b, 0);
        if (totalFailedQty > Number(supplierVisualInspections[0].samplingSize)) {
          this.isExceedInspectionQtyVisualInspection = true;
        } else {
          this.isExceedInspectionQtyVisualInspection = false;
        }

      }

      try {
        supplierVisualInspections.forEach(element => {
          // CTQ
          if (element.dataTypeId === DataType.CTQ) {
            if (element.totalDefectQty === 0 || element.totalDefectQty === null) {
              this.resultPassFailVisualInspection = result[0].name;
              // supplierVisualInspections.resultPassFailId = result[0].id;
              this.visualInspectionResultPassFailId = result[0].id;
              this.isPassFailResultVisualInspection = true;
            } else {
              this.resultPassFailVisualInspection = result[1].name;
              this.visualInspectionResultPassFailId = result[1].id;
              this.isPassFailResultVisualInspection = false;
              throw BreakException;
            }
          } else {
            const total = supplierVisualInspections.filter(n => n.dataTypeId === DataType.NONCTQ).map(x => Number(x.totalDefectQty)).reduce((a, b) => a + b, 0);
            if (this.visualInspectionRejectionQty === '0' && total === 0) {
              this.resultPassFailVisualInspection = result[0].name;
              this.visualInspectionResultPassFailId = result[0].id;
              this.isPassFailResultVisualInspection = false;
              throw BreakException;
            }
            if (total > this.visualInspectionRejectionQty) {
              this.resultPassFailVisualInspection = result[1].name;
              this.visualInspectionResultPassFailId = result[1].id;
              this.isPassFailResultVisualInspection = false;
              throw BreakException;
            } else {
              this.resultPassFailVisualInspection = result[0].name;
              this.visualInspectionResultPassFailId = result[0].id;
              this.isPassFailResultVisualInspection = true;
            }

          }
        });
      } catch (e) {
        if (e !== BreakException) { throw e; }
      }
    }



  }


  expandTabDynamic(tabId: number) {
    const pageSortFilterInfo = new PageSortFilterInfo();
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';

    switch (tabId) {
      case TabType.ResultOriented:
        if (!this.isSupplierFunctionAttributeExpanded) {
          pageSortFilterInfo.expandInfo = this.recId !== null ? this.apiService.setSupplierFunctionAttributePageSortFilterInfo(pageSortFilterInfo)
            : this.sapPartInspectionPlanService.setResultOrientedPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedFunctionAttributes(pageSortFilterInfo);
        }
        break;
      case TabType.MicroSection:
        if (!this.isMicroSectionExpanded) {
          const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

          this.apiService.getSampleSize(this.partNo, this.vendorCode, DIM, batchQuantity, proc.split('=')[0]).subscribe(data => {
            if (data && data.value.length > 0) {
              this.dimSampleSize = Number(data.value[0].smplSize);
            }
          }, () => { }, () => {



            this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, this.skipValue, TabType.MicroSection, this.recId).subscribe((data) => {
              this.supplierSPCchartData = data.value;
              this.spcMicroSectionRecent30StdAvg = [];
              const recent30CalculatedData = this.apiService.calculateSPSChartAverageStandardDeviation(data.value);
              this.parameterMicroSectionActualValuesFor30 = data.value;
              if (recent30CalculatedData) {
                this.spcMicroSectionRecent30StdAvg.push(recent30CalculatedData);
              }
            }, () => { }, () => {

              const newSkip = this.skipValue + 5;
              this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, newSkip, TabType.MicroSection, this.recId).subscribe((data) => {
                this.supplierSPCchartData = data.value;
                this.spcMicroSectionRecent25StdAvg = [];
                const recent25CalculatedData = this.apiService.calculateSPSChartAverageStandardDeviation(data.value);
                this.parameterMicroSectionActualValuesFor25 = data.value;
                if (recent25CalculatedData) {
                  this.spcMicroSectionRecent25StdAvg.push(recent25CalculatedData);
                }
              }
                , () => { }, () => {
                  pageSortFilterInfo.expandInfo = this.recId !== null ? this.apiService.setSupplierMicroSectionPageSortFilterInfo(pageSortFilterInfo)
                    : this.sapPartInspectionPlanService.setMicroSectionPageSortFilterInfo(pageSortFilterInfo);
                  this.getExpandedSupplierMicroSectionParameters(pageSortFilterInfo);
                });
            });
          });
        }
        break;
      case TabType.Measurement:
        if (!this.isDimensionMeasurementExpanded) {
          const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

          this.apiService.getSampleSize(this.partNo, this.vendorCode, DIM, batchQuantity, proc.split('=')[0]).subscribe(data => {
            if (data && data.value.length > 0) {
              this.dimSampleSize = Number(data.value[0].smplSize);
            }
          }, () => { }, () => {

            this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, this.skipValue, TabType.Measurement, this.recId).subscribe((data) => {
              this.supplierSPCchartData = data.value;
              this.spcDiamensionmeasurement30StdAvg = [];
              const recent30CalculatedData = this.apiService.calculateSPSChartAverageStandardDeviation(data.value);
              this.parameterDimMeasurementActualValuesFor30 = data.value;
              if (recent30CalculatedData) {
                this.spcDiamensionmeasurement30StdAvg.push(recent30CalculatedData);
              }
            }, () => { }, () => {
              const newSkip = this.skipValue + 5;
              this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, newSkip, TabType.Measurement, this.recId).subscribe((data) => {
                this.supplierSPCchartData = data.value;
                this.spcDiamensionmeasurement25StdAvg = [];
                const recent25CalculatedData = this.apiService.calculateSPSChartAverageStandardDeviation(data.value);
                this.parameterDimMeasurementActualValuesFor25 = data.value;
                if (recent25CalculatedData) {
                  this.spcDiamensionmeasurement25StdAvg.push(recent25CalculatedData);
                }
              }, () => { }, () => {
                pageSortFilterInfo.expandInfo = this.recId !== null ? this.apiService.setSupplierDimensionMeasurementPageSortFilterInfo(pageSortFilterInfo)
                  : this.sapPartInspectionPlanService.setMeasurementParametersPageSortFilterInfo(pageSortFilterInfo);
                this.getExpandedSupplierDimensionMeasurements(pageSortFilterInfo);
              });
            });
          });
        }
        break;
      case TabType.FUN:

        if (!this.isFunctionVariableExpanded) {
          const proc = this.samplingPlans.filter(x => x.mstrChar.includes('FUN')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('FUN'))[0].smplProc : 'INCOMING';

          this.apiService.getSampleSize(this.partNo, this.vendorCode, FUN, batchQuantity, proc.split('=')[0]).subscribe(data => {
            if (data && data.value.length > 0) {

              this.funSampleSize = Number(data.value[0].smplSize);
            }
          }, () => { }, () => {

            this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, this.skipValue, TabType.FUN, this.recId).subscribe((data) => {
              this.supplierSPCchartData = data.value;
              this.spcFunRecent30StdAvg = [];
              const recent30CalculatedData = this.apiService.calculateSPSChartAverageStandardDeviation(data.value);
              this.parameterFunVariableActualValuesFor30 = data.value;
              if (recent30CalculatedData) {
                this.spcFunRecent30StdAvg.push(recent30CalculatedData);
                this.spcFunctionVariableRecent30SMSRangeBarR = data.value;
              }
            }, () => { }, () => {
              const newSkip = this.skipValue + 5;
              this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, newSkip, TabType.FUN, this.recId).subscribe((data) => {
                this.supplierSPCchartData = data.value;
                this.spcFunRecent25StdAvg = [];
                const recent25CalculatedData = this.apiService.calculateSPSChartAverageStandardDeviation(data.value);
                this.parameterFunVariableActualValuesFor25 = data.value;
                if (recent25CalculatedData) {
                  this.spcFunRecent25StdAvg.push(recent25CalculatedData);
                }
              }, () => { }, () => {
                pageSortFilterInfo.expandInfo = this.recId !== null ? this.apiService.setSupplierFunctionVariablePageSortFilterInfo(pageSortFilterInfo)
                  : this.sapPartInspectionPlanService.setFUNPageSortFilterInfo(pageSortFilterInfo);
                this.getExpandedSupplierFunctionVariables(pageSortFilterInfo);
              });
            });
          });
        }
        break;
      case TabType.VisualInspection:
        if (!this.isSupplierVisualInspectionExpanded) {
          pageSortFilterInfo.expandInfo = this.recId !== null ? this.apiService.setSupplierVisualInspectionPageSortFilterInfo(pageSortFilterInfo)
            : this.sapPartInspectionPlanService.setVisualnspectionParameterPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedCountParameters(pageSortFilterInfo);
        }
        break;
      case TabType.DateCode:
        if (!this.isDateCodeExpanded) {
          this.getExpandedSupplierDateCode();
        }
        break;
      case TabType.BowAndTwist:
        if (!this.isBowTwistExpanded) {
          pageSortFilterInfo.expandInfo = this.recId !== null ? this.apiService.setSupplierBowTwistPageSortFilterInfo(pageSortFilterInfo)
            : this.sapPartInspectionPlanService.setBowTwistPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedSupplierBowTwist(pageSortFilterInfo);
        }
        break;
      case TabType.MPositionTolerance:
        if (!this.isMPositionToleranceExpanded) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setMPositionPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartInspectionMPositionTolerances(pageSortFilterInfo);
        }
        break;
      case TabType.LPositionTolerance:
        if (!this.isLPositionToleranceExpanded) {
          pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setLPositionPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartInspectionLPositionTolerances(pageSortFilterInfo);
        }
        break;
      default:
        break;
    }
  }

  getExpandedPartInspectionLPositionTolerances(pageSortFilterInfo: PageSortFilterInfo) {
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, 'DIM', batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        calculatedSampleSize = Number(data.value[0].smplSize);
      } else {
        calculatedSampleSize = 0;
      }
      this.generateSpecWithLMCChildRowColumns();
      Array(calculatedSampleSize)
        .fill(1)
        .forEach((value, index) => {
          const tableColumn = new TableColumn();
          tableColumn.field = `${this.actualValueLMC}${value + index}`;
          tableColumn.header = `ActualValue${value + index}`;
          const objColumnInfo = new ColumnInfo();
          objColumnInfo.type = ColumnType.TextBox;
          tableColumn.columnInfo = objColumnInfo;
          tableColumn.isVisible = true;
          tableColumn.isExport = true;
          this.childDisplayColumnsLMC.push(tableColumn);
        });
      this.tableWidthForMMCLMC = this.constantTablewidth + (this.approximateWidthForEachTextBox * calculatedSampleSize);
    }, () => { }, () => {
      if (this.sapPartInspectionPlanId) {
        this.supplierLPositionToleranceTabDetails = [];
        this.sapPartInspectionPlan.partLPositionTolerances = [];
        this.isLPositionToleranceExpanded = true;
        this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
          if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.sapPartInspectionPlanService.isReturnedDataHasValue(data)) {
            this.sapPartInspectionPlan.partLPositionTolerances = data.value[0].partLPositionTolerances;
            this.populateLMCGeometryMainRow();
            this.populateLMCMainRowAsChildRow();
            this.populateLMCGeometryDefaultChildRows();
            this.populateMainRowIdAndChildRowIndexForChildRowsForLPosition();
          }
        }
          , () => {
          }, () => {
            if (this.recId !== null && this.recId !== 0) {
              const supplierPageSortFilterInfo = new PageSortFilterInfo();
              supplierPageSortFilterInfo.expandInfo = this.apiService.setSupplierLPositionTolerancePageSortFilterInfo(supplierPageSortFilterInfo);
              this.apiService.getDataById(this.recId, supplierPageSortFilterInfo).subscribe(data => {
                const supplierLPositions = data.value[0].supplierLPositions;
                this.mergeValuesFromDatabaseForLMC(supplierLPositions);
              }
                , () => {
                }, () => {
                }
              );
            }
          }
        );
      }
    });


  }


  mergeValuesFromDatabaseForMMC(supplierMPositions: SupplierMPosition[]) {
    if (this.supplierMPositionToleranceTabDetails) {
      this.supplierMPositionToleranceTabDetails.forEach(element => {
        element.isEnabled = false;
        this.mergeDropDownValuesFromDatabaseForMMC(supplierMPositions, element);
        if (element.childDataSource) {
          element.childDataSource.forEach(childElement => {
            this.mergeActualValuesFromDatabaseForMMC(supplierMPositions, element, childElement);
          });
        }
      });
    }
  }
  mergeValuesFromDatabaseForLMC(supplierLPositions: SupplierLPosition[]) {
    this.supplierLPositionToleranceTabDetails.forEach(element => {
      element.isEnabled = false;
      this.mergeDropDownValuesFromDatabaseForLMC(supplierLPositions, element);
      if (element.childDataSource) {
        element.childDataSource.forEach(childElement => {
          this.mergeActualValuesFromDatabaseForLMC(supplierLPositions, element, childElement);
        });
      }
    });
  }

  mergeDropDownValuesFromDatabaseForMMC(supplierMPositions: SupplierMPosition[], element: SupplierMPosition) {
    if (supplierMPositions) {
      const geometryToleranceSupplierMPosition = supplierMPositions
        .find(k => k.parameterManagementId === element.parameterManagementId && k.partDimensionId === element.partDimensionId);
      if (geometryToleranceSupplierMPosition) {
        element.id = geometryToleranceSupplierMPosition.id;
        element.uomId = geometryToleranceSupplierMPosition.uomId;
        element.instrumentTypeId = geometryToleranceSupplierMPosition.instrumentTypeId;
        element.instrumentId = element.selectedDynamicId = geometryToleranceSupplierMPosition.instrumentId;
      }
    }
  }

  mergeActualValuesFromDatabaseForMMC(supplierMPositions: SupplierMPosition[], element: SupplierMPosition, childElement: any) {
    if (supplierMPositions) {
      const filteredSupplierMPositions = supplierMPositions.filter(k => k.parameterManagementId === element.parameterManagementId);
      if (filteredSupplierMPositions) {
        if (childElement.dimensionDefaultId) {
          this.getDimensionDefaultRowsForMMC(filteredSupplierMPositions, childElement);
        } else if (childElement.associatedDimensionNumberId) {
          this.getAssociatedBonusToleranceForMMC(filteredSupplierMPositions, childElement);
        } else {
          this.getRowsExceptDimensionDefaultAndAssociatedBonustoleranceForMMC(filteredSupplierMPositions, childElement);
        }
      }
    }
  }


  getExpandedPartInspectionMPositionTolerances(pageSortFilterInfo: PageSortFilterInfo) {
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, 'DIM', batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        calculatedSampleSize = Number(data.value[0].smplSize);
      }
      this.generateSpecWithMMCChildRowColumns();
      Array(calculatedSampleSize)
        .fill(1)
        .forEach((value, index) => {
          const tableColumn = new TableColumn();
          tableColumn.field = `${this.actualValueMMC}${value + index}`;
          tableColumn.header = `ActualValue${value + index}`;
          const objColumnInfo = new ColumnInfo();
          objColumnInfo.type = ColumnType.TextBox;
          tableColumn.columnInfo = objColumnInfo;
          tableColumn.isVisible = true;
          tableColumn.isExport = true;
          this.childDisplayColumnsMMC.push(tableColumn);
          this.tableWidthForMMCLMC = this.tableWidthForMMCLMC = this.constantTablewidth + (this.approximateWidthForEachTextBox * calculatedSampleSize);
        });
    }, () => { }, () => {
      if (this.sapPartInspectionPlanId) {
        this.supplierMPositionToleranceTabDetails = [];
        this.sapPartInspectionPlan.partMPositionTolerances = [];
        this.isMPositionToleranceExpanded = true;
        this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
          if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.sapPartInspectionPlanService.isReturnedDataHasValue(data)) {
            this.sapPartInspectionPlan.partMPositionTolerances = data.value[0].partMPositionTolerances;
            this.populateMMCGeometryMainRow();
            this.populateMMCMainRowAsChildRow();
            this.populateMMCGeometryDefaultChildRows();
            this.populateMMCMainRowIdAndChildRowIndexForChildRows();
            this.sapPartInspectionPlan.partMPositionTolerances = [];
          }
        }
          , () => {
          }, () => {
            if (this.recId !== null && this.recId !== 0) {
              const supplierPageSortFilterInfo = new PageSortFilterInfo();
              supplierPageSortFilterInfo.expandInfo = this.apiService.setSupplierMPositionTolerancePageSortFilterInfo(supplierPageSortFilterInfo);
              this.apiService.getDataById(this.recId, supplierPageSortFilterInfo).subscribe(data => {
                const supplierMPositions = data.value[0].supplierMPositions;
                this.mergeValuesFromDatabaseForMMC(supplierMPositions);
              }
                , () => {
                }, () => {

                }
              );
            }
          }
        );
      }
    });
  }


  getRowsExceptDimensionDefaultAndAssociatedBonustoleranceForMMC(filteredSupplierMPositions: SupplierMPosition[], childElement: any) {
    const supplierChildRowsExceptDimnsionDefaultRow = filteredSupplierMPositions.find(
      k => k.parameterManagementId === childElement.parameterManagementId && k.partDimensionId === childElement.partDimensionId);
    if (supplierChildRowsExceptDimnsionDefaultRow) {
      childElement.id = supplierChildRowsExceptDimnsionDefaultRow.id;
      childElement.partMPositionToleranceId = supplierChildRowsExceptDimnsionDefaultRow.partMPositionToleranceId;
      childElement.parameterManagementId = supplierChildRowsExceptDimnsionDefaultRow.parameterManagementId;
      childElement.uomId = supplierChildRowsExceptDimnsionDefaultRow.uomId;
      childElement.instrumentTypeId = supplierChildRowsExceptDimnsionDefaultRow.instrumentTypeId;
      childElement.instrumentId = childElement.selectedDynamicId = supplierChildRowsExceptDimnsionDefaultRow.instrumentId;
      for (let sampleCount = 1; sampleCount <= calculatedSampleSize; sampleCount++) {
        if (supplierChildRowsExceptDimnsionDefaultRow.supplierMPositionActuals) {
          const correctActualRecord = supplierChildRowsExceptDimnsionDefaultRow.supplierMPositionActuals.find(k => k.actualText.trim() === `${this.actualValueMMC}${sampleCount}`);
          if (correctActualRecord) {
            childElement[`${this.actualValueMMC}${sampleCount}`] = correctActualRecord.actualValue;
          }
        }
      }
    }
  }

  getRowsExceptDimensionDefaultAndAssociatedBonustoleranceForLPosition(filteredSupplierLPositions: SupplierLPosition[], childElement: any) {
    const supplierChildRowsExceptDimnsionDefaultRow = filteredSupplierLPositions.find(
      k => k.parameterManagementId === childElement.parameterManagementId && k.partDimensionId === childElement.partDimensionId);
    if (supplierChildRowsExceptDimnsionDefaultRow) {
      childElement.id = supplierChildRowsExceptDimnsionDefaultRow.id;
      childElement.partMPositionToleranceId = supplierChildRowsExceptDimnsionDefaultRow.partLPositionToleranceId;
      childElement.parameterManagementId = supplierChildRowsExceptDimnsionDefaultRow.parameterManagementId;
      childElement.uomId = supplierChildRowsExceptDimnsionDefaultRow.uomId;
      childElement.instrumentTypeId = supplierChildRowsExceptDimnsionDefaultRow.instrumentTypeId;
      childElement.instrumentId = childElement.selectedDynamicId = supplierChildRowsExceptDimnsionDefaultRow.instrumentId;
      for (let sampleCount = 1; sampleCount <= calculatedSampleSize; sampleCount++) {
        if (supplierChildRowsExceptDimnsionDefaultRow.supplierLPositionActuals) {
          const correctActualRecord = supplierChildRowsExceptDimnsionDefaultRow.supplierLPositionActuals.find(k => k.actualText.trim() === `${this.actualValueLMC}${sampleCount}`);
          if (correctActualRecord) {
            childElement[`${this.actualValueLMC}${sampleCount}`] = correctActualRecord.actualValue;
          }
        }
      }
    }
  }

  getAssociatedBonusToleranceForMMC(filteredSupplierMPositions: SupplierMPosition[], childElement: any) {
    const supplierDynamicBonusToleranceChildRow = filteredSupplierMPositions.find(k => k.associatedDimensionNumberId === childElement.associatedDimensionNumberId);
    if (supplierDynamicBonusToleranceChildRow) {
      childElement.id = supplierDynamicBonusToleranceChildRow.id;
      childElement.partMPositionToleranceId = supplierDynamicBonusToleranceChildRow.partMPositionToleranceId;
      childElement.parameterManagementId = supplierDynamicBonusToleranceChildRow.parameterManagementId;
      childElement.uomId = supplierDynamicBonusToleranceChildRow.uomId;
      childElement.instrumentTypeId = supplierDynamicBonusToleranceChildRow.instrumentTypeId;
      childElement.instrumentId = childElement.selectedDynamicId = supplierDynamicBonusToleranceChildRow.instrumentId;
      for (let sampleCount = 1; sampleCount <= calculatedSampleSize; sampleCount++) {
        if (supplierDynamicBonusToleranceChildRow.supplierMPositionActuals && supplierDynamicBonusToleranceChildRow.supplierMPositionActuals[sampleCount - 1]) {
          const correctActualRecord = supplierDynamicBonusToleranceChildRow.supplierMPositionActuals.find(k => k.actualText.trim() === `${this.actualValueMMC}${sampleCount}`);
          if (correctActualRecord) {
            childElement[`${this.actualValueMMC}${sampleCount}`] = correctActualRecord.actualValue;
          }
        }
      }
    }
  }

  getAssociatedBonusToleranceForLPosition(filteredSupplierLPositions: SupplierLPosition[], childElement: any) {
    const supplierDynamicBonusToleranceChildRow = filteredSupplierLPositions.find(k => k.associatedDimensionNumberId === childElement.associatedDimensionNumberId);
    if (supplierDynamicBonusToleranceChildRow) {
      childElement.id = supplierDynamicBonusToleranceChildRow.id;
      childElement.partMPositionToleranceId = supplierDynamicBonusToleranceChildRow.partLPositionToleranceId;
      childElement.parameterManagementId = supplierDynamicBonusToleranceChildRow.parameterManagementId;
      childElement.uomId = supplierDynamicBonusToleranceChildRow.uomId;
      childElement.instrumentTypeId = supplierDynamicBonusToleranceChildRow.instrumentTypeId;
      childElement.instrumentId = childElement.selectedDynamicId = supplierDynamicBonusToleranceChildRow.instrumentId;
      for (let sampleCount = 1; sampleCount <= calculatedSampleSize; sampleCount++) {
        if (supplierDynamicBonusToleranceChildRow.supplierLPositionActuals && supplierDynamicBonusToleranceChildRow.supplierLPositionActuals[sampleCount - 1]) {
          const correctActualRecord = supplierDynamicBonusToleranceChildRow.supplierLPositionActuals.find(k => k.actualText.trim() === `${this.actualValueLMC}${sampleCount}`);
          if (correctActualRecord) {
            childElement[`${this.actualValueLMC}${sampleCount}`] = correctActualRecord.actualValue;
          }
        }
      }
    }
  }

  getDimensionDefaultRowsForMMC(filteredSupplierMPositions: SupplierMPosition[], childElement: any) {
    const supplierDimnsionDefaultChildRow = filteredSupplierMPositions.find(k => k.dimensionDefaultId === childElement.dimensionDefaultId);
    if (supplierDimnsionDefaultChildRow) {
      childElement.id = supplierDimnsionDefaultChildRow.id;
      childElement.partMPositionToleranceId = supplierDimnsionDefaultChildRow.partMPositionToleranceId;
      childElement.parameterManagementId = supplierDimnsionDefaultChildRow.parameterManagementId;
      childElement.uomId = supplierDimnsionDefaultChildRow.uomId;
      childElement.instrumentTypeId = supplierDimnsionDefaultChildRow.instrumentTypeId;
      childElement.instrumentId = childElement.selectedDynamicId = supplierDimnsionDefaultChildRow.instrumentId;
      for (let sampleCount = 1; sampleCount <= calculatedSampleSize; sampleCount++) {
        if (supplierDimnsionDefaultChildRow.supplierMPositionActuals && supplierDimnsionDefaultChildRow.supplierMPositionActuals[sampleCount - 1]) {
          const correctActualRecord = supplierDimnsionDefaultChildRow.supplierMPositionActuals.find(k => k.actualText.trim() === `${this.actualValueMMC}${sampleCount}`);
          if (correctActualRecord) {
            childElement[`${this.actualValueMMC}${sampleCount}`] = correctActualRecord.actualValue;
          }
        }
      }
    }
  }

  getDimensionDefaultRowsForLPosition(filteredSupplierLPositions: SupplierLPosition[], childElement: any) {
    const supplierDimnsionDefaultChildRow = filteredSupplierLPositions.find(k => k.dimensionDefaultId === childElement.dimensionDefaultId);
    if (supplierDimnsionDefaultChildRow) {
      childElement.id = supplierDimnsionDefaultChildRow.id;
      childElement.partLPositionToleranceId = supplierDimnsionDefaultChildRow.partLPositionToleranceId;
      childElement.parameterManagementId = supplierDimnsionDefaultChildRow.parameterManagementId;
      childElement.uomId = supplierDimnsionDefaultChildRow.uomId;
      childElement.instrumentTypeId = supplierDimnsionDefaultChildRow.instrumentTypeId;
      childElement.instrumentId = childElement.selectedDynamicId = supplierDimnsionDefaultChildRow.instrumentId;
      for (let sampleCount = 1; sampleCount <= calculatedSampleSize; sampleCount++) {
        if (supplierDimnsionDefaultChildRow.supplierLPositionActuals && supplierDimnsionDefaultChildRow.supplierLPositionActuals[sampleCount - 1]) {
          const correctActualRecord = supplierDimnsionDefaultChildRow.supplierLPositionActuals.find(k => k.actualText.trim() === `${this.actualValueLMC}${sampleCount}`);
          if (correctActualRecord) {
            childElement[`${this.actualValueLMC}${sampleCount}`] = correctActualRecord.actualValue;
          }
        }
      }
    }
  }

  populateLMCGeometryDefaultChildRows() {
    this.supplierLPositionToleranceTabDetails.forEach(element => {
      if (element.dimensionNumber.trim().toLowerCase() === this.geometryTolerance) {
        this.populateDimensionDefaultChildRowsForLPosition(element.parameterManagementId, element.partLPositionToleranceId);
      }
    });
  }


  populateLMCGeometryMainRow() {
    if (this.sapPartInspectionPlan.partLPositionTolerances) {
      this.sapPartInspectionPlan.partLPositionTolerances.map(record => {
        this.lPositionTolerance = this.returnSupplierLPositionObj(record);
        if (this.lPositionTolerance.dimensionNumber.trim().toLowerCase() === this.geometryTolerance) {
          this.lPositionTolerance.partLPositionToleranceId = record.id;
          this.lPositionTolerance.isDisabled = true;
          this.supplierLPositionToleranceTabDetails.push(this.lPositionTolerance);
          this.lPositionTolerance = new SupplierLPosition();
        }
      });
    }
  }

  populateMMCDimensionDefaultChildRows(parameterManagementId: number, partMPositionToleranceId: number) {
    if (this.dimensionDefaults) {
      this.dimensionDefaults.map(dimenstionDefaultRecord => {
        this.mPositionTolerance = this.returnSupplierMPositionDefault(dimenstionDefaultRecord);
        this.mPositionTolerance.partMPositionToleranceId = partMPositionToleranceId;
        this.mPositionTolerance.parameterManagementId = parameterManagementId;
        if (this.mPositionTolerance.dimensionDefaultId !== DimensionDefaultConstant.ActualMeasuredGeometry) {
          this.mPositionTolerance.isTextBoxDisabled = true;
          this.mPositionTolerance.isDropDownDisabled = true;
        } else {
          this.mPositionTolerance.isTextBoxDisabled = true;
          this.mPositionTolerance.isDropDownDisabled = true;
        }
        this.initializeMMCChildDataSource(parameterManagementId);
        this.supplierMPositionToleranceTabDetails
          .find(k => k.parameterManagementId === parameterManagementId).childDataSource.push(this.mPositionTolerance);
        this.mPositionTolerance = new SupplierMPosition();
      });
    }
  }

  populateDimensionDefaultChildRowsForLPosition(parameterManagementId: number, partLPositionToleranceId: number) {
    if (this.dimensionDefaults) {
      this.dimensionDefaults.map(dimenstionDefaultRecord => {
        this.lPositionTolerance = this.returnSupplierLPositionDefault(dimenstionDefaultRecord);
        this.lPositionTolerance.partLPositionToleranceId = partLPositionToleranceId;
        this.lPositionTolerance.parameterManagementId = parameterManagementId;
        if (this.lPositionTolerance.dimensionDefaultId !== DimensionDefaultConstant.ActualMeasuredGeometry) {
          this.lPositionTolerance.isTextBoxDisabled = true;
          this.lPositionTolerance.isDropDownDisabled = true;
        } else {
          this.lPositionTolerance.isTextBoxDisabled = true;
          this.lPositionTolerance.isDropDownDisabled = true;
        }
        this.initializeLMCChildDataSource(parameterManagementId);
        this.supplierLPositionToleranceTabDetails
          .find(k => k.parameterManagementId === parameterManagementId).childDataSource.push(this.lPositionTolerance);
        this.lPositionTolerance = new SupplierLPosition();
      });
    }
  }

  populateLMCMainRowAsChildRow() {
    this.sapPartInspectionPlan.partLPositionTolerances.map(record => {
      this.lPositionTolerance = new SupplierLPosition();
      this.lPositionTolerance = this.returnSupplierLPositionObj(record);
      if (this.lPositionTolerance.dimensionNumber.trim().toLowerCase() !== this.geometryTolerance) {
        this.lPositionTolerance.partLPositionToleranceId = record.id;
        this.initializeLMCChildDataSource(this.lPositionTolerance.parameterManagementId);
        if (this.getLMCBasedOnParameterMgmtId(this.lPositionTolerance.parameterManagementId)) {
          this.lPositionTolerance.isTextBoxDisabled = true;
          this.lPositionTolerance.isDropDownDisabled = true;
          this.getLMCBasedOnParameterMgmtId(this.lPositionTolerance.parameterManagementId).childDataSource.push(this.lPositionTolerance);
        }
        if (!this.lPositionTolerance.dimensionDefaultId) {
          const bonusLPositionTolerance = new SupplierLPosition();
          bonusLPositionTolerance.dimensionNumber = 'Bonus Tolerance of ' + this.lPositionTolerance.dimensionNumber;
          bonusLPositionTolerance.associatedDimensionNumberId = this.lPositionTolerance.partDimensionId;
          bonusLPositionTolerance.parameterManagementId = this.lPositionTolerance.parameterManagementId;
          bonusLPositionTolerance.partLPositionToleranceId = this.lPositionTolerance.partLPositionToleranceId;
          bonusLPositionTolerance.isTextBoxDisabled = true;
          bonusLPositionTolerance.isDropDownDisabled = true;
          if (this.getLMCBasedOnParameterMgmtId(this.lPositionTolerance.parameterManagementId)) {
            this.getLMCBasedOnParameterMgmtId(this.lPositionTolerance.parameterManagementId).childDataSource.push(bonusLPositionTolerance);
          }

        }
      }
    });
  }

  initializeLMCChildDataSource(parameterManagementId: number) {
    if (this.getLMCBasedOnParameterMgmtId(parameterManagementId)) {
      if (this.getLMCBasedOnParameterMgmtId(parameterManagementId).childDataSource === undefined) {
        this.getLMCBasedOnParameterMgmtId(parameterManagementId).childDataSource = [];
      }
    }
  }


  getLMCBasedOnParameterMgmtId(parameterManagementId: number) {
    return this.supplierLPositionToleranceTabDetails
      .find(k => k.parameterManagementId === parameterManagementId);
  }

  specWithLMCTextChangedEvent(event) {

    if (event) {

      this.toggleYellowAndWhiteColorForLMC(event);

      this.formInput.markAsDirty();

      this.supplierLPositionToleranceTabDetails.forEach(element => {
        const geometryToleranceSpec = element.spec;
        const totalToleranceRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.TotalTolerance);
        if (!totalToleranceRow.childDataSource) {
          totalToleranceRow.childDataSource = [];
        }

        this.calculateBonusToleranceRowActualValuesForLMC(element);

        this.calculateTotalToleranceRowActualValuesForLMC(element, totalToleranceRow, geometryToleranceSpec);

        this.calculateTotalActualValuesForLPostion(element, totalToleranceRow);


      });
    }
  }

  calculateTotalActualValues(element: SupplierMPosition, totalToleranceRow: any) {
    const actualMeasuredGeometryRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.ActualMeasuredGeometry);
    const resultRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
    if (actualMeasuredGeometryRow && resultRow) {
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
        if (!actualMeasuredGeometryRow[`${this.actualValueMMC}${bonusToleranceRowCount}`]) {
          actualMeasuredGeometryRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = 0;
        }
        if (actualMeasuredGeometryRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] <= totalToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`]) {
          resultRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = result[0].name;
        } else {
          resultRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = result[1].name;
        }
      }
    }
  }

  calculateTotalActualValuesForLPostion(element: SupplierLPosition, totalToleranceRow: any) {
    const actualMeasuredGeometryRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.ActualMeasuredGeometry);
    const resultRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
    if (actualMeasuredGeometryRow && resultRow) {
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
        if (!actualMeasuredGeometryRow[`${this.actualValueLMC}${bonusToleranceRowCount}`]) {
          actualMeasuredGeometryRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] = 0;
        }
        if (actualMeasuredGeometryRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] <= totalToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`]) {
          resultRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] = result[0].name;
          this.highlightActualMeasuredGeometryInColorForLPosition(actualMeasuredGeometryRow, bonusToleranceRowCount, 'white');

        } else {
          resultRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] = result[1].name;
          this.highlightActualMeasuredGeometryInColorForLPosition(actualMeasuredGeometryRow, bonusToleranceRowCount, 'red');
        }
      }
    }
  }

  calculateTotalToleranceRowActualValuesForLMC(element: SupplierLPosition, totalToleranceRow: any, geometryToleranceSpec: string) {
    const bonusToleranceRows = element.childDataSource.filter(k => k.dimensionNumber.trim().toLowerCase().includes('bonus tolerance of'));
    if (bonusToleranceRows) {
      // Clear all total tolerance values
      this.clearTotalToleranceValuesForLMC(totalToleranceRow);
      // Recalculate the BonusTolerance record value
      this.addBonusToleranceForTotalToleranceForLMC(bonusToleranceRows, totalToleranceRow);
      // Seperately add Spec value of Geometry tolerance
      this.addSpecForTotalToleranceForLMC(totalToleranceRow, geometryToleranceSpec);
    }
  }

  calculateBonusToleranceRowActualValuesForLMC(element: SupplierLPosition) {
    const childRowsExceptGeometryAndDimensionDefault = element.childDataSource
      .filter(k => !k.dimensionDefaultId && !k.associatedDimensionNumberId);
    if (childRowsExceptGeometryAndDimensionDefault) {
      // Filtered Dimension excluding Geometry Tolerance, Dimension Defaults  and Bonus Tolerance
      childRowsExceptGeometryAndDimensionDefault.forEach(childRowElement => {
        // check if 'BonusTolerance of ' rows are filtered here.
        const associatedBonusToleranceRow = element.childDataSource.filter(k => k.associatedDimensionNumberId === childRowElement.partDimensionId);
        for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
          if (!associatedBonusToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`]) {
            associatedBonusToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] = 0;
          }
          if (!childRowElement[`${this.actualValueLMC}${bonusToleranceRowCount}`]) {
            childRowElement[`${this.actualValueLMC}${bonusToleranceRowCount}`] = 0;
          }
          const individualBonusToleranceValue = this.findBonusToleranceValueForLMC(childRowElement, bonusToleranceRowCount);
          associatedBonusToleranceRow[Numbers.Default][`${this.actualValueLMC}${bonusToleranceRowCount}`] = individualBonusToleranceValue;
        }
      });
    }
  }

  findBonusToleranceValueForLMC(childRowElement: any, bonusToleranceRowCount: number) {
    let individualBonusToleranceValue = 0;
    const LMCSpecLimit = Number(childRowElement.specLimitAtLMC);
    const MMCSpecLimit = Number(childRowElement.specLimitAtMMC);
    const actualValueMeasured = Number(childRowElement[`${this.actualValueLMC}${bonusToleranceRowCount}`]);
    if (actualValueMeasured > MMCSpecLimit) {
      individualBonusToleranceValue = 0;
    } else if (LMCSpecLimit <= actualValueMeasured && MMCSpecLimit >= actualValueMeasured) {
      individualBonusToleranceValue = Math.abs(actualValueMeasured - MMCSpecLimit);
    } else if (actualValueMeasured < LMCSpecLimit) {
      individualBonusToleranceValue = Math.abs(MMCSpecLimit - LMCSpecLimit);
    }
    return individualBonusToleranceValue;
  }

  addSpecForTotalToleranceForLMC(totalToleranceRow: any, geometryToleranceSpec: string) {
    for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
      totalToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] += Number(geometryToleranceSpec);
    }
  }

  addBonusToleranceForTotalToleranceForLMC(bonusToleranceRows: any, totalToleranceRow: any) {
    bonusToleranceRows.forEach(bonusToleranceRowElement => {
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
        if (!totalToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`]) {
          totalToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] = 0;
        }
        if (!bonusToleranceRowElement[`${this.actualValueLMC}${bonusToleranceRowCount}`]) {
          bonusToleranceRowElement[`${this.actualValueLMC}${bonusToleranceRowCount}`] = 0;
        }
        totalToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] += Number(bonusToleranceRowElement[`${this.actualValueLMC}${bonusToleranceRowCount}`]);
      }
    });
  }

  clearTotalToleranceValuesForLMC(totalToleranceRow: any) {
    for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
      totalToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] = 0;
    }
  }

  generateSpecWithLMCChildRowColumns() {
    this.childDisplayColumnsLMC = (new SupplierLPosition()).displayColumns();
    let mainRowExclusionColumnsforLMC: string[];
    mainRowExclusionColumnsforLMC = ['ParameterName', 'Spec'];
    for (let i = this.childDisplayColumnsLMC.length - 1; i >= 0; i--) {
      if (mainRowExclusionColumnsforLMC.some(k => k.toLowerCase() === this.childDisplayColumnsLMC[i].header.toLowerCase())) {
        this.childDisplayColumnsLMC.splice(i, 1);
      }
    }
  }


  mergeDropDownValuesFromDatabaseForLMC(supplierLPositions: SupplierLPosition[], element: SupplierLPosition) {
    const geometryToleranceSupplierLPosition = supplierLPositions
      .find(k => k.parameterManagementId === element.parameterManagementId && k.partDimensionId === element.partDimensionId);
    if (geometryToleranceSupplierLPosition) {
      element.id = geometryToleranceSupplierLPosition.id;
      element.uomId = geometryToleranceSupplierLPosition.uomId;
      element.instrumentTypeId = geometryToleranceSupplierLPosition.instrumentTypeId;
      element.instrumentId = element.selectedDynamicId = geometryToleranceSupplierLPosition.instrumentId;
    }
  }


  mergeActualValuesFromDatabaseForLMC(supplierLPositions: SupplierLPosition[], element: SupplierLPosition, childElement: any) {
    const filteredSupplierLPositions = supplierLPositions.filter(k => k.parameterManagementId === element.parameterManagementId);
    if (filteredSupplierLPositions) {
      if (childElement.dimensionDefaultId) {
        this.getDimensionDefaultRowsForLPosition(filteredSupplierLPositions, childElement);
      } else if (childElement.associatedDimensionNumberId) {
        this.getAssociatedBonusToleranceForLPosition(filteredSupplierLPositions, childElement);
      } else {
        this.getRowsExceptDimensionDefaultAndAssociatedBonustoleranceForLPosition(filteredSupplierLPositions, childElement);
      }
    }
  }

  populateMMCMainRowIdAndChildRowIndexForChildRows() {
    if (this.supplierMPositionToleranceTabDetails) {
      this.supplierMPositionToleranceTabDetails.forEach(element => {
        if (element.childDataSource) {
          element.childDataSource.forEach((childElement, index) => {
            childElement.childRowIndex = index;
            childElement.mainRowId = element.parameterManagementId;
          });
        }
      });
    }
  }

  populateMainRowIdAndChildRowIndexForChildRowsForLPosition() {
    if (this.supplierLPositionToleranceTabDetails) {
      this.supplierLPositionToleranceTabDetails.forEach(element => {
        if (element.childDataSource) {
          element.childDataSource.forEach((childElement, index) => {
            childElement.childRowIndex = index;
            childElement.mainRowId = element.parameterManagementId;
          });
        }
      });
    }
  }

  populateMMCGeometryDefaultChildRows() {
    if (this.supplierMPositionToleranceTabDetails) {
      this.supplierMPositionToleranceTabDetails.forEach(element => {
        if (element.dimensionNumber.trim().toLowerCase() === this.geometryTolerance) {
          this.populateMMCDimensionDefaultChildRows(element.parameterManagementId, element.partMPositionToleranceId);
        }
      });
    }
  }

  populateMMCGeometryMainRow() {
    if (this.sapPartInspectionPlan.partMPositionTolerances) {
      this.sapPartInspectionPlan.partMPositionTolerances.map(record => {
        this.mPositionTolerance = this.returnSupplierMPositionObj(record);
        if (this.mPositionTolerance.dimensionNumber.trim().toLowerCase() === this.geometryTolerance) {
          this.mPositionTolerance.partMPositionToleranceId = record.id;
          this.mPositionTolerance.isDisabled = true;
          this.supplierMPositionToleranceTabDetails.push(this.mPositionTolerance);
          this.mPositionTolerance = new SupplierMPosition();
        }
      });
    }
  }

  populateMMCMainRowAsChildRow() {
    if (this.sapPartInspectionPlan.partMPositionTolerances) {
      this.sapPartInspectionPlan.partMPositionTolerances.map(record => {
        this.mPositionTolerance = new SupplierMPosition();
        this.mPositionTolerance = this.returnSupplierMPositionObj(record);
        if (this.mPositionTolerance.dimensionNumber.trim().toLowerCase() !== this.geometryTolerance) {
          this.mPositionTolerance.partMPositionToleranceId = record.id;
          this.initializeMMCChildDataSource(this.mPositionTolerance.parameterManagementId);
          if (this.getMMCBasedOnParameterMgmtId(this.mPositionTolerance.parameterManagementId)) {
            this.mPositionTolerance.isTextBoxDisabled = true;
            this.mPositionTolerance.isDropDownDisabled = true;
            this.getMMCBasedOnParameterMgmtId(this.mPositionTolerance.parameterManagementId).childDataSource.push(this.mPositionTolerance);
          }
          if (!this.mPositionTolerance.dimensionDefaultId) {
            const bonusMPositionTolerance = new SupplierMPosition();
            bonusMPositionTolerance.dimensionNumber = 'Bonus Tolerance of ' + this.mPositionTolerance.dimensionNumber;
            bonusMPositionTolerance.associatedDimensionNumberId = this.mPositionTolerance.partDimensionId;
            bonusMPositionTolerance.partMPositionToleranceId = this.mPositionTolerance.partMPositionToleranceId;
            bonusMPositionTolerance.parameterManagementId = this.mPositionTolerance.parameterManagementId;
            bonusMPositionTolerance.isTextBoxDisabled = true;
            bonusMPositionTolerance.isDropDownDisabled = true;
            if (this.getMMCBasedOnParameterMgmtId(this.mPositionTolerance.parameterManagementId)) {
              this.getMMCBasedOnParameterMgmtId(this.mPositionTolerance.parameterManagementId).childDataSource.push(bonusMPositionTolerance);
            }

          }
        }
      });
    }
  }

  initializeMMCChildDataSource(parameterManagementId: number) {
    if (this.getMMCBasedOnParameterMgmtId(parameterManagementId)) {
      if (this.getMMCBasedOnParameterMgmtId(parameterManagementId).childDataSource === undefined) {
        this.getMMCBasedOnParameterMgmtId(parameterManagementId).childDataSource = [];
      }
    }
  }


  getMMCBasedOnParameterMgmtId(parameterManagementId: number) {
    return this.supplierMPositionToleranceTabDetails
      .find(k => k.parameterManagementId === parameterManagementId);
  }

  specWithMMCTextChangedEvent(event) {
    if (event) {

      this.toggleYellowAndWhiteColorForMMC(event);

      this.formInput.markAsDirty();

      this.supplierMPositionToleranceTabDetails.forEach(element => {

        const geometryToleranceSpec = element.spec;

        const totalToleranceRow = this.initializeMMCTotalToleranceChildSource(element);

        this.calculateBonusToleranceRowActualValues(element);

        this.calculateTotalToleranceRowActualValues(element, totalToleranceRow, geometryToleranceSpec);

        this.calculateTotalActualValuesOnTextChanged(element, totalToleranceRow);

      });
    }
  }

  private initializeMMCTotalToleranceChildSource(element: SupplierMPosition) {
    const totalToleranceRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.TotalTolerance);
    if (!totalToleranceRow.childDataSource) {
      totalToleranceRow.childDataSource = [];
    }
    return totalToleranceRow;
  }

  toggleYellowAndWhiteColorForMMC(event: any) {
    const control = (<HTMLInputElement>document.getElementById(event.id));
    const actualValue = control != null ? control.value : '';
    if (!isNumeric(actualValue)) {
      (<HTMLInputElement>document.getElementById(event.id)).value = '';
    }
    const actualValueHtml = document.getElementById(event.id);
    if (actualValue.trim() === '') {
      actualValueHtml.style.backgroundColor = 'yellow';
    } else {
      actualValueHtml.style.backgroundColor = 'white';
    }
  }

  toggleYellowAndWhiteColorForLMC(event: any) {
    const control = (<HTMLInputElement>document.getElementById(event.id));
    const actualValue = control != null ? control.value : '';
    if (!isNumeric(actualValue)) {
      (<HTMLInputElement>document.getElementById(event.id)).value = '';
    }
    const actualValueHtml = document.getElementById(event.id);
    if (actualValue.trim() === '') {
      actualValueHtml.style.backgroundColor = 'yellow';
    } else {
      actualValueHtml.style.backgroundColor = 'white';
    }
  }

  calculateTotalActualValuesOnTextChanged(element: SupplierMPosition, totalToleranceRow: any) {
    const actualMeasuredGeometryRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.ActualMeasuredGeometry);
    const resultRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
    if (actualMeasuredGeometryRow && resultRow) {
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
        if (!actualMeasuredGeometryRow[`${this.actualValueMMC}${bonusToleranceRowCount}`]) {
          actualMeasuredGeometryRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = 0;
        }
        if (actualMeasuredGeometryRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] <= totalToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`]) {
          resultRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = result[0].name;
          this.highlightActualMeasuredGeometryInColor(actualMeasuredGeometryRow, bonusToleranceRowCount, 'white');
        } else {
          resultRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = result[1].name;
          this.highlightActualMeasuredGeometryInColor(actualMeasuredGeometryRow, bonusToleranceRowCount, 'red');
        }
      }
    }
  }


  highlightActualMeasuredGeometryInColor(actualMeasuredGeometryRow: any, bonusToleranceRowCount: number, color: string) {
    const controlId = `textbox${actualMeasuredGeometryRow.mainRowId}${actualMeasuredGeometryRow.childRowIndex}${this.actualValueMMC}${bonusToleranceRowCount}`;
    const actualValueHtml = document.getElementById(controlId);
    const control = (<HTMLInputElement>document.getElementById(controlId));
    const actualValue = control != null ? control.value : '';
    if (color === 'white' && actualValueHtml) {
      if (actualValue.trim() !== '') {
        actualValueHtml.style.backgroundColor = color;
      }
    } else if (color === 'red' && actualValueHtml) {
      actualValueHtml.style.backgroundColor = color;
    }
  }

  highlightActualMeasuredGeometryInColorForLPosition(actualMeasuredGeometryRow: any, bonusToleranceRowCount: number, color: string) {
    const controlId = `textbox${actualMeasuredGeometryRow.mainRowId}${actualMeasuredGeometryRow.childRowIndex}${this.actualValueLMC}${bonusToleranceRowCount}`;
    const actualValueHtml = document.getElementById(controlId);
    const control = (<HTMLInputElement>document.getElementById(controlId));
    const actualValue = control != null ? control.value : '';
    if (color === 'white' && actualValueHtml) {
      if (actualValue.trim() !== '') {
        actualValueHtml.style.backgroundColor = color;
      }
    } else if (color === 'red' && actualValueHtml) {
      actualValueHtml.style.backgroundColor = color;
    }
  }

  calculateTotalToleranceRowActualValues(element: SupplierMPosition, totalToleranceRow: any, geometryToleranceSpec: string) {
    const bonusToleranceRows = element.childDataSource.filter(k => k.dimensionNumber.trim().toLowerCase().includes('bonus tolerance of'));
    if (bonusToleranceRows) {
      // Clear all total tolerance values
      this.clearTotalToleranceValues(totalToleranceRow);
      // Recalculate the BonusTolerance record value
      this.addBonusToleranceForTotalTolerance(bonusToleranceRows, totalToleranceRow);
      // Separately add Spec value of Geometry tolerance
      this.addSpecForTotalTolerance(totalToleranceRow, geometryToleranceSpec);
    }
  }

  calculateBonusToleranceRowActualValues(element: SupplierMPosition) {
    const childRowsExceptGeometryAndDimensionDefault = element.childDataSource
      .filter(k => !k.dimensionDefaultId && !k.associatedDimensionNumberId);
    if (childRowsExceptGeometryAndDimensionDefault) {
      childRowsExceptGeometryAndDimensionDefault.forEach(childRowElement => {
        const associatedBonusToleranceRow = element.childDataSource.filter(k => k.associatedDimensionNumberId === childRowElement.partDimensionId);
        for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
          if (!associatedBonusToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`]) {
            associatedBonusToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = 0;
          }
          if (!childRowElement[`${this.actualValueMMC}${bonusToleranceRowCount}`]) {
            childRowElement[`${this.actualValueMMC}${bonusToleranceRowCount}`] = 0;
          }
          const individualBonusToleranceValue = this.findBonusToleranceValue(childRowElement, bonusToleranceRowCount);
          associatedBonusToleranceRow[Numbers.Default][`${this.actualValueMMC}${bonusToleranceRowCount}`] = individualBonusToleranceValue;
        }
      });
    }
  }

  findBonusToleranceValue(childRowElement: any, bonusToleranceRowCount: number) {
    let individualBonusToleranceValue = 0;
    const LMCSpecLimit = Number(childRowElement.specLimitAtLMC);
    const MMCSpecLimit = Number(childRowElement.specLimitAtMMC);
    const actualValueMeasured = Number(childRowElement[`${this.actualValueMMC}${bonusToleranceRowCount}`]);
    if (actualValueMeasured < MMCSpecLimit) {
      individualBonusToleranceValue = 0;
    } else if (MMCSpecLimit <= actualValueMeasured && actualValueMeasured <= LMCSpecLimit) {
      individualBonusToleranceValue = Math.abs(actualValueMeasured - MMCSpecLimit);
    } else if (actualValueMeasured > LMCSpecLimit) {
      individualBonusToleranceValue = Math.abs(MMCSpecLimit - LMCSpecLimit);
    }
    return individualBonusToleranceValue;
  }

  addSpecForTotalTolerance(totalToleranceRow: any, geometryToleranceSpec: string) {
    for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
      totalToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] += Number(geometryToleranceSpec);
    }
  }

  addBonusToleranceForTotalTolerance(bonusToleranceRows: any, totalToleranceRow: any) {
    bonusToleranceRows.forEach(bonusToleranceRowElement => {
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
        if (!totalToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`]) {
          totalToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = 0;
        }
        if (!bonusToleranceRowElement[`${this.actualValueMMC}${bonusToleranceRowCount}`]) {
          bonusToleranceRowElement[`${this.actualValueMMC}${bonusToleranceRowCount}`] = 0;
        }
        totalToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] += Number(bonusToleranceRowElement[`${this.actualValueMMC}${bonusToleranceRowCount}`]);
      }
    });
  }

  clearTotalToleranceValues(totalToleranceRow: any) {
    for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= calculatedSampleSize; bonusToleranceRowCount++) {
      totalToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = 0;
    }
  }


  generateSpecWithMMCChildRowColumns() {
    this.childDisplayColumnsMMC = (new SupplierMPosition()).displayColumns();
    let mainRowExclusionColumnsforMMC: string[];
    mainRowExclusionColumnsforMMC = ['ParameterName', 'Spec'];
    for (let i = this.childDisplayColumnsMMC.length - 1; i >= 0; i--) {
      if (mainRowExclusionColumnsforMMC.some(k => k.toLowerCase() === this.childDisplayColumnsMMC[i].header.toLowerCase())) {
        this.childDisplayColumnsMMC.splice(i, 1);
      }
    }
  }

  getSupplierDateCode() {
    let supplierDateCode = new SupplierDateCode();
    if (this.recId == null || (this.recId != null && this.isDateCodeExpanded)) {
      if (this.recId != null) {
        supplierDateCode.id = (this.supplierMeasurement.supplierDateCode != null && this.supplierMeasurement.supplierDateCode.id != null)
          ? this.supplierMeasurement.supplierDateCode.id : (this.supplierMeasurement.supplierDateCodeId != null && this.supplierMeasurement.supplierDateCodeId !== undefined)
            ? this.supplierMeasurement.supplierDateCodeId : 0;

      }
      supplierDateCode.surfaceFinishingDate = this.formInput.controls[this.properties.surfaceFinishingDate].value != null ?
        new Date(this.formInput.controls[this.properties.surfaceFinishingDate].value) : null;
      supplierDateCode.manufactureDate = this.formInput.controls[this.properties.manufactureDate].value != null ?
        new Date(this.formInput.controls[this.properties.manufactureDate].value) : null;
      supplierDateCode.shelfLifeMonths = this.formInput.controls[this.properties.shelfLifeMonths].value != null ?
        this.formInput.controls[this.properties.shelfLifeMonths].value : 0;
      supplierDateCode.manufactureDCWeeks = this.formInput.controls[this.properties.manufactureDCWeeks].value != null ?
        this.formInput.controls[this.properties.manufactureDCWeeks].value : 0;
      supplierDateCode.manufactureDCYears = this.formInput.controls[this.properties.manufactureDCYears].value != null ?
        this.formInput.controls[this.properties.manufactureDCYears].value : 0;
      supplierDateCode.dateCodeDetails = this.formInput.controls[this.properties.dateCodeDetails].value;
      supplierDateCode.expireDate = this.formInput.controls[this.properties.expireDate].value != null ?
        new Date(this.formInput.controls[this.properties.expireDate].value) : null;
      const acceptRejectValue = this.acceptRejectList.find(k => k.name === this.formInput.controls[this.properties.acceptReject].value);
      supplierDateCode.acceptRejectId = this.formInput.controls[this.properties.acceptReject].value != null ?
        acceptRejectValue !== undefined ? acceptRejectValue.id : 0 : null;
      supplierDateCode.remainingDays = this.formInput.controls[this.properties.remainingDays].value != null ?
        this.formInput.controls[this.properties.remainingDays].value : null;
    } else {
      supplierDateCode = null;
    }
    return supplierDateCode;
  }


  getExpandedSupplierDateCode() {
    if (this.recId !== null && this.recId !== 0) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      pageSortFilterInfo.expandInfo = this.apiService.setSupplierDateCodePageSortFilterInfo(pageSortFilterInfo);
      this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
        this.supplierMeasurement.supplierDateCode = data.value[0].supplierDateCode;
        this.entity = this.supplierMeasurement;
        if (this.supplierMeasurement.supplierDateCode !== null && this.supplierMeasurement.supplierDateCode !== undefined) {

          this.formInput.patchValue({
            manufactureDate: this.supplierMeasurement.supplierDateCode.manufactureDate != null ?
              new Date(this.supplierMeasurement.supplierDateCode.manufactureDate) : Constants.Empty,
            shelfLifeMonths: this.supplierMeasurement.supplierDateCode.shelfLifeMonths,
            manufactureDCWeeks: this.padLeft(this.supplierMeasurement.supplierDateCode.manufactureDCWeeks.toString(), '0', 2),
            dateCodeLimit: this.supplierMeasurement.supplierDateCode.dateCodeLimit,
            manufactureDCYears: this.padLeft(this.supplierMeasurement.supplierDateCode.manufactureDCYears.toString(), '0', 4),
            surfaceFinishingDate: this.supplierMeasurement.supplierDateCode.surfaceFinishingDate != null ?
              new Date(this.supplierMeasurement.supplierDateCode.surfaceFinishingDate) : null,
            dateCodeDetails: this.supplierMeasurement.supplierDateCode.dateCodeDetails,
            expireDate: this.supplierMeasurement.supplierDateCode.expireDate != null ?
              new Date(this.supplierMeasurement.supplierDateCode.expireDate) : null,
            remainingDays: this.getRemainingdays(this.sapPartInspectionPlan.partDateCode.dateCodeLimit),
            acceptReject: this.getAcceptReject()
          });
        }
      });
    } else {
      this.getDefaultSAPDateCode();
    }
    this.disabledManufactureDate();

    this.isDateCodeExpanded = true;

  }


  getDefaultSAPDateCode() {
    const pageSupplierDateCodeSortFilterInfo = new PageSortFilterInfo();
    pageSupplierDateCodeSortFilterInfo.expandInfo = this.apiService.setPartDateCodePageSortFilterInfo(pageSupplierDateCodeSortFilterInfo);
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSupplierDateCodeSortFilterInfo).subscribe(data => {
      this.sapPartInspectionPlan.partDateCode = data.value[0].partDateCode;
      this.entity = this.sapPartInspectionPlan;
      if (this.sapPartInspectionPlan.partDateCode !== null && this.sapPartInspectionPlan.partDateCode !== undefined) {
        this.formInput.patchValue({
          manufactureDate: this.sapPartInspectionPlan.partDateCode.manufactureDate != null ?
            new Date(this.sapPartInspectionPlan.partDateCode.manufactureDate) : Constants.Empty,
          shelfLifeMonths: this.sapPartInspectionPlan.partDateCode.shelfLifeMonths,
          manufactureDCWeeks: this.padLeft(this.sapPartInspectionPlan.partDateCode.manufactureDCWeeks.toString(), '0', 2),
          dateCodeLimit: this.sapPartInspectionPlan.partDateCode.dateCodeLimit,
          manufactureDCYears: this.padLeft(this.sapPartInspectionPlan.partDateCode.manufactureDCYears.toString(), '0', 4),
          surfaceFinishingDate: this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate != null ?
            new Date(this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate) : null,
          dateCodeDetails: this.sapPartInspectionPlan.partDateCode.dateCodeDetails,
          expireDate: this.sapPartInspectionPlan.partDateCode.expireDate != null ?
            new Date(this.sapPartInspectionPlan.partDateCode.expireDate) : null,
          remainingDays: this.getRemainingdays(this.sapPartInspectionPlan.partDateCode.dateCodeLimit),
          acceptReject: this.getAcceptReject()
        });
      }
    });
  }

  getAcceptReject(): any {
    return this.isRemainingDaysWithinLimit === true ? this.acceptRejectList[0].name : this.acceptRejectList[1].name;
  }

  getRemainingdays(dateCodeLimit: number): any {
    let expireDate = this.formInput.controls[this.properties.expireDate].value;
    if (expireDate == null || expireDate === undefined || expireDate === Constants.Empty) {
      expireDate = (this.sapPartInspectionPlan.partDateCode != null && this.sapPartInspectionPlan.partDateCode.expireDate != null)
        ? this.sapPartInspectionPlan.partDateCode.expireDate : (this.supplierMeasurement.supplierDateCode != null && this.supplierMeasurement.supplierDateCode.expireDate != null)
          ? this.supplierMeasurement.supplierDateCode.expireDate : Constants.Empty;
    }
    this.isRemainingDaysWithinLimit = true;
    const remainingDaysField = document.getElementById('remainingDays');
    const remainingDays = Math.floor((new Date(expireDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (remainingDays < (dateCodeLimit * monthsToDaysConstant)) {
      this.isRemainingDaysWithinLimit = false;
      if (remainingDaysField) {
        remainingDaysField.style.borderColor = 'red';
      }
    } else {
      this.isRemainingDaysWithinLimit = true;
      if (remainingDaysField) {
        remainingDaysField.style.borderColor = 'black';
      }
    }
    this.formInput.patchValue({
      remainingDays: remainingDays,
      acceptReject: this.getAcceptReject(),
    });
    return remainingDays;
  }



  clearDateCodeData(controlName) {
    switch (controlName) {
      case 'manufactureDate':
        this.formInput.patchValue({
          manufactureDate: Constants.Empty
        });
        break;
      case 'manufactureDCWeeks':
        this.formInput.patchValue({
          manufactureDCWeeks: this.padLeft('0', '0', 2),
        });
        break;
      case 'manufactureDCYears':
        this.formInput.patchValue({
          manufactureDCYears: this.padLeft('0', '0', 4),
        });
        break;
      default:
        break;
    }
    this.isCommodityPCBOrPWB = this.isCommodityPCBPWB(this.sapPartInspectionPlan.commodity);
    if (!this.isCommodityPCBOrPWB) {
      this.formInput.patchValue({
        expireDate: Constants.Empty,
        surfaceFinishingDate: Constants.Empty,
        remainingDays: Numbers.Default
      });
    }
    const remainingDaysField = document.getElementById('remainingDays');
    if (remainingDaysField) {
      remainingDaysField.style.borderColor = 'black';
    }
  }



  onManufactureDateSelect(event) {
    if (event != null) {
      this.setExpirationDate();
      this.getRemainingdays(this.sapPartInspectionPlan.partDateCode.dateCodeLimit);
      this.clearManufactureDC();
    } else {
      this.clearDateCodeData('manufactureDate');
    }
  }
  formatYear() {
    const enteredNumber = this.formInput.controls[this.properties.manufactureDCYears].value;
    if (enteredNumber > 9999) {
      this.formInput.patchValue({
        manufactureDCYears: this.padLeft('0', '0', 4)
      });
    } else {
      const myNumber = this.padLeft(enteredNumber, '0', 4);
      this.formInput.patchValue({
        manufactureDCYears: myNumber
      });
    }
  }
  formatWeeks() {
    const enteredNumber = this.formInput.controls[this.properties.manufactureDCWeeks].value;
    if (enteredNumber > 54) {
      this.formInput.patchValue({
        manufactureDCWeeks: this.padLeft('0', '0', 2)
      });
    } else if (enteredNumber < 10) {
      const myNumber = this.padLeft(enteredNumber, '0', 2);
      this.formInput.patchValue({
        manufactureDCWeeks: myNumber
      });
    }
  }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
  }

  onManufactureDCWeeksSelect(event) {
    const manufactureDCYears = this.formInput.controls[this.properties.manufactureDCYears].value;
    if (event && event.target.value && (event.target.value > Numbers.Default && event.target.value < 55) &&
      manufactureDCYears && (Number(manufactureDCYears.toString()) > 1000 && manufactureDCYears.toString().length <= yearConstantLength)) {
      this._supplierDateCodeService.getFirstDateOfWeek(Number(manufactureDCYears), Number(event.target.value)).subscribe(response => {
        const resultDate = new Date(response);
        const currentDate = new Date();
        if (resultDate > currentDate) {
          this.notificationService.showWarning(ToastMessage.FutureDateNotRequired);
        }
        const manufactureDateValue = this.datePipe.transform(response, 'MM/dd/yyyy');
        this.formInput.patchValue({
          manufactureDate: manufactureDateValue,
        });
      }
        , () => {

        }, () => {
          this.setExpirationDate();
          this.getRemainingdays(this.sapPartInspectionPlan.partDateCode.dateCodeLimit);
        }
      );
    } else if (event.target.value == null || Number(event.target.value) === Numbers.Default) {
      this.clearDateCodeData('manufactureDCWeeks');
    }
  }

  onManufactureDCYearsSelect(event) {

    const manufactureDWeeks = this.formInput.controls[this.properties.manufactureDCWeeks].value;
    if (event && event.target.value && (Number(event.target.value) > 1000 && event.target.value.toString().length <= yearConstantLength)
      && manufactureDWeeks && (Number(manufactureDWeeks.toString()) > Numbers.Default && manufactureDWeeks.toString().length < weekConstantLength)) {
      this._supplierDateCodeService.getFirstDateOfWeek(Number(event.target.value), manufactureDWeeks).subscribe(response => {
        const resultDate = new Date(response);
        const currentDate = new Date();
        if (resultDate > currentDate) {
          this.notificationService.showWarning(ToastMessage.FutureDateNotRequired);
        }
        const manufactureDateValue = this.datePipe.transform(response, 'MM/dd/yyyy');
        this.formInput.patchValue({
          manufactureDate: manufactureDateValue,
        });
      }
        , () => {

        }, () => {
          this.setExpirationDate();
          this.getRemainingdays(this.sapPartInspectionPlan.partDateCode.dateCodeLimit);
        }
      );
    } else if (event.target.value == null || Number(event.target.value) === Numbers.Default) {
      this.clearDateCodeData('manufactureDCYears');
    }
  }



  setExpirationDate() {

    this.isCommodityPCBOrPWB = this.isCommodityPCBPWB(this.sapPartInspectionPlan.commodity);
    const shelfLifeMonths = this.formInput.controls[this.properties.shelfLifeMonths].value;
    const manufactureDate = this.formInput.controls[this.properties.manufactureDate].value;
    const commodity = this.sapPartInspectionPlan.commodity;
    let expiration;
    if (!this.isCommodityPCBOrPWB && manufactureDate && commodity != null) {
      expiration = new Date(manufactureDate);
      this.formInput.patchValue({
        surfaceFinishingDate: manufactureDate
      });
    }

    if (expiration) {
      expiration.setMonth(expiration.getMonth() + shelfLifeMonths);
      this.formInput.patchValue({
        expireDate: expiration
      });
    }
  }


  isCommodityPCBPWB(commodity) {
    if (commodity != null && commodity.name != null) {
      return (commodity.name === CommodityEnum.PCB || commodity.name === CommodityEnum.PWB);
    } else {
      return false;
    }
  }

  expandSupplierTestReportTabDynamic() {
    if (!this.isSupplierTestReportExpanded) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setTestReportPageSortFilterInfo(pageSortFilterInfo);
      this.getTestReportDetails(pageSortFilterInfo);
    }
  }

  getTestReportDetails(pageSortFilterInfo: PageSortFilterInfo) {
    if (this.sapPartInspectionPlanId) {
      this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
        this.isSupplierTestReportExpanded = true;
        this.getDefaultTestReportDetails(data);
      }
        , () => {
        }, () => {
          if (this.recId !== null && this.recId !== 0) {
            const supplierPageSortFilterInfo = new PageSortFilterInfo();
            supplierPageSortFilterInfo.expandInfo = this.apiService.setSupplierTestReportPageSortFilterInfo(supplierPageSortFilterInfo);
            this.apiService.getDataById(this.recId, supplierPageSortFilterInfo).subscribe(data => {
              this.supplierMeasurement.supplierTestReports = data.value[0].supplierTestReports;
              if (this.supplierMeasurement.supplierTestReports !== null && this.supplierMeasurement.supplierTestReports !== undefined &&
                this.supplierMeasurement.supplierTestReports.length > 0) {
                this.partTestReportTabDetails = this.supplierTestReportTabDetails;
                this.supplierTestReportTabDetails = [];
                this.supplierMeasurement.supplierTestReports.map(record => {
                  this.supplierTestReport = new SupplierTestReport();
                  this.supplierTestReport = this.returnSupplierTestReportObj(record, this.recId);
                  this.supplierTestReportTabDetails.push(this.supplierTestReport);
                });
              }

            }
              , () => {

              }, () => {
                this.supplierTestReportTabDetails.forEach(element => {
                  if (this.partTestReportTabDetails) {
                    const matchedPartData = this.partTestReportTabDetails.find(k => k.partTestReportParameterId === element.partTestReportParameterId);
                    if (matchedPartData) {
                      element.name = matchedPartData.name,
                        element.resultExpected = element.resultExpected;
                      element.testRequirement = matchedPartData.testRequirement;
                      element.isChecked = matchedPartData.isChecked;
                      element.isEnabled = matchedPartData.isEnabled;
                      element.resultId = element.resultId;
                      element.selectedDynamicId = (element.selectedDynamicId != null
                        && element.selectedDynamicId !== undefined && element.selectedDynamicId !== Constants.Empty)
                        ? element.selectedDynamicId : 0;
                    }
                  }
                });
              }
            );
          }
        }
      );
    }
    this.getTestReportRadioButtonTypes();
  }

  private getDefaultTestReportDetails(data: ApiResponse<SAPPartInspectionPlan>) {
    if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.sapPartInspectionPlanService.isReturnedDataHasValue(data)) {
      this.sapPartInspectionPlan.partTestReportParameters = data.value[0].partTestReportParameters;
      if (this.sapPartInspectionPlan.partTestReportParameters !== null && this.sapPartInspectionPlan.partTestReportParameters !== undefined &&
        this.sapPartInspectionPlan.partTestReportParameters.length > 0) {
        this.supplierTestReportTabDetails = [];
        this.sapPartInspectionPlan.partTestReportParameters.map(record => {
          this.supplierTestReport = this.returnTestReportArray(record, this.recId);
          this.supplierTestReportTabDetails.push(this.supplierTestReport);
        });
      }
    }
  }

  returnTestReportArray(element: any, recId: number): any {
    return {
      id: element.id,
      partTestReportParameterId: element.id,
      name: element.name ?? element.testReport.name,
      resultExpected: this.getResult(element, recId),
      isChecked: element.isChecked,
      isEnabled: false,
      testRequirement: element.testRequirement,
      defectTypeId: element.defectTypeId == null ? 0 : element.defectTypeId,
      selectedDynamicId: 0,
      isDisabled: true,
      resultId: recId !== null && element.resultId === resultExpected[1].id ? resultExpected[1].id : resultExpected[0].id,
      sAPPartInspectionPlanId: recId ?? 0,
      testReportAttachments: element.testReportAttachments
    };
  }

  returnSupplierTestReportObj(element, supplierMeasurementSubmissionId?: number): any {
    return {
      id: element.id,
      supplierTestReportId: element.id,
      inspectionDetails: element.inspectionDetails ?? '',
      isChecked: element.isChecked,
      isEnabled: false,
      testRequirement: element.testRequirement,
      defectTypeName: (element.defectType != null && element.defectType !== undefined) ? element.defectType.defectTypeName : Constants.Empty,
      selectedDynamicId: element.defectTypeId,
      defectTypeId: element.selectedDynamicId,
      resultId: element.resultId,
      isDisabled: true,
      resultExpected: this.recId !== null && element.resultId === resultExpected[1].id ? resultExpected[1].name : resultExpected[0].name,
      partTestReportParameterId: element.partTestReportParameterId ?? 0
    };
  }


  returnSupplierMPositionObj(element): any {
    return {
      id: element.id,
      partMPositionToleranceId: element.partMPositionToleranceId,
      supplierMPositionId: 0,
      isEnabled: (element.partDimension !== undefined && element.partDimension != null && element.partDimension.name != null)
        ? (element.partDimension.name.toLowerCase().trim() !== this.actualmeasuredgeometry ? false : true) : false,
      parameterManagementId: (element.parameterManagement !== undefined && element.parameterManagement != null) ? element.parameterManagement.id : element.parameterManagementId,
      partDimensionId: element.partDimension ? element.partDimension.id : element.partDimensionId,
      dimensionNumber: element.dimensionNumber === undefined ? (element.partDimension ? element.partDimension.name : Constants.Empty) : element.dimensionNumber,
      dimensionDefaultId: element.dimensionDefaultId === 0 ? null : element.dimensionDefaultId,
      associatedDimensionNumberId: element.dimensionDefaultId === 0 ? null : element.associatedDimensionNumberId,
      uomId: element.uomId,
      specLimitAtMMC: element.specLimitAtMMC,
      specLimitAtLMC: element.specLimitAtLMC,
      spec: element.spec,
      instrumentTypeId: (element.instrumentType !== undefined && element.instrumentType != null) ? element.instrumentType.id : element.instrumentTypeId,
      parameterName: (element.parameterManagement !== undefined && element.parameterManagement != null) ? element.parameterManagement.name : Constants.Empty,
      unit: (element.uom !== undefined && element.uom != null) ? element.uom.name : Constants.Empty,
      instrumentTypeCode: (element.instrumentType !== undefined && element.instrumentType != null) ? element.instrumentType.code : null,
      dataType: (element.dataTypeId !== undefined && element.dataTypeId != null) ? (dataTypes[0].id === element.dataTypeId ? dataTypes[0].name : dataTypes[1].name) : Constants.Empty,
      dataTypeId: element.dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id,
      parameterManagement: element.parameterManagement,
      partDimension: element.partDimension,
      instrumentType: element.instrumentType,
      instrumentId: element.selectedDynamicId
    };
  }

  returnSupplierMPositionDefault(element): any {
    return {
      parameterManagementId: null,
      partMPositionToleranceId: element.partMPositionToleranceId,
      dimensionDefaultId: element.id,
      associatedDimensionNumberId: element.dimensionDefaultId === 0 ? null : element.associatedDimensionNumberId,
      partDimensionId: element.partDimensionId === 0 ? null : element.partDimensionId,
      isEnabled: element.dimensionName !== undefined ? (element.dimensionName.toLowerCase().trim() !== this.actualmeasuredgeometry ? false : true) : false,
      dimensionNumber: element.dimensionName,
      uomId: element.uomId,
      specLimitAtMMC: element.specLimitAtMMC,
      specLimitAtLMC: element.specLimitAtLMC,
      spec: element.spec,
      instrumentTypeId: (element.instrumentType !== undefined && element.instrumentType != null) ? element.instrumentType.id : element.instrumentTypeId,
      parameterName: (element.parameterManagement !== undefined && element.parameterManagement != null) ? element.parameterManagement.name : Constants.Empty,
      unit: (element.uom !== undefined && element.uom != null) ? element.uom.name : Constants.Empty,
      instrumentTypeCode: (element.instrumentType !== undefined && element.instrumentType != null) ? element.instrumentType.code : Constants.Empty,
      dataType: (element.dataTypeId !== undefined && element.dataTypeId != null) ? (dataTypes[0].id === element.dataTypeId ? dataTypes[0].name : dataTypes[1].name) : Constants.Empty,
      dataTypeId: element.dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id,
      parameterManagement: element.parameterManagement,
      partDimension: element.partDimension,
      instrumentType: element.instrumentType,
      instrumentId: element.selectedDynamicId
    };
  }

  returnSupplierLPositionDefault(element): any {
    return {
      parameterManagementId: null,
      partLPositionToleranceId: element.partLPositionToleranceId,
      dimensionDefaultId: element.id,
      associatedDimensionNumberId: element.dimensionDefaultId === 0 ? null : element.associatedDimensionNumberId,
      partDimensionId: element.partDimensionId === 0 ? null : element.partDimensionId,
      isEnabled: element.dimensionName !== undefined ? (element.dimensionName.toLowerCase().trim() !== this.actualmeasuredgeometry ? false : true) : false,
      dimensionNumber: element.dimensionName,
      uomId: element.uomId,
      specLimitAtMMC: element.specLimitAtMMC,
      specLimitAtLMC: element.specLimitAtLMC,
      spec: element.spec,
      instrumentTypeId: (element.instrumentType !== undefined && element.instrumentType != null) ? element.instrumentType.id : element.instrumentTypeId,
      parameterName: (element.parameterManagement !== undefined && element.parameterManagement != null) ? element.parameterManagement.name : Constants.Empty,
      unit: (element.uom !== undefined && element.uom != null) ? element.uom.name : Constants.Empty,
      instrumentTypeCode: (element.instrumentType !== undefined && element.instrumentType != null) ? element.instrumentType.code : Constants.Empty,
      dataType: (element.dataTypeId !== undefined && element.dataTypeId != null) ? (dataTypes[0].id === element.dataTypeId ? dataTypes[0].name : dataTypes[1].name) : Constants.Empty,
      dataTypeId: element.dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id,
      parameterManagement: element.parameterManagement,
      partDimension: element.partDimension,
      instrumentType: element.instrumentType,
      instrumentId: element.selectedDynamicId
    };
  }




  returnSupplierLPositionObj(element): any {
    return {
      id: element.id,
      partLPositionToleranceId: element.partLPositionToleranceId,
      supplierLPositionId: 0,
      isEnabled: (element.partDimension !== undefined && element.partDimension != null && element.partDimension.name != null)
        ? (element.partDimension.name.toLowerCase().trim() !== this.actualmeasuredgeometry ? false : true) : false,
      parameterManagementId: (element.parameterManagement !== undefined && element.parameterManagement != null) ? element.parameterManagement.id : element.parameterManagementId,
      partDimensionId: element.partDimension ? element.partDimension.id : element.partDimensionId,
      dimensionNumber: element.dimensionNumber === undefined ? (element.partDimension ? element.partDimension.name : Constants.Empty) : element.dimensionNumber,
      dimensionDefaultId: element.dimensionDefaultId === 0 ? null : element.dimensionDefaultId,
      associatedDimensionNumberId: element.dimensionDefaultId === 0 ? null : element.associatedDimensionNumberId,
      uomId: element.uomId,
      specLimitAtMMC: element.specLimitAtMMC,
      specLimitAtLMC: element.specLimitAtLMC,
      spec: element.spec,
      instrumentTypeId: (element.instrumentType !== undefined && element.instrumentType != null) ? element.instrumentType.id : element.instrumentTypeId,
      parameterName: (element.parameterManagement !== undefined && element.parameterManagement != null) ? element.parameterManagement.name : Constants.Empty,
      unit: (element.uom !== undefined && element.uom != null) ? element.uom.name : Constants.Empty,
      instrumentTypeCode: (element.instrumentType !== undefined && element.instrumentType != null) ? element.instrumentType.code : null,
      dataType: (element.dataTypeId !== undefined && element.dataTypeId != null) ? (dataTypes[0].id === element.dataTypeId ? dataTypes[0].name : dataTypes[1].name) : Constants.Empty,
      dataTypeId: element.dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id,
      parameterManagement: element.parameterManagement,
      partDimension: element.partDimension,
      instrumentType: element.instrumentType,
      instrumentId: element.selectedDynamicId
    };
  }




  getDefaultCommodityResultParameter(sAPPartInspectionPlan, commodityId: number) {
    const commodityID = sAPPartInspectionPlan != null ? sAPPartInspectionPlan.commodityId : commodityId;
    this._parameterManagementService.getParameterManagementDataByCommodityId(commodityID, this.sapPartInspectionPlanService.getPcCodes(this.samplingPlans)).subscribe(data => {
      this.resultOrientedData = data.value;
      this.showHideTab(data.value);
      this.getFunctionAttributeRadioButtonTypes();
    });
  }

  getFunctionAttributeRadioButtonTypes() {
    this.resultExpectedResultActualParameter['resultActual'] = [];
    resultExpected.forEach(e => {
      this.resultExpectedResultActualParameter['resultActual'][e.id] = {
        id: e.id,
        name: e.name,
        isChecked: e.isChecked,
        section: tabType.get(TabType.ResultOriented)
      };
    });
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

  titleCaseWord(word: string, isUpper: boolean) {
    if (!isUpper) {
      return word[0].toUpperCase() + word.substr(1);
    } else {
      return word[0].toLowerCase() + word.substr(1);
    }
  }

  labelTransform(name) {
    const label = `${'Label'}${'.'}${this.titleCaseWord(name, false)}`;
    return label;
  }

  initializeTabExpandedSetting() {
    this.isSupplierFunctionAttributeExpanded = false;
    this.masterInspectionExpanded = false;
    this.isSamplingPlanNumbersOnly = true;
    this.sapBasedParameterExpanded = false;
    this.isSupplierTestReportExpanded = false;
    this.isSupplierTestReportAttachmentUploaded = true;
    this.isInspectionDetailsMaxCharactersValid = true;
    this.isDateCodeExpanded = false;
    this.isBowTwistExpanded = false;
    this.isMPositionToleranceExpanded = false;
    this.isLPositionToleranceExpanded = false;
    this.isSupplierVisualInspectionExpanded = false;
  }

  initializeTabIds() {
    this.supplierFunctionAttributeTabId = TabType.ResultOriented;
    this.microSectionParameterTabId = TabType.MicroSection;
    this.dimensionMeasurementTabId = TabType.Measurement;
    this.functionVariableTabId = TabType.FUN;
    this.dateCodeTabId = TabType.DateCode;
    this.bowTwistTabId = TabType.BowAndTwist;
    this.specWithMMCId = TabType.MPositionTolerance;
    this.specWithLMCId = TabType.LPositionTolerance;
    this.supplierVisualInspectionsTabId = TabType.VisualInspection;
    this.supplierDateCodeTabId = TabType.DateCode;
  }

  handleAddDefectTypesEvent(record: any): void {
    this.openDefectTypeModel(record);
  }

  handleAddDefectTypesQtyEvent(record: any): void {
    this.openDefectTypeQtyModel(record);
  }

  editSupplierTestReportRecord(record: any): void {

    this.supplierTestReportId = record.supplierTestReportId;

    this.partTestReportParameterId = record.partTestReportParameterId;

    this.testReportId = record.id;

    const selectedTestReportTabRow = this.apiService.getSelectedSupplierTestReportRow(this.supplierTestReportTabDetails, this.recId, this.partTestReportParameterId);

    const sapPageSortFilterInfo = new PageSortFilterInfo();

    sapPageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setTestReportAttachmentSortFilterInfo(sapPageSortFilterInfo);

    this.partTestReportParameterService.getTestReportDataById(this.partTestReportParameterId, sapPageSortFilterInfo).subscribe(sapdata => {
      if (this.partTestReportParameterId && this.partTestReportParameterId > 0 && !selectedTestReportTabRow.isPartAttachmentExpanded) {

        selectedTestReportTabRow.isPartAttachmentExpanded = true;

        this.setPartTestReportAttachments(sapdata, selectedTestReportTabRow);
      }


    }, () => {

    },
      () => {
        if (this.supplierTestReportId && this.supplierTestReportId > 0 && !selectedTestReportTabRow.isSupplierAttachmentExpanded) {
          const pageSortFilterInfo = new PageSortFilterInfo();

          pageSortFilterInfo.expandInfo = this.apiService.setSupplierTestReportAttachmentSortFilterInfo(pageSortFilterInfo);

          this.supplierTestReportService.getTestReportDataById(this.supplierTestReportId, pageSortFilterInfo).subscribe(data => {

            if (this.supplierTestReportId && this.supplierTestReportId > 0 && !selectedTestReportTabRow.isSupplierAttachmentExpanded) {

              selectedTestReportTabRow.isSupplierAttachmentExpanded = true;

              this.setSupplierTestReportAttachments(selectedTestReportTabRow, data);
            }

          }, () => {

          },
            () => {
              this.openTestReportPopUp(selectedTestReportTabRow);
            }
          );
        } else {
          this.openTestReportPopUp(selectedTestReportTabRow);
        }


      });
  }


  setSupplierTestReportAttachments(selectedTestReportTabRow: SupplierTestReport, data: ApiResponse<SupplierTestReport>) {


    if (this.apiService.isSMSHasValue(this.supplierMeasurement) && data != null && data.value[0] != null && data.value.length > 0) {

      this.supplierTestReportAttachments = data.value[0].supplierTestReportAttachments;

      if (this.supplierTestReportAttachments) {

        selectedTestReportTabRow.hasSupplierAttachments = true;

        if (selectedTestReportTabRow.supplierTestReportAttachments === undefined) {
          selectedTestReportTabRow.supplierTestReportAttachments = [];
        }

        this.supplierTestReportAttachments.forEach(element => {
          element.attachment.canDelete = true;
          element.attachment.enableRowDelete = true;
          selectedTestReportTabRow.supplierTestReportAttachments.push(element);
        });
      } else {
        selectedTestReportTabRow.hasSupplierAttachments = false;
      }
      selectedTestReportTabRow.originalSupplierTestReportAttachmentIds = this.apiService.setOriginalSupplierTestReportAttachmentIds(selectedTestReportTabRow);

    }
  }

  setPartTestReportAttachments(sapdata: ApiResponse<PartTestReportTab>, selectedTestReportTabRow: SupplierTestReport) {
    if (sapdata && sapdata.value.length > 0) {

      if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && sapdata != null && sapdata.value[0] != null) {

        this.partTestReportAttachments = sapdata.value[0].partTestReportAttachments;

        selectedTestReportTabRow.isPartAttachmentExpanded = true;

        if (this.partTestReportAttachments) {

          if (selectedTestReportTabRow.supplierTestReportAttachments === undefined) {
            selectedTestReportTabRow.supplierTestReportAttachments = [];
          }

          this.partTestReportAttachments.forEach(element => {
            element.attachment.canDelete = false;
            element.attachment.enableRowDelete = false;
            selectedTestReportTabRow.supplierTestReportAttachments.push(element);
          });

        }
      }
    }
  }

  // removeElementFromObjectArray(key: number, objectArray: any) {
  //   objectArray.forEach((value, index) => {
  //     if (value.id === key) { objectArray.splice(index, 1); }
  //   });
  // }

  openTestReportPopUp(partTestReport: any) {

    const modalRef = this.modalService.open(SupplierTestReportAttachmentViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = partTestReport;
    modalRef.componentInstance.isViewDisable = true;
    modalRef.result.then(
      (response) => {
        const selectedPartTestReportFiles = response;

        const selectedTestReportTabRow = this.supplierTestReportTabDetails.find(k => k.partTestReportParameterId === this.partTestReportParameterId);

        selectedTestReportTabRow.supplierTestReportAttachments = [];

        selectedPartTestReportFiles.testReportAttachments.forEach(element => {

          selectedTestReportTabRow.supplierTestReportAttachments = this.apiService.setPartTestReportAttachments(element, selectedTestReportTabRow, this.savePath);

        });
        this.setSupplierTestReportAttachmentHasUpload(selectedTestReportTabRow);

        selectedTestReportTabRow.currentSupplierTestReportAttachmentIds = this.apiService.setCurrentSupplierTestReportAttachmentIds(selectedTestReportTabRow, selectedPartTestReportFiles);

        selectedTestReportTabRow.removedSupplierTestReportAttachmentIds = this.apiService.setRemovedSupplierTestReportAttachmentIds(selectedTestReportTabRow);

        selectedTestReportTabRow.supplierTestReportAttachments = this.apiService.clearRemovedSupplierTestReportAttachments(selectedTestReportTabRow);

        this.formInput.markAsDirty();

      },
      () => {
      }
    );
  }

  setSupplierTestReportAttachmentHasUpload(selectedTestReportTabRow: SupplierTestReport) {
    if (selectedTestReportTabRow.supplierTestReportAttachments &&
      selectedTestReportTabRow.supplierTestReportAttachments.filter(k => k.attachment.canDelete === true).length > 0) {
      selectedTestReportTabRow.hasSupplierAttachments = true;
    } else {
      selectedTestReportTabRow.hasSupplierAttachments = false;
    }
  }

  supplierTestReportTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      this.formInput.markAsDirty();
    }
  }

  supplierTestReportCheckBoxChangedEvent() {
    this.formInput.markAsDirty();
  }

  openDefectTypeModel(record): void {
    const modalRef = this.modalService.open(DefectTypeComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.componentInstance.sectionId = DefectSection.Function_Attribute;
    modalRef.componentInstance.isViewDisable = true;

    modalRef.result.then(
      (response) => {
        this.supplierFunctionAttribute = new SupplierFunctionAttribute();
        const defectTypeIds = response.defectTypes.map(x => x.id);
        const updateDefectType = this.supplierFunctionAttributeDetails.filter(x => x.parameterManagementId === record.parameterManagementId);
        updateDefectType[0].defectType = response.defectTypes.map(x => x.defectTypeName).join(',');
        updateDefectType[0].addedDefectTypeIds = defectTypeIds;
        updateDefectType[0].parameterManagementId = record.parameterManagementId;

        this.formInput.markAsDirty();
        this.isFunctionAttributeInspectionDetailEmpty = true;

      },
      () => {
      }
    );
  }

  openDefectTypeQtyModel(record): void {
    const modalRef = this.modalService.open(DefectTypeVisualInspectionComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.componentInstance.sectionId = DefectSection.Visual_Inspection;
    modalRef.componentInstance.isViewDisable = true;

    modalRef.result.then(
      (response) => {
        this.supplierVisualInspection = new SupplierVisualInspectionModel();
        const updateDefectType = this.supplierVisualInspectionDetails.filter(x => x.parameterManagementId === record.parameterManagementId);

        const qty = response.defectTypeQtyParameters !== null ? response.defectTypeQtyParameters.map(x => Number(x.defectQty)).reduce((a, b) => a + b, 0) : 0;
        updateDefectType[0].totalDefectQty = qty;
        updateDefectType[0].parameterManagementId = record.parameterManagementId;
        updateDefectType[0].supplierVisualInspectionDefectTypes = response.defectTypeQtyParameters;

        this.formInput.markAsDirty();
        this.isSupplierVisualInspectionDetailEmpty = true;
        this.checkIsPassFailVisualInspection(this.supplierVisualInspectionDetails);
      },
      () => {
      }
    );
  }

  isVisualInspectionToolsEmpty() {
    const supplierVisualInspection = this.formInput.controls[this.properties.supplierVisualInspection];
    this.isSupplierVisualInspectionDetailEmpty = false;
    if (this.supplierVisualInspection) {
      this.supplierVisualInspectionDetails.forEach(element => {
        if (element.selectedDynamicId === Numbers.Default) {
          supplierVisualInspection.setValidators(Validators.required);
          supplierVisualInspection.updateValueAndValidity();
          this.isSupplierVisualInspectionDetailEmpty = true;
        }
      });
    }
    if (this.isSupplierVisualInspectionDetailEmpty) {
      supplierVisualInspection.setValidators(Validators.required);
      supplierVisualInspection.updateValueAndValidity();
    } else {
      supplierVisualInspection.setErrors(null);
      supplierVisualInspection.clearValidators();
      supplierVisualInspection.updateValueAndValidity();
      this.formInput.markAsDirty();

    }
    return this.isSupplierVisualInspectionDetailEmpty;
  }

  physicalInspectionTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      const resultData = this.supplierSapBasedParameters.filter(x => x.id === event.row.id)[0];
      if (resultData.sapRequest === event.textChangedEvent) {
        resultData.matchId = yesNoOptions[0].id;
        resultData.matchResult = yesNoOptions[0].name;
        resultData.enableRowAddDefectTypes = false;
      } else if (event.textChangedEvent.target !== undefined) {
        resultData.matchId = resultData.sapRequest === event.textChangedEvent.target.value.trim() ? yesNoOptions[0].id : yesNoOptions[1].id;
        resultData.matchResult = resultData.sapRequest === event.textChangedEvent.target.value.trim() ? yesNoOptions[0].name : yesNoOptions[1].name;
        resultData.enableRowAddDefectTypes = resultData.matchResult === yesNoOptions[1].name;
        resultData.addedDefectTypeIds = resultData.matchResult === yesNoOptions[1].name ? [] : resultData.addedDefectTypeIds;
        resultData.defectType = resultData.matchResult === yesNoOptions[1].name ? '' : resultData.defectType;
        this.resultPassFailSapBased = resultData.matchResult === yesNoOptions[1].name ? result[1].name : result[0].name;

      }
      this.formInput.markAsDirty();
    }
  }


  getDefectTypeName(existDefectTypeName: string, appendString: string): string {
    return existDefectTypeName.concat(',', appendString);
  }

  expandSapBasedParameterTabDynamic() {
    if (!this.sapBasedParameterExpanded && this.recId !== null && this.recId !== 0) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      pageSortFilterInfo.expandInfo = this.apiService.setSupplierSapBasedParameterPageSortFilterInfo(pageSortFilterInfo);
      this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
        this.supplierMeasurement.supplierSapBasedParameters = data.value[0].supplierSapBasedParameters;
        if (this.supplierMeasurement.supplierSapBasedParameters !== null && this.supplierMeasurement.supplierSapBasedParameters !== undefined &&
          this.supplierMeasurement.supplierSapBasedParameters.length > 0) {
          this.supplierSapBasedParameters = [];
          this.supplierMeasurement.supplierSapBasedParameters.map(record => {
            this.supplierSapBasedParameter = new SupplierSapBasedParameter();
            this.supplierSapBasedParameter = this.returnSapBasedObject(record);
            this.supplierSapBasedParameters.push(this.supplierSapBasedParameter);
          });
          this.checkIsPassFail(null, this.supplierSapBasedParameters);
        } else {
        }
        this.sapBasedParameterExpanded = true;

      });
    } else {
      this.pageSortFilterInfo = new PageSortFilterInfo();
      this.pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
        {
          expand: <Record<string, ExpandSelectCountInfo>[]>
            [
              this._certificateTypeService.expandCertificateTypeParameters()
            ]
        };
      if (this.supplierSamplingPlans.length > 0 && !this.recId && !this.sapBasedParameterExpanded) {
        let certificateType = this.supplierSamplingPlans.filter(x => x.certificateType)[0].certificateType;
        certificateType = certificateType !== '' && (certificateType !== null && certificateType !== undefined) ? certificateType : DefaultCommonConstants.Default;
        this.getCertificateTypeParameterFilterInfo(certificateType);
        this._certificateTypeService.getAllData(this.pageSortFilterInfo).subscribe(data => {
          if (data && data.value.length > 0) {
            this.sapBasedParameterExpanded = true;
            if (data.value[0].certificateTypeParameters.length > 0) {
              data.value[0].certificateTypeParameters.map(record => {
                this.supplierSapBasedParameter = new SupplierSapBasedParameter();
                this.supplierSapBasedParameter = this.returnSapBasedObject(record);
                this.supplierSapBasedParameters.push(this.supplierSapBasedParameter);
              });
            }
            this.checkIsPassFail(null, this.supplierSapBasedParameters);
          }
        });
      }
    }
  }

  getCertificateTypeParameterFilterInfo(certificateType) {
    if (this.site) {
      this.pageSortFilterInfo.filterInfo = [];
      const filterInfo = new FilterInfo();
      filterInfo.columnName = 'name';
      filterInfo.columnType = ColumnType.String;
      filterInfo.mappingField = 'name';
      filterInfo.value = certificateType;
      filterInfo.operator = SearchOperator.IsEqualTo;
      this.pageSortFilterInfo.filterInfo.push(filterInfo);
    }
  }

  private returnSapBasedObject(element: any): any {
    return {
      id: element.id,
      name: element.parameterName ?? element.certificateTypeParameter.parameterName,
      sapRequest: this.recId !== null ? element.sapRequest : this.getPartMfgMpnMediaCode(element),
      physicalInspection: element.physicalInspection ?? '',
      certificateTypeParameterId: this.recId !== null ? element.certificateTypeParameterId : element.id,
      matchId: element.matchId === yesNoOptions[0].id ? yesNoOptions[0].id : yesNoOptions[1].id,
      matchResult: element.matchId === yesNoOptions[0].id ? yesNoOptions[0].name : yesNoOptions[1].name,
      enableRowAddDefectTypes: element.enableRowAddDefectTypes,
      defectTypes: [],
      supplierMeasurementSubmissionId: this.recId ?? 0,
      defectType: this.recId !== null && (element.defectTypes !== undefined && element.defectTypes.length > 0) ? element.defectTypes.map(x => x.defectTypeName).join(',') : '',
      addedDefectTypeIds: this.recId !== null && (element.defectTypes !== undefined && element.defectTypes.length > 0) ? this.getDefectTypeIds(element.defectTypes.map(x => x.id)) : [],

    };
  }

  getPartMfgMpnMediaCode(record) {
    if (record.parameterName === this.partSapRequestFields[0].parameterName) {
      return this.partSapRequestFieldValue.mediaCode;
    } else if (record.parameterName === this.partSapRequestFields[1].parameterName) {
      return this.partSapRequestFieldValue.manufacturer;
    } else if (record.parameterName === this.partSapRequestFields[2].parameterName) {
      return this.partSapRequestFieldValue.maskedMPN;
    } else {
      return record.parameterName;
    }

  }

  openSapBasedDefectTypeModel(record): void {

    const modalRef = this.modalService.open(DefectTypeComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.componentInstance.sectionId = DefectSection.SAP_BASED;
    modalRef.componentInstance.isViewDisable = true;

    modalRef.result.then(
      (response) => {
        this.supplierSapBasedParameter = new SupplierSapBasedParameter();

        const defectTypeIds = response.defectTypes.map(x => x.id);
        const updateDefectType = this.supplierSapBasedParameters.filter(x => x.certificateTypeParameterId === record.certificateTypeParameterId);
        updateDefectType[0].defectType = response.defectTypes.map(x => x.defectTypeName).join(',');
        updateDefectType[0].addedDefectTypeIds = defectTypeIds;
        this.resultPassFailSapBased = updateDefectType[0].matchResult === yesNoOptions[1].name ? result[1].name : result[0].name;
        updateDefectType[0].matchId = updateDefectType[0].matchId === yesNoOptions[1].id ? yesNoOptions[1].id : yesNoOptions[0].id;


        this.formInput.markAsDirty();
        this.isSapBasedParameterDetailEmpty = true;

      },
      () => {
      }
    );
  }

  getDefaultResult() {
    this.acceptRejectResults = acceptRejectOptions;
    this.formInput.patchValue({
      result: acceptRejectOptions[0].name
    });
  }

  isResultDescriptionEmpty() {
    return this.hasError(this.properties.resultDescription, ValidationErrorCodes.required);
  }

  isResultDescriptionModified() {
    return this.isModified(this.properties.resultDescription);
  }

  getAcceptRejectResult(): any {
    const resultAcceptReject = this.formInput.controls[this.properties.result].value;
    if (this.recId) {
      if (resultAcceptReject === undefined) {
        return acceptRejectOptions[0].id;
      }
      return resultAcceptReject === acceptRejectOptions[0].name ? acceptRejectOptions[0].id : acceptRejectOptions[1].id;
    } else {
      return resultAcceptReject === acceptRejectOptions[0].name ? acceptRejectOptions[0].id : acceptRejectOptions[1].id;
    }
  }

  clearManufactureDC() {
    this.formInput.patchValue({
      manufactureDCWeeks: Numbers.Default,
      manufactureDCYears: Numbers.Default
    });
  }

  disabledManufactureDate() {
    const dtTemp = new Date();
    dtTemp.setDate(dtTemp.getDate());
    this.maxDate = dtTemp;
  }

  testReportRadioButtonChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      const resultData = this.supplierTestReportTabDetails.filter(x => x.id === event.row.id)[0];
      resultData.resultExpected = event.radioButtonChangedEvent;
      resultData.resultId = event.radioButtonChangedEvent === resultExpected[0].name ? resultExpected[0].id : resultExpected[1].id;
      resultData.isDisabled = event.radioButtonChangedEvent === resultExpected[0].name;
      // this.formInput.markAsDirty();
      // this.saveAsDraftButtonValidation();
    }
  }

  getTestReportRadioButtonTypes() {
    this.resultExpectedTestReport['resultExpected'] = [];
    resultExpected.forEach(e => {
      this.resultExpectedTestReport['resultExpected'][e.id] = {
        id: e.id,
        name: e.name,
        isChecked: e.isChecked,
        section: tabType.get(TabType.TestReport)
      };
    });
  }

  isTestReportDefectTypeEmpty() {
    const supplierTestReportTabDetails = this.formInput.controls[this.properties.supplierTestReportTabDetails];
    this.isTestReportDefectTypeTestReportEmpty = false;
    if (this.supplierTestReportTabDetails) {
      this.supplierTestReportTabDetails.forEach(element => {
        if (element.resultExpected === resultExpected[1].name && (element.selectedDynamicId === Numbers.Default)) {
          supplierTestReportTabDetails.setValidators(Validators.required);
          supplierTestReportTabDetails.updateValueAndValidity();
          this.isTestReportDefectTypeTestReportEmpty = true;
        }
      });
    }
    if (this.isTestReportDefectTypeTestReportEmpty) {
      supplierTestReportTabDetails.setValidators(Validators.required);
      supplierTestReportTabDetails.updateValueAndValidity();
    } else {
      supplierTestReportTabDetails.setErrors(null);
      supplierTestReportTabDetails.clearValidators();
      supplierTestReportTabDetails.updateValueAndValidity();
      this.formInput.markAsDirty();
      // this.saveAsValidation();
    }
    return this.isTestReportDefectTypeTestReportEmpty;
  }

  getBowTwistData() {
    this.dataTypeList = dataTypes;
    this.formInput.patchValue({
      dataType: dataTypes[1].name
    });
  }

  getExpandedSupplierBowTwist(pageSortFilterInfo) {
    this.getBowTwistData();
    let bowTwistSampleSize = '0';
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, 'DIM', batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        bowTwistSampleSize = data.value[0].smplSize;
        if (bowTwistSampleSize !== null) {
          this.displaySupplierBowTwistColumns = (new SupplierBowTwist()).displayColumns();
          Array(Number(bowTwistSampleSize))
            .fill(1)
            .forEach((value, index) => {
              const tableColumn = new TableColumn();

              tableColumn.field = `${this.actualValueBowTwist}${value + index}`;
              tableColumn.header = `ActualValue${value + index}`;
              const objColumnInfo = new ColumnInfo();
              objColumnInfo.type = ColumnType.String;
              tableColumn.columnInfo = objColumnInfo;
              tableColumn.isVisible = true;
              tableColumn.isExport = true;
              this.displaySupplierBowTwistColumns.push(tableColumn);
            });
          this.tableWidthForBowTwist = this.constantTablewidth + (this.approximateWidthForEachTextBox * Number(bowTwistSampleSize));
        }
      } else {
        bowTwistSampleSize = '0';
      }
    }, () => { }, () => {
      if (this.recId !== null && !this.isBowTwistExpanded) {
        this.getUpdateSupplierBowTwists(pageSortFilterInfo);
      } else {
        if (!this.isBowTwistExpanded) {
          this.getAddSupplierBowTwists(pageSortFilterInfo);
        }
      }
    });
  }

  getAddSupplierBowTwists(pageSortFilterInfo) {

    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {

        this.isDisplayColumnReload = true;
        if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && data != null && data.value[0] != null) {
          this.sapPartInspectionPlan.partInspectionBowTwistParameters = data.value[0].partInspectionBowTwistParameters;
          this.entity = this.sapPartInspectionPlan;
          this.sapPartInspectionPlan = data.value[0];

          this.specTypeId = this.sapPartInspectionPlan.specTypeId;
          this.dataTypeId = this.sapPartInspectionPlan.dataTypeId;
          const partInspectionBowTwistParametersSortedArray = _.sortBy(this.sapPartInspectionPlan.partInspectionBowTwistParameters, 'warPageTypeId');
          this.sapPartInspectionPlan.partInspectionBowTwistParameters = partInspectionBowTwistParametersSortedArray;
          if (partInspectionBowTwistParametersSortedArray != null
            && partInspectionBowTwistParametersSortedArray !== undefined) {
            this.bowTwistTitles = this.sapPartInspectionPlanService.initializeBowTwistHeaderInfo(this.specTypeId);
            this.supplierBowTwists = [];
            partInspectionBowTwistParametersSortedArray.map(record => {
              this.supplierBowTwist = new SupplierBowTwist();
              this.supplierBowTwist = this.returnBowTwistObject(record);
              this.supplierBowTwists.push(this.supplierBowTwist);
            });
          }
        }
      }
    });
    this.isBowTwistExpanded = true;
  }
  getAddSupplierFunctionVariable(pageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        this.isDisplayColumnReload = true;
        if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
          this.sapPartInspectionPlan.partFunParameters = data.value[0].partFunParameters;
          this.entity = this.sapPartInspectionPlan;
          // this.microSectionParameters = this.sapPartInspectionPlanService.getMicroSectionParameters(this.sapPartInspectionPlan);
          this.supplierFunctionVariables = this.sapPartInspectionPlanService.mapFunParameterModel(this.sapPartInspectionPlan.partFunParameters).map(element => {
            return this.returnSupplierFunctionVariableObj(element, this.recId);
          });
        }
      }
      this.isFunctionVariableExpanded = true;
    });
  }
  getUpdateSupplierFunctionVariable(pageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      this.isDisplayColumnReload = true;
      this.supplierMeasurement.supplierFunctionVariables = data.value[0].supplierFunctionVariables;
      if (this.supplierMeasurement.supplierFunctionVariables !== null && this.supplierMeasurement.supplierFunctionVariables !== undefined &&
        this.supplierMeasurement.supplierFunctionVariables.length > 0) {
        this.supplierFunctionVariables = [];
        this.supplierMeasurement.supplierFunctionVariables.map(record => {
          this.supplierFunctionVariable = new SupplierFunctionVariableModel();
          this.supplierFunctionVariable = this.returnSupplierFunctionVariableObj(record, this.recId);
          this.supplierFunctionVariables.push(this.supplierFunctionVariable);
        });
        const columnFields = this.functionVariableColumns.map((x => x.field));
        if (columnFields.length > 0) {
          this.supplierFunctionVariables.map(funVar => {
            funVar.supplierFunctionVariableActuals.map(funVarActual => {
              columnFields.map(header => {
                if (header === funVarActual.actualTextName) {
                  funVar[header] = funVarActual.actualTextValue;
                }
              });
            });
          });
        }
      } else {
        const pageSortFilterInfoFunctionaVariable = new PageSortFilterInfo();
        pageSortFilterInfoFunctionaVariable.expandInfo = this.sapPartInspectionPlanService.setFUNPageSortFilterInfo(pageSortFilterInfoFunctionaVariable);
        this.getAddSupplierFunctionVariable(pageSortFilterInfoFunctionaVariable);
      }
      this.isFunctionVariableExpanded = true;
      // }, () => { }, () => {
      //   setTimeout(() => {
      //     this.setFunctionVariablePassFail();
      //     this.highlightFunctionVariable();
      //   }, environment.timer.autoReturn);
    });
  }
  getAddSupplierDimensionMeasurement(pageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
          this.isDisplayColumnReload = true;
          this.sapPartInspectionPlan.partMeasurementParameters = data.value[0].partMeasurementParameters;
          this.entity = this.sapPartInspectionPlan;
          this.supplierDimensionMeasurements = this.sapPartInspectionPlanService.mapMeasurementParameterModel(this.sapPartInspectionPlan.partMeasurementParameters).map(element => {
            return this.returnSupplierDimensionMeasurementObj(element, this.recId);
          });
        }
      }
      this.isDimensionMeasurementExpanded = true;
    });
  }
  getUpdateSupplierDimensionMeasurement(pageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      this.isDisplayColumnReload = true;
      this.supplierMeasurement.supplierDimensionMeasurements = data.value[0].supplierDimensionMeasurements;
      if (this.supplierMeasurement.supplierDimensionMeasurements !== null && this.supplierMeasurement.supplierDimensionMeasurements !== undefined &&
        this.supplierMeasurement.supplierDimensionMeasurements.length > 0) {
        this.supplierDimensionMeasurements = [];
        this.supplierMeasurement.supplierDimensionMeasurements.map(record => {
          this.supplierDimensionMeasurement = new SupplierDimensionMeasurementModel();
          this.supplierDimensionMeasurement = this.returnSupplierDimensionMeasurementObj(record, this.recId);
          this.supplierDimensionMeasurements.push(this.supplierDimensionMeasurement);
          const columnFields = this.dimensionMeasurementColumns.map((x => x.field));
          if (columnFields.length > 0) {
            this.supplierDimensionMeasurements.map(dimension => {
              dimension.supplierDimensionMeasurementActuals.map(dimensionActual => {
                columnFields.map(header => {
                  if (header === dimensionActual.actualTextName) {
                    dimension[header] = dimensionActual.actualTextValue;
                  }
                });
              });
            });
          }
        });
      } else {
        const pageSortFilterInfoSupplierDimensionMeasurement = new PageSortFilterInfo();
        pageSortFilterInfoSupplierDimensionMeasurement.expandInfo = this.sapPartInspectionPlanService.setMeasurementParametersPageSortFilterInfo(pageSortFilterInfoSupplierDimensionMeasurement);
        this.getAddSupplierDimensionMeasurement(pageSortFilterInfoSupplierDimensionMeasurement);
      }
      this.isDimensionMeasurementExpanded = true;
      // this.setDimensionalMeasurementPassFail();
      // }, () => { }, () => {
      //   setTimeout(() => {
      //     this.highlightDimensionalMeasurement();
      //   }, environment.timer.autoReturn);
    });
  }
  getUpdateSupplierBowTwists(pageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        this.isDisplayColumnReload = true;
        this.supplierMeasurement.supplierBowTwists = data.value[0].supplierBowTwists;
        this.specTypeId = this.sapPartInspectionPlan.specTypeId;
        this.dataTypeId = this.sapPartInspectionPlan.dataTypeId;
        if (this.supplierMeasurement.supplierBowTwists != null
          && this.supplierMeasurement.supplierBowTwists !== undefined) {
          this.supplierBowTwists = [];
          this.bowTwistTitles = this.sapPartInspectionPlanService.initializeBowTwistHeaderInfo(this.specTypeId);
          this.supplierMeasurement.supplierBowTwists.map(record => {
            this.supplierBowTwist = new SupplierBowTwist();
            this.supplierBowTwist = this.returnBowTwistObject(record);
            this.supplierBowTwists.push(this.supplierBowTwist);
          });
          this.supplierBowTwists.map(bowTwists => {
            bowTwists.supplierBowTwistActuals.map(bowTwistActual => {
              this.displaySupplierBowTwistColumns.map(header => {
                if (header.field === bowTwistActual.actualTextName) {
                  bowTwists[header.field] = bowTwistActual.actualTextValue;
                }
              });
            });
          });
        }
      }
    });
    this.isBowTwistExpanded = true;
  }

  returnBowTwistObject(record): any {
    return {
      spec: this.recId !== null ? record.partInspectionBowTwistParameter.spec : record.spec,
      length: this.recId !== null ? record.partInspectionBowTwistParameter.length : record.length,
      width: this.recId !== null ? record.partInspectionBowTwistParameter.width : record.width,
      unit: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? (unitType[0].id === record.partInspectionBowTwistParameter.unit
        ? unitType[0].name : unitType[1].name) : (unitType[0].id === record.unit ? unitType[0].name : unitType[1].name),
      upperLimit: this.recId !== null ? record.partInspectionBowTwistParameter.upperLimit : record.upperLimit,
      warPageId: this.recId !== null ? record.bowTwistFormulas.warPageId : record.warPageId,
      bowTwistFormulaId: this.recId !== null ? record.partInspectionBowTwistParameter.bowTwistFormulaId : record.bowTwistFormulaId,
      partBowTwistParameterId: this.recId !== null ? record.partInspectionBowTwistParameter.id : record.id,
      bowTwistFormula: this.recId !== null ? record.bowTwistFormulas.name : record.bowTwistFormula.name,
      supplierMeasurementSubmissionId: this.recId !== null ? record.partInspectionBowTwistParameter.supplierMeasurementSubmissionId : record.supplierMeasurementSubmissionId,
      dataType: this.recId !== null ? record.partInspectionBowTwistParameter.dataType : record.dataType,
      warPage: this.recId !== null ? record.partInspectionBowTwistParameter.warPage : record.warPage,
      warPageTypeId: this.recId !== null ? record.partInspectionBowTwistParameter.warPageTypeId : record.warPageTypeId,
      supplierBowTwistActuals: this.recId !== null ? record.supplierBowTwistActuals : [],
    };
  }


  functionVariableTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      const actualValue = (<HTMLInputElement>document.getElementById(event.id)).value;
      const actualValueHtml = document.getElementById(event.id);
      if (!isNumeric(actualValue)) {
        (<HTMLInputElement>document.getElementById(event.id)).value = '';
      }
      if (actualValue === '') {
        actualValueHtml.style.backgroundColor = 'yellow';
      } else if (Number(actualValue) > event.row.upperTolerance || Number(actualValue) < event.row.lowerTolerance) {
        actualValueHtml.style.backgroundColor = 'red';
      } else {
        actualValueHtml.style.backgroundColor = 'white';
      }
      this.formInput.markAsDirty();
    }
  }

  dimensionalMeasurementTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      const actualValue = (<HTMLInputElement>document.getElementById(event.id)).value;
      const actualValueHtml = document.getElementById(event.id);
      if (!isNumeric(actualValue)) {
        (<HTMLInputElement>document.getElementById(event.id)).value = '';
      }
      if (actualValue === '') {
        actualValueHtml.style.backgroundColor = 'yellow';
      } else if (Number(actualValue) > event.row.upperTolerance || Number(actualValue) < event.row.lowerTolerance) {
        actualValueHtml.style.backgroundColor = 'red';
      } else {
        actualValueHtml.style.backgroundColor = 'white';
      }
      this.formInput.markAsDirty();
    }
  }

  supplierMicroSectionTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      const actualValue = (<HTMLInputElement>document.getElementById(event.id)).value;
      const actualValueHtml = document.getElementById(event.id);
      if (!isNumeric(actualValue)) {
        (<HTMLInputElement>document.getElementById(event.id)).value = '';
      }
      if (actualValue === '') {
        actualValueHtml.style.backgroundColor = 'yellow';
      } else if (Number(actualValue) > event.row.upperTolerance || Number(actualValue) < event.row.lowerTolerance) {
        actualValueHtml.style.backgroundColor = 'red';
      } else {
        actualValueHtml.style.backgroundColor = 'white';
      }
      this.formInput.markAsDirty();
    }
  }

  bowTwistTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      const actualValue = (<HTMLInputElement>document.getElementById(event.id)).value;
      const actualValueHtml = document.getElementById(event.id);
      if (!isNumeric(actualValue)) {
        (<HTMLInputElement>document.getElementById(event.id)).value = '';
      }
      if (actualValue === '') {
        actualValueHtml.style.backgroundColor = 'yellow';
      } else if (Number(actualValue) > event.row.upperLimit) {
        actualValueHtml.style.backgroundColor = 'red';
      } else {
        actualValueHtml.style.backgroundColor = 'white';
      }
      this.formInput.markAsDirty();
    }
  }

  getSampleSizeForSupplierMicroSection(pageSortFilterInfo) {

    let microSectionSampleSize = '0';
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, 'DIM', batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        microSectionSampleSize = data.value[0].smplSize;
        this.microSectionParameterColumns = (new SupplierMicroSectionParameterModelColumns()).displayColumns();
        if (microSectionSampleSize !== null) {
          Array(Number(microSectionSampleSize))
            .fill(1)
            .forEach((value, index) => {
              const tableColumn = new TableColumn();
              tableColumn.field = `${this.actualValueMicroSection}${value + index}`;
              tableColumn.header = `ActualValue${value + index}`;
              const objColumnInfo = new ColumnInfo();
              objColumnInfo.type = ColumnType.String;
              tableColumn.columnInfo = objColumnInfo;
              tableColumn.isVisible = true;
              tableColumn.isExport = true;
              this.microSectionParameterColumns.push(tableColumn);
            });
          this.tableWidthForMicroSection = this.constantTablewidth + (this.approximateWidthForEachTextBox * Number(microSectionSampleSize));
        }
      } else {
        microSectionSampleSize = '0';
      }
    }, () => { }, () => {

      if (this.recId !== null && !this.isMicroSectionExpanded) {
        this.getUpdateSupplierMicroSection(pageSortFilterInfo);
      } else {
        this.getAddSupplierMicroSection(pageSortFilterInfo);
      }
    });
  }

  getUpdateSupplierMicroSection(pageSortFilterInfo) {
    // chart call
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      this.isDisplayColumnReload = true;
      this.supplierMeasurement.supplierMicroSectionParameters = data.value[0].supplierMicroSectionParameters;
      if (this.supplierMeasurement.supplierMicroSectionParameters !== null && this.supplierMeasurement.supplierMicroSectionParameters !== undefined &&
        this.supplierMeasurement.supplierMicroSectionParameters.length > 0) {
        this.supplierMicroSectionParameters = [];
        this.supplierMeasurement.supplierMicroSectionParameters.map(record => {
          this.supplierMicroSectionParameter = new SupplierMicroSectionParameterModel();

          this.supplierMicroSectionParameter = this.returnSupplierMicroSectionParameterObj(record, this.recId);
          this.supplierMicroSectionParameters.push(this.supplierMicroSectionParameter);
        });
        const columnFields = this.microSectionParameterColumns.map((x => x.field));
        if (columnFields.length > 0) {
          this.supplierMicroSectionParameters.map(microSection => {
            microSection.supplierMicroSectionActuals.map(microSectionActual => {
              columnFields.map(header => {
                if (header === microSectionActual.actualTextName) {
                  microSection[header] = microSectionActual.actualTextValue;
                }
              });
            });
          });
        }
        this.isMicroSectionExpanded = true;
      } else {
        const pageSortFilterInfoMicroSection = new PageSortFilterInfo();
        pageSortFilterInfoMicroSection.expandInfo = this.sapPartInspectionPlanService.setMicroSectionPageSortFilterInfo(pageSortFilterInfoMicroSection);
        this.getAddSupplierMicroSection(pageSortFilterInfoMicroSection);
      }
      this.isMicroSectionExpanded = true;

      // this.setMicroSectionPassFail();
      // }, () => { }, () => {
      //   setTimeout(() => {
      //     this.highlightMicroSection();
      //   }, environment.timer.autoReturn);
    });
  }

  getAddSupplierMicroSection(pageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
          this.isDisplayColumnReload = true;
          this.sapPartInspectionPlan.partMicrosectionParameters = data.value[0].partMicrosectionParameters;
          this.entity = this.sapPartInspectionPlan;
          this.supplierMicroSectionParameters = this.sapPartInspectionPlanService.getMicroSectionParameters(this.sapPartInspectionPlan).map(element => {
            return this.returnSupplierMicroSectionParameterObj(element, this.recId);
          });
        }
      }
      this.isMicroSectionExpanded = true;
    });
  }

  getUpdateSupplierFunctionAttribute(pageSortFilterInfo) {

    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      this.supplierMeasurement.supplierFunctionAttributes = data.value[0].supplierFunctionAttributes;
      if (this.supplierMeasurement.supplierFunctionAttributes !== null && this.supplierMeasurement.supplierFunctionAttributes !== undefined &&
        this.supplierMeasurement.supplierFunctionAttributes.length > 0) {
        this.supplierFunctionAttributeDetails = [];
        this.isDisplayColumnReload = true;

        this.supplierMeasurement.supplierFunctionAttributes.map(record => {
          this.supplierFunctionAttribute = new SupplierFunctionAttributeLabelModel();
          this.supplierFunctionAttribute = this.returnSupplierFunctionAttributeObj(record, this.recId);
          this.supplierFunctionAttributeDetails.push(this.supplierFunctionAttribute);
        });

        const columnFields = this.displaySupplierFunctionAttributeColumns.map((x => x.field));
        if (columnFields.length > 0) {
          this.supplierFunctionAttributeDetails.map(funAttribute => {
            funAttribute.supplierFunctionAttributeActuals.map(funAttributeActual => {
              columnFields.map(header => {
                if (header === funAttributeActual.actualTextName) {
                  funAttribute[header] = funAttributeActual.actualTextValue;
                }
              });
            });
          });
        }
        this.checkIsPassFail(this.supplierFunctionAttributeDetails);
      } else {
      }
      this.isSupplierFunctionAttributeExpanded = true;

    });
  }

  getAddSupplierFunctionAttribute(pageSortFilterInfo) {


    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSortFilterInfo).subscribe(data => {
      if (this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.sapPartInspectionPlanService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partResultOrientedParameters = data.value[0].partResultOrientedParameters;
        if (this.sapPartInspectionPlan.partResultOrientedParameters !== null && this.sapPartInspectionPlan.partResultOrientedParameters !== undefined &&
          this.sapPartInspectionPlan.partResultOrientedParameters.length > 0) {
          this.isDisplayColumnReload = true;
          this.supplierFunctionAttributeDetails = [];
          this.sapPartInspectionPlan.partResultOrientedParameters.map(record => {
            this.supplierFunctionAttribute = this.returnDataArray(record);
            this.supplierFunctionAttributeDetails.push(this.supplierFunctionAttribute);
          });
          this.checkIsPassFail(this.supplierFunctionAttributeDetails);
        } else {
        }
        this.isSupplierFunctionAttributeExpanded = true;
      }
    });
  }

  close() {
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }

  SPCChartMicroSectionEvent(record: any): void {

    const modalRef = this.modalService.open(SpcChartMicroSectionComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-dialog-centered',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.componentInstance.ipNo = this.formInput.controls[this.properties.ip].value;
    modalRef.result.then(
      () => {
      }
    );
  }

  SPCChartDimensionMeasurementEvent(record: any): void {
    const modalRef = this.modalService.open(SpcChartDimensionMeasurementComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-dialog-centered',
      size: 'lg'
    });

    modalRef.componentInstance.detail = record;
    modalRef.componentInstance.ipNo = this.formInput.controls[this.properties.ip].value;
    modalRef.result.then(
      () => {
      }
    );
  }

  SPCChartFunctionVariableEvent(record: any): void {
    const modalRef = this.modalService.open(SpcChartFunctionVariableComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-dialog-centered',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.componentInstance.ipNo = this.formInput.controls[this.properties.ip].value;
    modalRef.result.then(
      () => {
      }
    );
  }

  getSupplierSpcChartSummary(ip, recId) {
    this.apiService.getSupplierSpcChartSummary(ip, recId).subscribe((response) => {
      this.supplierSpcChartSummary = response.value;
    }, () => { }, () => {
      this.checkMavericLotDetected();
    });
  }

  checkMavericLotDetected() {
    const supplierFunctionAttributeTab = this.tabConfig.filter(k => k.id === this.supplierFunctionAttributeTabId);
    const microSectionParameterTab = this.tabConfig.filter(k => k.id === this.microSectionParameterTabId);
    const dimensionMeasurementTab = this.tabConfig.filter(k => k.id === this.dimensionMeasurementTabId);
    const functionVariableTab = this.tabConfig.filter(k => k.id === this.functionVariableTabId);
    const specWithMMCTab = this.tabConfig.filter(k => k.id === this.specWithMMCId);
    const specWithLMCTab = this.tabConfig.filter(k => k.id === this.specWithLMCId);
    const bowTwistTab = this.tabConfig.filter(k => k.id === this.bowTwistTabId);
    const supplierDateCodeTab = this.tabConfig.filter(k => k.id === this.supplierDateCodeTabId);
    // function attribute
    if (supplierFunctionAttributeTab && supplierFunctionAttributeTab.length > 0
      && supplierFunctionAttributeTab[0].isVisible === true && !this.isSupplierFunctionAttributeSummaryResult) {
      const funAttribute = this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierFunctionAttributeTabId)[0];
      this.setFunctionAttributePassFailSummaryResult = funAttribute && funAttribute !== undefined ?
        this.getSummaryPassFailEmptyResult(funAttribute.failIndicator, funAttribute.tabResult) : Constants.Empty;
      this.functionAttributeFailIndicator = funAttribute && funAttribute !== undefined ? funAttribute.failIndicator : Numbers.Two;
    }
    // microsection
    if (microSectionParameterTab && microSectionParameterTab.length > 0
      && microSectionParameterTab[0].isVisible === true && !this.isMicroSectionParameterSummaryResult) {
      this.isMicroSectionParameterSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.microSectionParameterTabId).length > 0
        ? this.supplierSpcChartSummary.filter(x => x.tabId === this.microSectionParameterTabId)[0].mavericLotDetected : false;

      const microSection = this.supplierSpcChartSummary.filter(x => x.tabId === this.microSectionParameterTabId)[0];
      this.setMicroSectionPassFailSummaryResult = microSection && microSection !== undefined ? this.getSummaryPassFailEmptyResult(microSection.failIndicator, microSection.tabResult)
        : Constants.Empty;
      this.microSectionFailIndicator = microSection && microSection !== undefined ? microSection.failIndicator : Numbers.Two;

    }
    // dimention measurment
    if (dimensionMeasurementTab && dimensionMeasurementTab.length > 0
      && dimensionMeasurementTab[0].isVisible === true && !this.isDimensionMeasurementSummaryResult) {
      this.isDimensionMeasurementSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.dimensionMeasurementTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.dimensionMeasurementTabId)[0].mavericLotDetected : false;

      const dimention = this.supplierSpcChartSummary.filter(x => x.tabId === this.dimensionMeasurementTabId)[0];
      this.setDimensionMeasurementPassFailSummaryResult = dimention && dimention !== undefined ? this.getSummaryPassFailEmptyResult(dimention.failIndicator, dimention.tabResult) : Constants.Empty;

      this.dimentionFailIndicator = dimention && dimention !== undefined ? dimention.failIndicator : Numbers.Two;
    }
    // function variable
    if (functionVariableTab && functionVariableTab.length > 0
      && functionVariableTab[0].isVisible === true && !this.isFunctionVariableSummaryResult) {
      this.isFunctionVariableSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.functionVariableTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.functionVariableTabId)[0].mavericLotDetected : false;

      const functionVariable = this.supplierSpcChartSummary.filter(x => x.tabId === this.functionVariableTabId)[0];
      this.setFunctionVariablePassFailSummaryResult = functionVariable && functionVariable !== undefined ?
        this.getSummaryPassFailEmptyResult(functionVariable.failIndicator, functionVariable.tabResult) : Constants.Empty;

      this.functionVariableFailIndicator = functionVariable && functionVariable !== undefined ? functionVariable.failIndicator : Numbers.Two;

    }
    // date code
    if (supplierDateCodeTab && supplierDateCodeTab.length > 0
      && supplierDateCodeTab[0].isVisible === true && !this.isDateCodeSummaryResult) {
      this.isDateCodeSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.dateCodeTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.dateCodeTabId)[0].tabResult : false;

      const dateCode = this.supplierSpcChartSummary.filter(x => x.tabId === this.dateCodeTabId)[0];
      this.setDateCodeSummaryResult = dateCode && dateCode !== undefined ? this.getSummaryPassFailEmptyResult(dateCode.failIndicator, dateCode.tabResult) : Constants.Empty;

      this.dateCodeFailIndicator = dateCode && dateCode !== undefined ? dateCode.failIndicator : Numbers.Two;

    }
    // spec with mmc
    if (specWithMMCTab && specWithMMCTab.length > 0
      && specWithMMCTab[0].isVisible === true && !this.isSpecWithMMCSummaryResult) {
      this.isSpecWithMMCSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithMMCId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithMMCId)[0].tabResult : false;

      const specWithMMC = this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithMMCId)[0];
      this.setSpecWithMMCSummaryResult = specWithMMC && specWithMMC !== undefined ? this.getSummaryPassFailEmptyResult(specWithMMC.failIndicator, specWithMMC.tabResult) : Constants.Empty;
      this.mPositionFailIndicator = specWithMMC && specWithMMC !== undefined ? specWithMMC.failIndicator : Numbers.Two;
    }
    // spec with lmc
    if (specWithLMCTab && specWithLMCTab.length > 0
      && specWithLMCTab[0].isVisible === true && !this.isSpecWithLMCSummaryResult) {
      this.isSpecWithLMCSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithLMCId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithLMCId)[0].tabResult : false;


      const specWithLMC = this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithLMCId)[0];
      this.setSpecWithLMCSummaryResult = specWithLMC && specWithLMC !== undefined ?
        this.getSummaryPassFailEmptyResult(specWithLMC.failIndicator, specWithLMC.tabResult) : Constants.Empty;

      this.lPositionFailIndicator = specWithLMC && specWithLMC !== undefined ? specWithLMC.failIndicator : Numbers.Two;
    }
    // bow twist
    if (bowTwistTab && bowTwistTab.length > 0
      && bowTwistTab[0].isVisible === true && !this.isBowTwistSummaryResult) {
      this.isBowTwistSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.bowTwistTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.bowTwistTabId)[0].tabResult : false;


      const bowTwist = this.supplierSpcChartSummary.filter(x => x.tabId === this.bowTwistTabId)[0];
      this.setBowTwistSummaryResult = bowTwist && bowTwist !== undefined ? this.getSummaryPassFailEmptyResult(bowTwist.failIndicator, bowTwist.tabResult) : Constants.Empty;
      this.bowTwistFailIndicator = bowTwist && bowTwist !== undefined ? bowTwist.failIndicator : Numbers.Two;
    }

    // sap based
    if (this.supplierSpcChartSummary.filter(x => x.tabId === this.sapBasedParameterTabId).length > 0) {
      this.isSupplierSapBasedTabSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.sapBasedParameterTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.sapBasedParameterTabId)[0].tabResult : false;


      const sapBased = this.supplierSpcChartSummary.filter(x => x.tabId === this.sapBasedParameterTabId)[0];
      this.setSapBasedSummaryResult = sapBased && sapBased !== undefined ? this.getSummaryPassFailEmptyResult(sapBased.failIndicator, sapBased.tabResult) : Constants.Empty;

      this.sapBasedFailIndicator = sapBased && sapBased !== undefined ? sapBased.failIndicator : Numbers.Two;
    }
    // packing inspection
    if (this.supplierSpcChartSummary.filter(x => x.tabId === this.packingInspectionTabId).length > 0) {
      this.isSupplierPackingInspectionTabSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.packingInspectionTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.packingInspectionTabId)[0].tabResult : false;

      const packingInspection = this.supplierSpcChartSummary.filter(x => x.tabId === this.packingInspectionTabId)[0];
      this.setPackingInspectionSummaryResult = packingInspection && packingInspection !== undefined ?
        this.getSummaryPassFailEmptyResult(packingInspection.failIndicator, packingInspection.tabResult) : Constants.Empty;

      this.packingInspectionFailIndicator = this.formInput.controls[this.properties.result].value === 'Accept' ?
        Numbers.One : Numbers.Default;

    }
    // test report
    if (this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierTestReportTabId).length > 0) {
      this.isSupplierTestReportTabSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierTestReportTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierTestReportTabId)[0].tabResult : false;

      const testReport = this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierTestReportTabId)[0];
      this.setTestReportSummaryResult = testReport && testReport !== undefined ? this.getSummaryPassFailEmptyResult(testReport.failIndicator, testReport.tabResult) : Constants.Empty;
      this.testReportFailIndicator = testReport && testReport !== undefined ? testReport.failIndicator : Numbers.Two;
    }

    // visual inspection
    if ((this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierVisualInspectionsTabId).length > 0) && !this.isSupplierVisualInspectionsSummaryResult) {

      const visualInspection = this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierVisualInspectionsTabId)[0];
      this.setVisualInspectionSummaryResult = visualInspection && visualInspection !== undefined ?
        this.getSummaryPassFailEmptyResult(visualInspection.failIndicator, visualInspection.tabResult) : Constants.Empty;
      this.visualInspectionFailIndicator = visualInspection && visualInspection !== undefined ? visualInspection.failIndicator : Numbers.Two;

    }
    this.mavericLotDetected();
  }

  getSummaryPassFailEmptyResult(failIndicator, tabResult) {
    if (failIndicator === Numbers.Default && tabResult) {
      return result[1].name;
    } else if (failIndicator === Numbers.One && !tabResult) {
      return result[0].name;
    } else {
      return Constants.Empty;
    }
  }

  mavericLotDetected() {
    this.isAllTabResultPass = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.failIndicator === 0).length > 0 ?
      false : true;
    if (this.isAllTabResultPass) {
      this.isMavericLotDetected = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue).length
        > 0 ? true : false;
      if (this.isMavericLotDetected) {
        this.summaryResult = 'Conditional ' + result[0].name;
      } else {
        this.summaryResult = result[0].name;
      }
    } else {
      this.summaryResult = result[1].name;
    }

  }

  // isDisableBasedMaverikLotAndOverAllResult() {

  //   this.isAllTabResultPass = this.supplierFailedQuantity && this.supplierFailedQuantity.filter(x => x.failIndicator === 0).length > 0 ?
  //     false : true;
  //   this.isMavericLotDetected = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true).length > 0 ?
  //     true : false;

  //   if (this.isAllTabResultPass && !this.isMavericLotDetected) {
  //     // submit button and reject enabled
  //     this.summaryResult = result[0].name;
  //     return false;
  //   } else if (this.isAllTabResultPass && this.isMavericLotDetected) {
  //     // submit button enabled
  //     this.summaryResult = 'Conditional ' + result[0].name;
  //     return false;
  //   } else if (!this.isAllTabResultPass) {
  //     // submit button disabled and reject button enabled
  //     this.summaryResult = result[1].name;
  //     return true;
  //   }
  // }

  getPassFailStringExpressionCondition(tabId) {
    let failIndicator = 0;
    let isSufficientDataUsed = false;
    if (this.supplierSpcChartSummary.length > 0) {
      if (this.supplierSpcChartSummary.filter(x => x.tabId === tabId).length > 0) {
        isSufficientDataUsed = this.supplierSpcChartSummary.filter(x => x.tabId === tabId)[0].dataCountToDetectMavericLot >= this.countValue;
      } else {
        isSufficientDataUsed = false;
      }
    } else {
      isSufficientDataUsed = false;
    }

    if (tabId === this.dimensionMeasurementTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.dimensionMeasurementTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.isDimensionMeasurementSummaryResult && failIndicator === Numbers.One) {
        this.setDimensionMeasurementPassFailSummaryResult = '';
        this.setDimensionMeasurementPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Detected';
        } else {
          return this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Not Detected';
        }
      } else if (!this.isDimensionMeasurementSummaryResult && failIndicator === Numbers.One) {
        this.setDimensionMeasurementPassFailSummaryResult = '';
        this.setDimensionMeasurementPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setDimensionMeasurementPassFailSummaryResult + '/ Maverick Lot Not Detected';
      } else if (this.isDimensionMeasurementSummaryResult && failIndicator === Numbers.Default) {
        this.setDimensionMeasurementPassFailSummaryResult = '';
        this.setDimensionMeasurementPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Detected';
        } else {
          return this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Not Detected';
        }
      } else if (!this.isDimensionMeasurementSummaryResult && failIndicator === Numbers.Default) {
        this.setDimensionMeasurementPassFailSummaryResult = '';
        this.setDimensionMeasurementPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setDimensionMeasurementPassFailSummaryResult + '/ Maverick Lot Not Detected';
      } else if (this.isDimensionMeasurementSummaryResult && this.setDimensionMeasurementPassFailSummaryResult === Constants.Empty) {
        this.setDimensionMeasurementPassFailSummaryResult = '';
        this.setDimensionMeasurementPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setDimensionMeasurementPassFailSummaryResult = failIndicator !== Numbers.Two ? this.setDimensionMeasurementPassFailSummaryResult + 'Maverick Lot Detected' : Constants.Empty;
        } else {
          return this.setDimensionMeasurementPassFailSummaryResult = failIndicator !== Numbers.Two ?
            this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Not Detected' : Constants.Empty;

        }
      } else if (!this.isDimensionMeasurementSummaryResult && this.setDimensionMeasurementPassFailSummaryResult === Constants.Empty) {
        this.setDimensionMeasurementPassFailSummaryResult = '';
        this.setDimensionMeasurementPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setDimensionMeasurementPassFailSummaryResult = failIndicator !== Numbers.Two ? this.setDimensionMeasurementPassFailSummaryResult + '/ Maverick Lot Not Detected' : Constants.Empty;
      }
    } else if (tabId === this.functionVariableTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.functionVariableTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.isFunctionVariableSummaryResult && failIndicator === Numbers.One) {
        this.setFunctionVariablePassFailSummaryResult = '';
        this.setFunctionVariablePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setFunctionVariablePassFailSummaryResult + ' / Maverick Lot Detected';
        } else {
          return this.setFunctionVariablePassFailSummaryResult + ' / Maverick Lot Not Detected';
        }
      } else if (!this.isFunctionVariableSummaryResult && failIndicator === Numbers.One) {
        this.setFunctionVariablePassFailSummaryResult = '';
        this.setFunctionVariablePassFailSummaryResult = this.returnPassFailResult(failIndicator);

        return this.setFunctionVariablePassFailSummaryResult + '/ Maverick Lot Not Detected';
      } else if (this.isFunctionVariableSummaryResult && failIndicator === Numbers.Default) {
        this.setFunctionVariablePassFailSummaryResult = '';
        this.setFunctionVariablePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setFunctionVariablePassFailSummaryResult + ' / Maverick Lot Detected';
        } else {
          return this.setFunctionVariablePassFailSummaryResult + ' / Maverick Lot Not Detected';
        }
      } else if (!this.isFunctionVariableSummaryResult && failIndicator === Numbers.Default) {
        this.setFunctionVariablePassFailSummaryResult = '';
        this.setFunctionVariablePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setFunctionVariablePassFailSummaryResult + '/ Maverick Lot Not Detected';
      } else if (this.isFunctionVariableSummaryResult && this.setFunctionVariablePassFailSummaryResult === Constants.Empty) {
        this.setFunctionVariablePassFailSummaryResult = '';
        this.setFunctionVariablePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setFunctionVariablePassFailSummaryResult = failIndicator !== Numbers.Two ? this.setFunctionVariablePassFailSummaryResult + 'Maverick Lot Detected' : Constants.Empty;
        } else {
          return this.setFunctionVariablePassFailSummaryResult = failIndicator !== Numbers.Two ?
            this.setFunctionVariablePassFailSummaryResult + ' / Maverick Lot Not Detected' : Constants.Empty;
        }
      } else if (!this.isFunctionVariableSummaryResult && this.setFunctionVariablePassFailSummaryResult === Constants.Empty) {
        this.setFunctionVariablePassFailSummaryResult = '';
        this.setFunctionVariablePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        this.mavericLotDetected();
        return this.setFunctionVariablePassFailSummaryResult = failIndicator !== Numbers.Two ? this.setFunctionVariablePassFailSummaryResult + '/ Maverick Lot Not Detected' : Constants.Empty;
      }
    } else if (tabId === this.microSectionParameterTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.microSectionParameterTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.isMicroSectionParameterSummaryResult && failIndicator === Numbers.One) {
        this.setMicroSectionPassFailSummaryResult = '';
        this.setMicroSectionPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setMicroSectionPassFailSummaryResult + ' / Maverick Lot Detected';
        } else {
          return this.setMicroSectionPassFailSummaryResult + ' / Maverick Lot Not Detected';
        }
      } else if (!this.isMicroSectionParameterSummaryResult && failIndicator === Numbers.One) {
        this.setMicroSectionPassFailSummaryResult = '';
        this.setMicroSectionPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setMicroSectionPassFailSummaryResult + '/ Maverick Lot Not Detected';
      } else if (this.isMicroSectionParameterSummaryResult === true && failIndicator === Numbers.Default) {
        this.setMicroSectionPassFailSummaryResult = '';
        this.setMicroSectionPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setMicroSectionPassFailSummaryResult + ' / Maverick Lot Detected';
        } else {
          return this.setMicroSectionPassFailSummaryResult + ' / Maverick Lot Not Detected';
        }
      } else if (!this.isMicroSectionParameterSummaryResult && failIndicator === Numbers.Default) {
        this.setMicroSectionPassFailSummaryResult = '';
        this.setMicroSectionPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setMicroSectionPassFailSummaryResult + '/ Maverick Lot Not Detected';
      } else if (this.isMicroSectionParameterSummaryResult === true && this.setMicroSectionPassFailSummaryResult === Constants.Empty) {
        this.setMicroSectionPassFailSummaryResult = '';
        this.setMicroSectionPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setMicroSectionPassFailSummaryResult = failIndicator !== Numbers.Two ? this.setMicroSectionPassFailSummaryResult + '/ Maverick Lot Detected' : Constants.Empty;
        } else {
          return this.setMicroSectionPassFailSummaryResult = failIndicator !== Numbers.Two ?
            this.setMicroSectionPassFailSummaryResult + ' / Maverick Lot Not Detected' : Constants.Empty;
        }
      } else if (!this.isMicroSectionParameterSummaryResult && this.setMicroSectionPassFailSummaryResult === Constants.Empty) {
        this.setMicroSectionPassFailSummaryResult = '';
        this.setMicroSectionPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setMicroSectionPassFailSummaryResult = failIndicator !== Numbers.Two ? this.setMicroSectionPassFailSummaryResult + '/ Maverick Lot Not Detected' : Constants.Empty;
      }
    } else if (tabId === this.supplierFunctionAttributeTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.supplierFunctionAttributeTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.setFunctionAttributePassFailSummaryResult === result[0].name) {
        this.setFunctionAttributePassFailSummaryResult = '';
        this.setFunctionAttributePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setFunctionAttributePassFailSummaryResult;
      } else if (this.setFunctionAttributePassFailSummaryResult === result[1].name) {
        this.setFunctionAttributePassFailSummaryResult = '';
        this.setFunctionAttributePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setFunctionAttributePassFailSummaryResult;
      } else if (this.setFunctionAttributePassFailSummaryResult === Constants.Empty) {
        this.setFunctionAttributePassFailSummaryResult = '';
        this.setFunctionAttributePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setFunctionAttributePassFailSummaryResult;
      }
    } else if (tabId === this.specWithMMCId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.specWithMMCId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.setSpecWithMMCSummaryResult === result[0].name) {
        this.setSpecWithMMCSummaryResult = '';
        this.setSpecWithMMCSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setSpecWithMMCSummaryResult;
      } else if (this.setSpecWithMMCSummaryResult === result[1].name) {
        this.setSpecWithMMCSummaryResult = '';
        this.setSpecWithMMCSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setSpecWithMMCSummaryResult;
      } else if (this.setSpecWithMMCSummaryResult === Constants.Empty) {
        this.setSpecWithMMCSummaryResult = '';
        this.setSpecWithMMCSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setSpecWithMMCSummaryResult;
      }
    } else if (tabId === this.specWithLMCId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.specWithLMCId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.setSpecWithLMCSummaryResult === result[0].name) {
        this.setSpecWithLMCSummaryResult = '';
        this.setSpecWithLMCSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setSpecWithLMCSummaryResult;
      } else if (this.setSpecWithLMCSummaryResult === result[1].name) {
        this.setSpecWithLMCSummaryResult = '';
        this.setSpecWithLMCSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setSpecWithLMCSummaryResult;
      } else if (this.setSpecWithLMCSummaryResult === Constants.Empty) {
        this.setSpecWithLMCSummaryResult = '';
        this.setSpecWithLMCSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setSpecWithLMCSummaryResult;
      }
    } else if (tabId === this.dateCodeTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.dateCodeTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.setDateCodeSummaryResult === result[0].name) {
        this.setDateCodeSummaryResult = '';
        this.setDateCodeSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setDateCodeSummaryResult;
      } else if (this.setDateCodeSummaryResult === result[1].name) {
        this.setDateCodeSummaryResult = '';
        this.setDateCodeSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setDateCodeSummaryResult;
      } else if (this.setDateCodeSummaryResult === Constants.Empty) {
        this.setDateCodeSummaryResult = '';
        this.setDateCodeSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setDateCodeSummaryResult;
      }
    } else if (tabId === this.bowTwistTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.bowTwistTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.setBowTwistSummaryResult === result[0].name) {
        this.setBowTwistSummaryResult = '';
        this.setBowTwistSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setBowTwistSummaryResult;
      } else if (this.setBowTwistSummaryResult === result[1].name) {
        this.setBowTwistSummaryResult = '';
        this.setBowTwistSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setBowTwistSummaryResult;
      } else if (this.setBowTwistSummaryResult === Constants.Empty) {
        this.setBowTwistSummaryResult = '';
        this.setBowTwistSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setBowTwistSummaryResult;
      }
    } else if (tabId === this.sapBasedParameterTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.sapBasedParameterTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.setSapBasedSummaryResult === result[0].name) {
        this.setSapBasedSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setSapBasedSummaryResult;
      } else if (this.setSapBasedSummaryResult === result[1].name) {
        this.setSapBasedSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setSapBasedSummaryResult;
      } else if (this.setSapBasedSummaryResult === Constants.Empty) {
        this.setSapBasedSummaryResult = '';
        this.setSapBasedSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setSapBasedSummaryResult;
      }
    } else if (tabId === this.packingInspectionTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.packingInspectionTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);
      if (this.formInput.controls[this.properties.result].value === acceptRejectOptions[0].name) {
        return this.setPackingInspectionSummaryResult = result[0].name;
      }

      if (this.setPackingInspectionSummaryResult === result[0].name) {
        this.setPackingInspectionSummaryResult = '';
        this.setPackingInspectionSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setPackingInspectionSummaryResult;
      } else if (this.setPackingInspectionSummaryResult === result[1].name) {
        this.setPackingInspectionSummaryResult = '';
        this.setPackingInspectionSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setPackingInspectionSummaryResult;
      } else if (this.setPackingInspectionSummaryResult === Constants.Empty) {
        this.setPackingInspectionSummaryResult = '';
        this.setPackingInspectionSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setPackingInspectionSummaryResult;
      }
    } else if (tabId === this.supplierTestReportTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.supplierTestReportTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.setTestReportSummaryResult === result[0].name) {
        this.setTestReportSummaryResult = '';
        this.setTestReportSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setTestReportSummaryResult;
      } else if (this.setTestReportSummaryResult === result[1].name) {
        this.setTestReportSummaryResult = '';
        this.setTestReportSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setTestReportSummaryResult;
      } else if (this.setTestReportSummaryResult === Constants.Empty) {
        this.setTestReportSummaryResult = '';
        this.setTestReportSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setTestReportSummaryResult;
      }
    } else if (tabId === this.supplierVisualInspectionsTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.supplierVisualInspectionsTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (this.setVisualInspectionSummaryResult === result[0].name) {
        this.setVisualInspectionSummaryResult = '';
        this.setVisualInspectionSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setVisualInspectionSummaryResult;
      } else if (this.setVisualInspectionSummaryResult === result[1].name) {
        this.setVisualInspectionSummaryResult = '';
        this.setVisualInspectionSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setVisualInspectionSummaryResult;
      } else if (this.setVisualInspectionSummaryResult === Constants.Empty) {
        this.setVisualInspectionSummaryResult = '';
        this.setVisualInspectionSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setVisualInspectionSummaryResult;
      }
    }
  }

  private checkTabHasData(tabId) {
    if (this.supplierSpcChartSummary !== undefined) {
      const isFail = this.supplierSpcChartSummary.filter(x => x.tabId === tabId && x.failIndicator === 0).length > 0;
      const isResultEmpty = this.supplierSpcChartSummary.filter(x => x.tabId === tabId && x.failIndicator === 2).length > 0;
      const tabHasData = this.supplierSpcChartSummary.filter(x => x.tabId === tabId).length > 0;
      return { isFail, isResultEmpty, tabHasData };
    }
    return { isFail: false, isResultEmpty: false, tabHasData: false };
  }

  private failIndicator(isResultFail: boolean, failIndicator: number, isResultEmpty: boolean, isTabHasData: boolean) {
    if (isResultFail) {
      failIndicator = 0;
    } else {
      if (isResultEmpty) {
        failIndicator = 2;
      } else if (!isTabHasData) {
        failIndicator = 2;
      } else {
        failIndicator = 1;
      }
    }
    return failIndicator;
  }

  returnPassFailResult(failIndicator: number) {
    return failIndicator === 1 ? result[0].name : failIndicator === 0 ? result[1].name : Constants.Empty;
  }

  supplierValue(value: any) {
    return `${value.supplier.vendorName ?? Constants.Empty}(${value.supplier.vendorCode ?? Constants.Empty})`;
  }

}
