/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormMicroSectionActual extends BaseModel {

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
    @DisplayColumn('No')
    no: number;


    @FormInput()
    @DisplayColumn('ValueActual')
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
