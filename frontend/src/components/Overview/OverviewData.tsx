import {useTranslation} from "react-i18next";
import {utils} from "../../utils.ts";
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
    const dynamicValue = maxValue ?
        utils.addSeparators(value.toString())
        + " / "
        + utils.addSeparators(maxValue.toString()) :
        utils.addSeparators(value.toString());
    return (
        <div className={dynamicClass}>
            <div className="overviewData__line">
                <p className="overviewData__value">{dynamicValue}</p>
                <p className="overviewData__name">{t(name)}</p>
            </div>
        </div>
    );
    };