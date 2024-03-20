import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { environment } from 'src/environments/environment';
import { Location } from 'src/app/model/location/location';
import { UpdateLocationModel } from 'src/app/model/location/update-location-model';
import { AddLocationModel } from 'src/app/model/location/add-location-model';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Country } from 'src/app/model/country/country';
import { CountryService } from 'src/app/services/country/country.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent extends BaseDetailComponent implements OnInit, OnDestroy {

  location: Location;
  originalFormInput: string;
  autoCompleteLocationValue: string;

  properties = {
    id: 'id',
    name: 'name',
    description: 'description',
    country: 'country',
    region: 'region'
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: LocationService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService,
    private countryService: CountryService,
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
    this.location = new Location();
    this.entity = this.location;
    this.cancelRoute = '/Admin/Location';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminLocationCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminLocationCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminLocationCanCreate;
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
      country: new FormControl(null, [
        Validators.required]),
      region: new FormControl({ value: Constants.Empty, disabled: true }),
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
            this.location.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.location = new Location(data);

      this.formDetails = this.entity;

      this.entity = this.location;

      this.formInput.patchValue({
        id: this.location.id,
        name: this.location.name,
        description: this.location.description,
        country: this.location.country
      });

      this.onCountrySelect(this.location.country);
      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.location.name,
          this.properties.name
        )
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateLocationModel {
    const country = this.formInput.controls[this.properties.country].value as Country;
    const updateLocationModel = new UpdateLocationModel();
    Automapper.map(this.location, updateLocationModel);
    updateLocationModel.country = null;
    updateLocationModel.countryId = country.id;
    return updateLocationModel;
  }

  getAddModel(): AddLocationModel {
    const country = this.formInput.controls[this.properties.country].value as Country;
    const addLocationModel = new AddLocationModel();
    Automapper.map(this.location, addLocationModel);
    addLocationModel.country = null;
    addLocationModel.countryId = country.id;
    return addLocationModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  isCountryModified() {
    return this.isModified(this.properties.country);
  }
  isCountryEmpty() {
    return this.hasError(this.properties.country, ValidationErrorCodes.required);
  }

  onCountrySelect(event) {
    this.countryService.getDataById(event.id).subscribe((data) => {
      const region = this.formInput.controls[this.properties.region];
      region.setValue(data.region);
    });
  }

  isAsycValidationPending() {
    return (
      this.formInput.controls[this.properties.name].status ===
      ControlStates.PENDING
    );
  }

  //#region name validations

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

  //#endregion

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }

}
