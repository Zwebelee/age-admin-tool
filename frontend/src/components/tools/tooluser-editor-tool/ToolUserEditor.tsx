import {Alert, Button, InputLabel, MenuItem, Paper, Snackbar, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {useRootStore} from "../../../stores/root-store.ts";
import {useTranslation} from "react-i18next";
import './ToolUserEditor.scss';
import {IToolUserRole, ToolUserRole} from "../../../models/tooluserrole.ts";
import {ToolUserWithPassword} from "../../../models/tooluser.ts";
import {utils} from "../../../utils.ts";

export const AgeToolUserEditor = observer(() => {
    const {t} = useTranslation();
    const {toolUserStore, logService} = useRootStore()
    const initialFormData = {
        username: '',
        email: '',
        password: '',
        theme: 'dark',
        language: 'en',
        role: ''

    }
    const [formData, setFormData] = useState(initialFormData)
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [roles, setRoles] = useState<ToolUserRole[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await toolUserStore.getToolUserRoles();
                if (response) {
                    const rolesData = response.data.map((role: IToolUserRole) => new ToolUserRole(role));
                    setRoles(rolesData);
                    const viewerRole = rolesData.find((role: { name: string; }) => role.name === "viewer");
                    if (viewerRole) {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            role: viewerRole.guid
                        }));
                    }
                } else {
                    setRoles([]);
                }
            } catch (error) {
                logService.error('Error fetching roles:', error);
                setRoles([]);
            }
        };

        fetchRoles().then();
    }, [toolUserStore]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name as string]: value
        });
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const toolUserRole = roles.find((role) => role.guid === formData.role);
            if (!toolUserRole) {
                logService.error('Role not found');
                return;
            }

            const toolUser = new ToolUserWithPassword({
                ...formData,
                guid: "",
                active_role: toolUserRole,
                roles: [toolUserRole]
            });


            await toolUserStore.addUser(toolUser);
            const viewerRole = roles.find(role => role.name === "viewer");
            setFormData({
                ...initialFormData,
                role: viewerRole ? viewerRole.guid : ''
            });
            setSuccessMessage(`${formData.username} created successfully`);
            setTimeout(() => setSuccessMessage(null), 8000);
        } catch (error) {
            logService.error('Error creating user:', error);
        }
    };


    return (
        <Paper sx={{padding: 16, backgroundColor: "var(--lightness1-3)"}}>
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
                            className="input-field-label"
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
                            className="input-field-label"
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
                            className="input-field-label"
                        />
                    </Grid>
                    <Grid className="input-field-label">
                        <InputLabel id="theme-label">{t("theme.title")}</InputLabel>
                        <Select
                            labelId="theme-label"
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            label="Theme"
                            onChange={handleSelectChange}
                            MenuProps={{classes: {paper: "input-field-label"}}}
                        >
                            <MenuItem value="dark">{t("theme.dark")}</MenuItem>
                            <MenuItem value="light">{t("theme.light")}</MenuItem>
                        </Select>
                    </Grid>
                    <Grid className="input-field-label">
                        <InputLabel id="language-label">{t("language")}</InputLabel>
                        <Select
                            labelId="language-label"
                            id="language"
                            name="language"
                            value={formData.language}
                            label="Language"
                            onChange={handleSelectChange}
                            MenuProps={{classes: {paper: "input-field-label"}}}
                        >
                            <MenuItem value="en">{t("languages.en")}</MenuItem>
                            <MenuItem value="de">{t("languages.de")}</MenuItem>
                            <MenuItem value="fr">{t("languages.fr")}</MenuItem>
                        </Select>
                    </Grid>
                    <Grid className="input-field-label">
                        <InputLabel id="role-label">{t("role")}</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formData.role}
                            label="role"
                            onChange={handleSelectChange}
                            MenuProps={{classes: {paper: "input-field-label"}}}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.guid} value={role.guid}>
                                    {utils.capitalizeFirstLetter((role.name))}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {t("actions.create") + " " + t("user")}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={!!successMessage}
                autoHideDuration={800000}
                onClose={() => setSuccessMessage(null)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert
                    onClose={() => setSuccessMessage(null)}
                    severity="success"
                    sx={{
                        width: '100%',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        padding: '1rem'
                    }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
});
