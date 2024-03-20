/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PartDimensionService } from 'src/app/services/part-dimension/part-dimension.service';
import { environment } from 'src/environments/environment';
import { UpdatePartDimensionModel } from 'src/app/model/part-dimension/update-part-dimension-model';
import { AddPartDimensionModel } from 'src/app/model/part-dimension/add-part-dimension-model';
import { PartDimension } from 'src/app/model/part-dimension/part-dimension';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';


@Component({
  selector: 'app-part-dimension-detail',
  templateUrl: './part-dimension-detail.component.html',
  styleUrls: ['./part-dimension-detail.component.css']
})
export class PartDimensionDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    name: 'name',
    description: 'description',
  };
  partDimension: PartDimension;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: PartDimensionService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.partDimension = new PartDimension();
    this.entity = this.partDimension;
    this.initForm();
    this.cancelRoute = '/Admin/PartDimension';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartDimensionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartDimensionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartDimensionCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
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
        this.formInput.controls[this.properties.name].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.partDimension.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      const partDimension = new PartDimension(data);

      this.formDetails = this.entity;
      this.entity = partDimension;
      this.formInput.patchValue({
        id: partDimension.id,
        name: partDimension.name,
        description: partDimension.description,
        isEnabled: partDimension.isEnabled,
      });

      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.partDimension.name,
          this.properties.name
        )
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartDimensionModel {
    const updatePartDimensionModel = new UpdatePartDimensionModel();
    Automapper.map(this.entity, updatePartDimensionModel);
    return updatePartDimensionModel;
  }

  getAddModel(): AddPartDimensionModel {
    const addPartDimensionModel = new AddPartDimensionModel();
    Automapper.map(this.entity, addPartDimensionModel);
    return addPartDimensionModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

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

  isAsyncValidationPending() {
    return (
      this.formInput.controls[this.properties.name].status ===
      ControlStates.PENDING
    );
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }
}
