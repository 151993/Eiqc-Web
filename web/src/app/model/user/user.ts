import {
  DisplayColumn,
  Trim,
  FormInput,
  ExpandSelect,
  Expand
} from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { Role } from '../role/role';
import { ColumnType } from '../table/table';
import { Department } from '../department/department';
import { Manager } from '../manager/manager';
import { Site } from '../site/site';

export class User extends BaseModel {
  employeeId: string;
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
  @Expand()
  // @ExpandSelect({ select: ['Id', 'Name', 'IsEnabled'] })
  @DisplayColumn('Department', { type: ColumnType.Status, mappingField: 'name' })
  department: Department;

  @FormInput()
  departmentId: number;

  @FormInput()
  @Expand()
  // @ExpandSelect({ select: ['Id', 'Name', 'IsEnabled'] })
  @DisplayColumn('Manager', { type: ColumnType.Status, mappingField: 'name' })
  manager: Manager;

  @FormInput()
  siteId: number;

  @Expand()
  @FormInput()
  site: Site;

  @FormInput()
  @DisplayColumn('AllowNotification', { type: ColumnType.Boolean })
  allowNotification: boolean;

  @ExpandSelect({ select: ['Id', 'Name', 'IsEnabled'] })
  @FormInput()
  roles: Role;

  @FormInput()
  managerId: number;


  userTypeId: number;

    constructor(user?: User) {
    super(user);
    if (user) {
      this.userName = user.userName;
      this.name = user.name;
      this.email = user.email;
      this.employeeId = user.employeeId;
      this.displayName = user.displayName;
      this.roles = user.roles;
      this.allowNotification = user.allowNotification;
      this.managerId = user.managerId;
      this.manager = user.manager;
      this.departmentId = user.departmentId;
      this.department = user.department;
      this.siteId = user.siteId;
      this.site = user.site;
      this.userTypeId = user.userTypeId;
    } else {
      this.userName = Constants.Empty;
      this.name = Constants.Empty;
      this.email = Constants.Empty;
      this.employeeId = Constants.Empty;
      this.displayName = Constants.Empty;
      this.roles = null;
      this.allowNotification = true;
      this.managerId = Numbers.Default,
      this.departmentId = Numbers.Default,
      this.manager = null;
      this.department = null;
      this.siteId = Numbers.Default;
      this.site = null;
      this.userTypeId = Numbers.Default;
    }
  }
}
