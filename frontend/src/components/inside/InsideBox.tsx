import {DataFilters} from "./DataFilters.tsx";
import {DataTable} from "./DataTable.tsx";
import {DataCharts} from "./DataCharts.tsx";
import {DataView} from "./DataView.tsx";
import "./InsideBox.scss";

export const InsideBox = ({ color }: {
    color: string;
}) => {
    return (
        <div className="insideBox">
            <DataFilters></DataFilters>
            <DataTable
                color={color}
            ></DataTable>
            <DataCharts
                color={color}
            ></DataCharts>
            <DataView></DataView>
        </div>
    );
};