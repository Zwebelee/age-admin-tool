interface GenericObject {
    [key: string]: any;
}

const chartFunctions = {

    countProperties: (data: GenericObject[], property: string): { key: string; count: number }[] => {
        const result = data.reduce<Record<string, number>>((acc, item) => {
            const key = item[property];
            if (!key) {
                return acc;
            }
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] += 1;
            return acc;
        }, {});
        return Object.entries(result).map(([key, count]) => ({ key, count }));
    },

};

export default chartFunctions;