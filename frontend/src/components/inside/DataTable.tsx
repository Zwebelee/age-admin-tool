import "./DataTable.scss";

export const DataTable = ({ color }: {
    color: string;
}) => {
    const dynamicClass = "dataTable dataTable" + color;
    return (
        <div className={dynamicClass}>
            <table>
                <thead>
                <tr>
                    <td>Lorem ipsum</td>
                    <td>Justo</td>
                    <td>Fringilla vel</td>
                    <td>Aliquet</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Dolor sit</td>
                    <td>102</td>
                    <td>15552</td>
                    <td>18</td>
                </tr>
                <tr>
                    <td>Amet</td>
                    <td>12</td>
                    <td>9444</td>
                    <td>564</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};