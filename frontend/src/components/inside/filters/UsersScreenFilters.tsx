import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {useTranslation} from "react-i18next";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import {useRootStore} from "../../../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {FilterAccordion} from "./FilterAccordion.tsx";

interface UsersScreenFiltersProps {
    color: string;
    iconSpace: number;
}


export const UsersScreenFilters = observer(({color, iconSpace}: UsersScreenFiltersProps) => {
    const {t} = useTranslation();
    const {portalUserStore} = useRootStore();
    const statusValues = ["active", "pending", "deleted"]; // TODO: Loading from Backend

    return (
        <>
            <Accordion
                sx={{
                    background: color,
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>
                        <ContentPasteOutlinedIcon sx={{marginRight: iconSpace}}/>
                        {t("status")}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {statusValues.map((item) =>
                            <FormControlLabel control={<Checkbox/>} label={item}/>
                        )}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    background: color,
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>
                        <VisibilityOffOutlinedIcon sx={{marginRight: iconSpace}}/>
                        {t("disabled")}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup
                        aria-labelledby="disabled"
                        defaultValue="all"
                        name="disabled"
                    >
                        <FormControlLabel value="all" control={<Radio/>} label={t("all")}/>
                        <FormControlLabel value="false" control={<Radio/>} label={t("not-deactivated")}/>
                        <FormControlLabel value="true" control={<Radio/>} label={t("deactivated")}/>
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>
            <FilterAccordion
                accordionName={"Role"} //TODO: pass translation!
                filterFieldName={"Role"}
                accordIcon={<ContentPasteOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"role"}
            />
            <FilterAccordion
                accordionName={"Status"}
                filterFieldName={"Status"}
                accordIcon={<ContentPasteOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"status"}
            />
            <FilterAccordion
                accordionName={"License"}
                filterFieldName={"License"}
                accordIcon={<ContentPasteOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"licensetype"}
            />
            <FilterAccordion
                accordionName={"Item Count"}
                filterFieldName={"Item Count"}
                accordIcon={<ContentPasteOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"itemcount"}
                filterMode={'number'}
            />
            <FilterAccordion
                accordionName={"Storage Use"}
                filterFieldName={"Storage"}
                accordIcon={<ContentPasteOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"storeage"}
                filterMode={'number'}
            />
            <FilterAccordion
                accordionName={"Last Login"}
                filterFieldName={"Last login before"}
                accordIcon={<ContentPasteOutlinedIcon/>}
                store={portalUserStore}
                storeFilterField={"lastlogin"}
                filterMode={'date'}
            />
        </>
    );
});
