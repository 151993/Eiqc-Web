/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartService } from 'src/app/services/part/part.service';
import { environment } from 'src/environments/environment';
import { UpdatePartModel } from 'src/app/model/part/update-part-model';
import { AddPartModel } from 'src/app/model/part/add-part-model';
import { Part } from 'src/app/model/part/part';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { TimeZonePipe } from 'src/app/shared/pipe/timezone';


@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.css']
})
export class PartDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    partNo: 'partNo',
    site: 'site',
    materialGroup: 'materialGroup',
    commodity: 'commodity',
    mpnMaterial: 'mpnMaterial',
    mediacode: 'mediacode',
    maskedMPN: 'maskedMPN',
    manufacturerType: 'manufacturerType',
    manufacturer: 'manufacturer',
    manufacturerCode: 'manufacturerCode',
    manufacturerPartNumber: 'manufacturerPartNumber',
    validFrom: 'validFrom',
    validTo: 'validTo',
    parts: 'parts'


  };
  isDisabled = true;
  parts: Part[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private apiService: PartService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    private datePipe: TimeZonePipe
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new Part();
    this.initForm();
    this.cancelRoute = '/Admin/Part';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      partNo: new FormControl({ value: '', disabled: true }),
      site: new FormControl({ value: '', disabled: true }),
      materialGroup: new FormControl({ value: '', disabled: true }),
      commodity: new FormControl({ value: '', disabled: true }),
      mpnMaterial: new FormControl({ value: '', disabled: true }),
      mediacode: new FormControl({ value: '', disabled: true }),
      maskedMPN: new FormControl({ value: '', disabled: true }),
      manufacturerType: new FormControl({ value: '', disabled: true }),
      manufacturer: new FormControl({ value: '', disabled: true }),
      manufacturerCode: new FormControl({ value: '', disabled: true }),
      manufacturerPartNumber: new FormControl({ value : null, disabled: true }),
      validFrom: new FormControl({ value: '', disabled: true }),
      validTo: new FormControl({ value: '', disabled: true }),
      parts: new FormControl(null),
      isEnabled: new FormControl(true, Validators.required),
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
        this.formInput.controls[this.properties.partNo].setAsyncValidators(uniqueAsyncValidator(this.apiService, Constants.Empty, this.properties.partNo));

      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getPartDataById(this.recId).subscribe(data => {
      const part = new Part(data);

      this.formDetails = this.entity;
      this.entity = part;
      this.formInput.patchValue({
        id: part.id,
        partNo: part.partNo,
        site: part.site,
        commodity: part.commodity,
        mpnMaterial: part.mpnMaterialHers,
        mediacode: part.mediaCode,
        maskedMPN: part.maskedMPN,
        manufacturer: part.manufacturer,
        manufacturerPartNumber: part.manufacturerPartNumber,
        parts: this.parts,
        isEnabled: part.isEnabled,
      });
      this.formInput.controls[this.properties.partNo].setAsyncValidators(uniqueAsyncValidator(this.apiService, part.partNo, this.properties.partNo));

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartModel {

    const updatePartModel = new UpdatePartModel();

    Automapper.map(this.entity, updatePartModel);

    updatePartModel.mpnMaterial = this.formInput.controls[this.properties.mpnMaterial].value;
    updatePartModel.site = this.formInput.controls[this.properties.site].value;

    return updatePartModel;
  }

  getAddModel(): AddPartModel {



    const addPartModel = new AddPartModel();

    Automapper.map(this.entity, addPartModel);

    addPartModel.mpnMaterial = this.formInput.controls[this.properties.mpnMaterial].value;
    addPartModel.site = this.formInput.controls[this.properties.site].value;

    return addPartModel;
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

  isPartNoExists() {
    return this.hasError(this.properties.partNo, ValidationErrorCodes.alreadyExists);
  }

  isAsyncValidationPending() {
    return this.formInput.controls[this.properties.partNo].status === ControlStates.PENDING;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    // return !this.enableSaveButton
    //   || !this.formInput.valid
    //   || !this.formInput.dirty;
  }

  getPartData(event) {
    const data = event[0];
    this.formInput.patchValue({
      partNo: data.partNo,
      site: data.site,
      materialGroup: data.materialGroup,
      commodity: data.commodity,
      mpnMaterial: data.mpnMaterial,
      mediacode: data.mediacode,
      maskedMPN: data.maskedMPN,
      manufacturerType: data.manufacturerType,
      manufacturer: data.manufacturer,
      manufacturerCode: data.manufacturerCode,
      manufacturerPartNumber: data.manufacturerPartNumber,
      validFrom: this.datePipe.transform(data.validFrom, false),
      validTo: this.datePipe.transform(data.validTo, false),
      parts: null
    });
  }

}
