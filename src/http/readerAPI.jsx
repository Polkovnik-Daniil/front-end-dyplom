import { $authHost } from "./index";


export const READER_URL = '/Readers';

export const fetchReader = async (pageIndex) => {
    const { data } = await $authHost.get(READER_URL + `?PageIndex=${pageIndex === null || pageIndex <= 0 ? 0 : pageIndex}`);
    return data;
}

export const fetchGetCountPage = async () => {
    const { data } = await $authHost.get(READER_URL + `/CountPage`);
    return data;
}

export const createReader = async (name, surname, patronymic, placeOfResidence, phoneNumber) => {
    const { data } = await $authHost.post(READER_URL,
        {
            name, surname, patronymic, placeOfResidence, phoneNumber
        }
    );
    return data
}

export const updateReader = async (id, name, surname, patronymic, placeOfResidence, phoneNumber) => {
    const { data } = await $authHost.put(READER_URL,
        {
            id, name, surname, patronymic, placeOfResidence, phoneNumber
        }
    );
    return data;
}
export const deleteReader = async (id) => {
    const { data } = await $authHost.delete(READER_URL + `/${id}`);
    return data;
}