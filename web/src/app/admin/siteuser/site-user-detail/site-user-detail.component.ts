/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {
  ControlStates,
  ValidationErrorCodes,
  Constants,
  RoleType,
} from 'src/app/shared/constant/global';
import * as _ from 'lodash';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { User } from 'src/app/model/user/user';
import { SiteUser } from 'src/app/model/siteuser/site-user';
import { SiteUserService } from 'src/app/services/site-user/site-user.service';
import { UpdateSiteUserModel } from 'src/app/model/siteuser/update-site-user-model';
import { AddSiteUserModel } from 'src/app/model/siteuser/add-site-user-model';
import { Site } from 'src/app/model/site/site';

@Component({
  selector: 'app-site-user-detail',
  templateUrl: './site-user-detail.component.html',
  styleUrls: ['./site-user-detail.component.css']
})
export class SiteUserDetailComponent extends BaseDetailComponent
  implements OnInit {
  siteUser: SiteUser;
  originalFormInput: string;
  autoCompleteSiteUserValue: string;
  properties = {
    id: 'id',
    sites: 'sites',
    siteUserSme: 'siteUserSme'
  };
  siteUserSme: User[] = [];
  site: Site;
  originalUserIds: any;
  currentUser: any;
  siteCode: any;
  isSiteSME: boolean;
  constructor(
    private formBuilder: FormBuilder,
    apiService: SiteUserService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService
  ) {
    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService,
      apiService
    );
    this.initForm();
    this.siteUser = new SiteUser();
    this.entity = this.siteUser;
    this.cancelRoute = '/Admin';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSiteUserCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSiteUserCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSiteUserCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      sites: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)]),
      siteUserSme: new FormControl(Constants.Empty, Validators.required
      ),
    });
  }

  ngOnInit() {
    this.site = null;
    super.ngOnInit();
    this.currentUser = this.authService.retrieveUser();
    if (this.currentUser && this.currentUser.roles) {
      this.isSiteSME = this.currentUser.roles[0].roleEnumId === RoleType.Site_SME ? true : false;
    }
    this.siteCode = this.authService.retrieveSite().code;
  }

  getUpdateModel(): UpdateSiteUserModel {
    const updateSiteUserModel = new UpdateSiteUserModel();
    Automapper.map(this.siteUser, updateSiteUserModel);
    return updateSiteUserModel;
  }

  getAddModel(): AddSiteUserModel {
    const addSiteUserModel = new AddSiteUserModel();
    Automapper.map(this.siteUser, addSiteUserModel);
    const userIds = _.map(
      this.formInput.controls[this.properties.siteUserSme].value,
      this.properties.id
    );
    addSiteUserModel.site = this.formInput.controls[this.properties.sites].value;
    addSiteUserModel.addedSiteUserIds = this.getAddedUserIds(userIds);
    addSiteUserModel.isEnabled = true;
    return addSiteUserModel;
  }

  getAddedUserIds(userIds: number[]) {
    const added = _.difference(userIds, this.originalUserIds);
    return added;
  }

  getRemovedUserIds(userIds: number[]) {
    const removed = _.difference(this.originalUserIds, userIds);
    return removed;
  }

  onSiteSelect(event: Site) {
    this.site = event;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  isAsycValidationPending() {
    return (
      this.formInput.controls[this.properties.sites].status ===
      ControlStates.PENDING
    );
  }

  // SiteUser name validations

  isSiteEmpty() {
    return this.hasError(this.properties.sites, ValidationErrorCodes.required);
  }

  isSiteModified() {
    return this.isModified(this.properties.sites);
  }

  isUserEmpty() {
    return this.hasError(this.properties.siteUserSme, ValidationErrorCodes.required);
  }

  isUserModified() {
    return this.isModified(this.properties.siteUserSme);
  }

  // endSiteUser

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }
}
