import {useTranslation} from "react-i18next";
import "./OverviewCard.scss";

import {OverviewData} from "./OverviewData.tsx";

export const OverviewCard = ({card, icon, color, data}: {
    card: string,
    icon: JSX.Element,
    color: string,
    data: Array<{ name: string; value: number; maxValue?: number; }>
}) => {
    const {t} = useTranslation();
    return (
        <div className="overviewCard">
            <div className="overviewData">
                {data.map((item, index) => (
                    <OverviewData
                        key={index}
                        color={color}
                        name={item.name}
                        value={item.value}
                        maxValue={item.maxValue}
                    ></OverviewData>
                ))}
            </div>
            <div className="overviewCard__title">
                <span className="overviewCard__icon">{icon}</span>
                <h2 className="overviewCard__name">{t(card)}</h2>
            </div>
        </div>
    );
};