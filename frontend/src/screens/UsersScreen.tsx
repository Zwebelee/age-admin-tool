import {OverviewLink} from "../components/Overview/OverviewLink.tsx";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

export const UsersScreen = () => {
    return (
        <OverviewLink
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
            }]}
        ></OverviewLink>
    );
};