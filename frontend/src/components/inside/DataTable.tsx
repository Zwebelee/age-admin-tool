import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import "./DataTable.scss";

interface DataTableProps {
    color: string;
    display: boolean;
    rows: any;
    columns: any;
    hiddenColumns: any;
}

export const DataTable = observer(({
    color, display, rows, columns, hiddenColumns }: DataTableProps
) => {

    const dynamicClass = display ? "dataTable dataTable" + color : "dataTableHidden";
    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div className={dynamicClass}>
            <div className="dataTable__table">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        columns: {
                            columnVisibilityModel: hiddenColumns,
                        },
                        pagination: { paginationModel },
                    }}
                    pageSizeOptions={[5, 10]}
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