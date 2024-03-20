

export interface IDeleteCommodityModel {
    id: number;
    changeReason: string;
}


export class DeleteCommodityModel  implements IDeleteCommodityModel {
    id: number;
    changeReason: string;
}
