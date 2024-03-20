/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
export class FormPartSAPFailedQty extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('GRSNo')
    grsNo: string;
    @Trim()
    @FormInput()
    @DisplayColumn('PCCode')
    pcCode: string;
    @FormInput()
    @DisplayColumn('FailedQty')
    failedQty: number;
    constructor(formPartSAPFailedQty?: FormPartSAPFailedQty) {
        super(formPartSAPFailedQty);
        if (formPartSAPFailedQty) {
            this.grsNo = formPartSAPFailedQty.grsNo;
            this.pcCode = formPartSAPFailedQty.pcCode;
            this.failedQty = formPartSAPFailedQty.failedQty;
       } else {
            this.grsNo = Constants.Empty;
            this.pcCode = Constants.Empty;
            this.failedQty = 0;
       }
    }
}
