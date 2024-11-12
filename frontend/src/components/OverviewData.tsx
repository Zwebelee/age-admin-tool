import {useTranslation} from "react-i18next";
import {tools} from "../tools.ts";
import "./OverviewData.scss";


export const OverviewData = ({
        color,
        name,
        value,
        maxValue
    }: {
        color: string;
        name: string,
        value: number,
        maxValue?: number,
}) => {
    const {t} = useTranslation();
    const dynamicClass = "overviewData overviewData" + color;
    const dynamicValue = maxValue ? tools.addSeparators(value.toString()) + " / " + tools.addSeparators(maxValue.toString()) : tools.addSeparators(value.toString());
    return (
        <div className={dynamicClass}>
            <p className="overviewData__value">{dynamicValue}</p>
            <p className="overviewData__name">{t(name)}</p>
        </div>
    );
    };