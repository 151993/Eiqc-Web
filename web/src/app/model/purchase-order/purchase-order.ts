/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';

export class PurchaseOrder extends BaseModel {

    @DisplayColumn('PurchaseOrderNo', null, true)
    @FormInput()
    purchaseOrderNo: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Site')
    site: string;

    @Trim()
    @FormInput()
    @DisplayColumn('PartNumber')
    partNo: string;

    @DisplayColumn('MPNMaterial')
    @Trim()
    @FormInput()
    mpnMaterial: string;

    @DisplayColumn('CreatedDate')
    @Trim()
    @FormInput()
    createdDate: Date;

    @DisplayColumn('PurchaseOrderLineNo')
    @Trim()
    @FormInput()
    purchaseOrderLineNo: string;

    @DisplayColumn('Quantity', { type : ColumnType.Number})
    @FormInput()
    quantity: number;

    @DisplayColumn('VendorCode')
    @Trim()
    @FormInput()
    vendorCode: string;

    @DisplayColumn('Manufacturer')
    @Trim()
    @FormInput()
    manufacturer: string;

    @DisplayColumn('ManufacturerPartNo')
    @Trim()
    @FormInput()
    manufacturerPartNo: string;

    @DisplayColumn('Status')
    @Trim()
    @FormInput()
    purchaseOrderStatus: string;

    @DisplayColumn('Deleted')
    @Trim()
    @FormInput()
    deleted: string;

    @DisplayColumn('QuantityDelivered', { type : ColumnType.Number})
    @FormInput()
    quantityDelivered: number;

    @DisplayColumn('LastModified')
    @Trim()
    @FormInput()
    lastModifiedDate: Date;

    @DisplayColumn('PurchaseOrg')
    @FormInput()
    purchaseOrg: string;

    @DisplayColumn('PurchaseGroup')
    @FormInput()
    purchaseGroup: string;

    @DisplayColumn('CompanyCode')
    @FormInput()
    companyCode: string;

    @DisplayColumn('DeliveryCompleted')
    @FormInput()
    deliveryComplete: string;


    constructor(purchaseOrder?: PurchaseOrder) {
        super(purchaseOrder);

        if (purchaseOrder) {
             this.purchaseOrderNo = purchaseOrder.purchaseOrderNo;
            this.site = purchaseOrder.site;
            this.partNo = purchaseOrder.partNo;
            this.mpnMaterial = purchaseOrder.mpnMaterial;
            this.createdDate = purchaseOrder.createdDate;
            this.purchaseOrderNo = purchaseOrder.purchaseOrderNo;
            this.purchaseOrderLineNo = purchaseOrder.purchaseOrderLineNo;
            this.quantity = purchaseOrder.quantity;
            this.vendorCode = purchaseOrder.vendorCode;
            this.manufacturer = purchaseOrder.manufacturer;
            this.manufacturerPartNo = purchaseOrder.manufacturerPartNo;
            this.purchaseOrderStatus = purchaseOrder.purchaseOrderStatus;
            this.deleted = purchaseOrder.deleted;
            this.quantityDelivered = purchaseOrder.quantityDelivered;
            this.lastModifiedDate = purchaseOrder.lastModifiedDate;
            this.purchaseOrg = purchaseOrder.purchaseOrg;
            this.purchaseGroup = purchaseOrder.purchaseGroup;
            this.companyCode = purchaseOrder.companyCode;
            this.deliveryComplete = purchaseOrder.deliveryComplete;

        } else {
            this.site = Constants.Empty;
            this.partNo = Constants.Empty;
            this.mpnMaterial = Constants.Empty;
            this.createdDate = null;
            this.purchaseOrderNo = Constants.Empty;
            this.purchaseOrderNo = Constants.Empty;
            this.purchaseOrderLineNo = Constants.Empty;
            this.quantity = Numbers.Default;
            this.vendorCode = Constants.Empty;
            this.manufacturer = Constants.Empty;
            this.manufacturerPartNo = Constants.Empty;
            this.purchaseOrderStatus = Constants.Empty;
            this.deleted = Constants.Empty;
            this.quantityDelivered =  Numbers.Default;
            this.lastModifiedDate = null;
            this.purchaseOrg = Constants.Empty;
            this.purchaseGroup = Constants.Empty;
            this.companyCode = Constants.Empty;
            this.deliveryComplete = Constants.Empty;
        }
    }
}
