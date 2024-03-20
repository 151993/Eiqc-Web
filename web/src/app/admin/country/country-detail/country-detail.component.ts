import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { AddCountryModel } from 'src/app/model/country/add-country-model';
import { Country } from 'src/app/model/country/country';
import { UpdateCountryModel } from 'src/app/model/country/update-country-model';
import { Region } from 'src/app/model/region/region';
import { CountryService } from 'src/app/services/country/country.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { ConfirmationModalComponent } from 'src/app/shared/controls/modal/confirmation-modal/confirmation-modal.component';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-country-detail',
    templateUrl: './country-detail.component.html',
    styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent extends BaseDetailComponent implements OnInit, OnDestroy {
    country: Country;
    originalFormInput: string;
    properties = {
        id: 'id',
        name: 'name',
        description: 'description',
        region: 'region'
    };
    constructor(
        private formBuilder: FormBuilder,
        private apiService: CountryService,
        activatedRoute: ActivatedRoute,
        notificationService: NotificationService,
        modalService: NgbModal,
        router: Router,
        authService: AuthService
    ) {
        super(modalService, activatedRoute, router, notificationService, authService, apiService);
        this.country = new Country();
        this.entity = this.country;
        this.cancelRoute = '/Admin/Country';
        this.getUpdateModelFn = this.getUpdateModel;
        this.getAddModelFn = this.getAddModel;
        this.canAccessPermissionType = PermissionType.AdminCountryCanAccess;
        this.canUpdatePermissionType = PermissionType.AdminCountryCanUpdate;
        this.canCreatPermissionType = PermissionType.AdminCountryCanCreate;
        this.initForm();
    }

    initForm() {
        this.formInput = this.formBuilder.group({
            id: 0,
            name: new FormControl(Constants.Empty, [
                Validators.required,
                Validators.maxLength(50),
                validateWhiteSpace]),
            description: new FormControl(Constants.Empty),
            region: new FormControl(null, Validators.required),
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
                this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.country.name, this.properties.name));
            }, environment.timer.autoReturn);
            return;
        }

        this.apiService.getDataById(this.recId).subscribe(data => {
            this.country = new Country(data);
            this.entity = this.country;

            this.formDetails = this.country;
            this.formInput.patchValue({
                id: this.country.id,
                name: this.country.name,
                description: this.country.description,
                region: this.country.region,
            });

            this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.country.name, this.properties.name));

            this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
        });
    }

    getUpdateModel(): UpdateCountryModel {
        const region = this.formInput.controls[this.properties.region].value as Region;
        const updateCountryModel = new UpdateCountryModel();

        Automapper.map(this.entity, updateCountryModel);
        updateCountryModel.region = null;
        updateCountryModel.regionId = region.id;

        return updateCountryModel;
    }



    getAddModel(): AddCountryModel {
        const region = this.formInput.controls[this.properties.region].value as Region;
        const addCountryModel = new AddCountryModel();
        Automapper.map(this.country, addCountryModel);
        addCountryModel.region = null;
        addCountryModel.regionId = region.id;
        return addCountryModel;
    }

    isModified(controlName: string) {
        return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
    }

    isRegionModified() {
        return this.isModified(this.properties.region);
    }

    isRegionEmpty() {
        return this.hasError(this.properties.region, ValidationErrorCodes.required);
    }

    isAsycValidationPending() {
        return this.formInput.controls[this.properties.name].status === ControlStates.PENDING;
    }

    //#region name validations

    isNameEmpty() {
        return this.hasError(this.properties.name, ValidationErrorCodes.required);
    }

    isNameHasWhiteSpace() {
        return this.hasError(this.properties.name, ValidationErrorCodes.validateWhiteSpace);
    }

    isNameExists() {
        return this.hasError(this.properties.name, ValidationErrorCodes.alreadyExists);
    }

    isNameModified() {
        return this.isModified(this.properties.name);
    }

    //#endregion

    isSaveDisabled() {
        return !this.enableSaveButton
            || !this.formInput.valid
            || !this.formInput.dirty;
    }

    openConfirmationModal() {
        const modalRef = this.modalService.open(ConfirmationModalComponent);
        modalRef.componentInstance.message = 'Message.ConfirmSetAsDefault';
        return modalRef;
    }
}
