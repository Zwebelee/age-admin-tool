// src/components/LoginPage.tsx
import {useState} from "react";
import {observer} from "mobx-react-lite";
import {authStore} from "../stores/auth-store";
import apiClient from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

const LoginPage = observer(() => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [protectedData, setProtectedData] = useState<Record<string, any> | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        await authStore.login(name, password);
    };

    const getProtectedData = async () => {
        try {
            const response = await apiClient.get("/protected");
            setProtectedData(response.data);
            console.log("Protected data:", response.data);
        } catch (error) {
            console.error("Failed to fetch protected data", error);
        }
    };

    return (
        <div>
            {!authStore.isLoggedIn && (
                <div>
                    <h1>Login</h1>
                    <input
                        type="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
            {authStore.isLoggedIn && (
                <div>
                    <button onClick={getProtectedData}>Get Protected Data</button>
                    <button onClick={() => authStore.logout()}>Logout</button>
                    {protectedData && <div>
                        <label>Protected Data:</label>
                        <pre>{JSON.stringify(protectedData, null, 2)}</pre>
                        <Button variant='contained' onClick={() => navigate('/testsecret')}>Secret Route</Button>
                    </div>}
                </div>
            )}
        </div>
    );
});

export default LoginPage;