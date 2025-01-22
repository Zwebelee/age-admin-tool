import {PortalUser} from "../../models/portaluser.ts";

export class PortalUserStatusFilter {
    static apply(portalusers: PortalUser[], filters: string[]): PortalUser[] {
        if (!filters || filters.length === 0) {
            return portalusers;
        }
        // check if process filters included
        if (!filters.some((f) => f.includes("status-"))) {
            // no process filters
            return portalusers;
        }
        return portalusers.filter((p) => {
            const key = `status-${p.status}`;
            // show status when filter key matches
            return filters.includes(key);
        });
    }
}
