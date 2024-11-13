import {OverviewLink} from "../components/Overview/OverviewLink.tsx";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

export const ContentsScreen = () => {
    return (
        <OverviewLink
            card="contents"
            icon={<ContentCopyOutlinedIcon fontSize="large"/>}
            color="--color3"
            link={false}
            data={[{
                name: "users",
                value: 12458,
            }]}
        ></OverviewLink>
    );
};