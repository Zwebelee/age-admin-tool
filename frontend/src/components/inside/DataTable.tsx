import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../stores/root-store.ts";
import {deDE} from "@mui/x-data-grid/locales";
import {frFR} from "@mui/x-data-grid/locales";
import "./DataTable.scss";

interface dataTableProps {
    color: string;
    display: boolean;
    rows: any;
    columns: GridColDef[];
    hiddenColumns: any;
    filterView: boolean;
}


export const DataTable = observer(({
    color, display, rows = [], columns = [], hiddenColumns = {}, filterView }: dataTableProps
) => {

    const dynamicClass1 = display ? "dataTable dataTable" + color : "dataTableHidden";
    const dynamicClass2 = filterView ? dynamicClass1 + " dataTable--filtersVisible" : dynamicClass1;
    const paginationModel = { page: 0, pageSize: 25 };

    const { languageStore } = useRootStore();
    let tableLanguage = {};
    if (languageStore.language === "de") {
        tableLanguage = deDE.components.MuiDataGrid.defaultProps.localeText;
    } else if (languageStore.language === "fr") {
        tableLanguage = frFR.components.MuiDataGrid.defaultProps.localeText;
    }

    return (
        <div className={dynamicClass2}>
            <div className="dataTable__table">
                <DataGrid
                    localeText={tableLanguage}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        columns: {
                            columnVisibilityModel: hiddenColumns,
                        },
                        pagination: { paginationModel },
                    }}
                    pageSizeOptions={[25, 50, 75, 100]}
                    sx={{
                        border: 0,
                        "& .MuiDataGrid-cell, & .MuiDataGrid-withBorderColor": {
                            borderColor: "text.primary",
                        },
                        "& .MuiDataGrid-container--top [role='row']": {
                            background: "transparent",
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            color: "text.primary",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontSize: "1.25rem",
                            fontWeight: "300",
                        },
                        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus": {
                            outlineOffset: "-0.25rem",
                        },
                    }}
                />
            </div>
        </div>
    );
});