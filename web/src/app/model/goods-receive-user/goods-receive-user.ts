/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class GoodsReceiveUser extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('WareHouse')
    wareHouse: string;

    @Trim()
    @FormInput()
    @DisplayColumn('SAPUser')
    sAPUser: string;

    @Trim()
    @FormInput()
    @DisplayColumn('UserName')
    userName: string;

    @Trim()
    @FormInput()
    @DisplayColumn('SupervisorMail')
    supervisorMail: string;

    @Trim()
    @FormInput()
    @DisplayColumn('LeaderMail')
    leaderMail: string;

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
