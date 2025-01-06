import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import {useTranslation} from "react-i18next";
import {useRootStore} from "../stores/root-store.ts";
import {GridColDef} from "@mui/x-data-grid";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";

export const GroupsScreen = () => {

    const { t } = useTranslation();
    const { portalGroupStore} = useRootStore();
    const rows = portalGroupStore.visibleItems.map((item) => ({
        tableId: item.id,
        ...item,
    }));
    const columns: GridColDef[] = [
        { field: "tableId",           headerName: "ID",                         width: 320 },
        { field: "guid",              headerName: "GUID",                       width: 320 },
        { field: "capabilities",      headerName: t("capabilities"),       width: 180 },
        { field: "owner",             headerName: t("owner"),              width: 180 },
        { field: "modifiedat",        headerName: t("modified"),           width: 240 },
        { field: "createdat",         headerName: t("created"),            width: 240 },
        { field: "access",            headerName: t("access"),             width: 120 },
        { field: "title",             headerName: t("title"),              width: 180 },
        { field: "description",       headerName: t("description"),        width: 300 },
        { field: "snippet",           headerName: t("snippet"),            width: 240 },
        { field: "thumbnail",         headerName: t("thumbnail"),          width: 240 },
        { field: "homepage",          headerName: t("homepage"),           width: 300 },
        { field: "tags",              headerName: t("tags"),               width: 240 },
        { field: "membercount",       headerName: t("member-count"),       width: 240 },
        { field: "contentcount",      headerName: t("content-count"),      width: 240 },
        { field: "leavingdisallowed", headerName: t("leaving-disallowed"), width: 240 },
        { field: "isreadonly",        headerName: t("is-readonly"),        width: 340 },
        { field: "isviewonly",        headerName: t("is-viewonly"),        width: 240 },
        { field: "isprotected",       headerName: t("is-protected"),       width: 240 },
        { field: "hiddenmembers",     headerName: t("hidden-members"),     width: 240 },
        { field: "isinvitationonly",  headerName: t("is-invitation-only"), width: 280 },
        { field: "iseditinggroup",    headerName: t("is-editing-group"),   width: 240 },
        { field: "type",              headerName: t("type"),               width: 180 },
    ];
    const hiddenColumns = {
        tableId: false,
        guid: false,
    };

    return (
        <>
            <OverviewBox
                card="groups"
                icon={<HolidayVillageOutlinedIcon fontSize="large"/>}
                color="--color5"
                link={false}
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewBox>
            <InsideBox
                color="--color5"
                rows={rows}
                columns={columns}
                hiddenColumns={hiddenColumns}
            ></InsideBox>
        </>
    );
};