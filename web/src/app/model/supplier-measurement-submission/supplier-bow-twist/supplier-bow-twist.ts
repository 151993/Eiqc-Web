import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
import { SupplierBowTwistActual } from '../supplier-bow-twist-actual/supplier-bow-twist-actual';
import { PartInspectionBowTwistParameter } from '../../part-inspection-bow-twist-parameter/part-inspection-bow-twist-parameter';
import { BowTwistFormula } from '../../bow-twist-formula/bow-twist-formula';
export class SupplierBowTwist extends BaseModel {


    @FormInput()
    @DisplayColumn('Spec')
    spec: number;

    @FormInput()
    @DisplayColumn('Length')
    length: number;

    @FormInput()
    @DisplayColumn('Width')
    width: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Unit')
    unit: string;

    @FormInput()
    @DisplayColumn('FormulaName')
    bowTwistFormula: string;

    @FormInput()
    @DisplayColumn('UpperLimit')
    upperLimit: number;

    warPageId: number;
    bowTwistFormulaId: number;
    supplierMeasurementSubmissionId: number;
    dataType: string;
    warPage: string;
    warPageTypeId: number;
    supplierBowTwistActuals: SupplierBowTwistActual[] = [];
    partBowTwistParameterId: number;
    partInspectionBowTwistParameter: PartInspectionBowTwistParameter;
    bowTwistFormulas: BowTwistFormula;
    constructor(supplierBowTwists?: SupplierBowTwist) {
        super(supplierBowTwists);
        if (supplierBowTwists) {
            this.spec = supplierBowTwists.spec;
            this.length = supplierBowTwists.length;
            this.width = supplierBowTwists.width;
            this.unit = supplierBowTwists.unit;
            this.upperLimit = supplierBowTwists.upperLimit;
            this.warPageId = supplierBowTwists.warPageId;
            this.warPage = supplierBowTwists.warPage;
            this.bowTwistFormulaId = supplierBowTwists.bowTwistFormulaId;
            this.bowTwistFormula = supplierBowTwists.bowTwistFormula;
            this.supplierMeasurementSubmissionId = supplierBowTwists.supplierMeasurementSubmissionId;
            this.warPageTypeId = supplierBowTwists.warPageTypeId;
            this.supplierBowTwistActuals = supplierBowTwists.supplierBowTwistActuals;
            this.partBowTwistParameterId = supplierBowTwists.partBowTwistParameterId;
            this.partInspectionBowTwistParameter = supplierBowTwists.partInspectionBowTwistParameter;
            this.bowTwistFormulas = supplierBowTwists.bowTwistFormulas;
        } else {
            this.spec = Numbers.Default;
            this.length = Numbers.Default;
            this.width = Numbers.Default;
            this.unit = Constants.Empty;
            this.upperLimit = Numbers.Default;
            this.warPageId = Numbers.Default;
            this.bowTwistFormulaId = Numbers.Default;
            this.supplierMeasurementSubmissionId = Numbers.Default;
            this.bowTwistFormula = null;
            this.warPage = null;
            this.dataType = Constants.Empty;
            this.warPageTypeId = Numbers.Default;
            this.supplierBowTwistActuals = [];
            this.partBowTwistParameterId = Numbers.Default;
            this.partInspectionBowTwistParameter = null;
            this.bowTwistFormulas = null;
        }
    }
}
