/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers, purchaseOrderState } from 'src/app/shared/constant/global';
import { Supplier } from '../supplier/supplier';
import { PurchaseOrder } from '../purchase-order/purchase-order';
import { ColumnType } from '../table/table';
import { WorkCell } from '../workcell/work-cell';
import { User } from '../user/user';
import { StateType } from '../state-type/commodity-name';

export class SMSMyTasks extends BaseModel {


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

    // @DisplayColumn('SMSStatus', { type: ColumnType.Status, mappingField: 'name' })
    // @Expand()
    // smspoStateType: SMSPOStateType;

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
    // sapPartInspectionPlan: SAPPartInspectionPlan;
    // supplierFunctionAttributes: SupplierFunctionAttribute[];
    // supplierMicroSectionParameters: SupplierMicroSectionParameterModel[];
    // supplierDimensionMeasurements: SupplierDimensionMeasurementModel[];
    // supplierFunctionVariables: SupplierFunctionVariableModel[];
    // supplierVisualInspections: SupplierVisualInspectionModel[];
    // supplierSamplingPlans: SupplierSamplingPlan[];
    // supplierSapBasedParameters: SupplierSapBasedParameter[];
    // @FormInput()
    // resultDescription: string;
    // @FormInput()
    // packagingQuantity: number;
    // @FormInput()
    // resultId: number;
    // supplierTestReports: SupplierTestReport[];
    // supplierDateCode: SupplierDateCode;
    // supplierDateCodeId: number;
    // @FormInput()
    // supplierBowTwists: SupplierBowTwist[];
    // supplierMPositions: SupplierMPosition[];
    // supplierLPositions: SupplierLPosition[];

    stateTypeId: number;

    @DisplayColumn('State', { type: ColumnType.Status, mappingField: 'description' })
    @Expand()
    stateType: StateType;


    @ExpandSelect({ select: ['Name', 'IsEnabled'] })
    @DisplayColumn('CreatedByUser', { type: ColumnType.Status, mappingField: 'name' })
    createdByUser: User;

    @DisplayColumn('CreatedDate', { type: ColumnType.Date }, true, true)
    created: Date;


    constructor(supplierMeasurementSubmission?: SMSMyTasks) {
        super(supplierMeasurementSubmission);
        this.purchaseOrderState = purchaseOrderState;
        if (supplierMeasurementSubmission) {
            this.manufacturer = supplierMeasurementSubmission.manufacturer;
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
            this.partNo = supplierMeasurementSubmission.partNo;
            this.manufacturePartNumber = supplierMeasurementSubmission.manufacturePartNumber;
            this.sapPartInspectionPlanId = supplierMeasurementSubmission.sapPartInspectionPlanId;
            // this.smspoStateType = supplierMeasurementSubmission.smspoStateType;
            // this.sapPartInspectionPlan = supplierMeasurementSubmission.sapPartInspectionPlan;
            // this.supplierFunctionAttributes = supplierMeasurementSubmission.supplierFunctionAttributes;
            // this.supplierVisualInspections = supplierMeasurementSubmission.supplierVisualInspections;
            // this.supplierMicroSectionParameters = supplierMeasurementSubmission.supplierMicroSectionParameters;
            // this.supplierDimensionMeasurements = supplierMeasurementSubmission.supplierDimensionMeasurements;
            // this.supplierFunctionVariables = supplierMeasurementSubmission.supplierFunctionVariables;
            // this.supplierSamplingPlans = supplierMeasurementSubmission.supplierSamplingPlans;
            // this.supplierSapBasedParameters = supplierMeasurementSubmission.supplierSapBasedParameters;
            // this.resultDescription = supplierMeasurementSubmission.resultDescription;
            // this.packagingQuantity = supplierMeasurementSubmission.packagingQuantity;
            // this.resultId = supplierMeasurementSubmission.resultId;
            // this.supplierTestReports = supplierMeasurementSubmission.supplierTestReports;
            // this.supplierDateCode = supplierMeasurementSubmission.supplierDateCode;
            // this.supplierDateCodeId = supplierMeasurementSubmission.supplierDateCodeId;
            // this.supplierBowTwists = supplierMeasurementSubmission.supplierBowTwists;
            // this.supplierMPositions = supplierMeasurementSubmission.supplierMPositions;
            // this.supplierLPositions = supplierMeasurementSubmission.supplierLPositions;
            this.smsNo = supplierMeasurementSubmission.smsNo;
            this.smsSerialNumber = supplierMeasurementSubmission.smsSerialNumber;
            this.createdByUser = supplierMeasurementSubmission.createdByUser;
        } else {
            this.manufacturer = Constants.Empty;
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
            // this.sapPartInspectionPlan = null;
            // this.supplierFunctionAttributes = [];
            // this.supplierVisualInspections = [];
            // this.supplierMicroSectionParameters = [];
            // this.supplierDimensionMeasurements = [];
            // this.supplierFunctionVariables = [];
            // this.supplierSamplingPlans = [];
            // this.supplierSapBasedParameters = [];
            // this.resultDescription = Constants.Empty;
            // this.packagingQuantity = Numbers.Default;
            // this.resultId = Numbers.Default;
            // this.supplierDateCode = null;
            // this.supplierTestReports = [];
            // this.supplierDateCodeId = Numbers.Default;
            // this.supplierBowTwists = [];
            // this.supplierMPositions = [];
            // this.supplierLPositions = [];
            this.smsNo = Constants.Empty;
            this.smsSerialNumber = Numbers.Default;
            this.stateTypeId = null;
        }
    }
}
