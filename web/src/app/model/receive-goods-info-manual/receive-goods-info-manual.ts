/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class ReceiveGoodsInfoManual extends BaseModel {
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
    @DisplayColumn('Quantity')
    quantity: string;


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
            this.receivedDateTime = null;
        }
    }
}
