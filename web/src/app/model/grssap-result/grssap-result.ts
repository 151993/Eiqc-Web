/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import {  DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class GRSSAPResult extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('GRSNO')
    gRSNO: string;

    @Trim()
    @FormInput()
    @DisplayColumn('ISOK')
    iSOK: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Error')
    error: string;

    @Trim()
    @FormInput()
    @DisplayColumn('NTID')
    nTID: string;

    @Trim()
    @FormInput()
    @DisplayColumn('PayLoad')
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
