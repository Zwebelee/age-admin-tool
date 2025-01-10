import {useRootStore} from "../../../stores/root-store.ts";
import chartFunctions from "./chartFunctions.ts";
import {Chart} from "./Chart.tsx";

export const UsersScreenCharts = () => {

    const { portalUserStore } = useRootStore();
    const rows = portalUserStore.visibleItems.map((item) => ({
        id: item.userid,
        license: item.licensetype,
    }));
    const licenseValue = chartFunctions.countProperties(rows, "license");

    return (
        <div>
            <h3>Anzahl Lizenzen nach Typ</h3>
            <Chart
                data={licenseValue}
            ></Chart>
        </div>
    )
}