import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { Division } from 'src/app/model/division/division';
import { AddSiteModel } from 'src/app/model/site/add-site-model';
import { Site } from 'src/app/model/site/site';
import { UpdateSiteModel } from 'src/app/model/site/update-site-model';
import { CountryService } from 'src/app/services/country/country.service';
import { LocationService } from 'src/app/services/location/location.service';
import { SiteService } from 'src/app/services/site/site.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Constants, ControlStates, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { ConfirmationModalComponent } from 'src/app/shared/controls/modal/confirmation-modal/confirmation-modal.component';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
@Component({
    selector: 'app-site-detail',
    templateUrl: './site-detail.component.html',
    styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent extends BaseDetailComponent implements OnInit, OnDestroy {
    site: Site;
    originalFormInput: string;
    isSiteCodeDisabled: boolean;
    properties = {
        id: 'id',
        name: 'name',
        code: 'code',
        description: 'description',
        location: 'location',
        country: 'country',
        region: 'region',
        divisions: 'divisions',
    };
    divisions: Division[] = [];
    originalDivisionIds: number[];
    constructor(
        private formBuilder: FormBuilder,
        private apiService: SiteService,
        activatedRoute: ActivatedRoute,
        notificationService: NotificationService,
        modalService: NgbModal,
        router: Router,
        authService: AuthService,
        private locationService: LocationService,
        private countryService: CountryService,

    ) {
        super(modalService, activatedRoute, router, notificationService, authService, apiService);
        this.site = new Site();
        this.entity = this.site;
        this.cancelRoute = '/Admin/Site';
        this.getUpdateModelFn = this.getUpdateModel;
        this.getAddModelFn = this.getAddModel;
        this.canAccessPermissionType = PermissionType.AdminSiteCanAccess;
        this.canUpdatePermissionType = PermissionType.AdminSiteCanUpdate;
        this.canCreatPermissionType = PermissionType.AdminSiteCanCreate;
        this.initForm();
    }

    initForm() {
        this.formInput = this.formBuilder.group({
            id: 0,
            name: new FormControl(Constants.Empty, [Validators.required, Validators.maxLength(60), validateWhiteSpace]),
            code: new FormControl(Constants.Empty),
            description: new FormControl(Constants.Empty),
            location: new FormControl(Constants.Empty, Validators.required),
            country: new FormControl({ value: Constants.Empty, disabled: true }),
            region: new FormControl({ value: Constants.Empty, disabled: true }),
            divisions: new FormControl(Constants.Empty, Validators.required),
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
                this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.site.name, this.properties.name));
            }, environment.timer.autoReturn);
            return;
        }

        this.apiService.getDataById(this.recId).subscribe(data => {
            this.site = new Site(data);
            this.entity = this.site;
            this.formDetails = this.site;
            this.formInput.patchValue({
                id: this.site.id,
                name: this.site.name,
                code: this.site.code,
                description: this.site.description,
                location: this.site.location ?? null,
                country: this.site.location !== null ?  this.site.location.country : null,
                region: null,
                divisions: this.site.divisions,
                isEnabled: this.site.isEnabled
            });
            if (this.site.location != null) {
                this.onLocationSelect(this.site.location);
            }
            this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.site.name, this.properties.name));

            this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

            this.originalDivisionIds = JSON.parse(
                JSON.stringify(_.map(this.site.divisions, (x) => x.id))
            );

            if (this.site.locationId > 0) {
                this.isSiteCodeDisabled = false;
            } else {
                this.isSiteCodeDisabled = true;
            }
        });
    }

    getUpdateModel(): UpdateSiteModel {
        const location = this.formInput.controls[this.properties.location].value;
        const updateSiteModel = new UpdateSiteModel();
        Automapper.map(this.entity, updateSiteModel);
        updateSiteModel.locationId = location.id;
        updateSiteModel.location = null;
        const divisionIds = _.map(
            this.formInput.controls[this.properties.divisions].value,
            this.properties.id
        );
        updateSiteModel.addedDivisionIds = this.getAddedDivisionIds(divisionIds);
        updateSiteModel.removedDivisionIds = this.getRemovedDivisionIds(divisionIds);
        return updateSiteModel;
    }

    getAddedDivisionIds(divisionIds: number[]) {
        const added = _.difference(divisionIds, this.originalDivisionIds);
        return added;
    }

    getRemovedDivisionIds(divisionIds: number[]) {
        const removed = _.difference(this.originalDivisionIds, divisionIds);
        return removed;
    }

    getAddModel(): AddSiteModel {
        const location = this.formInput.controls[this.properties.location].value;
        const addSiteModel = new AddSiteModel();
        Automapper.map(this.site, addSiteModel);
        addSiteModel.locationId = location.id;
        addSiteModel.location = null;
        const divisionIds = _.map(
            this.formInput.controls[this.properties.divisions].value,
            this.properties.id
        );

        addSiteModel.addedDivisionIds = this.getAddedDivisionIds(divisionIds);
        return addSiteModel;
    }

    isModified(controlName: string) {
        return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
    }

    isAsycValidationPending() {
        return this.formInput.controls[this.properties.name].status === ControlStates.PENDING;
    }
    isLocationModified() {
        return this.isModified(this.properties.country);
    }
    isLocationEmpty() {
        return this.hasError(this.properties.country, ValidationErrorCodes.required);
    }

    onLocationSelect(event) {
        this.locationService.getDataById(event.id).subscribe((data) => {
            const country = this.formInput.controls[this.properties.country];
            country.setValue(data.country);
            this.onCountrySelect(data.country.id);
        });
    }

    onCountrySelect(id) {
        this.countryService.getDataById(id).subscribe((data) => {
            const region = this.formInput.controls[this.properties.region];
            region.setValue(data.region);
        });
    }

    isDivisionsEmpty() {
        return this.hasError(this.properties.divisions, ValidationErrorCodes.required);
    }

    isDivisionsModified() {
        return this.isModified(this.properties.divisions);
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
