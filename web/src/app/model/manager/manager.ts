import {
    DisplayColumn,
    Trim,
    FormInput,
  } from 'src/app/shared/decorators/property';
  import { BaseModel } from '../base/base-model';
  import { Constants } from 'src/app/shared/constant/global';

  export class Manager extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Email')
    email: string;

    constructor(manager?: Manager) {
      super(manager);
      if (manager) {
        this.name = manager.name;
      } else {
        this.name = Constants.Empty;
        this.email = Constants.Empty;
      }
    }
  }
