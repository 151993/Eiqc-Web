/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { FormPartSAPFailedQty } from './form-part-sap-failed-qty';



export class AddFormPartSAPFailedQtyModel extends BaseModel {


    gRSNo: string;


    pCCode: string;


    failedQty: number;


constructor(formPartSAPFailedQty?: FormPartSAPFailedQty) {
    super(formPartSAPFailedQty);

    if (formPartSAPFailedQty) {
        this.gRSNo = formPartSAPFailedQty.grsNo;
        this.pCCode = formPartSAPFailedQty.pcCode;
        this.failedQty = formPartSAPFailedQty.failedQty;

    } else {
        this.gRSNo = Constants.Empty;
        this.pCCode = Constants.Empty;
        this.failedQty = 0;

    }
  }
}

