import {observer} from "mobx-react-lite";
import {OverviewBox} from "./OverviewBox.tsx";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

export const OverviewBoxContent = observer(() => {
    const contentCardProps = {
        card: "contents",
        icon: <ContentCopyOutlinedIcon fontSize="large"/>,
        color: "--color3",
        link: true,
        data: [{
            name: "Items",
            value: 12458,
        }, {
            name: "Official",
            value: 3251,
        }, {
            name: "Inofficial",
            value: 2251,
        }]
    }

    return <OverviewBox {...contentCardProps}/>
})