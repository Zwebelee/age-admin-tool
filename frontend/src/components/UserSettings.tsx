import {
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
import {ReactElement, ReactNode, useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import {LanguageSelector} from "./LanguageSelector.tsx";
import {useTranslation} from "react-i18next";
import {observer} from "mobx-react-lite";

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

    const {toolUserStore, authStore, themeStore} = useRootStore()
    const {t} = useTranslation();

    const [userRole, setUserRole] = useState("admin")
    const [switchChecked, setSwitchChecked] = useState(["darkmode"])

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

    // const [userLoaded, setUserLoaded] = useState(false);
    // const [user, setUser] = useState(null);
    //
    // useEffect(() => {
    //     if (authStore.isLoggedIn) {
    //         toolUserStore.loadUser().then(() => {
    //             setUser(toolUserStore.user);
    //             setUserLoaded(true);
    //         });
    //     }
    // }, [authStore, toolUserStore]);




    // return (
    //     <>
    //         <LanguageSelector/>
    //         <br/>
    //         <p>Dark <Switch checked={toggleTheme} onChange={onChange}/> Light</p>
    //         {authStore.isLoggedIn ? <h1>user logged in</h1> : <h1>user not logged in</h1>}
    //         {userLoaded ? (user ? <h1>hi {user.username}</h1> : <h1>no user</h1>) : <h1>Loading...</h1>}
    //     </>
    // )
    return (

        <List sx={{width: '100%', backgroundColor: "grey"}}
              subheader={<ListSubheader>{t("settings")}</ListSubheader>}>
            <SettingListItem icon={<PersonIcon/>} tooltip={t("username")} primary={t("username")}>
                <ListItemText primary='SampleUserName'/>
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
                    onChange={handleToggle('darkmode')}
                    checked={switchChecked.includes('darkmode')}
                />
            </SettingListItem>
            <Divider/>
            <SettingListItem icon={<LanguageIcon/>} tooltip={t("language")} primary={t("language")}>
                <LanguageSelector/>
            </SettingListItem>
        </List>
    );
});
