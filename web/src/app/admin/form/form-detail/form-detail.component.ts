/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormService } from 'src/app/services/form/form.service';
import { environment } from 'src/environments/environment';
import { UpdateFormModel } from 'src/app/model/form/update-form-model';
import { AddFormModel } from 'src/app/model/form/add-form-model';
import { Form } from 'src/app/model/form/form';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { FormType } from 'src/app/model/form-type/form-type';
import { GRS } from 'src/app/model/grs/grs';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css']
})
export class FormDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    formType: 'formType',
    gRS: 'gRS',
    dPID: 'dPID',
    sampleQTY: 'sampleQTY',
    dateCode: 'dateCode',
    dateCodeActual: 'dateCodeActual',
    remark: 'remark',
    userName: 'userName',
    qN: 'qN',
    iPVersion: 'iPVersion',
    refDoc: 'refDoc',
    qNSoftcopy: 'qNSoftcopy',
    gRSNoType: 'gRSNoType',
    batchDC: 'batchDC',
    storageLoc: 'storageLoc',
    requireStatus: 'requireStatus',
    packQty: 'packQty',
    oddQtyPerBox: 'oddQtyPerBox',
    receivingInfo: 'receivingInfo',
    dANo: 'dANo',
    packSampleQty: 'packSampleQty',
    buyerID: 'buyerID',
    divisionId: 'divisionId',
    sAPDefectTypeID: 'sAPDefectTypeID',
    vISDefectTypeID: 'vISDefectTypeID',
    fUNDefectTypeID: 'fUNDefectTypeID',
    funMeasureTypeID: 'funMeasureTypeID',
    dIMDefectTypeID: 'dIMDefectTypeID',
    mPositionDefectTypeID: 'mPositionDefectTypeID',
    lPositionDefectTypeID: 'lPositionDefectTypeID',
    dateCodeDefectTypeID: 'dateCodeDefectTypeID',
    bowTwistDefectTypeID: 'bowTwistDefectTypeID',
    funParaDefectTypeID: 'funParaDefectTypeID',
    microDefectTypeID: 'microDefectTypeID',
    testReportDefectTypeID: 'testReportDefectTypeID',
    specDefectType: 'specDefectType',
    lastFormID: 'lastFormID',
    lockFlag: 'lockFlag',
    lockUser: 'lockUser',
    dCRequirement: 'dCRequirement',
  };
  data: FormType[] = [];
  public formTypeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'type',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'type',
    format: '${value.type}',
  };
  data1: GRS[] = [];
  public grsAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'grsNo',
    minLength: '1',
    suggestions: this.data1,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'grsNo',
    format: '${value.grsNo}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: FormService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new Form();
    this.initForm();
    this.cancelRoute = '/Admin/Form';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      formType: new FormControl(null),

      gRS: new FormControl(null),
      sampleQTY: new FormControl(null),
      dateCodeActual: new FormControl(null),
      requireStatus: new FormControl(null),
      packQty: new FormControl(null),
      packSampleQty: new FormControl(null),
      sAPDefectTypeID: new FormControl(null),
      vISDefectTypeID: new FormControl(null),
      fUNDefectTypeID: new FormControl(null),
      funMeasureTypeID: new FormControl(null),
      dIMDefectTypeID: new FormControl(null),
      mPositionDefectTypeID: new FormControl(null),
      lPositionDefectTypeID: new FormControl(null),
      dateCodeDefectTypeID: new FormControl(null),
      bowTwistDefectTypeID: new FormControl(null),
      funParaDefectTypeID: new FormControl(null),
      microDefectTypeID: new FormControl(null),
      testReportDefectTypeID: new FormControl(null),
      lastFormID: new FormControl(null),
      lockFlag: new FormControl(null),
      buyerID: new FormControl(null),
      divisionId: new FormControl(null),





      dPID: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      dateCode: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      remark: new FormControl(Constants.Empty, [
        Validators.maxLength(1000),
        validateWhiteSpace
      ]),
      userName: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      qN: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      iPVersion: new FormControl(Constants.Empty, [
        Validators.maxLength(100),
        validateWhiteSpace
      ]),
      refDoc: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      qNSoftcopy: new FormControl(Constants.Empty, [
        Validators.maxLength(100),
        validateWhiteSpace
      ]),
      gRSNoType: new FormControl(Constants.Empty, [
        Validators.maxLength(10),
        validateWhiteSpace
      ]),
      batchDC: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      storageLoc: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      oddQtyPerBox: new FormControl(Constants.Empty, [
        Validators.maxLength(100),
        validateWhiteSpace
      ]),
      receivingInfo: new FormControl(Constants.Empty, [
        Validators.maxLength(4000),
        validateWhiteSpace
      ]),
      dANo: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      specDefectType: new FormControl(Constants.Empty, [
        Validators.maxLength(2550),
        validateWhiteSpace
      ]),
      lockUser: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      dCRequirement: new FormControl(Constants.Empty, [
        Validators.maxLength(4000),
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
      const form = new Form(data);

      this.formDetails = this.entity;
      this.entity = form;
      this.formInput.patchValue({
        id: form.id,
        formType: form.formType,
        gRS: form.grs,
        dPID: form.dpid,
        sampleQTY: form.sampleQTY,
        dateCode: form.dateCode,
        dateCodeActual: form.dateCodeActual,
        remark: form.remark,
        userName: form.userName,
        qN: form.qn,
        refDoc: form.refDoc,
        qNSoftcopy: form.qnSoftcopy,
        gRSNoType: form.grsNoType,
        batchDC: form.batchDC,
        storageLoc: form.storageLoc,
        requireStatus: form.requireStatus,
        packQty: form.packQty,
        oddQtyPerBox: form.oddQtyPerBox,
        receivingInfo: form.receivingInfo,
        dANo: form.daNo,
        packSampleQty: form.packSampleQty,
        buyerID: form.buyerID,
        divisionId: form.divisionId,
        sAPDefectTypeID: form.sapDefectTypeID,
        vISDefectTypeID: form.vISDefectTypeID,
        fUNDefectTypeID: form.fUNDefectTypeID,
        funMeasureTypeID: form.funMeasureTypeID,
        dIMDefectTypeID: form.dIMDefectTypeID,
        mPositionDefectTypeID: form.mPositionDefectTypeID,
        lPositionDefectTypeID: form.lPositionDefectTypeID,
        dateCodeDefectTypeID: form.dateCodeDefectTypeID,
        bowTwistDefectTypeID: form.bowTwistDefectTypeID,
        funParaDefectTypeID: form.funParaDefectTypeID,
        microDefectTypeID: form.microDefectTypeID,
        testReportDefectTypeID: form.testReportDefectTypeID,
        specDefectType: form.specDefectType,
        lastFormID: form.lastFormID,
        lockFlag: form.lockFlag,
        lockUser: form.lockUser,
        dCRequirement: form.dcRequirement,
        isEnabled: form.isEnabled
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormModel {

    const formType = this.formInput.controls[this.properties.formType].value as FormType;
    const gRS = this.formInput.controls[this.properties.gRS].value as GRS;

    const updateFormModel = new UpdateFormModel();

    Automapper.map(this.entity, updateFormModel);
    updateFormModel.formTypeId = formType.id;
    updateFormModel.gRSId = gRS.id;
    updateFormModel.dPID = this.formInput.controls[this.properties.dPID].value;

    return updateFormModel;
  }

  getAddModel(): AddFormModel {

    const formType = this.formInput.controls[this.properties.formType].value as FormType;
    const gRS = this.formInput.controls[this.properties.gRS].value as GRS;

    const addFormModel = new AddFormModel();

    Automapper.map(this.entity, addFormModel);

    addFormModel.formTypeId = formType.id;
    addFormModel.gRSId = gRS.id;
    addFormModel.dPID = this.formInput.controls[this.properties.dPID].value;
    return addFormModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isformTypeModified() {
    return this.isModified(this.properties.formType);
  }

  isformTypeEmpty() {
    return this.hasError(this.properties.formType, ValidationErrorCodes.required);
  }

  isformTypeHasWhiteSpace() {
    return this.hasError(this.properties.formType, ValidationErrorCodes.validateWhiteSpace);
  }

  isgrsModified() {
    return this.isModified(this.properties.gRS);
  }

  isgrsEmpty() {
    return this.hasError(this.properties.gRS, ValidationErrorCodes.required);
  }

  isgrsHasWhiteSpace() {
    return this.hasError(this.properties.gRS, ValidationErrorCodes.validateWhiteSpace);
  }

  isSampleQTYModified() {
    return this.isModified(this.properties.sampleQTY);
  }

  isSampleQTYEmpty() {
    return this.hasError(this.properties.sampleQTY, ValidationErrorCodes.required);
  }

  isSampleQTYHasWhiteSpace() {
    return this.hasError(this.properties.sampleQTY, ValidationErrorCodes.validateWhiteSpace);
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
