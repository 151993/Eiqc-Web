
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from '../../shared/constant/global';
import { SAPPartInspectionPlan } from './sap-part-inspection-plan';
import { WorkCell } from '../workcell/work-cell';
import { Commodity } from '../commodity/commodity';
import { AdminCertification } from '../admin-certification/admin-certification';
import { ProductLifeCycleStage } from '../product-life-cycle-stage/product-life-cycle-stage';
import { Attachment } from '../attachment/attachment';
import { User } from '../user/user';
import { SAPSamplingPlanModel } from '../sap-models/sap-sampling-plan-model';
import { PartInspectionAdminCertification } from '../part-inspection-admin-certification/part-inspection-admin-certification';
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

export class AddSAPPartInspectionPlanModel extends BaseModel {
    partNo: string;
    partDescription: string;
    ip: string;
    siteIP: string;
    cafNo: string;
    isSafePart: boolean;
    workCellId: number;
    workCell: WorkCell;
    divisionModelNumber: string;
    genWI: string;
    refDoc: string;
    commodityId: number;
    commodity: Commodity;
    drawingNumber: string;
    drawingRevisionNumber: string;
    drawingDescription: string;
    specRevisionNumber: string;
    specDescription: string;
    manufacturePartNumber: string;
    manufacturer: string;
    mediaCode: string;
    maskedMPN: string;
    adminCertificationId: number;
    adminCertifications: AdminCertification[];
    supplierId: number;
    supplier: Supplier;
    supplierContactId: number;
    supplierContact: User;
    jabilOwnerContact: string;
    productLifeCycleStage: ProductLifeCycleStage;
    productLifeCycleStageId: number;
    drawingAttachments: Attachment[] = [];
    uploadSpecAttachments: Attachment[] = [];
    uploadCertificationAttachments: Attachment[] = [];
    stateTypeId: number;
    submittedByUserId: number;
    assignToUserId: number;
    submittedDate: Date;
    submittedBy: User;
    assignTo: User;
    comment: string;
    approveRejectedId: number;
    approveRejectedDate: Date;
    approveRejected: User;
    sapPartInspectionPlanSamplingPlans: SAPSamplingPlanModel[];
    sAPPartInspectionPlanAdminCertifications: PartInspectionAdminCertification[];
    addedAdminCertificateIds: PartInspectionAdminCertification[];
    ismpnMatched: boolean;
    mpnMaterialHERS: string;
    mpnReason: string;
    partMPositionTolerances: MPositionToleranceModel[];
    partLPositionTolerances: LPositionToleranceModel[];
    specNumber: string;
    partMeasurementParameters: MeasurementParameterModel[];
    partMicrosectionParameters: MicroSectionParameterModel[];
    partFunParameters: FunParameterModel[];
    partResultOrientedParameters: ResultOrientedTab[];
    partTestReportParameters: PartTestReportTab[];
    partCountParameters: PartCountParameter[];
    partDateCode: PartDateCode;
    partInspectionDrawings: PartDrawingModel[];
    partInspectionSpecifications: PartSpecModel[];
    partComments: SAPPartInspectionPlanComments[];

    partInspectionBowTwistParameters: PartInspectionBowTwistParameter[];
    specTypeId: number;
    dataTypeId: number;
    ipSerialNumber: number;
    siteIPSerialNumber: number;

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
            this.submittedDate = sAPPartInspectionPlan.submittedDate;
            this.comment = sAPPartInspectionPlan.comment;
            this.approveRejectedId = sAPPartInspectionPlan.approveRejectedId === 0 ? null : sAPPartInspectionPlan.approveRejectedId;
            this.assignToUserId = sAPPartInspectionPlan.assignToUserId === 0 ? null : sAPPartInspectionPlan.assignToUserId;
            this.submittedByUserId = sAPPartInspectionPlan.submittedByUserId === 0 ? null : sAPPartInspectionPlan.submittedByUserId;
            this.approveRejectedDate = sAPPartInspectionPlan.approveRejectedDate;
            this.stateTypeId = sAPPartInspectionPlan.stateTypeId === 0 ? null : sAPPartInspectionPlan.stateTypeId;
            this.sapPartInspectionPlanSamplingPlans = sAPPartInspectionPlan.sapPartInspectionPlanSamplingPlans;
            this.sAPPartInspectionPlanAdminCertifications = sAPPartInspectionPlan.sAPPartInspectionPlanAdminCertifications;
            this.addedAdminCertificateIds = sAPPartInspectionPlan.sAPPartInspectionPlanAdminCertifications;
            this.ismpnMatched = sAPPartInspectionPlan.ismpnMatched;
            this.mpnMaterialHERS = sAPPartInspectionPlan.mpnMaterialHERS;
            this.mpnReason = sAPPartInspectionPlan.mpnReason;
            this.partMPositionTolerances = sAPPartInspectionPlan.partMPositionTolerances;
            this.partLPositionTolerances = sAPPartInspectionPlan.partLPositionTolerances;
            this.partMeasurementParameters = sAPPartInspectionPlan.partMeasurementParameters;
            this.partMicrosectionParameters = sAPPartInspectionPlan.partMicrosectionParameters;
            this.partCountParameters = sAPPartInspectionPlan.partCountParameters;
            this.partFunParameters = sAPPartInspectionPlan.partFunParameters;
            this.partResultOrientedParameters = sAPPartInspectionPlan.partResultOrientedParameters;
            this.partTestReportParameters = sAPPartInspectionPlan.partTestReportParameters;
            this.partInspectionBowTwistParameters = sAPPartInspectionPlan.partInspectionBowTwistParameters;
            this.specTypeId = sAPPartInspectionPlan.specTypeId;
            this.dataTypeId = sAPPartInspectionPlan.dataTypeId;
            this.partInspectionDrawings = sAPPartInspectionPlan.partInspectionDrawings;
            this.partInspectionSpecifications = sAPPartInspectionPlan.partInspectionSpecifications;
            this.ipSerialNumber = sAPPartInspectionPlan.ipSerialNumber;
            this.partComments = sAPPartInspectionPlan.partComments;

        } else {
            this.partNo = Constants.Empty;
            this.partDescription = Constants.Empty;
            this.ip = Constants.Empty;
            this.siteIP = Constants.Empty;
            this.cafNo = Constants.Empty;
            this.isSafePart = false;
            this.workCellId = null;
            this.workCell = null;
            this.divisionModelNumber = Constants.Empty;
            this.genWI = Constants.Empty;
            this.refDoc = Constants.Empty;
            this.commodityId = 0;
            this.commodity = null;
            this.drawingNumber = Constants.Empty;
            this.drawingRevisionNumber = Constants.Empty;
            this.drawingDescription = Constants.Empty;
            this.specRevisionNumber = Constants.Empty;
            this.specDescription = Constants.Empty;
            this.manufacturePartNumber = Constants.Empty;
            this.manufacturer = Constants.Empty;
            this.mediaCode = Constants.Empty;
            this.maskedMPN = Constants.Empty;
            this.adminCertificationId = null;
            this.supplierId = null;
            this.supplier = null;
            this.supplierContactId = null;
            this.supplierContact = null;
            this.jabilOwnerContact = Constants.Empty;
            this.productLifeCycleStageId = null;
            this.productLifeCycleStage = null;
            this.drawingAttachments = [];
            this.adminCertifications = [];
            this.submittedDate = null;
            this.comment = Constants.Empty;
            this.approveRejectedDate = null;
            this.stateTypeId = null;
            this.sAPPartInspectionPlanAdminCertifications = [];
            this.addedAdminCertificateIds = [];
            this.assignToUserId = null;
            this.submittedByUserId = null;
            this.approveRejectedId = null;
            this.ismpnMatched = null;
            this.mpnMaterialHERS = Constants.Empty;
            this.mpnReason = Constants.Empty;
            this.partMPositionTolerances = [];
            this.partLPositionTolerances = [];
            this.specNumber = Constants.Empty;
            this.partMeasurementParameters = [];
            this.partMicrosectionParameters = [];
            this.partFunParameters = [];
            this.partResultOrientedParameters = [];
            this.partTestReportParameters = [];
            this.partInspectionBowTwistParameters = [];
            this.specTypeId = Numbers.Default;
            this.dataTypeId = Numbers.Default;
            this.partCountParameters = [];
            this.partInspectionDrawings = [];
            this.partInspectionSpecifications = [];
            this.ipSerialNumber = Numbers.Default;
            this.siteIPSerialNumber = Numbers.Default;
            this.partComments = null;
        }
    }
}
