import { $authHost } from "./index";


export const GENRE_URL = '/Genres';

export const fetchGenres = async (pageIndex) => {
    const { data } = await $authHost.get(GENRE_URL + `?PageIndex=${pageIndex === null || pageIndex <= 0 ? 0 : pageIndex}`);
    return data;
}

export const fetchGetCountPage = async () => {
    const { data } = await $authHost.get(GENRE_URL + `/CountPage`);
    return data;
}

export const createGenre = async (name) => {
    const { data } = await $authHost.post(GENRE_URL,
        {
            name
        }
    );
    return data
}

export const updateGenre = async (id, name) => {
    const { data } = await $authHost.put(GENRE_URL,
        {
            id, name
        }
    );
    return data;
}
export const deleteGenre = async (id) => {
    const { data } = await $authHost.delete(GENRE_URL + `/${id}`);
    return data;
}