


export interface IDeleteUserModel {
    id: number;
    changeReason: string;
}

export class DeleteUserModel implements IDeleteUserModel {
    id: number;
    changeReason: string;
}
