/** import { StatusEnum } from "../models/portaluser.ts";


// WIP - acts as e generic filter for default string and number filtering only needing one filter
// applied like: filtered = GenericItemFilter.apply(filtered, this.filters, ['role', 'status', 'access]);

export class GenericItemFilter<T> {
    static apply<T>(items: T[], filters: string[], filterFields: (keyof T)[]): T[] {
        if (!filters || filters.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return filterFields.some((filterField) => {
                const value = item[filterField];
                const valueString = GenericItemFilter.getValueString(value);
                return filters.some(filter => valueString.includes(filter));
            });
        });
    }

    private static getValueString(value: any): string {
        if (typeof value === 'number') {
            return value.toString();
        } else if (Object.values(StatusEnum).includes(value)) {
            return value;
        } else if (value instanceof Date) {
            return value.toISOString();
        } else {
            return String(value);
        }
    }
}
 */