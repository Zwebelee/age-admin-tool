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

    const {toolUserStore, authStore, themeStore, languageStore} = useRootStore()
    const {t} = useTranslation();

    const [userRole, setUserRole] = useState("admin")
    const [switchChecked, setSwitchChecked] = useState([themeStore.theme] as string[]);

    const handleLogout = () => {
        authStore.logout().then();
    };

    const handleToggle = (value: string) => () => {
        const currentIndex = switchChecked.indexOf(value);
        const newChecked = [...switchChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSwitchChecked(newChecked);
        themeStore.toggleTheme();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setUserRole(event.target.value as string);
    };

    const roles = [
        {value: "admin", label: "Admin"},
        {value: "user", label: "User"}
    ] //TODO: integrate role-model

    const [user, setUser] = useState<ToolUser | null >(null);

    useEffect(() => {
        if (authStore.isLoggedIn) {
            toolUserStore.loadUser().then(() => {
                setUser(toolUserStore.user ||null);
                if (toolUserStore.user?.theme){
                    themeStore.setTheme(toolUserStore.user.theme as "light" | "dark");
                    setSwitchChecked([toolUserStore.user.theme]);
                }
                if (toolUserStore.user?.language) {
                    languageStore.switchLanguage(toolUserStore.user.language as "de" | "fr" | "en");
                }
            });
        }
    }, [authStore.isLoggedIn, toolUserStore, languageStore, themeStore]);


    return (
        <>
            {!authStore.isLoggedIn ?
                <SignInMask redirectUrl={""}/> :
                <List sx={{width: '100%', backgroundColor: "grey"}}
                      subheader={<ListSubheader>{t("settings")}</ListSubheader>}>
                    <SettingListItem icon={<PersonIcon/>} tooltip={t("username")} primary={t("username")}>
                        <ListItemText primary={user?.username}/>
                    </SettingListItem>
                    <Divider/>
                    <SettingListItem icon={<SupervisorAccountIcon/>} tooltip={t("role")} primary={t("role")}>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value={userRole}
                            label={t("role")}
                            onChange={handleChange}
                        >
                            {roles.map(item =>
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            )}
                        </Select>
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
                    <SettingListItem icon={<LogoutIcon/>} tooltip={t("logout")} primary={t("logout")}>
                        <Button onClick={handleLogout} variant="contained">{t("logout")}</Button>
                    </SettingListItem>
                </List>
            }
        </>
    );
});
