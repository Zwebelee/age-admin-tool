import {DataFilters} from "./DataFilters.tsx";
import {DataList} from "./DataList.tsx";
import {DataCharts} from "./DataCharts.tsx";

export const InsideBox = () => {
    return (
        <>
            <DataFilters></DataFilters>
            <DataList></DataList>
            <DataCharts></DataCharts>
        </>
    );
};