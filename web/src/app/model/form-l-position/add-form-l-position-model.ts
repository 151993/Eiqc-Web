/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Form } from '../form/form';
import { FormLPosition } from './form-l-position';
export class AddFormLPositionModel extends BaseModel {
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
    lowerLimit: number;
    upperLimit1: number;
    lowerLimit1: number;
    upperLimit2: number;
    lowerLimit2: number;
    upperLimit3: number;
    lowerLimit3: number;
constructor(formLPosition?: FormLPosition) {
    super(formLPosition);
    if (formLPosition) {
        this.form = formLPosition.form;
        this.formId = formLPosition.formId;
        this.lineNo = formLPosition.lineNo;
        this.iTCode = formLPosition.itCode;
        this.uOM = formLPosition.uom;
        this.spec = formLPosition.spec;
        this.upperLimit = formLPosition.upperLimit;
        this.lowerLimit = formLPosition.lowerLimit;
        this.accuracy = formLPosition.accuracy;
        this.sampleSize = formLPosition.sampleSize;
        this.upperLimit1 = formLPosition.upperLimit1;
        this.lowerLimit1 = formLPosition.lowerLimit1;
        this.iTCode1 = formLPosition.itCode1;
        this.upperLimit2 = formLPosition.upperLimit2;
        this.lowerLimit2 = formLPosition.lowerLimit2;
        this.iTCode2 = formLPosition.itCode2;
        this.upperLimit3 = formLPosition.upperLimit3;
        this.lowerLimit3 = formLPosition.lowerLimit3;
        this.iTCode3 = formLPosition.itCode3;
        this.positionType = formLPosition.positionType;
    } else {
        this.form = null;
        this.formId = 0;
        this.lineNo = Constants.Empty;
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
