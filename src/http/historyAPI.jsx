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

export const createHistory = async (readerId, bookId, dateTimeStart, dateTimeEnd) => {
    const { data } = await $authHost.post(CONTROL_URL, {
        readerId, bookId, dateTimeStart, dateTimeEnd
    });
    return data
}

export const updateHistory = async (readerId, bookId, dateTimeStart, dateTimeEnd) => {
    const { data } = await $authHost.put(CONTROL_URL, {
        readerId, bookId, dateTimeStart, dateTimeEnd
    });
    return data;
}
export const deleteHistory = async (readerId, bookId, dateTimeStart, dateTimeEnd) => {
    const { data } = await $authHost.delete(CONTROL_URL + `/${readerId}/${bookId}/${dateTimeStart }/${ dateTimeEnd }`);
    return data;
}