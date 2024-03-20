/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { FormPartDateCodeService } from 'src/app/services/form-part-date-code/form-part-date-code.service';
import { environment } from 'src/environments/environment';
import { UpdateFormPartDateCodeModel } from 'src/app/model/form-part-date-code/update-form-part-date-code-model';
import { AddFormPartDateCodeModel } from 'src/app/model/form-part-date-code/add-form-part-date-code-model';
import { FormPartDateCode } from 'src/app/model/form-part-date-code/form-part-date-code';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
@Component({
  selector: 'app-form-part-date-code-detail',
  templateUrl: './form-part-date-code-detail.component.html',
  styleUrls: ['./form-part-date-code-detail.component.css']
})
export class FormPartDateCodeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    form: 'form',
    requirement: 'requirement',
    supplierDC: 'supplierDC',
    mFGDate: 'mFGDate',
    result: 'result',
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
    private apiService: FormPartDateCodeService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new FormPartDateCode();
    this.initForm();
    this.cancelRoute = '/Admin/FormPartDateCode';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminFormPartDateCodeCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminFormPartDateCodeCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminFormPartDateCodeCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      requirement: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      supplierDC: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      mFGDate: new FormControl(Constants.Empty, [
        Validators.maxLength(100),
        validateWhiteSpace
      ]),
      result: new FormControl(Constants.Empty, [
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
      const formPartDateCode = new FormPartDateCode(data);

      this.formDetails = this.entity;
      this.entity = formPartDateCode;
      this.formInput.patchValue({
        id: formPartDateCode.id,
        form: formPartDateCode.form,
        requirement: formPartDateCode.requirement,
        supplierDC: formPartDateCode.supplierDC,
        mFGDate: formPartDateCode.mfgDate,
        result: formPartDateCode.result,
        isEnabled: formPartDateCode.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateFormPartDateCodeModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const updateFormPartDateCodeModel = new UpdateFormPartDateCodeModel();

    Automapper.map(this.entity, updateFormPartDateCodeModel);
    updateFormPartDateCodeModel.formId = form.id;
    updateFormPartDateCodeModel.mFGDate = this.formInput.controls[this.properties.mFGDate].value;

    return updateFormPartDateCodeModel;
  }

  getAddModel(): AddFormPartDateCodeModel {

    const form = this.formInput.controls[this.properties.form].value as Form;

    const addFormPartDateCodeModel = new AddFormPartDateCodeModel();

    Automapper.map(this.entity, addFormPartDateCodeModel);

    addFormPartDateCodeModel.formId = form.id;
    addFormPartDateCodeModel.mFGDate = this.formInput.controls[this.properties.mFGDate].value;
    return addFormPartDateCodeModel;
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
