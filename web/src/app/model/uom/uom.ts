/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import {  DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class UOM extends BaseModel {

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    constructor(uOM?: UOM) {
        super(uOM);

        if (uOM) {
            this.name = uOM.name;
            this.description = uOM.description;
        } else {
            this.description = Constants.Empty;
            this.name = Constants.Empty;

        }
    }
}
