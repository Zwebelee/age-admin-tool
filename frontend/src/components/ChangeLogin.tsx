import React, {useState} from 'react';
import {Button, TextField, Typography, Paper} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {useTranslation} from 'react-i18next';
import {useRootStore} from '../stores/root-store';
import {observer} from 'mobx-react-lite';

interface ChangeLoginProps {
    onCancel: () => void;
}

export const ChangeLogin = observer(({onCancel}: ChangeLoginProps) => {
    const {t} = useTranslation();
    const {authStore, toolUserStore} = useRootStore();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangeLogin = async () => {
        if (!password || !newPassword || !confirmPassword) {
            setError(t('missing_fields'));
            return;
        }
        if (newPassword !== confirmPassword) {
            setError(t('new_password_missmatch'));
            return;
        }

        try {
            // await authStore.changeLogin(username, password);
            console.log('testing')
            //TODO: -> confirm - clear field and return to user settings
            setError('');
            // Optionally, you can add a success message or redirect the user
        } catch (err) {
            setError(t('actions.change_password.error_generic'));
        }
    };

    return (
        <Paper sx={{backgroundColor: "orange", padding: 8, margin: 'auto'}}>
            <Grid container spacing={1} direction="column">
                <Typography variant="h5">{t('change_password')}</Typography>
                <Typography
                    variant="h6">{t('user')}: {toolUserStore.user ? toolUserStore.user.username : 'User-Error'}
                </Typography>
                <TextField
                    label={t('password')}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label={t('new_password')}
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label={t('new_password_confirmation')}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                {error && <Typography variant='h6' color="error">{error}</Typography>}
                <Button variant="contained" color="primary" onClick={handleChangeLogin} fullWidth>
                    {t('change_password')}
                </Button>
                <Button onClick={onCancel} color="error" variant="contained" fullWidth>Cancel</Button>
            </Grid>
        </Paper>
    );
});