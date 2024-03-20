/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { InstrumentService } from 'src/app/services/instrument/instrument.service';
import { environment } from 'src/environments/environment';
import { UpdateInstrumentModel } from 'src/app/model/instrument/update-instrument-model';
import { AddInstrumentModel } from 'src/app/model/instrument/add-instrument-model';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ControlStates, PrimeNGDateSelectionMode, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { InstrumentType } from 'src/app/model/instrument-type/instrument-type';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { Instrument } from 'src/app/model/instrument/instrument';


@Component({
  selector: 'app-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.css']
})
export class InstrumentDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    instrumentType: 'instrumentType',
    instrumentNo: 'instrumentNo',
    description: 'description',
    validDate: 'validDate'
  };
  data: InstrumentType[] = [];
  public instrumentTypeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'code',
    minLength: '1',
    suggestions: this.data,
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'code',
    format: '${value.code}',
  };
  instrument: Instrument;
  selectionModeSingle = PrimeNGDateSelectionMode.Single;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: InstrumentService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.instrument = new Instrument();
    this.entity = this.instrument;
    this.cancelRoute = '/Admin/Instrument';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminInstrumentCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminInstrumentCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminInstrumentCanCreate;
    this.initForm();

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      instrumentNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      description: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      validDate: new FormControl(new Date(), Validators.required),
      instrumentType: new FormControl(null, Validators.required),
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
      setTimeout(() => {
        this.formInput.controls[this.properties.instrumentNo].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.instrument.instrumentNo, this.properties.instrumentNo));
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      this.instrument = new Instrument(data);
      this.entity = this.instrument;

      this.formDetails = this.instrument;
      this.formInput.patchValue({
        id: this.instrument.id,
        instrumentNo: this.instrument.instrumentNo,
        description: this.instrument.description,
        validDate: this.instrument.validDate ? new Date(this.instrument.validDate) : null,
        instrumentType: this.instrument.instrumentType,
        isEnabled : this.instrument.isEnabled
      });

      this.formInput.controls[this.properties.instrumentNo].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.instrument.instrumentNo, this.properties.instrumentNo));

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateInstrumentModel {
    const instrumentType = this.formInput.controls[this.properties.instrumentType].value as InstrumentType;
    const updateinstrumentModel = new UpdateInstrumentModel();
    Automapper.map(this.entity, updateinstrumentModel);
    updateinstrumentModel.instrumentTypeId = instrumentType.id;
    return updateinstrumentModel;
  }

  getAddModel(): AddInstrumentModel {
    const instrumentType = this.formInput.controls[this.properties.instrumentType].value as InstrumentType;
    const addinstrumentModel = new AddInstrumentModel();
    Automapper.map(this.instrument, addinstrumentModel);
    addinstrumentModel.instrumentTypeId = instrumentType.id;
    return addinstrumentModel;
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isInstrumentTypeModified() {
    return this.isModified(this.properties.instrumentType);
  }

  isInstrumentTypeEmpty() {
    return this.hasError(this.properties.instrumentType, ValidationErrorCodes.required);
  }

  isAsyncValidationPending() {
    return this.formInput.controls[this.properties.instrumentNo].status === ControlStates.PENDING;
  }

  //#region name validations

  isInstrumentNoEmpty() {
    return this.hasError(this.properties.instrumentNo, ValidationErrorCodes.required);
  }

  isInstrumentNoHasWhiteSpace() {
    return this.hasError(this.properties.instrumentNo, ValidationErrorCodes.validateWhiteSpace);
  }

  isInstrumentNoExists() {
    return this.hasError(this.properties.instrumentNo, ValidationErrorCodes.alreadyExists);
  }

  isInstrumentNoModified() {
    return this.isModified(this.properties.instrumentNo);
  }

  isValidDateModified() {
    return this.isModified(this.properties.validDate);
  }
  isValidDateEmpty() {
    return this.hasError(this.properties.validDate, ValidationErrorCodes.required);
  }
  // #end region

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

}
