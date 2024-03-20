/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { InspectionService } from 'src/app/services/inspection/inspection.service';
import { environment } from 'src/environments/environment';
import { UpdateInspectionModel } from 'src/app/model/inspection/update-inspection-model';
import { AddInspectionModel } from 'src/app/model/inspection/add-inspection-model';
import { Inspection } from 'src/app/model/inspection/inspection';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Form } from 'src/app/model/form/form';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';


@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.component.html',
  styleUrls: ['./inspection-detail.component.css']
})
export class InspectionDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  properties = {
    id: 'id',
    form: 'form',
    inspector: 'inspector',
    inspectionResult: 'inspectionResult',
    reportFullName: 'reportFullName',

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
    private apiService: InspectionService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new Inspection();
    this.initForm();
    this.cancelRoute = '/Admin/Inspection';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminInspectionCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminInspectionCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminInspectionCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,

      form: new FormControl(null),
      inspector: new FormControl(Constants.Empty, [
        Validators.maxLength(20),
        validateWhiteSpace
      ]),
      inspectionResult: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      reportFullName: new FormControl(Constants.Empty, [
        Validators.maxLength(250),
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
      const inspection = new Inspection(data);

      this.formDetails = this.entity;
      this.entity = inspection;
      this.formInput.patchValue({
        id: inspection.id,
        form: inspection.form,
        inspector: inspection.inspector,
        inspectionResult: inspection.inspectionResult,
        reportFullName: inspection.reportFullName,

        isEnabled: inspection.isEnabled,
      });

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateInspectionModel {


    const form = this.formInput.controls[this.properties.form].value as Form;


    const updateInspectionModel = new UpdateInspectionModel();

    Automapper.map(this.entity, updateInspectionModel);
    updateInspectionModel.formId = form.id;


    return updateInspectionModel;
  }

  getAddModel(): AddInspectionModel {


    const form = this.formInput.controls[this.properties.form].value as Form;


    const addInspectionModel = new AddInspectionModel();

    Automapper.map(this.entity, addInspectionModel);


    addInspectionModel.formId = form.id;

    return addInspectionModel;
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
    return;
    // TO DO: Remove extra or(||)
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
