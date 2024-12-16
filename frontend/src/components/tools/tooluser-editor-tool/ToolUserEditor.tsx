import {Button, InputLabel, MenuItem, Paper, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {useRootStore} from "../../../stores/root-store.ts";

export const AgeToolUserEditor = observer(() => {

    const {toolUserStore} = useRootStore()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        theme: 'dark',
        language: 'en',
        role: 'viewer'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name as string]: value
        });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(formData);
            const toolUser = {
                ...formData,
                id:0
            }
            console.log(toolUser)
            await toolUserStore.addUser(toolUser);

            // const response = await axios.post('/api/users', formData);
            // console.log('User created:', response.data);
            console.log('Test')

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
        </Paper>
);
});
