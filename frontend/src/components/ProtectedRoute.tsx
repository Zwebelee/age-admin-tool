import {Navigate, Outlet} from "react-router-dom";
import {useRootStore} from "../stores/root-store.ts";


const ProtectedRoute = () => {
    const {authStore} = useRootStore();

    if (!authStore.isLoggedIn) {
        console.log('---> debug not logged in') //TODO <- cleanup
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;
