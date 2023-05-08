import { $authHost } from "./index";

export const AUTHOR_URL = '/Authors';

export const fetchAuthor = async (pageIndex) => {
    const { data } = await $authHost.get(AUTHOR_URL + `?PageIndex=${pageIndex === null || pageIndex <= 0 ? 0 : pageIndex}`);
    return data;
}
export const fetchGetCountPage = async () => {
    const { data } = await $authHost.get(AUTHOR_URL + `/CountPage`);
    return data;
}

export const createAuthor = async (name) => {
    const { data } = await $authHost.post(AUTHOR_URL,
        {
            name
        }
    );
    return data
}

export const updateAuthor = async (id, name) => {
    const { data } = await $authHost.put(AUTHOR_URL,
        {
            id, name
        }
    );
    return data;
}
export const deleteAuthor = async (id) => {
    const { data } = await $authHost.delete(AUTHOR_URL + `/${id}`);
    return data;
}