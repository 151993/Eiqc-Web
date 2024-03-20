/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { GoodsReceiveUser } from './goods-receive-user';

export class UpdateGoodsReceiveUserModel extends BaseModel {


    wareHouse: string;


    sAPUser: string;


    userName: string;


    supervisorMail: string;


    leaderMail: string;
    changeReason: string;

    constructor(goodsReceiveUser?: GoodsReceiveUser) {
        super(goodsReceiveUser);
        if (goodsReceiveUser) {
            this.wareHouse = goodsReceiveUser.wareHouse;
            this.sAPUser = goodsReceiveUser.sAPUser;
            this.userName = goodsReceiveUser.userName;
            this.supervisorMail = goodsReceiveUser.supervisorMail;
            this.leaderMail = goodsReceiveUser.leaderMail;
        } else {
            this.wareHouse = Constants.Empty;
            this.sAPUser = Constants.Empty;
            this.userName = Constants.Empty;
            this.supervisorMail = Constants.Empty;
            this.leaderMail = Constants.Empty;
        }
    }
}
