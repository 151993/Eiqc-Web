/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormSpecialParameterService } from 'src/app/services/form-special-parameter/form-special-parameter.service';
import { environment } from 'src/environments/environment';
import { UpdateFormSpecialParameterModel } from 'src/app/model/form-special-parameter/update-form-special-parameter-model';
import { AddFormSpecialParameterModel } from 'src/app/model/form-special-parameter/add-form-special-parameter-model';
import { FormSpecialParameter } from 'src/app/model/form-special-parameter/form-special-parameter';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-form-special-parameter-detail',
  templateUrl: './form-special-parameter-detail.component.html',
  styleUrls: ['./form-special-parameter-detail.component.css']
})
export class FormSpecialParameterDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    form: 'form',
    result: 'result',
    parameterName: 'parameterName',
    resultDesc: 'resultDesc'
  };
  data: Form[] = [];
  public formAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'dateCode',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'dateCode',
    format: '${value.dateCode}',
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: FormSpecialParameterService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormSpecialParameter();
    this.initForm();
    this.cancelRoute = '/Admin/FormSpecialParameter';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormSpecialParameterCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormSpecialParameterCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormSpecialParameterCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      result: new FormControl(null),
      parameterName: new FormControl(null),
      resultDesc: new FormControl(null),
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
      const formSpecialParameter = new FormSpecialParameter(data);

      this.formDetails = this.entity;
      this.entity = formSpecialParameter;
      this.formInput.patchValue({
        id: formSpecialParameter.id,
        form: formSpecialParameter.form,
        parameterName: formSpecialParameter.parameterName,
        resultDesc: formSpecialParameter.resultDesc,
        result: formSpecialParameter.result,



        isEnabled: formSpecialParameter.isEnabled,
      });


      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormSpecialParameterModel {


    const form = this.formInput.controls[this.properties.form].value as Form;


    const updateFormSpecialParameterModel = new UpdateFormSpecialParameterModel();

    Automapper.map(this.entity, updateFormSpecialParameterModel);
    updateFormSpecialParameterModel.formId = form.id;

    return updateFormSpecialParameterModel;
  }

  getAddModel(): AddFormSpecialParameterModel {


    const form = this.formInput.controls[this.properties.form].value as Form;


    const addFormSpecialParameterModel = new AddFormSpecialParameterModel();

    Automapper.map(this.entity, addFormSpecialParameterModel);


    addFormSpecialParameterModel.formId = form.id;


    return addFormSpecialParameterModel;
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
