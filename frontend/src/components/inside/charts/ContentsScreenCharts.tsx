import {useRootStore} from "../../../stores/root-store.ts";
import {Chart} from "./Chart.tsx";
import {useTranslation} from "react-i18next";
import {utils} from "../../../utils.ts";


export const ContentsScreenCharts = () => {

    const {t} = useTranslation();
    const {portalItemStore} = useRootStore();
    const rows = portalItemStore.visibleItems.map((item) => ({
        tableId: item.id,
        type: item.type,
        sharing: item.sharing,
        contentstatus: item.contentstatus,
    }));

    const color1 = utils.rgbaToRgb(utils.getColor("--color1"));

    const {themeStore} = useRootStore();
    let themeColor;
    if (themeStore.theme === "light") {
        themeColor = utils.rgbaToRgb(utils.getColor("--color8"));
    } else {
        themeColor = utils.rgbaToRgb(utils.getColor("--color3"));
    }

    const typeValue = utils.countProperties(rows, "type");
    const sharingValue = utils.countProperties(rows, "sharing");
    const contentstatusValue = utils.countProperties(rows, "contentstatus");

    const typeLength = typeValue.length;
    const sharingLength = sharingValue.length;
    const contentstatusLength = contentstatusValue.length;

    return (
        <div className="charts">
            <div>
                <h3>{t("charts.contentNumbersByType")}</h3>
                <Chart
                    data={typeValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), typeLength)}
                ></Chart>
            </div>
            <div>
                <h3>{t("charts.sharingNumbersByType")}</h3>
                <Chart
                    data={sharingValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), sharingLength)}
                ></Chart>
            </div>
            <div>
                <h3>{t("charts.contentStatusNumbersByType")}</h3>
                <Chart
                    data={contentstatusValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), contentstatusLength)}
                ></Chart>
            </div>
        </div>
    )
}