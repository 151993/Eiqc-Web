


export interface IDeleteDepartmentModel {
    id: number;
    changeReason: string;
}

export class DeleteDepartmentModel implements IDeleteDepartmentModel {
    id: number;
    changeReason: string;
}
