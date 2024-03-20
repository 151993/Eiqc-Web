/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormLPosition extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;

    @FormInput()
    @DisplayColumn('LineNo')
    lineNo: string;

    @FormInput()
    @DisplayColumn('itCode')
    itCode: string;

    @FormInput()
    uom: string;
    accuracy: number;

    @FormInput()
    sampleSize: string;

    @FormInput()
    itCode1: string;
    @FormInput()
    itCode2: string;


    @FormInput()
    itCode3: string;

    @FormInput()
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

    @FormInput()
    upperLimit2: number;

    @FormInput()
    lowerLimit2: number;
    @FormInput()
    upperLimit3: number;

    @FormInput()
    lowerLimit3: number;

    constructor(formLPosition?: FormLPosition) {
        super(formLPosition);
        if (formLPosition) {
            this.form = formLPosition.form;
            this.formId = formLPosition.formId;
            this.lineNo = formLPosition.lineNo;
            this.itCode = formLPosition.itCode;
            this.uom = formLPosition.uom;
            this.spec = formLPosition.spec;
            this.upperLimit = formLPosition.upperLimit;
            this.lowerLimit = formLPosition.lowerLimit;
            this.accuracy = formLPosition.accuracy;
            this.sampleSize = formLPosition.sampleSize;
            this.upperLimit1 = formLPosition.upperLimit1;
            this.lowerLimit1 = formLPosition.lowerLimit1;
            this.itCode1 = formLPosition.itCode1;
            this.upperLimit2 = formLPosition.upperLimit2;
            this.lowerLimit2 = formLPosition.lowerLimit2;
            this.itCode2 = formLPosition.itCode2;
            this.upperLimit3 = formLPosition.upperLimit3;
            this.lowerLimit3 = formLPosition.lowerLimit3;
            this.itCode3 = formLPosition.itCode3;
            this.positionType = formLPosition.positionType;
        } else {
            this.form = null;
            this.formId = 0;
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
