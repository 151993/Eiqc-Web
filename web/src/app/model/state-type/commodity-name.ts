import { BaseModel } from '../base/base-model';

export class StateType extends BaseModel {
    StateTypeId: number;
    Name: string;
    Description: string;
    IsEnabled: boolean;
}
