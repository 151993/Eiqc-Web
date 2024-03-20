/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PCCodeService } from 'src/app/services/pc-code/pc-code.service';
import { environment } from 'src/environments/environment';
import { UpdatePCCodeModel } from 'src/app/model/pc-code/update-pc-code-model';
import { AddPCCodeModel } from 'src/app/model/pc-code/add-pc-code-model';
import { PCCode } from 'src/app/model/pc-code/pc-code';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';

@Component({
  selector: 'app-pc-code-detail',
  templateUrl: './pc-code-detail.component.html',
  styleUrls: ['./pc-code-detail.component.css']
})
export class PCCodeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    code: 'code',
    description: 'description',
  };
  pcCode: PCCode;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: PCCodeService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.pcCode = new PCCode();
    this.entity = this.pcCode;
    this.cancelRoute = '/Admin/PCCode';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminRegionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
    this.initForm();
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      code: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(255)
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
        this.formInput.controls[this.properties.code].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.pcCode.code,
            this.properties.code
          )
        );
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const pCCode = new PCCode(data);

      this.formDetails = this.entity;
      this.entity = pCCode;
      this.formInput.patchValue({
        id: pCCode.id,
        code: pCCode.code,
        description: pCCode.description,
        isEnabled: pCCode.isEnabled,
      });
      this.formInput.controls[this.properties.code].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.pcCode.code,
          this.properties.code
        )
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
  });
}

getUpdateModel(): UpdatePCCodeModel {
  const updatePCCodeModel = new UpdatePCCodeModel();
  Automapper.map(this.entity, updatePCCodeModel);
  return updatePCCodeModel;
}

getAddModel(): AddPCCodeModel {
  const addPCCodeModel = new AddPCCodeModel();
  Automapper.map(this.entity, addPCCodeModel);
  return addPCCodeModel;
}

isModified(controlName: string) {
  return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
}

isCodeModified() {
  return this.isModified(this.properties.code);
}

isCodeEmpty() {
  return this.hasError(this.properties.code, ValidationErrorCodes.required);
}

isCodeExists() {
  return this.hasError(this.properties.code, ValidationErrorCodes.alreadyExists);
}

isCodeHasWhiteSpace() {
  return this.hasError(this.properties.code, ValidationErrorCodes.validateWhiteSpace);
}


isAsyncValidationPending() {
  return (
    this.formInput.controls[this.properties.code].status ===
    ControlStates.PENDING
  );
}

isSaveDisabled() {
  return !this.enableSaveButton
    || !this.formInput.valid
    || !this.formInput.dirty;
}

}
