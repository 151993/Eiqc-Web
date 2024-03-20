import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {
  acceptRejectOptions,
  Constants, DataType, dataTypes, DefaultCommonConstants, DefectSection, DimensionDefaultConstant, Numbers, PartPlanStateType, PrimeNGDateSelectionMode, purchaseOrderState,
  PurchaseOrderState, result, resultExpected, SearchOperator, specType, tabConfiguration, tabType, TabType, ValidationErrorCodes, yesNoOptions, ToastMessage,
  MasterInspectionType, OKNGType, ChartType, unitType, RoleType
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
import { FailedQuantityService } from 'src/app/services/failed-quantity/failed-quantity.service';
import { FailedQuantity } from 'src/app/model/failed-quantity/failed-quantity';
import { SpcChartMicroSectionComponent } from 'src/app/admin/spc-chart-micro-section/spc-chart-micro-section.component';
import { SpcChartDimensionMeasurementComponent } from 'src/app/admin/spc-chart-dimension-measurement/spc-chart-dimension-measurement.component';
import { SpcChartFunctionVariableComponent } from 'src/app/admin/spc-chart-function-variable/spc-chart-function-variable.component';
import { SupplierSpcChartCalculation } from 'src/app/model/supplier-measurement-submission/supplier-spc-chart-calculation/supplier-spc-chart-calculation';
import { SupplierSpcChartSummary } from 'src/app/model/supplier-measurement-submission/supplier-spc-chart-summary/supplier-spc-chart-summary';
import { ConfirmationModalComponent } from 'src/app/shared/controls/modal/confirmation-modal/confirmation-modal.component';
import { Clipboard } from '@angular/cdk/clipboard';
const regexOnlyNumbers = '^[0-9]*$';
const monthsToDaysConstant = 30;
const yearConstantLength = 4;
const weekConstantLength = 3;
const cpkTargetValue = 1.67;

const DIM = 'DIM';
const VIS = 'VIS';
const FUN = 'FUN';
const textbox = 'textbox';
const Pass = 'Pass';
const Fail = 'Fail';
@Component({
  selector: 'app-supplier-measurement-detail',
  templateUrl: './supplier-measurement-detail.component.html',
  styleUrls: ['./supplier-measurement-detail.component.css']
})
export class SupplierMeasurementDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
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
  countValue = 30;
  skipValue = 0;

  // MicroSection tab
  isMicroSectionExpanded: boolean;
  microSectionParameters: MicroSectionParameterModel[] = [];
  supplierMicroSectionParameter = new SupplierMicroSectionParameterModel();
  supplierMicroSectionParameters: SupplierMicroSectionParameterModel[] = [];
  microSectionParameterTabId: number;
  sapBasedParameterTabId = 14;
  packingInspectionTabId = 13;
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
  partSapRequestFieldValue = { mediaCode: '', maskedMPN: '', manufacturer: '' };

  funSampleSize = 0;
  dimSampleSize = 0;
  visSampleSize = 0;

  totalFunFailedQuantity = 0;
  totalDimFailedQuantity = 0;
  totalVisFailedQuantity = 0;

  visSAPFailedQuantity = 0;
  visPackingFailedQuantity = 0;
  visTestReportFailedQuantity = 0;
  visVisualInspectionFailedQuantity = 0;
  visDateCodeFailedQuantity = 0;
  summaryResult = '';


  partSapRequestFields = [{ id: 1, parameterName: 'Media Code' }, { id: 2, parameterName: 'MFG' }, { id: 3, parameterName: 'MPN' }];
  public supplierAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'vendorName',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'vendorName',
    format: '${value.vendorName} (${value.vendorCode}) (${value.purchaseOrg}-${value.companyCode})'
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
    unit: 'unit',
    dataType: 'dataType',
    supplierBowTwists: 'supplierBowTwists',
    supplierVisualInspection: 'supplierVisualInspection'
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
  totalApprovedBatchQuantity: number;
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

  isExceedInspectionQtyVisualInspection: boolean;

  canAddDefectTypesQty = true;
  canAddDefectTypes = true;
  canAddChartType = true;
  sapBasedParameterExpanded: boolean;
  resultPassFailSapBased: string;
  resultPassVisualInspection: string;
  acceptRejectResults: any[];

  supplierTestReportId: any;
  testReportId: any;
  savePath = 'supplier-measurement-submission';
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
  unit: Map<number, string>;
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
  AV = 'AV';
  actualValue = 'ActualValue';
  tableWidthForMMCLMC: number;
  tableWidthForFunctionAttribute: number;
  private readonly constantTablewidth = 100;
  private readonly approximateWidthForEachTextBox = 9;
  tableWidthForMicroSection: number;
  tableWidthForFunctionVariable: number;
  tableWidthForBowTwist: number;
  resultPassFailVisualInspection: string;
  visualInspectionResultPassFailId: number;
  supplierFailedQuantity: FailedQuantity[];
  isFailedQuantityExpanded: boolean;

  private readonly functionAttributeResult = 'FunctionAttributeResult';
  isDefaultCertificateType: any;
  standardDeviationValue: any;
  averageValue: any;
  spcStdAvg: SupplierSpcChartCalculation[] = [];
  spcMicroSectionStdAvg: SupplierSpcChartCalculation[] = [];
  supplierSPCchartData: SupplierSpcChartCalculation[] = [];
  supplierSpcChartSummary: SupplierSpcChartSummary[] = [];
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
  // spcDiamensionmeasurementRecent30SMSRangeBarR: SupplierSpcChartCalculation[] = [];
  spcMicroSectionRecent30SMSRangeBarR: SupplierSpcChartCalculation[] = [];
  spcFunctionVariableRecent30SMSRangeBarR: SupplierSpcChartCalculation[] = [];

  isSupplierFunctionAttributeSummaryResult: boolean;
  isMicroSectionParameterSummaryResult: boolean;
  isDimensionMeasurementSummaryResult: boolean;
  isFunctionVariableSummaryResult: boolean;
  isSpecWithMMCSummaryResult: boolean;
  isSpecWithLMCSummaryResult: boolean;
  isDateCodeSummaryResult: boolean;
  isBowTwistSummaryResult: boolean;
  isSupplierVisualInspectionsSummaryResult: boolean;
  isSupplierSapBasedTabSummaryResult: boolean;
  isSupplierPackingInspectionTabSummaryResult: boolean;
  isSupplierVisualInspectionTabSummaryResult: boolean;
  supplierTestReportTabId = 11;
  isSupplierTestReportTabSummaryResult: boolean;
  isSummaryPass: any;
  isMavericLotDetected: boolean;
  isAllTabResultPass: boolean;
  setFunctionVariablePassFailSummaryResult: string;
  setDimensionMeasurementPassFailSummaryResult: string;
  setMicroSectionPassFailSummaryResult: string;
  // indicator
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
  isNewSMSForm: boolean;
  isPackingQuantityGreaterThanZero: boolean;
  fractionDigits = 0;
  copyMessage = '';
  constructor(
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
    private _failedQuantityService: FailedQuantityService,
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
    private clipboard: Clipboard
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
    this.displaySupplierFunctionAttributeColumns = (new SupplierFunctionAttribute()).displayColumns();
    this.funMicroMeasurementParameterColumns = (new SupplierMicroSectionParameterModelColumns()).displayColumns();
    this.functionVariableColumns = (new SupplierMicroSectionParameterModelColumns()).displayColumns();
    this.dimensionMeasurementColumns = (new SupplierMicroSectionParameterModelColumns()).displayColumns();
    this.displayMasterInspectionColumns = (new SAPSamplingPlanModel()).displayColumns();
    this.displaySupplierSapBasedParameterColumns = (new SupplierSapBasedParameter()).displayColumns();
    this.displaySupplierTestReportColumns = (new SupplierTestReport()).displayColumns();
    this.microSectionParameterColumns = (new SupplierMicroSectionParameterModelColumns()).displayColumns();
    this.displaySupplierVisualInspectionColumns = (new SupplierVisualInspectionModel()).displayColumns();
    this.generateSpecWithMMCMainRowColumns();
    this.displaySupplierBowTwistColumns = (new SupplierBowTwist()).displayColumns();
    this.specType = specType;
    this.generateSpecWithLMCMainRowColumns();
  }

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
      partNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      manufacturePartNumber: new FormControl(Constants.Empty),
      manufacturer: new FormControl({ value: '', disabled: true }, [
        Validators.maxLength(50)
      ]),
      workCell: new FormControl(null),
      supplier: new FormControl(null),
      supplierContact: new FormControl(null),
      ip: new FormControl(Constants.Empty, [
        Validators.required
      ]),
      smsNo: new FormControl({ value: Constants.Empty, disabled: true }, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      pONumber: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)
      ]),

      quantity: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)
      ]),

      batchNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)
      ]),

      batchQuantity: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      quantityBalance: new FormControl(Constants.Empty, [
        Validators.required,
      ]),
      inspector: new FormControl(Constants.Empty, [
        Validators.required,
      ]),
      smsStatus: new FormControl(Constants.Empty),
      isEnabled: new FormControl(true, Validators.required),
      changeReason: new FormControl(Constants.Empty),
      supplierFunctionAttribute: new FormControl(Constants.Empty),
      supplierVisualInspection: new FormControl(Constants.Empty),
      supplierMicroSection: new FormControl(Constants.Empty),
      supplierSampling: new FormControl(Constants.Empty),
      supplierSapBasedParameter: new FormControl(Constants.Empty),
      supplierDimensionMeasurement: new FormControl(Constants.Empty),
      supplierFunctionVariable: new FormControl(Constants.Empty),
      result: new FormControl(Constants.Empty),
      packagingQuantity: new FormControl(null, [Validators.required, Validators.pattern(/\d/)]),
      resultDescription: new FormControl(Constants.Empty, [Validators.required,
      Validators.maxLength(1000)
      ]),
      supplierTestReport: new FormControl(Constants.Empty),
      manufactureDate: new FormControl(Constants.Empty),
      shelfLifeMonths: new FormControl(Constants.Empty),
      manufactureDCWeeks: new FormControl(Constants.Empty),
      manufactureDCYears: new FormControl(Constants.Empty),
      surfaceFinishingDate: new FormControl({ value: null, disabled: true }, [
        Validators.maxLength(50)
      ]),
      dateCodeDetails: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      expireDate: new FormControl({ value: null, disabled: true }, [
      ]),
      acceptReject: new FormControl({ value: null, disabled: true }),
      remainingDays: new FormControl(Constants.Empty),
      supplierTestReportTabDetails: new FormControl(),
      supplierBowTwists: new FormControl(null)
    });
  }

  ngOnInit() {
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


    this.currentUser = this.authService.retrieveUser();

    this.formInput.patchValue({
      inspector: this.currentUser.name
    });

    this.purchaseOrderState = purchaseOrderState;

    this.supplierId = (this.currentUser.supplier != null) ? this.currentUser.supplier.id : Constants.Empty;

    this.getDefaultResult();

    this.getAllDimensionDefault();

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

        }, () => { }, () => {
          const visData = this.supplierSamplingPlans.filter(k => k.mstrChar.includes(VIS));
          if (this.supplierSamplingPlans && visData) {
            if (visData[0] !== undefined) {
              this.visSampleSize = Number(visData[0].sampleSize);
            }
            const pageSortFilterInfo = new PageSortFilterInfo();
            pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setVisualnspectionParameterPageSortFilterInfo(pageSortFilterInfo);
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
                this.isSupplierVisualInspectionExpanded = false;
              } this.getActiveInspectionTools();
              this.setFailedQuantityOnChange(null, Constants.Empty, TabType.VisualInspection, MasterInspectionType.VIS, Constants.Empty);
            }, () => { }, () => {
              this.pageSortFilterInfo = new PageSortFilterInfo();
              this.pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
                {
                  expand: <Record<string, ExpandSelectCountInfo>[]>
                    [
                      this._certificateTypeService.expandCertificateTypeParameters()
                    ]
                };
              if (this.supplierSamplingPlans.length > 0 && !this.sapBasedParameterExpanded) {
                if (this.supplierSamplingPlans.filter(x => x.certificateType)[0] !== undefined) {
                  let certificateType = this.supplierSamplingPlans.filter(x => x.certificateType)[0].certificateType;
                  certificateType = certificateType !== '' && (certificateType !== null && certificateType !== undefined) ? certificateType : DefaultCommonConstants.Default;
                  this.getCertificateTypeParameterFilterInfo(certificateType);
                }
                const isCertificateType = this.supplierSamplingPlans.filter(x => x.certificateType)[0] === undefined;
                if (isCertificateType) {
                  this.getCertificateTypeParameterFilterInfo(DefaultCommonConstants.Default);
                }
                this._certificateTypeService.getAllData(this.pageSortFilterInfo).subscribe(data => {
                  if (data && data.value.length > 0) {
                    // this.sapBasedParameterExpanded = true;
                    if (data.value[0].certificateTypeParameters.length > 0) {
                      this.supplierSapBasedParameters = [];
                      data.value[0].certificateTypeParameters.map(record => {
                        this.supplierSapBasedParameter = new SupplierSapBasedParameter();
                        this.supplierSapBasedParameter = this.returnSapBasedObject(record);
                        this.supplierSapBasedParameters.push(this.supplierSapBasedParameter);
                      });
                    }
                    this.checkIsPassFail(null, this.supplierSapBasedParameters);
                  }
                  this.setFailedQuantityOnChange(null, Constants.Empty, TabType.SAPBased, MasterInspectionType.VIS, Constants.Empty);
                }, () => { }, () => {
                  const pageSupplierDateCodeSortFilterInfo = new PageSortFilterInfo();
                  pageSupplierDateCodeSortFilterInfo.expandInfo = this.apiService.setPartDateCodePageSortFilterInfo(pageSupplierDateCodeSortFilterInfo);
                  this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSupplierDateCodeSortFilterInfo).subscribe(data => {
                    this.sapPartInspectionPlan.partDateCode = data.value[0].partDateCode;
                    this.entity = this.sapPartInspectionPlan;
                    this.populatePartDateCode();
                    this.setFailedQuantityOnChange(null, Constants.Empty, TabType.DateCode, MasterInspectionType.VIS, Constants.Empty);
                  }, () => { }, () => {
                    this.setTotalFailedQuantityForAllSection();
                  });
                });
              }
            });
          }

        });
      });
    }
  }

  populatePartDateCode() {
    if (this.sapPartInspectionPlan.partDateCode !== null && this.sapPartInspectionPlan.partDateCode !== undefined) {
      this.formInput.patchValue({
        manufactureDate: this.sapPartInspectionPlan.partDateCode.manufactureDate != null ?
          new Date(this.sapPartInspectionPlan.partDateCode.manufactureDate) : Constants.Empty,
        shelfLifeMonths: this.sapPartInspectionPlan.partDateCode.shelfLifeMonths,
        manufactureDCWeeks: this.sapPartInspectionPlan.partDateCode.manufactureDCWeeks != null ?
          this.padLeft(this.sapPartInspectionPlan.partDateCode.manufactureDCWeeks.toString(), '0', 2) : 0,
        dateCodeLimit: this.sapPartInspectionPlan.partDateCode.dateCodeLimit,
        manufactureDCYears: this.sapPartInspectionPlan.partDateCode.manufactureDCYears != null ?
          this.padLeft(this.sapPartInspectionPlan.partDateCode.manufactureDCYears.toString(), '0', 4) : 0,
        surfaceFinishingDate: this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate != null ?
          new Date(this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate) : null,
        dateCodeDetails: this.sapPartInspectionPlan.partDateCode.dateCodeDetails,
        expireDate: this.sapPartInspectionPlan.partDateCode.expireDate != null ?
          new Date(this.sapPartInspectionPlan.partDateCode.expireDate) : null,
        remainingDays: this.getRemainingdays(this.sapPartInspectionPlan.partDateCode.dateCodeLimit),
        acceptReject: this.getAcceptReject()
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
          supplierDateCodeId: this.supplierMeasurement.supplierDateCodeId
        });

        this.vendorCode = (this.supplierMeasurement.supplier != null) ? this.supplierMeasurement.supplier.vendorCode : Constants.Empty;

        this.site = this.currentUser.site.code;

        this.supplierId = (this.currentUser.supplier != null) ? this.currentUser.supplier.id : Constants.Empty;

        this.sapPartInspectionPlanId = this.supplierMeasurement.sapPartInspectionPlanId;

        this.suppliercontactId = this.supplierMeasurement.supplierContactId;

        this.purchaseOrderId = this.supplierMeasurement.purchaseOrderId;

        this.workCellId = this.supplierMeasurement.workCellId;

        this.ip = this.supplierMeasurement.ip;

        this.partNo = this.supplierMeasurement.partNo;

        this.batchQuantity = this.supplierMeasurement.batchQuantity;

        this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

        this.setSMSStatus();

        this.isbatchQuantityValid = this.supplierMeasurement.batchQuantity > this.supplierMeasurement.purchaseOrder.quantity ? false : true;
        this.sapPartInspectionPlanId = data.value[0].sapPartInspectionPlanId;
        this.sapPartInspectionPlan = data.value[0].sapPartInspectionPlan;
        this.commodityId = this.sapPartInspectionPlan.commodityId;
        this.getSapPartInspectionSamplingPlans(this.sapPartInspectionPlanId);
        this.getDefaultTestReportData();
        this.getDefaultSAPDateCode();

        if (this.totalApprovedBatchQuantity === undefined) {
          this.totalApprovedBatchQuantity = 0;
          // total submitted\approved qty
          this.apiService.getTotalSubmittedApprovedBatchQty(this.sapPartInspectionPlanId, this.purchaseOrderId).subscribe(totalQty => {
            if (totalQty) {
              this.totalApprovedBatchQuantity = totalQty;
              this.setQuantityBalance(this.batchQuantity);
            }
          });
        }
      }
    }, () => { }, () => {
      if (this.supplierMeasurement.stateTypeId !== undefined && this.supplierMeasurement.stateTypeId === PartPlanStateType.Submitted_By_Supplier) {
        this.isSummarySectionVisible = true;
        this.isNewSMSForm = true;
        this.getSupplierSpcChartSummary(this.ip, this.recId);
      }
    });
  }


  private getDefaultTestReportData() {
    if (this.sapPartInspectionPlanId && !this.isSupplierTestReportExpanded) {
      const sapPageSortFilterInfo = new PageSortFilterInfo();
      sapPageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setTestReportPageSortFilterInfo(sapPageSortFilterInfo);
      this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, sapPageSortFilterInfo).subscribe(testReportData => {
        this.dataTypeId = testReportData.value[0].dataTypeId;
        this.specTypeId = testReportData.value[0].specTypeId;
        this.getDefaultTestReportDetails(testReportData);
      });
    }
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
        this.getVisualInspectionAndResultOreintedDefaults(this.sapPartInspectionPlan, null);
      }
    }, () => { }, () => {

      const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

      this.apiService.getSampleSize(this.partNo, this.vendorCode, DIM, this.supplierMeasurement.batchQuantity, proc.split('=')[0]).subscribe(dimData => {
        if (dimData && dimData.value.length > 0) {
          this.dimSampleSize = Number(dimData.value[0].smplSize);
        }
      }, () => { }, () => {
        const procVIS = this.samplingPlans.filter(x => x.mstrChar.includes('VIS')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('VIS'))[0].smplProc : 'INCOMING';

        this.apiService.getSampleSize(this.partNo, this.vendorCode, VIS, this.supplierMeasurement.batchQuantity, procVIS.split('=')[0]).subscribe(visData => {
          if (visData && visData.value.length > 0) {
            this.visSampleSize = Number(visData.value[0].smplSize);
            this.visualInspectionRejectionQty = visData.value[0].rejNo == null ? '0' : visData.value[0].rejNo;
          } else {
            this.visSampleSize = 0;
            this.visualInspectionRejectionQty = '0';
          }
        }, () => { }, () => {
          const procFUN = this.samplingPlans.filter(x => x.mstrChar.includes('FUN')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('FUN'))[0].smplProc : 'INCOMING';

          this.apiService.getSampleSize(this.partNo, this.vendorCode, FUN, this.supplierMeasurement.batchQuantity, procFUN.split('=')[0]).subscribe(funData => {
            if (funData && funData.value.length > 0) {
              this.funSampleSize = Number(funData.value[0].smplSize);
            }
          }, () => { }, () => {
            if (this.recId && !this.isFailedQuantityExpanded) {
              this._failedQuantityService.getFailedQuantityDataForSupplier(this.recId, null).subscribe(failedData => {
                this.setFailedQuantityForMasterInspectionCharacteristics(failedData);
              }, () => { }, () => {
              });
            }
          });
        });
      });
    }
    );
  }


  private getVisualInspectionAndResultOreintedDefaults(sAPPartInspectionPlan, commodityId: number) {
    const commodityID = sAPPartInspectionPlan != null ? sAPPartInspectionPlan.commodityId : commodityId;
    this._parameterManagementService.getParameterManagementDataByCommodityId(commodityID,
      this.sapPartInspectionPlanService.getPcCodes(this.samplingPlans)).subscribe(dataVIS => {
        this.resultVisualInspectionData = dataVIS.value;
        this.showHideTab(dataVIS.value);
      }, () => { }, () => {
        this._parameterManagementService.getParameterManagementDataByCommodityId(commodityID,
          this.sapPartInspectionPlanService.getPcCodes(this.samplingPlans)).subscribe(dataRO => {
            this.resultOrientedData = dataRO.value;
            this.showHideTab(dataRO.value);
            this.getFunctionAttributeRadioButtonTypes();
            if (this.supplierSpcChartSummary) {
              this.checkMavericLotDetected();
            }
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
    if (this.isMicroSectionExpanded) {
      updateSupplierMeasurementModel.supplierMicroSectionParameters = this.returnSupplierMicroSectionObject();
      updateSupplierMeasurementModel.supplierMicroSectionParameters = this.removeMicroSectionParameterExpandModels(this.supplierMicroSectionParameters, this.recId);

    } else {
      updateSupplierMeasurementModel.supplierMicroSectionParameters = null;
    }

    updateSupplierMeasurementModel.supplierSapBasedParameters = this.returnSupplierSapBasedObject(this.supplierSapBasedParameters, this.recId);

    if (this.isDimensionMeasurementExpanded) {
      updateSupplierMeasurementModel.supplierDimensionMeasurements = this.returnSupplierDimensionMeasurementObject();
      updateSupplierMeasurementModel.supplierDimensionMeasurements = this.removeDimensionMeasurementExpandModels(updateSupplierMeasurementModel.supplierDimensionMeasurements, this.recId);
    } else {
      updateSupplierMeasurementModel.supplierDimensionMeasurements = null;
    }

    updateSupplierMeasurementModel.supplierVisualInspections = this.removeVisualInspectionExpandModels(this.supplierVisualInspectionDetails, this.recId);

    if (this.isFunctionVariableExpanded) {
      updateSupplierMeasurementModel.supplierFunctionVariables = this.returnSupplierFunctionVariableObject();
      updateSupplierMeasurementModel.supplierFunctionVariables = this.removeFunctionVariableExpandModels(updateSupplierMeasurementModel.supplierFunctionVariables, this.recId);

    } else {
      updateSupplierMeasurementModel.supplierFunctionVariables = null;
    }

    updateSupplierMeasurementModel.supplierSamplingPlans = this.masterInspectionExpanded ? this.supplierSamplingPlans : null;

    updateSupplierMeasurementModel.resultId = this.getAcceptRejectResult();

    updateSupplierMeasurementModel.packagingQuantity = Number(this.formInput.controls[this.properties.packagingQuantity].value);

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

    updateSupplierMeasurementModel.stateTypeId = this.stateTypeId;

    updateSupplierMeasurementModel.submittedByUserId = this.submittedById;

    updateSupplierMeasurementModel.approveRejectedId = null;

    updateSupplierMeasurementModel.submittedDate = this.submittedByDate;

    updateSupplierMeasurementModel.mediaCode = this.partSapRequestFieldValue.mediaCode;
    updateSupplierMeasurementModel.maskedMPN = this.partSapRequestFieldValue.maskedMPN;
    if (this.checkSapBasedMatchFailRecord(updateSupplierMeasurementModel.supplierSapBasedParameters)) {
      updateSupplierMeasurementModel.sapBasedResultPassFailId = result[1].id;
    } else {
      updateSupplierMeasurementModel.sapBasedResultPassFailId = result[0].id;
    }

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

    addSupplierMeasurementModel.partNo = this.partNo;

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

    addSupplierMeasurementModel.packagingQuantity = Number(this.formInput.controls[this.properties.packagingQuantity].value);

    addSupplierMeasurementModel.supplierFunctionAttributes = this.returnFunctionAttributeObject();

    addSupplierMeasurementModel.supplierFunctionAttributes = this.removeFunctionAttributeExpandModels(this.supplierFunctionAttributeDetails, 0);

    addSupplierMeasurementModel.supplierMicroSectionParameters = this.returnSupplierMicroSectionObject();
    addSupplierMeasurementModel.supplierMicroSectionParameters = this.removeMicroSectionParameterExpandModels(this.supplierMicroSectionParameters, 0);

    addSupplierMeasurementModel.supplierSapBasedParameters = this.returnSupplierSapBasedObject(this.supplierSapBasedParameters, 0);

    addSupplierMeasurementModel.supplierVisualInspections = this.removeVisualInspectionExpandModels(this.supplierVisualInspectionDetails, 0);

    addSupplierMeasurementModel.supplierDimensionMeasurements = this.returnSupplierDimensionMeasurementObject();
    addSupplierMeasurementModel.supplierDimensionMeasurements = this.removeDimensionMeasurementExpandModels(addSupplierMeasurementModel.supplierDimensionMeasurements, 0);

    addSupplierMeasurementModel.supplierFunctionVariables = this.returnSupplierFunctionVariableObject();
    addSupplierMeasurementModel.supplierFunctionVariables = this.removeFunctionVariableExpandModels(addSupplierMeasurementModel.supplierFunctionVariables, 0);

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

    addSupplierMeasurementModel.stateTypeId = this.stateTypeId;

    addSupplierMeasurementModel.submittedByUserId = this.submittedById;

    addSupplierMeasurementModel.approveRejectedId = null;

    addSupplierMeasurementModel.submittedDate = this.submittedByDate;

    addSupplierMeasurementModel.approveRejectedDate = new Date();

    addSupplierMeasurementModel.mediaCode = this.partSapRequestFieldValue.mediaCode;
    addSupplierMeasurementModel.maskedMPN = this.partSapRequestFieldValue.maskedMPN;
    if (this.checkSapBasedMatchFailRecord(addSupplierMeasurementModel.supplierSapBasedParameters)) {
      addSupplierMeasurementModel.sapBasedResultPassFailId = result[1].id;
    } else {
      addSupplierMeasurementModel.sapBasedResultPassFailId = result[0].id;
    }



    return addSupplierMeasurementModel;
  }


  checkSapBasedMatchFailRecord(objectModelData: any): boolean {
    return objectModelData.some(r => (r.matchId === Numbers.Default));
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
        if (key.includes(this.actualValue)) {
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
        if (key.includes(this.actualValue)) {
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
        if (key.includes(this.actualValue)) {
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
        if (key.includes(this.actualValue)) {
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
        supplierMicroSectionActuals: element.supplierMicroSectionActuals,
        chartTypeId: element.chartTypeId,
        chartType: null
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
        supplierDimensionMeasurementActuals: element.supplierDimensionMeasurementActuals,
        chartTypeId: element.chartTypeId,
        chartType: null
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
        samplingSize: this.visSampleSize,
        toolsType: null,
        inspectionToolsTypeId: element.inspectionToolsTypeId,
        inspectionToolsType: null,
        partCountParameterId: element.partCountParameterId,
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
        supplierFunctionVariableActuals: element.supplierFunctionVariableActuals,
        chartTypeId: element.chartTypeId,
        chartType: null
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
    this.copyMessage = '';
    this.getVisualInspectionAndResultOreintedDefaults(null, value.commodityId);
    this.samplingPlans = value.sapPartInspectionPlanSamplingPlans;

    this.commodityId = value.commodityId;
    this.partSapRequestFieldValue = { mediaCode: value.mediaCode, maskedMPN: value.maskedMPN, manufacturer: value.manufacturer };
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

    this.expandSupplierTestReportTabDynamic();

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
            this.supplierMeasurement.supplierSamplingPlans.forEach(element => {
              if (this.supplierMeasurement.supplierSamplingPlans) {
                const matchedPartData = this.supplierMeasurement.supplierSamplingPlans.find(k => k.partInspectionSamplingPlanId === element.partInspectionSamplingPlanId);
                if (matchedPartData) {
                  element.mstrChar = matchedPartData.mstrChar,
                    element.smplProc = matchedPartData.smplProc;
                  element.certificateType = matchedPartData.certificateType;
                  element.partInspectionSamplingPlanId = matchedPartData.partInspectionSamplingPlanId;
                  element.sampleSize = element.sampleSize;
                }
              }
            });

            // this.supplierSamplingPlans = this.supplierSamplingPlans
            //   .map((item, i) => Object.assign({}, item, this.supplierMeasurement.supplierSamplingPlans[i]));
          }
        }
      }, () => { }, () => {
        if (this.recId && !this.isFailedQuantityExpanded) {
          this._failedQuantityService.getFailedQuantityDataForSupplier(this.recId, null).subscribe(data => {
            if (data && data.value.length > 0) {
              this.supplierFailedQuantity = data.value;
              this.isFailedQuantityExpanded = true;
              this.setTotalFailedQuantityForAllSection();
            }
          }, () => { }, () => {
          });
        }
        // this.setTotalFailedQuantityForAllSection();
      });
    } else {
      this.setTotalFailedQuantityForAllSection();
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
    this.copyMessage = '';
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
    this.totalApprovedBatchQuantity = 0;

    // total submitted\approved qty
    this.apiService.getTotalSubmittedApprovedBatchQty(this.sapPartInspectionPlanId, this.purchaseOrderId).subscribe(data => {
      if (data) {
        this.totalApprovedBatchQuantity = data;
        this.isbatchQuantityValid = (batchQuantity + this.totalApprovedBatchQuantity) > poQuantity ? false : true;
        this.formInput.patchValue({
          quantityBalance: (poQuantity - (batchQuantity + this.totalApprovedBatchQuantity))
        });
        this.formInput.patchValue({
          quantity: value.quantity
        });
      } else {
        this.totalApprovedBatchQuantity = 0;
        this.isbatchQuantityValid = batchQuantity > poQuantity ? false : true;
        this.formInput.patchValue({
          quantityBalance: (poQuantity - batchQuantity)
        });
        this.formInput.patchValue({
          quantity: value.quantity
        });
      }
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
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

    this.apiService.getSampleSize(this.partNo, this.vendorCode, DIM, batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        this.dimSampleSize = Number(data.value[0].smplSize);
      }
      this.generateDimensionalMeasurementDynamicColumns();
      this.generateMicrosectionDynamicColumns();
      this.generateBowTwistDynamicColumns();
      this.generateSpecWithMMCDynamicColumns();
      this.generateSpecWithLMCDynamicColumns();
    }, () => { }, () => {
      const procVIS = this.samplingPlans.filter(x => x.mstrChar.includes('VIS')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('VIS'))[0].smplProc : 'INCOMING';

      this.apiService.getSampleSize(this.partNo, this.vendorCode, VIS, batchQuantity, procVIS.split('=')[0]).subscribe(data => {
        if (data && data.value.length > 0) {
          this.visSampleSize = Number(data.value[0].smplSize);
          this.visualInspectionRejectionQty = data.value[0].rejNo == null ? '0' : data.value[0].rejNo;
        } else {
          this.visSampleSize = 0;
          this.visualInspectionRejectionQty = '0';
        }
      }, () => { }, () => {

        const procFUN = this.samplingPlans.filter(x => x.mstrChar.includes('FUN')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('FUN'))[0].smplProc : 'INCOMING';

        this.apiService.getSampleSize(this.partNo, this.vendorCode, FUN, batchQuantity, procFUN.split('=')[0]).subscribe(async data => {
          if (data && data.value.length > 0) {
            this.funSampleSize = Number(data.value[0].smplSize);
          }
          this.generateFunctionaVariableDynamicColumns();
          this.generateFunctionAttributeDynamicColumns();
        }, () => { }, () => {
          if (this.recId && !this.isFailedQuantityExpanded) {
            this._failedQuantityService.getFailedQuantityDataForSupplier(this.recId, null).subscribe(data => {
              if (data && data.value.length > 0) {
                this.supplierFailedQuantity = data.value;
                this.isFailedQuantityExpanded = true;
                this.setTotalFailedQuantityForAllSection();
              }
            }, () => { }, () => {

            });
          }
          setTimeout(() => {
            this.highlightFunctionVariable();
            this.highlightDimensionalMeasurement();
            this.highlightBowTwist();
            this.highlightMicroSection();
            this.highlightLMCControls();
            this.highlightMMCControls();
            this.setTotalFailedQuantityForAllSection();
          }, environment.timer.autoReturn);
        });
      });
    });

  }


  setFailedQuantityForMasterInspectionCharacteristics(data: ApiResponse<FailedQuantity>) {
    if (data && data.value.length > 0) {
      this.supplierFailedQuantity = data.value;
      this.isFailedQuantityExpanded = true;
      this.setTotalFailedQuantityForAllSection();
    }
  }

  setTotalFailedQuantityForAllSection() {
    if (this.supplierFailedQuantity) {
      this.setTotalFailedQuantityForFUN();
      this.setTotalFailedQuantityForDIM();
      this.setTotalFailedQuantityforVIS();
      if (this.supplierSamplingPlans) {
        this.supplierSamplingPlans.forEach(element => {
          if (element.mstrChar.includes(FUN)) {
            element.failedQuantity = this.totalFunFailedQuantity;
          }
          if (element.mstrChar.includes(DIM)) {
            element.failedQuantity = this.totalDimFailedQuantity;
          }
          if (element.mstrChar.includes(VIS)) {
            element.failedQuantity = this.totalVisFailedQuantity > this.visSampleSize ? this.visSampleSize : this.totalVisFailedQuantity;
          }

        });
      }
      this.totalFunFailedQuantity = 0;
      this.totalVisFailedQuantity = 0;
      this.totalDimFailedQuantity = 0;
      this.visSAPFailedQuantity = 0;
      this.visPackingFailedQuantity = 0;
      this.visTestReportFailedQuantity = 0;
      this.visVisualInspectionFailedQuantity = 0;
      this.visDateCodeFailedQuantity = 0;
    }
  }

  setTotalFailedQuantityforVIS() {
    const visFailedQtyData = this.supplierFailedQuantity.filter(k => k.masterInspectionTypeId === MasterInspectionType.VIS);
    if (visFailedQtyData) {

      this.setFailedQuantityForDateCode(visFailedQtyData);

      this.setFailedQuantityForTestReport(visFailedQtyData);

      this.setFailedQuantityForVisualInspection(visFailedQtyData);

      this.setFailedQuantityForPackingInspection(visFailedQtyData);

      this.setFailedQuantityForSAPBased(visFailedQtyData);

      this.totalVisFailedQuantity = this.visSAPFailedQuantity + this.visPackingFailedQuantity
        + this.visTestReportFailedQuantity + this.visVisualInspectionFailedQuantity + this.visDateCodeFailedQuantity;
    }
  }

  setFailedQuantityForDateCode(visFailedQtyData: FailedQuantity[]) {
    const visDateCodeData = visFailedQtyData.filter(k => k.tabId === TabType.DateCode);
    if (visDateCodeData && visDateCodeData.length > 0) {
      if (visDateCodeData[0].failedQuantityCount > 0) {
        this.visDateCodeFailedQuantity = this.visSampleSize;
      } else {
        this.visDateCodeFailedQuantity = 0;
      }
    }
  }

  setFailedQuantityForTestReport(visFailedQtyData: FailedQuantity[]) {
    const visTestReportData = visFailedQtyData.filter(k => k.tabId === TabType.TestReport);
    if (visTestReportData && visTestReportData.length > 0) {
      if (visTestReportData[0].failedQuantityCount > 0) {
        this.visTestReportFailedQuantity = this.visSampleSize;
      } else {
        this.visTestReportFailedQuantity = 0;
      }
    }
  }

  setFailedQuantityForVisualInspection(visFailedQtyData: FailedQuantity[]) {
    const visVisualInspectionData = visFailedQtyData.filter(k => k.tabId === TabType.VisualInspection);
    if (visVisualInspectionData && visVisualInspectionData.length > 0) {
      this.visVisualInspectionFailedQuantity = visVisualInspectionData[0].failedQuantityCount;
      this.visualInspectionFailIndicator = this.visVisualInspectionFailedQuantity === 0 ? 1 : 0;
    }
  }

  setFailedQuantityForPackingInspection(visFailedQtyData: FailedQuantity[]) {
    const visPackingInspectionData = visFailedQtyData.filter(k => k.tabId === TabType.PackingInspection);
    if (visPackingInspectionData && visPackingInspectionData.length > 0) {
      if (visPackingInspectionData[0].failedQuantityCount > 0) {
        this.visPackingFailedQuantity = this.visSampleSize;
      } else {
        this.visPackingFailedQuantity = 0;
      }
    }
  }

  setFailedQuantityForSAPBased(visFailedQtyData: FailedQuantity[]) {
    const visSAPBasedData = visFailedQtyData.filter(k => k.tabId === TabType.SAPBased);
    if (visSAPBasedData && visSAPBasedData.length > 0) {
      if (visSAPBasedData[0].failedQuantityCount > 0) {
        this.visSAPFailedQuantity = this.visSampleSize;
      } else {
        this.visSAPFailedQuantity = 0;
      }
    }
  }

  setTotalFailedQuantityForDIM() {
    if (this.supplierFailedQuantity) {
      const dimFailedQtyData = this.supplierFailedQuantity.filter(k => k.masterInspectionTypeId === MasterInspectionType.DIM
        && (Number(k.fieldName.replace(/^\D+/g, ''))) <= this.dimSampleSize);
      if (dimFailedQtyData) {
        for (let failedCount = 1; failedCount <= this.dimSampleSize; failedCount++) {
          const invidualTabRecords = dimFailedQtyData
            .filter(k => k.fieldName.trim() === `${this.AV}${failedCount}`);
          if (invidualTabRecords) {
            this.totalDimFailedQuantity +=
              invidualTabRecords.reduce((sum, item) => sum + item.failedQuantityCount, 0) > 0 ? 1 : 0;
          }
        }
      } else {
        this.totalDimFailedQuantity = 0;
      }
    }
  }

  setTotalFailedQuantityForFUN() {
    if (this.supplierFailedQuantity) {
      const funFailedQtyData = this.supplierFailedQuantity.filter(
        k => k.masterInspectionTypeId === MasterInspectionType.FUN && (Number(k.fieldName.replace(/^\D+/g, ''))) <= this.funSampleSize);
      if (funFailedQtyData) {
        for (let failedCount = 1; failedCount <= this.funSampleSize; failedCount++) {
          const invidualTabRecords = funFailedQtyData
            .filter(k => k.fieldName.trim() === `${this.AV}${failedCount}`);
          if (invidualTabRecords) {
            this.totalFunFailedQuantity +=
              invidualTabRecords.reduce((sum, item) => sum + item.failedQuantityCount, 0) > 0 ? 1 : 0;
          }
        }
      } else {
        this.totalFunFailedQuantity = 0;
      }
    }
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
    if (this.recId !== null && this.totalApprovedBatchQuantity === undefined) {
      return;
    }
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value;
    const poQuantity = this.formInput.controls[this.properties.quantity].value;
    const remainQty = poQuantity - this.totalApprovedBatchQuantity;
    this.isbatchQuantityValid = batchQuantity > remainQty ? false : true;
    this.formInput.patchValue({
      quantityBalance: (remainQty - value)
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
        this.sapPartInspectionPlanService.expandSAPPartInspectionPlan()
      ]
    };
  }




  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }
  isWorkCellModified() {
    return this.isModified(this.properties.workCell);
  }

  isWorkCellEmpty() {
    return this.hasError(this.properties.workCell, ValidationErrorCodes.required);
  }

  isSupplierEmpty() {
    return this.hasError(this.properties.supplier, ValidationErrorCodes.required);
  }

  isSupplierModified() {
    return this.isModified(this.properties.supplier);
  }

  isbatchQuantityModified() {
    return this.isModified(this.properties.batchQuantity);
  }

  isSupplierContactEmpty() {
    return this.hasError(this.properties.supplierContact, ValidationErrorCodes.required);
  }

  isSupplierContactModified() {
    return this.isModified(this.properties.supplierContact);
  }

  isIPEmpty() {
    return this.hasError(this.properties.ip, ValidationErrorCodes.required);
  }

  isIPHasWhiteSpace() {
    return this.hasError(
      this.properties.ip,
      ValidationErrorCodes.validateWhiteSpace
    );
  }

  isIPModified() {
    return this.isModified(this.properties.ip);
  }

  isPartNoModified() {
    return this.isModified(this.properties.partNo);
  }

  isPartNoEmpty() {
    return this.hasError(this.properties.partNo, ValidationErrorCodes.required);
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
    this.stateTypeId = PartPlanStateType.Pending_Approval_By_Jabil;
    this.submittedById = this.currentUser.id;
    this.submittedByDate = new Date();
    this.validateFormTabs();
  }

  saveRejectForm() {
    this.entity = this.supplierMeasurement;
    this.stateTypeId = this.currentUser.roles[0].roleEnumId === RoleType.Supplier ? PartPlanStateType.Rejected_By_Supplier : PartPlanStateType.Rejected_By_SQE;
    this.submittedById = this.currentUser.id;
    this.submittedByDate = new Date();
    this.saveForm();
  }

  validateFormTabs() {
    const BreakException = {};
    try {
      const supplierFunctionAttributeTab = this.tabConfig.filter(k => k.id === this.supplierFunctionAttributeTabId);
      const microSectionParameterTab = this.tabConfig.filter(k => k.id === this.microSectionParameterTabId);
      const dimensionMeasurementTab = this.tabConfig.filter(k => k.id === this.dimensionMeasurementTabId);
      const functionVariableTab = this.tabConfig.filter(k => k.id === this.functionVariableTabId);
      const specWithMMCTab = this.tabConfig.filter(k => k.id === this.specWithMMCId);
      const specWithLMCTab = this.tabConfig.filter(k => k.id === this.specWithLMCId);
      const bowTwistTab = this.tabConfig.filter(k => k.id === this.bowTwistTabId);
      const supplierVisualInspectionsTab = this.tabConfig.filter(k => k.id === this.supplierVisualInspectionsTabId);
      const supplierDateCodeTab = this.tabConfig.filter(k => k.id === this.dateCodeTabId);

      if (supplierFunctionAttributeTab && supplierFunctionAttributeTab.length > 0
        && supplierFunctionAttributeTab[0].isVisible === true && !this.isSupplierFunctionAttributeExpanded) {
        this.notificationService.showWarning(ToastMessage.FunctionAttributeRequired);
        throw BreakException;
      } else {
        if (this.supplierFunctionAttributeDetails.length > 0) {
          const acValues = Object.keys(this.supplierFunctionAttributeDetails[0]).map(x => x.includes(this.functionAttributeResult));
          let count = 0;
          acValues.map(x => {
            if (x) {
              count++;
            }
          });
          if (count !== this.funSampleSize) {
            this.notificationService.showWarning(ToastMessage.FunctionAttributeRequired);
            throw BreakException;
          }
          this.supplierFunctionAttributeDetails.map(mainRow => {
            if (mainRow.resultPassFailId === resultExpected[1].id) {
              if (mainRow.addedDefectTypeIds === undefined || mainRow.addedDefectTypeIds.length === 0) {
                this.notificationService.showWarning(ToastMessage.FunctionAttributeRequired);
                throw BreakException;
              }
            }
          });
        }
      }
      if (dimensionMeasurementTab && dimensionMeasurementTab.length > 0
        && dimensionMeasurementTab[0].isVisible === true && !this.isDimensionMeasurementExpanded) {
        this.notificationService.showWarning(ToastMessage.DimensionalMeasurementsRequired);
        throw BreakException;
      } else {
        if (this.supplierDimensionMeasurements.length > 0) {
          let count = 0;
          const firstRow = this.supplierDimensionMeasurements[0];
          const keysFirstRow = Object.keys(firstRow);
          keysFirstRow.map((key) => {
            if (key.includes(this.actualValue)) {
              count++;
            }
          });
          this.supplierDimensionMeasurements.map(mainRow => {
            const keys = Object.keys(mainRow);
            keys.map((key) => {
              if (key.includes(this.actualValue)) {
                if (mainRow[key] === Constants.Empty) {
                  this.notificationService.showWarning(ToastMessage.DimensionalMeasurementsRequired);
                  throw BreakException;
                }
              }
            });
          });
          if (count !== this.dimSampleSize) {
            this.notificationService.showWarning(ToastMessage.DimensionalMeasurementsRequired);
            throw BreakException;
          }

        }
      }
      if (functionVariableTab && functionVariableTab.length > 0
        && functionVariableTab[0].isVisible === true && !this.isFunctionVariableExpanded) {
        this.notificationService.showWarning(ToastMessage.FunctionVariableRequired);
        throw BreakException;
      } else {
        if (this.supplierFunctionVariables.length > 0) {
          let count = 0;
          const firstRow = this.supplierFunctionVariables[0];
          const keysFirstRow = Object.keys(firstRow);
          keysFirstRow.map((key) => {
            if (key.includes(this.actualValue)) {
              count++;
            }
          });
          this.supplierFunctionVariables.map(mainRow => {
            const keys = Object.keys(mainRow);
            keys.map((key) => {
              if (key.includes(this.actualValue)) {
                if (mainRow[key] === Constants.Empty) {
                  this.notificationService.showWarning(ToastMessage.FunctionVariableRequired);
                  throw BreakException;
                }
              }
            });
          });
          if (count !== this.funSampleSize) {
            this.notificationService.showWarning(ToastMessage.FunctionVariableRequired);
            throw BreakException;
          }
        }
      }
      if (microSectionParameterTab && microSectionParameterTab.length > 0
        && microSectionParameterTab[0].isVisible === true && !this.isMicroSectionExpanded) {
        this.notificationService.showWarning(ToastMessage.MicroSectionParameterRequired);
        throw BreakException;
      } else {
        if (this.supplierMicroSectionParameters.length > 0) {
          let count = 0;
          const firstRow = this.supplierMicroSectionParameters[0];
          const keysFirstRow = Object.keys(firstRow);
          keysFirstRow.map((key) => {
            if (key.includes(this.actualValue)) {
              count++;
            }
          });
          this.supplierMicroSectionParameters.map(mainRow => {
            const keys = Object.keys(mainRow);
            keys.map((key) => {
              if (key.includes(this.actualValue)) {
                if (mainRow[key] === Constants.Empty) {
                  this.notificationService.showWarning(ToastMessage.MicroSectionParameterRequired);
                  throw BreakException;
                }
              }
            });
          });
          if (count !== this.dimSampleSize) {
            this.notificationService.showWarning(ToastMessage.MicroSectionParameterRequired);
            throw BreakException;
          }
        }
      }
      if (bowTwistTab && bowTwistTab.length > 0
        && bowTwistTab[0].isVisible === true && !this.isBowTwistExpanded) {
        this.notificationService.showWarning(ToastMessage.BowTwistRequired);
        throw BreakException;
      } else {
        if (this.supplierBowTwists.length > 0) {
          let actualValueCount = 0;
          this.supplierBowTwists.forEach(element => {
            const keys = Object.keys(element);
            keys.forEach(key => {
              if (key.includes(this.actualValue)) {
                actualValueCount++;
                if (element[key] === Constants.Empty) {
                  this.notificationService.showWarning(ToastMessage.BowTwistRequired);
                  throw BreakException;
                }
              }
            });
            if ((actualValueCount !== this.dimSampleSize)) {
              this.notificationService.showWarning(ToastMessage.BowTwistRequired);
              throw BreakException;
            } else {
              actualValueCount = 0;
            }
          });
        }
      }

      if (supplierDateCodeTab && supplierDateCodeTab.length > 0
        && supplierDateCodeTab[0].isVisible === true && !this.isDateCodeExpanded) {
        this.notificationService.showWarning(ToastMessage.DateCodeRequired);
        throw BreakException;
      } else {
        if (supplierDateCodeTab && supplierDateCodeTab.length > 0
          && supplierDateCodeTab[0].isVisible === true && this.isDateCodeExpanded) {

          const dateCode = this.validateDateCode();
          if (dateCode.manufactureDate !== null && dateCode.shelfLifeMonths !== null &&
            dateCode.manufactureDCWeeks !== null && dateCode.manufactureDCYears !== null &&
            (!this.isCommodityPCBOrPWB || dateCode.surfaceFinishingDate !== null) &&
            dateCode.dateCodeDetails !== null && dateCode.expireDate !== null
            && dateCode.remainingDays !== null && this.formInput.controls[this.properties.acceptReject].value !== null) {

          } else {
            this.notificationService.showWarning(ToastMessage.DateCodeRequired);
            throw BreakException;
          }
        }
      }
      if (specWithMMCTab && specWithMMCTab.length > 0
        && specWithMMCTab[0].isVisible === true && !this.isMPositionToleranceExpanded) {
        this.notificationService.showWarning(ToastMessage.SpecWithMMCRequired);
        throw BreakException;
      } else {
        if (this.supplierMPositionToleranceTabDetails.length > 0) {
          let childRowActualValueCount = 0;
          this.supplierMPositionToleranceTabDetails.forEach(mainRow => {
            mainRow.childDataSource.map(childRow => {
              const childActualValueField = Object.keys(childRow);
              childActualValueField.map(key => {
                if (key.includes(this.actualValue)) {
                  childRowActualValueCount++;
                  if (childRow[key] === Constants.Empty) {
                    this.notificationService.showWarning(ToastMessage.SpecWithMMCRequired);
                    throw BreakException;
                  }
                }
              });
              if ((childRowActualValueCount !== this.dimSampleSize)) {
                this.notificationService.showWarning(ToastMessage.SpecWithMMCRequired);
                throw BreakException;
              } else {
                childRowActualValueCount = 0;
              }
            });
          });
        }
      }
      if (specWithLMCTab && specWithLMCTab.length > 0
        && specWithLMCTab[0].isVisible === true && !this.isLPositionToleranceExpanded) {
        this.notificationService.showWarning(ToastMessage.SpecWithLMCRequired);
        throw BreakException;
      } else {
        if (this.supplierLPositionToleranceTabDetails.length > 0) {
          let childRowActualValueCount = 0;
          this.supplierLPositionToleranceTabDetails.forEach(mainRow => {
            mainRow.childDataSource.map(childRow => {
              const childActualValueField = Object.keys(childRow);
              childActualValueField.map(key => {
                if (key.includes(this.actualValue)) {
                  childRowActualValueCount++;
                  if (childRow[key] === Constants.Empty) {
                    this.notificationService.showWarning(ToastMessage.SpecWithLMCRequired);
                    throw BreakException;
                  }
                }
              });
              if ((childRowActualValueCount !== this.dimSampleSize)) {
                this.notificationService.showWarning(ToastMessage.SpecWithMMCRequired);
                throw BreakException;
              } else {
                childRowActualValueCount = 0;
              }
            });
          });
        }
      }
      if (this.sapBasedParameterExpanded) {
        if (this.supplierSapBasedParameters.length > 0) {
          this.supplierSapBasedParameters.forEach(element => {
            if (element.matchResult === yesNoOptions[1].name && (element.defectType === undefined || element.defectType === Constants.Empty)) {
              this.notificationService.showWarning(ToastMessage.SAPBasedRequired);
              throw BreakException;
            }
          });
        }
      }

      if (this.formInput.controls[this.properties.resultDescription].value === Constants.Empty &&
        this.formInput.controls[this.properties.packagingQuantity].value === Constants.Empty &&
        this.packingInspectionFailIndicator === 2) {
        this.notificationService.showWarning(ToastMessage.PackingInspectionRequired);
        throw BreakException;
      }

      if (this.formInput.controls[this.properties.resultDescription].value === Constants.Empty &&
        this.formInput.controls[this.properties.packagingQuantity].value === Constants.Empty &&
        (this.packingInspectionFailIndicator === undefined || this.packingInspectionFailIndicator === 2)) {
        this.packingInspectionFailIndicator = 1;
        this.notificationService.showWarning(ToastMessage.PackingInspectionRequired);
        throw BreakException;
      }

      if (this.supplierTestReportTabDetails && this.supplierTestReportTabDetails.length <= 0
        && !this.isSupplierTestReportExpanded) {
        this.notificationService.showWarning(ToastMessage.TestReportRequired);
        throw BreakException;
      } else {
        if (this.supplierTestReportTabDetails && this.supplierTestReportTabDetails.length > 0
          && this.isSupplierTestReportExpanded) {
          this.supplierTestReportTabDetails.map(row => {
            if (this.testReportFailIndicator === 2) {
              this.notificationService.showWarning(ToastMessage.TestReportRequired);
              throw BreakException;
            }
            if ((row.inspectionDetails === undefined || row.inspectionDetails === Constants.Empty)) {
              this.notificationService.showWarning(ToastMessage.TestReportRequired);
              throw BreakException;
            } else if (row.resultExpected === resultExpected[1].name && (row.selectedDynamicId === null || row.selectedDynamicId === 0)) {
              this.notificationService.showWarning(ToastMessage.TestReportRequired);
              throw BreakException;
            } else if ((this.recId === null || this.recId === undefined || this.recId === 0)) {
              if ((row.supplierTestReportAttachments === undefined || row.supplierTestReportAttachments.length === 0)) {
                this.notificationService.showWarning(ToastMessage.AttachmentRequired);
                throw BreakException;
              }
            }
          });
        }
      }

      if (supplierVisualInspectionsTab && supplierVisualInspectionsTab.length > 0
        && supplierVisualInspectionsTab[0].isVisible === true && !this.isSupplierVisualInspectionExpanded) {
        this.notificationService.showWarning(ToastMessage.VisualInspectionRequired);
        throw BreakException;
      } else {
        if (this.supplierVisualInspectionDetails && this.supplierVisualInspectionDetails.length > 0
          && this.isSupplierVisualInspectionExpanded) {
          this.supplierVisualInspectionDetails.map(row => {
            if (this.visualInspectionFailIndicator === 2) {
              this.notificationService.showWarning(ToastMessage.VisualInspectionRequired);
              throw BreakException;
            } else if ((row.inspectionDetails === undefined || row.inspectionDetails === null || row.inspectionDetails === Constants.Empty)) {
              this.notificationService.showWarning(ToastMessage.VisualInspectionRequired);
              throw BreakException;
            } else if ((row.selectedDynamicId === null || row.selectedDynamicId === 0)) {
              this.notificationService.showWarning(ToastMessage.VisualInspectionRequired);
              throw BreakException;
            }
          });
        }
      }


      super.saveForm();
    } catch (e) {
      if (e !== BreakException) { throw e; }
    }
  }

  saveGenerateResultForm() {
    this.entity = this.supplierMeasurement;
    this.stateTypeId = PartPlanStateType.Submitted_By_Supplier;
    this.submittedById = this.currentUser.id;
    this.submittedByDate = new Date();
    this.validateFormTabs();
  }

  isSaveAsDraftDisabled() {
    const batchNo = this.formInput.controls[this.properties.batchNo].value;
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value;
    const pONumber = this.formInput.controls[this.properties.pONumber].value;

    if (batchNo === '' || batchQuantity === '' || !pONumber || !this.isbatchQuantityValid) {
      return true;
    } else {
      return false;
    }
    // return !this.enableSaveButton
    //    || !this.formInput.valid
    //   || !this.formInput.dirty;
  }

  isSubmitDisabled() {
    if (this.stateTypeId !== undefined && this.stateTypeId === PartPlanStateType.Draft && this.formInput.valid) {
      return false;
    }
    if (this.recId && this.recId !== 0) {
      if (this.supplierMeasurement.stateTypeId !== undefined && this.supplierMeasurement.stateTypeId === PartPlanStateType.Submitted_By_Supplier) {
        if (this.isDisableBasedMaverikLotAndOverAllResult()) {
          return true;
        } else {
          return false;
        }
      }
    }
    return !this.enableSaveButton || this.isDisableSubmitOverAllResult()
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

  isRejectDisabled() {
    if (this.stateTypeId !== undefined && this.stateTypeId === PartPlanStateType.Draft && this.formInput.valid) {
      return false;
    }
    if (this.recId && this.recId !== 0) {
      if (this.isDisabledRejectButton()) {
        return true;
      } else {
        return false;
      }
    }
    return !this.enableSaveButton || this.isDisableSubmitOverAllResult()
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

  isDisableSubmitOverAllResult() {
    if (this.isFunctionAttributeFail || this.isMicroSectionParameterFail || this.isDimensionalMeasurementFail
      || this.isFunctionVariableFail || this.isMPositionToleranceFail || this.isLPositionToleranceFail
      || this.isBowTwistFail || this.isPackingInspectionFail
      || this.isTestReportFail || this.isPassFailResultVisualInspection) {
      return true;
    } else {
      return false;
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
      lowerToleranceValue = parseFloat(String(Number(element.normalValue) - Number(element.lowerTolerance))).toFixed(element.accuracy);

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
      chartTypeId: element.chartTypeId ?? null,
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
    this.xBarRActualValueFor30 = this.parameterFunVariableActualValuesFor30.filter(x => x.chartTypeId === ChartType.xBarS || ChartType.RangeXBarS);
    if (this.xBarRActualValueFor30 && this.xBarRActualValueFor30.length > 0) {
      plotDataValues = this.xBarRActualValueFor30.filter(x => x.parameterId === element.parameterManagementId
        && x.chartTypeId === ChartType.xBarS || ChartType.RangeXBarS);
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
      lowerToleranceValue = parseFloat(String(Number(element.normalValue) - Number(element.lowerTolerance))).toFixed(element.accuracy);
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
      supplierMicroSectionActuals: this.recId !== 0 && this.recId !== null ? element.supplierMicroSectionActuals : [],
      cpk: this.recId !== 0 && this.recId !== null ? cpk !== undefined ? cpk.toFixed(2) : 0 :
        (this.recId === null || this.recId === 0 || this.recId === undefined) && cpk !== undefined ? cpk.toFixed(2) : 0,
      ucl: ucl ?? 0,
      lcl: lcl ?? 0,
      cpkU: cpkU ?? 0,
      cpkL: cpkL ?? 0,
      isLableWarning: (cpk < cpkTargetValue) ? true : false,
      average25: stdAvgFor25 !== undefined ? stdAvgFor25.averageValueFor25SMS ?? 0 : 0,
      average30: stdAvgFor30 !== undefined ? stdAvgFor30.averageValueFor30SMS ?? 0 : 0,
      chartTypeId: element.chartTypeId ?? null,
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
    this.xBarRActualValueFor25 = this.parameterMicroSectionActualValuesFor25.filter(x => x.chartTypeId === ChartType.IMR && x.parameterId === element.parameterManagementId);
    this.xBarRActualValueFor30 = this.parameterMicroSectionActualValuesFor30.filter(x => x.chartTypeId === ChartType.IMR && x.parameterId === element.parameterManagementId);
    if (this.parameterMicroSectionActualValuesFor30 && this.parameterMicroSectionActualValuesFor30.length > 0) {
      plotDataValues = this.parameterMicroSectionActualValuesFor30.filter(x => x.parameterId === element.parameterManagementId
        && (x.chartTypeId === ChartType.IMR || x.chartTypeId === ChartType.RangeIMR));
      const smsFormDataRangeIMRFor30 = this.parameterMicroSectionActualValuesFor30.filter(y => y.chartTypeId === ChartType.RangeIMR && y.parameterId === element.parameterManagementId);
      rangeBarAverageFor30 = this.apiService.getSPCChartCalculationRBar(smsFormDataRangeIMRFor30);
    }
    if (this.parameterMicroSectionActualValuesFor25 && this.parameterMicroSectionActualValuesFor25.length > 0) {
      const smsFormDataRangeIMRFor25 = this.parameterMicroSectionActualValuesFor25.filter(y => y.chartTypeId === ChartType.RangeIMR && y.parameterId === element.parameterManagementId);
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
      lowerToleranceValue = parseFloat(String(Number(element.normalValue) - Number(element.lowerTolerance))).toFixed(element.accuracy);
    }

    let plotDataValues;
    let rangeAverageFor25;
    if (element.chartTypeId === ChartType.xBarR) {
      this.xBarRActualValueFor25 = this.parameterDimMeasurementActualValuesFor25.filter(x => x.chartTypeId === ChartType.xBarR);
      this.xBarRActualValueFor30 = this.parameterDimMeasurementActualValuesFor30.filter(x => x.chartTypeId === ChartType.xBarR);
      if (this.parameterDimMeasurementActualValuesFor30 && this.parameterDimMeasurementActualValuesFor30.length > 0) {
        plotDataValues = this.parameterDimMeasurementActualValuesFor30.filter(x => x.parameterId === element.parameterManagementId
          && x.chartTypeId === ChartType.xBarR || x.chartTypeId === ChartType.RangeXBarR);
        // range control xBarR
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
      chartTypeId: element.chartTypeId ?? null,
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

  getUnit(dataTypeId: number) {
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
      isEnabled: element.isEnabled,
      resultId: element.resultId === resultExpected[0].id ? resultExpected[0].id : resultExpected[1].id,
      supplierMeasurementSubmissionId: supplierMeasurementSubmissionId ?? 0,
      parameterManagementId: element.parameterManagementId ?? 0,
      resultPassFailId: element.resultPassFailId,
      resultActualId: element.resultActualId,
      resultActual: element.resultActualId === resultExpected[0].id ? resultExpected[0].name : resultExpected[1].name,
      defectType: element.defectTypes.map(x => x.defectTypeName).join(','),
      addedDefectTypeIds: this.getDefectTypeIds(element.defectTypes.map(x => x.id)),
      enableRowAddDefectTypes: element.supplierFunctionAttributeActuals.some(x => x.actualTextValue.includes('2')),
      supplierFunctionAttributeActuals: this.recId !== 0 ? element.supplierFunctionAttributeActuals : []
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
    this.generateFunctionAttributeDynamicColumns();
    this.tableWidthForFunctionAttribute = this.constantTablewidth + (this.approximateWidthForEachTextBox * Number(this.funSampleSize));
    if (this.recId != null && !this.isSupplierFunctionAttributeExpanded) {
      this.getUpdateSupplierFunctionAttribute(pageSortFilterInfo);
    } else {
      if (!this.isSupplierFunctionAttributeExpanded) {
        this.getAddSupplierFunctionAttribute(pageSortFilterInfo);
      }
    }
  }

  generateFunctionAttributeDynamicColumns() {
    this.displaySupplierFunctionAttributeColumns = (new SupplierFunctionAttribute()).displayColumns();
    if (this.funSampleSize) {
      Array(this.funSampleSize)
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
    }
  }

  getExpandedSupplierMicroSectionParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.generateMicrosectionDynamicColumns();
    if (this.recId !== null && !this.isMicroSectionExpanded) {
      this.getUpdateSupplierMicroSection(pageSortFilterInfo);
    } else {
      if (!this.isMicroSectionExpanded) {
        this.getAddSupplierMicroSection(pageSortFilterInfo);
      }
    }
  }

  generateMicrosectionDynamicColumns() {
    this.microSectionParameterColumns = (new SupplierMicroSectionParameterModelColumns()).displayColumns();
    if (this.dimSampleSize) {
      Array(Number(this.dimSampleSize))
        .fill(1)
        .forEach((value, index) => {
          const tableColumn = new TableColumn();
          tableColumn.field = `${this.actualValueMicroSection}${value + index}`;
          tableColumn.header = `ActualValue${value + index}`;
          const objColumnInfo = new ColumnInfo();
          objColumnInfo.type = ColumnType.TextBox;
          tableColumn.columnInfo = objColumnInfo;
          tableColumn.isVisible = true;
          tableColumn.isExport = true;
          this.microSectionParameterColumns.push(tableColumn);
        });
    }
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
      samplingSize: this.recId !== null ? element.samplingSize : this.visSampleSize,

      supplierVisualInspectionDefectTypes: [],
      defectType: (this.recId !== null && this.recId !== 0) ? element.defectTypes?.map(x => x.defectTypeName).join(',') : '',
      addedDefectTypeIds: (this.recId !== null && this.recId !== 0) ? element.defectTypes !== undefined ? this.getDefectTypeIds(element.defectTypes?.map(x => x.id)) : '' : '',

      totalDefectQty: this.recId !== null ? element.totalDefectQty : null,
      enableRowAddDefectTypes: element.enableRowAddDefectTypes,
      resultActualId: this.recId !== null ? element.resultActualId : 2,
      partCountParameterId: element.partCountParameterId !== 0 ? element.partCountParameterId : element.id
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
        if (element.inspectionDetails !== null && element.inspectionDetails !== undefined) {
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

    this.apiService.getSampleSize(this.partNo, this.vendorCode, VIS, batchQuantity, proc.split('=')[0]).subscribe(data => {
      if (data && data.value.length > 0) {
        this.visSampleSize = Number(data.value[0].smplSize);
        this.visualInspectionRejectionQty = data.value[0].rejNo == null ? '0' : data.value[0].rejNo;
      } else {
        this.visSampleSize = 0;
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
    this.generateDimensionalMeasurementDynamicColumns();
    if (this.recId !== null && !this.isDimensionMeasurementExpanded) {
      this.getUpdateSupplierDimensionMeasurement(pageSortFilterInfo);
    } else {
      if (!this.isDimensionMeasurementExpanded) {
        this.getAddSupplierDimensionMeasurement(pageSortFilterInfo);
      }
    }
  }

  generateDimensionalMeasurementDynamicColumns() {
    this.dimensionMeasurementColumns = (new SupplierMicroSectionParameterModelColumns()).displayColumns();
    if (this.dimSampleSize) {
      Array(Number(this.dimSampleSize))
        .fill(1)
        .forEach((value, index) => {
          const tableColumn = new TableColumn();
          tableColumn.field = `${this.actualValueDimensionMeasurement}${value + index}`;
          tableColumn.header = `ActualValue${value + index}`;
          const objColumnInfo = new ColumnInfo();
          objColumnInfo.type = ColumnType.TextBox;
          tableColumn.columnInfo = objColumnInfo;
          tableColumn.isVisible = true;
          tableColumn.isExport = true;
          this.dimensionMeasurementColumns.push(tableColumn);
        });
    }
  }

  getExpandedSupplierFunctionVariables(pageSortFilterInfo: PageSortFilterInfo) {
    this.generateFunctionaVariableDynamicColumns();
    if (this.recId !== null && !this.isFunctionVariableExpanded) {
      this.getUpdateSupplierFunctionVariable(pageSortFilterInfo);
    } else {
      if (!this.isFunctionVariableExpanded) {
        this.getAddSupplierFunctionVariable(pageSortFilterInfo);
      }
    }
  }

  generateFunctionaVariableDynamicColumns() {
    this.functionVariableColumns = (new SupplierMicroSectionParameterModelColumns()).displayColumns();
    if (this.funSampleSize) {
      Array(this.funSampleSize)
        .fill(1)
        .forEach((value, index) => {
          const tableColumn = new TableColumn();
          tableColumn.field = `${this.actualValueFunctionVariable}${value + index}`;
          tableColumn.header = `ActualValue${value + index}`;
          const objColumnInfo = new ColumnInfo();
          objColumnInfo.type = ColumnType.TextBox;
          tableColumn.columnInfo = objColumnInfo;
          tableColumn.isVisible = true;
          tableColumn.isExport = true;
          this.functionVariableColumns.push(tableColumn);
        });
    }
  }

  private returnDataArray(element: any): any {
    // this.recId = null;
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

  testInspectionDetailsTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      this.formInput.markAsDirty();
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
      // const supplierTestReport = this.formInput.controls[this.properties.supplierTestReport];
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
      // Draft-Submit
      // if (!this.isSupplierTestReportAttachmentUploaded || !this.isInspectionDetailsMaxCharactersValid) {
      //   supplierTestReport.setValidators(Validators.required);
      //   supplierTestReport.updateValueAndValidity();
      // } else {
      //   supplierTestReport.setErrors(null);
      //   supplierTestReport.clearValidators();
      //   supplierTestReport.updateValueAndValidity();
      // }
    }
    return this.isSupplierTestReportAttachmentUploaded;
  }

  inspectionDetailsMaxCharactersValid() {
    this.isInspectionDetailsMaxCharactersValid = true;
    if (this.supplierTestReportTabDetails) {
      // const supplierTestReport = this.formInput.controls[this.properties.supplierTestReport];
      this.supplierTestReportTabDetails.forEach(element => {
        if (element.inspectionDetails !== undefined) {
          if (element.inspectionDetails.length > 256) {
            this.isInspectionDetailsMaxCharactersValid = false;
          }
        }
      });

      // Draft-Submit
      // if (!this.isInspectionDetailsMaxCharactersValid || !this.isSupplierTestReportAttachmentUploaded) {
      //   supplierTestReport.setValidators(Validators.required);
      //   supplierTestReport.updateValueAndValidity();
      // } else {
      //   supplierTestReport.setErrors(null);
      //   supplierTestReport.clearValidators();
      //   supplierTestReport.updateValueAndValidity();
      // }
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

  // getDefaultVisualInspectionParameter(sAPPartInspectionPlan, commodityId: number) {
  //   const commodityID = sAPPartInspectionPlan != null ? sAPPartInspectionPlan.commodityId : commodityId;
  //   this._parameterManagementService.getParameterManagementDataByCommodityId(commodityID, this.sapPartInspectionPlanService.getPcCodes(this.samplingPlans)).subscribe(data => {
  //     this.resultVisualInspectionData = data.value;
  //     this.showHideTab(data.value);
  //   });
  // }

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

  supplierFunctionAttributeDropDownChangeEvent(event) {
    const BreakException = {};
    let count = 0;
    if (event !== undefined && event.row !== undefined) {
      const resultData = this.supplierFunctionAttributeDetails.filter(x => x.id === event.row.id)[0];
      try {
        const supplierFunctionAttributeKeys = Object.keys(resultData);
        supplierFunctionAttributeKeys.forEach((key) => {
          if (key.includes(this.actualValueFunctionAttribute)) {
            if (Number(resultData[key]) === resultExpected[1].id) {
              resultData.enableRowAddDefectTypes = true;
              resultData.resultPassFailId = resultExpected[1].id;
              count++;
              throw BreakException;
            }
          }
        });
        if (count === 0) {
          resultData.enableRowAddDefectTypes = false;
        }
      } catch (e) {
        if (e !== BreakException) { throw e; }
      }

      if (Number(event.dropDownChangedEvent.target.value) === resultExpected[1].id) {
        if (!this.isPassFailResultFunctionAttribute) {
          this.resultPassFail = result[1].name;
          resultData.resultPassFailId = resultExpected[1].id;
          this.isPassFailResultFunctionAttribute = true;
        }
      } else {
        this.resultPassFail = this.resultPassFail === result[1].name ? result[1].name : result[0].name;
        resultData.addedDefectTypeIds = [];
        resultData.defectType = '';
        resultData.resultPassFailId = resultExpected[0].id;


      }
      this.formInput.markAsDirty();

      this.setFunctionAttributePassFail();
      if (event.dropDownChangedEvent && event.dropDownChangedEvent.target && event.dropDownChangedEvent.target.id) {
        const actualValue = (<HTMLInputElement>document.getElementById(event.dropDownChangedEvent.target.id)).value;
        this.setFailedQuantityOnChange(event, actualValue, TabType.ResultOriented, MasterInspectionType.FUN, event.dropDownChangedEvent.target.id);
        this.setTotalFailedQuantityForAllSection();
      }

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
    }
    return this.isFunctionAttributeInspectionDetailEmpty;
  }

  checkIsPassFail(supplierFunctionAttributes?, sapBasedParameters?) {
    if (supplierFunctionAttributes && supplierFunctionAttributes != null) {
      supplierFunctionAttributes.map(element => {
        if (this.recId && this.recId !== null && this.recId !== 0 && element.supplierFunctionAttributeActuals.some(x => x.actualTextValue.includes('2'))) {
          this.resultPassFail = result[1].name;
          supplierFunctionAttributes.resultPassFailId = result[1].id;
          this.isPassFailResultFunctionAttribute = true;
        } else {
          this.resultPassFail = result[0].name;
          supplierFunctionAttributes.resultPassFailId = result[0].id;
          this.isPassFailResultFunctionAttribute = false;
        }

      });
    }
    if (sapBasedParameters && sapBasedParameters !== null) {
      if (this.checkSapBasedMatchFailRecord(sapBasedParameters)) {
        this.resultPassFailSapBased = result[1].name;
        this.isPassFailResultSapBased = true;
        this.sapBasedFailIndicator = 0;
      } else {
        this.resultPassFailSapBased = result[0].name;
        this.isPassFailResultSapBased = true;
        this.sapBasedFailIndicator = 1;
      }

    }
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
              this.visualInspectionResultPassFailId = result[0].id;
              this.isPassFailResultVisualInspection = false;
              this.visualInspectionFailIndicator = 1;
            } else {
              this.resultPassFailVisualInspection = result[1].name;
              this.visualInspectionResultPassFailId = result[1].id;
              this.isPassFailResultVisualInspection = true;
              this.visualInspectionFailIndicator = 0;
              throw BreakException;
            }
          } else {
            const total = supplierVisualInspections.filter(n => n.dataTypeId === DataType.NONCTQ).map(x => Number(x.totalDefectQty)).reduce((a, b) => a + b, 0);
            if (this.visualInspectionRejectionQty === '0' && total === 0) {
              this.resultPassFailVisualInspection = result[0].name;
              this.visualInspectionResultPassFailId = result[0].id;
              this.isPassFailResultVisualInspection = false;
              this.visualInspectionFailIndicator = 1;
              throw BreakException;
            }
            if (total > this.visualInspectionRejectionQty) {
              this.resultPassFailVisualInspection = result[1].name;
              this.visualInspectionResultPassFailId = result[1].id;
              this.isPassFailResultVisualInspection = false;
              this.visualInspectionFailIndicator = 0;
              throw BreakException;
            } else {
              this.resultPassFailVisualInspection = result[0].name;
              this.visualInspectionResultPassFailId = result[0].id;
              this.isPassFailResultVisualInspection = true;
              this.visualInspectionFailIndicator = 1;
            }

          }
        });
      } catch (e) {
        if (e !== BreakException) { throw e; }
      }
    }



  }

  packingInspectionResultChange(event) {
    if (event === acceptRejectOptions[0].name) {
      this.isPackingInspectionFail = false;
      this.packingInspectionFailIndicator = 1;
    } else {
      this.isPackingInspectionFail = true;
      this.packingInspectionFailIndicator = 0;
    }
    this.setFailedQuantityOnChange(null, Constants.Empty, TabType.PackingInspection, MasterInspectionType.VIS, Constants.Empty);
    this.setTotalFailedQuantityForAllSection();
  }

  expandTabDynamic(tabId: number) {
    const recId = this.recId === null || this.recId === 0 ? Numbers.Default : this.recId;
    const pageSortFilterInfo = new PageSortFilterInfo();
    const batchQuantity = this.formInput.controls[this.properties.batchQuantity].value !== '' ? this.formInput.controls[this.properties.batchQuantity].value : '0';
    switch (tabId) {
      case TabType.ResultOriented:
        if (!this.isSupplierFunctionAttributeExpanded) {
          const proc = this.samplingPlans.filter(x => x.mstrChar.includes('FUN')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('FUN'))[0].smplProc : 'INCOMING';

          this.apiService.getSampleSize(this.partNo, this.vendorCode, FUN, batchQuantity, proc.split('=')[0]).subscribe(data => {
            if (data && data.value.length > 0) {
              this.funSampleSize = Number(data.value[0].smplSize);
            }
          }, () => { }, () => {
            this.generateFunctionAttributeDynamicColumns();
            pageSortFilterInfo.expandInfo = this.recId !== null ? this.apiService.setSupplierFunctionAttributePageSortFilterInfo(pageSortFilterInfo)
              : this.sapPartInspectionPlanService.setResultOrientedPageSortFilterInfo(pageSortFilterInfo);
            this.getExpandedFunctionAttributes(pageSortFilterInfo);
          });
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

            this.generateMicrosectionDynamicColumns();
            this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, this.skipValue, TabType.MicroSection, recId).subscribe((data) => {
              this.supplierSPCchartData = data.value;
              this.spcMicroSectionRecent30StdAvg = [];
              const recent30CalculatedData = this.apiService.calculateSPSChartAverageStandardDeviation(data.value);
              this.parameterMicroSectionActualValuesFor30 = data.value;
              if (recent30CalculatedData) {
                this.spcMicroSectionRecent30StdAvg.push(recent30CalculatedData);
                this.spcMicroSectionRecent30SMSRangeBarR = data.value;
              }
            }, () => { }, () => {

              const newSkip = this.skipValue + 5;
              this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, newSkip, TabType.MicroSection, recId).subscribe((data) => {
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
            this.generateDimensionalMeasurementDynamicColumns();
            this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, this.skipValue, TabType.Measurement, recId).subscribe((data) => {
              this.supplierSPCchartData = data.value;
              this.spcDiamensionmeasurement30StdAvg = [];
              const recent30CalculatedData = this.apiService.calculateSPSChartAverageStandardDeviation(data.value);
              this.parameterDimMeasurementActualValuesFor30 = data.value;
              if (recent30CalculatedData) {
                this.spcDiamensionmeasurement30StdAvg.push(recent30CalculatedData);
              }
            }, () => { }, () => {
              const newSkip = this.skipValue + 5;
              this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, newSkip, TabType.Measurement, recId).subscribe((data) => {
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

            this.generateFunctionaVariableDynamicColumns();
            this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, this.skipValue, TabType.FUN, recId).subscribe((data) => {
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
              this.apiService.getSPCCPKChartStandardAverage(this.ip, this.countValue, newSkip, TabType.FUN, recId).subscribe((data) => {
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
          const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

          this.apiService.getSampleSize(this.partNo, this.vendorCode, DIM, batchQuantity, proc.split('=')[0]).subscribe(data => {
            if (data && data.value.length > 0) {
              this.dimSampleSize = Number(data.value[0].smplSize);
            }
          }, () => { }, () => {
            this.generateBowTwistDynamicColumns();
            pageSortFilterInfo.expandInfo = this.recId !== null ? this.apiService.setSupplierBowTwistPageSortFilterInfo(pageSortFilterInfo)
              : this.sapPartInspectionPlanService.setBowTwistPageSortFilterInfo(pageSortFilterInfo);
            this.getExpandedSupplierBowTwist(pageSortFilterInfo);
          });
        }
        break;
      case TabType.MPositionTolerance:
        if (!this.isMPositionToleranceExpanded) {
          const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

          this.apiService.getSampleSize(this.partNo, this.vendorCode, DIM, batchQuantity, proc.split('=')[0]).subscribe(data => {
            if (data && data.value.length > 0) {
              this.dimSampleSize = Number(data.value[0].smplSize);
            }
          }, () => { }, () => {
            this.generateSpecWithMMCDynamicColumns();
            pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setMPositionPageSortFilterInfo(pageSortFilterInfo);
            this.getExpandedPartInspectionMPositionTolerances(pageSortFilterInfo);
          });
        }
        break;
      case TabType.LPositionTolerance:
        if (!this.isLPositionToleranceExpanded) {
          const proc = this.samplingPlans.filter(x => x.mstrChar.includes('DIM')).length > 0 ? this.samplingPlans.filter(x => x.mstrChar.includes('DIM'))[0].smplProc : 'INCOMING';

          this.apiService.getSampleSize(this.partNo, this.vendorCode, DIM, batchQuantity, proc.split('=')[0]).subscribe(data => {
            if (data && data.value.length > 0) {
              this.dimSampleSize = Number(data.value[0].smplSize);
            }
          }, () => { }, () => {
            this.generateSpecWithLMCDynamicColumns();
            pageSortFilterInfo.expandInfo = this.sapPartInspectionPlanService.setLPositionPageSortFilterInfo(pageSortFilterInfo);
            this.getExpandedPartInspectionLPositionTolerances(pageSortFilterInfo);
          });
        }
        break;
      default:
        break;
    }
  }

  getExpandedPartInspectionLPositionTolerances(pageSortFilterInfo: PageSortFilterInfo) {
    this.generateSpecWithLMCDynamicColumns();
    this.tableWidthForMMCLMC = this.constantTablewidth + (this.approximateWidthForEachTextBox * this.dimSampleSize);
    if (this.sapPartInspectionPlanId && !this.isLPositionToleranceExpanded) {
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
                this.setLPositionPassFail();
              }
            );
          }
        }
      );
    }
  }


  generateSpecWithLMCDynamicColumns() {
    this.generateSpecWithLMCChildRowColumns();
    if (this.dimSampleSize) {
      Array(this.dimSampleSize)
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
    }
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
    this.generateSpecWithMMCDynamicColumns();
    if (this.sapPartInspectionPlanId && !this.isMPositionToleranceExpanded) {
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
                this.setMPositionPassFail();
              }
            );
          }
        }
      );
    }
  }

  setMPositionPassFail() {
    if (this.supplierMPositionToleranceTabDetails) {
      for (const searchFailElement of this.supplierMPositionToleranceTabDetails) {
        const resultRow = searchFailElement.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
        for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
          if (resultRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] === result[0].name) {
            this.isMPositionToleranceFail = false;
            this.mPositionFailIndicator = 1;
          } else {
            this.isMPositionToleranceFail = true;
            this.mPositionFailIndicator = 0;
            return;
          }
        }
      }
    }
  }

  setLPositionPassFail() {
    if (this.supplierLPositionToleranceTabDetails) {
      for (const searchFailElement of this.supplierLPositionToleranceTabDetails) {
        const resultRow = searchFailElement.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
        for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
          if (resultRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] === result[0].name) {
            this.isLPositionToleranceFail = false;
            this.lPositionFailIndicator = 1;
          } else {
            this.isLPositionToleranceFail = true;
            this.lPositionFailIndicator = 0;
            return;
          }
        }
      }
    }
  }

  onMMCRowExpand() {
    setTimeout(() => {
      this.highlightMMCControls();
    }, environment.timer.autoReturn);
  }


  highlightMMCControls() {
    this.supplierMPositionToleranceTabDetails.forEach(element => {
      const totalToleranceRow = this.initializeMMCTotalToleranceChildSource(element);
      const actualMeasuredGeometryRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.ActualMeasuredGeometry);
      const resultRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
      if (actualMeasuredGeometryRow && resultRow) {
        for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
          if (actualMeasuredGeometryRow.uomId === undefined) {
            continue;
          }
          if (Number(actualMeasuredGeometryRow[`${this.actualValueMMC}${bonusToleranceRowCount}`]) <= Number(totalToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`])) {
            this.highlightActualMeasuredGeometryInColor(actualMeasuredGeometryRow, bonusToleranceRowCount, 'white');
          } else {
            this.highlightActualMeasuredGeometryInColor(actualMeasuredGeometryRow, bonusToleranceRowCount, 'red');
          }
        }

      }
    });
  }

  onLMCRowExpand() {
    setTimeout(() => {
      this.highlightLMCControls();
    }, environment.timer.autoReturn);
  }


  private highlightLMCControls() {
    this.supplierLPositionToleranceTabDetails.forEach(element => {
      const totalToleranceRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.TotalTolerance);
      const actualMeasuredGeometryRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.ActualMeasuredGeometry);
      const resultRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
      if (actualMeasuredGeometryRow && resultRow) {
        for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
          if (actualMeasuredGeometryRow.uomId === undefined) {
            continue;
          }
          if (Number(actualMeasuredGeometryRow[`${this.actualValueLMC}${bonusToleranceRowCount}`]) <= Number(totalToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`])) {
            this.highlightActualMeasuredGeometryInColorForLPosition(actualMeasuredGeometryRow, bonusToleranceRowCount, 'white');
          } else {
            this.highlightActualMeasuredGeometryInColorForLPosition(actualMeasuredGeometryRow, bonusToleranceRowCount, 'red');
          }
        }
      }
    });
  }

  generateSpecWithMMCDynamicColumns() {
    this.generateSpecWithMMCChildRowColumns();
    if (this.dimSampleSize) {
      Array(this.dimSampleSize)
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
          this.tableWidthForMMCLMC = this.tableWidthForMMCLMC = this.constantTablewidth + (this.approximateWidthForEachTextBox * this.dimSampleSize);
        });
    }
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
      for (let sampleCount = 1; sampleCount <= this.dimSampleSize; sampleCount++) {
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
      for (let sampleCount = 1; sampleCount <= this.dimSampleSize; sampleCount++) {
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
      for (let sampleCount = 1; sampleCount <= this.dimSampleSize; sampleCount++) {
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
      for (let sampleCount = 1; sampleCount <= this.dimSampleSize; sampleCount++) {
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
      for (let sampleCount = 1; sampleCount <= this.dimSampleSize; sampleCount++) {
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
      for (let sampleCount = 1; sampleCount <= this.dimSampleSize; sampleCount++) {
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
          this.mPositionTolerance.isTextBoxDisabled = false;
          this.mPositionTolerance.isDropDownDisabled = false;
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
          this.lPositionTolerance.isTextBoxDisabled = false;
          this.lPositionTolerance.isDropDownDisabled = false;
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
          this.lPositionTolerance.isTextBoxDisabled = false;
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
      this.setLPositionPassFail();

      const actualValue = (<HTMLInputElement>document.getElementById(event.id)).value;
      this.setFailedQuantityOnChange(event, actualValue, TabType.LPositionTolerance, MasterInspectionType.DIM, event.id);
      this.setTotalFailedQuantityForAllSection();

    }
  }

  calculateTotalActualValues(element: SupplierMPosition, totalToleranceRow: any) {
    const actualMeasuredGeometryRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.ActualMeasuredGeometry);
    const resultRow = element.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
    if (actualMeasuredGeometryRow && resultRow) {
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
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
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
        if (!actualMeasuredGeometryRow[`${this.actualValueLMC}${bonusToleranceRowCount}`]) {
          actualMeasuredGeometryRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] = '';
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
        for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
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
    for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
      totalToleranceRow[`${this.actualValueLMC}${bonusToleranceRowCount}`] += Number(geometryToleranceSpec);
    }
  }

  addBonusToleranceForTotalToleranceForLMC(bonusToleranceRows: any, totalToleranceRow: any) {
    bonusToleranceRows.forEach(bonusToleranceRowElement => {
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
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
    for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
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
            this.mPositionTolerance.isTextBoxDisabled = false;
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

      this.setMPositionPassFail();

      const actualValue = (<HTMLInputElement>document.getElementById(event.id)).value;

      this.setFailedQuantityOnChange(event, actualValue, TabType.MPositionTolerance, MasterInspectionType.DIM, event.id);

      this.setTotalFailedQuantityForAllSection();
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
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
        if (!actualMeasuredGeometryRow[`${this.actualValueMMC}${bonusToleranceRowCount}`]) {
          actualMeasuredGeometryRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] = '';
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
        for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
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
    for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
      totalToleranceRow[`${this.actualValueMMC}${bonusToleranceRowCount}`] += Number(geometryToleranceSpec);
    }
  }

  addBonusToleranceForTotalTolerance(bonusToleranceRows: any, totalToleranceRow: any) {
    bonusToleranceRows.forEach(bonusToleranceRowElement => {
      for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
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
    for (let bonusToleranceRowCount = 1; bonusToleranceRowCount <= this.dimSampleSize; bonusToleranceRowCount++) {
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
        this.populateSupplierDateCode();
      });
    } else {
      this.getDefaultSAPDateCode();
    }
    this.disabledManufactureDate();

    this.isDateCodeExpanded = true;

  }


  populateSupplierDateCode() {
    if (this.supplierMeasurement.supplierDateCode !== null && this.supplierMeasurement.supplierDateCode !== undefined) {
      this.formInput.patchValue({
        manufactureDate: this.supplierMeasurement.supplierDateCode.manufactureDate != null ?
          new Date(this.supplierMeasurement.supplierDateCode.manufactureDate) : Constants.Empty,
        shelfLifeMonths: this.supplierMeasurement.supplierDateCode.shelfLifeMonths,
        manufactureDCWeeks: this.supplierMeasurement.supplierDateCode.manufactureDCWeeks != null
          ? this.padLeft(this.supplierMeasurement.supplierDateCode.manufactureDCWeeks.toString(), '0', 2) : 0,
        dateCodeLimit: this.supplierMeasurement.supplierDateCode.dateCodeLimit,
        manufactureDCYears: this.supplierMeasurement.supplierDateCode.manufactureDCYears != null ?
          this.padLeft(this.supplierMeasurement.supplierDateCode.manufactureDCYears.toString(), '0', 4) : 0,
        surfaceFinishingDate: this.supplierMeasurement.supplierDateCode.surfaceFinishingDate != null ?
          new Date(this.supplierMeasurement.supplierDateCode.surfaceFinishingDate) : null,
        dateCodeDetails: this.supplierMeasurement.supplierDateCode.dateCodeDetails,
        expireDate: this.supplierMeasurement.supplierDateCode.expireDate != null ?
          new Date(this.supplierMeasurement.supplierDateCode.expireDate) : null,
        remainingDays: this.getRemainingdays(this.sapPartInspectionPlan.partDateCode.dateCodeLimit),
        acceptReject: this.getAcceptReject()
      });
    }
  }

  getDefaultSAPDateCode() {
    const pageSupplierDateCodeSortFilterInfo = new PageSortFilterInfo();
    pageSupplierDateCodeSortFilterInfo.expandInfo = this.apiService.setPartDateCodePageSortFilterInfo(pageSupplierDateCodeSortFilterInfo);
    this.sapPartInspectionPlanService.getDataById(this.sapPartInspectionPlanId, pageSupplierDateCodeSortFilterInfo).subscribe(data => {
      this.sapPartInspectionPlan.partDateCode = data.value[0].partDateCode;
      this.entity = this.sapPartInspectionPlan;
      this.populatePartDateCode();
    });
  }

  getAcceptReject(): any {
    this.dateCodeFailIndicator = this.isRemainingDaysWithinLimit === true ? 1 : 0;
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
    this.dateCodeFailIndicator = 1;
    const remainingDaysField = document.getElementById('remainingDays');
    const remainingDays = Math.floor((new Date(expireDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (remainingDays < (dateCodeLimit * monthsToDaysConstant)) {
      this.isRemainingDaysWithinLimit = false;
      this.dateCodeFailIndicator = 0;
      if (remainingDaysField) {
        remainingDaysField.style.borderColor = 'red';
      }
    } else {
      this.isRemainingDaysWithinLimit = true;
      this.dateCodeFailIndicator = 1;
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
      this.getRemainingdays(this.sapPartInspectionPlan.partDateCode !== undefined ? this.sapPartInspectionPlan.partDateCode.dateCodeLimit : 0);
      this.clearManufactureDC();
    } else {
      this.clearDateCodeData('manufactureDate');
    }
    this.setFailedQuantityOnChange(null, Constants.Empty, TabType.DateCode, MasterInspectionType.VIS, null);
    this.setTotalFailedQuantityForAllSection();

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
      this.setFailedQuantityOnChange(null, Constants.Empty, TabType.DateCode, MasterInspectionType.VIS, null);
      this.setTotalFailedQuantityForAllSection();
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
      this.recalculateFailedQuantityFordateCode();
    } else if (event.target.value == null || Number(event.target.value) === Numbers.Default) {
      this.clearDateCodeData('manufactureDCYears');
      this.getRemainingdays(this.sapPartInspectionPlan.partDateCode.dateCodeLimit);
      this.recalculateFailedQuantityFordateCode();
    }
  }



  recalculateFailedQuantityFordateCode() {
    setTimeout(() => {
      this.setFailedQuantityOnChange(null, Constants.Empty, TabType.DateCode, MasterInspectionType.VIS, null);
      this.setTotalFailedQuantityForAllSection();
    }, environment.timer.autoReturn);
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
        surfaceFinishingDate: null
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
                if (this.supplierTestReportTabDetails && this.supplierTestReportTabDetails !== undefined) {
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
                this.setTestReportPassFail();
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
      isDisabled: this.recId !== null && element.resultId === resultExpected[0].id,
      resultExpected: this.recId !== null && element.resultId === resultExpected[1].id ? resultExpected[1].name : resultExpected[0].name,
      partTestReportParameterId: element.partTestReportParameterId ?? 0,
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




  // getDefaultCommodityResultParameter(sAPPartInspectionPlan, commodityId: number) {
  //   const commodityID = sAPPartInspectionPlan != null ? sAPPartInspectionPlan.commodityId : commodityId;
  //   this._parameterManagementService.getParameterManagementDataByCommodityId(commodityID, this.sapPartInspectionPlanService.getPcCodes(this.samplingPlans)).subscribe(data => {
  //     this.resultOrientedData = data.value;
  //     this.showHideTab(data.value);
  //     this.getFunctionAttributeRadioButtonTypes();
  //   });
  // }

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
    this.isFailedQuantityExpanded = false;
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
    // create component
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
    // create component

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
        this.setFailedQuantityOnChange(null, Constants.Empty, TabType.VisualInspection, MasterInspectionType.VIS, Constants.Empty);
        this.setTotalFailedQuantityForAllSection();
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
      if (resultData.sapRequest === event.textChangedEvent || (event.textChangedEvent.target === undefined && resultData.sapRequest === event.textChangedEvent.trim())) {
        resultData.matchId = yesNoOptions[0].id;
        resultData.matchResult = yesNoOptions[0].name;
        resultData.enableRowAddDefectTypes = false;
        resultData.addedDefectTypeIds = resultData.matchResult === yesNoOptions[0].name ? [] : resultData.addedDefectTypeIds;
        resultData.defectType = resultData.matchResult === yesNoOptions[0].name ? '' : resultData.defectType;
      } else if (event.textChangedEvent.target !== undefined) {
        resultData.matchId = resultData.sapRequest.trim() === event.textChangedEvent.target.value.trim() ? yesNoOptions[0].id : yesNoOptions[1].id;
        resultData.matchResult = resultData.sapRequest.trim() === event.textChangedEvent.target.value.trim() ? yesNoOptions[0].name : yesNoOptions[1].name;
        resultData.enableRowAddDefectTypes = resultData.matchResult === yesNoOptions[1].name;
        resultData.addedDefectTypeIds = resultData.matchResult === yesNoOptions[1].name ? [] : resultData.addedDefectTypeIds;
        resultData.defectType = resultData.matchResult === yesNoOptions[1].name ? '' : resultData.defectType;
      }

      this.checkIsPassFail(null, this.supplierSapBasedParameters);
      this.formInput.markAsDirty();
      this.setFailedQuantityOnChange(null, Constants.Empty, TabType.SAPBased, MasterInspectionType.VIS, Constants.Empty);
      this.setTotalFailedQuantityForAllSection();
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
          this.isDefaultCertificateType = true;
          this.supplierMeasurement.supplierSapBasedParameters.map(record => {
            this.supplierSapBasedParameter = new SupplierSapBasedParameter();
            this.supplierSapBasedParameter = this.returnSapBasedObject(record, true);
            this.supplierSapBasedParameters.push(this.supplierSapBasedParameter);
          });
          this.checkIsPassFail(null, this.supplierSapBasedParameters);
        } else {
          if (!this.isDefaultCertificateType) {
            this.defaultCertificatesLoad();
          }
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
            this.supplierSapBasedParameters = [];
            this.sapBasedParameterExpanded = true;
            if (data.value[0].certificateTypeParameters.length > 0) {
              this.isDefaultCertificateType = true;
              data.value[0].certificateTypeParameters.map(record => {
                this.supplierSapBasedParameter = new SupplierSapBasedParameter();
                this.supplierSapBasedParameter = this.returnSapBasedObject(record);
                this.supplierSapBasedParameters.push(this.supplierSapBasedParameter);
              });
            }
            this.checkIsPassFail(null, this.supplierSapBasedParameters);
          } else {
            if (data.value.length === 0) {
              this.isDefaultCertificateType = false;
            }
          }
        }, () => { }, () => {
          if (!this.isDefaultCertificateType) {
            this.defaultCertificatesLoad();
            this.sapBasedParameterExpanded = true;
          }
        });
      }
    }
  }

  defaultCertificatesLoad() {
    this.getCertificateTypeParameterFilterInfo(DefaultCommonConstants.Default);
    this.pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this._certificateTypeService.expandCertificateTypeParameters()
          ]
      };
    this._certificateTypeService.getAllData(this.pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        // this.sapBasedParameterExpanded = true;
        this.supplierSapBasedParameters = [];
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

  private returnSapBasedObject(element: any, isCalledFromSapBasedData = false): any {
    return {
      id: element.id,
      name: element.parameterName ?? element.certificateTypeParameter.parameterName,
      sapRequest: isCalledFromSapBasedData ? element.sapRequest : this.getPartMfgMpnMediaCode(element),
      physicalInspection: element.physicalInspection ?? '',
      certificateTypeParameterId: isCalledFromSapBasedData ? element.certificateTypeParameterId : element.id,
      matchId: element.matchId === yesNoOptions[0].id ? yesNoOptions[0].id : yesNoOptions[1].id,
      matchResult: element.matchId === yesNoOptions[0].id ? yesNoOptions[0].name : yesNoOptions[1].name,
      enableRowAddDefectTypes: element.enableRowAddDefectTypes,
      defectTypes: [],
      // resultPassFailId: this.recId !== null && element.matchId === yesNoOptions[1].id ? result[1].id : result[0].id,
      // result: this.recId !== null && element.matchId === yesNoOptions[1].id ? result[1].name : result[0].name,
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

    modalRef.result.then(
      (response) => {
        this.supplierSapBasedParameter = new SupplierSapBasedParameter();

        const defectTypeIds = response.defectTypes.map(x => x.id);
        const updateDefectType = this.supplierSapBasedParameters.filter(x => x.certificateTypeParameterId === record.certificateTypeParameterId);
        updateDefectType[0].defectType = response.defectTypes.map(x => x.defectTypeName).join(',');
        updateDefectType[0].addedDefectTypeIds = defectTypeIds;
        this.resultPassFailSapBased = updateDefectType[0].matchResult === yesNoOptions[1].name ? result[1].name : result[0].name;
        updateDefectType[0].matchId = updateDefectType[0].matchId === yesNoOptions[1].id ? yesNoOptions[1].id : yesNoOptions[0].id;

        this.sapBasedFailIndicator = updateDefectType[0].matchResult === yesNoOptions[1].name ? 0 : 1;

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

  isPackingQuantityEmpty() {
    return this.hasError(this.properties.packagingQuantity, ValidationErrorCodes.required);
  }

  isPackingQuantityModified() {
    return this.isModified(this.properties.packagingQuantity);
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
      this.setTestReportPassFail();
      this.setFailedQuantityOnChange(null, Constants.Empty, TabType.TestReport, MasterInspectionType.VIS, Constants.Empty);
      this.setTotalFailedQuantityForAllSection();
    }
  }

  setTestReportPassFail() {
    if (this.supplierTestReportTabDetails) {
      const isAnyRecordHasNG = this.supplierTestReportTabDetails.filter(k => k.resultExpected === resultExpected[1].name);
      this.isTestReportFail = isAnyRecordHasNG.length > 0 ? true : false;
      this.testReportFailIndicator = isAnyRecordHasNG.length > 0 ? 0 : 1;

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
    this.generateBowTwistDynamicColumns();
    if (this.recId !== null && !this.isBowTwistExpanded) {
      this.getUpdateSupplierBowTwists(pageSortFilterInfo);
    } else {
      if (!this.isBowTwistExpanded) {
        this.getAddSupplierBowTwists(pageSortFilterInfo);
      }
    }
  }

  generateBowTwistDynamicColumns() {
    this.displaySupplierBowTwistColumns = (new SupplierBowTwist()).displayColumns();
    if (this.dimSampleSize) {
      Array(Number(this.dimSampleSize))
        .fill(1)
        .forEach((value, index) => {
          const tableColumn = new TableColumn();
          tableColumn.field = `${this.actualValueBowTwist}${value + index}`;
          tableColumn.header = `ActualValue${value + index}`;
          const objColumnInfo = new ColumnInfo();
          objColumnInfo.type = ColumnType.TextBox;
          tableColumn.columnInfo = objColumnInfo;
          tableColumn.isVisible = true;
          tableColumn.isExport = true;
          this.displaySupplierBowTwistColumns.push(tableColumn);
        });
      this.tableWidthForBowTwist = this.constantTablewidth + (this.approximateWidthForEachTextBox * Number(this.dimSampleSize));
    }
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
    this.setBowTwistPassFail();
  }
  getAddSupplierFunctionVariable(pageSortFilterInfo) {
    this.sapPartInspectionPlanService.getDataById(Number(this.sapPartInspectionPlanId), pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        this.isDisplayColumnReload = true;
        if (this.sapPartInspectionPlanService.isReturnedDataHasValue(data) && this.sapPartInspectionPlanService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan)) {
          this.sapPartInspectionPlan.partFunParameters = data.value[0].partFunParameters;
          this.entity = this.sapPartInspectionPlan;
          // this.microSectionParameters = this.sapPartInspectionPlanService.getMicroSectionParameters(this.sapPartInspectionPlan);
          this.supplierFunctionVariables = this.sapPartInspectionPlanService.mapFunParameterModel(this.sapPartInspectionPlan.partFunParameters).map(element => {
            return this.returnSupplierFunctionVariableObj(element, this.recId, true);
          });
        }
      }
      this.isFunctionVariableExpanded = true;
    }, () => { }, () => {
      this.setFunctionVariablePassFail();
    });
  }
  getUpdateSupplierFunctionVariable(pageSortFilterInfo) {

    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
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
      } else {
        const pageSortFilterInfoFunctionaVariable = new PageSortFilterInfo();
        pageSortFilterInfoFunctionaVariable.expandInfo = this.sapPartInspectionPlanService.setFUNPageSortFilterInfo(pageSortFilterInfoFunctionaVariable);
        this.getAddSupplierFunctionVariable(pageSortFilterInfoFunctionaVariable);
      }
    }, () => { }, () => {
      setTimeout(() => {
        this.setFunctionVariablePassFail();
        this.highlightFunctionVariable();
      }, environment.timer.autoReturn);
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
            return this.returnSupplierDimensionMeasurementObj(element, this.recId, true);
          });
        }
      }
      this.isDimensionMeasurementExpanded = true;
      this.setDimensionalMeasurementPassFail();
    });
  }
  getUpdateSupplierDimensionMeasurement(pageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
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
        this.setDimensionalMeasurementPassFail();
      } else {
        const pageSortFilterInfoSupplierDimensionMeasurement = new PageSortFilterInfo();
        pageSortFilterInfoSupplierDimensionMeasurement.expandInfo = this.sapPartInspectionPlanService.setMeasurementParametersPageSortFilterInfo(pageSortFilterInfoSupplierDimensionMeasurement);
        this.getAddSupplierDimensionMeasurement(pageSortFilterInfoSupplierDimensionMeasurement);
      }
    }, () => { }, () => {
      setTimeout(() => {
        this.highlightDimensionalMeasurement();
      }, environment.timer.autoReturn);
    });
  }
  getUpdateSupplierBowTwists(pageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0 && data.value[0].supplierBowTwists && data.value[0].supplierBowTwists.length > 0) {
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
      } else {
        const pageSortFilterInfoBowTwist = new PageSortFilterInfo();
        pageSortFilterInfoBowTwist.expandInfo = this.sapPartInspectionPlanService.setBowTwistPageSortFilterInfo(pageSortFilterInfoBowTwist);
        this.getAddSupplierBowTwists(pageSortFilterInfoBowTwist);
      }
      this.isBowTwistExpanded = true;
      this.setBowTwistPassFail();
    }, () => { }, () => {
      setTimeout(() => {
        this.highlightBowTwist();
      }, environment.timer.autoReturn);
    });
  }

  returnBowTwistObject(record): any {
    return {
      spec: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.partInspectionBowTwistParameter.spec : record.spec,
      length: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.partInspectionBowTwistParameter.length : record.length,
      width: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.partInspectionBowTwistParameter.width : record.width,
      unit: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? (unitType[0].id === record.partInspectionBowTwistParameter.unit
        ? unitType[0].name : unitType[1].name) : (unitType[0].id === record.unit ? unitType[0].name : unitType[1].name),
      upperLimit: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.partInspectionBowTwistParameter.upperLimit : record.upperLimit,
      warPageId: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.bowTwistFormulas.warPageId : record.warPageId,
      bowTwistFormulaId: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.partInspectionBowTwistParameter.bowTwistFormulaId : record.bowTwistFormulaId,
      partBowTwistParameterId: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.partInspectionBowTwistParameter.id : record.id,
      bowTwistFormula: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.bowTwistFormulas.name : record.bowTwistFormula.name,
      supplierMeasurementSubmissionId: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ?
        record.partInspectionBowTwistParameter.supplierMeasurementSubmissionId : record.supplierMeasurementSubmissionId,
      dataType: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.partInspectionBowTwistParameter.dataType : record.dataType,
      warPage: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.partInspectionBowTwistParameter.warPage : record.warPage,
      warPageTypeId: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.partInspectionBowTwistParameter.warPageTypeId : record.warPageTypeId,
      supplierBowTwistActuals: (this.recId !== null && record.partInspectionBowTwistParameter !== undefined) ? record.supplierBowTwistActuals : [],
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

      this.setFunctionVariablePassFail();

      this.setFailedQuantityOnChange(event, actualValue, TabType.FUN, MasterInspectionType.FUN, event.id);

      this.setTotalFailedQuantityForAllSection();

    }
  }

  setFailedQuantityOnChange(event: any, actualValue: string, tabId: number, masterInspectionTypeId: number, controlId: string) {
    if (this.supplierFailedQuantity) {
      const failedQtyData = this.supplierFailedQuantity.filter(k => k.tabId === tabId);
      if (failedQtyData && failedQtyData.length > 0) {
        const { invidualTabRecords, failedFieldId } = this.getFailedQuantityRecord(controlId, failedQtyData, tabId, masterInspectionTypeId);
        if (invidualTabRecords && invidualTabRecords.length > 0) {
          this.setExistingFailedQuantity(invidualTabRecords, failedFieldId, tabId, masterInspectionTypeId, actualValue, event);

        } else {
          this.setNewFailedQuantity(tabId, masterInspectionTypeId, failedFieldId, actualValue, event);
        }
      } else {
        const failedFieldId = this.getFieldIdFromTextChanged(controlId, tabId);
        this.setNewFailedQuantity(tabId, masterInspectionTypeId, failedFieldId, actualValue, event);
      }
    } else {
      const failedFieldId = this.getFieldIdFromTextChanged(controlId, tabId);
      this.setNewFailedQuantity(tabId, masterInspectionTypeId, failedFieldId, actualValue, event);
    }
  }

  setExistingFailedQuantity(invidualTabRecords: FailedQuantity[], failedFieldId: string, tabId: number,
    masterInspectionTypeId: number, actualValue: string, event: any) {
    if (masterInspectionTypeId !== MasterInspectionType.VIS) {
      invidualTabRecords[0].fieldName = `${this.AV}${failedFieldId}`;
    }
    switch (tabId) {
      case TabType.FUN:
        const supplierFunctionVariableList = this.supplierFunctionVariables;
        if (supplierFunctionVariableList) {
          for (const row of supplierFunctionVariableList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueFunctionVariable + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 2;
                } else if (Number(row[searchElement]) > Number(row.upperTolerance) || Number(row[searchElement]) < Number(row.lowerTolerance)) {
                  invidualTabRecords[0].failedQuantityCount = 1;
                  invidualTabRecords[0].failIndicator = 0;
                  invidualTabRecords[0].isFail = true;
                  return;
                } else {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 1;
                  invidualTabRecords[0].isFail = false;


                }
              }
            }
          }
        }
        break;
      case TabType.ResultOriented:
        const supplierFunctionAttributeDetailList = this.supplierFunctionAttributeDetails;
        if (supplierFunctionAttributeDetailList) {
          for (const row of supplierFunctionAttributeDetailList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueFunctionAttribute + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 2;

                } else if (Number(row[searchElement]) === OKNGType.NG) {
                  invidualTabRecords[0].failedQuantityCount = 1;
                  invidualTabRecords[0].failIndicator = 0;
                  invidualTabRecords[0].isFail = true;
                  return;
                } else {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 1;
                  invidualTabRecords[0].isFail = false;


                }
              }
            }
          }
        }
        break;
      case TabType.MicroSection:
        const supplierMicroSectionParameterList = this.supplierMicroSectionParameters;
        if (supplierMicroSectionParameterList) {
          for (const row of supplierMicroSectionParameterList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueMicroSection + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 2;

                } else if (Number(row[searchElement]) > Number(row.upperTolerance) || Number(row[searchElement]) < Number(row.lowerTolerance)) {
                  invidualTabRecords[0].failedQuantityCount = 1;
                  invidualTabRecords[0].failIndicator = 0;
                  invidualTabRecords[0].isFail = true;

                  return;
                } else {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 1;
                  invidualTabRecords[0].isFail = false;


                }
              }
            }
          }
        }
        break;
      case TabType.Measurement:
        const supplierDimensionMeasurementList = this.supplierDimensionMeasurements;
        if (supplierDimensionMeasurementList) {
          for (const row of supplierDimensionMeasurementList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueDimensionMeasurement + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 2;

                } else if (Number(row[searchElement]) > Number(row.upperTolerance) || Number(row[searchElement]) < Number(row.lowerTolerance)) {
                  invidualTabRecords[0].failedQuantityCount = 1;
                  invidualTabRecords[0].failIndicator = 0;
                  invidualTabRecords[0].isFail = true;


                  return;
                } else {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 1;
                  invidualTabRecords[0].isFail = false;


                }
              }
            }
          }
        }
        break;

      case TabType.BowAndTwist:
        const supplierBowTwistList = this.supplierBowTwists;
        if (supplierBowTwistList) {
          for (const row of supplierBowTwistList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueBowTwist + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 2;
                } else if (Number(actualValue) > event.row.upperLimit) {
                  invidualTabRecords[0].failedQuantityCount = 1;
                  invidualTabRecords[0].failIndicator = 0;
                  invidualTabRecords[0].isFail = true;

                  return;
                } else {
                  invidualTabRecords[0].failedQuantityCount = 0;
                  invidualTabRecords[0].failIndicator = 1;
                  invidualTabRecords[0].isFail = false;

                }
              }
            }
          }
        }
        break;

      case TabType.MPositionTolerance:
        const supplierMPositionToleranceTabDetailList = this.supplierMPositionToleranceTabDetails;
        if (supplierMPositionToleranceTabDetailList) {
          for (const row of supplierMPositionToleranceTabDetailList) {
            const resultRow = row.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
            if (resultRow) {
              const keys = Object.keys(resultRow).filter(k => k.includes(this.actualValueMMC + failedFieldId));
              if (keys) {
                for (const searchElement of keys) {
                  if (resultRow[searchElement].trim() === Pass) {
                    invidualTabRecords[0].failedQuantityCount = 0;
                    invidualTabRecords[0].failIndicator = 1;
                    invidualTabRecords[0].isFail = false;

                  } else if (resultRow[searchElement].trim() === Fail) {
                    invidualTabRecords[0].failedQuantityCount = 1;
                    invidualTabRecords[0].failIndicator = 0;
                    invidualTabRecords[0].isFail = true;


                    return;
                  }
                }
              }
            }
          }
        }
        break;
      case TabType.LPositionTolerance:
        const supplierLPositionToleranceTabDetailList = this.supplierLPositionToleranceTabDetails;
        if (supplierLPositionToleranceTabDetailList) {
          for (const row of supplierLPositionToleranceTabDetailList) {
            const resultRow = row.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
            if (resultRow) {
              const keys = Object.keys(resultRow).filter(k => k.includes(this.actualValueLMC + failedFieldId));
              if (keys) {
                for (const searchElement of keys) {
                  if (resultRow[searchElement].trim() === Pass) {
                    invidualTabRecords[0].failedQuantityCount = 0;
                    invidualTabRecords[0].failIndicator = 1;
                    invidualTabRecords[0].isFail = false;

                  } else if (resultRow[searchElement].trim() === Fail) {
                    invidualTabRecords[0].failedQuantityCount = 1;
                    invidualTabRecords[0].failIndicator = 0;
                    invidualTabRecords[0].isFail = true;


                    return;
                  }
                }
              }
            }
          }
        }
        break;
      case TabType.SAPBased:
        if (this.supplierSapBasedParameters) {
          const unmatchedSapBasedParameter = this.supplierSapBasedParameters.filter(k => k.matchId === 0);
          if (unmatchedSapBasedParameter.length > 0) {
            invidualTabRecords[0].failedQuantityCount = 1;
            invidualTabRecords[0].failIndicator = 0;
            invidualTabRecords[0].isFail = true;


          } else {
            invidualTabRecords[0].failedQuantityCount = 0;
            invidualTabRecords[0].failIndicator = 1;
            invidualTabRecords[0].isFail = false;


          }
        }
        break;
      case TabType.PackingInspection:
        invidualTabRecords[0].tabId = tabId;
        invidualTabRecords[0].masterInspectionTypeId = masterInspectionTypeId;
        if (this.isPackingInspectionFail) {
          invidualTabRecords[0].failedQuantityCount = 1;
          invidualTabRecords[0].failIndicator = 0;
          invidualTabRecords[0].isFail = true;

        } else {
          invidualTabRecords[0].failedQuantityCount = 0;
          invidualTabRecords[0].failIndicator = 1;
          invidualTabRecords[0].isFail = false;

        }
        break;

      case TabType.TestReport:
        invidualTabRecords[0].tabId = tabId;
        invidualTabRecords[0].masterInspectionTypeId = masterInspectionTypeId;
        if (this.supplierTestReportTabDetails) {
          const isAnyRecordHasNG = this.supplierTestReportTabDetails.filter(k => k.resultExpected === resultExpected[1].name);
          this.isTestReportFail = isAnyRecordHasNG.length > 0 ? true : false;
          if (this.isTestReportFail) {
            invidualTabRecords[0].failedQuantityCount = 1;
            invidualTabRecords[0].failIndicator = 0;
            invidualTabRecords[0].isFail = true;


          } else {
            invidualTabRecords[0].failedQuantityCount = 0;
            invidualTabRecords[0].failIndicator = 1;
            invidualTabRecords[0].isFail = false;


          }
        } else {
          invidualTabRecords[0].failedQuantityCount = 0;
          invidualTabRecords[0].failIndicator = 0;
          invidualTabRecords[0].isFail = true;

        }
        break;
      case TabType.VisualInspection:
        invidualTabRecords[0].tabId = tabId;
        invidualTabRecords[0].masterInspectionTypeId = masterInspectionTypeId;
        if (this.supplierVisualInspectionDetails) {
          invidualTabRecords[0].failedQuantityCount = isNaN(this.supplierVisualInspectionDetails.reduce((sum, item) => sum + item.totalDefectQty, 0))
            ? 0 : this.supplierVisualInspectionDetails.reduce((sum, item) => sum + item.totalDefectQty, 0);
          invidualTabRecords[0].failIndicator = invidualTabRecords[0].failedQuantityCount === 0 ? 1 : 0;
          invidualTabRecords[0].isFail = invidualTabRecords[0].failedQuantityCount === 0 ? false : true;

        } else {
          invidualTabRecords[0].failedQuantityCount = 0;
          invidualTabRecords[0].failIndicator = this.supplierVisualInspectionDetails.length > 0 ? 1 : 0;
          invidualTabRecords[0].isFail = invidualTabRecords[0].failedQuantityCount === 0 ? false : true;
        }
        break;
      case TabType.DateCode:
        invidualTabRecords[0].tabId = tabId;
        invidualTabRecords[0].masterInspectionTypeId = masterInspectionTypeId;
        if (this.isRemainingDaysWithinLimit) {
          invidualTabRecords[0].failedQuantityCount = 0;
          invidualTabRecords[0].failIndicator = 1;
          this.dateCodeFailIndicator = 1;
          invidualTabRecords[0].isFail = false;

        } else {
          invidualTabRecords[0].failedQuantityCount = 1;
          invidualTabRecords[0].failIndicator = 0;
          this.dateCodeFailIndicator = 0;
          invidualTabRecords[0].isFail = true;

        }
        break;
      default:
        break;
    }
  }

  setNewFailedQuantity(tabId: number, masterInspectionTypeId: number, failedFieldId: string, actualValue: string, event: any) {
    const failedQuantity = new FailedQuantity();
    failedQuantity.tabId = tabId;
    failedQuantity.masterInspectionTypeId = masterInspectionTypeId;
    if (masterInspectionTypeId !== MasterInspectionType.VIS) {
      failedQuantity.fieldName = `${this.AV}${failedFieldId}`;
    }
    switch (tabId) {
      case TabType.FUN:
        const supplierFunctionVariableList = this.supplierFunctionVariables;
        if (supplierFunctionVariableList) {
          for (const row of supplierFunctionVariableList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueFunctionVariable + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 2;
                } else if (Number(row[searchElement]) > Number(row.upperTolerance) || Number(row[searchElement]) < Number(row.lowerTolerance)) {
                  failedQuantity.failedQuantityCount = 1;
                  failedQuantity.failIndicator = 0;
                  failedQuantity.isFail = true;
                  this.pushFailedElements(failedQuantity);
                  return;
                } else {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 1;
                  failedQuantity.isFail = false;
                }
              }
            }
          }
        }
        break;
      case TabType.ResultOriented:
        const supplierFunctionAttributeDetailList = this.supplierFunctionAttributeDetails;
        if (supplierFunctionAttributeDetailList) {
          for (const row of supplierFunctionAttributeDetailList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueFunctionAttribute + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 2;
                } else if (Number(row[searchElement]) === OKNGType.NG) {
                  failedQuantity.failedQuantityCount = 1;
                  failedQuantity.failIndicator = 0;
                  failedQuantity.isFail = true;
                  this.pushFailedElements(failedQuantity);
                  return;
                } else {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 1;
                  failedQuantity.isFail = false;

                }
              }
            }
          }
        }
        break;
      case TabType.MicroSection:
        const supplierMicroSectionParameterList = this.supplierMicroSectionParameters;
        if (supplierMicroSectionParameterList) {
          for (const row of supplierMicroSectionParameterList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueMicroSection + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 2;
                } else if (Number(row[searchElement]) > Number(row.upperTolerance) || Number(row[searchElement]) < Number(row.lowerTolerance)) {
                  failedQuantity.failedQuantityCount = 1;
                  failedQuantity.failIndicator = 0;
                  failedQuantity.isFail = true;

                  this.pushFailedElements(failedQuantity);
                  return;
                } else {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 1;
                  failedQuantity.isFail = false;

                }
              }
            }
          }
        }
        break;
      case TabType.Measurement:
        const supplierDimensionMeasurementList = this.supplierDimensionMeasurements;
        if (supplierDimensionMeasurementList) {
          for (const row of supplierDimensionMeasurementList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueDimensionMeasurement + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 2;
                } else if (Number(row[searchElement]) > Number(row.upperTolerance) || Number(row[searchElement]) < Number(row.lowerTolerance)) {
                  failedQuantity.failedQuantityCount = 1;
                  failedQuantity.failIndicator = 0;
                  failedQuantity.isFail = true;

                  this.pushFailedElements(failedQuantity);
                  return;
                } else {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 1;
                  failedQuantity.isFail = false;

                }
              }
            }
          }
        }
        break;
      case TabType.BowAndTwist:
        const supplierBowTwistList = this.supplierBowTwists;
        if (supplierBowTwistList) {
          for (const row of supplierBowTwistList) {
            const keys = Object.keys(row).filter(k => k.includes(this.actualValueBowTwist + failedFieldId));
            if (keys) {
              for (const searchElement of keys) {
                if (row[searchElement].trim() === Constants.Empty) {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 2;
                } else if (Number(actualValue) > event.row.upperLimit) {
                  failedQuantity.failedQuantityCount = 1;
                  failedQuantity.failIndicator = 0;
                  failedQuantity.isFail = true;

                  this.pushFailedElements(failedQuantity);
                  return;
                } else {
                  failedQuantity.failedQuantityCount = 0;
                  failedQuantity.failIndicator = 1;
                  failedQuantity.isFail = false;

                }
              }
            }
          }
        }
        break;
      case TabType.MPositionTolerance:
        const supplierMPositionToleranceTabDetailList = this.supplierMPositionToleranceTabDetails;
        if (supplierMPositionToleranceTabDetailList) {
          for (const row of supplierMPositionToleranceTabDetailList) {
            const resultRow = row.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
            if (resultRow) {
              const keys = Object.keys(resultRow).filter(k => k.includes(this.actualValueMMC + failedFieldId));
              if (keys) {
                for (const searchElement of keys) {
                  if (resultRow[searchElement].trim() === Pass) {
                    failedQuantity.failedQuantityCount = 0;
                    failedQuantity.failIndicator = 1;
                    failedQuantity.isFail = false;

                  } else if (resultRow[searchElement].trim() === Fail) {
                    failedQuantity.failedQuantityCount = 1;
                    failedQuantity.failIndicator = 0;
                    failedQuantity.isFail = true;

                    this.pushFailedElements(failedQuantity);
                    return;
                  }
                }
              }
            }
          }
        }
        break;
      case TabType.LPositionTolerance:
        const supplierLPositionToleranceTabDetailList = this.supplierLPositionToleranceTabDetails;
        if (supplierLPositionToleranceTabDetailList) {
          for (const row of supplierLPositionToleranceTabDetailList) {
            const resultRow = row.childDataSource.find(k => k.dimensionDefaultId === DimensionDefaultConstant.Result);
            if (resultRow) {
              const keys = Object.keys(resultRow).filter(k => k.includes(this.actualValueLMC + failedFieldId));
              if (keys) {
                for (const searchElement of keys) {
                  if (resultRow[searchElement].trim() === Pass) {
                    failedQuantity.failedQuantityCount = 0;
                    failedQuantity.failIndicator = 1;
                    failedQuantity.isFail = false;

                  } else if (resultRow[searchElement].trim() === Fail) {
                    failedQuantity.failedQuantityCount = 1;
                    failedQuantity.failIndicator = 0;
                    failedQuantity.isFail = true;

                    this.pushFailedElements(failedQuantity);
                    return;
                  }
                }
              }
            }
          }
        }
        break;
      case TabType.SAPBased:
        if (this.supplierSapBasedParameters) {
          const unmatchedSapBasedParameter = this.supplierSapBasedParameters.filter(k => k.matchId === 0);
          if (unmatchedSapBasedParameter.length > 0) {
            failedQuantity.failedQuantityCount = 1;
            failedQuantity.failIndicator = 0;
            failedQuantity.isFail = true;

          } else {
            failedQuantity.failedQuantityCount = 0;
            failedQuantity.failIndicator = 1;
            failedQuantity.isFail = false;
          }
        }
        break;
      case TabType.PackingInspection:
        failedQuantity.tabId = tabId;
        failedQuantity.masterInspectionTypeId = masterInspectionTypeId;
        if (this.isPackingInspectionFail) {
          failedQuantity.failedQuantityCount = 1;
          failedQuantity.failIndicator = 0;
        } else {
          failedQuantity.failedQuantityCount = 0;
          failedQuantity.failIndicator = 1;
          failedQuantity.isFail = false;
        }
        break;
      case TabType.TestReport:
        failedQuantity.tabId = tabId;
        failedQuantity.masterInspectionTypeId = masterInspectionTypeId;
        if (this.supplierTestReportTabDetails) {
          const isAnyRecordHasNG = this.supplierTestReportTabDetails.filter(k => k.resultExpected === resultExpected[1].name);
          this.isTestReportFail = isAnyRecordHasNG.length > 0 ? true : false;
          if (this.isTestReportFail) {
            failedQuantity.failedQuantityCount = 1;
            failedQuantity.failIndicator = 0;
            failedQuantity.isFail = true;
          } else {
            failedQuantity.failedQuantityCount = 0;
            failedQuantity.failIndicator = 1;
            failedQuantity.isFail = false;
          }
        } else {
          failedQuantity.failedQuantityCount = 0;
          failedQuantity.failIndicator = 2;
        }
        break;
      case TabType.VisualInspection:
        failedQuantity.tabId = tabId;
        failedQuantity.masterInspectionTypeId = masterInspectionTypeId;
        if (this.supplierVisualInspectionDetails.length === 0) {
          failedQuantity.failIndicator = 2;
        } else if (this.supplierVisualInspectionDetails) {
          failedQuantity.failedQuantityCount = isNaN(this.supplierVisualInspectionDetails.reduce((sum, item) => sum + item.totalDefectQty, 0))
            ? 0 : this.supplierVisualInspectionDetails.reduce((sum, item) => sum + item.totalDefectQty, 0);
          failedQuantity.failIndicator = 0;
          failedQuantity.isFail = true;

        } else {
          failedQuantity.failedQuantityCount = 0;
          failedQuantity.failIndicator = 1;
          failedQuantity.isFail = false;

        }
        break;
      case TabType.DateCode:
        failedQuantity.tabId = tabId;
        failedQuantity.masterInspectionTypeId = masterInspectionTypeId;
        if (this.isRemainingDaysWithinLimit) {
          failedQuantity.failedQuantityCount = 0;
          failedQuantity.failIndicator = 0;
          failedQuantity.isFail = true;

          this.dateCodeFailIndicator = 0;
        } else {
          failedQuantity.failedQuantityCount = 1;
          failedQuantity.failIndicator = 1;
          this.dateCodeFailIndicator = 1;
          failedQuantity.isFail = false;

        }
        break;
      default:
        break;
    }
    this.pushFailedElements(failedQuantity);
  }


  private pushFailedElements(failedQuantity: FailedQuantity) {
    if (!this.supplierFailedQuantity) {
      this.supplierFailedQuantity = [];
    }
    this.supplierFailedQuantity.push(failedQuantity);
  }

  getFailedQuantityRecord(controlId: string, failedQtyData: FailedQuantity[], tabId: number, masterInspectionTypeId: number) {
    const failedFieldId = this.getFieldIdFromTextChanged(controlId, tabId);
    let invidualTabRecords;
    if (masterInspectionTypeId === MasterInspectionType.VIS) {
      invidualTabRecords = failedQtyData.filter(k => k.tabId === tabId);
    } else {
      invidualTabRecords = failedQtyData.filter(k => k.fieldName.trim() === `${this.AV}${failedFieldId}`);
    }

    return { invidualTabRecords, failedFieldId };
  }

  private getFieldIdFromTextChanged(controlId: string, tabId: number) {
    if (controlId) {
      const actualValueSubString = controlId.substring(controlId.indexOf(tabId === TabType.ResultOriented ? this.functionAttributeResult : this.actualValue));
      const failedFieldId = actualValueSubString.replace(/^\D+/g, '');
      return failedFieldId;
    }
  }

  setFunctionVariablePassFail() {
    const supplierFunctionVariableList = this.supplierFunctionVariables;
    if (supplierFunctionVariableList) {
      for (const row of supplierFunctionVariableList) {
        const keys = Object.keys(row).filter(k => k.includes(this.actualValueFunctionVariable));
        if (keys) {
          for (const searchElement of keys) {
            if (row[searchElement].trim() === Constants.Empty) {
              this.isFunctionVariableFail = false;
              this.functionVariableFailIndicator = 2;
            } else if (Number(row[searchElement]) > Number(row.upperTolerance) || Number(row[searchElement]) < Number(row.lowerTolerance)) {
              this.isFunctionVariableFail = true;
              this.functionVariableFailIndicator = 0;
              return;
            } else {
              this.isFunctionVariableFail = false;
              this.functionVariableFailIndicator = 1;
            }
          }
        }
      }
    }
  }

  setFunctionAttributePassFail() {
    const supplierFunctionAttributeDetailList = this.supplierFunctionAttributeDetails;
    if (supplierFunctionAttributeDetailList) {
      for (const row of supplierFunctionAttributeDetailList) {
        const keys = Object.keys(row).filter(k => k.includes(this.actualValueFunctionAttribute));
        if (keys) {
          for (const searchElement of keys) {
            if (row[searchElement].trim() === Constants.Empty) {
              this.isFunctionAttributeFail = false;
              this.functionAttributeFailIndicator = 2;
            } else if (Number(row[searchElement]) === OKNGType.NG) {
              this.isFunctionAttributeFail = true;
              this.functionAttributeFailIndicator = 0;
              return;
            } else {
              this.isFunctionAttributeFail = false;
              this.functionAttributeFailIndicator = 1;
            }
          }
        }
      }
    }
  }

  highlightMicroSection() {
    const supplierMicroSectionParametersList = this.supplierMicroSectionParameters;
    if (supplierMicroSectionParametersList) {
      for (let i = 0; i < supplierMicroSectionParametersList.length; i++) {
        const keys = Object.keys(supplierMicroSectionParametersList[i]).filter(k => k.includes(this.actualValueMicroSection));
        if (keys) {
          for (const searchElement of keys) {
            const actualValueHtml = document.getElementById(textbox + i + searchElement);
            if (supplierMicroSectionParametersList[i][searchElement].trim() !== Constants.Empty
              && (Number(supplierMicroSectionParametersList[i][searchElement]) > Number(supplierMicroSectionParametersList[i].upperTolerance)
                || Number(supplierMicroSectionParametersList[i][searchElement]) < Number(supplierMicroSectionParametersList[i].lowerTolerance))) {
              if (actualValueHtml) {
                actualValueHtml.style.backgroundColor = 'red';
              }
            } else {
              if (actualValueHtml) {
                actualValueHtml.style.backgroundColor = 'white';
              }
            }
          }
        }
      }
    }
  }

  highlightBowTwist() {
    const supplierBowTwistList = this.supplierBowTwists;
    if (supplierBowTwistList) {
      for (let i = 0; i < supplierBowTwistList.length; i++) {
        const keys = Object.keys(supplierBowTwistList[i]).filter(k => k.includes(this.actualValueBowTwist));
        if (keys) {
          for (const searchElement of keys) {
            const actualValueHtml = document.getElementById(textbox + i + searchElement);
            if (supplierBowTwistList[i][searchElement].trim() !== Constants.Empty
              && Number(supplierBowTwistList[i][searchElement]) > Number(supplierBowTwistList[i].upperLimit)) {
              if (actualValueHtml) {
                actualValueHtml.style.backgroundColor = 'red';
              }
            } else {
              if (actualValueHtml) {
                actualValueHtml.style.backgroundColor = 'white';
              }
            }
          }
        }
      }
    }
  }

  highlightDimensionalMeasurement() {
    const supplierDimensionMeasurementsList = this.supplierDimensionMeasurements;
    if (supplierDimensionMeasurementsList) {
      for (let i = 0; i < supplierDimensionMeasurementsList.length; i++) {
        const keys = Object.keys(supplierDimensionMeasurementsList[i]).filter(k => k.includes(this.actualValueDimensionMeasurement));
        if (keys) {
          for (const searchElement of keys) {
            const actualValueHtml = document.getElementById(textbox + i + searchElement);
            if (supplierDimensionMeasurementsList[i][searchElement].trim() !== Constants.Empty
              && (Number(supplierDimensionMeasurementsList[i][searchElement]) > Number(supplierDimensionMeasurementsList[i].upperTolerance)
                || Number(supplierDimensionMeasurementsList[i][searchElement]) < Number(supplierDimensionMeasurementsList[i].lowerTolerance))) {
              if (actualValueHtml) {
                actualValueHtml.style.backgroundColor = 'red';
              }
            } else {
              if (actualValueHtml) {
                actualValueHtml.style.backgroundColor = 'white';
              }
            }
          }
        }
      }
    }
  }

  highlightFunctionVariable() {
    const supplierFunctionVariableList = this.supplierFunctionVariables;
    if (supplierFunctionVariableList) {
      for (let i = 0; i < supplierFunctionVariableList.length; i++) {
        const keys = Object.keys(supplierFunctionVariableList[i]).filter(k => k.includes(this.actualValueFunctionVariable));
        if (keys) {
          for (const searchElement of keys) {
            const actualValueHtml = document.getElementById(textbox + i + searchElement);
            if (supplierFunctionVariableList[i][searchElement].trim() !== Constants.Empty
              && (Number(supplierFunctionVariableList[i][searchElement]) > Number(supplierFunctionVariableList[i].upperTolerance)
                || Number(supplierFunctionVariableList[i][searchElement]) < Number(supplierFunctionVariableList[i].lowerTolerance))) {
              if (actualValueHtml) {
                actualValueHtml.style.backgroundColor = 'red';
              }
            } else {
              if (actualValueHtml) {
                actualValueHtml.style.backgroundColor = 'white';
              }
            }
          }
        }
      }
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

      this.setDimensionalMeasurementPassFail();


      this.setFailedQuantityOnChange(event, actualValue, TabType.Measurement, MasterInspectionType.DIM, event.id);
      this.setTotalFailedQuantityForAllSection();
    }
  }

  setDimensionalMeasurementPassFail() {
    const supplierDimensionMeasurementList = this.supplierDimensionMeasurements;
    if (supplierDimensionMeasurementList) {
      for (const row of supplierDimensionMeasurementList) {
        const keyvalues = Object.keys(row).filter(k => k.includes(this.actualValueDimensionMeasurement));
        if (keyvalues) {
          for (const searchElement of keyvalues) {
            if (row[searchElement].trim() === Constants.Empty) {
              this.isDimensionalMeasurementFail = false;
              this.dimentionFailIndicator = 2;
            } else if ((Number(row[searchElement]) > Number(row.upperTolerance) || Number(row[searchElement]) < Number(row.lowerTolerance))) {
              this.isDimensionalMeasurementFail = true;
              this.dimentionFailIndicator = 0;
              return;
            } else {
              this.isDimensionalMeasurementFail = false;
              this.dimentionFailIndicator = 1;
            }
          }
        }
      }
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

      this.setMicroSectionPassFail();

      this.setFailedQuantityOnChange(event, actualValue, TabType.MicroSection, MasterInspectionType.DIM, event.id);
      this.setTotalFailedQuantityForAllSection();
    }
  }

  setMicroSectionPassFail() {
    const supplierMicroSectionParameterList = this.supplierMicroSectionParameters;
    if (supplierMicroSectionParameterList) {
      for (const row of supplierMicroSectionParameterList) {
        const keys = Object.keys(row).filter(k => k.includes(this.actualValueMicroSection));
        if (keys) {
          for (const searchElement of keys) {
            if (row[searchElement].trim() === Constants.Empty) {
              this.isMicroSectionParameterFail = false;
              this.microSectionFailIndicator = 2;
            } else if (Number(row[searchElement]) > Number(row.upperTolerance) || Number(row[searchElement]) < Number(row.lowerTolerance)) {
              this.isMicroSectionParameterFail = true;
              this.microSectionFailIndicator = 0;
              return;
            } else {
              this.isMicroSectionParameterFail = false;
              this.microSectionFailIndicator = 1;
            }
          }
        }
      }
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

      this.setBowTwistPassFail();

      this.setFailedQuantityOnChange(event, actualValue, TabType.BowAndTwist, MasterInspectionType.DIM, event.id);
      this.setTotalFailedQuantityForAllSection();

    }
  }

  setBowTwistPassFail() {
    const supplierBowTwistList = this.supplierBowTwists;
    if (supplierBowTwistList) {
      for (const bowRow of supplierBowTwistList) {
        const keys = Object.keys(bowRow).filter(k => k.includes(this.actualValueBowTwist));
        if (keys) {
          for (const searchElement of keys) {
            if (bowRow[searchElement].trim() === Constants.Empty) {
              this.isBowTwistFail = false;
              this.bowTwistFailIndicator = 2;
            } else if (Number(bowRow[searchElement]) > Number(bowRow.upperLimit)) {
              this.isBowTwistFail = true;
              this.bowTwistFailIndicator = 0;
              return;
            } else {
              this.isBowTwistFail = false;
              this.bowTwistFailIndicator = 1;

            }
          }
        }
      }
    }
  }


  getUpdateSupplierMicroSection(pageSortFilterInfo) {
    // chart call

    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
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
        this.setMicroSectionPassFail();
      } else {
        const pageSortFilterInfoMicroSection = new PageSortFilterInfo();
        pageSortFilterInfoMicroSection.expandInfo = this.sapPartInspectionPlanService.setMicroSectionPageSortFilterInfo(pageSortFilterInfoMicroSection);
        this.getAddSupplierMicroSection(pageSortFilterInfoMicroSection);
      }
    }, () => { }, () => {
      setTimeout(() => {
        this.highlightMicroSection();
      }, environment.timer.autoReturn);
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
            return this.returnSupplierMicroSectionParameterObj(element, this.recId, true);
          });
        }
      }
      this.isMicroSectionExpanded = true;
      this.setMicroSectionPassFail();
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
          this.supplierFunctionAttribute = new SupplierFunctionAttribute();
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
        const pageSortFilterInfoFunctionAttribute = new PageSortFilterInfo();
        pageSortFilterInfoFunctionAttribute.expandInfo = this.sapPartInspectionPlanService.setResultOrientedPageSortFilterInfo(pageSortFilterInfoFunctionAttribute);
        this.getAddSupplierFunctionAttribute(pageSortFilterInfoFunctionAttribute);
      }
      this.isSupplierFunctionAttributeExpanded = true;
    }, () => { }, () => {
      this.setFunctionAttributePassFail();
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
    }, () => { }, () => {
      this.setFunctionAttributePassFail();
    });
  }

  openConfirmationModal() {
    if (this.isDimensionMeasurementSummaryResult || this.isFunctionVariableSummaryResult || this.isMicroSectionParameterSummaryResult) {
      const modalRef = this.modalService.open(ConfirmationModalComponent, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'table-modal',
      });
      modalRef.componentInstance.message = 'Maverick Lot has been identified. Do you still want to submit this form?';

      modalRef.result.then(
        (response) => {
          const BreakException = {};
          try {
            this.saveSubmitForm();
          } catch (e) {
            if (e !== BreakException) { throw e; }
          }
        },
        () => {
        }
      );
    } else {
      this.saveSubmitForm();
    }
  }

  getSupplierSpcChartSummary(ip, recId) {
    this.apiService.getSupplierSpcChartSummary(ip, recId).subscribe((response) => {
      this.supplierSpcChartSummary = response.value;
    }, () => { }, () => {
      this.checkMavericLotDetected();
    });
  }

  checkMavericLotDetected() {
    const supplierFunctionAttributeTab = this.tabConfig?.filter(k => k.id === this.supplierFunctionAttributeTabId);
    const microSectionParameterTab = this.tabConfig?.filter(k => k.id === this.microSectionParameterTabId);
    const dimensionMeasurementTab = this.tabConfig?.filter(k => k.id === this.dimensionMeasurementTabId);
    const functionVariableTab = this.tabConfig?.filter(k => k.id === this.functionVariableTabId);
    const specWithMMCTab = this.tabConfig?.filter(k => k.id === this.specWithMMCId);
    const specWithLMCTab = this.tabConfig?.filter(k => k.id === this.specWithLMCId);
    const bowTwistTab = this.tabConfig?.filter(k => k.id === this.bowTwistTabId);
    const supplierDateCodeTab = this.tabConfig?.filter(k => k.id === this.supplierDateCodeTabId);
    // function attribute
    if (supplierFunctionAttributeTab && supplierFunctionAttributeTab.length > 0
      && supplierFunctionAttributeTab[0].isVisible === true && !this.isSupplierFunctionAttributeSummaryResult) {
      const funAttribute = this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierFunctionAttributeTabId)[0];
      this.setFunctionAttributePassFailSummaryResult = funAttribute && funAttribute !== undefined ?
        this.getSummaryPassFailEmptyResult(funAttribute.failIndicator, funAttribute.tabResult) : Constants.Empty;
    }
    // microsection
    if (microSectionParameterTab && microSectionParameterTab.length > 0
      && microSectionParameterTab[0].isVisible === true && !this.isMicroSectionParameterSummaryResult) {
      this.isMicroSectionParameterSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.microSectionParameterTabId).length > 0
        ? this.supplierSpcChartSummary.filter(x => x.tabId === this.microSectionParameterTabId)[0].mavericLotDetected : false;

      const microSection = this.supplierSpcChartSummary.filter(x => x.tabId === this.microSectionParameterTabId)[0];
      this.setMicroSectionPassFailSummaryResult = microSection && microSection !== undefined ? this.getSummaryPassFailEmptyResult(microSection.failIndicator, microSection.tabResult)
        : Constants.Empty;

      // const supplierFailedQuantity = new FailedQuantity();
      // supplierFailedQuantity.maverickLotDetected = this.isMicroSectionParameterSummaryResult;
      // supplierFailedQuantity.tabId = this.microSectionParameterTabId;
      const failedQty = this.supplierFailedQuantity?.filter(x => x.tabId === this.microSectionParameterTabId);
      failedQty?.forEach(element => {
        element.maverickLotDetected = this.isMicroSectionParameterSummaryResult;
      });
      // failedQty.maverickLotDetected = this.isMicroSectionParameterSummaryResult;
      // this.pushFailedElements(supplierFailedQuantity);



    }
    // dimention measurment
    if (dimensionMeasurementTab && dimensionMeasurementTab.length > 0
      && dimensionMeasurementTab[0].isVisible === true && !this.isDimensionMeasurementSummaryResult) {
      this.isDimensionMeasurementSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.dimensionMeasurementTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.dimensionMeasurementTabId)[0].mavericLotDetected : false;

      const dimention = this.supplierSpcChartSummary.filter(x => x.tabId === this.dimensionMeasurementTabId)[0];
      this.setDimensionMeasurementPassFailSummaryResult = dimention && dimention !== undefined ? this.getSummaryPassFailEmptyResult(dimention.failIndicator, dimention.tabResult) : Constants.Empty;

      const failedQty = this.supplierFailedQuantity?.filter(x => x.tabId === this.dimensionMeasurementTabId);
      failedQty?.forEach(element => {
        element.maverickLotDetected = this.isDimensionMeasurementSummaryResult;
      });
    }
    // function variable
    if (functionVariableTab && functionVariableTab.length > 0
      && functionVariableTab[0].isVisible === true && !this.isFunctionVariableSummaryResult) {
      this.isFunctionVariableSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.functionVariableTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.functionVariableTabId)[0].mavericLotDetected : false;

      const functionVariable = this.supplierSpcChartSummary.filter(x => x.tabId === this.functionVariableTabId)[0];
      this.setFunctionVariablePassFailSummaryResult = functionVariable && functionVariable !== undefined ?
        this.getSummaryPassFailEmptyResult(functionVariable.failIndicator, functionVariable.tabResult) : Constants.Empty;

      const failedQty = this.supplierFailedQuantity?.filter(x => x.tabId === this.functionVariableTabId);
      failedQty?.forEach(element => {
        element.maverickLotDetected = this.isFunctionVariableSummaryResult;
      });

    }
    // date code
    if (supplierDateCodeTab && supplierDateCodeTab.length > 0
      && supplierDateCodeTab[0].isVisible === true && !this.isDateCodeSummaryResult) {
      this.isDateCodeSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.dateCodeTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.dateCodeTabId)[0].tabResult : false;

      const dateCode = this.supplierSpcChartSummary.filter(x => x.tabId === this.dateCodeTabId)[0];
      this.setDateCodeSummaryResult = dateCode && dateCode !== undefined ? this.getSummaryPassFailEmptyResult(dateCode.failIndicator, dateCode.tabResult) : Constants.Empty;

    }
    // spec with mmc
    if (specWithMMCTab && specWithMMCTab.length > 0
      && specWithMMCTab[0].isVisible === true && !this.isSpecWithMMCSummaryResult) {
      this.isSpecWithMMCSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithMMCId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithMMCId)[0].tabResult : false;

      const specWithMMC = this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithMMCId)[0];
      this.setSpecWithMMCSummaryResult = specWithMMC && specWithMMC !== undefined ? this.getSummaryPassFailEmptyResult(specWithMMC.failIndicator, specWithMMC.tabResult) : Constants.Empty;

    }
    // spec with lmc
    if (specWithLMCTab && specWithLMCTab.length > 0
      && specWithLMCTab[0].isVisible === true && !this.isSpecWithLMCSummaryResult) {
      this.isSpecWithLMCSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithLMCId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithLMCId)[0].tabResult : false;


      const specWithLMC = this.supplierSpcChartSummary.filter(x => x.tabId === this.specWithLMCId)[0];
      this.setSpecWithLMCSummaryResult = specWithLMC && specWithLMC !== undefined ?
        this.getSummaryPassFailEmptyResult(specWithLMC.failIndicator, specWithLMC.tabResult) : Constants.Empty;
    }
    // bow twist
    if (bowTwistTab && bowTwistTab.length > 0
      && bowTwistTab[0].isVisible === true && !this.isBowTwistSummaryResult) {
      this.isBowTwistSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.bowTwistTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.bowTwistTabId)[0].tabResult : false;


      const bowTwist = this.supplierSpcChartSummary.filter(x => x.tabId === this.bowTwistTabId)[0];
      this.setBowTwistSummaryResult = bowTwist && bowTwist !== undefined ? this.getSummaryPassFailEmptyResult(bowTwist.failIndicator, bowTwist.tabResult) : Constants.Empty;
    }

    // sap based
    if (this.supplierSpcChartSummary.filter(x => x.tabId === this.sapBasedParameterTabId).length > 0) {
      this.isSupplierSapBasedTabSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.sapBasedParameterTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.sapBasedParameterTabId)[0].tabResult : false;


      const sapBased = this.supplierSpcChartSummary.filter(x => x.tabId === this.sapBasedParameterTabId)[0];
      this.setSapBasedSummaryResult = sapBased && sapBased !== undefined ? this.getSummaryPassFailEmptyResult(sapBased.failIndicator, sapBased.tabResult) : Constants.Empty;

    }
    // packing inspection
    if (this.supplierSpcChartSummary.filter(x => x.tabId === this.packingInspectionTabId).length > 0) {
      this.isSupplierPackingInspectionTabSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.packingInspectionTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.packingInspectionTabId)[0].tabResult : false;

      const packingInspection = this.supplierSpcChartSummary.filter(x => x.tabId === this.packingInspectionTabId)[0];
      this.setPackingInspectionSummaryResult = packingInspection && packingInspection !== undefined ?
        this.getSummaryPassFailEmptyResult(packingInspection.failIndicator, packingInspection.tabResult) : Constants.Empty;

    }
    // test report
    if (this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierTestReportTabId).length > 0) {
      this.isSupplierTestReportTabSummaryResult = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierTestReportTabId).length > 0 ?
        this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierTestReportTabId)[0].tabResult : false;

      const testReport = this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierTestReportTabId)[0];
      this.setTestReportSummaryResult = testReport && testReport !== undefined ? this.getSummaryPassFailEmptyResult(testReport.failIndicator, testReport.tabResult) : Constants.Empty;

      const failedQty = this.supplierFailedQuantity.filter(x => x.tabId === this.supplierTestReportTabId);
      failedQty.forEach(element => {
        element.failIndicator = testReport.failIndicator;
      });
    }

    // visual inspection
    if ((this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierVisualInspectionsTabId).length > 0) && !this.isSupplierVisualInspectionsSummaryResult) {

      const visualInspection = this.supplierSpcChartSummary.filter(x => x.tabId === this.supplierVisualInspectionsTabId)[0];
      this.setVisualInspectionSummaryResult = visualInspection && visualInspection !== undefined ?
        this.getSummaryPassFailEmptyResult(visualInspection.failIndicator, visualInspection.tabResult) : Constants.Empty;

      const failedQty = this.supplierFailedQuantity.filter(x => x.tabId === this.supplierVisualInspectionsTabId);
      failedQty.forEach(element => {
        element.failIndicator = visualInspection.failIndicator;
      });

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
    this.isAllTabResultPass = this.supplierFailedQuantity && this.supplierFailedQuantity.filter(x => x.failIndicator === 0).length > 0 ?
      false : true;
    let dimensionMeasurementMeverickLotDetected = false;
    let microSectionMeverickLotDetected = false;
    let functionVariableMeverickLotDetected = false;
    if (this.isAllTabResultPass) {
      this.isMavericLotDetected = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue).length
        > 0 ? true : false;
      if (this.isMavericLotDetected) {
        dimensionMeasurementMeverickLotDetected = this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue
          && x.tabId === this.dimensionMeasurementTabId)?.length > 0 ? this.isDimensionMeasurementSummaryResult : false;
        microSectionMeverickLotDetected = this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue
          && x.tabId === this.microSectionParameterTabId)?.length > 0 ? this.isMicroSectionParameterSummaryResult : false;
        functionVariableMeverickLotDetected = this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue
          && x.tabId === this.functionVariableTabId)?.length > 0 ? this.isFunctionVariableSummaryResult : false;
      }
      if (dimensionMeasurementMeverickLotDetected || microSectionMeverickLotDetected || functionVariableMeverickLotDetected) {
        this.summaryResult = 'Conditional ' + result[0].name;
      } else {
        this.summaryResult = result[0].name;
      }
    } else {
      this.summaryResult = result[1].name;
    }

  }

  isDisableBasedMaverikLotAndOverAllResult() {

    let dimensionMeasurementMeverickLotDetected = false;
    let microSectionMeverickLotDetected = false;
    let functionVariableMeverickLotDetected = false;
    this.isAllTabResultPass = this.supplierFailedQuantity && this.supplierFailedQuantity.filter(x => x.failIndicator === 0).length > 0 ?
      false : true;
    this.isMavericLotDetected = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue).length > 0 ?
      true : false;
    if (this.isMavericLotDetected) {
      dimensionMeasurementMeverickLotDetected = this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue
        && x.tabId === this.dimensionMeasurementTabId)?.length > 0 ? this.isDimensionMeasurementSummaryResult : false;
      microSectionMeverickLotDetected = this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue
        && x.tabId === this.microSectionParameterTabId)?.length > 0 ? this.isMicroSectionParameterSummaryResult : false;
      functionVariableMeverickLotDetected = this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue
        && x.tabId === this.functionVariableTabId)?.length > 0 ? this.isFunctionVariableSummaryResult : false;
    }

    if (this.isAllTabResultPass && !(dimensionMeasurementMeverickLotDetected || microSectionMeverickLotDetected || functionVariableMeverickLotDetected)) {
      // submit button and reject enabled
      this.summaryResult = result[0].name;
      return false;
    } else if (this.isAllTabResultPass && (dimensionMeasurementMeverickLotDetected || microSectionMeverickLotDetected || functionVariableMeverickLotDetected)) {
      // submit button enabled
      this.summaryResult = 'Conditional ' + result[0].name;
      return false;
    } else if (!this.isAllTabResultPass) {
      // submit button disabled and reject button enabled
      this.summaryResult = result[1].name;
      return true;
    }
  }

  isDisabledRejectButton() {
    let dimensionMeasurementMeverickLotDetected = false;
    let microSectionMeverickLotDetected = false;
    let functionVariableMeverickLotDetected = false;
    this.isAllTabResultPass = this.supplierFailedQuantity && this.supplierFailedQuantity.filter(x => x.failIndicator === 0).length > 0 ?
      false : true;
    this.isMavericLotDetected = this.supplierSpcChartSummary && this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue).length > 0 ?
      true : false;
    if (this.isMavericLotDetected) {
      dimensionMeasurementMeverickLotDetected = this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue
        && x.tabId === this.dimensionMeasurementTabId)?.length > 0 ? this.isDimensionMeasurementSummaryResult : false;
      microSectionMeverickLotDetected = this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue
        && x.tabId === this.microSectionParameterTabId)?.length > 0 ? this.isMicroSectionParameterSummaryResult : false;
      functionVariableMeverickLotDetected = this.supplierSpcChartSummary.filter(x => x.mavericLotDetected === true && x.dataCountToDetectMavericLot >= this.countValue
        && x.tabId === this.functionVariableTabId)?.length > 0 ? this.isFunctionVariableSummaryResult : false;
    }

    if (this.isAllTabResultPass && !(dimensionMeasurementMeverickLotDetected || microSectionMeverickLotDetected || functionVariableMeverickLotDetected)) {
      return true;
    } else if (this.isAllTabResultPass && (dimensionMeasurementMeverickLotDetected || microSectionMeverickLotDetected || functionVariableMeverickLotDetected)) {
      return false;
    } else if (!this.isAllTabResultPass) {
      return false;
    }
  }

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
        return this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Not Detected';
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
        return this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Not Detected';
      } else if (this.isDimensionMeasurementSummaryResult && this.setDimensionMeasurementPassFailSummaryResult === Constants.Empty) {
        this.setDimensionMeasurementPassFailSummaryResult = '';
        this.setDimensionMeasurementPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        if (isSufficientDataUsed) {
          this.mavericLotDetected();
          return this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Detected';
        } else {
          return this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Not Detected';
        }
      } else if (!this.isDimensionMeasurementSummaryResult && this.setDimensionMeasurementPassFailSummaryResult === Constants.Empty) {
        this.setDimensionMeasurementPassFailSummaryResult = '';
        this.setDimensionMeasurementPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setDimensionMeasurementPassFailSummaryResult + ' / Maverick Lot Not Detected';
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

        return this.setFunctionVariablePassFailSummaryResult + ' / Maverick Lot Not Detected';
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
          return this.setFunctionVariablePassFailSummaryResult + ' / Maverick Lot Detected';
        } else {
          return this.setFunctionVariablePassFailSummaryResult + ' / Maverick Lot Not Detected';
        }
      } else if (!this.isFunctionVariableSummaryResult && this.setFunctionVariablePassFailSummaryResult === Constants.Empty) {
        this.setFunctionVariablePassFailSummaryResult = '';
        this.setFunctionVariablePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setFunctionVariablePassFailSummaryResult + '/ Maverick Lot Not Detected';
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
          return this.setMicroSectionPassFailSummaryResult + ' / Maverick Lot Detected';
        } else {
          return this.setMicroSectionPassFailSummaryResult + ' / Maverick Lot Not Detected';
        }
      } else if (!this.isMicroSectionParameterSummaryResult && this.setMicroSectionPassFailSummaryResult === Constants.Empty) {
        this.setMicroSectionPassFailSummaryResult = '';
        this.setMicroSectionPassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setMicroSectionPassFailSummaryResult + '/ Maverick Lot Not Detected';
      }
    } else if (tabId === this.supplierFunctionAttributeTabId) {
      const { isFail, isResultEmpty, tabHasData } = this.checkTabHasData(this.supplierFunctionAttributeTabId);
      failIndicator = this.failIndicator(isFail, failIndicator, isResultEmpty, tabHasData);

      if (failIndicator === Numbers.One) {
        this.setFunctionAttributePassFailSummaryResult = '';
        this.setFunctionAttributePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setFunctionAttributePassFailSummaryResult;
      } else if (failIndicator === Numbers.Default) {
        this.setFunctionAttributePassFailSummaryResult = '';
        this.setFunctionAttributePassFailSummaryResult = this.returnPassFailResult(failIndicator);
        return this.setFunctionAttributePassFailSummaryResult;
      } else if (failIndicator === Numbers.Two) {
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
      // if (this.supplierTestReportTabDetails.length <= 0) {
      //   return this.setTestReportSummaryResult = '';
      // }
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
      // if (this.supplierVisualInspectionDetails.length <= 0) {
      //   return this.setVisualInspectionSummaryResult = '';
      // }
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
    const isFail = this.supplierFailedQuantity.filter(x => x.tabId === tabId && x.failIndicator === 0).length > 0;
    const isResultEmpty = this.supplierFailedQuantity.filter(x => x.tabId === tabId && x.failIndicator === 2).length > 0;
    const tabHasData = this.supplierFailedQuantity.filter(x => x.tabId === tabId).length > 0;
    return { isFail, isResultEmpty, tabHasData };
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

  validateDateCode() {
    const supplierDateCode = new SupplierDateCode();
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
    return supplierDateCode;
  }

  checkPackagingQuantityGreaterThanZero(value) {
    const normalValue = Number(this.formInput.controls[this.properties.packagingQuantity].value);
    if (Math.floor(value) !== value && value.toString().indexOf('.') !== -1) {
      this.isPackingQuantityGreaterThanZero = false;
    } else if (normalValue > 0 && (normalValue + Number(value)) > 0) {
      this.isPackingQuantityGreaterThanZero = true;
    } else {
      this.isPackingQuantityGreaterThanZero = false;
    }
  }

  onCopyClicked() {
    const element = document.getElementById('copy');
    const part = this.formInput.controls[this.properties.partNo].value;
    if (part && part !== undefined && part !== null) {
      this.copyMessage = 'Part No copied successfully.';
      element.setAttribute('style', 'color: green');
      this.clipboard.copy(part);
    } else {
      element.setAttribute('style', 'color: red');
      this.copyMessage = 'Please select Part No.';
    }
  }

  supplierValue(value: any) {

    return `${value.supplier.vendorName ?? Constants.Empty}(${value.supplier.vendorCode ?? Constants.Empty})`;
  }



}






