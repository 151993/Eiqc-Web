/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { SupplierForm } from './supplier-form';


export class AddSupplierFormModel extends BaseModel {
    pONo: string;
    partNo: string;
    createTime?: Date;
    fileName: string;
    dateCode?: string;
    dateCodeActual?: boolean;
    approveTime?: Date;
    approveUser: string;
    totalQty: number;
    sampleQty: number;
    inspector: string;
    verify: string;
    importStatus: string;
    importError: string;
    mO: string;
    movedPath: string;

    constructor(supplierForm?: SupplierForm) {
        super(supplierForm);

        if (supplierForm) {
            this.pONo = supplierForm.poNo;
            this.partNo = supplierForm.partNo;
            this.createTime = supplierForm.createTime;
            this.fileName = supplierForm.fileName;
            this.dateCode = supplierForm.dateCode;
            this.dateCodeActual = supplierForm.dateCodeActual;
            this.approveTime = supplierForm.approveTime;
            this.approveUser = supplierForm.approveUser;
            this.totalQty = supplierForm.totalQty;
            this.sampleQty = supplierForm.sampleQty;
            this.inspector = supplierForm.inspector;
            this.verify = supplierForm.verify;
            this.importStatus = supplierForm.importStatus;
            this.importError = supplierForm.importError;
            this.mO = supplierForm.mo;
            this.movedPath = supplierForm.movedPath;
        } else {
            this.pONo = Constants.Empty;
            this.partNo = Constants.Empty;
            this.createTime = null;
            this.fileName = Constants.Empty;
            this.dateCode = Constants.Empty;
            this.dateCodeActual = null;
            this.approveTime = null;
            this.approveUser = Constants.Empty;
            this.totalQty = 0;
            this.sampleQty = 0;
            this.inspector = Constants.Empty;
            this.verify = Constants.Empty;
            this.importStatus = Constants.Empty;
            this.importError = Constants.Empty;
            this.mO = Constants.Empty;
            this.movedPath = Constants.Empty;
            this.partNo = null;
            this.createTime = null;
            this.dateCode = null;
            this.dateCodeActual = null;
            this.approveTime = null;
        }
    }
}
