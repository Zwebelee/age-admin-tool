class LocalStorage {
    static getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    static setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}

export const getLocalStorageItem = LocalStorage.getItem;
export const setLocalStorageItem = LocalStorage.setItem;
export const removeLocalStorageItem = LocalStorage.removeItem;