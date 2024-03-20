import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { DefectSection, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { DefectType } from 'src/app/model/defect-type/defect-type';
import * as _ from 'lodash';
import { SupplierMeasurementSubmissionService } from 'src/app/services/supplier-measurement-submission/supplier-measurement-submission.service';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';

@Component({
  selector: 'app-defect-type',
  templateUrl: './defect-type.component.html',
  styleUrls: ['./defect-type.component.css']
})
export class DefectTypeComponent extends BaseDetailComponent implements OnInit {
  @Output() public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  detail: any;
  originalDefectTypeIds: number[];
  sectionId: number;

  isViewDisable: boolean;


  properties = {
    id: 'id',
    defectTypes: 'defectTypes'
  };
  constructor(private formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService,
    public activeModal: NgbActiveModal,
    private _supplierMeasurementSubmissionService: SupplierMeasurementSubmissionService) {
    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService,
      _supplierMeasurementSubmissionService
    );
    this.initForm();

    this.canAccessPermissionType = PermissionType.AdminSupplierMeasurementCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierMeasurementCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierMeasurementCanCreate;


  }
  initForm() {

    this.formInput = this.formBuilder.group({
      defectTypes: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }
  ngOnInit(): void {
    super.ngOnInit();
    if (this.detail !== undefined) {
      this.sectionId = this.sectionId;
      this.isViewDisable = this.isViewDisable !== undefined ? this.isViewDisable : false;
      const defectTypeModel = new DefectType(this.detail);
      if (this.detail.supplierMeasurementSubmissionId !== null && this.detail.supplierMeasurementSubmissionId !== 0) {
       this.checkSectionEvent(this.sectionId);
      }
      this.editData(defectTypeModel);
      this.formDetails = this.entity;
    }
  }
  editData(defectTypeModel: DefectType) {
    this.formInput.patchValue({
      defectTypes: defectTypeModel.defectTypeName,
    });
  }

  getSupplierFunctionAttributeById(id: number, parameterManagementId: number) {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = new ExpandSelectCountInfo();
    pageSortFilterInfo.expandInfo.expand = [{ 'DefectTypes': new ExpandSelectCountInfo() }];
    pageSortFilterInfo.expandInfo = this._supplierMeasurementSubmissionService.setSupplierFunctionAttributePageSortFilterInfo(pageSortFilterInfo);
    this._supplierMeasurementSubmissionService.getDataById(id, pageSortFilterInfo).subscribe(data => {
      if (data.value[0].supplierFunctionAttributes.length > 0) {
        const defectTypes = data.value[0].supplierFunctionAttributes.filter(x => x.parameterManagementId === parameterManagementId)[0].defectTypes;
        this.formInput.patchValue({
          defectTypes: defectTypes,
        });
      }
    });
  }

  getSupplierSapBasedParameterById(id: number, certificateTypeParameterId: number) {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = new ExpandSelectCountInfo();
    pageSortFilterInfo.expandInfo.expand = [{ 'DefectTypes': new ExpandSelectCountInfo() }];
    pageSortFilterInfo.expandInfo = this._supplierMeasurementSubmissionService.setSupplierSapBasedParameterPageSortFilterInfo(pageSortFilterInfo);
    this._supplierMeasurementSubmissionService.getDataById(id, pageSortFilterInfo).subscribe(data => {
      if (data.value[0].supplierSapBasedParameters.length > 0) {
        const defectTypes = data.value[0].supplierSapBasedParameters.filter(x => x.certificateTypeParameterId === certificateTypeParameterId)[0].defectTypes;
        this.formInput.patchValue({
          defectTypes: defectTypes,
        });
      }
    });
  }

  checkSectionEvent(sectionId) {
    switch (sectionId) {
      case DefectSection.Function_Attribute:
        this.getSupplierFunctionAttributeById(this.detail.supplierMeasurementSubmissionId, this.detail.parameterManagementId);
        break;
      case DefectSection.SAP_BASED:
        this.getSupplierSapBasedParameterById(this.detail.supplierMeasurementSubmissionId, this.detail.certificateTypeParameterId);
        break;
      default:
        break;
    }
  }
    close() {
      this.activeModal.dismiss('Click X');
      this.closeClickedEvent.emit();
    }

    isModified(controlName: string) {
      return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
    }

    isDefectTypeModified() {
      return this.isModified(this.properties.defectTypes);
    }

    isisDefectTypeModifiedEmpty() {
      return this.hasError(this.properties.defectTypes, ValidationErrorCodes.required);
    }
  }
