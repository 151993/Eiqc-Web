/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Form } from '../form/form';
import { FormLPositionActual } from './form-l-position-actual';
export class AddFormLPositionActualModel extends BaseModel {
    form: Form;
    formId: number;
    lineNo: string;
    no: number;
    result: string;
    instrumentID: string;
    instrumentID2: string;
    InstrumentID1: string;
    InstrumentID2: string;
    InstrumentID3: string;
    positionType: number;
    valueActual: number;
    positionCalcul: number;
    positionActual: number;
    base1Actual: number;
    base2Actual: number;
    base3Actual: number;



constructor(formLPositionActual?: FormLPositionActual) {
    super(formLPositionActual);
    if (formLPositionActual) {
        this.form = formLPositionActual.form;
        this.formId = formLPositionActual.formId;
        this.lineNo = formLPositionActual.lineNo;
        this.no = formLPositionActual.no;
        this.valueActual = formLPositionActual.valueActual;
        this.positionCalcul = formLPositionActual.positionCalcul;
        this.positionActual = formLPositionActual.positionActual;
        this.result = formLPositionActual.result;
        this.instrumentID = formLPositionActual.instrumentID;
        this.instrumentID2 = formLPositionActual.instrumentID2;
        this.base1Actual = formLPositionActual.base1Actual;
        this.base2Actual = formLPositionActual.base2Actual;
        this.base3Actual = formLPositionActual.base3Actual;
        this.InstrumentID1 = formLPositionActual.InstrumentID1;
        this.InstrumentID2 = formLPositionActual.InstrumentID2;
        this.InstrumentID3 = formLPositionActual.InstrumentID3;
        this.positionType = formLPositionActual.positionType;
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
        this.instrumentID2 = Constants.Empty;
        this.base1Actual = 0;
        this.base2Actual = 0;
        this.base3Actual = 0;
        this.InstrumentID1 = Constants.Empty;
        this.InstrumentID2 = Constants.Empty;
        this.InstrumentID3 = Constants.Empty;
        this.positionType = 0;
    }
  }
}
