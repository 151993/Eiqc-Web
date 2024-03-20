/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Form } from '../form/form';
import { Instrument } from '../instrument/instrument';
import { FormMicroSection } from './form-micro-section';
export class AddFormMicroSectionModel extends BaseModel {
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
    constructor(formMicroSection?: FormMicroSection) {
        super(formMicroSection);
        if (formMicroSection) {
            this.form = formMicroSection.form;
            this.formId = formMicroSection.formId;
            this.parameterName = formMicroSection.parameterName;
            this.instrument = formMicroSection.instrument;
            this.instrumentId = formMicroSection.instrumentId;
            this.uOM = formMicroSection.uom;
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
            this.uOM = Constants.Empty;
            this.normalValue = 0;
            this.upperLimit = 0;
            this.lowerLimit = 0;
            this.accuracy = 0;
            this.sampleSize = Constants.Empty;
        }
    }
}
