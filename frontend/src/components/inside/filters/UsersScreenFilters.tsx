import {useTranslation} from "react-i18next";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SdStorageOutlinedIcon from "@mui/icons-material/SdStorageOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import {useRootStore} from "../../../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {FilterAccordion} from "./FilterAccordion.tsx";
import Grid from "@mui/material/Grid2";
import {Button} from "@mui/material";
import { useState } from "react";

export const UsersScreenFilters = observer(() => {
    const {t} = useTranslation();
    const {portalUserStore} = useRootStore();
    const [resetKey, setResetKey] = useState(0);

    const handleReset = () => {
        portalUserStore.clearFilters();
        setResetKey(prevKey => prevKey + 1); // Update the state to trigger re-render
    }

    return (
        <Grid container key= {resetKey} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            "& .MuiGrid2-root": {
                width: "100%",
            }
        }}>
            <Grid>
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
                    accordionName={t("item-count")}
                    filterFieldName={t("item-count")}
                    accordIcon={<Inventory2OutlinedIcon/>}
                    store={portalUserStore}
                    storeFilterField={"itemcount"}
                    filterMode={"number"}
                />
                <FilterAccordion
                    accordionName={t("storage-usage")}
                    filterFieldName={t("storage-usage")}
                    accordIcon={<SdStorageOutlinedIcon/>}
                    store={portalUserStore}
                    storeFilterField={"storeage"}
                    filterMode={"number"}
                />
                <FilterAccordion
                    accordionName={t("last-login")}
                    filterFieldName={t("last-login-before")}
                    accordIcon={<LoginOutlinedIcon/>}
                    store={portalUserStore}
                    storeFilterField={"lastlogin"}
                    filterMode={"date"}
                />
            </Grid>
            <Grid sx={{textAlign: "center"}}>
                <Button variant={"contained"} onClick={handleReset}>{t("reset")}</Button>
            </Grid>
        </Grid>
    );
});
