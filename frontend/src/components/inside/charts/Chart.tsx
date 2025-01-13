import {PieChart} from "@mui/x-charts/PieChart";
import "./Chart.scss";


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
        <div>
            <PieChart
                width={300}
                height={250}
                colors={colors}
                series={[
                    {
                        data: createData,
                        innerRadius: 30,
                        outerRadius: 120,
                        highlightScope: {fade: "global", highlight: "item"},
                        faded: {innerRadius: 30, additionalRadius: -30, color: "gray"},
                        cx: 150,
                        cy: 125,
                        arcLabel: (item) => `${item.label}`,
                        arcLabelMinAngle: 20,
                        arcLabelRadius: "80%",
                    },
                ]}
                slotProps={{
                    legend: { hidden: true },
                }}
            />
        </div>
    )
}