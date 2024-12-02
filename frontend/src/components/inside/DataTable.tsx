import "./DataTable.scss"; // Table 1

import Box from "@mui/material/Box"; // Table 2
import { DataGrid, GridColDef } from "@mui/x-data-grid"; // Table 2, Installed Package


// Table 1
function createData(
    key: number,
    column1: string,
    column2: number,
    column3: number,
    column4: number,
) {
    return { key, column1, column2, column3, column4 };
}
const rows1 = [
    createData(1,"Dolor sit", 102, 15552, 18),
    createData(2,"Amet", 12, 9444, 564),
];


// Table 2
const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 90,
    },
    {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
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


export const DataTable = ({ color, display }: {
    color: string;
    display: boolean;
}) => {
    const dynamicClass = display ? "dataTable dataTable" + color : "dataTableHidden";
    return (
        <div className={dynamicClass}>

            {/* Table 1 */}
            <table className="dataTable__table">
                <thead className="dataTable__head">
                <tr className="dataTable__headRow">
                    <td className="dataTable__headCell">Lorem ipsum</td>
                    <td className="dataTable__headCell">Justo</td>
                    <td className="dataTable__headCell">Fringilla vel</td>
                    <td className="dataTable__headCell">Aliquet</td>
                </tr>
                </thead>
                <tbody className="dataTable__body">
                {rows1.map((row) => (
                    <tr className="dataTable__bodyRow" key={row.key}>
                        <td className="dataTable__bodyCell">{row.column1}</td>
                        <td className="dataTable__bodyCell">{row.column2}</td>
                        <td className="dataTable__bodyCell">{row.column3}</td>
                        <td className="dataTable__bodyCell">{row.column4}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/><br/><br/><br/><br/>

            {/* Table 2 */}
            <Box sx={{
                height: 400
            }}>
                <DataGrid
                    rows={rows2}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ color: "#000", border: 0 }}
                />
            </Box>

        </div>
    );
};