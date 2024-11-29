import { useState } from "react";

import {DataFilters} from "./DataFilters.tsx";
import {DataTable} from "./DataTable.tsx";
import {DataCharts} from "./DataCharts.tsx";
import {DataView} from "./DataView.tsx";
import "./InsideBox.scss";


export const InsideBox = ({ color }: {
    color: string;
}) => {

    const [innerView, setInnerView] = useState("table");
    const viewSwitch = (view: string) => {
        setInnerView(view);
    };

    return (
        <div className="insideBox">
            <DataFilters></DataFilters>
            <DataTable
                color={color}
                display={innerView === "table"}
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