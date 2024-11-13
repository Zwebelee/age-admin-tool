import {ReactNode} from "react";
import {observer} from "mobx-react-lite";
import {Navigate} from "react-router-dom";
import {authStore} from "../stores/auth-store";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = observer(({children}: ProtectedRouteProps) => {
    if (!authStore.isLoggedIn) {
        return <Navigate to="/testlogin"/>;
    }
    return <>{children}</>;
});

export default ProtectedRoute;
