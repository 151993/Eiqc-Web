import { Constants } from './global';

export enum PermissionType {
  AdminCanAccess = 1,

  // #region Role
  AdminRoleCanAccess = 2,
  AdminRoleCanCreate = 3,
  AdminRoleCanUpdate = 4,
  AdminRoleCanDelete = 5,
  // #endregion Role

  // #region User
  AdminUserCanAccess = 6,
  AdminUserCanCreate = 7,
  AdminUserCanUpdate = 8,
  AdminUserCanDelete = 9,
  // #endregion User

  // #region EmailTemplate
  AdminEmailTemplateCanAccess = 10,
  AdminEmailTemplateCanUpdate = 11,
  // #endregion EmailTemplate

  // #region Department
  AdminDepartmentCanAccess = 12,
  AdminDepartmentCanCreate = 13,
  AdminDepartmentCanUpdate = 14,
  AdminDepartmentCanDelete = 15,
  // #endregion Department

  // #region WorkCell
  AdminWorkCellCanAccess = 16,
  AdminWorkCellCanCreate = 17,
  AdminWorkCellCanUpdate = 18,
  AdminWorkCellCanDelete = 19,

  // #endregion

  // #region Region
  AdminRegionCanAccess = 20,
  AdminRegionCanCreate = 21,
  AdminRegionCanUpdate = 22,
  AdminRegionCanDelete = 23,
  // #endregion Region

  // #region Division
  AdminDivisionCanAccess = 32,
  AdminDivisionCanCreate = 33,
  AdminDivisionCanUpdate = 34,
  AdminDivisionCanDelete = 35,
  // #endregion

  // #region Location
  AdminLocationCanAccess = 36,
  AdminLocationCanCreate = 37,
  AdminLocationCanUpdate = 38,
  AdminLocationCanDelete = 39,
  // #endregion

  // #region Country
  AdminCountryCanAccess = 28,
  AdminCountryCanCreate = 29,
  AdminCountryCanUpdate = 30,
  AdminCountryCanDelete = 31,
  // #endregion Country

  // #region Site
  AdminSiteCanAccess = 24,
  AdminSiteCanCreate = 25,
  AdminSiteCanUpdate = 26,
  AdminSiteCanDelete = 27,
  // #endregion Site

  // #region Home
  HomeCanAccess = 44,
  // #endregion Site

  // #region AuditLog
  AdminAuditLogCanAccess = 45,
  // #endregion AuditLog

  // #region SiteUser
  AdminSiteUserCanAccess = 40,
  AdminSiteUserCanCreate = 41,
  AdminSiteUserCanUpdate = 42,
  AdminSiteUserCanDelete = 43,
  // #endregion

  // #region Buyer
  AdminBuyerCanAccess = 50,
  AdminBuyerCanCreate = 51,
  AdminBuyerCanUpdate = 52,
  AdminBuyerCanDelete = 53,
  // #endregion

  // #region CompletedGRS
  AdminCompletedGRSCanAccess = 54,
  AdminCompletedGRSCanCreate = 55,
  AdminCompletedGRSCanUpdate = 56,
  AdminCompletedGRSCanDelete = 57,
  // #endregion CompletedGRS

  // #region Customer
  AdminCustomerCanAccess = 58,
  AdminCustomerCanCreate = 59,
  AdminCustomerCanUpdate = 60,
  AdminCustomerCanDelete = 61,
  // #endregion Customer

  // #region DefectType
  AdminDefectTypeCanAccess = 62,
  AdminDefectTypeCanCreate = 63,
  AdminDefectTypeCanUpdate = 64,
  AdminDefectTypeCanDelete = 65,
  // #endregion DefectType

  // #region CTParameter
  AdminCTParameterCanAccess = 66,
  AdminCTParameterCanCreate = 67,
  AdminCTParameterCanUpdate = 68,
  AdminCTParameterCanDelete = 69,
  // #endregion CTParameter

  // #region UOM
  AdminUOMCanAccess = 70,
  AdminUOMCanCreate = 71,
  AdminUOMCanUpdate = 72,
  AdminUOMCanDelete = 73,
  // #endregion UOM

  // #region GoodsReceiveUser
  AdminGoodsReceiveUserCanAccess = 74,
  AdminGoodsReceiveUserCanCreate = 75,
  AdminGoodsReceiveUserCanUpdate = 76,
  AdminGoodsReceiveUserCanDelete = 77,
  // #endregion GoodsReceiveUser

  // #region Group
  AdminGroupCanAccess = 78,
  AdminGroupCanCreate = 79,
  AdminGroupCanUpdate = 80,
  AdminGroupCanDelete = 81,
  // #endregion Group

  // #region InspectionToolsType
  AdminInspectionToolsTypeCanAccess = 82,
  AdminInspectionToolsTypeCanCreate = 83,
  AdminInspectionToolsTypeCanUpdate = 84,
  AdminInspectionToolsTypeCanDelete = 85,
  // #endregion InspectionToolsType

  // #region InstrumentType
  AdminInstrumentTypeCanAccess = 86,
  AdminInstrumentTypeCanCreate = 87,
  AdminInstrumentTypeCanUpdate = 88,
  AdminInstrumentTypeCanDelete = 89,
  // #endregion InstrumentType

  // #region GRSSAPResult
  AdminGRSSAPResultCanAccess = 90,
  AdminGRSSAPResultCanCreate = 91,
  AdminGRSSAPResultCanUpdate = 92,
  AdminGRSSAPResultCanDelete = 93,
  // #endregion GRSSAPResult

  // #region LotInspectionQty
  AdminLotInspectionQtyCanAccess = 94,
  AdminLotInspectionQtyCanCreate = 95,
  AdminLotInspectionQtyCanUpdate = 96,
  AdminLotInspectionQtyCanDelete = 97,
  // #endregion LotInspectionQty

  // #region ParameterType
  AdminParameterTypeCanAccess = 98,
  AdminParameterTypeCanCreate = 99,
  AdminParameterTypeCanUpdate = 100,
  AdminParameterTypeCanDelete = 101,
  // #endregion ParameterType

  // #region ParameterCategory
  AdminParameterCategoryCanAccess = 102,
  AdminParameterCategoryCanCreate = 103,
  AdminParameterCategoryCanUpdate = 104,
  AdminParameterCategoryCanDelete = 105,
  // #endregion ParameterCategory

  // #region PartCAF
  AdminPartCAFCanAccess = 106,
  AdminPartCAFCanCreate = 107,
  AdminPartCAFCanUpdate = 108,
  AdminPartCAFCanDelete = 109,
  // #endregion PartCAF

  // #region PCCode
  AdminPCCodeCanAccess = 110,
  AdminPCCodeCanCreate = 111,
  AdminPCCodeCanUpdate = 112,
  AdminPCCodeCanDelete = 113,
  // #endregion PCCode

  // #region ReceiveGoodsInfo
  AdminReceiveGoodsInfoCanAccess = 114,
  AdminReceiveGoodsInfoCanCreate = 115,
  AdminReceiveGoodsInfoCanUpdate = 116,
  AdminReceiveGoodsInfoCanDelete = 117,
  // #endregion ReceiveGoodsInfo

  // #region ReceiveGoodsInfoManual
  AdminReceiveGoodsInfoManualCanAccess = 118,
  AdminReceiveGoodsInfoManualCanCreate = 119,
  AdminReceiveGoodsInfoManualCanUpdate = 120,
  AdminReceiveGoodsInfoManualCanDelete = 121,
  // #endregion ReceiveGoodsInfoManual

  // #region Rosetta
  AdminRosettaCanAccess = 122,
  AdminRosettaCanCreate = 123,
  AdminRosettaCanUpdate = 124,
  AdminRosettaCanDelete = 125,
  // #endregion Rosetta

  // #region DispositionType
  AdminDispositionTypeCanAccess = 126,
  AdminDispositionTypeCanCreate = 127,
  AdminDispositionTypeCanUpdate = 128,
  AdminDispositionTypeCanDelete = 129,
  // #endregion DispositionType

  // #region SupplierForm
  AdminSupplierFormCanAccess = 130,
  AdminSupplierFormCanCreate = 131,
  AdminSupplierFormCanUpdate = 132,
  AdminSupplierFormCanDelete = 133,
  // #endregion SupplierForm

  // #region SupplierFormVIS
  AdminSupplierFormVISCanAccess = 134,
  AdminSupplierFormVISCanCreate = 135,
  AdminSupplierFormVISCanUpdate = 136,
  AdminSupplierFormVISCanDelete = 137,
  // #endregion SupplierFormVIS

  // #region SupplierFormCountParameter
  AdminSupplierFormCountParameterCanAccess = 138,
  AdminSupplierFormCountParameterCanCreate = 139,
  AdminSupplierFormCountParameterCanUpdate = 140,
  AdminSupplierFormCountParameterCanDelete = 141,
  // #endregion SupplierFormCountParameter

  // #region SupplierFormTestReport
  AdminSupplierFormTestReportCanAccess = 142,
  AdminSupplierFormTestReportCanCreate = 143,
  AdminSupplierFormTestReportCanUpdate = 144,
  AdminSupplierFormTestReportCanDelete = 145,
  // #endregion SupplierFormTestReport

  // #region SupplierFormSAPParameter
  AdminSupplierFormSAPParameterCanAccess = 146,
  AdminSupplierFormSAPParameterCanCreate = 147,
  AdminSupplierFormSAPParameterCanUpdate = 148,
  AdminSupplierFormSAPParameterCanDelete = 149,
  // #endregion SupplierFormSAPParameter

  // #region SupplierFormBowTwistParameter
  AdminSupplierFormBowTwistParameterCanAccess = 150,
  AdminSupplierFormBowTwistParameterCanCreate = 151,
  AdminSupplierFormBowTwistParameterCanUpdate = 152,
  AdminSupplierFormBowTwistParameterCanDelete = 153,
  // #endregion SupplierFormBowTwistParameter

  // #region SupplierFormSpecialParameter
  AdminSupplierFormSpecialParameterCanAccess = 154,
  AdminSupplierFormSpecialParameterCanCreate = 155,
  AdminSupplierFormSpecialParameterCanUpdate = 156,
  AdminSupplierFormSpecialParameterCanDelete = 157,
  // #endregion SupplierFormSpecialParameter

  // #region SupplierFormResultOrientedParameter
  AdminSupplierFormResultOrientedParameterCanAccess = 158,
  AdminSupplierFormResultOrientedParameterCanCreate = 159,
  AdminSupplierFormResultOrientedParameterCanUpdate = 160,
  AdminSupplierFormResultOrientedParameterCanDelete = 161,
  // #endregion SupplierFormResultOrientedParameter

  // #region SupplierFormPackaging
  AdminSupplierFormPackagingCanAccess = 162,
  AdminSupplierFormPackagingCanCreate = 163,
  AdminSupplierFormPackagingCanUpdate = 164,
  AdminSupplierFormPackagingCanDelete = 165,
  // #endregion SupplierFormPackaging

  // #region SupplierFormPartDateCode
  AdminSupplierFormPartDateCodeCanAccess = 166,
  AdminSupplierFormPartDateCodeCanCreate = 167,
  AdminSupplierFormPartDateCodeCanUpdate = 168,
  AdminSupplierFormPartDateCodeCanDelete = 169,
  // #endregion SupplierFormPartDateCode

  // #region SupplierFormBowTwistActual
  AdminSupplierFormBowTwistActualCanAccess = 170,
  AdminSupplierFormBowTwistActualCanCreate = 171,
  AdminSupplierFormBowTwistActualCanUpdate = 172,
  AdminSupplierFormBowTwistActualCanDelete = 173,
  // #endregion SupplierFormBowTwistActual

  // #region SupplierFormFunPara
  AdminSupplierFormFunParaCanAccess = 174,
  AdminSupplierFormFunParaCanCreate = 175,
  AdminSupplierFormFunParaCanUpdate = 176,
  AdminSupplierFormFunParaCanDelete = 177,
  // #endregion SupplierFormFunPara

  // #region SupplierFormFunParaActual
  AdminSupplierFormFunParaActualCanAccess = 178,
  AdminSupplierFormFunParaActualCanCreate = 179,
  AdminSupplierFormFunParaActualCanUpdate = 180,
  AdminSupplierFormFunParaActualCanDelete = 181,
  // #endregion SupplierFormFunParaActual

  // #region SupplierFormLPosition
  AdminSupplierFormLPositionCanAccess = 182,
  AdminSupplierFormLPositionCanCreate = 183,
  AdminSupplierFormLPositionCanUpdate = 184,
  AdminSupplierFormLPositionCanDelete = 185,
  // #endregion SupplierFormLPosition

  // #region SupplierFormLPositionActual
  AdminSupplierFormLPositionActualCanAccess = 186,
  AdminSupplierFormLPositionActualCanCreate = 187,
  AdminSupplierFormLPositionActualCanUpdate = 188,
  AdminSupplierFormLPositionActualCanDelete = 189,
  // #endregion SupplierFormLPositionActual

  // #region SupplierFormMeasurementParameter
  AdminSupplierFormMeasurementParameterCanAccess = 190,
  AdminSupplierFormMeasurementParameterCanCreate = 191,
  AdminSupplierFormMeasurementParameterCanUpdate = 192,
  AdminSupplierFormMeasurementParameterCanDelete = 193,
  // #endregion SupplierFormMeasurementParameter

  // #region SupplierFormMeasurementParameterActual
  AdminSupplierFormMeasurementParameterActualCanAccess = 194,
  AdminSupplierFormMeasurementParameterActualCanCreate = 195,
  AdminSupplierFormMeasurementParameterActualCanUpdate = 196,
  AdminSupplierFormMeasurementParameterActualCanDelete = 197,
  // #endregion SupplierFormMeasurementParameterActual

  // #region SupplierFormMicroSection
  AdminSupplierFormMicroSectionCanAccess = 198,
  AdminSupplierFormMicroSectionCanCreate = 199,
  AdminSupplierFormMicroSectionCanUpdate = 200,
  AdminSupplierFormMicroSectionCanDelete = 201,
  // #endregion SupplierFormMicroSection

  // #region SupplierFormMicroSectionActual
  AdminSupplierFormMicroSectionActualCanAccess = 202,
  AdminSupplierFormMicroSectionActualCanCreate = 203,
  AdminSupplierFormMicroSectionActualCanUpdate = 204,
  AdminSupplierFormMicroSectionActualCanDelete = 205,
  // #endregion SupplierFormMicroSectionActual

  // #region SupplierFormMPosition
  AdminSupplierFormMPositionCanAccess = 206,
  AdminSupplierFormMPositionCanCreate = 207,
  AdminSupplierFormMPositionCanUpdate = 208,
  AdminSupplierFormMPositionCanDelete = 209,
  // #endregion SupplierFormMPosition

  // #region SupplierFormMPositionActual
  AdminSupplierFormMPositionActualCanAccess = 210,
  AdminSupplierFormMPositionActualCanCreate = 211,
  AdminSupplierFormMPositionActualCanUpdate = 212,
  AdminSupplierFormMPositionActualCanDelete = 213,
  // #endregion SupplierFormMPositionActual

  // #region SupplierAttachment
  AdminSupplierAttachmentCanAccess = 214,
  AdminSupplierAttachmentCanCreate = 215,
  AdminSupplierAttachmentCanUpdate = 216,
  AdminSupplierAttachmentCanDelete = 217,
  // #endregion SupplierAttachment

  // #region Inspection
  AdminInspectionCanAccess = 218,
  AdminInspectionCanCreate = 219,
  AdminInspectionCanUpdate = 220,
  AdminInspectionCanDelete = 221,
  // #endregion Inspection

  // #region InspectionTools
  AdminInspectionToolsCanAccess = 222,
  AdminInspectionToolsCanCreate = 223,
  AdminInspectionToolsCanUpdate = 224,
  AdminInspectionToolsCanDelete = 225,
  // #endregion InspectionTools


  // #region Instrument
  AdminInstrumentCanAccess = 226,
  AdminInstrumentCanCreate = 227,
  AdminInstrumentCanUpdate = 228,
  AdminInstrumentCanDelete = 229,
  // #endregion Instrument

  // #region GRS
  AdminGRSCanAccess = 230,
  AdminGRSCanCreate = 231,
  AdminGRSCanUpdate = 232,
  AdminGRSCanDelete = 233,
  // #endregion GRS

  // #region SAPPartInspectionPlan
  AdminSAPPartInspectionPlanCanAccess = 234,
  AdminSAPPartInspectionPlanCanCreate = 235,
  AdminSAPPartInspectionPlanCanUpdate = 236,
  AdminSAPPartInspectionPlanCanDelete = 237,
  // #endregion SAPPartInspectionPlan

  // #region PCCodeInspectionToolsType
  AdminPCCodeInspectionToolsTypeCanAccess = 238,
  AdminPCCodeInspectionToolsTypeCanCreate = 239,
  AdminPCCodeInspectionToolsTypeCanUpdate = 240,
  AdminPCCodeInspectionToolsTypeCanDelete = 241,
  // #endregion PCCodeInspectionToolsType

  // #region GRSSupplierForm
  AdminGRSSupplierFormCanAccess = 242,
  AdminGRSSupplierFormCanCreate = 243,
  AdminGRSSupplierFormCanUpdate = 244,
  AdminGRSSupplierFormCanDelete = 245,
  // #endregion GRSSupplierForm

  // #region Part
  AdminPartCanAccess = 246,
  AdminPartCanCreate = 247,
  AdminPartCanUpdate = 248,
  AdminPartCanDelete = 249,
  // #endregion Part

  // #region PartBowTwistParameter
  AdminPartBowTwistParameterCanAccess = 250,
  AdminPartBowTwistParameterCanCreate = 251,
  AdminPartBowTwistParameterCanUpdate = 252,
  AdminPartBowTwistParameterCanDelete = 253,
  // #endregion PartBowTwistParameter

  // #region PartCountParameter
  AdminPartCountParameterCanAccess = 254,
  AdminPartCountParameterCanCreate = 255,
  AdminPartCountParameterCanUpdate = 256,
  AdminPartCountParameterCanDelete = 257,
  // #endregion PartCountParameter

  // #region PartDateCode
  AdminPartDateCodeCanAccess = 258,
  AdminPartDateCodeCanCreate = 259,
  AdminPartDateCodeCanUpdate = 260,
  AdminPartDateCodeCanDelete = 261,
  // #endregion PartDateCode

  // #region PartFunParameter
  AdminPartFunParameterCanAccess = 262,
  AdminPartFunParameterCanCreate = 263,
  AdminPartFunParameterCanUpdate = 264,
  AdminPartFunParameterCanDelete = 265,
  // #endregion PartFunParameter

  // #region PartLPositionTolerance
  AdminPartLPositionToleranceCanAccess = 266,
  AdminPartLPositionToleranceCanCreate = 267,
  AdminPartLPositionToleranceCanUpdate = 268,
  AdminPartLPositionToleranceCanDelete = 269,
  // #endregion PartLPositionTolerance

  // #region PartMeasurementParameter
  AdminPartMeasurementParameterCanAccess = 270,
  AdminPartMeasurementParameterCanCreate = 271,
  AdminPartMeasurementParameterCanUpdate = 272,
  AdminPartMeasurementParameterCanDelete = 273,
  // #endregion PartMeasurementParameter

  // #region PartMicrosection
  AdminPartMicrosectionCanAccess = 274,
  AdminPartMicrosectionCanCreate = 275,
  AdminPartMicrosectionCanUpdate = 276,
  AdminPartMicrosectionCanDelete = 277,
  // #endregion PartMicrosection

  // #region PartMPositionTolerance
  AdminPartMPositionToleranceCanAccess = 278,
  AdminPartMPositionToleranceCanCreate = 279,
  AdminPartMPositionToleranceCanUpdate = 280,
  AdminPartMPositionToleranceCanDelete = 281,
  // #endregion PartMPositionTolerance

  // #region PartResultOrientedParameter
  AdminPartResultOrientedParameterCanAccess = 282,
  AdminPartResultOrientedParameterCanCreate = 283,
  AdminPartResultOrientedParameterCanUpdate = 284,
  AdminPartResultOrientedParameterCanDelete = 285,
  // #endregion PartResultOrientedParameter

  // #region PartTestReportParameter
  AdminPartTestReportParameterCanAccess = 286,
  AdminPartTestReportParameterCanCreate = 287,
  AdminPartTestReportParameterCanUpdate = 288,
  AdminPartTestReportParameterCanDelete = 289,
  // #endregion PartTestReportParameter

  // #region Form
  AdminFormCanAccess = 290,
  AdminFormCanCreate = 291,
  AdminFormCanUpdate = 292,
  AdminFormCanDelete = 293,
  // #endregion Form

  // #region FormBowTwistParameter
  AdminFormBowTwistParameterCanAccess = 294,
  AdminFormBowTwistParameterCanCreate = 295,
  AdminFormBowTwistParameterCanUpdate = 296,
  AdminFormBowTwistParameterCanDelete = 297,
  // #endregion FormBowTwistParameter

  // #region FormCountParameter
  AdminFormCountParameterCanAccess = 298,
  AdminFormCountParameterCanCreate = 299,
  AdminFormCountParameterCanUpdate = 300,
  AdminFormCountParameterCanDelete = 301,
  // #endregion FormCountParameter

  // #region FormFunPara
  AdminFormFunParaCanAccess = 302,
  AdminFormFunParaCanCreate = 303,
  AdminFormFunParaCanUpdate = 304,
  AdminFormFunParaCanDelete = 305,
  // #endregion FormFunPara

  // #region FormFunParaActual
  AdminFormFunParaActualCanAccess = 306,
  AdminFormFunParaActualCanCreate = 307,
  AdminFormFunParaActualCanUpdate = 308,
  AdminFormFunParaActualCanDelete = 309,
  // #endregion FormFunParaActual

  // #region FormLPosition
  AdminFormLPositionCanAccess = 310,
  AdminFormLPositionCanCreate = 311,
  AdminFormLPositionCanUpdate = 312,
  AdminFormLPositionCanDelete = 313,
  // #endregion FormLPosition

  // #region FormLPositionActual
  AdminFormLPositionActualCanAccess = 314,
  AdminFormLPositionActualCanCreate = 315,
  AdminFormLPositionActualCanUpdate = 316,
  AdminFormLPositionActualCanDelete = 317,
  // #endregion FormLPositionActual

  // #region FormMeasurementParameter
  AdminFormMeasurementParameterCanAccess = 318,
  AdminFormMeasurementParameterCanCreate = 319,
  AdminFormMeasurementParameterCanUpdate = 320,
  AdminFormMeasurementParameterCanDelete = 321,
  // #endregion FormMeasurementParameter

  // #region FormMeasurementParameterActual
  AdminFormMeasurementParameterActualCanAccess = 322,
  AdminFormMeasurementParameterActualCanCreate = 323,
  AdminFormMeasurementParameterActualCanUpdate = 324,
  AdminFormMeasurementParameterActualCanDelete = 325,
  // #endregion FormMeasurementParameterActual

  // #region FormBowTwistActual
  AdminFormBowTwistActualCanAccess = 326,
  AdminFormBowTwistActualCanCreate = 327,
  AdminFormBowTwistActualCanUpdate = 328,
  AdminFormBowTwistActualCanDelete = 329,
  // #endregion FormBowTwistActual

  // #region FormMicroSection
  AdminFormMicroSectionCanAccess = 330,
  AdminFormMicroSectionCanCreate = 331,
  AdminFormMicroSectionCanUpdate = 332,
  AdminFormMicroSectionCanDelete = 333,
  // #endregion FormMicroSection

  // #region FormMicroSectionActual
  AdminFormMicroSectionActualCanAccess = 334,
  AdminFormMicroSectionActualCanCreate = 335,
  AdminFormMicroSectionActualCanUpdate = 336,
  AdminFormMicroSectionActualCanDelete = 337,
  // #endregion FormMicroSectionActual

  // #region FormMPosition
  AdminFormMPositionCanAccess = 338,
  AdminFormMPositionCanCreate = 339,
  AdminFormMPositionCanUpdate = 340,
  AdminFormMPositionCanDelete = 341,
  // #endregion FormMPosition

  // #region FormMPositionActual
  AdminFormMPositionActualCanAccess = 342,
  AdminFormMPositionActualCanCreate = 343,
  AdminFormMPositionActualCanUpdate = 344,
  AdminFormMPositionActualCanDelete = 345,
  // #endregion FormMPositionActual

  // #region FormPackaging
  AdminFormPackagingCanAccess = 346,
  AdminFormPackagingCanCreate = 347,
  AdminFormPackagingCanUpdate = 348,
  AdminFormPackagingCanDelete = 349,
  // #endregion FormPackaging

  // #region FormPartDateCode
  AdminFormPartDateCodeCanAccess = 350,
  AdminFormPartDateCodeCanCreate = 351,
  AdminFormPartDateCodeCanUpdate = 352,
  AdminFormPartDateCodeCanDelete = 353,
  // #endregion FormPartDateCode

  // #region FormPartSAPFailedQty
  AdminFormPartSAPFailedQtyCanAccess = 354,
  AdminFormPartSAPFailedQtyCanCreate = 355,
  AdminFormPartSAPFailedQtyCanUpdate = 356,
  AdminFormPartSAPFailedQtyCanDelete = 357,
  // #endregion FormPartSAPFailedQty

  // #region FormResultOrientedParameter
  AdminFormResultOrientedParameterCanAccess = 358,
  AdminFormResultOrientedParameterCanCreate = 359,
  AdminFormResultOrientedParameterCanUpdate = 360,
  AdminFormResultOrientedParameterCanDelete = 361,
  // #endregion FormResultOrientedParameter

  // #region FormSAPParameter
  AdminFormSAPParameterCanAccess = 362,
  AdminFormSAPParameterCanCreate = 363,
  AdminFormSAPParameterCanUpdate = 364,
  AdminFormSAPParameterCanDelete = 365,
  // #endregion FormSAPParameter

  // #region FormSpecialParameter
  AdminFormSpecialParameterCanAccess = 366,
  AdminFormSpecialParameterCanCreate = 367,
  AdminFormSpecialParameterCanUpdate = 368,
  AdminFormSpecialParameterCanDelete = 369,
  // #endregion FormSpecialParameter

  // #region FormStatus
  AdminFormStatusCanAccess = 370,
  AdminFormStatusCanCreate = 371,
  AdminFormStatusCanUpdate = 372,
  AdminFormStatusCanDelete = 373,
  // #endregion FormStatus

  // #region FormTestReport
  AdminFormTestReportCanAccess = 374,
  AdminFormTestReportCanCreate = 375,
  AdminFormTestReportCanUpdate = 376,
  AdminFormTestReportCanDelete = 377,
  // #endregion FormTestReport

  // #region FormVIS
  AdminFormVISCanAccess = 378,
  AdminFormVISCanCreate = 379,
  AdminFormVISCanUpdate = 380,
  AdminFormVISCanDelete = 381,
  // #endregion FormVIS

  // #region FormType
  AdminFormTypeCanAccess = 382,
  AdminFormTypeCanCreate = 383,
  AdminFormTypeCanUpdate = 384,
  AdminFormTypeCanDelete = 385,
  // #endregion FormType

  // #region Commodity
  AdminCommodityCanAccess = 386,
  AdminCommodityCanCreate = 387,
  AdminCommodityCanUpdate = 388,
  AdminCommodityCanDelete = 389,
  // #endregion Commodity


  // #region AdminCertification
  AdminCertificationCanAccess = 390,
  AdminCertificationCanCreate = 391,
  AdminCertificationCanUpdate = 392,
  AdminCertificationCanDelete = 393,
  // #endregion AdminCertification

  // #region AdminCertification
  AdminMaterialGroupCanAccess = 394,
  AdminMaterialGroupCanCreate = 395,
  AdminMaterialGroupCanUpdate = 396,
  AdminMaterialGroupCanDelete = 397,
  // #endregion AdminCertification

  // #region ParameterManagement
  AdminParameterManagementCanAccess = 398,
  AdminParameterManagementCanCreate = 399,
  AdminParameterManagementCanUpdate = 400,
  AdminParameterManagementCanDelete = 401,
  // #endregion ParameterManagement

  // #region TestReport
  AdminTestReportCanAccess = 402,
  AdminTestReportCanCreate = 403,
  AdminTestReportCanUpdate = 404,
  AdminTestReportCanDelete = 405,
  // #endregion TestReport


  // #region ParameterTypeCode
  AdminParameterTypeCodeCanAccess = 406,
  AdminParameterTypeCodeCanCreate = 407,
  AdminParameterTypeCodeCanUpdate = 408,
  AdminParameterTypeCodeCanDelete = 409,
  // #endregion ParameterTypeCode

  // #region WorkCellUser
  AdminWorkCellUserCanAccess = 414,
  AdminWorkCellUserCanCreate = 415,
  AdminWorkCellUserCanUpdate = 416,
  AdminWorkCellUserCanDelete = 417,
  // #endregion WorkCellUser

  // #region PartDimension
  AdminPartDimensionCanAccess = 418,
  AdminPartDimensionCanCreate = 419,
  AdminPartDimensionCanUpdate = 420,
  AdminPartDimensionCanDelete = 421,
  // #endregion PartDimension

  // #region BowTwistFormula
  AdminBowTwistFormulaCanAccess = 422,
  AdminBowTwistFormulaCanCreate = 423,
  AdminBowTwistFormulaCanUpdate = 424,
  AdminBowTwistFormulaCanDelete = 425,
  // #endregion BowTwistFormula

  // #region DCCConfiguration
  AdminDCCConfigurationCanAccess = 426,
  AdminDCCConfigurationCanCreate = 427,
  AdminDCCConfigurationCanUpdate = 428,
  AdminDCCConfigurationCanDelete = 429,
  // #endregion DCCConfiguration


  // #region CommodityCategory
  AdminCommodityCategoryCanAccess = 430,
  AdminCommodityCategoryCanUpdate = 431,
  AdminCommodityCategoryCanCreate = 432,
  AdminCommodityCategoryCanDelete = 433,
  // #endregion CommodityCategory

  // #region Supplier
  AdminSupplierCanAccess = 434,
  AdminSupplierCanCreate = 435,
  AdminSupplierCanUpdate = 436,
  AdminSupplierCanDelete = 437,
  // #endregion Supplier

  // #region NonJabilUser
  AdminNonJabilUserCanAccess = 438,
  AdminNonJabilUserCanCreate = 439,
  AdminNonJabilUserCanUpdate = 440,
  AdminNonJabilUserCanDelete = 441,
  // #endregion NonJabilUser


  AdminPurchaseOrderCanAccess = 446,
  AdminPurchaseOrderCanCreate = 447,
  AdminPurchaseOrderCanUpdate = 448,
  AdminPurchaseOrderCanDelete = 449,

  // #region CertificateType
  AdminCertificateTypeCanAccess = 450,
  AdminCertificateTypeCanCreate = 451,
  AdminCertificateTypeCanUpdate = 452,
  AdminCertificateTypeCanDelete = 453,
  // #endregion CertificateType

  // #region ApprovedPartInspectionPlan
  AdminApprovedPartInspectionPlanCanAccess = 454,
  AdminApprovedPartInspectionPlanCanCreate = 455,
  AdminApprovedPartInspectionPlanCanUpdate = 456,
  AdminApprovedPartInspectionPlanCanDelete = 457,
  // #endregion ApprovedPartInspectionPlan


  // #region SAPPartInspectionPlan
  AdminSupplierMeasurementCanAccess = 458,
  AdminSupplierMeasurementCanCreate = 459,
  AdminSupplierMeasurementCanUpdate = 460,
  AdminSupplierMeasurementCanDelete = 461,
  // #endregion SAPPartInspectionPlan

  // #region DefectManagement
  AdminDefectManagementCanAccess = 462,
  AdminDefectManagementCanCreate = 463,
  AdminDefectManagementCanUpdate = 464,
  AdminDefectManagementCanDelete = 465,
  // #endregion DefectManagement


  AdminSampleSizeCalculationCanAccess = 466,

  // #region DefectManagement
  AdminSamplingPlanCanAccess = 467,
  // #endregion DefectManagement


  AdminSupplierTaskCanAccess = 468,
  AdminSupplierTaskCanCreate = 469,
  AdminSupplierTaskCanUpdate = 470,
  AdminSupplierTaskCanDelete = 471,

  AdminDCCTaskCanAccess = 472,
  AdminDCCTaskCanCreate = 473,
  AdminDCCTaskCanUpdate = 474,
  AdminDCCTaskCanDelete = 475,


  AdminSQETaskCanAccess = 476,
  AdminSQETaskCanCreate = 477,
  AdminSQETaskCanUpdate = 478,
  AdminSQETaskCanDelete = 479,

  AdminSMSMyTaskCanAccess = 480,
  AdminSMSMyTaskCanCreate = 481,
  AdminSMSMyTaskCanUpdate = 482,
  AdminSMSMyTaskCanDelete = 483,


  AdminApprovedSupplierMeasurementCanAccess = 484,
  AdminApprovedSupplierMeasurementCanCreate = 485,
  AdminApprovedSupplierMeasurementCanUpdate = 486,
  AdminApprovedSupplierMeasurementCanDelete = 487,

}

export const permissionTypeMap = new Map<number, string>([
  [PermissionType.HomeCanAccess, 'Home_Can_Access'],
  [PermissionType.AdminCanAccess, 'Admin_Can_Access'],
  [PermissionType.AdminRoleCanAccess, 'Admin_Role_Can_Access'],
  [PermissionType.AdminRoleCanCreate, 'Admin_Role_Can_Create'],
  [PermissionType.AdminRoleCanUpdate, 'Admin_Role_Can_Update'],
  [PermissionType.AdminRoleCanDelete, 'Admin_Role_Can_Delete'],
  [PermissionType.AdminUserCanAccess, 'Admin_User_Can_Access'],
  [PermissionType.AdminUserCanCreate, 'Admin_User_Can_Create'],
  [PermissionType.AdminUserCanUpdate, 'Admin_User_Can_Update'],
  [PermissionType.AdminUserCanDelete, 'Admin_User_Can_Delete'],
  [PermissionType.AdminEmailTemplateCanAccess, 'Admin_Email_Can_Access'],
  [PermissionType.AdminEmailTemplateCanUpdate, 'Admin_Email_Can_Update'],
  [PermissionType.AdminDepartmentCanAccess, 'Admin_Department_Can_Access'],
  [PermissionType.AdminDepartmentCanCreate, 'Admin_Department_Can_Create'],
  [PermissionType.AdminDepartmentCanUpdate, 'Admin_Department_Can_Update'],
  [PermissionType.AdminDepartmentCanDelete, 'Admin_Department_Can_Delete'],
  [PermissionType.AdminWorkCellCanAccess, 'Admin_WorkCell_Can_Access'],
  [PermissionType.AdminWorkCellCanCreate, 'Admin_WorkCell_Can_Create'],
  [PermissionType.AdminWorkCellCanUpdate, 'Admin_WorkCell_Can_Update'],
  [PermissionType.AdminWorkCellCanDelete, 'Admin_WorkCell_Can_Delete'],
  [PermissionType.AdminDivisionCanAccess, 'Admin_Division_Can_Access'],
  [PermissionType.AdminDivisionCanCreate, 'Admin_Division_Can_Create'],
  [PermissionType.AdminDivisionCanUpdate, 'Admin_Division_Can_Update'],
  [PermissionType.AdminDivisionCanDelete, 'Admin_Division_Can_Delete'],
  [PermissionType.AdminLocationCanAccess, 'Admin_Location_Can_Access'],
  [PermissionType.AdminLocationCanCreate, 'Admin_Location_Can_Create'],
  [PermissionType.AdminLocationCanUpdate, 'Admin_Location_Can_Update'],
  [PermissionType.AdminLocationCanDelete, 'Admin_Location_Can_Delete'],
  [PermissionType.AdminCountryCanAccess, 'Admin_Country_Can_Access'],
  [PermissionType.AdminCountryCanCreate, 'Admin_Country_Can_Create'],
  [PermissionType.AdminCountryCanUpdate, 'Admin_Country_Can_Update'],
  [PermissionType.AdminCountryCanDelete, 'Admin_Country_Can_Delete'],
  [PermissionType.AdminRegionCanAccess, 'Admin_Region_Can_Access'],
  [PermissionType.AdminRegionCanCreate, 'Admin_Region_Can_Create'],
  [PermissionType.AdminRegionCanUpdate, 'Admin_Region_Can_Update'],
  [PermissionType.AdminRegionCanDelete, 'Admin_Region_Can_Delete'],
  [PermissionType.AdminSiteCanAccess, 'Admin_Site_Can_Access'],
  [PermissionType.AdminSiteCanCreate, 'Admin_Site_Can_Create'],
  [PermissionType.AdminSiteCanUpdate, 'Admin_Site_Can_Update'],
  [PermissionType.AdminSiteCanDelete, 'Admin_Site_Can_Delete'],
  [PermissionType.AdminAuditLogCanAccess, 'Admin_AuditLog_Can_Access'],
  [PermissionType.AdminSiteUserCanAccess, 'Admin_SiteUser_Can_Access'],
  [PermissionType.AdminSiteUserCanCreate, 'Admin_SiteUser_Can_Create'],
  [PermissionType.AdminSiteUserCanUpdate, 'Admin_SiteUser_Can_Update'],
  [PermissionType.AdminSiteUserCanDelete, 'Admin_SiteUser_Can_Delete'],
  [PermissionType.AdminBuyerCanAccess, 'Admin_Buyer_Can_Access'],
  [PermissionType.AdminBuyerCanCreate, 'Admin_Buyer_Can_Create'],
  [PermissionType.AdminBuyerCanUpdate, 'Admin_Buyer_Can_Update'],
  [PermissionType.AdminBuyerCanDelete, 'Admin_Buyer_Can_Delete'],
  [PermissionType.AdminCompletedGRSCanAccess, 'Admin_CompletedGRS_Can_Access'],
  [PermissionType.AdminCompletedGRSCanCreate, 'Admin_CompletedGRS_Can_Create'],
  [PermissionType.AdminCompletedGRSCanUpdate, 'Admin_CompletedGRS_Can_Update'],
  [PermissionType.AdminCompletedGRSCanDelete, 'Admin_CompletedGRS_Can_Delete'],
  [PermissionType.AdminCustomerCanAccess, 'Admin_Customer_Can_Access'],
  [PermissionType.AdminCustomerCanCreate, 'Admin_Customer_Can_Create'],
  [PermissionType.AdminCustomerCanUpdate, 'Admin_Customer_Can_Update'],
  [PermissionType.AdminCustomerCanDelete, 'Admin_Customer_Can_Delete'],
  [PermissionType.AdminDefectTypeCanAccess, 'Admin_DefectType_Can_Access'],
  [PermissionType.AdminDefectTypeCanCreate, 'Admin_DefectType_Can_Create'],
  [PermissionType.AdminDefectTypeCanUpdate, 'Admin_DefectType_Can_Update'],
  [PermissionType.AdminDefectTypeCanDelete, 'Admin_DefectType_Can_Delete'],
  [PermissionType.AdminCTParameterCanAccess, 'Admin_CTParameter_Can_Access'],
  [PermissionType.AdminCTParameterCanCreate, 'Admin_CTParameter_Can_Create'],
  [PermissionType.AdminCTParameterCanUpdate, 'Admin_CTParameter_Can_Update'],
  [PermissionType.AdminCTParameterCanDelete, 'Admin_CTParameter_Can_Delete'],
  [PermissionType.AdminUOMCanAccess, 'Admin_UOM_Can_Access'],
  [PermissionType.AdminUOMCanCreate, 'Admin_UOM_Can_Create'],
  [PermissionType.AdminUOMCanUpdate, 'Admin_UOM_Can_Update'],
  [PermissionType.AdminUOMCanDelete, 'Admin_UOM_Can_Delete'],
  [PermissionType.AdminGoodsReceiveUserCanAccess, 'Admin_GoodsReceiveUser_Can_Access'],
  [PermissionType.AdminGoodsReceiveUserCanCreate, 'Admin_GoodsReceiveUser_Can_Create'],
  [PermissionType.AdminGoodsReceiveUserCanUpdate, 'Admin_GoodsReceiveUser_Can_Update'],
  [PermissionType.AdminGoodsReceiveUserCanDelete, 'Admin_GoodsReceiveUser_Can_Delete'],
  [PermissionType.AdminGroupCanAccess, 'Admin_Group_Can_Access'],
  [PermissionType.AdminGroupCanCreate, 'Admin_Group_Can_Create'],
  [PermissionType.AdminGroupCanUpdate, 'Admin_Group_Can_Update'],
  [PermissionType.AdminGroupCanDelete, 'Admin_Group_Can_Delete'],
  [PermissionType.AdminGRSSAPResultCanAccess, 'Admin_GRSSAPResult_Can_Access'],
  [PermissionType.AdminGRSSAPResultCanCreate, 'Admin_GRSSAPResult_Can_Create'],
  [PermissionType.AdminGRSSAPResultCanUpdate, 'Admin_GRSSAPResult_Can_Update'],
  [PermissionType.AdminGRSSAPResultCanDelete, 'Admin_GRSSAPResult_Can_Delete'],
  [PermissionType.AdminInspectionToolsTypeCanAccess, 'Admin_InspectionToolsType_Can_Access'],
  [PermissionType.AdminInspectionToolsTypeCanCreate, 'Admin_InspectionToolsType_Can_Create'],
  [PermissionType.AdminInspectionToolsTypeCanUpdate, 'Admin_InspectionToolsType_Can_Update'],
  [PermissionType.AdminInspectionToolsTypeCanDelete, 'Admin_InspectionToolsType_Can_Delete'],
  [PermissionType.AdminInstrumentTypeCanAccess, 'Admin_InstrumentType_Can_Access'],
  [PermissionType.AdminInstrumentTypeCanCreate, 'Admin_InstrumentType_Can_Create'],
  [PermissionType.AdminInstrumentTypeCanUpdate, 'Admin_InstrumentType_Can_Update'],
  [PermissionType.AdminInstrumentTypeCanDelete, 'Admin_InstrumentType_Can_Delete'],
  [PermissionType.AdminLotInspectionQtyCanAccess, 'Admin_LotInspectionQty_Can_Access'],
  [PermissionType.AdminLotInspectionQtyCanCreate, 'Admin_LotInspectionQty_Can_Create'],
  [PermissionType.AdminLotInspectionQtyCanUpdate, 'Admin_LotInspectionQty_Can_Update'],
  [PermissionType.AdminLotInspectionQtyCanDelete, 'Admin_LotInspectionQty_Can_Delete'],
  [PermissionType.AdminParameterCategoryCanAccess, 'Admin_ParameterCategory_Can_Access'],
  [PermissionType.AdminParameterCategoryCanCreate, 'Admin_ParameterCategory_Can_Create'],
  [PermissionType.AdminParameterCategoryCanUpdate, 'Admin_ParameterCategory_Can_Update'],
  [PermissionType.AdminParameterCategoryCanDelete, 'Admin_ParameterCategory_Can_Delete'],
  [PermissionType.AdminParameterTypeCanAccess, 'Admin_ParameterType_Can_Access'],
  [PermissionType.AdminParameterTypeCanCreate, 'Admin_ParameterType_Can_Create'],
  [PermissionType.AdminParameterTypeCanUpdate, 'Admin_ParameterType_Can_Update'],
  [PermissionType.AdminParameterTypeCanDelete, 'Admin_ParameterType_Can_Delete'],
  [PermissionType.AdminPartCAFCanAccess, 'Admin_PartCAF_Can_Access'],
  [PermissionType.AdminPartCAFCanCreate, 'Admin_PartCAF_Can_Create'],
  [PermissionType.AdminPartCAFCanUpdate, 'Admin_PartCAF_Can_Update'],
  [PermissionType.AdminPartCAFCanDelete, 'Admin_PartCAF_Can_Delete'],
  [PermissionType.AdminPCCodeCanAccess, 'Admin_PCCode_Can_Access'],
  [PermissionType.AdminPCCodeCanCreate, 'Admin_PCCode_Can_Create'],
  [PermissionType.AdminPCCodeCanUpdate, 'Admin_PCCode_Can_Update'],
  [PermissionType.AdminPCCodeCanDelete, 'Admin_PCCode_Can_Delete'],
  [PermissionType.AdminReceiveGoodsInfoCanAccess, 'Admin_ReceiveGoodsInfo_Can_Access'],
  [PermissionType.AdminReceiveGoodsInfoCanCreate, 'Admin_ReceiveGoodsInfo_Can_Create'],
  [PermissionType.AdminReceiveGoodsInfoCanUpdate, 'Admin_ReceiveGoodsInfo_Can_Update'],
  [PermissionType.AdminReceiveGoodsInfoCanDelete, 'Admin_ReceiveGoodsInfo_Can_Delete'],
  [PermissionType.AdminReceiveGoodsInfoManualCanAccess, 'Admin_ReceiveGoodsInfoManual_Can_Access'],
  [PermissionType.AdminReceiveGoodsInfoManualCanCreate, 'Admin_ReceiveGoodsInfoManual_Can_Create'],
  [PermissionType.AdminReceiveGoodsInfoManualCanUpdate, 'Admin_ReceiveGoodsInfoManual_Can_Update'],
  [PermissionType.AdminReceiveGoodsInfoManualCanDelete, 'Admin_ReceiveGoodsInfoManual_Can_Delete'],
  [PermissionType.AdminRosettaCanAccess, 'Admin_Rosetta_Can_Access'],
  [PermissionType.AdminRosettaCanCreate, 'Admin_Rosetta_Can_Create'],
  [PermissionType.AdminRosettaCanUpdate, 'Admin_Rosetta_Can_Update'],
  [PermissionType.AdminRosettaCanDelete, 'Admin_Rosetta_Can_Delete'],
  [PermissionType.AdminDispositionTypeCanAccess, 'Admin_DispositionType_Can_Access'],
  [PermissionType.AdminDispositionTypeCanCreate, 'Admin_DispositionType_Can_Create'],
  [PermissionType.AdminDispositionTypeCanUpdate, 'Admin_DispositionType_Can_Update'],
  [PermissionType.AdminDispositionTypeCanDelete, 'Admin_DispositionType_Can_Delete'],
  [PermissionType.AdminSupplierAttachmentCanAccess, 'Admin_SupplierAttachment_Can_Access'],
  [PermissionType.AdminSupplierAttachmentCanCreate, 'Admin_SupplierAttachment_Can_Create'],
  [PermissionType.AdminSupplierAttachmentCanUpdate, 'Admin_SupplierAttachment_Can_Update'],
  [PermissionType.AdminSupplierAttachmentCanDelete, 'Admin_SupplierAttachment_Can_Delete'],
  [PermissionType.AdminInspectionCanAccess, 'Admin_Inspection_Can_Access'],
  [PermissionType.AdminInspectionCanCreate, 'Admin_Inspection_Can_Create'],
  [PermissionType.AdminInspectionCanUpdate, 'Admin_Inspection_Can_Update'],
  [PermissionType.AdminInspectionCanDelete, 'Admin_Inspection_Can_Delete'],
  [PermissionType.AdminInspectionToolsCanAccess, 'Admin_InspectionTools_Can_Access'],
  [PermissionType.AdminInspectionToolsCanCreate, 'Admin_InspectionTools_Can_Create'],
  [PermissionType.AdminInspectionToolsCanUpdate, 'Admin_InspectionTools_Can_Update'],
  [PermissionType.AdminInspectionToolsCanDelete, 'Admin_InspectionTools_Can_Delete'],
  [PermissionType.AdminInstrumentCanAccess, 'Admin_Instrument_Can_Access'],
  [PermissionType.AdminInstrumentCanCreate, 'Admin_Instrument_Can_Create'],
  [PermissionType.AdminInstrumentCanUpdate, 'Admin_Instrument_Can_Update'],
  [PermissionType.AdminInstrumentCanDelete, 'Admin_Instrument_Can_Delete'],
  [PermissionType.AdminGRSCanAccess, 'Admin_GRS_Can_Access'],
  [PermissionType.AdminGRSCanCreate, 'Admin_GRS_Can_Create'],
  [PermissionType.AdminGRSCanUpdate, 'Admin_GRS_Can_Update'],
  [PermissionType.AdminGRSCanDelete, 'Admin_GRS_Can_Delete'],
  [PermissionType.AdminSAPPartInspectionPlanCanAccess, 'Admin_SAPPartInspectionPlan_Can_Access'],
  [PermissionType.AdminSAPPartInspectionPlanCanCreate, 'Admin_SAPPartInspectionPlan_Can_Create'],
  [PermissionType.AdminSAPPartInspectionPlanCanUpdate, 'Admin_SAPPartInspectionPlan_Can_Update'],
  [PermissionType.AdminSAPPartInspectionPlanCanDelete, 'Admin_SAPPartInspectionPlan_Can_Delete'],
  [PermissionType.AdminPCCodeInspectionToolsTypeCanAccess, 'Admin_PCCodeInspectionToolsType_Can_Access'],
  [PermissionType.AdminPCCodeInspectionToolsTypeCanCreate, 'Admin_PCCodeInspectionToolsType_Can_Create'],
  [PermissionType.AdminPCCodeInspectionToolsTypeCanUpdate, 'Admin_PCCodeInspectionToolsType_Can_Update'],
  [PermissionType.AdminPCCodeInspectionToolsTypeCanDelete, 'Admin_PCCodeInspectionToolsType_Can_Delete'],
  [PermissionType.AdminGRSSupplierFormCanAccess, 'Admin_GRSSupplierForm_Can_Access'],
  [PermissionType.AdminGRSSupplierFormCanCreate, 'Admin_GRSSupplierForm_Can_Create'],
  [PermissionType.AdminGRSSupplierFormCanUpdate, 'Admin_GRSSupplierForm_Can_Update'],
  [PermissionType.AdminGRSSupplierFormCanDelete, 'Admin_GRSSupplierForm_Can_Delete'],
  [PermissionType.AdminPartBowTwistParameterCanAccess, 'Admin_PartBowTwistParameter_Can_Access'],
  [PermissionType.AdminPartBowTwistParameterCanCreate, 'Admin_PartBowTwistParameter_Can_Create'],
  [PermissionType.AdminPartBowTwistParameterCanUpdate, 'Admin_PartBowTwistParameter_Can_Update'],
  [PermissionType.AdminPartBowTwistParameterCanDelete, 'Admin_PartBowTwistParameter_Can_Delete'],
  [PermissionType.AdminPartCountParameterCanAccess, 'Admin_PartCountParameter_Can_Access'],
  [PermissionType.AdminPartCountParameterCanCreate, 'Admin_PartCountParameter_Can_Create'],
  [PermissionType.AdminPartCountParameterCanUpdate, 'Admin_PartCountParameter_Can_Update'],
  [PermissionType.AdminPartCountParameterCanDelete, 'Admin_PartCountParameter_Can_Delete'],
  [PermissionType.AdminPartDateCodeCanAccess, 'Admin_PartDateCode_Can_Access'],
  [PermissionType.AdminPartDateCodeCanCreate, 'Admin_PartDateCode_Can_Create'],
  [PermissionType.AdminPartDateCodeCanUpdate, 'Admin_PartDateCode_Can_Update'],
  [PermissionType.AdminPartDateCodeCanDelete, 'Admin_PartDateCode_Can_Delete'],
  [PermissionType.AdminPartFunParameterCanAccess, 'Admin_PartFunParameter_Can_Access'],
  [PermissionType.AdminPartFunParameterCanCreate, 'Admin_PartFunParameter_Can_Create'],
  [PermissionType.AdminPartFunParameterCanUpdate, 'Admin_PartFunParameter_Can_Update'],
  [PermissionType.AdminPartFunParameterCanDelete, 'Admin_PartFunParameter_Can_Delete'],
  [PermissionType.AdminPartLPositionToleranceCanAccess, 'Admin_PartLPositionTolerance_Can_Access'],
  [PermissionType.AdminPartLPositionToleranceCanCreate, 'Admin_PartLPositionTolerance_Can_Create'],
  [PermissionType.AdminPartLPositionToleranceCanUpdate, 'Admin_PartLPositionTolerance_Can_Update'],
  [PermissionType.AdminPartLPositionToleranceCanDelete, 'Admin_PartLPositionTolerance_Can_Delete'],
  [PermissionType.AdminPartMeasurementParameterCanAccess, 'Admin_PartMeasurementParameter_Can_Access'],
  [PermissionType.AdminPartMeasurementParameterCanCreate, 'Admin_PartMeasurementParameter_Can_Create'],
  [PermissionType.AdminPartMeasurementParameterCanUpdate, 'Admin_PartMeasurementParameter_Can_Update'],
  [PermissionType.AdminPartMeasurementParameterCanDelete, 'Admin_PartMeasurementParameter_Can_Delete'],
  [PermissionType.AdminPartMicrosectionCanAccess, 'Admin_PartMicrosection_Can_Access'],
  [PermissionType.AdminPartMicrosectionCanCreate, 'Admin_PartMicrosection_Can_Create'],
  [PermissionType.AdminPartMicrosectionCanUpdate, 'Admin_PartMicrosection_Can_Update'],
  [PermissionType.AdminPartMicrosectionCanDelete, 'Admin_PartMicrosection_Can_Delete'],
  [PermissionType.AdminPartMPositionToleranceCanAccess, 'Admin_PartMPositionTolerance_Can_Access'],
  [PermissionType.AdminPartMPositionToleranceCanCreate, 'Admin_PartMPositionTolerance_Can_Create'],
  [PermissionType.AdminPartMPositionToleranceCanUpdate, 'Admin_PartMPositionTolerance_Can_Update'],
  [PermissionType.AdminPartMPositionToleranceCanDelete, 'Admin_PartMPositionTolerance_Can_Delete'],
  [PermissionType.AdminPartResultOrientedParameterCanAccess, 'Admin_PartResultOrientedParameter_Can_Access'],
  [PermissionType.AdminPartResultOrientedParameterCanCreate, 'Admin_PartResultOrientedParameter_Can_Create'],
  [PermissionType.AdminPartResultOrientedParameterCanUpdate, 'Admin_PartResultOrientedParameter_Can_Update'],
  [PermissionType.AdminPartResultOrientedParameterCanDelete, 'Admin_PartResultOrientedParameter_Can_Delete'],
  [PermissionType.AdminPartTestReportParameterCanAccess, 'Admin_PartTestReportParameter_Can_Access'],
  [PermissionType.AdminPartTestReportParameterCanCreate, 'Admin_PartTestReportParameter_Can_Create'],
  [PermissionType.AdminPartTestReportParameterCanUpdate, 'Admin_PartTestReportParameter_Can_Update'],
  [PermissionType.AdminPartTestReportParameterCanDelete, 'Admin_PartTestReportParameter_Can_Delete'],

  [PermissionType.AdminCommodityCanAccess, 'Admin_Commodity_Can_Access'],
  [PermissionType.AdminCommodityCanCreate, 'Admin_Commodity_Can_Create'],
  [PermissionType.AdminCommodityCanUpdate, 'Admin_Commodity_Can_Update'],
  [PermissionType.AdminCommodityCanDelete, 'Admin_Commodity_Can_Delete'],
  [PermissionType.AdminCertificationCanAccess, 'Admin_AdminCertification_Can_Access'],
  [PermissionType.AdminCertificationCanCreate, 'Admin_AdminCertification_Can_Create'],
  [PermissionType.AdminCertificationCanUpdate, 'Admin_AdminCertification_Can_Update'],
  [PermissionType.AdminCertificationCanDelete, 'Admin_AdminCertification_Can_Delete'],
  [PermissionType.AdminParameterManagementCanAccess, 'Admin_ParameterManagement_Can_Access'],
  [PermissionType.AdminParameterManagementCanCreate, 'Admin_ParameterManagement_Can_Create'],
  [PermissionType.AdminParameterManagementCanUpdate, 'Admin_ParameterManagement_Can_Update'],
  [PermissionType.AdminParameterManagementCanDelete, 'Admin_ParameterManagement_Can_Delete'],
  [PermissionType.AdminTestReportCanAccess, 'Admin_TestReport_Can_Access'],
  [PermissionType.AdminTestReportCanCreate, 'Admin_TestReport_Can_Create'],
  [PermissionType.AdminTestReportCanUpdate, 'Admin_TestReport_Can_Update'],
  [PermissionType.AdminTestReportCanDelete, 'Admin_TestReport_Can_Delete'],
  [PermissionType.AdminParameterTypeCodeCanAccess, 'Admin_ParameterTypeCode_Can_Access'],
  [PermissionType.AdminParameterTypeCodeCanCreate, 'Admin_ParameterTypeCode_Can_Create'],
  [PermissionType.AdminParameterTypeCodeCanUpdate, 'Admin_ParameterTypeCode_Can_Update'],
  [PermissionType.AdminParameterTypeCodeCanDelete, 'Admin_ParameterTypeCode_Can_Delete'],
  [PermissionType.AdminWorkCellUserCanAccess, 'Admin_WorkCellUser_Can_Access'],
  [PermissionType.AdminWorkCellUserCanCreate, 'Admin_WorkCellUser_Can_Create'],
  [PermissionType.AdminWorkCellUserCanUpdate, 'Admin_WorkCellUser_Can_Update'],
  [PermissionType.AdminWorkCellUserCanDelete, 'Admin_WorkCellUser_Can_Delete'],
  [PermissionType.AdminPartDimensionCanAccess, 'Admin_PartDimension_Can_Access'],
  [PermissionType.AdminPartDimensionCanCreate, 'Admin_PartDimension_Can_Create'],
  [PermissionType.AdminPartDimensionCanUpdate, 'Admin_PartDimension_Can_Update'],
  [PermissionType.AdminPartDimensionCanDelete, 'Admin_PartDimension_Can_Delete'],
  [PermissionType.AdminBowTwistFormulaCanAccess, 'Admin_BowTwistFormula_Can_Access'],
  [PermissionType.AdminBowTwistFormulaCanCreate, 'Admin_BowTwistFormula_Can_Create'],
  [PermissionType.AdminBowTwistFormulaCanUpdate, 'Admin_BowTwistFormula_Can_Update'],
  [PermissionType.AdminBowTwistFormulaCanDelete, 'Admin_BowTwistFormula_Can_Delete'],
  [PermissionType.AdminDCCConfigurationCanAccess, 'Admin_DCCConfiguration_Can_Access'],
  [PermissionType.AdminDCCConfigurationCanCreate, 'Admin_DCCConfiguration_Can_Create'],
  [PermissionType.AdminDCCConfigurationCanUpdate, 'Admin_DCCConfiguration_Can_Update'],
  [PermissionType.AdminDCCConfigurationCanDelete, 'Admin_DCCConfiguration_Can_Delete'],
  [PermissionType.AdminCommodityCategoryCanAccess, 'Admin_CommodityCategory_Can_Access'],
  [PermissionType.AdminCommodityCategoryCanCreate, 'Admin_CommodityCategory_Can_Create'],
  [PermissionType.AdminCommodityCategoryCanUpdate, 'Admin_CommodityCategory_Can_Update'],
  [PermissionType.AdminCommodityCategoryCanDelete, 'Admin_CommodityCategory_Can_Delete'],
  [PermissionType.AdminSupplierCanAccess, 'Admin_Supplier_Can_Access'],
  [PermissionType.AdminSupplierCanCreate, 'Admin_Supplier_Can_Create'],
  [PermissionType.AdminSupplierCanUpdate, 'Admin_Supplier_Can_Update'],
  [PermissionType.AdminNonJabilUserCanAccess, 'Admin_NonJabilUser_Can_Access'],
  [PermissionType.AdminNonJabilUserCanCreate, 'Admin_NonJabilUser_Can_Create'],
  [PermissionType.AdminNonJabilUserCanUpdate, 'Admin_NonJabilUser_Can_Update'],
  [PermissionType.AdminNonJabilUserCanDelete, 'Admin_NonJabilUser_Can_Delete'],
  [PermissionType.AdminPurchaseOrderCanAccess, 'Admin_PurchaseOrder_Can_Access'],
  [PermissionType.AdminPurchaseOrderCanCreate, 'Admin_PurchaseOrder_Can_Create'],
  [PermissionType.AdminPurchaseOrderCanUpdate, 'Admin_PurchaseOrder_Can_Update'],
  [PermissionType.AdminCertificateTypeCanAccess, 'Admin_CertificateType_Can_Access'],
  [PermissionType.AdminCertificateTypeCanCreate, 'Admin_CertificateType_Can_Create'],
  [PermissionType.AdminCertificateTypeCanUpdate, 'Admin_CertificateType_Can_Update'],
  [PermissionType.AdminCertificateTypeCanDelete, 'Admin_CertificateType_Can_Delete'],
  [PermissionType.AdminApprovedPartInspectionPlanCanAccess, 'Admin_ApprovedPartInspection_Can_Access'],
  [PermissionType.AdminApprovedPartInspectionPlanCanCreate, 'Admin_ApprovedPartInspection_Can_Create'],
  [PermissionType.AdminApprovedPartInspectionPlanCanUpdate, 'Admin_ApprovedPartInspection_Can_Update'],
  [PermissionType.AdminApprovedPartInspectionPlanCanDelete, 'Admin_ApprovedPartInspection_Can_Delete'],
  [PermissionType.AdminSupplierMeasurementCanAccess, 'Admin_SupplierMeasurement_Can_Access'],
  [PermissionType.AdminSupplierMeasurementCanCreate, 'Admin_SupplierMeasurement_Can_Create'],
  [PermissionType.AdminSupplierMeasurementCanUpdate, 'Admin_SupplierMeasurement_Can_Update'],
  [PermissionType.AdminSupplierMeasurementCanDelete, 'Admin_SupplierMeasurement_Can_Delete'],
  [PermissionType.AdminDefectManagementCanAccess, 'Admin_DefectManagement_Can_Access'],
  [PermissionType.AdminDefectManagementCanCreate, 'Admin_DefectManagement_Can_Create'],
  [PermissionType.AdminDefectManagementCanUpdate, 'Admin_DefectManagement_Can_Update'],
  [PermissionType.AdminDefectManagementCanDelete, 'Admin_DefectManagement_Can_Delete'],
  [PermissionType.AdminSampleSizeCalculationCanAccess, 'Admin_SampleSizeCalculation_Can_Access'],
  [PermissionType.AdminSamplingPlanCanAccess, 'Admin_SamplingPlan_Can_Access'],

  [PermissionType.AdminSupplierTaskCanAccess, 'Admin_SupplierTask_Can_Access'],
  [PermissionType.AdminSupplierTaskCanCreate, 'Admin_SupplierTask_Can_Create'],
  [PermissionType.AdminSupplierTaskCanUpdate, 'Admin_SupplierTask_Can_Update'],
  [PermissionType.AdminSupplierTaskCanDelete, 'Admin_SupplierTask_Can_Delete'],

  [PermissionType.AdminDCCTaskCanAccess, 'Admin_DCCTask_Can_Access'],
  [PermissionType.AdminDCCTaskCanCreate, 'Admin_DCCTask_Can_Create'],
  [PermissionType.AdminDCCTaskCanUpdate, 'Admin_DCCTask_Can_Update'],
  [PermissionType.AdminDCCTaskCanDelete, 'Admin_DCCTask_Can_Delete'],

  [PermissionType.AdminSQETaskCanAccess, 'Admin_SQETask_Can_Access'],
  [PermissionType.AdminSQETaskCanCreate, 'Admin_SQETask_Can_Create'],
  [PermissionType.AdminSQETaskCanUpdate, 'Admin_SQETask_Can_Update'],
  [PermissionType.AdminSQETaskCanDelete, 'Admin_SQETask_Can_Delete'],

  [PermissionType.AdminSMSMyTaskCanAccess, 'Admin_SMSMyTask_Can_Access'],
  [PermissionType.AdminSMSMyTaskCanCreate, 'Admin_SMSMyTask_Can_Create'],
  [PermissionType.AdminSMSMyTaskCanUpdate, 'Admin_SMSMyTask_Can_Update'],
  [PermissionType.AdminSMSMyTaskCanDelete, 'Admin_SMSMyTask_Can_Delete'],

  [PermissionType.AdminApprovedSupplierMeasurementCanAccess, 'Admin_ApprovedSMS_Can_Access'],
  [PermissionType.AdminApprovedSupplierMeasurementCanCreate, 'Admin_ApprovedSMS_Can_Create'],
  [PermissionType.AdminApprovedSupplierMeasurementCanUpdate, 'Admin_ApprovedSMS_Can_Update'],
  [PermissionType.AdminApprovedSupplierMeasurementCanDelete, 'Admin_ApprovedSMS_Can_Delete'],
]);

export const permissionStructure =
  [
    {
      label: 'Home',
      permission: Constants.Empty,
      children: [
        {
          permission: PermissionType.HomeCanAccess
        },
      ]
    },
    {
      label: 'Admin',
      permission: Constants.Empty,
      children: [
        {
          permission: PermissionType.AdminCanAccess
        },
        {
          label: 'Role',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminRoleCanAccess,
              children: [
                {
                  permission: PermissionType.AdminRoleCanCreate
                },
                {
                  permission: PermissionType.AdminRoleCanUpdate
                },
                {
                  permission: PermissionType.AdminRoleCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'User',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminUserCanAccess,
              children: [
                {
                  permission: PermissionType.AdminUserCanCreate
                },
                {
                  permission: PermissionType.AdminUserCanUpdate
                },
                {
                  permission: PermissionType.AdminUserCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Non Jabil User',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminNonJabilUserCanAccess,
              children: [
                {
                  permission: PermissionType.AdminNonJabilUserCanCreate
                },
                {
                  permission: PermissionType.AdminNonJabilUserCanUpdate
                },
                {
                  permission: PermissionType.AdminNonJabilUserCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Inspection Plan Creation',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminSAPPartInspectionPlanCanAccess,
              children: [
                {
                  permission: PermissionType.AdminSAPPartInspectionPlanCanCreate
                },
                {
                  permission: PermissionType.AdminSAPPartInspectionPlanCanUpdate
                },
                {
                  permission: PermissionType.AdminSAPPartInspectionPlanCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Approved Inspection Plan',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminApprovedPartInspectionPlanCanAccess,
              children: [
                {
                  permission: PermissionType.AdminApprovedPartInspectionPlanCanCreate
                },
                {
                  permission: PermissionType.AdminApprovedPartInspectionPlanCanUpdate
                },
                {
                  permission: PermissionType.AdminApprovedPartInspectionPlanCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Supplier Measurement Submission',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminSupplierMeasurementCanAccess,
              children: [
                {
                  permission: PermissionType.AdminSupplierMeasurementCanCreate
                },
                {
                  permission: PermissionType.AdminSupplierMeasurementCanUpdate
                },
                {
                  permission: PermissionType.AdminSupplierMeasurementCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Approved Supplier Measurement Submission',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminApprovedSupplierMeasurementCanAccess,
              children: [
                {
                  permission: PermissionType.AdminApprovedSupplierMeasurementCanCreate
                },
                {
                  permission: PermissionType.AdminApprovedSupplierMeasurementCanUpdate
                },
                {
                  permission: PermissionType.AdminApprovedSupplierMeasurementCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Supplier Task',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminSupplierTaskCanAccess,
              children: [
                {
                  permission: PermissionType.AdminSupplierTaskCanCreate
                },
                {
                  permission: PermissionType.AdminSupplierTaskCanUpdate
                },
                {
                  permission: PermissionType.AdminSupplierTaskCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'DCC Task',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminDCCTaskCanAccess,
              children: [
                {
                  permission: PermissionType.AdminDCCTaskCanCreate
                },
                {
                  permission: PermissionType.AdminDCCTaskCanUpdate
                },
                {
                  permission: PermissionType.AdminDCCTaskCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'SQE Task',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminSQETaskCanAccess,
              children: [
                {
                  permission: PermissionType.AdminSQETaskCanCreate
                },
                {
                  permission: PermissionType.AdminSQETaskCanUpdate
                },
                {
                  permission: PermissionType.AdminSQETaskCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Jabil SQE SMS Task',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminSMSMyTaskCanAccess,
              children: [
                {
                  permission: PermissionType.AdminSMSMyTaskCanCreate
                },
                {
                  permission: PermissionType.AdminSMSMyTaskCanUpdate
                },
                {
                  permission: PermissionType.AdminSMSMyTaskCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Email',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminEmailTemplateCanAccess,
              children: [
                {
                  permission: PermissionType.AdminEmailTemplateCanUpdate
                }
              ]
            }
          ]
        },
        // {
        //   label: 'Department',
        //   permission: Constants.Empty,
        //   children: [
        //     {
        //       permission: PermissionType.AdminDepartmentCanAccess,
        //       children: [
        //         {
        //           permission: PermissionType.AdminDepartmentCanCreate
        //         },
        //         {
        //           permission: PermissionType.AdminDepartmentCanUpdate
        //         },
        //         {
        //           permission: PermissionType.AdminDepartmentCanDelete
        //         }
        //       ]
        //     }
        //   ]
        // },
        {
          label: 'WorkCell',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminWorkCellCanAccess,
              children: [
                {
                  permission: PermissionType.AdminWorkCellCanCreate
                },
                {
                  permission: PermissionType.AdminWorkCellCanUpdate
                },
                {
                  permission: PermissionType.AdminWorkCellCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Location',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminLocationCanAccess,
              children: [
                {
                  permission: PermissionType.AdminLocationCanCreate
                },
                {
                  permission: PermissionType.AdminLocationCanUpdate
                },
                {
                  permission: PermissionType.AdminLocationCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Division',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminDivisionCanAccess,
              children: [
                {
                  permission: PermissionType.AdminDivisionCanCreate
                },
                {
                  permission: PermissionType.AdminDivisionCanUpdate
                },
                {
                  permission: PermissionType.AdminDivisionCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Country',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminCountryCanAccess,
              children: [
                {
                  permission: PermissionType.AdminCountryCanCreate
                },
                {
                  permission: PermissionType.AdminCountryCanUpdate
                },
                {
                  permission: PermissionType.AdminCountryCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Region',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminRegionCanAccess,
              children: [
                {
                  permission: PermissionType.AdminRegionCanCreate
                },
                {
                  permission: PermissionType.AdminRegionCanUpdate
                },
                {
                  permission: PermissionType.AdminRegionCanDelete
                }
              ]
            }
          ]
        },
              // {
        //   label: 'Site-Sme',
        //   permission: Constants.Empty,
        //   children: [
        //     {
        //       permission: PermissionType.AdminSiteUserCanAccess,
        //       children: [
        //         {
        //           permission: PermissionType.AdminSiteUserCanCreate
        //         },
        //         {
        //           permission: PermissionType.AdminSiteUserCanUpdate
        //         },
        //         {
        //           permission: PermissionType.AdminSiteUserCanDelete
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   label: 'Admin Certification',
        //   permission: Constants.Empty,
        //   children: [
        //     {
        //       permission: PermissionType.AdminCertificationCanAccess,
        //       children: [
        //         {
        //           permission: PermissionType.AdminCertificationCanCreate
        //         },
        //         {
        //           permission: PermissionType.AdminCertificationCanUpdate
        //         },
        //         {
        //           permission: PermissionType.AdminCertificationCanDelete
        //         }
        //       ]
        //     }
        //   ]
        // },
        {
          label: 'Site',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminSiteCanAccess,
              children: [
                {
                  permission: PermissionType.AdminSiteCanCreate
                },
                {
                  permission: PermissionType.AdminSiteCanUpdate
                },
                {
                  permission: PermissionType.AdminSiteCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Audit Log',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminAuditLogCanAccess
            }
          ]
        },
        {
          label: 'UOM',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminUOMCanAccess,
              children: [
                {
                  permission: PermissionType.AdminUOMCanCreate
                },
                {
                  permission: PermissionType.AdminUOMCanUpdate
                },
                {
                  permission: PermissionType.AdminUOMCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Inspection Tools Type',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminInspectionToolsTypeCanAccess,
              children: [
                {
                  permission: PermissionType.AdminInspectionToolsTypeCanCreate
                },
                {
                  permission: PermissionType.AdminInspectionToolsTypeCanUpdate
                },
                {
                  permission: PermissionType.AdminInspectionToolsTypeCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Parameter Category',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminParameterCategoryCanAccess,
              children: [
                {
                  permission: PermissionType.AdminParameterCategoryCanCreate
                },
                {
                  permission: PermissionType.AdminParameterCategoryCanUpdate
                },
                {
                  permission: PermissionType.AdminParameterCategoryCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Parameter Type',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminParameterTypeCanAccess,
              children: [
                {
                  permission: PermissionType.AdminParameterTypeCanCreate
                },
                {
                  permission: PermissionType.AdminParameterTypeCanUpdate
                },
                {
                  permission: PermissionType.AdminParameterTypeCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'PC-Code (Parameter Control Code)',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminPCCodeCanAccess,
              children: [
                {
                  permission: PermissionType.AdminPCCodeCanCreate
                },
                {
                  permission: PermissionType.AdminPCCodeCanUpdate
                },
                {
                  permission: PermissionType.AdminPCCodeCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Instrument Type',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminInstrumentTypeCanAccess,
              children: [
                {
                  permission: PermissionType.AdminInstrumentTypeCanCreate
                },
                {
                  permission: PermissionType.AdminInstrumentTypeCanUpdate
                },
                {
                  permission: PermissionType.AdminInstrumentTypeCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Inspection Tools',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminInspectionToolsCanAccess,
              children: [
                {
                  permission: PermissionType.AdminInspectionToolsCanCreate
                },
                {
                  permission: PermissionType.AdminInspectionToolsCanUpdate
                },
                {
                  permission: PermissionType.AdminInspectionToolsCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Instrument',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminInstrumentCanAccess,
              children: [
                {
                  permission: PermissionType.AdminInstrumentCanCreate
                },
                {
                  permission: PermissionType.AdminInstrumentCanUpdate
                },
                {
                  permission: PermissionType.AdminInstrumentCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Part',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminPartCanAccess,
              children: [
                {
                  permission: PermissionType.AdminPartCanCreate
                },
                {
                  permission: PermissionType.AdminPartCanUpdate
                }
              ]
            }
          ]
        },

        {
          label: 'Commodity',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminCommodityCanAccess,
              children: [
                {
                  permission: PermissionType.AdminCommodityCanCreate
                },
                {
                  permission: PermissionType.AdminCommodityCanUpdate
                },
                {
                  permission: PermissionType.AdminCommodityCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Commodity Category',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminCommodityCategoryCanAccess,
              children: [
                {
                  permission: PermissionType.AdminCommodityCategoryCanCreate
                },
                {
                  permission: PermissionType.AdminCommodityCategoryCanUpdate
                },
                {
                  permission: PermissionType.AdminCommodityCategoryCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Material Group',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminMaterialGroupCanAccess,
              children: [
                {
                  permission: PermissionType.AdminMaterialGroupCanCreate
                }
              ]
            }
          ]
        },
        {
          label: 'Parameter Management',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminParameterManagementCanAccess,
              children: [
                {
                  permission: PermissionType.AdminParameterManagementCanCreate
                },
                {
                  permission: PermissionType.AdminParameterManagementCanUpdate
                },
                {
                  permission: PermissionType.AdminParameterManagementCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Test Report',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminTestReportCanAccess,
              children: [
                {
                  permission: PermissionType.AdminTestReportCanCreate
                },
                {
                  permission: PermissionType.AdminTestReportCanUpdate
                },
                {
                  permission: PermissionType.AdminTestReportCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Parameter Type Code',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminParameterTypeCodeCanAccess,
              children: [
                {
                  permission: PermissionType.AdminParameterTypeCodeCanCreate
                },
                {
                  permission: PermissionType.AdminParameterTypeCodeCanUpdate
                },
                {
                  permission: PermissionType.AdminParameterTypeCodeCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'WorkCell User Management',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminWorkCellUserCanAccess,
              children: [
                {
                  permission: PermissionType.AdminWorkCellUserCanCreate
                },
                {
                  permission: PermissionType.AdminWorkCellUserCanUpdate
                },
                {
                  permission: PermissionType.AdminWorkCellUserCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Dimension Number Management',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminPartDimensionCanAccess,
              children: [
                {
                  permission: PermissionType.AdminPartDimensionCanCreate
                },
                {
                  permission: PermissionType.AdminPartDimensionCanUpdate
                },
                {
                  permission: PermissionType.AdminPartDimensionCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Bow-Twist',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminBowTwistFormulaCanAccess,
              children: [
                {
                  permission: PermissionType.AdminBowTwistFormulaCanCreate
                },
                {
                  permission: PermissionType.AdminBowTwistFormulaCanUpdate
                },
                {
                  permission: PermissionType.AdminBowTwistFormulaCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'DCC-Site',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminDCCConfigurationCanAccess,
              children: [
                {
                  permission: PermissionType.AdminDCCConfigurationCanCreate
                },
                {
                  permission: PermissionType.AdminDCCConfigurationCanUpdate
                },
                {
                  permission: PermissionType.AdminDCCConfigurationCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Supplier',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminSupplierCanAccess,
              children: [
                {
                  permission: PermissionType.AdminSupplierCanCreate
                },
                {
                  permission: PermissionType.AdminSupplierCanUpdate
                }
              ]
            }
          ]
        },
        {
          label: 'Purchase Order',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminPurchaseOrderCanAccess,
              children: [
                {
                  permission: PermissionType.AdminPurchaseOrderCanCreate
                },
                {
                  permission: PermissionType.AdminPurchaseOrderCanUpdate
                }
              ]
            }
          ]
        },
        {
          label: 'Certificate Type',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminCertificateTypeCanAccess,
              children: [
                {
                  permission: PermissionType.AdminCertificateTypeCanCreate
                },
                {
                  permission: PermissionType.AdminCertificateTypeCanUpdate
                },
                {
                  permission: PermissionType.AdminCertificateTypeCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Defect Management',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminDefectManagementCanAccess,
              children: [
                {
                  permission: PermissionType.AdminDefectManagementCanCreate
                },
                {
                  permission: PermissionType.AdminDefectManagementCanUpdate
                },
                {
                  permission: PermissionType.AdminDefectManagementCanDelete
                }
              ]
            }
          ]
        },
        {
          label: 'Sample Size Calculation',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminSampleSizeCalculationCanAccess,
            }
          ]
        },
        {
          label: 'Sampling Plan',
          permission: Constants.Empty,
          children: [
            {
              permission: PermissionType.AdminSamplingPlanCanAccess,
            }
          ]
        }
      ]
    },
  ];


