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

    const {portalLicenseStore, portalItemStore, portalGroupStore} = useRootStore()

    return (
        <div className="overviewScreen">
            {portalLicenseStore.isLoading ? <Loading/> : (
                portalLicenseStore.isLoaded && <OverviewBoxUser/>
            )}

            {portalItemStore.isLoading ? <Loading/> : (
                portalItemStore.isLoaded && <OverviewBoxContent/>
            )}

            {/* Todo: Add taskStore */}
            {portalLicenseStore.isLoading ? <Loading/> : (
                portalLicenseStore.isLoaded && <OverviewBoxTask/>
            )}

            {portalGroupStore.isLoading ? <Loading/> : (
                portalGroupStore.isLoaded && <OverviewBoxGroups/>
            )}

            {/* Todo: Add ageDataStoreStore, agePortalStore, ageServerStore, ageWebAdaptorStore */}
            {portalLicenseStore.isLoading ? <Loading/> : (
                portalLicenseStore.isLoaded && <OverviewBoxAgeComponents/>
            )}
        </div>
    );
});