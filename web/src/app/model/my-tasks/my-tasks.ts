/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { AdminCertification } from '../admin-certification/admin-certification';
import { Commodity } from '../commodity/commodity';
import { WorkCell } from '../workcell/work-cell';
import { ProductLifeCycleStage } from '../product-life-cycle-stage/product-life-cycle-stage';
import { PartInspectionDrawingAttachment } from '../part-inspection-drawing-attachment/part-inspection-drawing-attachment';
import { User } from '../user/user';
import { ColumnType } from '../table/table';
import { SAPSamplingPlanModel } from '../sap-models/sap-sampling-plan-model';
import { PartInspectionSpecAttachment } from '../part-inspection-spec-attachment/part-inspection-spec-attachment';
import { PartDateCode } from '../part-date-code/part-date-code';
import { StateType } from '../state-type/commodity-name';
import { PartInspectionAdminCertification } from '../part-inspection-admin-certification/part-inspection-admin-certification';
import { Supplier } from '../supplier/supplier';
import { PartInspectionCertificationAttachment } from '../part-inspection-certification-attachment/part-inspection-certification-attachment';
import { MPositionToleranceModel } from '../sap-part-inspection-plan/m-position-tolerance/m-position-tolerance-model';
import { LPositionToleranceModel } from '../sap-part-inspection-plan/l-position-tolerance/l-position-tolerance-model';
import { MeasurementParameterModel } from '../sap-part-inspection-plan/measurement-parameter/measurement-parameter-model';
import { MicroSectionParameterModel } from '../sap-part-inspection-plan/micro-section-parameter/micro-section-parameter-model';
import { FunParameterModel } from '../sap-part-inspection-plan/fun-parameter/fun-parameter-model';
import { ResultOrientedTab } from '../result-oriented/result-oriented';
import { PartCountParameter } from '../part-count-parameter/part-count-parameter';
import { PartInspectionBowTwistParameter } from '../part-inspection-bow-twist-parameter/part-inspection-bow-twist-parameter';
import { PartDrawingModel } from '../sap-part-inspection-plan/part-drawing-model';
import { PartSpecModel } from '../sap-part-inspection-plan/part-spec-model';
import { SAPPartInspectionPlanComments } from '../sap-part-inspection-plan-comments/sap-part-inspection-plan-comments';
import { PartTestReportTab } from '../part-test-report/part-test-report-tab-model';
export class MyTasks extends BaseModel {

  @FormInput()
  @DisplayColumn('PartNo')
  partNo: string;

  partId: number;

  @Trim()
  @FormInput()
  partDescription: string;

  @Trim()
  @FormInput()
  @DisplayColumn('IP')
  ip: string;

  @Trim()
  @FormInput()
  siteIP: string;

  @Trim()
  @FormInput()
  cafNo: string;

  @FormInput()
  isSafePart: boolean;

  @FormInput()
  @ExpandSelect({ select: ['Id', 'Name', 'IsEnabled'] })
  @DisplayColumn('WorkCell', { type: ColumnType.Status, mappingField: 'name' }, false)
  workCell: WorkCell;

  @DisplayColumn('WorkCell', { type: ColumnType.String, mappingField: 'name' })
  workCellName: string;

  @FormInput()
  @DisplayColumn('WorkCellId', { type: ColumnType.Status, mappingField: 'name' }, false)
  workCellId: number;

  @Trim()
  @FormInput()
  divisionModelNumber: string;

  @Trim()
  @FormInput()
  genWI: string;

  @Trim()
  @FormInput()
  refDoc: string;

  @FormInput()
  @ExpandSelect({ select: ['Id', 'Name', 'IsEnabled'] })
  @DisplayColumn('Commodity', { type: ColumnType.Status, mappingField: 'name' }, false)
  commodity: Commodity;

  @DisplayColumn('Commodity', { type: ColumnType.String, mappingField: 'name' })
  commodityName: string;

  @FormInput()
  commodityId: number;

  @FormInput()
  manufacturePartNumber: string;

  @Trim()
  @FormInput()
  manufacturer: string;

  @FormInput()
  adminCertifications: AdminCertification[];

  myTasksAdminCertifications: PartInspectionAdminCertification[];

  @FormInput()
  adminCertificationId: number;

  @FormInput()
  supplierId: number;

  @FormInput()
  @Expand()
  @DisplayColumn('Supplier', { type: ColumnType.Status, mappingField: 'vendorName' }, false)
  supplier: Supplier;

  @DisplayColumn('Supplier', { type: ColumnType.String, mappingField: 'name' })
  supplierVendorName: string;

  @FormInput()
  supplierContactId: number;

  @FormInput()
  // @Expand()
  supplierContact: User;

  @Trim()
  @FormInput()
  jabilOwnerContact: string;

  @FormInput()
  // @Expand()
  productLifeCycleStage: ProductLifeCycleStage;

  @FormInput()
  productLifeCycleStageId: number;

  // @Expand(['attachment'])
  partInspectionDrawingAttachments: PartInspectionDrawingAttachment[];

  // @Expand(['attachment'])
  partInspectionSpecAttachments: PartInspectionSpecAttachment[];

  partInspectionCertificationAttachments: PartInspectionCertificationAttachment[];

  stateTypeId: number;

  partDateCode: PartDateCode;

  @FormInput()
  submittedByUserId: number;


  @ExpandSelect({ select: ['Name', 'IsEnabled'] })
  @DisplayColumn('SubmittedBy', { type: ColumnType.Status, mappingField: 'name' }, false)
  submittedBy: User;

  @DisplayColumn('SubmittedBy', { type: ColumnType.String, mappingField: 'name' })
  submittedByName: string;

  @FormInput()
  assignToUserId: number;
  @DisplayColumn('SubmittedDate', { type: ColumnType.Date })
  submittedDate: Date;


  @Trim()
  @FormInput()
  comment: string;

  @FormInput()
  approveRejectedId: number;

  @FormInput()
  approveRejectedDate: Date;

  approveRejected: User;

  // @Expand()
  sapPartInspectionPlanSamplingPlans: SAPSamplingPlanModel[];

  @DisplayColumn('State', { type: ColumnType.Status, mappingField: 'description' }, false)
  @Expand()
  stateType: StateType;

  @DisplayColumn('State', { type: ColumnType.String, mappingField: 'description' })
  stateTypeDescription: string;


  addedAdminCertificateIds: PartInspectionAdminCertification[];

  removedAdminCertificateIds: PartInspectionAdminCertification[];

  partMPositionTolerances: MPositionToleranceModel[];

  partLPositionTolerances: LPositionToleranceModel[];

  partMeasurementParameters: MeasurementParameterModel[];

  partMicrosectionParameters: MicroSectionParameterModel[];

  partFunParameters: FunParameterModel[];

  partResultOrientedParameters: ResultOrientedTab[];

  partTestReportParameters: PartTestReportTab[];

  partCountParameters: PartCountParameter[];

  ismpnMatched: boolean;

  mpnMaterialHERS: string;

  mpnReason: string;

  partInspectionBowTwistParameters: PartInspectionBowTwistParameter[];

  specTypeId: number;

  dataTypeId: number;

  partDateCodeId: number;

  partInspectionDrawings: PartDrawingModel[];

  partInspectionSpecifications: PartSpecModel[];

  @FormInput()
  ipSerialNumber: number;

  @FormInput()
  siteIPSerialNumber: number;

  @ExpandSelect({ select: ['Name', 'IsEnabled'] })
  @DisplayColumn('CreatedByUser', { type: ColumnType.Status, mappingField: 'name' }, false)
  createdByUser: User;

  @DisplayColumn('CreatedByUser', { type: ColumnType.String, mappingField: 'name' })
  createdByUserName: string;

  @DisplayColumn('CreatedDate', { type: ColumnType.Date }, true, true)
  created: Date;

  @Expand()
  @DisplayColumn('AssignTo', { type: ColumnType.ColumnValueBasedDynamicType, mappingField: 'name' })
  @FormInput()
  assignTo: User;

  @ExpandSelect({
    expand: [{
      submittedByUser: {}
    }]
  })
  partComments: SAPPartInspectionPlanComments[];

  constructor(myTasks?: MyTasks) {
    super(myTasks);
    if (myTasks) {
      this.partNo = myTasks.partNo;
      this.partDescription = myTasks.partDescription;
      this.ip = myTasks.ip;
      this.siteIP = myTasks.siteIP;
      this.cafNo = myTasks.cafNo;
      this.isSafePart = myTasks.isSafePart;
      this.workCellId = myTasks.workCellId;
      this.workCell = myTasks.workCell;
      this.divisionModelNumber = myTasks.divisionModelNumber;
      this.genWI = myTasks.genWI;
      this.refDoc = myTasks.refDoc;
      this.commodityId = myTasks.commodityId;
      this.commodity = myTasks.commodity;
      this.partInspectionDrawings = myTasks.partInspectionDrawings;
      this.partInspectionSpecifications = myTasks.partInspectionSpecifications;
      this.manufacturePartNumber = myTasks.manufacturePartNumber;
      this.manufacturer = myTasks.manufacturer;
      this.adminCertificationId = myTasks.adminCertificationId;
      this.adminCertifications = myTasks.adminCertifications;
      this.supplierId = myTasks.supplierId;
      this.supplier = myTasks.supplier;
      this.supplierContactId = myTasks.supplierContactId;
      this.supplierContact = myTasks.supplierContact;
      this.jabilOwnerContact = myTasks.jabilOwnerContact;
      this.productLifeCycleStageId = myTasks.productLifeCycleStageId;
      this.productLifeCycleStage = myTasks.productLifeCycleStage;
      this.partInspectionDrawingAttachments = myTasks.partInspectionDrawingAttachments;
      this.partInspectionSpecAttachments = myTasks.partInspectionSpecAttachments;
      this.partInspectionCertificationAttachments = myTasks.partInspectionCertificationAttachments;
      this.assignTo = myTasks.assignTo;
      this.submittedBy = myTasks.submittedBy;
      this.assignToUserId = myTasks.assignToUserId;
      this.submittedByUserId = myTasks.submittedByUserId;
      this.submittedDate = myTasks.submittedDate;
      this.comment = myTasks.comment;
      this.approveRejected = myTasks.approveRejected;
      this.approveRejectedId = myTasks.approveRejectedId;
      this.approveRejectedDate = myTasks.approveRejectedDate;
      this.stateTypeId = myTasks.stateTypeId;
      this.myTasksAdminCertifications = myTasks.myTasksAdminCertifications;
      this.ismpnMatched = myTasks.ismpnMatched;
      this.mpnMaterialHERS = myTasks.mpnMaterialHERS;
      this.mpnReason = myTasks.mpnReason;
      this.partMPositionTolerances = myTasks.partMPositionTolerances;
      this.partLPositionTolerances = myTasks.partLPositionTolerances;
      this.partMeasurementParameters = myTasks.partMeasurementParameters;
      this.partMicrosectionParameters = myTasks.partMicrosectionParameters;
      this.partFunParameters = myTasks.partFunParameters;
      this.partInspectionBowTwistParameters = myTasks.partInspectionBowTwistParameters;
      this.dataTypeId = myTasks.dataTypeId,
        this.partResultOrientedParameters = myTasks.partResultOrientedParameters;
      this.partTestReportParameters = myTasks.partTestReportParameters;
      this.partCountParameters = myTasks.partCountParameters;
      this.specTypeId = myTasks.specTypeId;
      this.partDateCodeId = myTasks.partDateCodeId === 0 ? null : myTasks.partDateCodeId;
      this.ipSerialNumber = myTasks.ipSerialNumber;
      this.siteIPSerialNumber = myTasks.siteIPSerialNumber;
      this.createdByUser = myTasks.createdByUser;

    } else {
      this.partNo = Constants.Empty;
      this.partDescription = Constants.Empty;
      this.ip = Constants.Empty;
      this.siteIP = Constants.Empty;
      this.cafNo = Constants.Empty;
      this.isSafePart = false;
      this.isEnabled = false;
      this.workCellId = Numbers.Default;
      this.workCell = null;
      this.divisionModelNumber = Constants.Empty;
      this.genWI = Constants.Empty;
      this.refDoc = Constants.Empty;
      this.commodityId = Numbers.Default;
      this.commodity = null;
      this.manufacturePartNumber = Constants.Empty;
      this.manufacturer = Constants.Empty;
      this.adminCertificationId = null;
      this.adminCertifications = [];
      this.supplierId = null;
      this.supplier = null;
      this.supplierContactId = null;
      this.supplierContact = null;
      this.jabilOwnerContact = Constants.Empty;
      this.productLifeCycleStageId = null;
      this.productLifeCycleStage = null;
      this.partInspectionDrawingAttachments = [];
      this.assignTo = null;
      this.submittedBy = null;
      this.assignToUserId = null;
      this.submittedByUserId = null;
      this.submittedDate = null;
      this.comment = Constants.Empty;
      this.approveRejected = null;
      this.approveRejectedId = null;
      this.approveRejectedDate = null;
      this.partInspectionSpecAttachments = [];
      this.myTasksAdminCertifications = [];
      this.partInspectionCertificationAttachments = [];
      this.stateTypeId = null;
      this.ismpnMatched = null;
      this.mpnMaterialHERS = Constants.Empty;
      this.mpnReason = Constants.Empty;
      this.partMPositionTolerances = [];
      this.partLPositionTolerances = [];
      this.partMeasurementParameters = [];
      this.partMicrosectionParameters = [];
      this.partFunParameters = [];
      this.partResultOrientedParameters = [];
      this.partInspectionBowTwistParameters = [];
      this.partTestReportParameters = [];
      this.specTypeId = Numbers.Default;
      this.dataTypeId = Numbers.Default;
      this.partCountParameters = [];
      this.partDateCodeId = null;
      this.ipSerialNumber = Numbers.Default;
      this.siteIPSerialNumber = Numbers.Default;
      this.createdByUser = null;
    }
  }
}
