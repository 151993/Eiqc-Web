/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PartFunParameterService } from 'src/app/services/part-fun-parameter/part-fun-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdatePartFunParameterModel } from 'src/app/model/part-fun-parameter/update-part-fun-parameter-model';
import { AddPartFunParameterModel } from 'src/app/model/part-fun-parameter/add-part-fun-parameter-model';
import { PartFunParameter } from 'src/app/model/part-fun-parameter/part-fun-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Part } from 'src/app/model/part/part';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-part-fun-parameter-detail',
  templateUrl: './part-fun-parameter-detail.component.html',
  styleUrls: ['./part-fun-parameter-detail.component.css']
})
export class PartFunParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    requirement: 'requirement',
    supplierDC: 'supplierDC',
    mFGDate: 'mFGDate',
    result: 'result',
    part: 'part'
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
    private apiService: PartFunParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PartFunParameter();
    this.initForm();
    this.cancelRoute = '/Admin/PartFunParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartFunParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartFunParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartFunParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      part: new FormControl(null),
      requirement: new FormControl(Constants.Empty, [
        Validators.maxLength(100),
        validateWhiteSpace
      ]),
      supplierDC: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      mFGDate: new FormControl(Constants.Empty, [
        Validators.maxLength(53),
        validateWhiteSpace
      ]),
      result: new FormControl(Constants.Empty, [
        Validators.maxLength(53),
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
      const partFunParameter = new PartFunParameter(data);

      this.formDetails = this.entity;
      this.entity = partFunParameter;
      this.formInput.patchValue({
        id: partFunParameter.id,
        requirement: partFunParameter.requirement,
        supplierDC: partFunParameter.supplierDC,
        mFGDate: partFunParameter.mfgDate,
        result: partFunParameter.result,
        part: partFunParameter.part,
        isEnabled: partFunParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartFunParameterModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const updatePartFunParameterModel = new UpdatePartFunParameterModel();

    Automapper.map(this.entity, updatePartFunParameterModel);
    updatePartFunParameterModel.partNo = partNo.partNo;
    return updatePartFunParameterModel;
  }

  getAddModel(): AddPartFunParameterModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const addPartFunParameterModel = new AddPartFunParameterModel();

    Automapper.map(this.entity, addPartFunParameterModel);

    addPartFunParameterModel.partNo = partNo.partNo;

    return addPartFunParameterModel;
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
