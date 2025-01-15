import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useRootStore} from "../stores/root-store";
import {observer} from "mobx-react-lite";
import "./ChangeLogin.scss"


interface ChangeLoginProps {
    onCancel: () => void;
}

export const ChangeLogin = observer(({onCancel}: ChangeLoginProps) => {
    const {t} = useTranslation();
    const {authStore, toolUserStore} = useRootStore();

    const initialFormState = {
        password: "",
        newPassword: "",
        confirmPassword: "",
        error: "",
        success: ""
    };

    const [formState, setFormState] = useState(initialFormState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const resetForm = ({error = "", success = ""}: { error?: string; success?: string } = {}) => {
        setFormState({
            ...initialFormState,
            error,
            success
        });
    };

    const handleChangeLogin = async () => {
        const {password, newPassword, confirmPassword} = formState;

        if (!password || !newPassword || !confirmPassword) {
            resetForm({"error": t("missing_fields")});
            return;
        }
        if (newPassword !== confirmPassword) {
            setFormState({...formState, error: t("new_password_missmatch")});
            return;
        }

        const responseCode = await authStore.changeLogin(password, newPassword);
        if (responseCode) {
            let errorMessage = "";
            if (responseCode === 400) {
                errorMessage = t("password_invalid");
            } else if (responseCode === 404) {
                errorMessage = t("user_not_found");
            }
            resetForm({"error": errorMessage});
        } else {
            resetForm({"success": t("password_changed")});
        }
    };

    return (
        <div className="changeLogin">
            <h3 className="changeLogin__title">{t("change_password")}</h3>
            <form className="changeLogin__form">
                <p className="changeLogin__user">{t("user")}: {toolUserStore.user ? toolUserStore.user.username : "User-Error"}</p>
                <TextField
                    label={t("password")}
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label={t("new_password")}
                    type="password"
                    name="newPassword"
                    value={formState.newPassword}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label={t("new_password_confirmation")}
                    type="password"
                    name="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <div className="changeLogin__status">
                    <p className="changeLogin__success">{formState.success && <span>{formState.success}</span>}</p>
                    <p className="changeLogin__error">{formState.error && <span>{formState.error}</span>}</p>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleChangeLogin}
                    fullWidth
                    sx={{
                        margin: "0.3125rem auto",
                    }}
                >
                    {t("change_password")}
                </Button>
                <Button
                    onClick={onCancel}
                    color="error"
                    variant="contained"
                    fullWidth
                    sx={{
                        margin: "0.3125rem auto",
                    }}
                >
                    {t("actions.cancel")}
                </Button>
            </form>
        </div>
    );
});