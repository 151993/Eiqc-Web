/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import {  DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class SupplierForm extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('PONo')
    poNo: string;

    @Trim()
    @FormInput()
    @DisplayColumn('PartNo')
    partNo: string;


    @FormInput()
    createTime?: Date;

    @Trim()
    @FormInput()
    fileName: string;

    @Trim()
    @FormInput()
    dateCode?: string;


    @FormInput()
    dateCodeActual?: boolean;


    @FormInput()
    approveTime?: Date;

    @Trim()
    @FormInput()
    approveUser: string;


    @FormInput()
    totalQty: number;


    @FormInput()
    sampleQty: number;

    @Trim()
    @FormInput()
    inspector: string;

    @Trim()
    @FormInput()
    verify: string;


    @FormInput()
    importStatus: string;

    @Trim()
    @FormInput()
    importError: string;

    @Trim()
    @FormInput()
    @DisplayColumn('MO')
    mo: string;

    @Trim()
    @FormInput()
    movedPath: string;

    constructor(supplierForm?: SupplierForm) {
        super(supplierForm);

        if (supplierForm) {
            this.poNo = supplierForm.poNo;
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
            this.mo = supplierForm.mo;
            this.movedPath = supplierForm.movedPath;
        } else {
            this.poNo = Constants.Empty;
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
            this.mo = Constants.Empty;
            this.movedPath = Constants.Empty;
            this.partNo = null;
            this.createTime = null;
            this.dateCode = null;
            this.dateCodeActual = null;
            this.approveTime = null;
        }
    }
}
