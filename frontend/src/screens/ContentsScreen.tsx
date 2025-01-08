import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import {NoFilters} from "../components/inside/filters/NoFilters.tsx";
import {NoCharts} from "../components/inside/charts/NoCharts.tsx";
import {useTranslation} from "react-i18next";
import {useRootStore} from "../stores/root-store.ts";
import {GridColDef} from "@mui/x-data-grid";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";


export const ContentsScreen = () => {

    const { t } = useTranslation();
    const { portalItemStore } = useRootStore();
    const rows = portalItemStore.visibleItems.map((item) => ({
        tableId: item.id,
        ...item,
    }));
    const columns: GridColDef[] = [
        { field: "tableId",       headerName: "ID",                     width:  80 },
        { field: "guid",          headerName: "GUID",                   width: 320 },
        { field: "title",         headerName: t("title"),          width: 180 },
        { field: "type",          headerName: t("type"),           width: 180 },
        { field: "owner",         headerName: t("owner"),          width: 180 },
        { field: "homepage",      headerName: t("homepage"),       width: 240 },
        { field: "url",           headerName: "URL",                    width: 320 },
        { field: "sizebyte",      headerName: t("size-byte"),      width: 240 },
        { field: "sharing",       headerName: t("sharing"),        width: 240 },
        { field: "groupsharing",  headerName: t("groupsharing"),   width: 240 },
        { field: "folder",        headerName: t("folder"),         width: 240 },
        { field: "editable",      headerName: t("editable"),       width: 240 },
        { field: "viewcount",     headerName: t("viewcount"),      width: 240 },
        { field: "usagequota",    headerName: t("usage-quota"),    width: 240 },
        { field: "contentstatus", headerName: t("content-status"), width: 240 },
        { field: "modifiedat",    headerName: t("modified"),       width: 240 },
        { field: "createdat",     headerName: t("created"),        width: 240 },
        { field: "snippet",       headerName: t("snippet"),        width: 240 },
        { field: "description",   headerName: t("description"),    width: 240 },
        { field: "thumbnail",     headerName: t("thumbnail"),      width: 240 },
        { field: "tags",          headerName: t("tags"),           width: 240 },
    ];
    const hiddenColumns = {
        tableId: false,
        guid: false,
        url: false,
        modifiedat: false,
        createdat: false,
    };

    return (
        <>
            <OverviewBox
                card="contents"
                icon={<ContentCopyOutlinedIcon fontSize="large"/>}
                color="--color3"
                link={false}
                data={[{
                    name: "Items",
                    value: 12458,
                }, {
                    name: "Official",
                    value: 3251,
                }, {
                    name: "Inofficial",
                    value: 2251,
                }]}
            ></OverviewBox>
            <InsideBox
                color="--color3"
                rows={rows}
                columns={columns}
                hiddenColumns={hiddenColumns}
                filter={<NoFilters/>}
                charts={<NoCharts/>}
            ></InsideBox>
        </>
    );
};