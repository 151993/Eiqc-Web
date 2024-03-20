import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { CommodityCategory } from 'src/app/model/commodity-category/commodity-category';
import { AddCommodityModel } from 'src/app/model/commodity/add-commodity-model';
import { Commodity } from 'src/app/model/commodity/commodity';
import { UpdateCommodityModel } from 'src/app/model/commodity/update-commodity-model';
import { CommodityService } from 'src/app/services/commodity/commodity.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { changeReasonModalConfig, commodityCategoryOption, commodityCategoryType, Constants, ControlStates, Options, PrimeNGDateSelectionMode, ToastMessage, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import { ChangeReasonModalComponent } from 'src/app/shared/controls/modal/change-reason-modal/change-reason-modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/controls/modal/confirmation-modal/confirmation-modal.component';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-commodity-detail',
  templateUrl: './commodity-detail.component.html',
  styleUrls: ['./commodity-detail.component.css'],
})
export class CommodityDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  minDate: Date = new Date();
  maxDate: Date = new Date();
  maxNumber: number;
  minNumber: number;
  size: number;
  minDigits: number;
  maxDigits: number;
  selectionModeSingle = PrimeNGDateSelectionMode.Single;
  commodity: Commodity;
  properties = {
    id: 'id',
    partNumber: 'partNumber',
    sapCommodityId: 'sapCommodityId',
    name: 'name',
    category: 'category',
    appearanceInspectionItem: 'appearanceInspectionItem',
    functionTestItem: 'functionTestItem',
    description: 'description',
    commodityValidFrom: 'commodityValidFrom',
    commodityValidTo: 'commodityValidTo',
    commodityCategory: 'commodityCategory'

  };

  public commodityNameAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'class',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'class',
    format: '${value.class}',
  };

  public commodityCategoryAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'category',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'category',
    format: '${value.category}',
  };

  public appearanceInspectionAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'intchar',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'intchar',
    format: '${value.intchar}',
  };

  public functionTestItemAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'charValue',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'charValue',
    format: '${value.charValue}',
  };
  categoryList: any = [];
  isOtherOption = false;
  categoryTypeId: number;
  categoryOptionId: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: CommodityService,
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
    this.commodity = new Commodity();
    this.entity = this.commodity;
    this.cancelRoute = '/Admin/Commodity';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminCommodityCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminCommodityCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminCommodityCanCreate;
    this.maxNumber = 99999;
    this.minNumber = 0;
    this.size = 200;
    this.minDigits = 2;
    this.maxDigits = 4;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      sapCommodityId: new FormControl(Constants.Empty
      ),
      partNumber: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]
      ),
      siteNumber: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]
      ),
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      category: new FormControl(Constants.Empty, [
        Validators.required
      ]
      ),
      commodityCategory: new FormControl(Constants.Empty, [
        Validators.required
      ]
      ),
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(150)
      ]
      ),
      appearanceInspectionItem: new FormControl(Constants.Empty, [
        Validators.maxLength(256)
      ]
      ),
      functionTestItem: new FormControl(Constants.Empty, [
        Validators.maxLength(256)
      ]
      ),
      commodityValidFrom: new FormControl(new Date(), Validators.required),
      commodityValidTo: new FormControl(new Date(), Validators.required),
      isEnabled: new FormControl(true, Validators.required)
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getDefaultCategory();
    this.getData();
  }

  clearCommodityNames() {
    this.formInput.reset();
  }

  getDefaultCategory() {
    this.categoryList = commodityCategoryOption;
    this.formInput.patchValue({
      category: this.categoryList[0].name
    });
    this.categoryOptionId = this.categoryList[0].id;
  }

  getData() {
    const partNo = super.getPartNoForCommodity();
    const siteNo = super.getSiteNoForCommodity();

    if (this.recId === null) {
      setTimeout(() => {
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.commodity = new Commodity(data);
      this.formDetails = this.entity;
      this.entity = this.commodity;
      this.formInput.patchValue({
        id: this.commodity.id,
        sapCommodityId: this.commodity.sapCommodityId,
        partNumber: partNo,
        siteNumber: siteNo,
        name: this.commodity.name,
        category: this.commodity.category ?? commodityCategoryOption[0].name,
        commodityCategory: this.getExtractCategoryName(this.commodity.commodityCategory),
        description: this.commodity.description,
        appearanceInspectionItem: this.commodity.appearanceInspectionItem,
        functionTestItem: this.commodity.functionTestItem,
        commodityValidFrom: this.commodity.commodityValidFrom ? new Date(this.commodity.commodityValidFrom) : null,
        commodityValidTo: this.commodity.commodityValidTo ? new Date(this.commodity.commodityValidTo) : null,
        isEnabled: this.commodity.isEnabled
      });

      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.commodity.name,
          this.properties.name
        )
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getExtractCategoryName(commodityCategory) {
    if (commodityCategory !== null && commodityCategory.commodityCategoryTypeId !== null) {
      const commodityTypeName = commodityCategory.commodityCategoryTypeId === commodityCategoryType[0].id ? commodityCategoryType[0].name : commodityCategoryType[1].name;
      return commodityCategory.name = `${commodityTypeName}${'-'}${commodityCategory.name}`;
    } else {
      return commodityCategory && commodityCategory.name ? commodityCategory.name : '';
    }
  }

  onCommodityNameSelect(event) {
    this.commodity.name = event.class;
    this.commodity.commodityValidFrom = event.validFrom;
    this.commodity.commodityValidTo = event.validTo;
    this.formInput.patchValue({ name: event.class });
    this.formInput.patchValue({ commodityValidFrom: new Date(event.validFrom) });
    this.formInput.patchValue({ commodityValidTo: new Date(event.validTo) });
  }

  onCommodityCategorySelect(event) {
    this.commodity.category = event.category;
    this.formInput.patchValue({ category: event.category });
  }

  onCommodityAppearanceSelect(event) {
    this.commodity.appearanceInspectionItem = event.intchar;
    this.formInput.patchValue({ appearanceInspectionItem: event.intchar });
  }

  onCommodityFunctionTestItemSelect(event) {
    this.commodity.functionTestItem = event.charValue;
    this.formInput.patchValue({ functionTestItem: event.charValue });
  }

  openChangeReasonModal() {
    return this.modalService.open(
      ChangeReasonModalComponent,
      changeReasonModalConfig
    );
  }

  showConfirmationModal() {
    this.openConfirmationModal().result.then(
      (response) => {
        this.notificationService.showInfo(
          ToastMessage.Blank,
          `You have selected : ${response}`
        );
      },
      () => { }
    );
  }

  openConfirmationModal() {
    return this.modalService.open(ConfirmationModalComponent);
  }

  showCustomConfirmationModal() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Message.DemoOverrideConfirmMessage';
  }

  getUpdateModel(): UpdateCommodityModel {
    const commodityCategory = this.formInput.controls[this.properties.commodityCategory].value as CommodityCategory;
    const updateCommodityModel = new UpdateCommodityModel();
    Automapper.map(this.commodity, updateCommodityModel);
    updateCommodityModel.commodityCategoryId = commodityCategory.id;
    updateCommodityModel.commodityCategoryOptionId = this.formInput.controls[this.properties.category].value === commodityCategoryOption[0].name
      ? commodityCategoryOption[0].id : commodityCategoryOption[1].id;
    return updateCommodityModel;
  }

  getAddModel(): AddCommodityModel {
    const commodityCategory = this.formInput.controls[this.properties.commodityCategory].value as CommodityCategory;
    const addCommodityModel = new AddCommodityModel();
    Automapper.map(this.commodity, addCommodityModel);
    addCommodityModel.commodityCategoryId = commodityCategory.id;
    addCommodityModel.commodityCategoryOptionId = this.formInput.controls[this.properties.category].value === commodityCategoryOption[0].name
      ? commodityCategoryOption[0].id : commodityCategoryOption[1].id;

    return addCommodityModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  isAsycValidationPending() {
    return (
      this.formInput.controls[this.properties.name].status ===
      ControlStates.PENDING
    );
  }

  //#region name validations

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameExists() {
    return this.hasError(
      this.properties.name,
      ValidationErrorCodes.alreadyExists
    );
  }

  isNameModified() {
    return this.isModified(this.properties.name);
  }

  isNameHasWhiteSpace() {
    return this.hasError(this.properties.name, ValidationErrorCodes.validateWhiteSpace);
  }


  isPartNoEmpty() {
    return this.hasError(this.properties.partNumber, ValidationErrorCodes.required);
  }
  isPartNoModified() {
    return this.isModified(this.properties.partNumber);
  }
  isPartNoHasWhiteSpace() {
    return this.hasError(this.properties.partNumber, ValidationErrorCodes.validateWhiteSpace);
  }


  isCommodityIdEmpty() {
    return this.hasError(this.properties.sapCommodityId, ValidationErrorCodes.required);
  }
  isCommodityIdModified() {
    return this.isModified(this.properties.sapCommodityId);
  }
  isCommodityIdHasWhiteSpace() {
    return this.hasError(this.properties.sapCommodityId, ValidationErrorCodes.validateWhiteSpace);
  }

  isCommodityCategoryEmpty() {
    return this.hasError(this.properties.commodityCategory, ValidationErrorCodes.required);
  }
  isCommodityCategoryModified() {
    return this.isModified(this.properties.commodityCategory);
  }

  isDescriptionEmpty() {
    return this.hasError(this.properties.description, ValidationErrorCodes.required);
  }
  isDescriptionModified() {
    return this.isModified(this.properties.description);
  }
  isDescriptionHasWhiteSpace() {
    return this.hasError(this.properties.description, ValidationErrorCodes.validateWhiteSpace);
  }

  isAppearanceInspectionEmpty() {
    return this.hasError(this.properties.appearanceInspectionItem, ValidationErrorCodes.required);
  }
  isAppearanceInspectionModified() {
    return this.isModified(this.properties.appearanceInspectionItem);
  }
  isAppearanceInspectionHasWhiteSpace() {
    return this.hasError(this.properties.appearanceInspectionItem, ValidationErrorCodes.validateWhiteSpace);
  }

  isCommodityValidFromEmpty() {
    return this.hasError(this.properties.commodityValidFrom, ValidationErrorCodes.required);
  }
  isCommodityValidFromModified() {
    return this.isModified(this.properties.commodityValidFrom);
  }
  isCommodityValidFromHasWhiteSpace() {
    return this.hasError(this.properties.commodityValidFrom, ValidationErrorCodes.validateWhiteSpace);
  }

  isCommodityValidToEmpty() {
    return this.hasError(this.properties.commodityValidTo, ValidationErrorCodes.required);
  }
  isCommodityValidToModified() {
    return this.isModified(this.properties.commodityValidTo);
  }
  isCommodityValidToHasWhiteSpace() {
    return this.hasError(this.properties.commodityValidTo, ValidationErrorCodes.validateWhiteSpace);
  }

  //#endregion

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }

  onCommodityCategoryNameSelect(event) {
    const rowHightEle = document.getElementById('rowHight');
    if (event.name === Options.Other) {
      this.isOtherOption = true;
      if (this.isOtherOption) {
        rowHightEle.style.height = '230px';
      } else {
        rowHightEle.style.height = '0px';
      }
    } else {
      this.isOtherOption = false;
      rowHightEle.style.height = '0px';
    }


  }

  unselectCommodityCategoryName(event) {
    this.onCommodityCategoryNameSelect(false);
  }

  getCategoryTextValue(value) {
    if (value.toLowerCase().includes(commodityCategoryType[0].name.toLowerCase())) {
      this.categoryTypeId = commodityCategoryType[0].id;
      this.categoryOptionId = this.formInput.controls[this.properties.category].value === commodityCategoryOption[0].name ? commodityCategoryOption[0].id : commodityCategoryOption[1].id;
    } else if (value.toLowerCase().includes(commodityCategoryType[1].name.toLowerCase())) {
      this.categoryTypeId = commodityCategoryType[1].id;
      this.categoryOptionId = this.formInput.controls[this.properties.category].value === commodityCategoryOption[0].name ? commodityCategoryOption[0].id : commodityCategoryOption[1].id;
    } else {
      this.categoryTypeId = commodityCategoryType[0].id;
      this.categoryOptionId = commodityCategoryType[1].id;
    }
  }

  categoryChange(categoryName) {
    if (categoryName !== null) {
      this.categoryOptionId = categoryName === commodityCategoryOption[0].name ? commodityCategoryOption[0].id : commodityCategoryOption[1].id;
    } else {
      this.categoryOptionId = commodityCategoryOption[0].id;
    }
  }

}
