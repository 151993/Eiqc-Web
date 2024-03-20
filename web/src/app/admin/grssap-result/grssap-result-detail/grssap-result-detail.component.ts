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
import { GRSSAPResult } from 'src/app/model/grssap-result/grssap-result';
import { UpdateGRSSAPResultModel } from 'src/app/model/grssap-result/update-grssap-result-model';
import { AddGRSSAPResultModel } from 'src/app/model/grssap-result/add-grssap-result-model';
import { GRSSAPResultService } from 'src/app/services/grssap-result/grssap-result.service';

@Component({
  selector: 'app-grssapresult-detail',
  templateUrl: './grssap-result-detail.component.html',
  styleUrls: ['./grssap-result-detail.component.css']
})
export class GRSSAPResultDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  GRSSAPResult: GRSSAPResult;

  originalFormInput: string;
  autoCompleteGRSSAPResultValue: string;

  properties = {
    id: 'id',
    gRSNO: 'gRSNO',
    iSOK: 'iSOK',
    error: 'error',
    nTID: 'nTID',
    payLoad: 'payLoad'
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: GRSSAPResultService,
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
    this.GRSSAPResult = new GRSSAPResult();
    this.entity = this.GRSSAPResult;
    this.cancelRoute = '/Admin/GRSSAPResult';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminGRSSAPResultCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminGRSSAPResultCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminGRSSAPResultCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      gRSNO: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      iSOK: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
      ]
      ),
      error: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
      ]
      ),
      nTID: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
      ]
      ),
      payLoad: new FormControl(Constants.Empty, [
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
        //     this.GRSSAPResult.name,
        //     this.properties.name
        //   )
        // );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.GRSSAPResult = new GRSSAPResult(data);

      this.formDetails = this.entity;

      this.entity = this.GRSSAPResult;

      this.formInput.patchValue({
        id: this.GRSSAPResult.id,
        gRSNO: this.GRSSAPResult.gRSNO,
        iSOK: this.GRSSAPResult.iSOK,
        error: this.GRSSAPResult.error,
        nTID: this.GRSSAPResult.nTID,
        payLoad: this.GRSSAPResult.payLoad,
      });

      // this.formInput.controls[this.properties.name].setAsyncValidators(
      //   uniqueAsyncValidator(
      //     this.apiService,
      //     this.GRSSAPResult.name,
      //     this.properties.name
      //   )
      // );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateGRSSAPResultModel {
    const updateGRSSAPResultModel = new UpdateGRSSAPResultModel();
    Automapper.map(this.GRSSAPResult, updateGRSSAPResultModel);
    return updateGRSSAPResultModel;
  }

  getAddModel(): AddGRSSAPResultModel {
    const addGRSSAPResultModel = new AddGRSSAPResultModel();
    Automapper.map(this.GRSSAPResult, addGRSSAPResultModel);
    return addGRSSAPResultModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  isAsycValidationPending() {
    // return (
    //   this.formInput.controls[this.properties.name].status ===
    //   ControlStates.PENDING
    // );
  }

  // #GRSSAPResult name validations

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

  // #endGRSSAPResult

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }
}
