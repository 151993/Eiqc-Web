import { DisplayColumn, Trim, FormInput, Expand } from 'src/app/shared/decorators/property';
import { BaseModel } from '../../base/base-model';


export class SupplierSpecWithLmcModel extends BaseModel {

    @Trim()
    specLmcCable: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Parameter')
    parameter: string;

    @FormInput()
    @DisplayColumn('Dimension No')
    dimensionNumber: string;

    @FormInput()
    @DisplayColumn('Spec Limit at MMC(SL@M)')
    specLimitMMC: number;

    @FormInput()
    @DisplayColumn('Spec Limit at LMC(SL@L)')
    specLimitLMC: number;

    @FormInput()
    @DisplayColumn('Spec')
    specification: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Unit')
    unit: string;

    @FormInput()
    @DisplayColumn('Instrument Type')
    instrumentType: string;

    @FormInput()
    @DisplayColumn('Instrument Number')
    instrumentNumber: number;

    @Trim()
    @FormInput()
    @DisplayColumn('DataType')
    dataType: string;

    constructor(supplierSpecWithLmcParameter?: SupplierSpecWithLmcModel) {
        super(supplierSpecWithLmcParameter);
        this.parameter = null;
        this.dataType = null;
        this.instrumentNumber = 0;
        this.instrumentType = null;
        this.unit = null;
        this.specLimitLMC = 0;
        this.specLimitMMC = 0
        this.dimensionNumber = null;
    }
}