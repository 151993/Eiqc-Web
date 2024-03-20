export interface IDeleteCountryModel {
    id: number;
    changeReason: string;
}

export class DeleteCountryModel implements IDeleteCountryModel {
    id: number;
    changeReason: string;
}
