/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Form } from '../form/form';
import { Instrument } from '../instrument/instrument';
import { FormMeasurementParameter } from './form-measurement-parameter';
export class AddFormMeasurementParameterModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    instrument: Instrument;
    instrumentId: number;
    uOM: string;
    accuracy: number;
    sampleSize: string;
    normalValue: number;
    upperLimit: number;
    lowerLimit: number;

constructor(formMeasurementParameter?: FormMeasurementParameter) {
    super(formMeasurementParameter);
    if (formMeasurementParameter) {
        this.form = formMeasurementParameter.form;
        this.formId = formMeasurementParameter.formId;
        this.parameterName = formMeasurementParameter.parameterName;
        this.instrument = formMeasurementParameter.instrument;
        this.instrumentId = formMeasurementParameter.instrumentId;
        this.uOM = formMeasurementParameter.uom;
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
        this.uOM = Constants.Empty;
        this.normalValue = 0;
        this.upperLimit = 0;
        this.lowerLimit = 0;
        this.accuracy = 0;
        this.sampleSize = Constants.Empty;
    }
  }
}
