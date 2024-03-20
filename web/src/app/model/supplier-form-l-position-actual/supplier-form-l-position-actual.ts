/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormLPositionActual extends BaseModel {

    @FormInput()
    @Expand()
    supplierForm: SupplierForm;


    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('LineNo')
    lineNo: number;


    @FormInput()
    no: number;


    @FormInput()
    valueActual?: number;


    @FormInput()
    positionCalcul?: number;


    @FormInput()
    positionActual?: number;

    @Trim()
    @FormInput()
    result?: boolean;

    @Trim()
    @FormInput()
    instrumentID: string;

    @FormInput()
    base1Actual: number;


    @FormInput()
    base2Actual?: number;


    @FormInput()
    base3Actual: string;

    @Trim()
    @FormInput()
    instrumentID1: string;

    @Trim()
    @FormInput()
    instrumentID2: string;

    @Trim()
    @FormInput()
    instrumentID3: string;


    @FormInput()
    positionType: string;

    constructor(supplierFormLPositionActual?: SupplierFormLPositionActual) {
        super(supplierFormLPositionActual);

        if (supplierFormLPositionActual) {
            this.supplierForm = supplierFormLPositionActual.supplierForm;
            this.supplierFormId = supplierFormLPositionActual.supplierFormId;
            this.lineNo = supplierFormLPositionActual.lineNo;
            this.no = supplierFormLPositionActual.no;
            this.valueActual = supplierFormLPositionActual.valueActual;
            this.positionCalcul = supplierFormLPositionActual.positionCalcul;
            this.positionActual = supplierFormLPositionActual.positionActual;
            this.result = supplierFormLPositionActual.result;
            this.instrumentID = supplierFormLPositionActual.instrumentID;
            this.instrumentID2 = supplierFormLPositionActual.instrumentID2;
            this.base1Actual = supplierFormLPositionActual.base1Actual;
            this.base2Actual = supplierFormLPositionActual.base2Actual;
            this.base3Actual = supplierFormLPositionActual.base3Actual;
            this.instrumentID = supplierFormLPositionActual.instrumentID1;
            this.instrumentID = supplierFormLPositionActual.instrumentID2;
            this.instrumentID = supplierFormLPositionActual.instrumentID3;
            this.positionType = supplierFormLPositionActual.positionType;
        } else {
            this.supplierForm = null;
            this.valueActual = null;
            this.positionCalcul = null;
            this.positionActual = null;
            this.result = null;
            this.instrumentID = null;
            this.instrumentID2 = null;
            this.base1Actual = null;
            this.base2Actual = null;
            this.base3Actual = null;
            this.instrumentID1 = null;
            this.instrumentID2 = null;
            this.instrumentID3 = null;
            this.positionType = null;
        }
    }
}
