import Grid from "@mui/material/Grid2";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import "./overviewCard.scss";

export const OverviewCard = ({
        card,
        icon,
        color,
        data
    }: {
        card: string,
        icon: JSX.Element,
        color: string,
        data: Array<{ name: string; value: number; maxValue?: number; }>
}) => {
    const {t} = useTranslation();
    return (
        <Grid size={{xs: 12, sm: 6, md: 4, lg: 4, xl: 4}}>
            <div className="overviewCard">
                <NavLink className="overviewCard__link" to={card}>
                    <div className="overviewCard__title">
                        <span className="overviewCard__icon">{icon}</span>
                        <h2 className="overviewCard__name">{t(card)}</h2>
                    </div>
                </NavLink>
            </div>
        </Grid>
    );
};