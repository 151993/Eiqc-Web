export interface IDeleteWorkCellModel {
    id: number;
    changeReason: string;
}

export class DeleteWorkCellModel implements IDeleteWorkCellModel {
    id: number;
    changeReason: string;
}
