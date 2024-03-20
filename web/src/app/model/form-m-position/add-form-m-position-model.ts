/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Form } from '../form/form';
import { FormMPosition } from './form-m-position';
export class AddFormMPositionModel extends BaseModel {
    form: Form;
    formId: number;
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
    lowerLimit1: number;
    upperLimit1: number;
    upperLimit2: number;
    lowerLimit2: number;
    upperLimit3: number;
    lowerLimit3: number;
    constructor(formMPosition?: FormMPosition) {
        super(formMPosition);
        if (formMPosition) {
            this.form = formMPosition.form;
            this.formId = formMPosition.formId;
            this.lineNo = formMPosition.lineNo;
            this.iTCode = formMPosition.itCode;
            this.uOM = formMPosition.uom;
            this.spec = formMPosition.spec;
            this.upperLimit = formMPosition.upperLimit;
            this.accuracy = formMPosition.accuracy;
            this.sampleSize = formMPosition.sampleSize;
            this.iTCode1 = formMPosition.itCode1;
            this.iTCode2 = formMPosition.itCode2;
            this.iTCode3 = formMPosition.itCode3;
            this.lowerLimit1 = formMPosition.lowerLimit1;
            this.upperLimit1 = formMPosition.upperLimit1;
            this.upperLimit2 = formMPosition.upperLimit2;
            this.lowerLimit2 = formMPosition.lowerLimit2;
            this.upperLimit3 = formMPosition.upperLimit3;
            this.lowerLimit3 = formMPosition.lowerLimit3;
            this.positionType = formMPosition.positionType;
        } else {
            this.form = null;
            this.formId = 0;
            this.lineNo = Constants.Empty;
            this.iTCode = Constants.Empty;
            this.uOM = Constants.Empty;
            this.spec = 0;
            this.upperLimit = 0;
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
