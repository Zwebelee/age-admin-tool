import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import {UsersScreenFilters} from "../components/inside/filters/UsersScreenFilters.tsx";
import {useRootStore} from "../stores/root-store.ts";
import {useTranslation} from "react-i18next";
import {GridColDef} from "@mui/x-data-grid";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import {observer} from "mobx-react-lite";


export const UsersScreen = observer(() => {
    const { t } = useTranslation();
    const { portalUserStore } = useRootStore();
    const rows = portalUserStore.visibleItems.map((item) => ({
        id: item.userid,
        ...item,
    }));
    const columns: GridColDef[] = [
        { field: "id",          headerName: "ID",                    width:  80 },
        { field: "guid",        headerName: "GUID",                  width: 320 },
        { field: "firstname",   headerName: t("firstname"),     width: 180 },
        { field: "lastname",    headerName: t("lastname"),      width: 180 },
        { field: "fullname",    headerName: t("fullname"),      width: 180 },
        { field: "username",    headerName: t("username"),      width: 180 },
        { field: "email",       headerName: t("email"),         width: 240 },
        { field: "homepage",    headerName: t("homepage"),      width: 240 },
        { field: "description", headerName: t("description"),   width: 240 },
        { field: "status",      headerName: t("status"),        width: 100 },
        { field: "lastlogin",   headerName: t("last-login"),    width: 240 },
        { field: "modified",    headerName: t("modified"),      width: 240 },
        { field: "created",     headerName: t("created"),       width: 240 },
        { field: "provider",    headerName: t("provider"),      width: 150 },
        { field: "role",        headerName: t("role"),          width: 100 },
        { field: "roleid",      headerName: t("role-id"),       width: 120 },
        { field: "customrole",  headerName: t("custom-role"),   width: 240 },
        { field: "disabled",    headerName: t("disabled"),      width: 180 },
        { field: "licensetype", headerName: t("license"),       width: 180 },
        { field: "usertype",    headerName: t("usertype"),      width: 180 },
        { field: "access",      headerName: t("access"),        width: 180 },
        { field: "storeage",    headerName: t("storage-usage"), width: 240 },
        { field: "itemcount",   headerName: t("item-count"),    width: 180 },
        { field: "groupcount",  headerName: t("group-count"),   width: 200 },
        { field: "adstatus",    headerName: t("ad-status"),     width: 200 },
        { field: "division1",   headerName: t("division1"),     width: 180 },
        { field: "division2",   headerName: t("division2"),     width: 180 },
        { field: "division3",   headerName: t("division3"),     width: 180 },
        { field: "division4",   headerName: t("division4"),     width: 180 },
    ];
    const hiddenColumns = {
        id: false,
        guid: false,
        fullname: false,
        modified: false,
        created: false,
        roleid: false,
        division1: false,
        division2: false,
        division3: false,
        division4: false,
    };

    return (
        <>
            <OverviewBox
                card="users"
                icon={<PeopleAltOutlinedIcon fontSize="large"/>}
                color="--color2"
                link={false}
                data={[{
                    name: "users",
                    value: 12458,
                }, {
                    name: "creators",
                    value: 1819,
                    maxValue: 4000
                }, {
                    name: "viewer",
                    value: 4895,
                    maxValue: 8000
                }, {
                    name: "users",
                    value: 12458,
                }, {
                    name: "creators",
                    value: 1819,
                    maxValue: 4000
                }, {
                    name: "viewer",
                    value: 4895,
                    maxValue: 8000
                }, {
                    name: "users",
                    value: 12458,
                }, {
                    name: "creators",
                    value: 1819,
                    maxValue: 4000
                }, {
                    name: "viewer",
                    value: 4895,
                    maxValue: 8000
                }]}
            ></OverviewBox>
            <InsideBox
                color="--color2"
                rows={rows}
                columns={columns}
                hiddenColumns={hiddenColumns}
                filter={<UsersScreenFilters/>}
            ></InsideBox>
        </>
    );
});
