/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';

import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormMicroSectionActual } from './supplier-form-micro-section-actual';

export class AddSupplierFormMicroSectionActualModel extends BaseModel {
    supplierForm: SupplierForm;
    supplierFormId: number;
    parameterName: string;
    no: number;
    valueActual: number;

    constructor(supplierFormMicroSectionActual?: SupplierFormMicroSectionActual) {
        super(supplierFormMicroSectionActual);

        if (supplierFormMicroSectionActual) {
            this.supplierForm = supplierFormMicroSectionActual.supplierForm;
            this.supplierFormId = supplierFormMicroSectionActual.supplierFormId;
            this.parameterName = supplierFormMicroSectionActual.parameterName;
            this.no = supplierFormMicroSectionActual.no;
            this.valueActual = supplierFormMicroSectionActual.valueActual;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.parameterName  = Constants.Empty;
            this.no             = 0;
            this.valueActual    = 0;
        }
    }
}
