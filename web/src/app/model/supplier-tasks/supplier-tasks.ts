/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
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
import { SAPPartInspectionPlanComments } from '../sap-part-inspection-plan-comments/sap-part-inspection-plan-comments';
import { Supplier } from '../supplier/supplier';
export class SupplierTasks extends BaseModel {

    @FormInput()
    @DisplayColumn('PartNo')
    partNo: string;

    @Trim()
    @FormInput()
    partRevisionNumber: string;

    @Trim()
    @FormInput()
    @DisplayColumn('PartDescription')
    partDescription: string;

    @Trim()
    @FormInput()
    @DisplayColumn('IP')
    ip: string;

    @FormInput()
    isSafePart: boolean;

    @FormInput()
    @ExpandSelect({ select: ['Name', 'IsEnabled'] })
    @DisplayColumn('WorkCell', { type: ColumnType.Status, mappingField: 'name' })
    workCell: WorkCell;

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
    @ExpandSelect({ select: ['Name', 'IsEnabled'] })
    @DisplayColumn('Commodity', { type: ColumnType.Status, mappingField: 'name' })
    commodity: Commodity;

    @FormInput()
    commodityId: number;

    @Trim()
    @FormInput()
    drawingNumber: string;

    @Trim()
    @FormInput()
    drawingRevisionNumber: string;

    @Trim()
    @FormInput()
    drawingDescription: string;

    @Trim()
    @FormInput()
    specRevisionNumber: string;

    @Trim()
    @FormInput()
    specDescription: string;

    @FormInput()
    @DisplayColumn('ManufacturePartNumber')
    manufacturePartNumber: string;

    @Trim()
    @FormInput()
    manufacturerRevisionPartNumber: string;

    @FormInput()
    @Expand()
    adminCertifications: AdminCertification;

    @FormInput()
    adminCertificationId: number;

    @FormInput()
    @Expand()
    @DisplayColumn('Supplier', { type: ColumnType.Status, mappingField: 'vendorName' })
    supplier: Supplier;


    @DisplayColumn('State', { type: ColumnType.Status, mappingField: 'description' })
    @Expand()
    stateType: StateType;

    @Trim()
    @FormInput()
    supplierPhoneNumber: string;

    @Trim()
    @FormInput()
    supplierEmail: string;

    @Trim()
    @FormInput()
    jabilOwnerContact: string;

    @Expand()
    productLifeCycleStage: ProductLifeCycleStage;

    @FormInput()
    productLifeCycleStageId: number;

    //  @Expand(['attachment'])
    partInspectionDrawingAttachments: PartInspectionDrawingAttachment[];

    // @Expand(['attachment'])
    partInspectionSpecAttachments: PartInspectionSpecAttachment[];

    dateCode: PartDateCode[];

    @FormInput()
    submittedByUserId: number;

    @FormInput()
    assignToUserId: number;

    @ExpandSelect({ select: ['Name', 'IsEnabled'] })
    @DisplayColumn('SubmittedBy', { type: ColumnType.Status, mappingField: 'name' })
    submittedBy: User;

    @DisplayColumn('CreatedDate', { type: ColumnType.Date })
    submittedDate: Date;

    assignTo: User;

    @Trim()
    @FormInput()
    comment: string;

    @FormInput()
    approveRejectedId: number;

    approveRejectedDate: Date;

    approveRejected: User;

    stateTypeId: number;

    // @Expand()
    sapPartInspectionPlanSamplingPlans: SAPSamplingPlanModel[];

    @ExpandSelect({
        expand: [{
            submittedByUser: {}
        }]
    })
    partComments: SAPPartInspectionPlanComments[];
    enableRowEdit: boolean;


    constructor(supplierTasks?: SupplierTasks) {
        super(supplierTasks);
        if (supplierTasks) {
            this.partNo = supplierTasks.partNo;
            this.partRevisionNumber = supplierTasks.partRevisionNumber;
            this.partDescription = supplierTasks.partDescription;
            this.ip = supplierTasks.ip;
            this.isSafePart = supplierTasks.isSafePart;
            this.workCellId = supplierTasks.workCellId;
            this.workCell = supplierTasks.workCell;
            this.divisionModelNumber = supplierTasks.divisionModelNumber;
            this.genWI = supplierTasks.genWI;
            this.refDoc = supplierTasks.refDoc;
            this.commodityId = supplierTasks.commodityId;
            this.commodity = supplierTasks.commodity;
            this.drawingNumber = supplierTasks.drawingNumber;
            this.drawingRevisionNumber = supplierTasks.drawingRevisionNumber;
            this.drawingDescription = supplierTasks.drawingDescription;
            this.specRevisionNumber = supplierTasks.specRevisionNumber;
            this.specDescription = supplierTasks.specDescription;
            this.manufacturePartNumber = supplierTasks.manufacturePartNumber;
            this.manufacturerRevisionPartNumber = supplierTasks.manufacturerRevisionPartNumber;
            this.adminCertificationId = supplierTasks.adminCertificationId;
            this.adminCertifications = supplierTasks.adminCertifications;
            this.supplier = supplierTasks.supplier;
            this.supplierPhoneNumber = supplierTasks.supplierPhoneNumber;
            this.supplierEmail = supplierTasks.supplierEmail;
            this.jabilOwnerContact = supplierTasks.jabilOwnerContact;
            this.productLifeCycleStageId = supplierTasks.productLifeCycleStageId;
            this.productLifeCycleStage = supplierTasks.productLifeCycleStage;
            this.partInspectionDrawingAttachments = supplierTasks.partInspectionDrawingAttachments;
            this.dateCode = supplierTasks.dateCode;
            this.assignTo = supplierTasks.assignTo;
            this.submittedBy = supplierTasks.submittedBy;
            this.assignToUserId = supplierTasks.assignToUserId;
            this.submittedByUserId = supplierTasks.submittedByUserId;
            this.submittedDate = supplierTasks.submittedDate;
            this.comment = supplierTasks.comment;
            this.approveRejected = supplierTasks.approveRejected;
            this.approveRejectedId = supplierTasks.approveRejectedId;
            this.approveRejectedDate = supplierTasks.approveRejectedDate;
            this.stateTypeId = supplierTasks.stateTypeId;
            this.sapPartInspectionPlanSamplingPlans = supplierTasks.sapPartInspectionPlanSamplingPlans;
            this.partInspectionDrawingAttachments = supplierTasks.partInspectionDrawingAttachments;
            this.partInspectionSpecAttachments = supplierTasks.partInspectionSpecAttachments;
            this.stateType = supplierTasks.stateType;
            this.enableRowEdit =  supplierTasks.enableRowEdit;


        } else {

            this.partNo = Constants.Empty;
            this.partRevisionNumber = Constants.Empty;
            this.partDescription = Constants.Empty;
            this.ip = Constants.Empty;
            this.isSafePart = false;
            this.workCellId = 0;
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
            this.manufacturerRevisionPartNumber = Constants.Empty;
            this.adminCertificationId = 0;
            this.adminCertifications = null;
            this.supplier = null;
            this.supplierPhoneNumber = Constants.Empty;
            this.supplierEmail = Constants.Empty;
            this.jabilOwnerContact = Constants.Empty;
            this.productLifeCycleStageId = 0;
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
            this.stateTypeId = 0;
            this.sapPartInspectionPlanSamplingPlans = null;
            this.partInspectionDrawingAttachments = null;
            this.partInspectionSpecAttachments = null;
            this.stateType = null;
            this.enableRowEdit =  true;
        }
    }
}
