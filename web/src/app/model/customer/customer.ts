/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { User } from '../user/user';


export class Customer extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('CAFPath')
    cafPath: string;

    @Trim()
    @FormInput()
    @DisplayColumn('DCCSavePath')
    dccSavePath?: string;

    @Trim()
    @FormInput()
    @DisplayColumn('CAFTempPath')
    cafTempPath?: string;

    @Trim()
    @FormInput()
    @DisplayColumn('BackupSavePath')
    backupSavePath: string;

    @Expand()
    @FormInput()
    users: User[];
    constructor(customer?: Customer) {
        super(customer);

        if (customer) {
            this.name = customer.name;
            this.cafPath = customer.cafPath;
            this.dccSavePath = customer.dccSavePath;
            this.cafTempPath = customer.cafTempPath;
            this.backupSavePath = customer.backupSavePath;
            this.users = customer.users;

        } else {
            this.cafPath = Constants.Empty;
            this.dccSavePath = Constants.Empty;
            this.cafTempPath = Constants.Empty;
            this.backupSavePath = Constants.Empty;
            this.users = null;

        }
    }
}
