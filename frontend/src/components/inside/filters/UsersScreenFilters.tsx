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

interface UsersScreenFiltersProps {
    color: string;
    iconSpace: number;
}


export const UsersScreenFilters = ({color, iconSpace}: UsersScreenFiltersProps) => {
    const {t} = useTranslation();
    const statusValues = ["active", "pending", "deleted"]; // TODO: Loading from Backend
    return (
        <>
            {/* Status */}
            <Accordion
                sx={{
                    background: color,
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>
                        <ContentPasteOutlinedIcon sx={{ marginRight: iconSpace }} />
                        {t("status")}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {statusValues.map((item) =>
                            <FormControlLabel control={<Checkbox />} label={item} />
                        )}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            {/* Disabled */}
            <Accordion
                sx={{
                    background: color,
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>
                        <VisibilityOffOutlinedIcon sx={{ marginRight: iconSpace }} />
                        {t("disabled")}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup
                        aria-labelledby="disabled"
                        defaultValue="all"
                        name="disabled"
                    >
                        <FormControlLabel value="all" control={<Radio />} label={t("all")} />
                        <FormControlLabel value="false" control={<Radio />} label={t("not-deactivated")} />
                        <FormControlLabel value="true" control={<Radio />} label={t("deactivated")} />
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>
        </>
    );
};