/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import {  DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class LotInspectionQty extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('LotNo')
    lotNo: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Material')
    material: string;

    @Trim()
    @FormInput()
    @DisplayColumn('MstrChar')
    mstrChar: string;

    @Trim()
    @FormInput()
    @DisplayColumn('InspStg')
    inspStg: string;


    @FormInput()
    @DisplayColumn('INspectQty')
    iNspectQty: number;

    constructor(lotInspectionQty?: LotInspectionQty) {
        super(lotInspectionQty);

        if (lotInspectionQty) {
            this.lotNo = lotInspectionQty.lotNo;
            this.material = lotInspectionQty.material;
            this.mstrChar = lotInspectionQty.mstrChar;
            this.inspStg = lotInspectionQty.inspStg;
            this.iNspectQty = lotInspectionQty.iNspectQty;
        } else {
            this.lotNo = Constants.Empty;
            this.material = Constants.Empty;
            this.mstrChar = Constants.Empty;
            this.inspStg = Constants.Empty;
            this.iNspectQty = 0;
        }
    }
}
