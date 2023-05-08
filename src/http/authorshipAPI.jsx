import { $authHost } from "./index";
import { AUTHOR_URL } from "./authorAPI";
import { CONTROL_URL } from "./bookAPI";



export const AUTHORSHIP_URL = '/Authorship';

export const fetchAuthorship = async (pageIndex) => {
    const { data } = await $authHost.get(AUTHORSHIP_URL + `?PageIndex=${pageIndex === null || pageIndex <= 0 ? 0 : pageIndex}`);
    return data;
}

export const fetchAuthorItem = async (number) => {
    const { data } = await $authHost.get(AUTHOR_URL + `/${number}`);
    return data;
}

export const fetchBookItem = async (number) => {
    const { data } = await $authHost.get(CONTROL_URL + `/${number}`);
    return data;
}

export const fetchGetCountPage = async () => {
    const { data } = await $authHost.get(AUTHORSHIP_URL + `/CountPage`);
    return data;
}

export const createAuthorship = async (bookId, authorId) => {
    const { data } = await $authHost.post(AUTHORSHIP_URL,
        {
            bookId, authorId
        }
    );
    return data
}

export const updateAuthorship = async (bookId, authorId) => {
    const { data } = await $authHost.put(AUTHORSHIP_URL,
        {
            bookId, authorId
        }
    );
    return data;
}
export const deleteAuthorship = async (bookId, authorId) => {
    const { data } = await $authHost.delete(AUTHORSHIP_URL + `/${bookId}/${authorId}`);
    return data;
}