//TODO: Make generic, add generic toJSON / fromJSON methods

export abstract class AbstractModel {
    abstract class: string;
    abstract guid: string;

    protected constructor() {
    }
}
