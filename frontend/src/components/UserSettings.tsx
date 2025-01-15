import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    MenuItem,
    Switch,
    Tooltip
} from "@mui/material";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useRootStore} from "../stores/root-store.ts";
import {ReactElement, ReactNode, useEffect, useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import {LanguageSelector} from "./LanguageSelector.tsx";
import {useTranslation} from "react-i18next";
import {observer} from "mobx-react-lite";
import {SignInMask} from "./SignInMask.tsx";
import {ToolUser} from "../models/tooluser.ts";
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
import {ChangeLogin} from "./ChangeLogin.tsx";
import {utils} from "../utils.ts";
import {ToolUserRole} from "../models/tooluserrole.ts";

interface SettingListItemProps {
    icon: ReactElement;
    tooltip: string;
    primary: string;
    children: ReactNode;
}

const SettingListItem = ({icon, tooltip, primary, children}: SettingListItemProps) => (
    <ListItem>
        <ListItemIcon>
            <Tooltip title={tooltip}>
                {icon}
            </Tooltip>
        </ListItemIcon>
        <ListItemText primary={primary}/>
        {children}
    </ListItem>
);


export const UserSettings = observer(() => {

    const {toolUserStore, authStore, themeStore, languageStore, permissionsStore} = useRootStore()
    const {t} = useTranslation();

    const [user, setUser] = useState<ToolUser | null>(null);
    const [switchChecked, setSwitchChecked] = useState([themeStore.theme] as string[]);
    const [showChangeLogin, setShowChangeLogin] = useState(false);
    const userRoles = user?.roles || [];
    const activeRole = user?.activeRole || new ToolUserRole({guid: "", name: ""});


    const handleLogout = () => {
        authStore.logout().then();
    };

    const handleToggle = (value: string) => () => {
        setSwitchChecked((prevChecked) => {
            const currentIndex = prevChecked.indexOf(value);
            const newChecked = [...prevChecked];

            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            themeStore.toggleTheme();
            return newChecked;
        });
    };

    const handleChange = async (event: SelectChangeEvent) => {
        const selectedRoleGuid = event.target.value as string;
        const selectedRole = userRoles.find(role => role.guid === selectedRoleGuid);
        if (selectedRole) {
            permissionsStore.clearPermissionsCache();
            await toolUserStore.switchActiveRole(selectedRole);
            if (toolUserStore.user) {
                await permissionsStore.loadPermissions(toolUserStore.user.guid);
            }
            setUser(toolUserStore.user || null);
        }
    };

    const handlePasswordChange = () => {
        setShowChangeLogin(true);
    }

    const handlePasswordChangeCancel = () => {
        setShowChangeLogin(false);
    };


    //TODO: Improve - load user only once, combine effects, maybe use customHook
    // known issue: switch to light mode not properly handled (saved)
    useEffect(() => {
        if (authStore.isLoggedIn) {
            toolUserStore.loadUser().then(() => {
                setUser(toolUserStore.user || null);
                const toolUser = toolUserStore.user;
                if (toolUser?.theme) {
                    themeStore.setTheme(toolUser.theme as "light" | "dark");
                    setSwitchChecked([toolUser.theme]);
                }
                if (toolUser?.language) {
                    languageStore.switchLanguage(toolUser.language as "de" | "fr" | "en");
                }
            });
        }
    }, [authStore.isLoggedIn, toolUserStore, languageStore, themeStore]);

    useEffect(() => {
        if (user) {
            const updatedUser = user;
            let shouldUpdate = false;

            if (user.language !== languageStore.language) {
                updatedUser.language = languageStore.language;
                shouldUpdate = true;
            }

            const newTheme = switchChecked.includes('dark') ? 'dark' : 'light';
            if (user.theme !== newTheme) {
                updatedUser.theme = newTheme;
                shouldUpdate = true;
            }

            if (shouldUpdate) {
                toolUserStore.updateUser(updatedUser).then();
            }
        }
    }, [languageStore.language, switchChecked, toolUserStore, user]);

    return (
        <>
            {!authStore.isLoggedIn ?
                <SignInMask redirectUrl={""}/> :
                (showChangeLogin ?
                    <ChangeLogin onCancel={handlePasswordChangeCancel}/> :
                    <List
                        sx={{
                            width: "100%",
                            border: "0.4375rem solid var(--color1-1)",
                            borderRadius: "0.4375rem",
                            backgroundColor: "var(--lightness1-1)",

                            "& .MuiListItem-root": {
                                minHeight: "4.375rem !important",
                            }
                        }}
                        subheader={
                            <ListSubheader
                                sx={{
                                    padding: "0.1875rem 1.125rem 0.625rem",
                                    fontSize: "1.25rem",
                                    color: "var(--lightness2)",
                                    backgroundColor: "var(--color1-1)",
                                }}
                            >
                                {t("settings")}
                            </ListSubheader>}
                    >
                        <SettingListItem icon={<PersonIcon/>} tooltip={t("username")} primary={t("username")}>
                            <ListItemText primary={user?.username} sx={{textAlign: "right"}}/>
                        </SettingListItem>
                        <Divider/>
                        <SettingListItem icon={<SupervisorAccountIcon/>} tooltip={t("active_role")}
                                         primary={t("active_role")}>
                            {userRoles.length > 1 ? (
                                <Select
                                    labelId="role-select-label"
                                    id="role-select"
                                    value={activeRole.guid}
                                    onChange={handleChange}
                                >
                                    {userRoles.map(role =>
                                        <MenuItem key={role.guid}
                                                  value={role.guid}>{utils.capitalizeFirstLetter(role.name)}</MenuItem>
                                    )}
                                </Select>
                            ) : (
                                <ListItemText primary={utils.capitalizeFirstLetter(activeRole.name)}
                                              sx={{textAlign: "right"}}/>
                            )}
                        </SettingListItem>
                        <Divider/>
                        <SettingListItem icon={<DarkModeIcon/>} tooltip={t("darkmode")} primary={t("darkmode")}>
                            <Switch
                                onChange={handleToggle('dark')}
                                checked={switchChecked.includes('dark')}
                            />
                        </SettingListItem>
                        <Divider/>
                        <SettingListItem icon={<LanguageIcon/>} tooltip={t("language")} primary={t("language")}>
                            <LanguageSelector/>
                        </SettingListItem>
                        <Divider/>
                        <SettingListItem icon={<LockResetIcon/>} tooltip={t("change_password")}
                                         primary={t("change_password")}>
                            <Button onClick={handlePasswordChange} variant="contained">{t("change_password")}</Button>
                        </SettingListItem>
                        <Divider/>
                        <SettingListItem icon={<LogoutIcon/>} tooltip={t("logout")} primary={t("logout")}>
                            <Button onClick={handleLogout} variant="contained">{t("logout")}</Button>
                        </SettingListItem>
                    </List>)
            }
        </>
    );
});
