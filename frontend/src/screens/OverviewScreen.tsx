import "./OverviewScreen.scss";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../stores/root-store.ts";
import {Loading} from "../components/loading/Loading.tsx";
import {OverviewBoxUser} from "../components/overview/OverviewBoxUser.tsx";
import {OverviewBoxContent} from "../components/overview/OverviewBoxContent.tsx";
import {OverviewBoxTask} from "../components/overview/OverviewBoxTask.tsx";
import {OverviewBoxGroups} from "../components/overview/OverviewBoxGroups.tsx";
import {OverviewBoxAgeComponents} from "../components/overview/OverviewBoxAgeComponents.tsx";

export const OverviewScreen = observer(() => {
    const {portalLicenseStore} = useRootStore()


    return (
        <div className="overviewScreen">
            {portalLicenseStore.isLoading ? <Loading/> : (
                portalLicenseStore.isLoaded && <OverviewBoxUser />
            )}
            <OverviewBoxContent/>
            <OverviewBoxTask/>
            <OverviewBoxGroups/>
            <OverviewBoxAgeComponents/>
        </div>
    );
});