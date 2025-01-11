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
    const licenseLength = licenseValue.length;

    const getColor = (color: string) => getComputedStyle(document.body).getPropertyValue(color);
    const color1 = chartFunctions.rgbaToRgb(getColor("--color1"));

    const { themeStore } = useRootStore();
    let themeColor = {};
    if (themeStore.theme === "light") {
        themeColor = chartFunctions.rgbaToRgb(getColor("--color7"));
    } else {
        themeColor = chartFunctions.rgbaToRgb(getColor("--color2"));
    }

    return (
        <div>
            <h3>Anzahl Lizenzen nach Typ</h3>
            <Chart
                data={licenseValue}
                colors={chartFunctions.chartColors(themeColor.toString(), color1.toString(), licenseLength)}
            ></Chart>
        </div>
    )
}