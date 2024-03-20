import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants } from 'src/app/shared/constant/global';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { LotInspectionQtyService } from 'src/app/services/lot-inspection-qty/lot-inspection-qty.service';
import { LotInspectionQty } from 'src/app/model/lot-inspection-qty/lot-inspection-qty';
import { UpdateLotInspectionQtyModel } from 'src/app/model/lot-inspection-qty/update-lot-inspection-qty-model';
import { AddLotInspectionQtyModel } from 'src/app/model/lot-inspection-qty/add-lot-inspection-qty-model';

@Component({
  selector: 'app-lotinspectionqty-detail',
  templateUrl: './lot-inspection-qty-detail.component.html',
  styleUrls: ['./lot-inspection-qty-detail.component.css']
})
export class LotInspectionQtyDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  LotInspectionQty: LotInspectionQty;

  originalFormInput: string;
  autoCompleteLotInspectionQtyValue: string;

  properties = {
    id: 'id',
    lotNo: 'lotNo',
    material: 'material',
    mstrChar: 'mstrChar',
    inspStg: 'inspStg',
    iNspectQty: 'iNspectQty'
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: LotInspectionQtyService,
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
    this.LotInspectionQty = new LotInspectionQty();
    this.entity = this.LotInspectionQty;
    this.cancelRoute = '/Admin/LotInspectionQty';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminLotInspectionQtyCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminLotInspectionQtyCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminLotInspectionQtyCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      lotNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      material: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
      ]
      ),
      mstrChar: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
      ]
      ),
      inspStg: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
      ]
      ),
      iNspectQty: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
      ]
      ),
      isEnabled: new FormControl(true, Validators.required)
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
        // this.formInput.controls[this.properties.name].setAsyncValidators(
        //   uniqueAsyncValidator(
        //     this.apiService,
        //     this.LotInspectionQty.name,
        //     this.properties.name
        //   )
        // );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.LotInspectionQty = new LotInspectionQty(data);

      this.formDetails = this.entity;

      this.entity = this.LotInspectionQty;

      this.formInput.patchValue({
        id: this.LotInspectionQty.id,
        lotNo: this.LotInspectionQty.lotNo,
        material: this.LotInspectionQty.material,
        mstrChar: this.LotInspectionQty.mstrChar,
        inspStg: this.LotInspectionQty.inspStg,
        iNspectQty: this.LotInspectionQty.iNspectQty
      });

      // this.formInput.controls[this.properties.name].setAsyncValidators(
      //   uniqueAsyncValidator(
      //     this.apiService,
      //     this.LotInspectionQty.name,
      //     this.properties.name
      //   )
      // );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateLotInspectionQtyModel {
    const inspectqty = this.formInput.controls[this.properties.iNspectQty].value;
    const updateLotInspectionQtyModel = new UpdateLotInspectionQtyModel();
    Automapper.map(this.LotInspectionQty, updateLotInspectionQtyModel);
    updateLotInspectionQtyModel.iNspectQty = inspectqty;
    return updateLotInspectionQtyModel;
  }

  getAddModel(): AddLotInspectionQtyModel {
    const inspectqty = this.formInput.controls[this.properties.iNspectQty].value;
    const addLotInspectionQtyModel = new AddLotInspectionQtyModel();
    Automapper.map(this.LotInspectionQty, addLotInspectionQtyModel);
    addLotInspectionQtyModel.iNspectQty = inspectqty;
    return addLotInspectionQtyModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  // isAsycValidationPending() {
  // return (
  //   this.formInput.controls[this.properties.name].status ===
  //   ControlStates.PENDING
  // );
  // }

  // #LotInspectionQty name validations

  // isNameEmpty() {
  //   return this.hasError(this.properties.name, ValidationErrorCodes.required);
  // }

  // isNameHasWhiteSpace() {
  //   return this.hasError(
  //     this.properties.name,
  //     ValidationErrorCodes.validateWhiteSpace
  //   );
  // }

  // isNameExists() {
  //   return this.hasError(
  //     this.properties.name,
  //     ValidationErrorCodes.alreadyExists
  //   );
  // }

  // isNameModified() {
  //   return this.isModified(this.properties.name);
  // }

  // #endLotInspectionQty

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }
}
