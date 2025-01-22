import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {observer} from "mobx-react-lite";
import "./AgeEditorToolAddButton.scss";

interface AgeEditorToolAddButtonProps {
    onClick: () => void;
}


export const AgeEditorToolAddButton = observer(({onClick}: AgeEditorToolAddButtonProps) => {
    const {t} = useTranslation();
    return (
        <div className="ageEditorToolAddButton">
            <Button variant="contained" onClick={onClick}>
                {t("actions.add.title")}
            </Button>
        </div>
    )
});