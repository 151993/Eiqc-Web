/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { ReceiveGoodsInfo } from './receive-goods-info';


export class AddReceiveGoodsInfoModel extends BaseModel {


    plant: string;


    matlGroup: string;


    material: string;


    quantity: number;


    receivedDateTime?: Date;


    mocDoc?: string;


    storLoc: string;


    mvmtType: string;


    batch: string;


    vendor: string;


    user: string;


    specStock: string;


    reference: string;

    constructor(receiveGoodsInfo?: ReceiveGoodsInfo) {
        super(receiveGoodsInfo);

        if (receiveGoodsInfo) {
            this.plant = receiveGoodsInfo.plant;
            this.matlGroup = receiveGoodsInfo.matlGroup;
            this.material = receiveGoodsInfo.material;
            this.quantity = receiveGoodsInfo.quantity;
            this.receivedDateTime = receiveGoodsInfo.receivedDateTime;
            this.mocDoc = receiveGoodsInfo.mocDoc;
            this.storLoc = receiveGoodsInfo.storLoc;
            this.mvmtType = receiveGoodsInfo.mvmtType;
            this.batch = receiveGoodsInfo.batch;
            this.vendor = receiveGoodsInfo.vendor;
            this.user = receiveGoodsInfo.user;
            this.specStock = receiveGoodsInfo.specStock;
            this.reference = receiveGoodsInfo.reference;
        } else {
            this.plant = Constants.Empty;
            this.matlGroup = Constants.Empty;
            this.material = Constants.Empty;
            this.quantity = 0;
            this.mocDoc = Constants.Empty;
            this.storLoc = Constants.Empty;
            this.mvmtType = Constants.Empty;
            this.batch = Constants.Empty;
            this.vendor = Constants.Empty;
            this.user = Constants.Empty;
            this.specStock = Constants.Empty;
            this.reference = Constants.Empty;
            this.receivedDateTime = null;
        }
    }
}
