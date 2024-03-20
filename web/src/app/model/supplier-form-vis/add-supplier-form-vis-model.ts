/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormVIS } from './supplier-form-vis';

export class AddSupplierFormVISModel extends BaseModel {
    supplierForm?: SupplierForm;
    supplierFormId: number;
    acceptanceQTY: number ;
    totalFailedQTY: number ;

    constructor(supplierFormVIS?: SupplierFormVIS) {
        super(supplierFormVIS);

        if (supplierFormVIS) {
            this.supplierForm = supplierFormVIS.supplierForm;
            this.supplierFormId = supplierFormVIS.supplierFormId;
            this.acceptanceQTY = supplierFormVIS.acceptanceQTY;
            this.totalFailedQTY = supplierFormVIS.totalFailedQTY;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.acceptanceQTY =  0;
            this.totalFailedQTY = 0;
        }
    }
}
