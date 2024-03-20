/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { ColumnType } from '../table/table';
export class FormLPositionActual extends BaseModel {
    @FormInput()
    @Expand()
    @DisplayColumn('Form', { type: ColumnType.Status, mappingField: 'name' })
    form: Form;
    @FormInput()
    formId: number;
    @Trim()
    @FormInput()
    @DisplayColumn('LineNo')
    lineNo: string;
    @FormInput()
    @DisplayColumn('No')
    no: number;
    @FormInput()
    @DisplayColumn('ValueActual')
    valueActual: number;

    @FormInput()
    @DisplayColumn('PositionCalcul')
    positionCalcul: number;

    @FormInput()
    @DisplayColumn('PositionActual')
    positionActual: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Result')
    result: string;
    @Trim()
    @FormInput()
    @DisplayColumn('InstrumentID')
    instrumentID: string;
    @Trim()
    @FormInput()
    @DisplayColumn('InstrumentID2')
    instrumentID2: string;
    @FormInput()
    @DisplayColumn('Base1Actual')
    base1Actual: number;

    @FormInput()
    @DisplayColumn('Base2Actual')
    base2Actual: number;

    @FormInput()
    @DisplayColumn('Base3Actual')
    base3Actual: number;

    @Trim()
    @FormInput()
    @DisplayColumn('InstrumentID1')
    InstrumentID1: string;
    @Trim()
    @FormInput()
    @DisplayColumn('InstrumentID2')
    InstrumentID2: string;
    @Trim()
    @FormInput()
    @DisplayColumn('InstrumentID3')
    InstrumentID3: string;
    @FormInput()
    @DisplayColumn('PositionType')
    positionType: number;
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
