import { PortalUser } from "../../models/portaluser.ts";

export class PortalUserItemCountFilter {
    static apply(portalusers: PortalUser[], filters: string[]): PortalUser[] {
        if (!filters || filters.length === 0) {
            return portalusers;
        }

        return portalusers.filter((user) => {
            return filters.some((filter) => {
                const [operator, value] = filter.split('-');
                const itemCount = user.itemcount;
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