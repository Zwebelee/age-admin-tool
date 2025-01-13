import {SignInMask} from "../components/SignInMask.tsx";
import {observer} from "mobx-react-lite";

export const SignInScreen = observer(() => {
    return <SignInMask redirectUrl={"/"}/>
});
