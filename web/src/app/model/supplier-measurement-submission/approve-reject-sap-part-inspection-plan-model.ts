/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers, PartPlanStateType, purchaseOrderState } from 'src/app/shared/constant/global';
import { Supplier } from '../supplier/supplier';
import { PurchaseOrder } from '../purchase-order/purchase-order';
import { ColumnType } from '../table/table';
import { WorkCell } from '../workcell/work-cell';
import { User } from '../user/user';
import { SMSPOStateType } from '../sms-po-state-type/sms-po-state-type';
import { SAPPartInspectionPlan } from '../sap-part-inspection-plan/sap-part-inspection-plan';
import { SupplierFunctionAttribute } from './supplier-function-attribute/supplier-function-attribute';
import { SupplierMicroSectionParameterModel } from './supplier-micro-section-parameter/supplier-micro-section-parameter-model';
import { SupplierSamplingPlan } from '../supplier-sampling-plan/supplier-sampling-plan';
import { SupplierTestReport } from '../supplier-test-report/supplier-test-report';
import { SupplierDimensionMeasurementModel } from './supplier-dimension-measurement/supplier-dimension-measurement-model';
import { SupplierFunctionVariableModel } from './supplier-function-variable/supplier-function-variable-model';
import { SupplierSapBasedParameter } from './supplier-sap-based-parameter/supplier-sap-based-parameter';
import { SupplierDateCode } from '../supplier-date-code/supplier-date-code';
import { SupplierBowTwist } from './supplier-bow-twist/supplier-bow-twist';
import { SupplierMPosition } from '../supplier-m-position/supplier-m-position';
import { SupplierLPosition } from '../supplier-l-position/supplier-l-position';
import { SupplierVisualInspectionModel } from './supplier-visual-inspection/supplier-visual-inspection';
import { StateType } from '../state-type/commodity-name';
import { SupplierMeasurementSubmission } from './supplier-measurement-submission';
import { Attachment } from '../attachment/attachment';

export class ApproveRejectSupplierMeasurementSubmissionPlanModel extends BaseModel {

    @DisplayColumn('Id', null, false)
    Id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('SMSNo')
    smsNo: string;

    @FormInput()
    smsSerialNumber: number;

    @FormInput()
    workCellId: number;


    @FormInput()
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
    statusTypeId: number;

    @FormInput()
    supplierContactId: number;

    @FormInput()
    @Expand()
    @DisplayColumn('Supplier', { type: ColumnType.Status, mappingField: 'vendorName' })
    supplier: Supplier;

    @FormInput()
    @Expand()
    @DisplayColumn('SupplierContact', { type: ColumnType.Status, mappingField: 'name' })
    supplierContact: User;

    @FormInput()
    @Expand()
    @DisplayColumn('WorkCell', { type: ColumnType.Status, mappingField: 'name' })
    workCell: WorkCell;

    @FormInput()
    @Expand()
    @DisplayColumn('PurchaseOrder', { type: ColumnType.Status, mappingField: 'purchaseOrderNo' })
    purchaseOrder: PurchaseOrder;


    @FormInput()
    @DisplayColumn('POQuantity')
    quantity: number;

    @Trim()
    @FormInput()
    @DisplayColumn('BatchNo')
    batchNo: string;


    @FormInput()
    @DisplayColumn('BatchQuantity')
    batchQuantity: number;

    @FormInput()
    @DisplayColumn('Inspector', { type: ColumnType.Status, mappingField: 'name' })
    @Expand()
    inspector: User;

    @Trim()
    @FormInput()
    @DisplayColumn('PartNo')
    partNo: string;

    @DisplayColumn('ManufacturePartNumber')
    @FormInput()
    manufacturePartNumber: string;

    @DisplayColumn('SMSStatus', { type: ColumnType.Status, mappingField: 'name' })
    @Expand()
    smspoStateType: SMSPOStateType;

    @FormInput()
    supplierId: number;

    @Trim()
    @FormInput()
    ip: string;

    @FormInput()
    purchaseOrderId: number;

    smspoStateTypeId: number;
    purchaseOrderState: any;
    addedSMSManufacturePartNumberIds: number[];
    removedSMSManufacturePartNumberIds: number[];
    inspectorId: number;
    sapPartInspectionPlanId: number;
    sapPartInspectionPlan: SAPPartInspectionPlan;
    supplierFunctionAttributes: SupplierFunctionAttribute[];
    supplierMicroSectionParameters: SupplierMicroSectionParameterModel[];
    supplierDimensionMeasurements: SupplierDimensionMeasurementModel[];
    supplierFunctionVariables: SupplierFunctionVariableModel[];
    supplierVisualInspections: SupplierVisualInspectionModel[];
    supplierSamplingPlans: SupplierSamplingPlan[];
    supplierSapBasedParameters: SupplierSapBasedParameter[];
    @FormInput()
    resultDescription: string;
    @FormInput()
    packagingQuantity: number;
    @FormInput()
    resultId: number;
    supplierTestReports: SupplierTestReport[];
    supplierDateCode: SupplierDateCode;
    supplierDateCodeId: number;
    @FormInput()
    supplierBowTwists: SupplierBowTwist[];
    supplierMPositions: SupplierMPosition[];
    supplierLPositions: SupplierLPosition[];

    stateTypeId: number;

    @FormInput()
    submittedByUserId: number;

    submittedDate: Date;

    @Expand()
    @FormInput()
    submittedBy: User;

    @FormInput()
    approveRejectedId: number;

    @FormInput()
    approveRejectedDate: Date;

    approveRejected: User;

    @DisplayColumn('State', { type: ColumnType.Status, mappingField: 'description' })
    @Expand()
    stateType: StateType;

    comments: string;

    uploadSMSCommentAttachments: Attachment[] = [];

    constructor(supplierMeasurementSubmission?: SupplierMeasurementSubmission) {
        super(supplierMeasurementSubmission);
        this.purchaseOrderState = purchaseOrderState;
        if (supplierMeasurementSubmission) {
            this.manufacturer = supplierMeasurementSubmission.manufacturer;
            this.mediaCode = supplierMeasurementSubmission.mediaCode;
            this.maskedMPN = supplierMeasurementSubmission.maskedMPN;
            this.statusTypeId = supplierMeasurementSubmission.statusTypeId;
            this.workCell = supplierMeasurementSubmission.workCell;
            this.workCellId = supplierMeasurementSubmission.workCellId;
            this.supplierContactId = supplierMeasurementSubmission.supplierContactId;
            this.supplierContact = supplierMeasurementSubmission.supplierContact;
            this.supplier = supplierMeasurementSubmission.supplier;
            this.supplierId = supplierMeasurementSubmission.supplierId;
            this.purchaseOrder = supplierMeasurementSubmission.purchaseOrder;
            this.ip = supplierMeasurementSubmission.ip;
            this.purchaseOrderId = supplierMeasurementSubmission.purchaseOrderId;
            this.quantity = supplierMeasurementSubmission.quantity;
            this.batchNo = supplierMeasurementSubmission.batchNo;
            this.batchQuantity = supplierMeasurementSubmission.batchQuantity;
            this.inspectorId = supplierMeasurementSubmission.inspectorId;
            this.smspoStateTypeId = supplierMeasurementSubmission.smspoStateTypeId;
            this.smspoStateType = supplierMeasurementSubmission.smspoStateType;
            this.partNo = supplierMeasurementSubmission.partNo;
            this.manufacturePartNumber = supplierMeasurementSubmission.manufacturePartNumber;
            this.sapPartInspectionPlanId = supplierMeasurementSubmission.sapPartInspectionPlanId;
            this.sapPartInspectionPlan = supplierMeasurementSubmission.sapPartInspectionPlan;
            this.supplierFunctionAttributes = supplierMeasurementSubmission.supplierFunctionAttributes;
            this.supplierVisualInspections = supplierMeasurementSubmission.supplierVisualInspections;
            this.supplierMicroSectionParameters = supplierMeasurementSubmission.supplierMicroSectionParameters;
            this.supplierDimensionMeasurements = supplierMeasurementSubmission.supplierDimensionMeasurements;
            this.supplierFunctionVariables = supplierMeasurementSubmission.supplierFunctionVariables;
            this.supplierSamplingPlans = supplierMeasurementSubmission.supplierSamplingPlans;
            this.supplierSapBasedParameters = supplierMeasurementSubmission.supplierSapBasedParameters;
            this.resultDescription = supplierMeasurementSubmission.resultDescription;
            this.packagingQuantity = supplierMeasurementSubmission.packagingQuantity;
            this.resultId = supplierMeasurementSubmission.resultId;
            this.supplierTestReports = supplierMeasurementSubmission.supplierTestReports;
            this.supplierDateCode = supplierMeasurementSubmission.supplierDateCode;
            this.supplierDateCodeId = supplierMeasurementSubmission.supplierDateCodeId;
            this.supplierBowTwists = supplierMeasurementSubmission.supplierBowTwists;
            this.supplierMPositions = supplierMeasurementSubmission.supplierMPositions;
            this.supplierLPositions = supplierMeasurementSubmission.supplierLPositions;
            this.smsNo = supplierMeasurementSubmission.smsNo;
            this.smsSerialNumber = supplierMeasurementSubmission.smsSerialNumber;

            this.submittedBy = supplierMeasurementSubmission.submittedBy;
            this.submittedByUserId = supplierMeasurementSubmission.submittedByUserId;
            this.submittedDate = supplierMeasurementSubmission.submittedDate;
            this.approveRejected = supplierMeasurementSubmission.approveRejected;
            this.approveRejectedId = supplierMeasurementSubmission.approveRejectedId;
            this.approveRejectedDate = supplierMeasurementSubmission.approveRejectedDate;
            this.stateTypeId = supplierMeasurementSubmission.stateTypeId;
            // Set table row options
            this.enableRowEdit = (supplierMeasurementSubmission.stateTypeId === PartPlanStateType.Draft ||
                supplierMeasurementSubmission.stateTypeId === PartPlanStateType.Rejected_By_SQE);
            this.enableRowView = !this.enableRowEdit;
            this.enableRowDelete = (supplierMeasurementSubmission.stateTypeId === PartPlanStateType.Draft ||
                supplierMeasurementSubmission.stateTypeId === PartPlanStateType.Rejected_By_SQE);
            this.comments = supplierMeasurementSubmission.comments;
        } else {
            this.manufacturer = Constants.Empty;
            this.mediaCode = Constants.Empty;
            this.maskedMPN = Constants.Empty;
            this.statusTypeId = Numbers.Default;
            this.workCell = null;
            this.workCellId = Numbers.Default;
            this.quantity = Numbers.Default;
            this.supplierContactId = Numbers.Default;
            this.supplierContact = null;
            this.supplier = null;
            this.supplierId = Numbers.Default;
            this.purchaseOrder = null;
            this.ip = Constants.Empty;
            this.purchaseOrderId = Numbers.Default;
            this.batchNo = Constants.Empty;
            this.batchQuantity = Numbers.Default;
            this.inspectorId = Numbers.Default;
            this.smspoStateTypeId = Numbers.Default;
            this.partNo = Constants.Empty;
            this.manufacturePartNumber = Constants.Empty;
            this.sapPartInspectionPlanId = Numbers.Default;
            this.sapPartInspectionPlan = null;
            this.supplierFunctionAttributes = [];
            this.supplierVisualInspections = [];
            this.supplierMicroSectionParameters = [];
            this.supplierDimensionMeasurements = [];
            this.supplierFunctionVariables = [];
            this.supplierSamplingPlans = [];
            this.supplierSapBasedParameters = [];
            this.resultDescription = Constants.Empty;
            this.packagingQuantity = Numbers.Default;
            this.resultId = Numbers.Default;
            this.supplierDateCode = null;
            this.supplierTestReports = [];
            this.supplierDateCodeId = Numbers.Default;
            this.supplierBowTwists = [];
            this.supplierMPositions = [];
            this.supplierLPositions = [];
            this.smsNo = Constants.Empty;
            this.smsSerialNumber = Numbers.Default;

            this.submittedBy = null;
            this.submittedByUserId = null;
            this.submittedDate = null;
            this.approveRejected = null;
            this.approveRejectedId = null;
            this.approveRejectedDate = null;
            this.stateTypeId = null;
            this.comments = Constants.Empty;
        }
    }
}
