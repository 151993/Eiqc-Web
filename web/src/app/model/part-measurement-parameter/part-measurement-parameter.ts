/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
export class PartMeasurementParameter extends BaseModel {
    @FormInput()
    @Expand()
    part: Part;
    @Trim()
    @FormInput()
    partNo: string;

    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @Trim()
    @FormInput()
    @DisplayColumn('itCode')
    itCode: string;
    @Trim()
    @FormInput()
    @DisplayColumn('uom')
    uom: string;
    @FormInput()
    @DisplayColumn('NormalValue')
    normalValue: number;
    @FormInput()
    @DisplayColumn('UpperLimit')
    upperLimit: number;

    @FormInput()
    @DisplayColumn('LowerLimit')
    lowerLimit: number;

    @FormInput()
    @DisplayColumn('Accuracy')
    accuracy: number;
    @Trim()
    @FormInput()
    @DisplayColumn('SampleSize')
    sampleSize: string;
    constructor(partMeasurementParameter?: PartMeasurementParameter) {
        super(partMeasurementParameter);
        if (partMeasurementParameter) {
            this.part = partMeasurementParameter.part;
            this.partNo = partMeasurementParameter.partNo;
            this.parameterName = partMeasurementParameter.parameterName;
            this.itCode = partMeasurementParameter.itCode;
            this.uom = partMeasurementParameter.uom;
            this.normalValue = partMeasurementParameter.normalValue;
            this.upperLimit = partMeasurementParameter.upperLimit;
            this.lowerLimit = partMeasurementParameter.lowerLimit;
            this.accuracy = partMeasurementParameter.accuracy;
            this.sampleSize = partMeasurementParameter.sampleSize;
        } else {
            this.part = null;
            this.partNo = Constants.Empty;
            this.parameterName = Constants.Empty;
            this.itCode = Constants.Empty;
            this.uom = Constants.Empty;
            this.normalValue = 0;
            this.upperLimit = 0;
            this.lowerLimit = 0;
            this.accuracy = 0;
            this.sampleSize = Constants.Empty;
        }
    }
}
