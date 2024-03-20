import {
    DisplayColumn,
    Trim,
    FormInput,
  } from 'src/app/shared/decorators/property';
  import { BaseModel } from '../base/base-model';
  import { Constants } from 'src/app/shared/constant/global';
  export class Division extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;
    constructor(division?: Division) {
        super(division);
      if (division) {
        this.name = division.name;
        this.description = division.description;
      } else {
        this.name = Constants.Empty;
        this.description = Constants.Empty;
      }
    }
}
