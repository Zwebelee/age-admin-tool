import {PortalLicense} from "../models/portallicense.ts";

export class PortallicenseNameFilter {
    static apply(portallicenses: PortalLicense[], filters: string[]): PortalLicense[] {
        if (!filters || filters.length === 0) {
            return portallicenses;
        }
        // check if process filters included
        if (!filters.some((f) => f.includes("name-"))) {
            // no process filters
            return portallicenses;
        }
        return portallicenses.filter((p) => {
            const key = `name-${p.name}`;
            // show portallicense when filter key matches
            return filters.includes(key);
        });
    }
}