import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

export const ContentsScreen = () => {
    return (
        <>
            <OverviewBox
                card="contents"
                icon={<ContentCopyOutlinedIcon fontSize="large"/>}
                color="--color3"
                link={false}
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewBox>
            <InsideBox
                color="--color3"
            ></InsideBox>
        </>
    );
};