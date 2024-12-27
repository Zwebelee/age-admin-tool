import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";
import {useTranslation} from "react-i18next";
import {useRootStore} from "../stores/root-store.ts";
import {GridColDef} from "@mui/x-data-grid";

export const ComponentsScreen = () => {

    const { t } = useTranslation();
    const { ageDataStoreStore } = useRootStore();
    const rows = ageDataStoreStore.visibleItems.map((item) => ({
        id: item.guid,
        ...item,
    }));
    const columns: GridColDef[] = [
        { field: "id",          headerName: "GUID",                width:  80 },
        { field: "name",        headerName: t("name"),        width: 240 },
        { field: "alias",       headerName: "Alias",               width: 240 },
        { field: "type",        headerName: t("type"),        width: 240 },
        { field: "ishosted",    headerName: t("is-hosted"),   width: 180 },
        { field: "url",         headerName: "URL",                 width: 320 },
        { field: "status",      headerName: t("status"),      width: 180 },
        { field: "description", headerName: t("description"), width: 240 },
        { field: "capacity_gb", headerName: t("capacity-gb"), width: 180 },
        { field: "used_gb",     headerName: t("used-gb"),     width: 180 },
    ];
    const hiddenColumns = {
        id: false,
    };

    return (
        <>
            <OverviewBox
                card="components"
                icon={<SettingsInputComponentOutlinedIcon fontSize="large"/>}
                color="--color6"
                link={false}
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewBox>
            <InsideBox
                color="--color6"
                rows={rows}
                columns={columns}
                hiddenColumns={hiddenColumns}
            ></InsideBox>
        </>
    );
};