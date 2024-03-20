export class IApiResponse<T> {
    count: number;
    value: T[];
}

export class ApiResponse<T> implements IApiResponse<T> {
    count: number;
    value: T[];

    constructor(result: any) {
        if (result) {
            this.count = result['@odata.count'];
            this.value = result['value'];
        }
    }
}
