import {PortalUser} from "../../models/portaluser.ts";

export class PortalUserLicenseFilter {
    static apply(portalusers: PortalUser[], filters: string[]): PortalUser[] {
        if (!filters || filters.length === 0) {
            return portalusers;
        }
        // check if process filters included
        if (!filters.some((f) => f.includes("licensetype-"))) {
            // no process filters
            return portalusers;
        }
        return portalusers.filter((p) => {
            const key = `licensetype-${p.licensetype}`;
            // show portaluser when filter key matches
            return filters.includes(key);
        });
    }
}