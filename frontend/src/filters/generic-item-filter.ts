import { StatusEnum } from "../models/portaluser.ts";

//TODO Work in progress - acts as e generic filter for default string and nubmer filtering

export class GenericItemFilter<T> {
    static apply<T>(items: T[], filters: string[], filterField: keyof T): T[] {
        if (!filters || filters.length === 0) {
            return items;
        }
        //TODO: CONTINUE HERE - COMPARE with f.inclucdes("status-")... !
        return items.filter((item) => {
            const value = item[filterField];
            const key = `${String(filterField)}-${GenericItemFilter.getValueString(value)}`;
            return filters.includes(key);
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