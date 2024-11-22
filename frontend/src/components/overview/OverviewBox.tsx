import "./OverviewBox.scss";

import {NavLink} from "react-router-dom";
import {OverviewCard} from "./OverviewCard.tsx";

export const OverviewBox = ({ card, icon, color, link, data }: {
    card: string,
    icon: JSX.Element,
    color: string,
    link: boolean,
    data: Array<{ name: string; value: number; maxValue?: number; }>
}) => {
    return (
        <div className="overviewBox">
            {link ?
                <NavLink className="overviewBox__link" to={card}>
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
        </div>
    );
};