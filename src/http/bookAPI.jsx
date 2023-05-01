import { $authHost } from "./index";


export const CONTROL_URL = '/Books';

export const fetchBooks = async (pageIndex) => {
    const { data } = await $authHost.get(CONTROL_URL + `?PageIndex=${pageIndex === null || pageIndex <= 0 ? 0 : pageIndex}`);
    return data;
}
export const fetchBookItem = async (number) => {
    const { data } = await $authHost.get(CONTROL_URL + `/${number}`);
    return data;
}
export const fetchGetCountPage = async () => {
    const { data } = await $authHost.get(CONTROL_URL + `/CountPage`);
    return data;
}

export const createBook = async (title, realise, quantity, genres) => {
    const { data } = await $authHost.post(CONTROL_URL,
        {
            title, realise, quantity, genres
        }
    );
    return data
}

export const updateBook = async (id, title, realise, quantity, genres) => {
    const { data } = await $authHost.put(CONTROL_URL,
        {
            id, title, realise, quantity, genres
        }
    );
    return data;
}
export const deleteBook = async (id) => {
    const { data } = await $authHost.delete(CONTROL_URL + `/${id}`);
    return data;
}