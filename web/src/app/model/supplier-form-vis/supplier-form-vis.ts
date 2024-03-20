/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormVIS extends BaseModel {

    @FormInput()
    @Expand()
    supplierForm: SupplierForm;


    @FormInput()
    supplierFormId: number;


    @FormInput()
    @DisplayColumn('AcceptanceQTY')
    acceptanceQTY: number ;


    @FormInput()
    @DisplayColumn('TotalFailedQTY')
    totalFailedQTY: number ;

    constructor(supplierFormVIS?: SupplierFormVIS) {
        super(supplierFormVIS);

        if (supplierFormVIS) {
            this.supplierForm = supplierFormVIS.supplierForm;
            this.supplierFormId = supplierFormVIS.supplierFormId;
            this.acceptanceQTY = supplierFormVIS.acceptanceQTY;
            this.totalFailedQTY = supplierFormVIS.totalFailedQTY;
            this.supplierForm = supplierFormVIS.supplierForm;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.acceptanceQTY =  0;
            this.totalFailedQTY = 0;
        }
    }
}
