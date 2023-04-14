import { $authHost, $host } from "./index";

export const login = async (email, password) => {
    const { data } = await $host.post("/Authorization", { email, password });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
}   

export const check = async () => {
    var refreshToken = localStorage.getItem("refreshToken");
    const { data } = await $authHost.post("/Token/Refresh", { refreshToken });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
}   