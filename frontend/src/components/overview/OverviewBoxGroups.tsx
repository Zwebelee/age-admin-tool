import {observer} from "mobx-react-lite";
import {OverviewBox} from "./OverviewBox.tsx";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";

export const OverviewBoxGroups = observer(() => {
    const groupsCardProps = {
        card: "groups",
        icon: <HolidayVillageOutlinedIcon fontSize="large"/>,
        color: "--color5",
        link: true,
        data: [{
            name: "Groups",
            value: 242,
        }, {
            name: "Administrativ",
            value: 56,
        }, {
            name: "Kollaborations",
            value: 6,
        }, {
            name: "Project",
            value: 156,
        }, {
            name: "Public",
            value: 10,
        }, {
            name: "Organisation",
            value: 27,
        }]
    }

    return <OverviewBox {...groupsCardProps}/>
})