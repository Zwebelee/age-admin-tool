import {useRootStore} from "../stores/root-store.ts";
import {useEffect, useState} from "react";

//TODO: Implement usePermission hook
export const usePermission = (permissionName: string) => {
    const {permissionsStore, toolUserStore} = useRootStore();
    const [hasPermission, setHasPermission] = useState(false);
    const userGuid = toolUserStore.user?.guid;

    useEffect(() => {
        const checkPermission = async () => {
            if (userGuid) {
                await permissionsStore.loadPermissions(userGuid);
                setHasPermission(permissionsStore.hasPermission(userGuid, permissionName));
            }
        };
        checkPermission().then();
    }, [permissionsStore, userGuid, permissionName]);

    return hasPermission;
}