import {PortalLicense} from "../models/portallicense.ts";

// if implemented, adjust the get visibleItems() method in the store
//
//  get visibleItems(): PortalLicense[] {
//  let filtered = [...this.items.values()];
//
//  // filter items by filters
//  if (this.filters && Object.keys(this.filters).length > 0) {
//  filtered = PortallicenseFilter.apply(filtered, this.filters);
//  }
//  return [...filtered];


export class PortallicenseFilter {
    static apply(portallicenses: PortalLicense[], filters: { [key: string]: string[] }): PortalLicense[] {
        if (!filters || Object.keys(filters).length === 0) {
            return portallicenses;
        }

        return portallicenses.filter((license) => {
            return Object.keys(filters).every((key) => {
                const filterValues = filters[key];
                if (!filterValues || filterValues.length === 0) {
                    return true;
                }
                const licenseValue = (license as unknown as Record<string, unknown>)[key];
                return filterValues.includes(licenseValue as string);
            });
        });
    }
}