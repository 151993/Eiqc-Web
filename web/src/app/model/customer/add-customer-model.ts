/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Customer } from './customer';
import { User } from '../user/user';


export class AddCustomerModel extends BaseModel {


    name: string;


    cAFPath: string;


    dCCSavePath: string;


    cAFTempPath: string;


    backupSavePath: string;
    addedUserIds: User[];
    changeReason: string;

    constructor(customer?: Customer) {
        super(customer);

        if (customer) {
            this.name = customer.name;
            this.cAFPath = customer.cafPath;
            this.dCCSavePath = customer.dccSavePath;
            this.cAFTempPath = customer.cafPath;
            this.backupSavePath = customer.backupSavePath;
            this.addedUserIds = customer.users;


        } else {
            this.name = Constants.Empty;
            this.cAFPath = Constants.Empty;
            this.dCCSavePath = Constants.Empty;
            this.cAFTempPath = Constants.Empty;
            this.backupSavePath = Constants.Empty;
            this.addedUserIds = null;


        }
    }
}
