/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormMPositionActual extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    @DisplayColumn('FormId')
    formId: number;

    @FormInput()
    @DisplayColumn('LineNo')
    lineNo: string;
    @FormInput()
    @DisplayColumn('No')
    no: number;
    @FormInput()
    valueActual: number;

    @FormInput()
    positionCalcul: number;

    @FormInput()
    positionActual: number;


    @FormInput()
    result: string;

    @FormInput()
    instrumentID: string;
    @FormInput()
    base1Actual: number;

    @FormInput()
    base2Actual: number;

    @FormInput()
    base3Actual: number;


    @FormInput()
    instrumentID1: string;

    @FormInput()
    instrumentID2: string;

    @FormInput()
    instrumentID3: string;
    @FormInput()
    positionType: number;
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
            this.instrumentID2 = formMPositionActual.instrumentID2;
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
            this.instrumentID2 = Constants.Empty;
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
