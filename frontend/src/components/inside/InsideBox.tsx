import {useState} from "react";

import {DataFilters} from "./DataFilters.tsx";
import {DataHandle} from "./DataHandle.tsx";
import {DataTable} from "./DataTable.tsx";
import {DataCharts} from "./DataCharts.tsx";
import {DataView} from "./DataView.tsx";
import "./InsideBox.scss";
import {GridColDef} from "@mui/x-data-grid";

interface InsideBoxProps {
    color: string;
    rows: any;
    columns: GridColDef[];
    hiddenColumns: any;
    filter: JSX.Element;
}


export const InsideBox = ({ color, rows, columns, hiddenColumns, filter }: InsideBoxProps) => {

    const [innerView, setInnerView] = useState("table");
    const viewSwitch = (view: string) => {
        setInnerView(view);
    };

    return (
        <div className="insideBox">
            <DataFilters
                filter={filter}>
            </DataFilters>
            <DataHandle>
            </DataHandle>
            <DataTable
                color={color}
                display={innerView === "table"}
                rows={rows}
                columns={columns}
                hiddenColumns={hiddenColumns}
            ></DataTable>
            <DataCharts
                color={color}
                display={innerView === "charts"}
            ></DataCharts>
            <DataView
                viewSwitch={viewSwitch}
            ></DataView>
        </div>
    );
};