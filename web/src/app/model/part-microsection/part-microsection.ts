/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
export class PartMicrosection extends BaseModel {
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

    @FormInput()
    @DisplayColumn('SampleSize')
    sampleSize: string;
    constructor(partMicrosection?: PartMicrosection) {
        super(partMicrosection);
        if (partMicrosection) {
            this.part = partMicrosection.part;
            this.partNo = partMicrosection.partNo;
            this.parameterName = partMicrosection.parameterName;
            this.itCode = partMicrosection.itCode;
            this.uom = partMicrosection.uom;
            this.normalValue = partMicrosection.normalValue;
            this.upperLimit = partMicrosection.upperLimit;
            this.lowerLimit = partMicrosection.lowerLimit;
            this.accuracy = partMicrosection.accuracy;
            this.sampleSize = partMicrosection.sampleSize;
        } else {
            this.partNo = null;
            this.partNo = Constants.Empty;
            this.partNo = null;
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
