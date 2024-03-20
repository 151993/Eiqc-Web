/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { CommodityCategoryService } from 'src/app/services/commodity-category/commodity-category.service';
import { environment } from 'src/environments/environment';
import { UpdateCommodityCategoryModel } from 'src/app/model/commodity-category/update-commodity-category-model';
import { AddCommodityCategoryModel } from 'src/app/model/commodity-category/add-commodity-category-model';
import { CommodityCategory } from 'src/app/model/commodity-category/commodity-category';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-commodity-category-detail',
  templateUrl: './commodity-category-detail.component.html',
  styleUrls: ['./commodity-category-detail.component.css']
})
export class CommodityCategoryDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    name: 'name'
  };
  originalFormInput: string;
  commodityCategory: CommodityCategory;
  @Input() categoryTypeId: number;
  @Input() categoryOptionId: number;
  @Output() categoryTextValue = new EventEmitter<string>();
  constructor(
    private formBuilder: FormBuilder,
    private apiService: CommodityCategoryService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.commodityCategory = new CommodityCategory();
    this.entity = this.commodityCategory;
    this.initForm();

    this.getUpdateModelFn = this.getAddModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminCommodityCategoryCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminCommodityCategoryCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminCommodityCategoryCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl(Constants.Empty, [
        Validators.required,
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
        this.formInput.controls[this.properties.name].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.commodityCategory.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);
      return;
    }

  }

  saveForm() {
    this.entity.loadFromInput(this.formInput);
    this.entity.trimAll();

    this.showChangeReasonModal().result.then((changeReason) => {

      const addModel = this.getAddModelFn();
      addModel.changeReason = changeReason;
      this.apiService.addData(addModel).subscribe(() => {
        this.postSaved();
      });

    });
  }

  getUpdateModel(): UpdateCommodityCategoryModel {

    const updateCommodityCategoryModel = new UpdateCommodityCategoryModel();

    Automapper.map(this.entity, updateCommodityCategoryModel);
    return updateCommodityCategoryModel;
  }

  getAddModel(): AddCommodityCategoryModel {

    const addCommodityCategoryModel = new AddCommodityCategoryModel();

    Automapper.map(this.entity, addCommodityCategoryModel);
    addCommodityCategoryModel.name = this.extractName();
    addCommodityCategoryModel.commodityCategoryTypeId = this.categoryTypeId;
    addCommodityCategoryModel.commodityCategoryOptionId = this.categoryOptionId;
    this.clearForm();
    return addCommodityCategoryModel;
  }

  extractName() {
    return this.formInput.controls[this.properties.name].value.split('-')[1];
  }

  categoryValue(value) {
    this.categoryTextValue.emit(value);
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isNameModified() {
    return this.isModified(this.properties.name);
  }

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameHasWhiteSpace() {
    return this.hasError(this.properties.name, ValidationErrorCodes.validateWhiteSpace);
  }

  isNameExists() {
    return this.hasError(this.properties.name, ValidationErrorCodes.alreadyExists);
  }

  clearForm() {
    this.formInput.reset();
  }



  isAsyncValidationPending() {
    return (
      this.formInput.controls[this.properties.name].status ===
      ControlStates.PENDING
    );
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
