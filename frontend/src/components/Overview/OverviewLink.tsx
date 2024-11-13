import Grid from "@mui/material/Grid2";
import "./OverviewLink.scss";

import {NavLink} from "react-router-dom";
import {OverviewCard} from "./OverviewCard.tsx";

export const OverviewLink = ({card, icon, color, link, data }: {
    card: string,
    icon: JSX.Element,
    color: string,
    link: boolean,
    data: Array<{ name: string; value: number; maxValue?: number; }>
}) => {
    return (
        <Grid size={{xs: 12, sm: 6, md: 4, lg: 4, xl: 4}}>
            {link ?
                <NavLink className="overviewLink" to={card}>
                    <OverviewCard
                        card={card}
                        icon={icon}
                        color={color}
                        data={data}>
                    </OverviewCard>
                </NavLink> :
                <OverviewCard
                    card={card}
                    icon={icon}
                    color={color}
                    data={data}>
                </OverviewCard>
            }
        </Grid>
    );
};