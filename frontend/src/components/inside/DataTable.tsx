import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./DataTable.scss";


export const DataTable = ({ color, display }: {
    color: string;
    display: boolean;
}) => {

    const dynamicClass = display ? "dataTable dataTable" + color : "dataTableHidden";

    const getColor = (color: string) => getComputedStyle(document.body).getPropertyValue(color);
    const color1_1 = getColor("--color1-1");
    const color1_2 = getColor("--color1-2");
    const lightness1_5 = getColor("--lightness1-5");
    const lightness2_1 = getColor("--lightness2-1");
    const lightness2_2 = getColor("--lightness2-2");
    const lightness5 = getColor("--lightness5");

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "firstName", headerName: "First name", width: 200 },
        { field: "lastName", headerName: "Last name", width: 200 },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            width: 100,
        },
        {
            field: "fullName",
            headerName: "Full name",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 220,
            valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        },
    ];
    const rows2 = [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    ];
    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div className={dynamicClass}>

            <div className="dataTable__table">
                <DataGrid
                    rows={rows2}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{
                        color: "text.primary",
                        border: 0,
                        "& .MuiDataGrid-cell, & .MuiDataGrid-withBorderColor": {
                            borderColor: "text.primary",
                        },
                        "& .MuiDataGrid-container--top [role='row']": {
                            background: "transparent",
                        },
                        "& .MuiDataGrid-row--borderBottom .MuiDataGrid-columnHeader, & .MuiDataGrid-row--borderBottom .MuiDataGrid-filler": {
                            borderBottom: "none",
                        },
                        ".theme--dark & .MuiDataGrid-row:hover": {
                            backgroundColor: lightness2_2,
                        },
                        ".theme--light & .MuiDataGrid-row:hover": {
                            backgroundColor: lightness1_5,
                        },
                        "& .MuiDataGrid-row.Mui-selected": {
                            backgroundColor: color1_1,
                        },
                        "& .MuiDataGrid-row.Mui-selected:hover": {
                            backgroundColor: color1_2,
                        },
                        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus": {
                            outlineOffset: "-0.25rem",
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            color: "text.primary",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontSize: "1.25rem",
                            fontWeight: "300",
                        },
                        ".theme--dark & .MuiSvgIcon-root": {
                            color: lightness5,
                        },
                        ".theme--dark & .Mui-disabled .MuiSvgIcon-root": {
                            color: lightness2_1,
                        }
                    }}
                />
            </div>

        </div>
    );
};