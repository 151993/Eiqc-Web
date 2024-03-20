/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { Instrument } from '../instrument/instrument';
export class FormMeasurementParameter extends BaseModel {
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
    @FormInput()
    uom: string;
    @FormInput()
    @DisplayColumn('NormalValue')
    normalValue: number;

    @FormInput()
    upperLimit: number;

    @FormInput()
    lowerLimit: number;

    @FormInput()
    accuracy: number;
    @FormInput()
    sampleSize: string;
    constructor(formMeasurementParameter?: FormMeasurementParameter) {
        super(formMeasurementParameter);
        if (formMeasurementParameter) {
            this.form = formMeasurementParameter.form;
            this.formId = formMeasurementParameter.formId;
            this.parameterName = formMeasurementParameter.parameterName;
            this.instrument = formMeasurementParameter.instrument;
            this.instrumentId = formMeasurementParameter.instrumentId;
            this.uom = formMeasurementParameter.uom;
            this.normalValue = formMeasurementParameter.normalValue;
            this.upperLimit = formMeasurementParameter.upperLimit;
            this.lowerLimit = formMeasurementParameter.lowerLimit;
            this.accuracy = formMeasurementParameter.accuracy;
            this.sampleSize = formMeasurementParameter.sampleSize;
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
