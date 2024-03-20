import { DisplayColumn } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { ColumnType } from '../table/table';


export class CommodityName extends BaseModel {

    Id: number;
    IntClassNo: string;
    IsEnabled: boolean;
    @DisplayColumn('Name',  { type: ColumnType.String, mappingField: 'class' })
    Class: string;
    ValidFrom: string;
    ValidTo: string;
}
