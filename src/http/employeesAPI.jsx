import { $authHost } from "./index";


export const EMPLOYEES_URL = '/Users';

export const fetchEmployees = async (pageIndex) => {
    const { data } = await $authHost.get(EMPLOYEES_URL + `?PageIndex=${pageIndex === null || pageIndex <= 0 ? 0 : pageIndex}`);
    return data;
}

export const fetchGetCountPage = async () => {
    const { data } = await $authHost.get(EMPLOYEES_URL + `/CountPage`);
    return data;
}

export const createEmployees = async(name, email, password, roleId, isLocked) => {
    const { data } = await $authHost.post(EMPLOYEES_URL,
        {
            name, email, password, roleId, isLocked
        }
    );
    return data
}

export const updateEmployees = async (id, name, email, password, roleId, refreshToken, refreshTokenExpiryTime, isLocked) => {
    const { data } = await $authHost.put(EMPLOYEES_URL,
        {
            id, name, email, password, roleId, refreshToken, refreshTokenExpiryTime, isLocked
        }
    );
    return data;
}
export const deleteEmployees = async (id) => {
    const { data } = await $authHost.delete(EMPLOYEES_URL + `/${id}`);
    return data;
}