import { BaseModel } from '../base/base-model';

export class SMSPOStateType extends BaseModel {
    smspoStateTypeId: number;
    Name: string;
    Description: string;
    IsEnabled: boolean;
}
