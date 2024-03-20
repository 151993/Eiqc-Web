import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

// START : Enums

// #region PrimeNG
export enum PrimeNGDateSelectionMode {
  Single = 'single',
  Multiple = 'multiple',
  Range = 'range',
}
// #endregion PrimeNG
// Why use enum and not const? Const value can be changed. Enum does not allow that.
export enum ToastMessage {
  AdvanceSearchErrorMsg = 'Message.AdvanceSearchInputError',
  Blank = '',
  DataDeleted = 'Message.DataDeleted',
  DataSaved = 'Message.DataSaved',
  DownloadError = 'Message.DownloadError',
  FileExist = 'Message.FileExist',
  InvalidFileTypeError = 'Message.InvalidFileTypeError',
  Saved = 'Message.Saved',
  ServerError = 'Message.ServerError',
  UnableToDeleteRecord = 'Message.UnableToDeleteRecord',
  NotAllowedToRemove = 'Message.NotAllowedToRemove',
  NotData = 'Message.NotData',
  NotFound = 'Message.NotFound',
  NotPermitted = 'Message.NotPermitted',
  Requires = 'Message.Requires',
  RequireFileUploadId = 'Message.RequireFileUploadId',
  PropertyTagsNotMatchError = 'Message.PropertyTagsNotMatchError',
  PropertyNotMatchError = 'Message.PropertyNotMatchError',
  FileUploadExceedLimitCount = 'Message.FileUploadExceedLimitCount',
  FileUploadExceedLimitSize = 'Message.FileUploadExceedLimitSize',
  FileCountRemainingTip = 'Message.FileCountRemainingTip',
  FileSizeRemainingTip = 'Message.FileSizeRemainingTip',
  PermissionsReEvaluation = 'Message.PermissionsReEvaluation',
  SyncFromTM1 = 'Message.SyncFromTM1',
  SyncFromSAP = 'Message.SyncFromSAP',
  DataExist = 'Message.DataExist',
  WorkCellRequired = 'Message.WorkCellRequired',
  DivisionModelNumberRequired = 'Message.DivisionModelNumberRequired',
  GenWIRequired = 'Message.GenWIRequired',
  RefDocRequired = 'Message.RefDocRequired',
  AdminCertificationsRequired = 'Message.AdminCertificationsRequired',
  ProductLifeCycleStageRequired = 'Message.ProductLifeCycleStageRequired',
  JabilOwnerContactRequired = 'Message.JabilOwnerContactRequired',
  MpnReasonRequired = 'Message.MpnReasonRequired',
  VisualInspectionRequired = 'Message.VisualInspectionRequired',
  SAPBasedRequired = 'Message.SAPBasedRequired',
  TestReportRequired = 'Message.TestReportRequired',
  FunctionAttributeRequired = 'Message.FunctionAttributeRequired',
  DimensionalMeasurementsRequired = 'Message.DimensionalMeasurementsRequired',
  FunctionVariableRequired = 'Message.FunctionVariableRequired',
  MicroSectionParameterRequired = 'Message.MicroSectionParameterRequired',
  SpecWithMMCRequired = 'Message.SpecWithMMCRequired',
  SpecWithLMCRequired = 'Message.SpecWithLMCRequired',
  DateCodeRequired = 'Message.DateCodeRequired',
  PackingInspectionRequired = 'Message.PackingInspectionRequired',
  BowTwistRequired = 'Message.BowTwistRequired',
  DrawingDetailsRequired = 'Message.DrawingDetailsRequired',
  ValidName = 'Message.ValidName',
  FilterByColumnNotExist = 'Message.FilterByColumnNotExist',
  SupplierDetailsRequired = 'Message.SupplierDetailsRequired',
  SupplierContactRequired = 'Message.SupplierContactRequired',
  CommentsRequired = 'Message.CommentsRequired',
  DefectTypeCannotBeEmpty = 'Message.DefectTypeCannotBeEmpty',
  SpecWithMMCMissingGeometryTolerance = 'Message.SpecWithMMCMissingGeometryTolerance',
  FutureDateNotRequired = 'Message.FutureDateNotRequired',
  BatchQuantityExceeds = 'Message.BatchQuantityExceeds',
  AttachmentRequired = 'Message.AttachmentRequired'
}

// #region Storage
export enum LocalStorage {
  UserDisplayConfigurationTableSettings = 'userDisplayConfigurationTableSettings',
  UserDisplayTableSettings = 'userDisplayTableSettings',
  DefaultLanguage = 'defaultLanguage',
  ExpirationTime = 'expirationTime',
  RecentEvents = 'recentEvents',
  ReturnUrl = 'returnUrl',
  Permissions = 'Permissions',
  Roles = 'Roles',
  User = 'User',
  Site = 'Site'
}

export enum Cookie {
  Auth = 'auth',
  ExpireTime = 'expireTime',
}

// #endregion Storage

export enum DateTimeFormat {
  dateFormat = 'MMM DD, YYYY',
  dateFormatWithTime = 'MMM DD, YYYY, h:mm:ss A',
}

export enum CustomHeader {
  SkipLoadingHeader = 'X-Skip-Loading',
}

export enum Roles {
  Admin = 'Global Admin',
}

export enum ChangeReasonButton {
  Save = 'Label.Save',
  Delete = 'Label.Delete',
}



// #region Audit Log
export enum AuditLogEntityTypes {
  AuditTrail = 'AuditTrail',
  AuditTrailDetail = 'AuditTrailDetail',
  User = 'User',
  Role = 'Role',
  Region = 'Region',
  Customer = 'Customer',
  Division = 'Division',
  DivisionType = 'DivisionType',
  Process = 'Process',
  Tag = 'Tag',
  PAndL = 'PAndL',
  RejectReason = 'RejectReason',
  Site = 'Site',
  DBPRegion = 'DBPRegion',
  EventType = 'EventType',
  KPI = 'KPI',
  FunctionalArea = 'FunctionalArea',
  JabilCorporateInitiative = 'JabilCorporateInitiative',
  EmailTemplate = 'EmailTemplate',
  DBPCountdown = 'DBPCountdown',
  Project = 'Project',
  Department = 'Department',
  WorkCell = 'WorkCell',
  Location = 'Location',
  Country = 'Country',
  SiteUser = 'SiteUser',
  Buyer = 'Buyer',
  CompletedGRS = 'CompletedGRS',
  DefectType = 'DefectType',
  CTParameter = 'CTParameter',
  UOM = 'UOM',
  GoodsReceiveUser = 'GoodsReceiveUser',
  Group = 'Group',
  GRSSAPResult = 'GRSSAPResult',
  InspectionToolsType = 'InspectionToolsType',
  InstrumentType = 'InstrumentType',
  LotInspectionQty = 'LotInspectionQty',
  ParameterCategory = 'ParameterCategory',
  ParameterType = 'ParameterType',
  PartCAF = 'PartCAF',
  PCCode = 'PCCode',
  ReceiveGoodsInfo = 'ReceiveGoodsInfo',
  ReceiveGoodsInfoManual = 'ReceiveGoodsInfoManual',
  Rosetta = 'Rosetta',
  DispositionType = 'DispositionType',
  SupplierForm = 'SupplierForm',
  SupplierFormVIS = 'SupplierFormVIS',
  SupplierFormCountParameter = 'SupplierFormCountParameter',
  SupplierFormTestReport = 'SupplierFormTestReport',
  SupplierFormSAPParameter = 'SupplierFormSAPParameter',
  SupplierFormBowTwistParameter = 'SupplierFormBowTwistParameter',
  SupplierFormSpecialParameter = 'SupplierFormSpecialParameter',
  SupplierFormResultOrientedParameter = 'SupplierFormResultOrientedParameter',
  SupplierFormPartDateCode = 'SupplierFormPartDateCode',
  SupplierFormPackaging = 'SupplierFormPackaging',
  SupplierFormBowTwistActual = 'SupplierFormBowTwistActual',
  SupplierFormFunPara = 'SupplierFormFunPara',
  SupplierFormFunParaActual = 'SupplierFormFunParaActual',
  SupplierFormLPosition = 'SupplierFormLPosition',
  SupplierFormLPositionActual = 'SupplierFormLPositionActual',
  SupplierFormMeasurementParameter = 'SupplierFormMeasurementParameter',
  SupplierFormMeasurementParameterActual = 'SupplierFormMeasurementParameterActual',
  SupplierFormMicroSection = 'SupplierFormMicroSection',
  SupplierFormMicroSectionActual = 'SupplierFormMicroSectionActual',
  SupplierFormMPositionActual = 'SupplierFormMPositionActual',
  SupplierFormMPosition = 'SupplierFormMPosition',
  SupplierAttachment = 'SupplierAttachment',
  AttachmentRequired = 'AttachmentRequired',
  FormCountParameter = 'FormCountParameter',
  FormFunPara = 'FormFunPara',
  FormFunParaActual = 'FormFunParaActual',
  FormLPosition = 'FormLPosition',
  FormLPositionActual = 'FormLPositionActual',
  FormMeasurementParameterActual = 'FormMeasurementParameterActual',
  FormMeasurementParameter = 'FormMeasurementParameter',
  FormBowTwistActual = 'FormBowTwistActual',
  FormMicroSection = 'FormMicroSection',
  FormMicroSectionActual = 'FormMicroSectionActual',
  FormMPosition = 'FormMPosition',
  FormPackaging = 'FormPackaging',
  FormType = 'FormType',
  FormVIS = 'FormVIS',
  FormTestReport = 'FormTestReport',
  FormStatus = 'FormStatus',
  FormResultOrientedParameter = 'FormResultOrientedParameter',
  FormSpecialParameter = 'FormSpecialParameter',
  FormPartDateCode = 'FormPartDateCode',
  FormMPositionActual = 'FormMPositionActual',
  FormBowTwistParameter = 'FormBowTwistParameter',
  FormSAPParameter = 'FormSAPParameter',
  Form = 'Form',
  PartMPositionTolerance = 'PartMPositionTolerance',
  PartResultOrientedParameter = 'PartResultOrientedParameter',
  PartMicrosection = 'PartMicrosection',
  PartLPositionTolerance = 'PartLPositionTolerance',
  PartTestReportParameter = 'PartTestReportParameter',
  PartFunParameter = 'PartFunParameter',
  PartDateCode = 'PartDateCode',
  PartMeasurementParameter = 'PartMeasurementParameter',
  PartCountParameter = 'PartCountParameter',
  PartBowTwistParameter = 'PartBowTwistParameter',
  Part = 'Part',
  SamplingPlan = 'SamplingPlan',
  GRSSupplierForm = 'GRSSupplierForm',
  PCCodeInspectionToolsType = 'PCCodeInspectionToolsType',
  Inspection = 'Inspection',
  InspectionTools = 'InspectionTools',
  Instrument = 'Instrument',
  GRS = 'GRS',
  SAPPartInspectionPlan = 'SAPPartInspectionPlan',
  FormPartSAPFailedQty = 'FormPartSAPFailedQty',
  Commodity = 'Commodity',
  AdminCertification = 'Admin Certification',
  MaterialGroup = 'MaterialGroup',
  ParameterManagement = 'ParameterManagement',
  TestReport = 'TestReport',
  ParameterTypeCode = 'ParameterTypeCode',
  DateCode = 'DateCode',
  WorkCellUser = 'WorkCellUser',
  PartDimension = 'PartDimension',
  BowTwistFormula = 'BowTwistFormula',
  DCCConfiguration = 'DCCConfiguration',
  CommodityCategory = 'CommodityCategory',
  Supplier = 'Supplier',
  NonJabilUser = 'NonJabilUser',
  PurchaseOrder = 'PurchaseOrder',
  CertificateType = 'CertificateType',
  SupplierMeasurement = 'SupplierMeasurementSubmission',
  DefectManagement = 'DefectManagement',
  SampleSizeCalculation = 'SampleSizeCalculation'
}

export enum AuditLogAuditLogType {
  Configuration = 1,
}
// #endregion Audit Log

// #region Data Operator
export enum FilterConditions {
  equals = 'equals',
  contains = 'contains',
}

export enum Symbol {
  Hyphen = '-',
}

export enum SortOrderDirection {
  Asc = 1,
  Desc = 2,
}

export enum Operator {
  StartsWith = 1,
  IsEqualTo = 2,
  Contains = 3,
  EndsWith = 4,
  And = 5,
  Or = 6,
  NotEqualTo = 7,
}

export enum SearchOperator {
  StartsWith = 1,
  IsEqualTo = 2,
  IsLessThan = 6,
  IsLessThanOrEqual = 7,
  IsGreaterThan = 8,
  IsGreaterThanOrEqual = 9,
  Contains = 3,
  NotEqualTo = 5,
  EndsWith = 4,
  IsNull = 10,
  IsNotNull = 11,
}

export const searchOperatorsMap = new Map<number, string>([
  [SearchOperator.StartsWith, 'Starts With'],
  [SearchOperator.IsEqualTo, 'Is Equal To'],
  [SearchOperator.IsLessThan, 'Is Less Than'],
  [SearchOperator.IsLessThanOrEqual, 'Is Less Than Or Equal To'],
  [SearchOperator.IsGreaterThan, 'Is Greater Than'],
  [SearchOperator.IsGreaterThanOrEqual, 'Is Greater Than Or Equal To'],
  [SearchOperator.Contains, 'Contains'],
  [SearchOperator.NotEqualTo, 'Not Equal To'],
  [SearchOperator.EndsWith, 'Ends With'],
  [SearchOperator.IsNull, 'Is Null'],
  [SearchOperator.IsNotNull, 'Is Not Null'],
]);

export const operatorMap = new Map<number, string>([
  [Operator.StartsWith, 'Starts With'],
  [Operator.IsEqualTo, 'Is Equal To'],
  [Operator.Contains, 'Contains'],
  [Operator.EndsWith, 'Ends With'],
  [Operator.NotEqualTo, 'Not Equal To'],
]);

// #endregion Data Operator

export enum Constants {
  All = 'All',
  Empty = '',
}

export enum YesNo {
  Yes = 'Yes',
  No = 'No',
}

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum StatusType {
  Active = 1,
  Inactive = 2,
}

// #region Error Code
export enum ErrorCodes {
  UnableToDeleteRecord = 2000,
  NoPermission = 3000,
  NotFound = 404,
}
// #endregion Error Code

// #region Validation
export enum ControlStates {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED',
}

export enum ValidationErrorCodes {
  required = 'required',
  validateWhiteSpace = 'validateWhiteSpace',
  pattern = 'pattern',
  alreadyExists = 'alreadyExists',
  validateCodeInputRequirement = 'validateCodeInputRequirement'
}

export enum PatternValidations {
  CodePattern = '^[a-zA-Z][a-zA-Z0-9-_]*',
  ClauseNumberPattern = '^[a-zA-Z0-9.]*',
  LanguageCodePattern = '^[A-Z]*',
  YearPattern = '^[0-9]*$'
}
// #endregion Validation

// #region Auth Claims
export enum ClaimType {
  permission = 'permission',
}
// #endregion Auth Claims

// #region EmailGuide
export enum UserEmailType {
  User_Added = 1,
}
// #endregion EmailGuide

// END : Enum

// Start : Global Settings
export const changeReasonModalConfig: NgbModalOptions = {
  ariaLabelledBy: 'modal-basic-title',
  size: 'lg',
};

// END : Global Settings

// Start : CustomFieldType
export enum CustomFieldType {
  FreeText = 1,
  DropDownList = 2,
  MultipleSelect = 3,
  RadioSelect = 4,
}

export const customFieldType = [
  { type: 'FreeText', value: 1 },
  { type: 'DropDownList', value: 2 },
  { type: 'MultipleSelect', value: 3 },
  { type: 'RadioSelect', value: 4 },
];
// END : CustomFieldType

// Start : ApproverLevel
export enum ApproverLevel {
  Bronze = 1,
  Silver = 2,
  GreenBelt = 3,
  BlackBelt = 4,
  Financial = 5,
}
// END : ApproverLevel

// START: Email Template
export enum UserEmailTemplate {
  User_Add_Site = 1,
  User_Edit_Site = 2,
}
export enum SiteEmailTemplate {
  Site_Add_Site = 3,
  Site_Edit_Site = 4,
}
// END : Email Template

// Start : State
export enum State {
  InProgress = 1,
  Submitted = 2,
  Cancelled = 3,
  Closed = 4,
}
// END : State

// Start : ProjectType
export enum ProjectType {
  PT_Blitz = 1,
  PT_PDCA = 2,
  PT_A3 = 3,
  PT_8D = 4,
  PT_DMADV = 5,
  PT_DMAIC = 6,
}

export const projectType = [
  { name: 'Blitz', value: 1 },
  { name: 'PDCA', value: 2 },
  { name: 'A3', value: 3 },
  { name: '8D', value: 4 },
  { name: 'DMADV', value: 5 },
  { name: 'DMAIC', value: 6 },
];
// END : ProjectType

// Start : Certification Level
export enum CertificationLevel {
  Bronze = 1,
  Silver = 2,
  QECertification = 3,
  GreenBelt = 4,
  BlackBelt = 5,
}

export const certificationLevel = [
  { name: 'Bronze', value: 1 },
  { name: 'Silver', value: 2 },
  { name: 'QECertification', value: 3 },
  { name: 'GreenBelt', value: 4 },
  { name: 'BlackBelt', value: 5 },
];
// END : Certification Level

//#region Okta

/**
 * Authentication mode supported in the application
 */
export enum AuthenticationMode {
  OKTA = 'OKTA',
  JWT = 'JWT'
}

//#endregion


/**
 * web protocols
 */
export enum ProtocolTypes {
  Http = 'http://',
  Https = 'https://'
}

/**
 * General local storage items
 */
export enum LocalStorageItems {
  TCCSUserDataStorage = 'tccs-user-data-storage'
}

export enum Environments {
  Local = 'Local',
  Development = 'Development',
  QualityAssurance = 'Quality Assurance',
  Staging = 'Staging',
  Production = 'Production'
}

export enum ComponentType {
  Detail = 'Detail',
  List = 'List'
}

export enum FieldNameList {
  Commodity = 'commodity'
}

export enum PartPlanStateType {
  Draft = 1,
  New_Inspection_Plan_Submission_Required_By_Supplier = 2,
  Pending_Approval_By_Jabil = 3,
  Approved_By_SQE = 4,
  Rejected_By_SQE = 5,
  Deactivated_By_SQE = 6,
  Redefined_By_SQE = 7,
  Approved_By_DCC = 8,
  Rejected_By_DCC = 9,
  Submitted_By_Supplier = 10,
  Rejected_By_Supplier = 11
}


export enum DefectSection {
  Visual_Inspection = 1,
  Test_Report = 2,
  Function_Attribute = 3,
  Function_Variable = 4,
  Dimension_Measurement = 5,
  Bow_Twist = 6,
  Date_Code = 7,
  Spec_with_MMC = 8,
  Spec_with_LMC = 9,
  Microsection = 10,
  SAP_BASED = 11,
}

export enum PurchaseOrderState {
  Pending = 1,
  Complete = 2
}

export const purchaseOrderState = new Map<number, string>([
  [PurchaseOrderState.Pending, 'Pending'],
  [PurchaseOrderState.Complete, 'Complete']
]);

export const resultExpected = [
  { name: 'OK', id: 1, isChecked: true },
  { name: 'NG', id: 2, isChecked: false },
];

export enum OKNGType {
  OK = 1,
  NG = 2,
}
export const result = [
  { name: 'Pass', id: 1 },
  { name: 'Fail', id: 2 },
];

export enum TabType {
  Count = 1,
  ResultOriented = 2,
  Measurement = 3,
  TextPrepared = 4,
  FUN = 5,
  MicroSection = 6,
  BowAndTwist = 7,
  DateCode = 8,
  MPositionTolerance = 9,
  LPositionTolerance = 10,
  TestReport = 11,
  VisualInspection = 1,
  PackingInspection = 13,
  SAPBased = 14
}

export const tabType = new Map<number, string>([
  [TabType.Count, 'Count'],
  [TabType.ResultOriented, 'ResultOriented'],
  [TabType.Measurement, 'Measurement'],
  [TabType.TestReport, 'TestReport'],
  [TabType.FUN, 'FUN'],
  [TabType.MicroSection, 'MicroSection'],
  [TabType.BowAndTwist, 'BowAndTwist'],
  [TabType.DateCode, 'DateCode'],
  [TabType.MPositionTolerance, 'MPositionTolerance'],
  [TabType.LPositionTolerance, 'LPositionTolerance'],
  [TabType.TextPrepared, 'TextPrepared']
]);


export enum SpecType {
  Select = 0,
  Default = 1,
  Special = 2
}

export enum MasterInspectionType {
  FUN = 1,
  DIM = 2,
  VIS = 3
}

export const specType = new Map<number, string>([
  [SpecType.Default, 'Default'],
  [SpecType.Special, 'Special']
]);


export enum Unit {
  mm = 1,
  inch = 2
}

export const unitType = [
  { id: Unit.mm, name: 'mm' },
  { id: Unit.inch, name: 'inch' }
];

export const unit = new Map<number, string>([
  [Unit.mm, 'mm'],
  [Unit.inch, 'inch']
]);

export const tabConfiguration = [
  { id: TabType.ResultOriented, name: 'FunctionAttribute', isVisible: false },
  { id: TabType.Measurement, name: 'DimensionalMeasurements', isVisible: false },
  { id: TabType.FUN, name: 'FunctionVariable', isVisible: false },
  { id: TabType.MicroSection, name: 'MicroSectionParameter', isVisible: false },
  { id: TabType.BowAndTwist, name: 'BowTwist', isVisible: false },
  { id: TabType.DateCode, name: 'DateCode', isVisible: false },
  { id: TabType.MPositionTolerance, name: 'SpecWithMMC', isVisible: false },
  { id: TabType.LPositionTolerance, name: 'SpecWithLMC', isVisible: false },
  { id: TabType.TextPrepared, name: 'TextPrepared', isVisible: false },
];


export enum Operators {
  Addition = '+',
  Subtraction = '-',
  Multiplication = '*',
  Division = '/',
  Exponential = '^'
}


export enum Numbers {
  MinusOne = -1,
  Default = 0,
  One = 1,
  Two = 2,
  TwentyFive = 25,
  Thirty = 30,
  Twenty = 20,
  Hundred = 100,
  Forty = 40
}

export enum DataType {
  CTQ = 1,
  NONCTQ = 2
}

export enum ChartType {
  xBarR = 1,
  xBarS = 2,
  IMR = 3,
  RangeXBarR = 4,
  RangeXBarS = 5,
  RangeIMR = 6
}


export enum DimensionDefaultConstant {
  TotalTolerance = 1,
  ActualMeasuredGeometry = 2,
  Result = 3,
}


export const chartType = [
  { id: ChartType.xBarR, name: 'xBar-R' },
  { id: ChartType.xBarS, name: 'xBar-S' },
  { id: ChartType.IMR, name: 'IMR' }
];

export const dataTypes = [
  { id: DataType.CTQ, name: 'CTQ' },
  { id: DataType.NONCTQ, name: 'NON-CTQ' }
];

export enum UserType {
  Supplier = 1,
  Customer = 2,
  User = 3,
  DCC = 5
}

export const userTypes = [
  { id: UserType.Supplier, name: 'Supplier' },
  { id: UserType.Customer, name: 'Customer' }
];


export enum RoleType {
  Global_Admin = 1,
  Site_SME = 2,
  Jabil_SQE = 3,
  Jabil_IQC = 4,
  DCC_User = 5,
  Supplier = 6,
  Jabil_Default_User = 7,
  Customer = 8,
}

export const roleTypes = [
  { id: RoleType.Global_Admin, name: 'Global Admin' },
  { id: RoleType.Site_SME, name: 'Site SME' },
  { id: RoleType.Jabil_SQE, name: 'Jabil SQE' },
  { id: RoleType.Jabil_IQC, name: 'Jabil IQC' },
  { id: RoleType.DCC_User, name: 'DCC' },
  { id: RoleType.Supplier, name: 'Supplier' },
  { id: RoleType.Jabil_Default_User, name: 'Jabil Default User' },
  { id: RoleType.Customer, name: 'Customer' },
];


/*
1	"Global_Admin"	"Global Admin"
2	"Site_SME"	"Site SME"
3	"Jabil_SQE"	"Jabil SQE"
4	"Jabil_IQC"	"Jabil IQC"
5	"DCC_User"	"DCC"
6	"Supplier"	"Supplier"
7	"Jabil_Default_User"	"Jabil Default User"
8	"Customer"	"Customer"

*/




export enum CommodityCategoryOption {
  Global = 1,
  SiteBased = 2
}

export const commodityCategoryOption = [
  { id: CommodityCategoryOption.Global, name: 'Global' },
  { id: CommodityCategoryOption.SiteBased, name: 'Site Based' }
];

export enum CommodityCategoryType {
  Electrical = 1,
  Mechanical = 2
}

export const commodityCategoryType = [
  { id: CommodityCategoryType.Electrical, name: 'Electrical' },
  { id: CommodityCategoryType.Mechanical, name: 'Mechanical' }
];

export enum Options {
  Other = 'Other',
}

export enum YesNoOptions {
  Yes = 1,
  No = 0
}


export const yesNoOptions = [
  { id: YesNoOptions.Yes, name: 'Yes' },
  { id: YesNoOptions.No, name: 'No' }
];



export enum AcceptRejectOptions {
  Accept = 1,
  Reject = 2
}
export const acceptRejectOptions = [
  { id: AcceptRejectOptions.Accept, name: 'Accept' },
  { id: AcceptRejectOptions.Reject, name: 'Reject' }
];


export enum ChartRule {
  RuleOne = 1,
  RuleTwo = 2,
  RuleThree = 3,
  RuleFour = 4,
  RuleFive = 5,
  RuleSix = 6,
  RuleSeven = 7,
  RuleEight = 8,
}

export const chartRules = [
  { id: ChartRule.RuleOne, name: 'Rule 1: One point out of the control limits of the process limit' },
  { id: ChartRule.RuleTwo, name: 'Rule 2: Six consecutive points ascending or descending' },
  { id: ChartRule.RuleThree, name: 'Rule 3: Fourteen consecutive  points alternating Up then down' },
  { id: ChartRule.RuleFour, name: 'Rule 4: Nine points in one side of the mean' },
  { id: ChartRule.RuleFive, name: 'Rule 5: Two (or three) out of three last points in the 3- sigma band' },
  { id: ChartRule.RuleSix, name: 'Rule 6: Four (or five) out of five consecutive points more than 1 sigma from center line' },
  { id: ChartRule.RuleSeven, name: 'Rule 7: Fifteen consecutive points between plus minus 1 sigma' },
  { id: ChartRule.RuleEight, name: 'Rule 8: Eight consecutive  points out of 1 sigma zone' },
];



export enum DefaultParameterColumn {
  MediaCode = 1,
  MFG = 2,
  MPN = 3
}

export const defaultParameterColumn = [
  { id: DefaultParameterColumn.MediaCode, parameterName: 'Media Code' },
  { id: DefaultParameterColumn.MFG, parameterName: 'MFG' },
  { id: DefaultParameterColumn.MPN, parameterName: 'MPN' }
];

export enum DefaultCommonConstants {
  Default = 'Default',

}

export const spcChartConstants = [
  { id: 2, a2: 1.880, d3: 0.000, d4: 3.268, d2: 1.128 },
  { id: 3, a2: 1.023, d3: 0.000, d4: 2.574, d2: 1.693 },
  { id: 4, a2: 0.729, d3: 0.000, d4: 2.282, d2: 2.059 },
  { id: 5, a2: 0.577, d3: 0.000, d4: 2.114, d2: 2.326 },
  { id: 6, a2: 0.483, d3: 0.000, d4: 2.004, d2: 2.534 },
  { id: 7, a2: 0.419, d3: 0.076, d4: 1.924, d2: 2.704 },
  { id: 8, a2: 0.373, d3: 0.136, d4: 1.864, d2: 2.847 },
  { id: 9, a2: 0.337, d3: 0.184, d4: 1.816, d2: 2.970 },
  { id: 10, a2: 0.308, d3: 0.223, d4: 1.777, d2: 3.078 },
  { id: 11, a2: 0.285, d3: 0.256, d4: 1.744, d2: 3.173 },
  { id: 12, a2: 0.266, d3: 0.283, d4: 1.717, d2: 3.259 },
  { id: 13, a2: 0.249, d3: 0.307, d4: 1.693, d2: 3.336 },
  { id: 14, a2: 0.235, d3: 0.328, d4: 1.672, d2: 3.407 },
  { id: 15, a2: 0.223, d3: 0.347, d4: 1.653, d2: 3.472 },
  { id: 16, a2: 0.212, d3: 0.363, d4: 1.637, d2: 3.532 },
  { id: 17, a2: 0.203, d3: 0.378, d4: 1.622, d2: 3.588 },
  { id: 18, a2: 0.194, d3: 0.391, d4: 1.609, d2: 3.640 },
  { id: 19, a2: 0.187, d3: 0.404, d4: 1.597, d2: 3.689 },
  { id: 20, a2: 0.180, d3: 0.415, d4: 1.585, d2: 3.735 },
];

export const spcChartConstantsXBarS = [
  { id: 2, a1: 3.76, a3: 2.66, b3: 0, b4: 3.27 },
  { id: 3, a1: 2.39, a3: 1.95, b3: 0, b4: 2.57 },
  { id: 4, a1: 1.88, a3: 1.63, b3: 0, b4: 2.27 },
  { id: 5, a1: 1.60, a3: 1.43, b3: 0, b4: 2.09 },
  { id: 6, a1: 1.41, a3: 1.29, b3: 0.03, b4: 1.97 },
  { id: 7, a1: 1.28, a3: 1.18, b3: 0.12, b4: 1.88 },
  { id: 8, a1: 1.17, a3: 1.10, b3: 0.19, b4: 1.81 },
  { id: 9, a1: 1.09, a3: 1.03, b3: 0.24, b4: 1.76 },
  { id: 10, a1: 1.03, a3: 0.98, b3: 0.28, b4: 1.72 },
  { id: 11, a1: 0.97, a3: 0.93, b3: 0.32, b4: 1.68 },
  { id: 12, a1: 0.93, a3: 0.89, b3: 0.35, b4: 1.65 },
  { id: 13, a1: 0.88, a3: 0.85, b3: 0.38, b4: 1.62 },
  { id: 14, a1: 0.85, a3: 0.82, b3: 0.41, b4: 1.59 },
  { id: 15, a1: 0.82, a3: 0.79, b3: 0.43, b4: 1.57 },
  { id: 16, a1: 0.79, a3: 0.76, b3: 0.45, b4: 1.55 },
  { id: 17, a1: 0.76, a3: 0.74, b3: 0.47, b4: 1.53 },
  { id: 18, a1: 0.74, a3: 0.72, b3: 0.48, b4: 1.52 },
  { id: 19, a1: 0.72, a3: 0.70, b3: 0.50, b4: 1.50 },
  { id: 20, a1: 0.70, a3: 0.68, b3: 0.51, b4: 1.49 },
  { id: 21, a1: 0.68, a3: 0.66, b3: 0.52, b4: 1.48 },
  { id: 22, a1: 0.66, a3: 0.65, b3: 0.53, b4: 1.47 },
  { id: 23, a1: 0.65, a3: 0.63, b3: 0.54, b4: 1.46 },
  { id: 24, a1: 0.63, a3: 0.62, b3: 0.55, b4: 1.45 },
  { id: 25, a1: 0.62, a3: 0.61, b3: 0.56, b4: 1.44 },
  { id: 30, a1: 0.56, d3: 0.55, b3: 0.60, b4: 1.40 },
  { id: 35, a1: 0.52, d3: 0.51, b3: 0.63, b4: 1.37 },
  { id: 40, a1: 0.48, a3: 0.48, b3: 0.66, b4: 1.34 },
  { id: 45, a1: 0.45, a3: 0.45, b3: 0.68, b4: 1.32 },
  { id: 50, a1: 0.43, a3: 0.43, b3: 0.70, b4: 1.30 },
  { id: 55, a1: 0.41, a3: 0.41, b3: 0.71, b4: 1.29 },
  { id: 60, a1: 0.39, a3: 0.39, b3: 0.72, b4: 1.28 },
  { id: 65, a1: 0.38, a3: 0.37, b3: 0.73, b4: 1.27 },
  { id: 70, a1: 0.36, a3: 0.36, b3: 0.74, b4: 1.26 },
  { id: 75, a1: 0.35, a3: 0.35, b3: 0.75, b4: 1.25 },
  { id: 80, a1: 0.34, a3: 0.34, b3: 0.76, b4: 1.24 },
  { id: 85, a1: 0.33, a3: 0.33, b3: 0.77, b4: 1.23 },
  { id: 90, a1: 0.32, a3: 0.32, b3: 0.77, b4: 1.23 },
  { id: 95, a1: 0.31, a3: 0.31, b3: 0.78, b4: 1.22 },
  { id: 100, a1: 0.30, a3: 0.30, b3: 0.79, b4: 1.21 },
];


export const spcChartRangeXBarSConstants = [
  { id: 2, a1: 3.76, a3: 2.66, b3: 0, b4: 3.27 },
  { id: 3, a1: 2.39, a3: 1.95, b3: 0, b4: 2.57 },
  { id: 4, a1: 1.88, a3: 1.63, b3: 0, b4: 2.27 },
  { id: 5, a1: 1.60, a3: 1.43, b3: 0, b4: 2.09 },
  { id: 6, a1: 1.41, a3: 1.29, b3: 0.03, b4: 1.97 },
  { id: 7, a1: 1.28, a3: 1.18, b3: 0.12, b4: 1.88 },
  { id: 8, a1: 1.17, a3: 1.10, b3: 0.19, b4: 1.81 },
  { id: 9, a1: 1.09, a3: 1.03, b3: 0.24, b4: 1.76 },
  { id: 10, a1: 1.03, a3: 0.98, b3: 0.28, b4: 1.72 },
  { id: 11, a1: 0.97, a3: 0.93, b3: 0.32, b4: 1.68 },
  { id: 12, a1: 0.93, a3: 0.89, b3: 0.35, b4: 1.65 },
  { id: 13, a1: 0.88, a3: 0.85, b3: 0.38, b4: 1.62 },
  { id: 14, a1: 0.85, a3: 0.82, b3: 0.41, b4: 1.59 },
  { id: 15, a1: 0.82, a3: 0.79, b3: 0.43, b4: 1.57 },
  { id: 16, a1: 0.79, a3: 0.76, b3: 0.45, b4: 1.55 },
  { id: 17, a1: 0.76, a3: 0.74, b3: 0.47, b4: 1.53 },
  { id: 18, a1: 0.74, a3: 0.72, b3: 0.48, b4: 1.52 },
  { id: 19, a1: 0.72, a3: 0.70, b3: 0.50, b4: 1.50 },
  { id: 20, a1: 0.70, a3: 0.68, b3: 0.51, b4: 1.49 },
  { id: 21, a1: 0.68, a3: 0.66, b3: 0.52, b4: 1.48 },
  { id: 22, a1: 0.66, a3: 0.65, b3: 0.53, b4: 1.47 },
  { id: 23, a1: 0.65, a3: 0.63, b3: 0.54, b4: 1.46 },
  { id: 24, a1: 0.63, a3: 0.62, b3: 0.55, b4: 1.45 },
  { id: 25, a1: 0.62, a3: 0.61, b3: 0.56, b4: 1.44 },
  { id: 26, a1: 0.56, a3: 0.55, b3: 0.60, b4: 1.40 },
  { id: 27, a1: 0.52, a3: 0.51, b3: 0.63, b4: 1.37 },
  { id: 28, a1: 0.48, a3: 0.48, b3: 0.66, b4: 1.34 },
  { id: 29, a1: 0.45, a3: 0.45, b3: 0.68, b4: 1.32 },
  { id: 30, a1: 0.43, a3: 0.43, b3: 0.70, b4: 1.30 },
  { id: 31, a1: 0.41, a3: 0.41, b3: 0.71, b4: 1.29 },
  { id: 32, a1: 0.39, a3: 0.39, b3: 0.72, b4: 1.28 },
  { id: 33, a1: 0.38, a3: 0.37, b3: 0.73, b4: 1.27 },
  { id: 34, a1: 0.36, a3: 0.36, b3: 0.74, b4: 1.26 },
  { id: 35, a1: 0.35, a3: 0.35, b3: 0.75, b4: 1.25 },
  { id: 36, a1: 0.34, a3: 0.34, b3: 0.76, b4: 1.24 },
  { id: 37, a1: 0.33, a3: 0.33, b3: 0.77, b4: 1.23 },
  { id: 38, a1: 0.32, a3: 0.32, b3: 0.77, b4: 1.23 },
  { id: 39, a1: 0.31, a3: 0.31, b3: 0.78, b4: 1.22 },
  { id: 40, a1: 0.30, a3: 0.30, b3: 0.79, b4: 1.21 }

];
