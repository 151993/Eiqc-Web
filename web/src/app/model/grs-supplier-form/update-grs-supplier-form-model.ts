/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';
import { GRSSupplierForm } from './grs-supplier-form';
import { GRS } from '../grs/grs';
export class UpdateGRSSupplierFormModel extends BaseModel {
    supplierForm: SupplierForm;
    supplierFormId: number;
    gRSNo: string;
    gRS: GRS;
    submitUser: string;
    submitTime: Date;
    status: number;
constructor(gRSSupplierForm?: GRSSupplierForm) {
    super(gRSSupplierForm);
    if (gRSSupplierForm) {
        this.supplierForm = gRSSupplierForm.supplierForm;
        this.supplierFormId = gRSSupplierForm.supplierFormId;
        this.gRSNo = gRSSupplierForm.grsNo;
        this.gRS = gRSSupplierForm.grs;
        this.submitUser = gRSSupplierForm.submitUser;
        this.submitTime = gRSSupplierForm.submitTime;
        this.status = gRSSupplierForm.status;
    } else {
        this.supplierForm = null;
        this.supplierFormId = 0;
        this.gRS = null;
        this.gRSNo = Constants.Empty;
        this.submitUser = Constants.Empty;
        this.submitTime = null;
        this.status = 0;
    }
  }
}
