/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierAttachment } from './supplier-attachment';

export class UpdateSupplierAttachmentModel extends BaseModel {

    supplierForm: SupplierForm;


    supplierFormId: number;


    aTType: string;


    path: string;

constructor(supplierAttachment?: SupplierAttachment) {
    super(supplierAttachment);

    if (supplierAttachment) {
        this.supplierForm = supplierAttachment.supplierForm;
        this.supplierFormId = supplierAttachment.supplierFormId;
        this.aTType = supplierAttachment.atType;
        this.path = supplierAttachment.path;
    } else {
        this.supplierForm = null;
        this.supplierFormId = 0;
        this.aTType = Constants.Empty;
        this.path = Constants.Empty;
    }
  }
}
