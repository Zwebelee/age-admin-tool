import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {TextField, Button, Container, Typography, Box} from "@mui/material";
import {useRootStore} from "../stores/root-store.ts";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SignInMaskProps {
    redirectUrl?: string;
}

export const SignInMask = observer(({redirectUrl = "/testsecret"}:SignInMaskProps) => {
    const rootStore = useRootStore();
    const authStore = rootStore.authStore;
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signinError, setSigninError] = useState("");
    const [signinSuccess, setSigninSuccess] = useState("");

    useEffect(() => {
        setSigninError("");
        setSigninSuccess("");
    }, []);

    const handleLogin = async () => {
        await authStore.login({username, password});
        if (authStore.isLoggedIn) {
            setSigninSuccess("Login successful");
            setSigninError("");
            // make a short delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate(redirectUrl);
        } else {
            setSigninError("Invalid username or password");
            setSigninSuccess("");
            setPassword("");
        }
    };


    return (
        <Container maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign In
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
                    <>
                        <TextField
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            slotProps={{
                                inputLabel: {sx: {color: 'grey'}}
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                inputLabel: {sx: {color: 'grey'}}
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            sx={{mt: 2}}
                        >
                            Sign In
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
});
