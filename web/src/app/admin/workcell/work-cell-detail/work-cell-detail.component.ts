import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { Site } from 'src/app/model/site/site';
import { AddWorkCellModel } from 'src/app/model/workcell/add-work-cell-model';
import { UpdateWorkCellModel } from 'src/app/model/workcell/update-work-cell-model';
import { WorkCell } from 'src/app/model/workcell/work-cell';
import { WorkCellService } from 'src/app/services/workcell/work-cell.service';
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
    selector: 'app-work-cell-detail',
    templateUrl: './work-cell-detail.component.html',
    styleUrls: ['./work-cell-detail.component.css']
})
export class WorkCellDetailComponent extends BaseDetailComponent implements OnInit, OnDestroy {
    workCell: WorkCell;
    originalFormInput: string;
    properties = {
        id: 'id',
        name: 'name',
        description: 'description',
        sites: 'sites',
    };
    sites: Site[] = [];
    originalSiteIds: number[];
    constructor(
        private formBuilder: FormBuilder,
        private apiService: WorkCellService,
        activatedRoute: ActivatedRoute,
        notificationService: NotificationService,
        modalService: NgbModal,
        router: Router,
        authService: AuthService
    ) {
        super(modalService, activatedRoute, router, notificationService, authService, apiService);
        this.workCell = new WorkCell();
        this.entity = this.workCell;
        this.cancelRoute = '/Admin/WorkCell';
        this.getUpdateModelFn = this.getUpdateModel;
        this.getAddModelFn = this.getAddModel;
        this.canAccessPermissionType = PermissionType.AdminWorkCellCanAccess;
        this.canUpdatePermissionType = PermissionType.AdminWorkCellCanUpdate;
        this.canCreatPermissionType = PermissionType.AdminWorkCellCanCreate;
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
            sites: new FormControl(Constants.Empty, Validators.required),
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
                this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.workCell.name, this.properties.name));
            }, environment.timer.autoReturn);
            return;
        }

        this.apiService.getDataById(this.recId).subscribe(data => {
            this.workCell = new WorkCell(data);
            this.entity = this.workCell;

            this.formDetails = this.workCell;
            this.formInput.patchValue({
                id: this.workCell.id,
                name: this.workCell.name,
                description: this.workCell.description,
                sites: this.workCell.sites?.length > 0 ? this.workCell.sites.map((value) => value.name + ' - ' + value.code) : '',
            });

            this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.workCell.name, this.properties.name));

            this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

            this.originalSiteIds = JSON.parse(
                JSON.stringify(_.map(this.workCell.sites, (x) => x.id))
            );
        });
    }

    getUpdateModel(): UpdateWorkCellModel {
        const updateWorkCellModel = new UpdateWorkCellModel();

        Automapper.map(this.entity, updateWorkCellModel);
        const siteIds = _.map(
            this.formInput.controls[this.properties.sites].value,
            this.properties.id
        );
        updateWorkCellModel.addedSiteIds = this.getAddedSiteIds(siteIds);
        updateWorkCellModel.removedSiteIds = this.getRemovedSiteIds(siteIds);

        return updateWorkCellModel;
    }



    getAddModel(): AddWorkCellModel {
        const addWorkCellModel = new AddWorkCellModel();
        Automapper.map(this.workCell, addWorkCellModel);
        const siteIds = _.map(
            this.formInput.controls[this.properties.sites].value,
            this.properties.id
        );
        addWorkCellModel.addedSiteIds = this.getAddedSiteIds(siteIds);

        return addWorkCellModel;
    }

    getAddedSiteIds(siteIds: number[]) {
        const added = _.difference(siteIds, this.originalSiteIds);
        return added;
    }

    getRemovedSiteIds(siteIds: number[]) {
        const removed = _.difference(this.originalSiteIds, siteIds);
        return removed;
    }

    isModified(controlName: string) {
        return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
    }

    isSiteModified() {
        return this.isModified(this.properties.sites);
    }

    isSiteEmpty() {
        return this.hasError(this.properties.sites, ValidationErrorCodes.required);
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
