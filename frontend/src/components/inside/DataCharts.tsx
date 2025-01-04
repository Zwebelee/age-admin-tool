import { PieChart } from "@mui/x-charts/PieChart"; // Chart 1, Installed Package

import "./DataCharts.scss";

interface dataChartsProps {
    color: string;
    display: boolean;
    filterView: boolean;
}


export const DataCharts = ({ color, display, filterView }: dataChartsProps) => {
    const dynamicClass1 = display ? "dataCharts dataCharts" + color : "dataChartsHidden";
    const dynamicClass2 = filterView ? dynamicClass1 + " dataCharts--filtersVisible" : dynamicClass1;
    return (
        <div className={dynamicClass2}>

            {/* Chart 1 */}
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: "series A" },
                            { id: 1, value: 15, label: "series B" },
                            { id: 2, value: 20, label: "series C" },
                        ],
                        innerRadius: 30,
                        outerRadius: 100,
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                    },
                ]}
                width={400}
                height={200}
            />

        </div>
    );
};