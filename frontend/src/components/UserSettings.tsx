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
import {useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';

export const UserSettings = ({toggleTheme, onChange}: { toggleTheme: boolean; onChange: () => void }) => {

    const {toolUserStore, authStore} = useRootStore()
    const [userRole, setUserRole] = useState("admin")
    const [switchChecked, setSwitchChecked] = useState(["darkmode"])
    const [language, setLanguage] = useState("en");

    const [user, setUser] = useState("");
    const [username, setUsername] = useState("");
    const [theme, setTheme] = useState("");


    //TODO: useEffect to listen to useState change and write to backend!

    const handleToggle = (value: string) => () => {
        const currentIndex = switchChecked.indexOf(value);
        const newChecked = [...switchChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSwitchChecked(newChecked);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setUserRole(event.target.value as string);
    };


    const handleLanguageChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);

    }
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

    const themes = [
        {value: "light", label: "Light"},
        {value: "dark", label: "Dark"},
    ];

    const languages = [
        {value: "en", label: "English"},
        {value: "de", label: "Deutsch"},
        {value: "fr", label: "Français"},
    ];

    const roles = [
        {value: "admin", label: "Admin"},
        {value: "user", label: "User"}
    ]


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
              subheader={<ListSubheader>Settings</ListSubheader>}>
            <ListItem>
                <ListItemIcon>
                    <Tooltip title="Username">
                        <PersonIcon/>
                    </Tooltip>
                </ListItemIcon>
                <ListItemText primary='Username'/>
                <ListItemText primary='SampleUserName'/>
            </ListItem>

            <Divider/>

            <ListItem>
                <ListItemIcon>
                    <Tooltip title="Role">
                        <SupervisorAccountIcon/>
                    </Tooltip>
                </ListItemIcon>

                <ListItemText primary='Role'/>
                <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={userRole}
                    label="Role"
                    onChange={handleChange}
                >
                    {roles.map(item =>
                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                    )}
                </Select>
            </ListItem>

            <Divider/>

            <ListItem>
                <ListItemIcon>
                    <Tooltip title="Darkmode">
                        <DarkModeIcon/>
                    </Tooltip>
                </ListItemIcon>

                <ListItemText primary='Darkmode'/>
                <Switch
                    onChange={handleToggle('darkmode')}
                    checked={switchChecked.includes('darkmode')}
                />
            </ListItem>

            <Divider/>

            <ListItem>
                <ListItemIcon>
                    <Tooltip title="Language">
                        <LanguageIcon/>
                    </Tooltip>
                </ListItemIcon>

                <ListItemText primary='Language'/>
                <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={language}
                    label="Language"
                    onChange={handleLanguageChange}
                >
                    {languages.map(item =>
                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                    )}
                </Select>
            </ListItem>

            <ListItem>
                <h1>Theme</h1>
                <p>Dark <Switch checked={toggleTheme} onChange={onChange}/> Light</p>
            </ListItem>

        </List>

    );
}

// <Grid2 container direction="column" spacing={2}>
//     <Grid2 item>
//         <TextField
//             label="User"
//             value={user}
//             onChange={handleChange(setUser)}
//         />
//     </Grid2>
//     <Grid2 item>
//         <TextField
//             label="Username"
//             value={username}
//             onChange={handleChange(setUsername)}
//         />
//     </Grid2>
//     <Grid2 item>
//         <TextField
//             label="Theme"
//             select
//             value={theme}
//             onChange={handleChange(setTheme)}
//         >
//             {themes.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                 </MenuItem>
//             ))}
//         </TextField>
//     </Grid2>
//     <Grid2 item>
//         <TextField
//             label="Language"
//             select
//             value={language}
//             onChange={handleChange(setLanguage)}
//         >
//             {languages.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                 </MenuItem>
//             ))}
//         </TextField>
//     </Grid2>
// </Grid2>