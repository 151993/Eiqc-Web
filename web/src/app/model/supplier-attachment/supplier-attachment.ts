/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import {  DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierAttachment extends BaseModel {

    @FormInput()
    supplierForm: SupplierForm;



    @FormInput()



    supplierFormId: number;



    @Trim()
    @FormInput()
    @DisplayColumn('ATType')
    atType: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Path')
    path: string;
    constructor(supplierAttachment?: SupplierAttachment) {
        super(supplierAttachment);

        if (supplierAttachment) {
            this.supplierForm = supplierAttachment.supplierForm;
            this.supplierFormId = supplierAttachment.supplierFormId;
            this.atType = supplierAttachment.atType;
            this.path = supplierAttachment.path;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.atType = Constants.Empty;
            this.path = Constants.Empty;
        }
    }
}
