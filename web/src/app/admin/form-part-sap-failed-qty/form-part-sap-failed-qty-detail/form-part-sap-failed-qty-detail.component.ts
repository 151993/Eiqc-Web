/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormPartSAPFailedQtyService } from 'src/app/services/form-part-sap-failed-qty/form-part-sap-failed-qty.service';
import { environment } from 'src/environments/environment';
import { UpdateFormPartSAPFailedQtyModel } from 'src/app/model/form-part-sap-failed-qty/update-form-part-sap-failed-qty-model';
import { AddFormPartSAPFailedQtyModel } from 'src/app/model/form-part-sap-failed-qty/add-form-part-sap-failed-qty-model';
import { FormPartSAPFailedQty } from 'src/app/model/form-part-sap-failed-qty/form-part-sap-failed-qty';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-form-part-sap-failed-qty-detail',
  templateUrl: './form-part-sap-failed-qty-detail.component.html',
  styleUrls: ['./form-part-sap-failed-qty-detail.component.css']
})
export class FormPartSAPFailedQtyDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    gRSNo: 'gRSNo',
    pCCode: 'pCCode',
    failedQty: 'failedQty',
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: FormPartSAPFailedQtyService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormPartSAPFailedQty();
    this.initForm();
    this.cancelRoute = '/Admin/FormPartSAPFailedQty';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormPartSAPFailedQtyCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormPartSAPFailedQtyCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormPartSAPFailedQtyCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      gRSNo: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      failedQty: new FormControl(null),
      pCCode: new FormControl(Constants.Empty, [
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
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const formPartSAPFailedQty = new FormPartSAPFailedQty(data);

      this.formDetails = this.entity;
      this.entity = formPartSAPFailedQty;
      this.formInput.patchValue({
        id: formPartSAPFailedQty.id,
        gRSNo: formPartSAPFailedQty.grsNo,
        pCCode: formPartSAPFailedQty.pcCode,
        failedQty: formPartSAPFailedQty.failedQty,
        isEnabled: formPartSAPFailedQty.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormPartSAPFailedQtyModel {


    const updateFormPartSAPFailedQtyModel = new UpdateFormPartSAPFailedQtyModel();

    Automapper.map(this.entity, updateFormPartSAPFailedQtyModel);
    updateFormPartSAPFailedQtyModel.gRSNo = this.formInput.controls[this.properties.gRSNo].value;
    updateFormPartSAPFailedQtyModel.pCCode = this.formInput.controls[this.properties.pCCode].value;
    return updateFormPartSAPFailedQtyModel;
  }

  getAddModel(): AddFormPartSAPFailedQtyModel {


    const addFormPartSAPFailedQtyModel = new AddFormPartSAPFailedQtyModel();

    Automapper.map(this.entity, addFormPartSAPFailedQtyModel);
    addFormPartSAPFailedQtyModel.gRSNo = this.formInput.controls[this.properties.gRSNo].value;
    addFormPartSAPFailedQtyModel.pCCode = this.formInput.controls[this.properties.pCCode].value;


    return addFormPartSAPFailedQtyModel;
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
