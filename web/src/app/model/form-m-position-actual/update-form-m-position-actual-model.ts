/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormMPositionActual } from './form-m-position-actual';
export class UpdateFormMPositionActualModel extends BaseModel {
    form: Form;
    formId: number;
    lineNo: string;
    no: number;
    result: string;
    instrumentID: string;
    instrumentID2: string;
    instrumentID1: string;
    instrumentID3: string;
    positionType: number;
    valueActual: number;
    positionCalcul: number;
    positionActual: number;
    base1Actual: number;
    base2Actual: number;
    base3Actual: number;
    constructor(formMPositionActual?: FormMPositionActual) {
        super(formMPositionActual);
        if (formMPositionActual) {
            this.form = formMPositionActual.form;
            this.formId = formMPositionActual.formId;
            this.lineNo = formMPositionActual.lineNo;
            this.no = formMPositionActual.no;
            this.valueActual = formMPositionActual.valueActual;
            this.positionCalcul = formMPositionActual.positionCalcul;
            this.positionActual = formMPositionActual.positionActual;
            this.result = formMPositionActual.result;
            this.instrumentID = formMPositionActual.instrumentID;
            this.base1Actual = formMPositionActual.base1Actual;
            this.base2Actual = formMPositionActual.base2Actual;
            this.base3Actual = formMPositionActual.base3Actual;
            this.instrumentID1 = formMPositionActual.instrumentID1;
            this.instrumentID2 = formMPositionActual.instrumentID2;
            this.instrumentID3 = formMPositionActual.instrumentID3;
            this.positionType = formMPositionActual.positionType;
        } else {
            this.form = null;
            this.formId = 0;
            this.lineNo = Constants.Empty;
            this.no = 0;
            this.valueActual = 0;
            this.positionCalcul = 0;
            this.positionActual = 0;
            this.result = Constants.Empty;
            this.instrumentID = Constants.Empty;
            this.base1Actual = 0;
            this.base2Actual = 0;
            this.base3Actual = 0;
            this.instrumentID1 = Constants.Empty;
            this.instrumentID2 = Constants.Empty;
            this.instrumentID3 = Constants.Empty;
            this.positionType = 0;
        }
    }
}
