interface Options {
    expires?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    httpOnly?: boolean;
}

class Cookie {
    static set(name: string, value: string, options: Options = {}) {
        let cookieString = `${name}=${value};`;

        if (options.expires) {
            const date = new Date();
            date.setTime(date.getTime() + options.expires * 1000);
            cookieString += `expires=${date.toUTCString()};`;
        }

        if (options.path) {
            cookieString += `path=${options.path};`;
        }

        if (options.domain) {
            cookieString += `domain=${options.domain};`;
        }

        if (options.secure) {
            cookieString += `secure;`;
        }

        if (options.sameSite) {
            cookieString += `samesite=${options.sameSite};`;
        }

        if (options.httpOnly) {
            cookieString += `httponly;`;
        }

        document.cookie = cookieString;
    }

    static get(name: string): string | null {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

export const setCookie = Cookie.set;
export const getCookie = Cookie.get;
export const deleteCookie = (name: string) => Cookie.set(name, '', {expires: -1});

