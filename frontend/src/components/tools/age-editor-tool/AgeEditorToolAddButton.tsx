import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {observer} from "mobx-react-lite";
import Grid from "@mui/material/Grid2";

interface AgeEditorToolAddButtonProps {
    onClick: () => void;
}

export const AgeEditorToolAddButton = observer(({onClick}: AgeEditorToolAddButtonProps) => {
    const {t} = useTranslation();
    return (
        <Grid sx={{display:'flex', justifyContent:'end'}}>
            <Button
            variant="contained"
            onClick={onClick}
            sx={{width:'auto'}}
        >{t("actions.add.title")}</Button>
        </Grid>
    )
});