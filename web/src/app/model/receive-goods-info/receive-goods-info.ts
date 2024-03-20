/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import {  DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class ReceiveGoodsInfo extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Plant')
    plant: string;

    @Trim()
    @FormInput()
    @DisplayColumn('MatlGroup')
    matlGroup: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Material')
    material: string;


    @FormInput()
    quantity: number;


    @FormInput()
    receivedDateTime?: Date;

    @Trim()
    @FormInput()
    mocDoc: string;

    @Trim()
    @FormInput()
    storLoc: string;

    @Trim()
    @FormInput()
    mvmtType: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Batch')
    batch: string;

    @Trim()
    @FormInput()
    vendor: string;

    @Trim()
    @FormInput()
    user: string;

    @Trim()
    @FormInput()
    specStock: string;

    @Trim()
    @FormInput()
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
