import {observer} from "mobx-react-lite";
import {OverviewBox} from "./OverviewBox.tsx";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";
import {useRootStore} from "../../stores/root-store.ts";

export const OverviewBoxAgeComponents = observer(() => {

    const {
        ageDataStoreStore,
        agePortalStore,
        ageServerStore,
        ageWebAdaptorStore
    } = useRootStore()

    const dataBlock = [
        {
            name: "DataStore",
            value: ageDataStoreStore.visibleItems.length,
        },
        {
            name: "Portal",
            value: agePortalStore.visibleItems.length,
        },
        {
            name: "Server",
            value: ageServerStore.visibleItems.length,
        },
        {
            name: "WebAdaptor",
            value: ageWebAdaptorStore.visibleItems.length,
        }
    ];

    const ageComponentsCardProps = {
        card: "components",
        icon: <SettingsInputComponentOutlinedIcon fontSize="large"/>,
        color: "--color6",
        link: true,
        data: dataBlock
    }

    return <OverviewBox {...ageComponentsCardProps}/>
})