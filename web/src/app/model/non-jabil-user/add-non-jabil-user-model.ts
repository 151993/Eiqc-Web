import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from '../../shared/constant/global';
import { Supplier } from '../supplier/supplier';
import { Site } from '../site/site';
import { NonJabilUser } from './non-jabil-user';

export class AddNonJabilUserModel extends BaseModel {
    userName: string;
    name: string;
    email: string;
    allowNotification: boolean;
    siteId: number;
    site: Site;
    phone: string;
    supplierId: number;
    supplier: Supplier;
    userTypeId: number;
    addedRoleIds: number;

    constructor(nonJabilUser?: NonJabilUser) {
        super(nonJabilUser);

        if (nonJabilUser) {
            this.id = nonJabilUser.id;
            this.userName = nonJabilUser.userName;
            this.name = nonJabilUser.name;
            this.email = nonJabilUser.email;
            this.allowNotification = nonJabilUser.allowNotification;
            this.siteId = nonJabilUser.siteId;
            this.site = nonJabilUser.site;
            this.phone = nonJabilUser.phone;
            this.supplierId = nonJabilUser.supplierId;
            this.userTypeId = nonJabilUser.userTypeId;
        } else {
            this.userName = Constants.Empty;
            this.name = Constants.Empty;
            this.email = Constants.Empty;
            this.allowNotification = false;
            this.siteId = Numbers.Default;
            this.site = null;
            this.phone = Constants.Empty;
            this.supplierId = Numbers.Default;
            this.supplier = null;
            this.userTypeId = Numbers.Default;
            this.addedRoleIds = Numbers.Default;
        }
    }
}

