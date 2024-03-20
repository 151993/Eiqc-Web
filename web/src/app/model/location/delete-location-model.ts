export interface IDeleteLocationModel {
    id: number;
    changeReason: string;
}

export class DeleteLocationModel implements IDeleteLocationModel {
    id: number;
    changeReason: string;
}
