import "./DataCharts.scss";

interface dataChartsProps {
    color: string;
    display: boolean;
    filterView: boolean;
    charts: JSX.Element;
}


export const DataCharts = ({ color, display, filterView, charts }: dataChartsProps) => {
    const dynamicClass1 = display ? "dataCharts dataCharts" + color : "dataChartsHidden";
    const dynamicClass2 = filterView ? dynamicClass1 + " dataCharts--filtersVisible" : dynamicClass1;
    return (
        <div className={dynamicClass2}>
            {charts}
        </div>
    );
};