import {Alert, Button, InputLabel, MenuItem, Paper, Snackbar, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {useRootStore} from "../../../stores/root-store.ts";

export const AgeToolUserEditor = observer(() => {

    const {toolUserStore} = useRootStore()
    const initialFormData = {
        username: '',
        email: '',
        password: '',
        theme: 'dark',
        language: 'en',
        role: 'viewer'
    }
    const [formData, setFormData] = useState(initialFormData)
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name as string]: value
        });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const toolUser = {
                ...formData,
                id: 0
            }
            await toolUserStore.addUser(toolUser);
            setFormData(initialFormData);
            setSuccessMessage(`${formData.username} created successfully`);
            setTimeout(() => setSuccessMessage(null), 8000);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };


    return (
        <Paper sx={{padding: 16, backgroundColor: "orange"}}>
            <Typography variant="h6" gutterBottom>
                Create New User
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container direction={"column"} spacing={2}>
                    <Grid>
                        <TextField
                            id="username"
                            name="username"
                            label="Username"
                            variant="outlined"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid>
                        <InputLabel id="theme-label">Theme</InputLabel>
                        <Select
                            labelId="theme-label"
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            label="Theme"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="dark">Dark</MenuItem>
                            <MenuItem value="light">Light</MenuItem>
                        </Select>
                    </Grid>
                    <Grid>
                        <InputLabel id="language-label">Language</InputLabel>
                        <Select
                            labelId="language-label"
                            id="language"
                            name="language"
                            value={formData.language}
                            label="Language"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="en">English</MenuItem>
                            <MenuItem value="de">German</MenuItem>
                            <MenuItem value="fr">French</MenuItem>
                        </Select>
                    </Grid>
                    <Grid>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formData.role}
                            label="role"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="viewer">Viewer</MenuItem>
                            <MenuItem value="editor">Editor</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create User
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar open={!!successMessage} autoHideDuration={8000} onClose={() => setSuccessMessage(null)}>
                <Alert onClose={() => setSuccessMessage(null)} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
});
