/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PartCAFService } from 'src/app/services/part-caf/part-caf.service';
import { environment } from 'src/environments/environment';
import { UpdatePartCAFModel } from 'src/app/model/part-caf/update-part-caf-model';
import { AddPartCAFModel } from 'src/app/model/part-caf/add-part-caf-model';
import { PartCAF } from 'src/app/model/part-caf/part-caf';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';


@Component({
  selector: 'app-part-caf-detail',
  templateUrl: './part-caf-detail.component.html',
  styleUrls: ['./part-caf-detail.component.css']
})
export class PartCAFDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    partNo: 'partNo',
    hyperlink: 'hyperlink',

  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: PartCAFService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PartCAF();
    this.initForm();
    this.cancelRoute = '/Admin/PartCAF';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      partNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      hyperlink: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),

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
      // In order to work properly need to add a delay
      setTimeout(() => {

      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const partCAF = new PartCAF(data);

      this.formDetails = this.entity;
      this.entity = partCAF;
      this.formInput.patchValue({
        id: partCAF.id,
        partNo: partCAF.partNo,
        hyperlink: partCAF.hyperlink,
        isEnabled: partCAF.isEnabled,
      });

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartCAFModel {
    const updatePartCAFModel = new UpdatePartCAFModel();
    Automapper.map(this.entity, updatePartCAFModel);

    return updatePartCAFModel;
  }

  getAddModel(): AddPartCAFModel {

    const addPartCAFModel = new AddPartCAFModel();
    Automapper.map(this.entity, addPartCAFModel);
    return addPartCAFModel;
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isPartNoModified() {
    return this.isModified(this.properties.partNo);
  }

  isPartNoEmpty() {
    return this.hasError(this.properties.partNo, ValidationErrorCodes.required);
  }

  isPartNoHasWhiteSpace() {
    return this.hasError(this.properties.partNo, ValidationErrorCodes.validateWhiteSpace);
  }



  isAsyncValidationPending() {
    // return

    // ;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
