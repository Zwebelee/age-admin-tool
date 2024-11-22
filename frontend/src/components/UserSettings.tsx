import {LanguageSelector} from "./LanguageSelector.tsx";
import {Switch} from "@mui/material";
import {useRootStore} from "../stores/root-store.ts";
import {useEffect, useState} from "react";

export const UserSettings = ({ toggleTheme, onChange }: { toggleTheme: boolean; onChange: () => void }) => {

    const {toolUserStore, authStore} = useRootStore()

    const [userLoaded, setUserLoaded] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authStore.isLoggedIn) {
            toolUserStore.loadUser().then(() => {
                setUser(toolUserStore.user);
                setUserLoaded(true);
            });
        }
    }, [authStore, toolUserStore]);


    return (
        <>
            <LanguageSelector/>
            <br/>
            <p>Dark <Switch checked={toggleTheme} onChange={onChange}/> Light</p>
            {authStore.isLoggedIn ? <h1>user logged in</h1> : <h1>user not logged in</h1>}
            {userLoaded ? (user ? <h1>hi {user.username}</h1> : <h1>no user</h1>) : <h1>Loading...</h1>}
        </>
    )
}
