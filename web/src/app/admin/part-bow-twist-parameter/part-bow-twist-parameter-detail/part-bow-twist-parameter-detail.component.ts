/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { environment } from 'src/environments/environment';

import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Part } from 'src/app/model/part/part';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import { UpdatePartInspectionBowTwistParameterModel } from 'src/app/model/part-inspection-bow-twist-parameter/update-part-inspection-bow-twist-parameter-model';
import { AddPartInspectionBowTwistParameterModel } from 'src/app/model/part-inspection-bow-twist-parameter/add-part-inspection-bow-twist-parameter-model';
import { PartInspectionBowTwistParameterService } from 'src/app/services/part-inspection-bow-twist-parameter/part-inspection-bow-twist-parameter.service';
import { PartInspectionBowTwistParameter } from 'src/app/model/part-inspection-bow-twist-parameter/part-inspection-bow-twist-parameter';

@Component({
  selector: 'app-part-bow-twist-parameter-detail',
  templateUrl: './part-bow-twist-parameter-detail.component.html',
  styleUrls: ['./part-bow-twist-parameter-detail.component.css']
})
export class PartInspectionBowTwistParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    part: 'part',
    warpType: 'warpType',
    spec: 'spec',
    length: 'length',
    width: 'width',
    unit: 'unit',
    upperLimit: 'upperLimit',
  };
  data: Part[] = [];
  public partAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'partNo',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'partNo',
    format: '${value.partNo}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: PartInspectionBowTwistParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PartInspectionBowTwistParameter();
    this.initForm();
    this.cancelRoute = '/Admin/PartInspectionBowTwistParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartBowTwistParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartBowTwistParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartBowTwistParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      part: new FormControl(null),
      warpType: new FormControl(null),

      spec: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      length: new FormControl(Constants.Empty, [
        Validators.maxLength(53),
        validateWhiteSpace
      ]),
      width: new FormControl(Constants.Empty, [
        Validators.maxLength(53),
        validateWhiteSpace
      ]),
      unit: new FormControl(Constants.Empty, [
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      upperLimit: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
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
      const partInspectionBowTwistParameter = new PartInspectionBowTwistParameter(data);

      this.formDetails = this.entity;
      this.entity = partInspectionBowTwistParameter;
      this.formInput.patchValue({
        id: partInspectionBowTwistParameter.id,
        spec: partInspectionBowTwistParameter.spec,
        length: partInspectionBowTwistParameter.length,
        width: partInspectionBowTwistParameter.width,
        unit: partInspectionBowTwistParameter.unit,
        upperLimit: partInspectionBowTwistParameter.upperLimit,
        isEnabled: partInspectionBowTwistParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartInspectionBowTwistParameterModel {


    const updatePartInspectionBowTwistParameterModel = new UpdatePartInspectionBowTwistParameterModel();

    Automapper.map(this.entity, updatePartInspectionBowTwistParameterModel);


    return updatePartInspectionBowTwistParameterModel;
  }

  getAddModel(): AddPartInspectionBowTwistParameterModel {

    const addPartInspectionBowTwistParameterModel = new AddPartInspectionBowTwistParameterModel();

    Automapper.map(this.entity, addPartInspectionBowTwistParameterModel);

    return addPartInspectionBowTwistParameterModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }


  isAsyncValidationPending() {
    return
      ;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
