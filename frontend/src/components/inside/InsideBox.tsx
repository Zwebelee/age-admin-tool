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
    charts: JSX.Element;
}


export const InsideBox = ({ color, rows, columns, hiddenColumns, filter, charts }: InsideBoxProps) => {

    const [innerView, setInnerView] = useState("table");
    const [filterView, setFilterView] = useState(false);
    const viewSwitch = (view: string) => {
        setInnerView(view);
    };
    const filterSwitch = () => {
        setFilterView(!filterView)
    }

    return (
        <div className="insideBox">
            <DataFilters
                filterView={filterView}
                filter={filter}
            ></DataFilters>
            <DataHandle
                filterView={filterView}
                onClickHandle={filterSwitch}
            ></DataHandle>
            <DataTable
                color={color}
                display={innerView === "table"}
                rows={rows}
                columns={columns}
                hiddenColumns={hiddenColumns}
                filterView={filterView}
            ></DataTable>
            <DataCharts
                color={color}
                display={innerView === "charts"}
                filterView={filterView}
                charts={charts}
            ></DataCharts>
            <DataView
                viewSwitch={viewSwitch}
            ></DataView>
        </div>
    );
};