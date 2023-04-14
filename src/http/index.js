import axios from "axios";

export const SERV_URL = `https://localhost:7014`;
export const PREFIX_API = `/api`;


const $host = axios.create({
    baseURL: SERV_URL + PREFIX_API
})

const $authHost = axios.create({
    baseURL: SERV_URL + PREFIX_API
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}