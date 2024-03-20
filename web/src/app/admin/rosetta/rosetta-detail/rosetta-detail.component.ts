import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RosettaService } from 'src/app/services/rosetta/rosetta.service';
import { UpdateRosettaModel } from 'src/app/model/rosetta/update-rosetta-model';
import { AddRosettaModel } from 'src/app/model/rosetta/add-rosetta-model';
import { Rosetta } from 'src/app/model/rosetta/rosetta';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {
  Constants
} from 'src/app/shared/constant/global';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-rosetta-detail',
  templateUrl: './rosetta-detail.component.html',
  styleUrls: ['./rosetta-detail.component.css']
})
export class RosettaDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  Rosetta: Rosetta;

  originalFormInput: string;
  autoCompleteRosettaValue: string;

  properties = {
    id: 'id',
    eN_US: 'eN_US',
    zH_CN: 'zH_CN'
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: RosettaService,
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
    this.Rosetta = new Rosetta();
    this.entity = this.Rosetta;
    this.cancelRoute = '/Admin/Rosetta';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminRosettaCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminRosettaCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminRosettaCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      eN_US: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      zH_CN: new FormControl(Constants.Empty, [
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
        //     this.Rosetta.name,
        //     this.properties.name
        //   )
        // );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.Rosetta = new Rosetta(data);

      this.formDetails = this.entity;

      this.entity = this.Rosetta;

      this.formInput.patchValue({
        id: this.Rosetta.id,
        eN_US: this.Rosetta.eN_US,
        zH_CN: this.Rosetta.zH_CN,
      });

      // this.formInput.controls[this.properties.name].setAsyncValidators(
      //   uniqueAsyncValidator(
      //     this.apiService,
      //     this.Rosetta.name,
      //     this.properties.name
      //   )
      // );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateRosettaModel {
    const updateRosettaModel = new UpdateRosettaModel();
    Automapper.map(this.Rosetta, updateRosettaModel);
    return updateRosettaModel;
  }

  getAddModel(): AddRosettaModel {
    const addRosettaModel = new AddRosettaModel();
    Automapper.map(this.Rosetta, addRosettaModel);
    return addRosettaModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  // isAsycValidationPending() {
  //   return (
  //     this.formInput.controls[this.properties.name].status ===
  //     ControlStates.PENDING
  //   );
  // }

  // #Rosetta name validations

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

  // #endRosetta

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }
}
