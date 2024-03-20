/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';


export class SupplierFormFunParaActual extends BaseModel {

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


    constructor(supplierFormFunParaActual?: SupplierFormFunParaActual) {
        super(supplierFormFunParaActual);

        if (supplierFormFunParaActual) {
            this.supplierForm = supplierFormFunParaActual.supplierForm;
            this.supplierFormId = supplierFormFunParaActual.supplierFormId;
            this.parameterName = supplierFormFunParaActual.parameterName;
            this.no = supplierFormFunParaActual.no;
            this.valueActual = supplierFormFunParaActual.valueActual;

        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.no = 0;
            this.valueActual =  0;
            this.parameterName = Constants.Empty;

        }
    }
}
