import {useRootStore} from "../../../stores/root-store.ts";
import chartFunctions from "./chartFunctions.ts";
import {Chart} from "./Chart.tsx";
import {useTranslation} from "react-i18next";

export const UsersScreenCharts = () => {

    const { t } = useTranslation();
    const { portalUserStore } = useRootStore();
    const rows = portalUserStore.visibleItems.map((item) => ({
        id: item.userid,
        license: item.licensetype,
    }));

    const getColor = (color: string) => getComputedStyle(document.body).getPropertyValue(color);
    const color1 = chartFunctions.rgbaToRgb(getColor("--color1"));

    const { themeStore } = useRootStore();
    let themeColor = {};
    if (themeStore.theme === "light") {
        themeColor = chartFunctions.rgbaToRgb(getColor("--color7"));
    } else {
        themeColor = chartFunctions.rgbaToRgb(getColor("--color2"));
    }

    const licenseValue = chartFunctions.countProperties(rows, "license");
    const licenseLength = licenseValue.length;

    return (
        <div>
            <h3>{t("charts.licenceNumbersByType")}</h3>
            <Chart
                data={licenseValue}
                colors={chartFunctions.chartColors(themeColor.toString(), color1.toString(), licenseLength)}
            ></Chart>
        </div>
    )
}