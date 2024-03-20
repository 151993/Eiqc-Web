/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormFunPara extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @FormInput()
    instrumentId: number;
    @FormInput()
    @DisplayColumn('UOM')
    uom: string;
    @FormInput()
    normalValue: number;

    @FormInput()
    upperLimit: number;

    @FormInput()
    lowerLimit: number;

    @FormInput()
    accuracy: number;
    @FormInput()
    sampleSize: string;
    constructor(formFunPara?: FormFunPara) {
        super(formFunPara);
        if (formFunPara) {
            this.form = formFunPara.form;
            this.formId = formFunPara.formId;
            this.parameterName = formFunPara.parameterName;
            this.instrumentId = formFunPara.instrumentId;
            this.uom = formFunPara.uom;
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
            this.uom = Constants.Empty;
            this.normalValue = 0;
            this.upperLimit = 0;
            this.lowerLimit = 0;
            this.accuracy = 0;
            this.sampleSize = Constants.Empty;
        }
    }
}
