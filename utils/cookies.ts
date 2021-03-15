import cookies from "js-cookie";

export const setCookie = (name: string, value: any, ...rest: any) => {
    cookies.set(name, value, { ...rest });
};

export const getCookie = (name: string, ...rest: any) => {
    return cookies.get(name, { ...rest });
};

export const removeCookie = (name: string, ...rest: any) => {
    return cookies.remove(name, { ...rest });
};
