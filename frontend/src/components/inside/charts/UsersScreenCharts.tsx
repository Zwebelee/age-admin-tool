import {useRootStore} from "../../../stores/root-store.ts";
import {Chart} from "./Chart.tsx";
import {useTranslation} from "react-i18next";
import {utils} from "../../../utils.ts";


export const UsersScreenCharts = () => {

    const { t } = useTranslation();
    const { portalUserStore } = useRootStore();
    const rows = portalUserStore.visibleItems.map((item) => ({
        id: item.userid,
        license: item.licensetype,
    }));

    const color1 = utils.rgbaToRgb(utils.getColor("--color1"));

    const { themeStore } = useRootStore();
    let themeColor = {};
    if (themeStore.theme === "light") {
        themeColor = utils.rgbaToRgb(utils.getColor("--color7"));
    } else {
        themeColor = utils.rgbaToRgb(utils.getColor("--color2"));
    }

    const licenseValue = utils.countProperties(rows, "license");
    const licenseLength = licenseValue.length;

    return (
        <div>
            <h3>{t("charts.licenceNumbersByType")}</h3>
            <Chart
                data={licenseValue}
                colors={utils.chartColors(themeColor.toString(), color1.toString(), licenseLength)}
            ></Chart>
        </div>
    )
}