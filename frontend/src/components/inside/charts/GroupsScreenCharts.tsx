import {useRootStore} from "../../../stores/root-store.ts";
import {Chart} from "./Chart.tsx";
import {useTranslation} from "react-i18next";
import {utils} from "../../../utils/utils.ts";


export const GroupsScreenCharts = () => {

    const {t} = useTranslation();
    const {portalGroupStore} = useRootStore();
    const rows = portalGroupStore.visibleItems.map((item) => ({
        tableId: item.id,
        owner: item.owner,
        access: item.access,
        type: item.type,
    }));

    const color1 = utils.rgbaToRgb(utils.getColor("--color1"));

    const {themeStore} = useRootStore();
    let themeColor = {};
    if (themeStore.theme === "light") {
        themeColor = utils.rgbaToRgb(utils.getColor("--color10"));
    } else {
        themeColor = utils.rgbaToRgb(utils.getColor("--color5"));
    }

    const ownerValue = utils.countProperties(rows, "owner");
    const accessValue = utils.countProperties(rows, "access");
    const typeValue = utils.countProperties(rows, "type");

    const ownerLength = ownerValue.length;
    const accessLength = accessValue.length;
    const typeLength = typeValue.length;

    return (
        <div className="charts">
            <div>
                <h3>{t("charts.groupsNumbersByOwner")}</h3>
                <Chart
                    data={ownerValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), ownerLength)}
                ></Chart>
            </div>
            <div>
                <h3>{t("charts.accessNumbersByType")}</h3>
                <Chart
                    data={accessValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), accessLength)}
                ></Chart>
            </div>
            <div>
                <h3>{t("charts.contentNumbersByType")}</h3>
                <Chart
                    data={typeValue}
                    colors={utils.chartColors(themeColor.toString(), color1.toString(), typeLength)}
                ></Chart>
            </div>
        </div>
    )
}