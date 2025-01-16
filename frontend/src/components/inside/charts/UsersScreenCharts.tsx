import {useRootStore} from "../../../stores/root-store.ts";
import {Chart} from "./Chart.tsx";
import {useTranslation} from "react-i18next";
import {countPropertiesProps, utils} from "../../../utils/utils.ts";


export const UsersScreenCharts = () => {

    const {t} = useTranslation();
    const {portalUserStore} = useRootStore();
    const rows: countPropertiesProps<string>[] = portalUserStore.visibleItems.map((item) => ({
        id: item.userid,
        role: item.role,
        license: item.licensetype,
        status: item.status,
        itemcount: item.itemcount.toString(),
        storeage: item.storeage.toString(),
    }));

    const color1 = utils.rgbaToRgb(utils.getColor("--color1"));

    const {themeStore} = useRootStore();
    let themeColor;
    if (themeStore.theme === "light") {
        themeColor = utils.rgbaToRgb(utils.getColor("--color7"));
    } else {
        themeColor = utils.rgbaToRgb(utils.getColor("--color2"));
    }

    const roleValue = utils.countProperties(rows, "role");
    const statusValue = utils.countProperties(rows, "status");
    const licenseValue = utils.countProperties(rows, "license");
    const itemValue = utils.countProperties(rows, "itemcount");
    const storeageValue = utils.countProperties(rows, "storeage");

    const roleLength = roleValue.length;
    const statusLength = statusValue.length;
    const licenseLength = licenseValue.length;
    const itemLength = itemValue.length;
    const storeageLength = storeageValue.length;

    return (
        <div className="charts">
            <div>
                <h3>{t("charts.roleNumbersByType")}</h3>
                <Chart
                    data={roleValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), roleLength)}
                ></Chart>
            </div>
            <div>
                <h3>{t("charts.statusNumbersByType")}</h3>
                <Chart
                    data={statusValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), statusLength)}
                ></Chart>
            </div>
            <div>
                <h3>{t("charts.licenceNumbersByType")}</h3>
                <Chart
                    data={licenseValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), licenseLength)}
                ></Chart>
            </div>
            <div>
                <h3>{t("charts.itemNumbersByValue")}</h3>
                <Chart
                    data={itemValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), itemLength)}
                ></Chart>
            </div>
            <div>
                <h3>{t("charts.storeageNumbersByValue")}</h3>
                <Chart
                    data={storeageValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), storeageLength)}
                ></Chart>
            </div>
        </div>
    )
}