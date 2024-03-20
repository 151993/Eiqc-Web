export class Automapper {

    static map<S, T>(source: S, target: T) {
        const targetKeys = Object.keys(target) as Array<keyof T>;
        for (const key of targetKeys) {
            target[key] = source[key.toString()];
        }
    }

}
