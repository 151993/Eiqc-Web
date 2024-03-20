/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
export class PartMPositionTolerance extends BaseModel {
    @FormInput()
    @Expand()
    part: Part;
    @Trim()
    @FormInput()
    partNo: string;
    @FormInput()
    @Trim()
    @FormInput()
    @DisplayColumn('LineNo')
    lineNo: string;
    @Trim()
    @FormInput()
    @DisplayColumn('itCode')
    itCode: string;
    @Trim()
    @FormInput()
    uom: string;

    accuracy: number;

    sampleSize: string;


    itCode1: string;

    itCode2: string;
    itCode3: string;

    positionType: number;
    @FormInput()
    spec: number;

    @FormInput()
    upperLimit: number;

    @FormInput()
    lowerLimit: number;


    @FormInput()
    upperLimit1: number;

    @FormInput()
    upperLimit2: number;

    @FormInput()
    lowerLimit2: number;
    @FormInput()
    upperLimit3: number;

    @FormInput()
    lowerLimit3: number;

    @FormInput()
    lowerLimit1: number;
    constructor(partMPositionTolerance?: PartMPositionTolerance) {
        super(partMPositionTolerance);
        if (partMPositionTolerance) {
            this.part = partMPositionTolerance.part;
            this.partNo = partMPositionTolerance.partNo;
            this.lineNo = partMPositionTolerance.lineNo;
            this.itCode = partMPositionTolerance.itCode;
            this.uom = partMPositionTolerance.uom;
            this.spec = partMPositionTolerance.spec;
            this.upperLimit = partMPositionTolerance.upperLimit;
            this.lowerLimit = partMPositionTolerance.lowerLimit;
            this.accuracy = partMPositionTolerance.accuracy;
            this.sampleSize = partMPositionTolerance.sampleSize;
            this.upperLimit1 = partMPositionTolerance.upperLimit1;
            this.lowerLimit1 = partMPositionTolerance.lowerLimit1;
            this.itCode1 = partMPositionTolerance.itCode1;
            this.upperLimit2 = partMPositionTolerance.upperLimit2;
            this.lowerLimit2 = partMPositionTolerance.lowerLimit2;
            this.itCode2 = partMPositionTolerance.itCode2;
            this.upperLimit3 = partMPositionTolerance.upperLimit3;
            this.lowerLimit3 = partMPositionTolerance.lowerLimit3;
            this.itCode3 = partMPositionTolerance.itCode3;
            this.positionType = partMPositionTolerance.positionType;
        } else {
            this.part = null;
            this.partNo = Constants.Empty;
            this.lineNo = Constants.Empty;
            this.itCode = Constants.Empty;
            this.uom = Constants.Empty;
            this.spec = 0;
            this.upperLimit = 0;
            this.lowerLimit = 0;
            this.accuracy = 0;
            this.sampleSize = Constants.Empty;
            this.upperLimit1 = 0;
            this.lowerLimit1 = 0;
            this.itCode1 = Constants.Empty;
            this.upperLimit2 = 0;
            this.lowerLimit2 = 0;
            this.itCode2 = Constants.Empty;
            this.upperLimit3 = 0;
            this.lowerLimit3 = 0;
            this.itCode3 = Constants.Empty;
            this.positionType = 0;
        }
    }
}
