/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
export class PartLPositionTolerance extends BaseModel {
    @FormInput()
    @Expand()
    part: Part;
    @FormInput()
    partNo: string;
    @Trim()
    @FormInput()
    @DisplayColumn('LineNo')
    lineNo: string;
    @Trim()
    @FormInput()
    @DisplayColumn('itCode')
    itCode: string;
    @FormInput()
    uom: string;

    @FormInput()
    accuracy: number;
    @Trim()
    @FormInput()
    sampleSize: string;

    @Trim()
    @FormInput()
    itCode3: string;
    @FormInput()
    @DisplayColumn('PositionType')
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
    lowerLimit1: number;
    @Trim()
    @FormInput()
    itCode1: string;
    @FormInput()
    upperLimit2: number;

    @FormInput()
    lowerLimit2: number;

    @Trim()
    @FormInput()
    itCode2: string;
    @FormInput()
    upperLimit3: number;

    @FormInput()
    lowerLimit3: number;


    constructor(partLPositionTolerance?: PartLPositionTolerance) {
        super(partLPositionTolerance);
        if (partLPositionTolerance) {
            this.part = partLPositionTolerance.part;
            this.partNo = partLPositionTolerance.partNo;
            this.lineNo = partLPositionTolerance.lineNo;
            this.itCode = partLPositionTolerance.itCode;
            this.uom = partLPositionTolerance.uom;
            this.spec = partLPositionTolerance.spec;
            this.upperLimit = partLPositionTolerance.upperLimit;
            this.lowerLimit = partLPositionTolerance.lowerLimit;
            this.accuracy = partLPositionTolerance.accuracy;
            this.sampleSize = partLPositionTolerance.sampleSize;
            this.upperLimit1 = partLPositionTolerance.upperLimit1;
            this.lowerLimit1 = partLPositionTolerance.lowerLimit1;
            this.itCode1 = partLPositionTolerance.itCode1;
            this.upperLimit2 = partLPositionTolerance.upperLimit2;
            this.lowerLimit2 = partLPositionTolerance.lowerLimit2;
            this.itCode2 = partLPositionTolerance.itCode2;
            this.upperLimit3 = partLPositionTolerance.upperLimit3;
            this.lowerLimit3 = partLPositionTolerance.lowerLimit3;
            this.itCode3 = partLPositionTolerance.itCode3;
            this.positionType = partLPositionTolerance.positionType;
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
