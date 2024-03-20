/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { GRSSAPResult } from './grssap-result';


export class AddGRSSAPResultModel extends BaseModel {


    gRSNO: string;


    iSOK: string;


    error: string;


    nTID: string;


    payLoad: string;

    constructor(gRSSAPResult?: GRSSAPResult) {
        super(gRSSAPResult);

        if (gRSSAPResult) {
            this.gRSNO = gRSSAPResult.gRSNO;
            this.iSOK = gRSSAPResult.iSOK;
            this.error = gRSSAPResult.error;
            this.nTID = gRSSAPResult.nTID;
            this.payLoad = gRSSAPResult.payLoad;
        } else {
            this.gRSNO = Constants.Empty;
            this.iSOK = Constants.Empty;
            this.error = Constants.Empty;
            this.nTID = Constants.Empty;
            this.payLoad = Constants.Empty;
        }
    }
}
