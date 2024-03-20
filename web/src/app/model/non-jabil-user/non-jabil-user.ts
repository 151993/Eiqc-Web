import {
    DisplayColumn,
    Trim,
    FormInput,
    ExpandSelect,
    Expand
} from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, UserType, userTypes } from 'src/app/shared/constant/global';
import { Role } from '../role/role';
import { ColumnType } from '../table/table';

import { Site } from '../site/site';
import { Supplier } from '../supplier/supplier';

export class NonJabilUser extends BaseModel {
    displayName: string;

    @Trim()
    @FormInput()
    @DisplayColumn('UserID')
    userName: string;

    @Trim()
    @FormInput()
    @DisplayColumn('UserName')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Email')
    email: string;

    @FormInput()
    siteId: number;

    @Expand()
    @DisplayColumn('Site', { type: ColumnType.Status, mappingField: 'name' })
    @FormInput()
    site: Site;

    @ExpandSelect({ select: ['Id', 'Name', 'IsEnabled'] })
    @FormInput()
    roles: Role[];

    @Trim()
    @FormInput()
    phone: string;

    @FormInput()
    supplierId: number;

    @FormInput()
    userTypeId: number;

    @FormInput()
    userType: string;

    @Expand()
    @DisplayColumn('Company', { type: ColumnType.Status, mappingField: 'vendorName' })
    @FormInput()
    supplier: Supplier;

    @FormInput()
    @DisplayColumn('AllowNotification', { type: ColumnType.Boolean })
    allowNotification: boolean;

    constructor(nonJabilUser?: NonJabilUser) {
        super(nonJabilUser);

        if (nonJabilUser) {
            this.userName = nonJabilUser.userName;
            this.name = nonJabilUser.name;
            this.displayName = nonJabilUser.displayName;
            this.email = nonJabilUser.email;
            this.allowNotification = nonJabilUser.allowNotification;
            this.siteId = nonJabilUser.siteId;
            this.site = nonJabilUser.site;
            this.phone = nonJabilUser.phone;
            this.supplierId = nonJabilUser.supplierId;
            this.supplier = nonJabilUser.supplier;
            this.userTypeId = nonJabilUser.userTypeId;
            this.roles = nonJabilUser.roles;
            this.userType = nonJabilUser.userTypeId === UserType.Supplier ? userTypes[0].name : userTypes[1].name;

        } else {
            this.userName = Constants.Empty;
            this.name = Constants.Empty;
            this.displayName = Constants.Empty;
            this.email = Constants.Empty;
            this.allowNotification = false;
            this.siteId = 0;
            this.site = null;
            this.phone = Constants.Empty;
            this.supplierId = 0;
            this.userTypeId = 0;
            this.supplier = null;
            this.roles = null;
            this.userType = null;

        }
    }
}
