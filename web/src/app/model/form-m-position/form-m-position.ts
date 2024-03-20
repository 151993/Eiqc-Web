/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { ColumnType } from '../table/table';
export class FormMPosition extends BaseModel {
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

    @Trim()
    @FormInput()
    @DisplayColumn('ITCode')
    itCode: string;

    @Trim()
    @FormInput()
    @DisplayColumn('UOM')
    uom: string;


    @FormInput()
    @DisplayColumn('Spec')
    spec: number;

    @FormInput()
    @DisplayColumn('UpperLimit')
    upperLimit: number;

    @FormInput()
    @DisplayColumn('LowerLimit')

    @FormInput()
    @DisplayColumn('Accuracy')
    accuracy: number;

    @Trim()
    @FormInput()
    @DisplayColumn('SampleSize')
    sampleSize: string;

    @FormInput()
    @DisplayColumn('UpperLimit1')
    upperLimit1: number;

    @FormInput()
    @DisplayColumn('LowerLimit1')
    lowerLimit1: number;


    @Trim()
    @FormInput()
    @DisplayColumn('ITCode1')
    itCode1: string;

    @FormInput()
    @DisplayColumn('UpperLimit2')
    upperLimit2: number;

    @FormInput()
    @DisplayColumn('LowerLimit2')
    lowerLimit2: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ITCode2')
    itCode2: string;

    @FormInput()
    @DisplayColumn('UpperLimit3')
    upperLimit3: number;

    @FormInput()
    @DisplayColumn('LowerLimit3')
    lowerLimit3: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ITCode3')
    itCode3: string;

    @FormInput()
    @DisplayColumn('PositionType')
    positionType: number;
    constructor(formMPosition?: FormMPosition) {
        super(formMPosition);
        if (formMPosition) {
            this.form = formMPosition.form;
            this.formId = formMPosition.formId;
            this.lineNo = formMPosition.lineNo;
            this.itCode = formMPosition.itCode;
            this.uom = formMPosition.uom;
            this.spec = formMPosition.spec;
            this.upperLimit = formMPosition.upperLimit;
            this.accuracy = formMPosition.accuracy;
            this.sampleSize = formMPosition.sampleSize;
            this.upperLimit1 = formMPosition.upperLimit1;
            this.lowerLimit1 = formMPosition.lowerLimit1;
            this.itCode1 = formMPosition.itCode1;
            this.upperLimit2 = formMPosition.upperLimit2;
            this.lowerLimit2 = formMPosition.lowerLimit2;
            this.itCode2 = formMPosition.itCode2;
            this.upperLimit3 = formMPosition.upperLimit3;
            this.lowerLimit3 = formMPosition.lowerLimit3;
            this.itCode3 = formMPosition.itCode3;
            this.positionType = formMPosition.positionType;
            // this.lowerLimit: formMPosition.lowerLimit,
        } else {
            this.form = null;
            this.formId = 0;
            this.lineNo = Constants.Empty;
            this.itCode = Constants.Empty;
            this.uom = Constants.Empty;
            this.spec = 0;
            this.upperLimit = 0;
            this.accuracy = 0;
            this.sampleSize = Constants.Empty;
            this.upperLimit1 = 0;
            this.lowerLimit1 = 0;
            this.itCode1 = Constants.Empty;
            this.upperLimit2 = 0;
            this.lowerLimit2 = 0;
            this.itCode2 = Constants.Empty;
            this.upperLimit3 = 0;
            this.lowerLimit3 = 0;
            this.itCode3 = Constants.Empty;
            this.positionType = 0;
        }
    }
}
