/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';
import { GRS } from '../grs/grs';
export class GRSSupplierForm extends BaseModel {
    @FormInput()
    @Expand()
    supplierForm: SupplierForm;
    @FormInput()
    supplierFormId: number;
    @FormInput()
    @Expand()
    grs: GRS;
    @FormInput()
    grsNo: string;
    @FormInput()
    @DisplayColumn('SubmitUser')
    submitUser: string;
    @FormInput()
    submitTime: Date;
    @FormInput()
    status: number;
    constructor(gRSSupplierForm?: GRSSupplierForm) {
        super(gRSSupplierForm);
        if (gRSSupplierForm) {
            this.supplierForm = gRSSupplierForm.supplierForm;
            this.supplierFormId = gRSSupplierForm.supplierFormId;
            this.grs = gRSSupplierForm.grs;
            this.grsNo = gRSSupplierForm.grsNo;
            this.submitUser = gRSSupplierForm.submitUser;
            this.submitTime = gRSSupplierForm.submitTime;
            this.status = gRSSupplierForm.status;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.grs = null;
            this.grsNo = Constants.Empty;
            this.submitUser = Constants.Empty;
            this.status = 0;
        }
    }
}
