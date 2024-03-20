/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class CompletedGRS extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('PartNo')
    partNo: string;

    @Trim()
    @FormInput()
    @DisplayColumn('UDCode')
    udCode: string;

    @Trim()
    @FormInput()
    @DisplayColumn('GRSNo')
    grsNo: string;

    constructor(completedGRS?: CompletedGRS) {
        super(completedGRS);

        if (completedGRS) {
            this.partNo = completedGRS.partNo;
            this.udCode = completedGRS.udCode;
            this.grsNo = completedGRS.grsNo;
        } else {
            this.partNo = Constants.Empty;
            this.udCode = Constants.Empty;
            this.grsNo = Constants.Empty;
        }
    }
}
