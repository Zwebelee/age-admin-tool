import {PortalUser} from "../../models/portaluser.ts";

export class PortalUserItemCountFilter {
    static apply(portalusers: PortalUser[], filters: string[]): PortalUser[] {
        if (!filters || filters.length === 0) {
            return portalusers;
        }

        // check if process filters included
        if (!filters.some((f) => f.includes("itemcount-"))) {
            // no process filters
            return portalusers;
        }

        return portalusers.filter((p) => {
            return filters.some((filter) => {
                const [, operator, value] = filter.split('-');

                const itemCount = p.itemcount;
                const filterValue = parseInt(value, 10);

                switch (operator) {
                    case '>':
                        return itemCount > filterValue;
                    case '>=':
                        return itemCount >= filterValue;
                    case '<':
                        return itemCount < filterValue;
                    case '<=':
                        return itemCount <= filterValue;
                    default:
                        return false;
                }
            });
        });
    }
}