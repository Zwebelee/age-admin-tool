import {ReactNode} from "react";
import {observer} from "mobx-react-lite";
import {Navigate} from "react-router-dom";
import {useRootStore} from "../stores/root-store.ts";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = observer(({children}: ProtectedRouteProps) => {
    const rootStore = useRootStore();
    if (!rootStore.authStore.isLoggedIn) {
        return <Navigate to="/login"/>;
    }
    return <>{children}</>;
});

export default ProtectedRoute;
