/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { PartFunParameter } from './part-fun-parameter';
import { Part } from '../part/part';
export class UpdatePartFunParameterModel extends BaseModel {
    part: Part;
    partNo: string;
    requirement: string;
    supplierDC: string;
    mFGDate: string;
    result: string;
    constructor(partFunParameter?: PartFunParameter) {
        super(partFunParameter);
        if (partFunParameter) {
            this.partNo = partFunParameter.partNo;
            this.requirement = partFunParameter.requirement;
            this.supplierDC = partFunParameter.supplierDC;
            this.mFGDate = partFunParameter.mfgDate;
            this.result = partFunParameter.result;
        } else {
            this.part = null;
            this.partNo = Constants.Empty;
            this.requirement = Constants.Empty;
            this.supplierDC = Constants.Empty;
            this.mFGDate = Constants.Empty;
            this.result = Constants.Empty;
        }
    }
}
