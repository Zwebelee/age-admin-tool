import {Alert, Button, InputLabel, MenuItem, Paper, Snackbar, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {useRootStore} from "../../../stores/root-store.ts";
import {useTranslation} from "react-i18next";

export const AgeToolUserEditor = observer(() => {
    const {t} = useTranslation();
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
                {t("tools.tooluser-editor.description")}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container direction={"column"} spacing={2}>
                    <Grid>
                        <TextField
                            id="username"
                            name="username"
                            label={t("username")}
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
                            label={t("password")}
                            type="password"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid>
                        <InputLabel id="theme-label">{t("theme.title")}</InputLabel>
                        <Select
                            labelId="theme-label"
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            label="Theme"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="dark">{t("theme.dark")}</MenuItem>
                            <MenuItem value="light">{t("theme.light")}</MenuItem>
                        </Select>
                    </Grid>
                    <Grid>
                        <InputLabel id="language-label">{t("language")}</InputLabel>
                        <Select
                            labelId="language-label"
                            id="language"
                            name="language"
                            value={formData.language}
                            label="Language"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="en">{t("languages.en")}</MenuItem>
                            <MenuItem value="de">{t("languages.de")}</MenuItem>
                            <MenuItem value="fr">{t("languages.fr")}</MenuItem>
                        </Select>
                    </Grid>
                    <Grid>
                        <InputLabel id="role-label">{t("role")}</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name={t("role")}
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
                            {t("actions.create") + " " + t("user")}
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
