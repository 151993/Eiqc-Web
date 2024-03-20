/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { Supplier } from '../supplier/supplier';
import { PurchaseOrder } from '../purchase-order/purchase-order';
import { WorkCell } from '../workcell/work-cell';
import { SupplierMeasurementSubmission } from './supplier-measurement-submission';
import { SupplierFunctionAttribute } from './supplier-function-attribute/supplier-function-attribute';
import { SupplierMicroSectionParameterModel } from './supplier-micro-section-parameter/supplier-micro-section-parameter-model';
import { SupplierSamplingPlan } from '../supplier-sampling-plan/supplier-sampling-plan';
import { SupplierSapBasedParameter } from './supplier-sap-based-parameter/supplier-sap-based-parameter';
import { SupplierFunctionVariableModel } from './supplier-function-variable/supplier-function-variable-model';
import { SupplierDimensionMeasurementModel } from './supplier-dimension-measurement/supplier-dimension-measurement-model';
import { SupplierTestReport } from '../supplier-test-report/supplier-test-report';
import { SupplierDateCode } from '../supplier-date-code/supplier-date-code';
import { SupplierBowTwist } from './supplier-bow-twist/supplier-bow-twist';
import { SupplierMPosition } from '../supplier-m-position/supplier-m-position';
import { SupplierLPosition } from '../supplier-l-position/supplier-l-position';
import { SupplierVisualInspectionModel } from './supplier-visual-inspection/supplier-visual-inspection';
import { User } from '../user/user';
import { Attachment } from '../attachment/attachment';

export class UpdateSupplierMeasurementSubmissionModel extends BaseModel {


    manufacturer: string;
    mediaCode: string;
    maskedMPN: string;
    statusTypeId: number;
    workCell: WorkCell;
    workCellId: number;
    supplierContactId: number;
    supplier: Supplier;
    supplierId: number;
    purchaseOrder: PurchaseOrder;
    ip: string;
    purchaseOrderId: number;
    batchQuantity: number;
    inspectorId: number;
    partNo: string;
    batchNo: string;
    quantity: number;
    smspoStateTypeId: number;
    addedSMSManufacturePartNumberIds: number[];
    removedSMSManufacturePartNumberIds: number[];
    removedSMSCommentAttachmentIds: number[];
    supplierFunctionAttributes: SupplierFunctionAttribute[];
    supplierVisualInspections: SupplierVisualInspectionModel[];
    sapPartInspectionPlanId: number;
    supplierMicroSectionParameters: SupplierMicroSectionParameterModel[];
    supplierDimensionMeasurements: SupplierDimensionMeasurementModel[];
    supplierFunctionVariables: SupplierFunctionVariableModel[];
    supplierSamplingPlans: SupplierSamplingPlan[];
    supplierSapBasedParameters: SupplierSapBasedParameter[];
    resultDescription: string;
    packagingQuantity: number;
    resultId: number;
    supplierTestReports: SupplierTestReport[];
    supplierDateCode: SupplierDateCode;
    supplierDateCodeId: number;
    supplierBowTwists: SupplierBowTwist[];
    supplierMPositions: SupplierMPosition[];
    manufacturePartNumber: string;
    supplierLPositions: SupplierLPosition[];
    smsNo: string;
    smsSerialNumber: number;
    submittedByUserId: number;
    submittedDate: Date;
    submittedBy: User;
    approveRejectedId: number;
    approveRejectedDate: Date;
    approveRejected: User;
    stateTypeId: number;
    comments: string;

    uploadSMSCommentAttachments: Attachment[] = [];
    sapBasedResultPassFailId: number;

    constructor(supplierMeasurementSubmission?: SupplierMeasurementSubmission) {
        super(supplierMeasurementSubmission);

        if (supplierMeasurementSubmission) {
            this.manufacturer = supplierMeasurementSubmission.manufacturer;
            this.mediaCode = supplierMeasurementSubmission.mediaCode;
            this.maskedMPN = supplierMeasurementSubmission.maskedMPN;
            this.statusTypeId = supplierMeasurementSubmission.statusTypeId;
            this.workCell = supplierMeasurementSubmission.workCell;
            this.workCellId = supplierMeasurementSubmission.workCellId;
            this.supplierContactId = supplierMeasurementSubmission.supplierContactId;
            this.supplier = supplierMeasurementSubmission.supplier;
            this.supplierId = supplierMeasurementSubmission.supplierId;
            this.purchaseOrder = supplierMeasurementSubmission.purchaseOrder;
            this.ip = supplierMeasurementSubmission.ip;
            this.purchaseOrderId = supplierMeasurementSubmission.purchaseOrderId;
            this.batchNo = supplierMeasurementSubmission.batchNo;
            this.batchQuantity = supplierMeasurementSubmission.batchQuantity;
            this.inspectorId = supplierMeasurementSubmission.inspectorId;
            this.smspoStateTypeId = supplierMeasurementSubmission.smspoStateTypeId;
            this.partNo = supplierMeasurementSubmission.partNo;
            this.quantity = supplierMeasurementSubmission.quantity;
            this.addedSMSManufacturePartNumberIds = supplierMeasurementSubmission.addedSMSManufacturePartNumberIds;
            this.removedSMSManufacturePartNumberIds = supplierMeasurementSubmission.removedSMSManufacturePartNumberIds;
            this.supplierFunctionAttributes = supplierMeasurementSubmission.supplierFunctionAttributes;
            this.supplierVisualInspections = supplierMeasurementSubmission.supplierVisualInspections;
            this.sapPartInspectionPlanId = supplierMeasurementSubmission.sapPartInspectionPlanId;
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
            this.manufacturePartNumber = supplierMeasurementSubmission.manufacturePartNumber;
            this.supplierLPositions = supplierMeasurementSubmission.supplierLPositions;
            this.smsNo = supplierMeasurementSubmission.smsNo;
            this.smsSerialNumber = supplierMeasurementSubmission.smsSerialNumber;

            this.submittedBy = supplierMeasurementSubmission.submittedBy;
            this.submittedByUserId = supplierMeasurementSubmission.submittedByUserId === 0 ? null : supplierMeasurementSubmission.submittedByUserId;
            this.submittedDate = supplierMeasurementSubmission.submittedDate;
            this.approveRejected = supplierMeasurementSubmission.approveRejected;
            this.approveRejectedId = supplierMeasurementSubmission.approveRejectedId === 0 ? null : supplierMeasurementSubmission.approveRejectedId;
            this.approveRejectedDate = supplierMeasurementSubmission.approveRejectedDate;
            this.stateTypeId = supplierMeasurementSubmission.stateTypeId;
            this.comments = supplierMeasurementSubmission.comments;
            this.sapBasedResultPassFailId = supplierMeasurementSubmission.sapBasedResultPassFailId;

        } else {
            this.manufacturer = Constants.Empty;
            this.mediaCode = Constants.Empty;
            this.maskedMPN = Constants.Empty;
            this.statusTypeId = Numbers.Default;
            this.workCell = null;
            this.workCellId = Numbers.Default;
            this.supplierContactId = Numbers.Default;
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
            this.quantity = Numbers.Default;
            this.addedSMSManufacturePartNumberIds = [];
            this.removedSMSManufacturePartNumberIds = [];
            this.supplierFunctionAttributes = [];
            this.supplierVisualInspections = [];
            this.sapPartInspectionPlanId = Numbers.Default;
            this.supplierMicroSectionParameters = [];
            this.supplierDimensionMeasurements = [];
            this.supplierFunctionVariables = [];
            this.supplierSamplingPlans = [];
            this.supplierSapBasedParameters = [];
            this.resultDescription = Constants.Empty;
            this.packagingQuantity = Numbers.Default;
            this.resultId = Numbers.Default;
            this.supplierTestReports = [];
            this.supplierDateCode = null;
            this.supplierDateCodeId = Numbers.Default;
            this.supplierBowTwists = [];
            this.supplierMPositions = [];
            this.manufacturePartNumber = Constants.Empty;
            this.supplierLPositions = [];
            this.smsNo = Constants.Empty;
            this.smsSerialNumber = Numbers.Default;

            this.submittedBy = null;
            this.submittedDate = null;
            this.submittedByUserId = null;
            this.approveRejectedId = null;
            this.approveRejected = null;
            this.approveRejectedDate = null;
            this.stateTypeId = null;
            this.comments = Constants.Empty;
            this.sapBasedResultPassFailId = null;


        }
    }
}
