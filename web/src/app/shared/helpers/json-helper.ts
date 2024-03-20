export class JsonHelper {

    static getJsonFromKeyValue(key: string, value: any): {} {
        const json = {};
        json[key] = value;
        return json;
    }

}
