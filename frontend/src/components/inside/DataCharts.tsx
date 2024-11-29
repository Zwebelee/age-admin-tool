import "./DataCharts.scss";

export const DataCharts = ({ color, display }: {
    color: string;
    display: boolean;
}) => {
    const dynamicClass = display ? "dataCharts dataCharts" + color : "dataChartsHidden";
    return (
        <div className={dynamicClass}>
            <p>Charts</p>
        </div>
    );
};