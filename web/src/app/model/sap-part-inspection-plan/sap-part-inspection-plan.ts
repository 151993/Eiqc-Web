/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers, SortOrderDirection } from 'src/app/shared/constant/global';
import { AdminCertification } from '../admin-certification/admin-certification';
import { Commodity } from '../commodity/commodity';
import { WorkCell } from '../workcell/work-cell';
import { ProductLifeCycleStage } from '../product-life-cycle-stage/product-life-cycle-stage';
import { PartInspectionDrawingAttachment } from '../part-inspection-drawing-attachment/part-inspection-drawing-attachment';
import { SAPSamplingPlanModel } from '../sap-models/sap-sampling-plan-model';
import { ColumnType } from '../table/table';
import { StateType } from '../state-type/commodity-name';
import { User } from '../user/user';
import { PartInspectionAdminCertification } from '../part-inspection-admin-certification/part-inspection-admin-certification';
import { PartPlanStateType } from 'src/app/shared/constant/global';
import { PartInspectionCertificationAttachment } from '../part-inspection-certification-attachment/part-inspection-certification-attachment';
import { PartInspectionSpecAttachment } from '../part-inspection-spec-attachment/part-inspection-spec-attachment';
import { MPositionToleranceModel } from './m-position-tolerance/m-position-tolerance-model';
import { LPositionToleranceModel } from './l-position-tolerance/l-position-tolerance-model';
import { MeasurementParameterModel } from './measurement-parameter/measurement-parameter-model';
import { MicroSectionParameterModel } from './micro-section-parameter/micro-section-parameter-model';
import { FunParameterModel } from './fun-parameter/fun-parameter-model';
import { PartInspectionBowTwistParameter } from '../part-inspection-bow-twist-parameter/part-inspection-bow-twist-parameter';
import { ResultOrientedTab } from '../result-oriented/result-oriented';
import { PartCountParameter } from '../part-count-parameter/part-count-parameter';
import { PartDateCode } from '../part-date-code/part-date-code';
import { Supplier } from '../supplier/supplier';
import { PartDrawingModel } from './part-drawing-model';
import { PartSpecModel } from './part-spec-model';
import { SAPPartInspectionPlanComments } from '../sap-part-inspection-plan-comments/sap-part-inspection-plan-comments';
import { PartTestReportTab } from '../part-test-report/part-test-report-tab-model';
export class SAPPartInspectionPlan extends BaseModel {


    @FormInput()
    @DisplayColumn('PartNo')
    partNo: string;


    @Trim()
    @FormInput()
    @DisplayColumn('PartDescription')
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

    @DisplayColumn('WorkCell')
    workCellName: string;

    @FormInput()
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

    @DisplayColumn('Commodity')
    commodityName: string;

    @FormInput()
    commodityId: number;

    @FormInput()
    manufacturePartNumber: string;

    @Trim()
    @FormInput()
    manufacturer: string;

    @Trim()
    @FormInput()
    mediaCode: string;

    @Trim()
    @FormInput()
    maskedMPN: string;

    @FormInput()
    adminCertifications: AdminCertification[];

    sAPPartInspectionPlanAdminCertifications: PartInspectionAdminCertification[];

    @FormInput()
    adminCertificationId: number;

    @FormInput()
    supplierId: number;

    @FormInput()
    @Expand()
    @DisplayColumn('Supplier', { type: ColumnType.Status, mappingField: 'vendorName' }, false)
    supplier: Supplier;

    @DisplayColumn('Supplier')
    supplierVendorName: string;

    @FormInput()
    supplierContactId: number;

    @FormInput()
    @Expand()
    supplierContact: User;

    @Trim()
    @FormInput()
    jabilOwnerContact: string;

    @FormInput()
    productLifeCycleStage: ProductLifeCycleStage;

    @FormInput()
    productLifeCycleStageId: number;

    partInspectionDrawingAttachments: PartInspectionDrawingAttachment[];

    partInspectionSpecAttachments: PartInspectionSpecAttachment[];

    partInspectionCertificationAttachments: PartInspectionCertificationAttachment[];

    stateTypeId: number;

    partDateCode: PartDateCode;

    @FormInput()
    submittedByUserId: number;

    @FormInput()
    assignToUserId: number;

    submittedDate: Date;

    @Expand()
    @FormInput()
    submittedBy: User;

    @FormInput()
    assignTo: User;

    @Trim()
    @FormInput()
    comment: string;

    @FormInput()
    approveRejectedId: number;

    @FormInput()
    approveRejectedDate: Date;

    approveRejected: User;

    samplingPlans: SAPSamplingPlanModel[];

    @DisplayColumn('State', { type: ColumnType.Status, mappingField: 'description' }, false)
    @Expand()
    stateType: StateType;

    @DisplayColumn('State')
    stateTypeDescription: string;

    sapPartInspectionPlanSamplingPlans: SAPSamplingPlanModel[];

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

    @DisplayColumn('CreatedDate', { type: ColumnType.Date }, true, true, SortOrderDirection.Desc)
    created: Date;

    partComments: SAPPartInspectionPlanComments[];

    referenceSAPPartInspectionPlanId: number;

    isRedefine: boolean;

    isSupplier: boolean;

    dateCodeLimit: number;

    constructor(sAPPartInspectionPlan?: SAPPartInspectionPlan) {
        super(sAPPartInspectionPlan);
        if (sAPPartInspectionPlan) {
            this.partNo = sAPPartInspectionPlan.partNo;
            this.partDescription = sAPPartInspectionPlan.partDescription;
            this.ip = sAPPartInspectionPlan.ip;
            this.siteIP = sAPPartInspectionPlan.siteIP;
            this.cafNo = sAPPartInspectionPlan.cafNo;
            this.isSafePart = sAPPartInspectionPlan.isSafePart;
            this.workCellId = sAPPartInspectionPlan.workCellId;
            this.workCell = sAPPartInspectionPlan.workCell;
            this.divisionModelNumber = sAPPartInspectionPlan.divisionModelNumber;
            this.genWI = sAPPartInspectionPlan.genWI;
            this.refDoc = sAPPartInspectionPlan.refDoc;
            this.commodityId = sAPPartInspectionPlan.commodityId;
            this.commodity = sAPPartInspectionPlan.commodity;
            this.partInspectionDrawings = sAPPartInspectionPlan.partInspectionDrawings;
            this.partInspectionSpecifications = sAPPartInspectionPlan.partInspectionSpecifications;
            this.manufacturePartNumber = sAPPartInspectionPlan.manufacturePartNumber;
            this.manufacturer = sAPPartInspectionPlan.manufacturer;
            this.mediaCode = sAPPartInspectionPlan.mediaCode;
            this.maskedMPN = sAPPartInspectionPlan.maskedMPN;
            this.adminCertificationId = sAPPartInspectionPlan.adminCertificationId;
            this.adminCertifications = sAPPartInspectionPlan.adminCertifications;
            this.supplierId = sAPPartInspectionPlan.supplierId;
            this.supplier = sAPPartInspectionPlan.supplier;
            this.supplierContactId = sAPPartInspectionPlan.supplierContactId;
            this.supplierContact = sAPPartInspectionPlan.supplierContact;
            this.jabilOwnerContact = sAPPartInspectionPlan.jabilOwnerContact;
            this.productLifeCycleStageId = sAPPartInspectionPlan.productLifeCycleStageId;
            this.productLifeCycleStage = sAPPartInspectionPlan.productLifeCycleStage;
            this.partInspectionDrawingAttachments = sAPPartInspectionPlan.partInspectionDrawingAttachments;
            this.partInspectionSpecAttachments = sAPPartInspectionPlan.partInspectionSpecAttachments;
            this.partInspectionCertificationAttachments = sAPPartInspectionPlan.partInspectionCertificationAttachments;
            this.assignTo = sAPPartInspectionPlan.assignTo;
            this.submittedBy = sAPPartInspectionPlan.submittedBy;
            this.assignToUserId = sAPPartInspectionPlan.assignToUserId;
            this.submittedByUserId = sAPPartInspectionPlan.submittedByUserId;
            this.submittedDate = sAPPartInspectionPlan.submittedDate;
            this.comment = sAPPartInspectionPlan.comment;
            this.approveRejected = sAPPartInspectionPlan.approveRejected;
            this.approveRejectedId = sAPPartInspectionPlan.approveRejectedId;
            this.approveRejectedDate = sAPPartInspectionPlan.approveRejectedDate;
            this.stateTypeId = sAPPartInspectionPlan.stateTypeId;
            this.sapPartInspectionPlanSamplingPlans = sAPPartInspectionPlan.sapPartInspectionPlanSamplingPlans;
            this.sAPPartInspectionPlanAdminCertifications = sAPPartInspectionPlan.sAPPartInspectionPlanAdminCertifications;
            this.ismpnMatched = sAPPartInspectionPlan.ismpnMatched;
            this.mpnMaterialHERS = sAPPartInspectionPlan.mpnMaterialHERS;
            this.mpnReason = sAPPartInspectionPlan.mpnReason;
            this.partMPositionTolerances = sAPPartInspectionPlan.partMPositionTolerances;
            this.partLPositionTolerances = sAPPartInspectionPlan.partLPositionTolerances;
            this.partMeasurementParameters = sAPPartInspectionPlan.partMeasurementParameters;
            this.partMicrosectionParameters = sAPPartInspectionPlan.partMicrosectionParameters;
            this.partFunParameters = sAPPartInspectionPlan.partFunParameters;
            this.partInspectionBowTwistParameters = sAPPartInspectionPlan.partInspectionBowTwistParameters;
            this.dataTypeId = sAPPartInspectionPlan.dataTypeId,
                this.partResultOrientedParameters = sAPPartInspectionPlan.partResultOrientedParameters;
            this.partTestReportParameters = sAPPartInspectionPlan.partTestReportParameters;
            this.partCountParameters = sAPPartInspectionPlan.partCountParameters;
            // Set table row options
            this.enableRowEdit = (sAPPartInspectionPlan.stateTypeId === PartPlanStateType.Draft ||
                sAPPartInspectionPlan.stateTypeId === PartPlanStateType.Rejected_By_SQE);
            this.enableRowView = !this.enableRowEdit;
            this.enableRowDelete = (sAPPartInspectionPlan.stateTypeId === PartPlanStateType.Draft ||
                sAPPartInspectionPlan.stateTypeId === PartPlanStateType.Rejected_By_SQE);
            this.specTypeId = sAPPartInspectionPlan.specTypeId;
            this.partDateCodeId = sAPPartInspectionPlan.partDateCodeId === 0 ? null : sAPPartInspectionPlan.partDateCodeId;
            this.ipSerialNumber = sAPPartInspectionPlan.ipSerialNumber;
            this.siteIPSerialNumber = sAPPartInspectionPlan.siteIPSerialNumber;
            this.partComments = sAPPartInspectionPlan.partComments;
            this.referenceSAPPartInspectionPlanId = sAPPartInspectionPlan.referenceSAPPartInspectionPlanId;
            this.isRedefine = sAPPartInspectionPlan.isRedefine;
            this.isSupplier = sAPPartInspectionPlan.isSupplier;
            this.dateCodeLimit = sAPPartInspectionPlan.dateCodeLimit;
        } else {
            this.partNo = Constants.Empty;
            this.partDescription = Constants.Empty;
            this.ip = Constants.Empty;
            this.siteIP = Constants.Empty;
            this.cafNo = Constants.Empty;
            this.isSafePart = false;
            this.isEnabled = false;
            this.workCellId = null;
            this.workCell = null;
            this.divisionModelNumber = Constants.Empty;
            this.genWI = Constants.Empty;
            this.refDoc = Constants.Empty;
            this.commodityId = 0;
            this.commodity = null;
            this.manufacturePartNumber = Constants.Empty;
            this.manufacturer = Constants.Empty;
            this.mediaCode = Constants.Empty;
            this.maskedMPN = Constants.Empty;
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
            this.sAPPartInspectionPlanAdminCertifications = [];
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
            this.partComments = null;
            this.referenceSAPPartInspectionPlanId = Numbers.Default;
            this.isRedefine = false;
            this.isSupplier = false;
            this.dateCodeLimit = Numbers.Default;
        }
    }
}
