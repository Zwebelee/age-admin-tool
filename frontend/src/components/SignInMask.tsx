import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {TextField, Button, Container, Typography, Box, FormControl} from "@mui/material";
import {useRootStore} from "../stores/root-store.ts";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useTranslation} from "react-i18next";

interface SignInMaskProps {
    redirectUrl?: string;
}

export const SignInMask = observer(({redirectUrl = "/"}: SignInMaskProps) => {
    const {authStore} = useRootStore();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signinError, setSigninError] = useState("");
    const [signinSuccess, setSigninSuccess] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        setSigninError("");
        setSigninSuccess("");
        setUsernameError(false);
        setPasswordError(false);
    }, []);

    const handleLogin = async () => {
        let hasError = false;
        if (!username) {
            setUsernameError(true);
            hasError = true;
        } else {
            setUsernameError(false);
        }
        if (!password) {
            setPasswordError(true);
            hasError = true;
        } else {
            setPasswordError(false);
        }
        if (hasError) {
            return;
        }
        await authStore.login({username, password});
        if (authStore.isLoggedIn) {
            setSigninSuccess(t("login.success"));
            setSigninError("");
            // make a short delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate(redirectUrl);
        } else {
            setSigninError(t("login.invalid_user_or_pwd"));
            setSigninSuccess("");
            setPassword("");
        }
    };


    return (
        <Container maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {t("login.title")}
                </Typography>
                {signinSuccess && (
                    <Typography variant="body2" color="success" gutterBottom>
                        <CheckCircleIcon/>{signinSuccess}
                    </Typography>
                )}
                {signinError && (
                    <Typography variant="body2" color="error" gutterBottom>
                        <ErrorIcon/>{signinError}
                    </Typography>
                )}
                {!signinSuccess && (
                    <FormControl fullWidth>
                        <TextField
                            label={t("username")}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            slotProps={{
                                inputLabel: {sx: {color: 'grey'}}
                            }}
                            error={usernameError}
                        />
                        <TextField
                            label={t("password")}
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            slotProps={{
                                inputLabel: {sx: {color: 'grey'}}
                            }}
                            error={passwordError}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            sx={{mt: 2}}
                        >
                            {t("login.title")}
                        </Button>
                    </FormControl>
                )}
            </Box>
        </Container>
    );
});
