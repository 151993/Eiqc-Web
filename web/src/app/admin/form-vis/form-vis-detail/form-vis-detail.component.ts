/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormVISService } from 'src/app/services/form-vis/form-vis.service';
import { environment } from 'src/environments/environment';
import { UpdateFormVISModel } from 'src/app/model/form-vis/update-form-vis-model';
import { AddFormVISModel } from 'src/app/model/form-vis/add-form-vis-model';
import { FormVIS } from 'src/app/model/form-vis/form-vis';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
@Component({
  selector: 'app-form-vis-detail',
  templateUrl: './form-vis-detail.component.html',
  styleUrls: ['./form-vis-detail.component.css']
})
export class FormVISDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    acceptanceQTY: 'acceptanceQTY',
    totalFailedQTY: 'totalFailedQTY',
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
    private apiService: FormVISService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormVIS();
    this.initForm();
    this.cancelRoute = '/Admin/FormVIS';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminFormVISCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormVISCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormVISCanCreate;
  }
  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      form: new FormControl(null),
      acceptanceQTY: new FormControl(null),
      totalFailedQTY: new FormControl(null),
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
      const formVIS = new FormVIS(data);
      this.formDetails = this.entity;
      this.entity = formVIS;
      this.formInput.patchValue({
        id: formVIS.id,
        form: formVIS.form,
        acceptanceQTY: formVIS.acceptanceQTY,
        totalFailedQTY: formVIS.totalFailedQTY,
        isEnabled: formVIS.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }
  getUpdateModel(): UpdateFormVISModel {
    const form = this.formInput.controls[this.properties.form].value as Form;
    const updateFormVISModel = new UpdateFormVISModel();
    Automapper.map(this.entity, updateFormVISModel);
    updateFormVISModel.formId = form.id;
    updateFormVISModel.acceptanceQTY = this.formInput.controls[this.properties.acceptanceQTY].value;
    updateFormVISModel.totalFailedQTY = this.formInput.controls[this.properties.totalFailedQTY].value;
    return updateFormVISModel;
  }
  getAddModel(): AddFormVISModel {
    const form = this.formInput.controls[this.properties.form].value as Form;
    const addFormVISModel = new AddFormVISModel();
    Automapper.map(this.entity, addFormVISModel);
    addFormVISModel.formId = form.id;
    addFormVISModel.acceptanceQTY = this.formInput.controls[this.properties.acceptanceQTY].value;
    addFormVISModel.totalFailedQTY = this.formInput.controls[this.properties.totalFailedQTY].value;
    return addFormVISModel;
  }
  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }
  isFormModified() {
    return this.isModified(this.properties.form);
  }
  isformEmpty() {
    return this.hasError(this.properties.form, ValidationErrorCodes.required);
  }
  isformHasWhiteSpace() {
    return this.hasError(this.properties.form, ValidationErrorCodes.validateWhiteSpace);
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
