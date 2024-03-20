/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Form } from '../form/form';
import { FormFunPara } from './form-fun-para';
export class AddFormFunParaModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    instrumentId: number;
    uOM: string;
    accuracy: number;
    sampleSize: string;
    normalValue: number;
    upperLimit: number;
    lowerLimit: number;

    constructor(formFunPara?: FormFunPara) {
        super(formFunPara);
        if (formFunPara) {
            this.form = formFunPara.form;
            this.formId = formFunPara.formId;
            this.parameterName = formFunPara.parameterName;
            this.instrumentId = formFunPara.instrumentId;
            this.uOM = formFunPara.uom;
            this.normalValue = formFunPara.normalValue;
            this.upperLimit = formFunPara.upperLimit;
            this.lowerLimit = formFunPara.lowerLimit;
            this.accuracy = formFunPara.accuracy;
            this.sampleSize = formFunPara.sampleSize;
        } else {
            this.form = null;
            this.formId = 0;
            this.parameterName = Constants.Empty;
            this.instrumentId = 0;
            this.uOM = Constants.Empty;
            this.normalValue = 0;
            this.upperLimit = 0;
            this.lowerLimit = 0;
            this.accuracy = 0;
            this.sampleSize = Constants.Empty;
        }
    }
}
