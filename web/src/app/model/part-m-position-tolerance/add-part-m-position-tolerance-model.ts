/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Part } from '../part/part';
import { PartMPositionTolerance } from './part-m-position-tolerance';
export class AddPartMPositionToleranceModel extends BaseModel {
    part: Part;
    partNo: string;
    lineNo: string;
    iTCode: string;
    uOM: string;
    accuracy: number;
    sampleSize: string;
    iTCode1: string;
    iTCode2: string;
    iTCode3: string;
    positionType: number;
    spec: number;
    upperLimit: number;
    lowerLimit: number;
    upperLimit1: number;
    lowerLimit1: number;
    upperLimit2: number;
    lowerLimit2: number;
    upperLimit3: number;
    lowerLimit3: number;
    constructor(partLPositionTolerance?: PartMPositionTolerance) {
        super(partLPositionTolerance);
        if (partLPositionTolerance) {
            this.partNo = partLPositionTolerance.partNo;
            this.partNo = partLPositionTolerance.partNo;
            this.partNo = partLPositionTolerance.partNo;
            this.partNo = partLPositionTolerance.partNo;
            this.lineNo = partLPositionTolerance.lineNo;
            this.iTCode = partLPositionTolerance.itCode;
            this.accuracy = partLPositionTolerance.accuracy;
            this.sampleSize = partLPositionTolerance.sampleSize;
            this.iTCode1 = partLPositionTolerance.itCode1;
            this.uOM = partLPositionTolerance.uom;
            this.iTCode2 = partLPositionTolerance.itCode2;
            this.spec = partLPositionTolerance.spec;
            this.upperLimit = partLPositionTolerance.upperLimit;
            this.lowerLimit = partLPositionTolerance.lowerLimit;
            this.upperLimit1 = partLPositionTolerance.upperLimit1;
            this.lowerLimit1 = partLPositionTolerance.lowerLimit1;
            this.upperLimit2 = partLPositionTolerance.upperLimit2;
            this.lowerLimit2 = partLPositionTolerance.lowerLimit2;
            this.upperLimit3 = partLPositionTolerance.upperLimit3;
            this.lowerLimit3 = partLPositionTolerance.lowerLimit3;
            this.iTCode3 = partLPositionTolerance.itCode3;
            this.positionType = partLPositionTolerance.positionType;
        } else {
            this.part = null;
            this.partNo = Constants.Empty;
            this.iTCode = Constants.Empty;
            this.uOM = Constants.Empty;
            this.spec = 0;
            this.upperLimit = 0;
            this.lowerLimit = 0;
            this.accuracy = 0;
            this.sampleSize = Constants.Empty;
            this.upperLimit1 = 0;
            this.lowerLimit1 = 0;
            this.iTCode1 = Constants.Empty;
            this.upperLimit2 = 0;
            this.lowerLimit2 = 0;
            this.iTCode2 = Constants.Empty;
            this.upperLimit3 = 0;
            this.lowerLimit3 = 0;
            this.iTCode3 = Constants.Empty;
            this.positionType = 0;
        }
    }
}
