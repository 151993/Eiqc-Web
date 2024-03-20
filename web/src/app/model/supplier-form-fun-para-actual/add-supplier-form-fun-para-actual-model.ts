/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';

import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormFunParaActual } from './supplier-form-fun-para-actual';


export class AddSupplierFormFunParaActualModel extends BaseModel {
    supplierForm: SupplierForm;


    supplierFormId: number;

    parameterName: string;


    no: number;


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
