

export interface IDeleteModel {
  id: number;
  changeReason: string;
}

export class DeleteModel implements IDeleteModel {
  id: number;
  changeReason: string;
}
