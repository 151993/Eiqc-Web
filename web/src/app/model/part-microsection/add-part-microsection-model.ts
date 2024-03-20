/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Part } from '../part/part';
import { PartMicrosection } from './part-microsection';
export class AddPartMicrosectionModel extends BaseModel {
    part: Part;
    partNo: string;
    parameterName: string;
    iTCode: string;
    uOM: string;
    accuracy: number;
    sampleSize: string;
    normalValue: number;
    upperLimit: number;
    lowerLimit: number;
    constructor(partMicrosection?: PartMicrosection) {
        super(partMicrosection);
        if (partMicrosection) {
            this.partNo = partMicrosection.partNo;
            this.partNo = partMicrosection.partNo;
            this.partNo = partMicrosection.partNo;
            this.partNo = partMicrosection.partNo;
            this.parameterName = partMicrosection.parameterName;
            this.iTCode = partMicrosection.itCode;
            this.uOM = partMicrosection.uom;
            this.normalValue = partMicrosection.normalValue;
            this.upperLimit = partMicrosection.upperLimit;
            this.lowerLimit = partMicrosection.lowerLimit;
            this.accuracy = partMicrosection.accuracy;
            this.sampleSize = partMicrosection.sampleSize;
        } else {
            this.part = null;
            this.partNo = Constants.Empty;
            this.parameterName = Constants.Empty;
            this.iTCode = Constants.Empty;
            this.uOM = Constants.Empty;
            this.normalValue = 0;
            this.upperLimit = 0;
            this.lowerLimit = 0;
            this.accuracy = 0;
            this.sampleSize = Constants.Empty;
        }
    }
}
