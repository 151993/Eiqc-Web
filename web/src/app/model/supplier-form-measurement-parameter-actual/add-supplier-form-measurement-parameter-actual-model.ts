/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormMeasurementParameterActual } from './supplier-form-measurement-parameter-actual';

export class AddSupplierFormMeasurementParameterActualModel extends BaseModel {
    supplierForm: SupplierForm;
    supplierFormId: number;
    parameterName: string;
    no?: number;
    valueActual?: number;

   constructor(supplierFormMeasurementParameterActual?: SupplierFormMeasurementParameterActual) {
        super(supplierFormMeasurementParameterActual);

        if (supplierFormMeasurementParameterActual) {
            this.supplierForm = supplierFormMeasurementParameterActual.supplierForm;
            this.supplierFormId = supplierFormMeasurementParameterActual.supplierFormId;
            this.parameterName = supplierFormMeasurementParameterActual.parameterName;
            this.no = supplierFormMeasurementParameterActual.no;
            this.valueActual = supplierFormMeasurementParameterActual.valueActual;
        } else {
            this.supplierForm = null;
            this.no = null;
            this.valueActual = null;
        }
    }
}
