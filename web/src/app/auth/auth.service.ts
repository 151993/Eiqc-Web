import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  UserManager,
  UserManagerSettings,
  User,
  WebStorageStateStore
} from 'oidc-client';
import {
  Roles,
  Cookie,
  LocalStorage, Constants, SearchOperator, ToastMessage
} from '../shared/constant/global';
import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from '../shared/controls/loading/loading.service';
import {
  LoadingMessage,
  LoadingIcon
} from '../shared/controls/loading/loadingState';
import { Subject } from 'rxjs';
import { PermissionType } from '../shared/constant/roles';
import { RoleService } from '../services/role/role.service';
import { UserService } from '../services/user/user.service';
import { ExpandSelectCountInfo, PageSortFilterInfo } from '../shared/odata-query-builder/page-sort-filter-config';
import { ColumnType, FilterCondition } from '../model/table/table';
import { NotificationService } from '../shared/notification/notification.service';
import { Router } from '@angular/router';

/**
 * WIKI: https://github.com/IdentityModel/oidc-client-js/wiki
 */
export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.authentication.loginAuthority,
    client_id: environment.authentication.clientId,
    redirect_uri: environment.authentication.redirectUri,
    post_logout_redirect_uri: environment.authentication.postLogoutRedirectUri,
    response_type: 'code',
    scope: environment.authentication.scope,
    filterProtocolClaims: true,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    revokeAccessTokenOnSignout: true
  };
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private manager = new UserManager(getClientSettings());
  private user: User = null;
  public isSessionExpiring = false;
  public expiringTime = 0;
  private expireInterval: any;
  private userData;

  public isAuth$ = new Subject<any>();

  //#region Permission Property
  // private permissions: PermissionType[];
  public userPermissions$ = new Subject<any>();
  //#endregion Permission Property

  private stopSessionExpiringInterval = false;

  constructor(
    private cookieService: CookieService,
    private loadingService: LoadingService,
    private roleService: RoleService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.manager.getUser().then(async user => {
      this.user = user;
      if (this.user) {
        this.addAuthToCookie();
      }
    });
  }

  /**
   * Add Cookie 'auth'
   */
  private addAuthToCookie() {
    this.cookieService.set(
      Cookie.Auth,
      `${this.user.token_type} ${this.user.access_token}`
    );
  }

  /**
   * Get user data from oidc
   */
  async getUser(): Promise<User> {
    return await this.manager.getUser();
  }

  /**
   * Get user information from database
   * @param email oidc email retrieved
   */
  getUserData(email: string) {
    return new Promise((resolve, reject) => {
      // create filter information
      const pageSortFilterInfo = new PageSortFilterInfo();
      // add filter
      pageSortFilterInfo.createFilter(email, 'email', ColumnType.String, Constants.Empty, SearchOperator.Contains, FilterCondition.Or);
      // create criteria to the expand entity
      const rolesExpandSelect = new ExpandSelectCountInfo();
      rolesExpandSelect.select = ['id', 'name', 'permissionTypeIds'];
      // entity to expand
      const roles = new ExpandSelectCountInfo();
      const rolesExpand: Record<string, ExpandSelectCountInfo>[] = [
        { 'Roles': rolesExpandSelect }
      ];
      // include expand options to filter information
      roles.expand = rolesExpand;
      pageSortFilterInfo.expandInfo = roles;
      // call api
      email = email.toLowerCase();
      const query = `$select=id,username,name,email,employeeid,displayname,usertypeid,supplierid,isenabled&$filter=tolower(email) eq '${email}'
         and isEnabled eq true &$expand=Roles,Site,Supplier&$count=true`;
      this.userService.getAllDataWithODataQuery(query)
        .subscribe((result) => {
          this.userData = result;
          if (this.userData.count > 0) {
            this.storeRoles(this.userData.value[0].roles);
            const rolesArray: number[] = [];
            this.userData.value[0].roles.forEach(element => {
              rolesArray.push(element.id);
            });
            this.storeRoles(rolesArray);
            this.storeUser(this.userData.value[0]);
            this.storeSite(this.userData.value[0].site);
            resolve();
          } else {
            this.router.navigate(['/unauthorized']);
            reject();
          }
        }, (error) => {
          console.error(error);
          reject();
        });
    });
  }

  async isLoggedIn(): Promise<boolean> {
    if (!this.user) {
      this.user = await this.getUser();
      if (this.user) {
        this.addAuthToCookie();
      }
    }

    this.isAuth$.next(this.user != null && !this.user.expired);

    return this.user != null && !this.user.expired;
  }

  isAdmin(): boolean {
    if (this.user != null) {
      if (this.user.profile.role instanceof Array) {
        const role = this.user.profile.role.find(
          r => r.toLowerCase() === Roles.Admin.toLowerCase()
        );
        return role ? true : false;
      } else {
        return (
          this.user.profile.role.toLowerCase() === Roles.Admin.toLowerCase()
        );
      }
    }

    return false;
  }

  isDefaultAccess(): boolean {
    const permissions = this.retrievePermission();

    if (permissions != null && permissions.length === 1) {
      const defaultAccess = permissions.find(
        r => r === PermissionType.HomeCanAccess
      );
      return defaultAccess ? true : false;
    }

    return false;
  }
  //#region Permission
  /**
   * Retrieve permission in basis to role ids
   * @param force �?
   */
  getUserPermissions(force = false) {

    return new Promise((resolve, reject) => {

      // call api to retrieve user information from eBaseline
      this.getUserData(this.user.profile.email).then(res => {

        const permissions = this.retrievePermission();
        if (!permissions || permissions.length === 0 || force) {

          let _userPermissions: number[] = [];
          _userPermissions = this.retrieveRoles();

          this.roleService.getDataByIds(_userPermissions).subscribe(roles => {
            const _permissions = [];
            roles.value.forEach(role => {
              role.permissionTypeIds.map(permission => {
                _permissions.push(permission);
              });
            });

            this.storePermission(_permissions);

            this.userPermissions$.next();
            resolve();
          });
        } else {
          this.userPermissions$.next();
          resolve();
        }
      }).catch(err => {
        this.notificationService.showError(ToastMessage.NotData, err);
        reject(err);
      });
    });
  }
  /**
   * Validate if user has permission
   * @param permissions Permission type collection
   */
  isPermissionExists(permissions: PermissionType[]) {

    if (permissions == null) {
      return true;
    }

    let allPermissionsExists = false;
    const _permissions = this.retrievePermission();
    if (_permissions == null) {
      this.getUserPermissions();
    }

    permissions.forEach(permission => {
      if (_permissions == null) {
        return false;
      }

      allPermissionsExists = _permissions.includes(permission);

      if (!allPermissionsExists) {
        return false;
      }
    });

    return allPermissionsExists;
  }

  isAnyPermissionExists(permissionsRequired: PermissionType[]) {
    if (permissionsRequired == null || permissionsRequired.length === 0) {
      return true;
    }

    const currentPermissions = this.retrievePermission();
    if (currentPermissions == null || currentPermissions.length === 0) {
      return false;
    }
    let permissionExists = false;

    currentPermissions.forEach(currentPermission => {
      if (currentPermission == null) {
        return false;
      }
      if (permissionsRequired.includes(currentPermission)) {
        permissionExists = true;
      }
    });

    return permissionExists;
  }

  /**
   * Get user permissions from local storage
   */
  retrievePermission() {
    return JSON.parse(localStorage.getItem(LocalStorage.Permissions));
  }
  /**
   * Save permissions
   * @param permissions permissions
   */
  storePermission(permissions) {
    return localStorage.setItem(LocalStorage.Permissions, JSON.stringify(permissions));
  }

  /**
   * retrieve roles data
   */
  retrieveRoles() {
    return JSON.parse(localStorage.getItem(LocalStorage.Roles));
  }
  /**
   * Save role
   * @param role role
   */
  storeRoles(role) {
    return localStorage.setItem(LocalStorage.Roles, JSON.stringify(role));
  }

  /**
   * retrieves user data
   */
  retrieveUser() {
    const user = JSON.parse(localStorage.getItem(LocalStorage.User));
    if (user) {
      return user;
    }
    this.signOut();
  }

  /**
   * save user data
   * @param user user data
   */
  storeUser(user) {
    return localStorage.setItem(LocalStorage.User, JSON.stringify(user));
  }

  /**
     * retrieves site data
     */
  retrieveSite() {
    const site = JSON.parse(localStorage.getItem(LocalStorage.Site));
    if (site) {
      return site;
    }
    this.signOut();
  }

  /**
  * save site data
  * @param site site data
  */
  storeSite(site) {
    return localStorage.setItem(LocalStorage.Site, JSON.stringify(site));
  }

  //#endregion Permission

  getClaims(): any {
    if (this.user) {
      localStorage.setItem('userData', JSON.stringify(this.user.profile));
      return this.user.profile;
    }
  }

  getAuthorizationHeaderValue(): string {
    let cookieValue: string;
    if (this.cookieService.check(Cookie.Auth)) {
      cookieValue = this.cookieService.get(Cookie.Auth);
    }

    if (!cookieValue) {
      return undefined;
    }

    return cookieValue;
  }

  /**
   * start with auth process
   * @param isOktaLogin if okta session is enabled
   */
  startAuthentication(isOktaLogin = false): Promise<void> {

    localStorage.setItem(LocalStorage.ReturnUrl, window.location.href);

    if (isOktaLogin) {
      const args: any = {
        acr_values: 'tenant:okta'
      };
      return this.manager.signinRedirect(args);
    } else {
      return this.manager.signinRedirect();
    }
  }

  /**
   * finish auth process
   */
  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      if (this.user) {
        this.addAuthToCookie();
      }
    });
  }

  /**
   * Logout acction
   */
  signOut() {
    this.manager.signoutRedirect().then(() => {
      this.manager.clearStaleState();
      this.manager.removeUser();
      this.cookieService.deleteAll();
    });
  }

  /**
   * Get user information
   * @param field user data
   */
  getUserDetail(field: string): string[] {
    return this.user.profile[field];
  }

  getUserDisplayName(): string {
    if (!this.user || !this.user.profile) {
      return '';
    }
    return `${this.getUserDetail('name')} (${this.getEmployeeId()})`;
  }

  /**
   * Get user id
   */
  getUserId(): number {
    const user = this.retrieveUser();
    if (user == null) {
      return 0;
    }
    return user.id;
  }

  /**
   * Get user - employee id
   */
  getEmployeeId(): string {
    const user = this.retrieveUser();
    return user.employeeId;
  }

  /**
   * Get user site id - TM1?
   */
  getUserNativeSite(): number {
    if (!this.user || !this.user.profile) {
      return 0;
    }
    return +this.getUserDetail('siteId');
  }

  /**
   * Start session after it expired
   */
  startSessionExpiry() {
    if (!this.stopSessionExpiringInterval) {
      this.isSessionExpiring = true;
      this.expiringTime = environment.sessionExpiry.countdown;
      this.expireInterval = setInterval(() => {
        this.expiringTime -= 1;
        if (this.isSessionExpiring === false) {
          return;
        } else if (this.expiringTime <= 0) {
          try {
            this.signOut();
          } catch (err) {
          } finally {
            this.stopSessionExpiry();
            this.loadingService.show(
              LoadingMessage.LoggedOutLogIn,
              LoadingIcon.Fussion,
              true,
              true
            );
            this.stopSessionExpiringInterval = true;
          }
        }
      }, 1000);
    }
  }

  stopSessionExpiry() {
    this.isSessionExpiring = false;
    clearInterval(this.expireInterval);
  }
}
