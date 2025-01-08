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
            <h3>Anzahl Lizenzen nach Typ</h3>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: "type1", color: "rgba(255, 241, 117, 1.00)" },
                            { id: 1, value: 15, label: "type2", color: "rgba(205, 225, 139, 1.00)" },
                            { id: 2, value: 20, label: "type3", color: "rgba(157, 209, 160, 1.00)" },
                            { id: 3, value: 22, label: "type4", color: "rgba( 69, 181, 198, 1.00)" },
                            { id: 4, value: 18, label: "type5", color: "rgba(  0, 159, 227, 1.00)" },
                        ],
                        innerRadius: 30,
                        outerRadius: 120,
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                    },
                ]}
                width={400}
                height={300}
            />

        </div>
    );
};