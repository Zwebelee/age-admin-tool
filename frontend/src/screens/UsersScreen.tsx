import { OverviewBox } from "../components/overview/OverviewBox.tsx";
import { InsideBox } from "../components/inside/InsideBox.tsx";
import { useRootStore } from "../stores/root-store.ts";
import { GridColDef } from "@mui/x-data-grid";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";


export const UsersScreen = () => {

    const { portalUserStore } = useRootStore();
    const rows = portalUserStore.visibleItems.map((item) => ({
        id: item.userid,
        ...item,
    }));
    const columns: GridColDef[] = [
        { field: "id",        headerName: "ID",        width:  80 },
        { field: "guid",      headerName: "GUID",      width: 320 },
        { field: "firstname", headerName: "Firstname", width: 120 },
        { field: "lastname",  headerName: "Lastname",  width: 120 },
        { field: "fullname",  headerName: "Fullname",  width: 120 },
        { field: "username",  headerName: "Username",  width: 120 },
    ];
    const hiddenColumns = {
        id: false,
        guid: false,
        fullname: false,
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
            ></InsideBox>
        </>
    );
};