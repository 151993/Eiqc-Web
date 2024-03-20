/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { UOMService } from 'src/app/services/uom/uom.service';
import { environment } from 'src/environments/environment';
import { UpdateUOMModel } from 'src/app/model/uom/update-uom-model';
import { AddUOMModel } from 'src/app/model/uom/add-uom-model';
import { UOM } from 'src/app/model/uom/uom';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';

@Component({
  selector: 'app-uom-detail',
  templateUrl: './uom-detail.component.html',
  styleUrls: ['./uom-detail.component.css']
})
export class UOMDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  uom: UOM;

  originalFormInput: string;
  properties = {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: UOMService,
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
    this.uom = new UOM();
    this.entity = this.uom;
    this.cancelRoute = '/Admin/UOM';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminUOMCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminUOMCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminUOMCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      description: new FormControl(Constants.Empty, [
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
        this.formInput.controls[this.properties.name].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.uom.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.uom = new UOM(data);

      this.formDetails = this.entity;

      this.entity = this.uom;

      this.formInput.patchValue({
        id: this.uom.id,
        name: this.uom.name,
        description: this.uom.description,
        isEnabled : this.uom.isEnabled
      });

      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.uom.name,
          this.properties.name
        )
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateUOMModel {
    const updateUOMModel = new UpdateUOMModel();
    Automapper.map(this.uom, updateUOMModel);
    return updateUOMModel;
  }

  getAddModel(): AddUOMModel {
    const addUOMModel = new AddUOMModel();
    Automapper.map(this.uom, addUOMModel);
    return addUOMModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  isAsyncValidationPending() {
    return (
      this.formInput.controls[this.properties.name].status ===
      ControlStates.PENDING
    );
  }

  // #uom name validations

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameHasWhiteSpace() {
    return this.hasError(
      this.properties.name,
      ValidationErrorCodes.validateWhiteSpace
    );
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

  // #end uom

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }

}
