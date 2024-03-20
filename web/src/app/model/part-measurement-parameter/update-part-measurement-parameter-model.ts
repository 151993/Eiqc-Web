/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
import { PartMeasurementParameter } from './part-measurement-parameter';
export class UpdatePartMeasurementParameterModel extends BaseModel {
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
constructor(partMeasurementParameter?: PartMeasurementParameter) {
    super(partMeasurementParameter);
    if (partMeasurementParameter) {
        this.partNo = partMeasurementParameter.partNo;
        this.parameterName = partMeasurementParameter.parameterName;
        this.iTCode = partMeasurementParameter.itCode;
        this.uOM = partMeasurementParameter.uom;
        this.normalValue = partMeasurementParameter.normalValue;
        this.upperLimit = partMeasurementParameter.upperLimit;
        this.lowerLimit = partMeasurementParameter.lowerLimit;
        this.accuracy = partMeasurementParameter.accuracy;
        this.sampleSize = partMeasurementParameter.sampleSize;
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
