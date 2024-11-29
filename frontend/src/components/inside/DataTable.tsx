import "./DataTable.scss";

export const DataTable = ({ color, display }: {
    color: string;
    display: boolean;
}) => {
    const dynamicClass = display ? "dataTable dataTable" + color : "dataTableHidden";
    return (
        <div className={dynamicClass}>
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
                    <tr className="dataTable__bodyRow">
                        <td className="dataTable__bodyCell">Dolor sit</td>
                        <td className="dataTable__bodyCell">102</td>
                        <td className="dataTable__bodyCell">15552</td>
                        <td className="dataTable__bodyCell">18</td>
                    </tr>
                    <tr className="dataTable__bodyRow">
                        <td className="dataTable__bodyCell">Amet</td>
                        <td className="dataTable__bodyCell">12</td>
                        <td className="dataTable__bodyCell">9444</td>
                        <td className="dataTable__bodyCell">564</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};