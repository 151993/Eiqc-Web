import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Constants, dataTypes, TabType, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AuthService } from 'src/app/auth/auth.service';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import { PermissionType } from 'src/app/shared/constant/roles';
import { PartDimension } from 'src/app/model/part-dimension/part-dimension';
import { PartDimensionEnum } from 'src/app/model/sap-part-inspection-plan/part-dimension.enum';
import { LPositionToleranceModel } from 'src/app/model/sap-part-inspection-plan/l-position-tolerance/l-position-tolerance-model';

@Component({
  selector: 'app-l-position-tolerance',
  templateUrl: './l-position-tolerance.component.html',
  styleUrls: ['./l-position-tolerance.component.css']
})
export class LPositionToleranceComponent extends BaseDetailComponent implements OnInit {
  @Output() public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  maxNumber: number;
  minNumber: number;
  minFractionDigits: number;
  isDimensionGeometryTolerance: boolean;
  detail: any;

  properties = {
    parameterManagement: 'parameterManagement',
    dimensionNumber: 'dimensionNumber',
    specLimitAtMMC: 'specLimitAtMMC',
    specLimitAtLMC: 'specLimitAtLMC',
    spec: 'spec',
    uom: 'uom',
    instrumentType: 'instrumentType',
    dataType: 'dataType'
  };

  public instrumentTypeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'code',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'code',
    format: '${value.code}',
  };
  dataTypeList: any[];
  lPositionParameterType: number;
  constructor(private formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService,
    public activeModal: NgbActiveModal) {
    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService
    );
    this.initForm();

    this.canAccessPermissionType = PermissionType.AdminSAPPartInspectionPlanCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSAPPartInspectionPlanCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSAPPartInspectionPlanCanCreate;

    this.maxNumber = 99999;
    this.minNumber = 0;
    this.minFractionDigits = 5;

  }
  initForm() {
    this.formInput = this.formBuilder.group({
      parameterManagement: new FormControl({ value: null, disabled: false }, [
        Validators.required]),
      dimensionNumber: new FormControl({ value: null }, [
        Validators.required]),
      specLimitAtMMC: new FormControl(Constants.Empty, [
        Validators.required]),
      specLimitAtLMC: new FormControl(Constants.Empty, [
        Validators.required]),
      spec: new FormControl(Constants.Empty, [
        Validators.required]),
      uom: new FormControl({ value: null, disabled: false }, [
        Validators.required]),
      instrumentType: new FormControl({ value: null, disabled: false }, [
        Validators.required]),
      dataType: new FormControl(Constants.Empty, [
        Validators.required])

    });
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.lPositionParameterType = TabType.LPositionTolerance;
    this.getDefaultDataType();
    if (this.detail !== undefined) {
      const lPositionToleranceModel = new LPositionToleranceModel(this.detail);
      this.editData(lPositionToleranceModel);
      this.formDetails = this.entity;
    }
    this.formInput.controls[this.properties.parameterManagement].enable();
    this.formInput.controls[this.properties.uom].enable();
    this.formInput.controls[this.properties.dimensionNumber].enable();
    this.formInput.controls[this.properties.specLimitAtLMC].enable();
    this.formInput.controls[this.properties.specLimitAtMMC].enable();
    this.formInput.controls[this.properties.spec].enable();
    this.formInput.controls[this.properties.uom].enable();
    this.formInput.controls[this.properties.instrumentType].enable();
    this.formInput.controls[this.properties.dataType].enable();
  }
  editData(lPositionToleranceModel: LPositionToleranceModel) {
    this.onDimensionNumberChange(lPositionToleranceModel.partDimension);
    this.formInput.patchValue({
      parameterManagement: lPositionToleranceModel.parameterManagement,
      dimensionNumber: lPositionToleranceModel.partDimension,
      specLimitAtMMC: lPositionToleranceModel.specLimitAtMMC,
      specLimitAtLMC: lPositionToleranceModel.specLimitAtLMC,
      spec: lPositionToleranceModel.spec,
      uom: lPositionToleranceModel.uom,
      instrumentType: lPositionToleranceModel.instrumentType,
      dataType: lPositionToleranceModel.dataType
    });

  }

  close() {
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }

  getDefaultDataType() {
    this.dataTypeList = dataTypes;
    this.formInput.patchValue({
      dataType: dataTypes[1].name
    });
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isParameterManagementModified() {
    return this.isModified(this.properties.parameterManagement);
  }

  isParameterManagementEmpty() {
    return this.hasError(this.properties.parameterManagement, ValidationErrorCodes.required);
  }

  isDimensionNumberModified() {
    return this.isModified(this.properties.dimensionNumber);
  }

  isDimensionNumberEmpty() {
    return this.hasError(this.properties.dimensionNumber, ValidationErrorCodes.required);
  }

  isUOMModified() {
    return this.isModified(this.properties.uom);
  }

  isUOMEmpty() {
    return this.hasError(this.properties.uom, ValidationErrorCodes.required);
  }

  isSpecLimitAtMMCModified() {
    return this.isModified(this.properties.specLimitAtMMC);
  }

  isSpecLimitAtMMCEmpty() {
    return this.hasError(this.properties.specLimitAtMMC, ValidationErrorCodes.required);
  }

  isSpecLimitAtLMCModified() {
    return this.isModified(this.properties.specLimitAtLMC);
  }

  isSpecLimitAtLMCEmpty() {
    return this.hasError(this.properties.specLimitAtLMC, ValidationErrorCodes.required);
  }

  isSpecModified() {
    return this.isModified(this.properties.spec);
  }

  isSpecEmpty() {
    return this.hasError(this.properties.spec, ValidationErrorCodes.required);
  }

  isInstrumentTypeModified() {
    return this.isModified(this.properties.instrumentType);
  }

  isInstrumentTypeEmpty() {
    return this.hasError(this.properties.instrumentType, ValidationErrorCodes.required);
  }

  onDimensionNumberChange(partDimension: PartDimension) {
    if (partDimension != null && partDimension.name != null) {
      this.isDimensionGeometryTolerance = (partDimension.name === PartDimensionEnum.GeometryTolerance);
    } else {
      this.isDimensionGeometryTolerance = false;
    }
  }

  isDataTypeModified() {
    return this.isModified(this.properties.dataType);
  }

  isDataTypeEmpty() {
    return this.hasError(this.properties.dataType, ValidationErrorCodes.required);
  }

  onDimensionNumberSelect(event) {
    this.onDimensionNumberChange(event);
    this.formInput.patchValue({
      specLimitAtMMC: 0,
      specLimitAtLMC: 0,
      spec: 0,
    });
  }

  unSelectDimensionNumber(event) {
    this.formInput.patchValue({
      specLimitAtMMC: 0,
      specLimitAtLMC: 0,
      spec: 0,
    });
  }
}
