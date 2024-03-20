import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { DefectSection, ToastMessage, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { DefectType } from 'src/app/model/defect-type/defect-type';
import * as _ from 'lodash';
import { SupplierMeasurementSubmissionService } from 'src/app/services/supplier-measurement-submission/supplier-measurement-submission.service';
import { SupplierVisualInspectionDefectType } from 'src/app/model/defect-type-qty-parameter/defect-type-qty-parameter';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-defect-type-visual-inspection',
  templateUrl: './defect-type-visual-inspection.component.html',
  styleUrls: ['./defect-type-visual-inspection.component.css']
})
export class DefectTypeVisualInspectionComponent extends BaseDetailComponent implements OnInit {
  @Output() public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  detail: any;
  originalDefectTypeIds: number[];
  sectionId: number;
  isMultipleSelection = true;
  totalDefectQty: number;
  isViewDisable: boolean;
  properties = {
    id: 'id',
    defecttypeId: 'defectTypeId',
    defectTypes: 'defectTypes',
    defectQty: 'defectQty',
    defectTypeQtyParameters: 'defectTypeQtyParameters'
  };

  defectTypeQtyColumns = [
    { field: 'defectTypeId', header: 'DefectTypeId', isVisible: false },
    { field: 'defectTypeName', header: 'DefectType', isVisible: true },
    { field: 'defectQty', header: 'FailQty', isVisible: true }
  ];


  public defectTypesConfig: JAutoCompleteConfig = {
    field: 'defectTypeName',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'DefectTypeName',
    format: '${value.defectTypeName}',
  };


  defectTypeQtyParameters: SupplierVisualInspectionDefectType[] = [];
  failedQtyResults: any;

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
      defectTypeId: new FormControl({ value: null, disabled: false }),
      defectTypes: new FormControl({ value: null, disabled: false }, [Validators.required]),
      defectQty: new FormControl({ value: null, disabled: false }, [Validators.required]),
      defectTypeQtyParameters: new FormControl(null)
    });
  }
  ngOnInit(): void {
    super.ngOnInit();
    if (this.detail !== undefined) {
      this.sectionId = this.sectionId;
      this.isViewDisable = this.isViewDisable !== undefined ? this.isViewDisable : false;
      this.isMultipleSelection = this.sectionId === DefectSection.Visual_Inspection ? false : true;
      this.isVisualInspectionDetailsEmpty();
      // const defectTypeModel = new DefectType(this.detail);
      if (this.detail !== undefined && this.detail.supplierVisualInspectionDefectTypes !== undefined && this.detail.supplierVisualInspectionDefectTypes.length > 0) {
        this.failedQtyResults = this.detail.supplierVisualInspectionDefectTypes;
        this.failedQtyResults.map((element) => {
          const defectTypeQtyParameter = new SupplierVisualInspectionDefectType();
          defectTypeQtyParameter.defectTypeId = element.defectTypeId;
          defectTypeQtyParameter.defectTypeName = element.defectTypeName;
          defectTypeQtyParameter.defectQty = element.defectQty;

          defectTypeQtyParameter.enableRowDelete = true;
          defectTypeQtyParameter.enableRowEdit = true;
          defectTypeQtyParameter.isEnabled = true;
          this.defectTypeQtyParameters.push(defectTypeQtyParameter);
        });

      } else if (this.detail.supplierMeasurementSubmissionId && this.detail.supplierMeasurementSubmissionId > 0) {
        this.checkSectionEvent(this.sectionId);
      }
      // this.editData(defectTypeModel);
      this.formDetails = this.entity;
    }
  }

  isVisualInspectionDetailsEmpty() {
    const defectQty = this.formInput.controls[this.properties.defectQty];

    if (this.sectionId === DefectSection.Visual_Inspection) {
      defectQty.setValidators(Validators.required);
      defectQty.updateValueAndValidity();
    } else {
      defectQty.setErrors(null);
      defectQty.clearValidators();
      defectQty.updateValueAndValidity();
      this.formInput.markAsDirty();
    }
  }

  getVisualInspectionParameterById(id: number, certificateTypeParameterId: number) {
    this._supplierMeasurementSubmissionService.getSupplierVisualInspectionDefectTypeModelById(id, certificateTypeParameterId).subscribe(data => {
      if (data.value.length > 0) {
        this.failedQtyResults = data.value;
        this.failedQtyResults.map((element, index) => {
          const defectTypeQtyParameter = new SupplierVisualInspectionDefectType();
          defectTypeQtyParameter.defectTypeId = element.defectTypeId;
          defectTypeQtyParameter.defectTypeName = element.defectTypeName;
          defectTypeQtyParameter.defectQty = element.defectQty;

          defectTypeQtyParameter.enableRowDelete = true;
          defectTypeQtyParameter.enableRowEdit = true;
          defectTypeQtyParameter.isEnabled = true;
          this.defectTypeQtyParameters.push(defectTypeQtyParameter);
        });
      }
    });
  }

  checkSectionEvent(sectionId) {
    switch (sectionId) {
      case DefectSection.Visual_Inspection:
        this.isMultipleSelection = false;
        this.getVisualInspectionParameterById(this.detail.supplierMeasurementSubmissionId, this.detail.parameterManagementId);
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

  isFailQtyModified() {
    return this.isModified(this.properties.defectQty);
  }

  isisFailQtyEmpty() {
    return this.hasError(this.properties.defectQty, ValidationErrorCodes.required);
  }


  deleteDefectTypeQty(record: any): void {
    const index = this.defectTypeQtyParameters.indexOf(record);
    this.defectTypeQtyParameters.splice(index, 1);
    this.formInput.controls[this.properties.defectTypes].markAsDirty();
    this.formInput.patchValue({
      defectTypes: '',
      defectQty: '',
      defectTypeQtyParameters: this.defectTypeQtyParameters
    });
  }

  addDefectTypeQty() {

    const defectTypeQtyParameter = new SupplierVisualInspectionDefectType();

    const defectQty = this.formInput.controls[this.properties.defectQty].value;
    const defectType = this.formInput.controls[this.properties.defectTypes].value as DefectType;

    defectTypeQtyParameter.defectTypeId = defectType.id;
    defectTypeQtyParameter.defectTypeName = defectType.defectTypeName;
    defectTypeQtyParameter.defectQty = defectQty;

    defectTypeQtyParameter.enableRowDelete = true;
    defectTypeQtyParameter.enableRowEdit = true;
    defectTypeQtyParameter.isEnabled = true;

    if (this.checkExistenceRecord(this.defectTypeQtyParameters, defectType.defectTypeName)) {
      this.notificationService.showError(ToastMessage.DataExist);
    } else {
      this.defectTypeQtyParameters.push(defectTypeQtyParameter);

      this.formInput.patchValue({ defectTypeQtyParameters: this.defectTypeQtyParameters });
      this.formInput.controls[this.properties.defectTypes].markAsDirty();

      this.formInput.controls[this.properties.defectQty].markAsDirty();
      this.formInput.patchValue({
        defectTypes: '',
        defectQty: ''
      });

    }
  }

  checkExistenceRecord(objectModelData: any, defectType: string): boolean {

    return objectModelData.some(r => r.defectTypeName === defectType);

  }



}
