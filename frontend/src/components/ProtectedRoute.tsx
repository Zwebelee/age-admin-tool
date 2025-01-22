import {Navigate, Outlet} from "react-router-dom";
import {useRootStore} from "../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {Loading} from "./loading/Loading.tsx";


const ProtectedRoute = observer(() => {
    const {authStore} = useRootStore();

    if (authStore.isLoading) {
        return <Loading/>;
    }

    if (!authStore.isLoggedIn) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
});

export default ProtectedRoute;
