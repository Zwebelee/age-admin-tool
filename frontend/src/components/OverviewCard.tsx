import Grid from "@mui/material/Grid2";
import {useTranslation} from "react-i18next";
import "./OverviewCard.scss";

import {NavLink} from "react-router-dom";
import {OverviewData} from "./OverviewData.tsx";

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
                    {data.map((item, index) => (
                        <OverviewData
                            key={index}
                            color={color}
                            name={item.name}
                            value={item.value}
                            {...(item.maxValue !== undefined && { maxValue: item.maxValue })}
                        ></OverviewData>
                    ))}
                    <div className="overviewCard__title">
                        <span className="overviewCard__icon">{icon}</span>
                        <h2 className="overviewCard__name">{t(card)}</h2>
                    </div>
                </NavLink>
            </div>
        </Grid>
    );
};