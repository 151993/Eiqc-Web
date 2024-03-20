/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormMeasurementParameterActual extends BaseModel {

    @FormInput()
    @Expand()
    supplierForm: SupplierForm;


    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;


    @FormInput()
    no?: number;


    @FormInput()
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
