import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Constants, dataTypes, Numbers, TabType, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AuthService } from 'src/app/auth/auth.service';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import { PermissionType } from 'src/app/shared/constant/roles';
import { MicroSectionParameterModel } from 'src/app/model/sap-part-inspection-plan/micro-section-parameter/micro-section-parameter-model';

@Component({
  selector: 'app-micro-section-parameter',
  templateUrl: './micro-section-parameter.component.html',
  styleUrls: ['./micro-section-parameter.component.css']
})
export class MicroSectionParameterComponent extends BaseDetailComponent implements OnInit {
  @Output() public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  maxNumber: number;
  minNumber: number;
  minFractionDigits: number;
  fractionDigits: number;
  detail: any;

  properties = {
    parameterManagement: 'parameterManagement',
    uom: 'uom',
    normalValue: 'normalValue',
    upperTolerance: 'upperTolerance',
    lowerTolerance: 'lowerTolerance',
    instrumentType: 'instrumentType',
    accuracy: 'accuracy',
    dataType: 'dataType',
    chartType: 'chartType',
    calculationPoint: 'calculationPoint'
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
  microParameterType: number;
  isCalculationPointGreaterThanZero = true;


  public chartTypeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'description',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'description',
    format: '${value.description}',
  };

  sapPartInspectionId: number;
  isDataTypeCTQ: boolean;

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
    this.fractionDigits = 0;
    this.minFractionDigits = 5;

  }
  initForm() {

    this.formInput = this.formBuilder.group({
      parameterManagement: new FormControl({ value: null, disabled: false }, [
        Validators.required]),
      uom: new FormControl({ value: null, disabled: false }, [
        Validators.required]),
      normalValue: new FormControl(Constants.Empty, [
        Validators.required]),
      upperTolerance: new FormControl(Constants.Empty, [
        Validators.required]),
      lowerTolerance: new FormControl(Constants.Empty, [
        Validators.required]),
      accuracy: new FormControl({ value: '', disabled: false }),
      instrumentType: new FormControl({ value: null, disabled: false }, [
        Validators.required]),
      dataType: new FormControl(Constants.Empty, [
        Validators.required]),
      chartType: new FormControl(Constants.Empty, [
        Validators.required]),
      calculationPoint: new FormControl(Constants.Empty, [
        Validators.required])
    });
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.microParameterType = TabType.MicroSection;
    this.getDefaultDataType();
    this.formInput.patchValue({
      calculationPoint: Numbers.TwentyFive
    });
    if (this.detail !== undefined) {
      const microSectionParameterModel = new MicroSectionParameterModel(this.detail);
      this.editData(microSectionParameterModel);
      this.formDetails = this.entity;
    }

    this.formInput.controls[this.properties.parameterManagement].enable();
    this.formInput.controls[this.properties.uom].enable();
    this.formInput.controls[this.properties.normalValue].enable();
    this.formInput.controls[this.properties.upperTolerance].enable();
    this.formInput.controls[this.properties.lowerTolerance].enable();
    this.formInput.controls[this.properties.accuracy].enable();
    this.formInput.controls[this.properties.instrumentType].enable();
    this.formInput.controls[this.properties.dataType].enable();
    this.formInput.controls[this.properties.chartType].enable();
    this.formInput.controls[this.properties.calculationPoint].enable();
  }
  editData(microSectionParameterModel: MicroSectionParameterModel) {
    this.isDataTypeCTQ = microSectionParameterModel.dataTypeId === dataTypes[0].id;
    this.onNormalChange(microSectionParameterModel.normalValue);
    this.formInput.patchValue({
      parameterManagement: microSectionParameterModel.parameterManagement,
      uom: microSectionParameterModel.uom,
      normalValue: microSectionParameterModel.normalValue,
      upperTolerance: microSectionParameterModel.upperTolerance,
      lowerTolerance: microSectionParameterModel.lowerTolerance,
      instrumentType: microSectionParameterModel.instrumentType,
      accuracy: microSectionParameterModel.accuracy,
      dataType: microSectionParameterModel.dataType,
      chartType: microSectionParameterModel.chartType,
      calculationPoint: microSectionParameterModel.calculationPoint
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
    this.dataTypeChange(dataTypes[1].name);
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

  isUOMModified() {
    return this.isModified(this.properties.uom);
  }

  isUOMEmpty() {
    return this.hasError(this.properties.uom, ValidationErrorCodes.required);
  }

  isNormalValueModified() {
    return this.isModified(this.properties.normalValue);
  }

  isNormalValueEmpty() {
    return this.hasError(this.properties.normalValue, ValidationErrorCodes.required);
  }

  isUpperToleranceModified() {
    return this.isModified(this.properties.upperTolerance);
  }

  isUpperToleranceEmpty() {
    return this.hasError(this.properties.upperTolerance, ValidationErrorCodes.required);
  }

  isLowerToleranceModified() {
    return this.isModified(this.properties.lowerTolerance);
  }

  isLowerToleranceEmpty() {
    return this.hasError(this.properties.lowerTolerance, ValidationErrorCodes.required);
  }


  isInstrumentTypeModified() {
    return this.isModified(this.properties.instrumentType);
  }

  isInstrumentTypeEmpty() {
    return this.hasError(this.properties.instrumentType, ValidationErrorCodes.required);
  }

  isChartTypeModified() {
    return this.isModified(this.properties.chartType);
  }

  isChartTypeEmpty() {
    return this.hasError(this.properties.chartType, ValidationErrorCodes.required);
  }


  isCalculationPointModified() {
    return this.isModified(this.properties.calculationPoint);
  }

  isCalculationPointEmpty() {
    return this.hasError(this.properties.calculationPoint, ValidationErrorCodes.required);
  }

  isDataTypeModified() {
    return this.isModified(this.properties.dataType);
  }

  isDataTypeEmpty() {
    return this.hasError(this.properties.dataType, ValidationErrorCodes.required);
  }

  onNormalChange(normalValue) {
    normalValue = normalValue.toString();
    if (Math.floor(normalValue) !== normalValue && normalValue.indexOf('.') !== -1) {
      this.fractionDigits = normalValue.toString().split('.')[1].length || 0;
      this.formInput.patchValue({
        accuracy: this.fractionDigits,
        upperTolerance: 0,
        lowerTolerance: 0
      });
    } else {
      this.fractionDigits = 0;
      this.formInput.patchValue({
        accuracy: 0,
        upperTolerance: 0,
        lowerTolerance: 0
      });
    }
  }

  dataTypeChange(event) {
    const chartTypes = this.formInput.controls[this.properties.chartType];
    const calCulationPoint = this.formInput.controls[this.properties.calculationPoint];

    if (event === dataTypes[0].name) {
      this.isDataTypeCTQ = true;
      chartTypes.setValidators(Validators.required);
      chartTypes.updateValueAndValidity();
      calCulationPoint.setValidators(Validators.required);
      calCulationPoint.updateValueAndValidity();
      this.formInput.patchValue({
        chartType: null,
        calculationPoint: Numbers.TwentyFive
      });
      this.formInput.markAsDirty();
    } else {
      this.isDataTypeCTQ = false;
      chartTypes.setErrors(null);
      chartTypes.clearValidators();
      chartTypes.updateValueAndValidity();
      calCulationPoint.setErrors(null);
      calCulationPoint.clearValidators();
      calCulationPoint.updateValueAndValidity();
      this.formInput.patchValue({
        chartType: null,
        calculationPoint: ''
      });

      this.formInput.markAsDirty();
    }
  }

  checkCalculationPointGreaterThanZero(value) {
    if (Number(value.target.value) > 0) {
      this.isCalculationPointGreaterThanZero = true;
      this.formInput.patchValue({ calculationPoint: Number(value.target.value)});
    } else {
      this.isCalculationPointGreaterThanZero = false;
    }
  }

}
