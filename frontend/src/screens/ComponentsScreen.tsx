import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";
import {useTranslation} from "react-i18next";
import {useRootStore} from "../stores/root-store.ts";
import {GridColDef} from "@mui/x-data-grid";

export const ComponentsScreen = () => {

    const { t } = useTranslation();
    const { ageWebAdaptorStore, ageServerStore, agePortalStore, ageDataStoreStore } = useRootStore();

    //TODO: Extend ModelClasses with minimal-shared-props and proper type/class
    const webAdaptorItems = ageWebAdaptorStore.visibleItems.map((item) => ({
        ...item,
        type: "Web Adaptor",
        status: "online",
        description: item.description,
        name: item.machineName,
    }));

    const serverItems = ageServerStore.visibleItems.map((item) => ({
        ...item,
        type: "Server",
        status: "online",
        description: null,
        name: item.name,
    }));

    const portalItems = agePortalStore.visibleItems.map((item) => ({
        ...item,
        type: "Portal",
        status: "online",
        description: item.description,
        name: item.name,
    }));

    const dataStoreItems = ageDataStoreStore.visibleItems.map((item) => ({
        ...item,
        type: "Data Store",
        status: "online",
        description: item.description,
        name: item.name,
    }));

    const combinedItems = [
        ...webAdaptorItems,
        ...serverItems,
        ...portalItems,
        ...dataStoreItems
    ];

    const rows = combinedItems.map((item) => ({
        id: item.guid,
        ...item,
    }));

    const columns: GridColDef[] = [
        { field: "id",          headerName: "GUID",                width:  80 },
        { field: "type",        headerName: t("type"),        width: 240 },
        { field: "name",        headerName: t("name"),        width: 240 },
        { field: "status",      headerName: t("status"),      width: 180 },
        { field: "description", headerName: t("description"), width: 240 }
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