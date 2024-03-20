/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { GRSService } from 'src/app/services/grs/grs.service';
import { environment } from 'src/environments/environment';
import { UpdateGRSModel } from 'src/app/model/grs/update-grs-model';
import { AddGRSModel } from 'src/app/model/grs/add-grs-model';
import { GRS } from 'src/app/model/grs/grs';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Part } from 'src/app/model/part/part';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-grs-detail',
  templateUrl: './grs-detail.component.html',
  styleUrls: ['./grs-detail.component.css']
})
export class GRSDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    gRSNo: 'gRSNo',
    medialCode: 'medialCode',
    mPN: 'mPN',
    materialName: 'materialName',
    mFG: 'mFG',
    quantity: 'quantity',
    lotNo: 'lotNo',
    inspectQty: 'inspectQty',
    rejectionQty: 'rejectionQty',
    inspectorName: 'inspectorName',
    inspectionResult: 'inspectionResult',
    gRSNoType: 'gRSNoType',
    part: 'part',
    vendorCode: 'vendorCode',
    matlGroup: 'matlGroup',
    vendorName1: 'vendorName1',
    skipIQC: 'skipIQC',
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
    private apiService: GRSService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new GRS();
    this.initForm();
    this.cancelRoute = '/Admin/GRS';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminGRSCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminGRSCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminGRSCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      gRSNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(20),
        validateWhiteSpace
      ]),

      part: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null),
      inspectQty: new FormControl(null),
      rejectionQty: new FormControl(null),
      pO: new FormControl(null),


      medialCode: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      mPN: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      materialName: new FormControl(Constants.Empty, [
        Validators.maxLength(100),
        validateWhiteSpace
      ]),
      mFG: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      lotNo: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      inspectorName: new FormControl(Constants.Empty, [
        Validators.maxLength(8000),
        validateWhiteSpace
      ]),
      inspectionResult: new FormControl(Constants.Empty, [
        Validators.maxLength(8000),
        validateWhiteSpace
      ]),
      gRSNoType: new FormControl(Constants.Empty, [
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      vendorCode: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      matlGroup: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      vendorName1: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      skipIQC: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
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
        this.formInput.controls[this.properties.gRSNo].setAsyncValidators(uniqueAsyncValidator(this.apiService, Constants.Empty, this.properties.gRSNo));
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const gRS = new GRS(data);

      this.formDetails = this.entity;
      this.entity = gRS;
      this.formInput.patchValue({
        id: gRS.id,
        gRSNo: gRS.grsNo,
        medialCode: gRS.medialCode,
        mPN: gRS.mpn,
        materialName: gRS.materialName,
        mFG: gRS.mfg,
        quantity: gRS.quantity,
        lotNo: gRS.lotNo,
        inspectQty: gRS.inspectQty,
        rejectionQty: gRS.rejectionQty,
        inspectorName: gRS.inspectorName,
        inspectionResult: gRS.inspectionResult,
        gRSNoType: gRS.gRSNoType,
        vendorCode: gRS.vendorCode,
        matlGroup: gRS.matlGroup,
        vendorName1: gRS.vendorName1,
        skipIQC: gRS.skipIQC,
        isEnabled: gRS.isEnabled,
        part: gRS.part
      });
      this.formInput.controls[this.properties.gRSNo].setAsyncValidators(uniqueAsyncValidator(this.apiService, gRS.grsNo, this.properties.gRSNo));
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateGRSModel {
    const partNo = this.formInput.controls[this.properties.part].value as Part;


    const updateGRSModel = new UpdateGRSModel();

    Automapper.map(this.entity, updateGRSModel);
    updateGRSModel.partNo = partNo.partNo;
    updateGRSModel.gRSNo = this.formInput.controls[this.properties.gRSNo].value;
    return updateGRSModel;
  }

  getAddModel(): AddGRSModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const addGRSModel = new AddGRSModel();

    Automapper.map(this.entity, addGRSModel);

    addGRSModel.partNo = partNo.partNo;
    addGRSModel.gRSNo = this.formInput.controls[this.properties.gRSNo].value;

    return addGRSModel;
  }


  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isGRSNoModified() {
    return this.isModified(this.properties.gRSNo);
  }

  isGRSNoEmpty() {
    return this.hasError(this.properties.gRSNo, ValidationErrorCodes.required);
  }

  isGRSNoHasWhiteSpace() {
    return this.hasError(this.properties.gRSNo, ValidationErrorCodes.validateWhiteSpace);
  }

  isGRSNoExists() {
    return this.hasError(this.properties.gRSNo, ValidationErrorCodes.alreadyExists);
  } isPartModified() {
    return this.isModified(this.properties.part);
  }

  isPartEmpty() {
    return this.hasError(this.properties.part, ValidationErrorCodes.required);
  }


  isAsyncValidationPending() {
    return this.formInput.controls[this.properties.gRSNo].status === ControlStates.PENDING;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
