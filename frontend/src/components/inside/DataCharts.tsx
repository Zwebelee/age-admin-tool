import "./DataCharts.scss";

export const DataCharts = ({ color }: {
    color: string;
}) => {
    const dynamicClass = "dataCharts dataCharts" + color;
    return (
        <div className={dynamicClass}>
            <p>Charts</p>
        </div>
    );
};