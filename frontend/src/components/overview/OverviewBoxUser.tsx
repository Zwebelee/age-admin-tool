import {observer} from "mobx-react-lite";
import {useRootStore} from "../../stores/root-store.ts";
import {OverviewBox} from "./OverviewBox.tsx";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";


export const OverviewBoxUser = observer(() => {

    const {portalLicenseStore} = useRootStore()

    const usersBoxData = portalLicenseStore.visibleItems.map(item => {
        return {
            name: item.name,
            value: item.currentusers,
            maxValue: item.maxusers
        }
    })

    const totalUsers = usersBoxData.reduce((total, current) => total + current.value, 0);
    const totalMaxUsers = usersBoxData.reduce((total, current) => total + current.maxValue, 0);

    usersBoxData.unshift({
        name: "Users",
        value: totalUsers,
        maxValue: totalMaxUsers
    });

    const userCardProps = {
        card: "users",
        icon: <PeopleAltOutlinedIcon fontSize="large"/>,
        color: "--color2",
        link: true,
        data: usersBoxData,
    }

    return <OverviewBox {...userCardProps}/>
})