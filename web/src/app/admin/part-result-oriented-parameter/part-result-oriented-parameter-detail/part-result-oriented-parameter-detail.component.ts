/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { PartResultOrientedParameterService } from 'src/app/services/part-result-oriented-parameter/part-result-oriented-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdatePartResultOrientedParameterModel } from 'src/app/model/part-result-oriented-parameter/update-part-result-oriented-parameter-model';
import { AddPartResultOrientedParameterModel } from 'src/app/model/part-result-oriented-parameter/add-part-result-oriented-parameter-model';
import { PartResultOrientedParameter } from 'src/app/model/part-result-oriented-parameter/part-result-oriented-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Part } from 'src/app/model/part/part';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-part-result-oriented-parameter-detail',
  templateUrl: './part-result-oriented-parameter-detail.component.html',
  styleUrls: ['./part-result-oriented-parameter-detail.component.css']
})
export class PartResultOrientedParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    parameterName: 'parameterName',
    resultExpected: 'resultExpected',
    testCondition: 'testCondition',
    part: 'part'
  };
  part: Part;
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
    private apiService: PartResultOrientedParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new PartResultOrientedParameter();
    this.initForm();
    this.cancelRoute = '/Admin/PartResultOrientedParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminPartResultOrientedParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminPartResultOrientedParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminPartResultOrientedParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      part: new FormControl(null, [Validators.required]),
      resultExpected: new FormControl(true),
      parameterName: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(200),
        validateWhiteSpace
      ]),
      testCondition: new FormControl(Constants.Empty, [
        Validators.maxLength(200),
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
      const partResultOrientedParameter = new PartResultOrientedParameter(data);

      this.formDetails = this.entity;
      this.entity = partResultOrientedParameter;
      this.formInput.patchValue({
        id: partResultOrientedParameter.id,
        parameterName: partResultOrientedParameter.parameterName,
        resultExpected: partResultOrientedParameter.resultExpected,
        testCondition: partResultOrientedParameter.testCondition,
        part: partResultOrientedParameter.part,
        isEnabled: partResultOrientedParameter.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdatePartResultOrientedParameterModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const updatePartResultOrientedParameterModel = new UpdatePartResultOrientedParameterModel();

    Automapper.map(this.entity, updatePartResultOrientedParameterModel);
    updatePartResultOrientedParameterModel.partNo = partNo.partNo;
    return updatePartResultOrientedParameterModel;
  }

  getAddModel(): AddPartResultOrientedParameterModel {

    const partNo = this.formInput.controls[this.properties.part].value as Part;

    const addPartResultOrientedParameterModel = new AddPartResultOrientedParameterModel();

    Automapper.map(this.entity, addPartResultOrientedParameterModel);

    addPartResultOrientedParameterModel.partNo = partNo.partNo;

    return addPartResultOrientedParameterModel;
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isPartNoModified() {
    return this.isModified(this.properties.part);
  }

  isPartNoEmpty() {
    return this.hasError(this.properties.part, ValidationErrorCodes.required);
  }


  isParameterNameEmpty() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.required);
  }

  isParameterNameHasWhiteSpace() {
    return this.hasError(this.properties.parameterName, ValidationErrorCodes.validateWhiteSpace);
  }

  isResultExpectedModified() {
    return this.isModified(this.properties.resultExpected);
  }

  isResultExpectedEmpty() {
    return this.hasError(this.properties.resultExpected, ValidationErrorCodes.required);
  }

  isResultExpectedHasWhiteSpace() {
    return this.hasError(this.properties.resultExpected, ValidationErrorCodes.validateWhiteSpace);
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
