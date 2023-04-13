import { $authHost, $host } from "./index";

export const login = async (email, password) => {
    const { data } = await $host.post("/Authorization", { email, password });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
}   

export const check = async () => {
    const { data } = await $authHost.get("/Token/Refresh");
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
}