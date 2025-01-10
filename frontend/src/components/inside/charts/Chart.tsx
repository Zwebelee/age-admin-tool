import {PieChart} from "@mui/x-charts/PieChart";


interface DataItem {
    key: string;
    count: number;
}
interface ChartProps {
    data: DataItem[];
}


export const Chart = ({data}: ChartProps) => {

    const createData = data.map((item: DataItem, index: number) => ({
        id: index,
        label: item.key,
        value: item.count,
    }));

    return (
        <PieChart
            colors={[
                "rgb(255, 241, 117)",
                "rgb(205, 225, 139)",
                "rgb(157, 209, 160)",
                "rgb(69, 181, 198)",
                "rgb(0, 159, 227)",
            ]}
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