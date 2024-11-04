import {SecondaryMenu} from "../components/SecondaryMenu.tsx";
import {MainMenu} from "../components/MainMenu.tsx";

export const MobileMenuScreen = () => {
    return (
        <main>
            <MainMenu position="mainMenuMobile"/>
            <SecondaryMenu position="secondaryMenuMobile"/>
        </main>
    );
};