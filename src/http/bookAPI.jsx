import { $authHost, $host } from "./index";


export const CONTROL_URL = '/Books';
export const createBook = async (title, realise, quantity, authors) => {
    const { data } = await $authHost.post(CONTROL_URL, {
        params: {
            title, realise, quantity, authors
        }
    })
    return data
}

export const fetchBooks = async (pageIndex) => {
    const { data } = await $host.get(CONTROL_URL + `?PageIndex=${pageIndex === null || pageIndex <= 0 ? 0 : pageIndex}`);
    return data;
}

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const { data } = await $host.get(CONTROL_URL, {
        params: {
            typeId, brandId, page, limit
        }
    })
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get(CONTROL_URL + id)
    return data
}