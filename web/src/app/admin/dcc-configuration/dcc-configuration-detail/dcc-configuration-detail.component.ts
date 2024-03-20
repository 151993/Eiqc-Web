/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { DCCConfigurationService } from 'src/app/services/dcc-configuration/dcc-configuration.service';
import { environment } from 'src/environments/environment';
import { UpdateDCCConfigurationModel } from 'src/app/model/dcc-configuration/update-dcc-configuration-model';
import { AddDCCConfigurationModel } from 'src/app/model/dcc-configuration/add-dcc-configuration-model';
import { DCCConfiguration } from 'src/app/model/dcc-configuration/dcc-configuration';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants, ValidationErrorCodes, ToastMessage } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Site } from 'src/app/model/site/site';

@Component({
  selector: 'app-dcc-configuration-detail',
  templateUrl: './dcc-configuration-detail.component.html',
  styleUrls: ['./dcc-configuration-detail.component.css']
})
export class DCCConfigurationDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    siteNo: 'siteNo',
    deptCode: 'deptCode',
    docLevel: 'docLevel',
    site: 'site',
  };
  dccConfiguration: DCCConfiguration;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: DCCConfigurationService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.dccConfiguration = new DCCConfiguration();
    this.entity = this.dccConfiguration;
    this.initForm();
    this.cancelRoute = '/Admin/DCCConfiguration';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminDCCConfigurationCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminDCCConfigurationCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminDCCConfigurationCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      siteNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      deptCode: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      docLevel: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),

      site: new FormControl(null, Validators.required),
      isEnabled: new FormControl(true, Validators.required),
      changeReason: new FormControl(Constants.Empty)
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData();
  }

  getData() {
    // If create mode then return
    if (this.recId === null) {
      setTimeout(() => {
        this.formInput.controls[this.properties.siteNo].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.dccConfiguration.siteNo, this.properties.siteNo));
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const dCCConfiguration = new DCCConfiguration(data);

      this.formDetails = this.entity;
      this.entity = dCCConfiguration;
      this.formInput.patchValue({
        id: dCCConfiguration.id,
        siteNo: dCCConfiguration.siteNo,
        deptCode: dCCConfiguration.deptCode,
        docLevel: dCCConfiguration.docLevel,
        site: dCCConfiguration.site.name + ' - ' + dCCConfiguration.site.code,
        isEnabled: dCCConfiguration.isEnabled,
      });

      this.formInput.controls[this.properties.siteNo].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.dccConfiguration.siteNo, this.properties.siteNo));

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateDCCConfigurationModel {

    const site = this.formInput.controls[this.properties.site].value as Site;
    const updateDCCConfigurationModel = new UpdateDCCConfigurationModel();
    Automapper.map(this.entity, updateDCCConfigurationModel);
    updateDCCConfigurationModel.siteId = site.id;
    return updateDCCConfigurationModel;
  }

  getAddModel(): AddDCCConfigurationModel {

    const site = this.formInput.controls[this.properties.site].value as Site;
    const addDCCConfigurationModel = new AddDCCConfigurationModel();
    Automapper.map(this.entity, addDCCConfigurationModel);
    addDCCConfigurationModel.siteId = site.id;
    return addDCCConfigurationModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isSiteNoModified() {
    return this.isModified(this.properties.siteNo);
  }

  isSiteNoEmpty() {
    return this.hasError(this.properties.siteNo, ValidationErrorCodes.required);
  }

  isSiteNoExists() {
    return this.hasError(this.properties.siteNo, ValidationErrorCodes.alreadyExists);
  }

  isSiteNoHasWhiteSpace() {
    return this.hasError(this.properties.siteNo, ValidationErrorCodes.validateWhiteSpace);
  }

  isSiteModified() {
    return this.isModified(this.properties.site);
  }

  isSiteEmpty() {
    return this.hasError(this.properties.site, ValidationErrorCodes.required);
  }


  isAsyncValidationPending() {
    return this.formInput.controls[this.properties.siteNo].status === ControlStates.PENDING;
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

  onSiteSelect(event) {
    this.apiService.getAllData().subscribe(data => {
      const dataExist = data.value.filter(x => x.siteId === event.id);
      if (dataExist.length > 0 && dataExist !== null) {
        this.enableSaveButton = false;
        this.notificationService.showError(ToastMessage.DataExist);
      }
    });
  }
}
