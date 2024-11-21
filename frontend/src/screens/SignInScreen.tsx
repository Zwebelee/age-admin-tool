import {useTranslation} from "react-i18next";
import {SignInMask} from "../components/SignInMask.tsx";

export const SignInScreen = () => {
    const {t} = useTranslation();
    return (
        <div>
            <h1>{t("Login")}</h1>
            <SignInMask/>
        </div>
    );
}