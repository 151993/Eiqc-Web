/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { CompletedGRS } from './completed-grs';

export class UpdateCompletedGRSModel extends BaseModel {


    partNo: string;


    uDCode: string;


    gRSNo: string;

    constructor(completedGRS?: CompletedGRS) {
        super(completedGRS);

        if (completedGRS) {
            this.partNo = completedGRS.partNo;
            this.uDCode = completedGRS.udCode;
            this.gRSNo = completedGRS.grsNo;
       } else {
            this.partNo = Constants.Empty;
            this.uDCode = Constants.Empty;
            this.gRSNo = Constants.Empty;
        }
    }
}
