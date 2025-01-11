interface countPropertiesProps {
    [key: string]: any;
}

const chartFunctions = {

    countProperties: (data: countPropertiesProps[], property: string): { key: string; count: number }[] => {
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

    chartColors: (color1: string, color2: string, steps: number): string[] => {

        function parseRGB(color: string): [number, number, number] {
            const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (!match) throw new Error("Invalid colour format");
            return match.slice(1, 4).map(Number) as [number, number, number];
        }
        function rgbToString(rgb: [number, number, number]): string {
            return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        }

        const rgb1 = parseRGB(color1);
        const rgb2 = parseRGB(color2);
        const middleSteps = steps - 2;

        if (middleSteps === -1) {
            return [color1];
        }
        if (middleSteps < -1) {
            throw new Error("Number of steps must be higher than 0");
        }
        if (middleSteps > 97) {
            throw new Error("Number of steps must be less than 100");
        }

        const result: string[] = [rgbToString(rgb1)];

        for (let i = 1; i <= middleSteps; i++) {
            const ratio = i / (middleSteps + 1);
            const middleColor: [number, number, number] = rgb1.map((c1, index) =>
                Math.round(c1 + ratio * (rgb2[index] - c1))
            ) as [number, number, number];
            result.push(rgbToString(middleColor));
        }

        result.push(rgbToString(rgb2));

        return result;
    },

    rgbaToRgb: (rgba: string): string => {
        const rgbaPattern = /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d*(?:\.\d+)?)\s*\)/;
        const match = rgba.match(rgbaPattern);

        if (!match) {
            throw new Error("Invalid colour format");
        }

        const [_, r, g, b] = match;

        return `rgb(${r}, ${g}, ${b})`;
    },

};

export default chartFunctions;