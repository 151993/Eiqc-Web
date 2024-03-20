/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { Instrument } from '../instrument/instrument';
export class FormMicroSection extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @FormInput()
    @Expand()
    instrument: Instrument;
    @FormInput()
    instrumentId: number;
    @Trim()
    @FormInput()
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
    constructor(formMicroSection?: FormMicroSection) {
        super(formMicroSection);
        if (formMicroSection) {
            this.form = formMicroSection.form;
            this.formId = formMicroSection.formId;
            this.parameterName = formMicroSection.parameterName;
            this.instrument = formMicroSection.instrument;
            this.instrumentId = formMicroSection.instrumentId;
            this.uom = formMicroSection.uom;
            this.normalValue = formMicroSection.normalValue;
            this.upperLimit = formMicroSection.upperLimit;
            this.lowerLimit = formMicroSection.lowerLimit;
            this.accuracy = formMicroSection.accuracy;
            this.sampleSize = formMicroSection.sampleSize;
        } else {
            this.form = null;
            this.formId = 0;
            this.parameterName = Constants.Empty;
            this.instrument = null;
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
