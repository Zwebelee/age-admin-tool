import {PieChart} from "@mui/x-charts/PieChart";


interface DataItem {
    key: string;
    count: number;
}
interface ChartProps {
    data: DataItem[];
    colors: string[];
}


export const Chart = ({data, colors}: ChartProps) => {

    const createData = data.map((item: DataItem, index: number) => ({
        id: index,
        label: item.key,
        value: item.count,
    }));

    return (
        <PieChart
            colors={colors}
            series={[
                {
                    data: createData,
                    innerRadius: 30,
                    outerRadius: 120,
                    highlightScope: {fade: "global", highlight: "item"},
                    faded: {innerRadius: 30, additionalRadius: -30, color: "gray"},
                },
            ]}
            width={400}
            height={300}
        />
    )
}