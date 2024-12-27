import {useTranslation} from "react-i18next";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SdStorageOutlinedIcon from '@mui/icons-material/SdStorageOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {useRootStore} from "../../../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {FilterAccordion} from "./FilterAccordion.tsx";


export const UsersScreenFilters = observer(() => {
    const {t} = useTranslation();
    const {portalUserStore} = useRootStore();

    return (
        <>
            <FilterAccordion
                accordionName={t("role")}
                filterFieldName={t("role")}
                accordIcon={<PersonOutlineOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"role"}
            />
            <FilterAccordion
                accordionName={t("status")}
                filterFieldName={t("status")}
                accordIcon={<VisibilityOffOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"status"}
            />
            <FilterAccordion
                accordionName={t("license")}
                filterFieldName={t("license")}
                accordIcon={<LocalPoliceOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"licensetype"}
            />
            <FilterAccordion
                accordionName={t("item_count")}
                filterFieldName={t("item_count")}
                accordIcon={<Inventory2OutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"itemcount"}
                filterMode={'number'}
            />
            <FilterAccordion
                accordionName={t("storage_usage")}
                filterFieldName={t("storage_usage")}
                accordIcon={<SdStorageOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"storeage"}
                filterMode={'number'}
            />
            <FilterAccordion
                accordionName={t("last-login")}
                filterFieldName={t("last_login_before")}
                accordIcon={<LoginOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"lastlogin"}
                filterMode={'date'}
            />
        </>
    );
});
