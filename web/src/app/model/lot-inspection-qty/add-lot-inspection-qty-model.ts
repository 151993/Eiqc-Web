/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { LotInspectionQty } from './lot-inspection-qty';


export class AddLotInspectionQtyModel extends BaseModel {


    lotNo: string;


    material: string;


    mstrChar: string;


    inspStg: string;


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
