import {PortalUser} from "../../models/portaluser.ts";
import dayjs from 'dayjs';


export class PortalUserLastLoginFilter {
    static apply(portalusers: PortalUser[], filters: string[]): PortalUser[] {
        if (!filters || filters.length === 0) {
            return portalusers;
        }
        // Find the lastlogin filter
        const lastLoginFilter = filters.find(f => f.startsWith("lastlogin-"));
        if (!lastLoginFilter) {
            return portalusers;
        }
        // Extract the date from the filter string
        const filterDateStr = lastLoginFilter.replace("lastlogin-", "");
        const filterDate = dayjs(filterDateStr);

        return portalusers.filter(p => {
            const userLastLogin = dayjs(p.lastlogin);
            return userLastLogin.isBefore(filterDate);
        });
    }
}