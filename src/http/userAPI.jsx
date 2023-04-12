import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const login = async (email, password) => {
    const { data } = await $host.post('/Authorization', { email, password });
    if()
    localStorage.setItem('refreshToken', data.refreshToken);
    return 
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}