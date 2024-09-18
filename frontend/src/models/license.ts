export interface ILicense {
    guid: string;
    name: string;
    availableLicenses: number;
    usedLicenses: number;

}

export class License implements ILicense{
    guid: string;
    name: string;
    availableLicenses: number;
    usedLicenses: number;

    constructor(data : ILicense) {
        this.guid = crypto.randomUUID();
        this.name = data.name;
        this.availableLicenses = data.availableLicenses;
        this.usedLicenses = data.usedLicenses;

        }}