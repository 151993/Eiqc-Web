/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { ReceiveGoodsInfoManual } from './receive-goods-info-manual';


export class AddReceiveGoodsInfoManualModel extends BaseModel {


    plant: string ;


    matlGroup: string ;


    material: string ;


    quantity: string ;


    receivedDateTime?: Date;


    mocDoc: string ;


    storLoc: string ;


    mvmtType: string ;


    batch: string ;


    vendor: string ;


    user: string ;


    specStock: string ;


    reference: string ;
    changeReason: string;

    constructor(receiveGoodsInfoManual?: ReceiveGoodsInfoManual) {
        super(receiveGoodsInfoManual);

        if (receiveGoodsInfoManual) {
            this.plant = receiveGoodsInfoManual.plant;
            this.matlGroup = receiveGoodsInfoManual.matlGroup;
            this.material = receiveGoodsInfoManual.material;
            this.quantity = receiveGoodsInfoManual.quantity;
            this.receivedDateTime = receiveGoodsInfoManual.receivedDateTime;
            this.mocDoc = receiveGoodsInfoManual.mocDoc;
            this.storLoc = receiveGoodsInfoManual.storLoc;
            this.mvmtType = receiveGoodsInfoManual.mvmtType;
            this.batch = receiveGoodsInfoManual.batch;
            this.vendor = receiveGoodsInfoManual.vendor;
            this.user = receiveGoodsInfoManual.user;
            this.specStock = receiveGoodsInfoManual.specStock;
            this.reference = receiveGoodsInfoManual.reference;
        } else {
            this.plant = Constants.Empty;
            this.matlGroup = Constants.Empty;
            this.material = Constants.Empty;
            this.quantity = Constants.Empty;
            this.mocDoc = Constants.Empty;
            this.storLoc = Constants.Empty;
            this.mvmtType = Constants.Empty;
            this.batch = Constants.Empty;
            this.vendor = Constants.Empty;
            this.user = Constants.Empty;
            this.specStock = Constants.Empty;
            this.reference = Constants.Empty;
        }
    }
}
