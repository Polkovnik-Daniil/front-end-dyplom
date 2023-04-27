import { $authHost } from "./index";


export const CONTROL_URL = '/History';

export const fetchHistory = async (pageIndex) => {
    const { data } = await $authHost.get(CONTROL_URL + `?PageIndex=${pageIndex === null || pageIndex <= 0 ? 0 : pageIndex}`);
    return data;
}

export const fetchGetCountPage = async () => {
    const { data } = await $authHost.get(CONTROL_URL + `/CountPage`);
    return data;
}

export const createHistory = async (title, realise, quantity) => {
    const { data } = await $authHost.post(CONTROL_URL,
        {
            title, realise, quantity
        }
    );
    return data
}

export const updateHistory = async (id, title, realise, quantity) => {
    const { data } = await $authHost.put(CONTROL_URL,
        {
            id, title, realise, quantity
        }
    );
    return data;
}
export const deleteHistory = async (id) => {
    const { data } = await $authHost.delete(CONTROL_URL + `/${id}`);
    return data;
}