/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { ParameterCategoryService } from 'src/app/services/parameter-category/parameter-category.service';
import { environment } from 'src/environments/environment';
import { UpdateParameterCategoryModel } from 'src/app/model/parameter-category/update-parameter-category-model';
import { AddParameterCategoryModel } from 'src/app/model/parameter-category/add-parameter-category-model';
import { ParameterCategory } from 'src/app/model/parameter-category/parameter-category';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {  Constants } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { PCCode } from 'src/app/model/pc-code/pc-code';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-parameter-category-detail',
  templateUrl: './parameter-category-detail.component.html',
  styleUrls: ['./parameter-category-detail.component.css']
})
export class ParameterCategoryDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    sequence: 'sequence',
    multiSampling: 'multiSampling',
    description: 'description',
    pCCode: 'pCCode',

  };
  data: PCCode[] = [];
  public pcCodeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'pcCode',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'pcCode',
    format: '${value.pcCode}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ParameterCategoryService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new ParameterCategory();
    this.initForm();
    this.cancelRoute = '/Admin/ParameterCategory';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminParameterCategoryCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminParameterCategoryCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminParameterCategoryCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
        validateWhiteSpace
      ]),
      pCCode: new FormControl(null),
      sequence: new FormControl(null),
      multiSampling: new FormControl(null),


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
      const parameterCategory = new ParameterCategory(data);

      this.formDetails = this.entity;
      this.entity = parameterCategory;
      this.formInput.patchValue({
        id: parameterCategory.id,
        sequence: parameterCategory.sequence,
        multiSampling: parameterCategory.multiSampling,
        description: parameterCategory.description,
        pCCode: parameterCategory.pcCode,

        isEnabled: parameterCategory.isEnabled,
      });

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateParameterCategoryModel {


    const pCCode = this.formInput.controls[this.properties.pCCode].value as PCCode;


    const updateParameterCategoryModel = new UpdateParameterCategoryModel();

    Automapper.map(this.entity, updateParameterCategoryModel);
    updateParameterCategoryModel.pCCodeId = pCCode.id;
    return updateParameterCategoryModel;
  }

  getAddModel(): AddParameterCategoryModel {


    const pCCode = this.formInput.controls[this.properties.pCCode].value as PCCode;


    const addParameterCategoryModel = new AddParameterCategoryModel();

    Automapper.map(this.entity, addParameterCategoryModel);

    addParameterCategoryModel.pCCodeId = pCCode.id;


    return addParameterCategoryModel;
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
