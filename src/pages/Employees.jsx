import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { NOTFOUND_ROUTE } from "../utils/consts";
import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { fetchEmployees, fetchGetCountPage } from "../http/employeesAPI";
import MaterialReactTable from 'material-react-table';
import CreateEmployees from "../components/modals/CreateEmployees";

const Employees = observer(() => {
    const navigate = useNavigate();
    const { user, employees } = useContext(Context);
    if (!user.Access) {
        navigate(NOTFOUND_ROUTE);
        return;
    }

    const [pagination, setPagination] = useState(0);
    const [employeesVisible, setEmployeesVisible] = useState(false);

    const columns = [
        {
            accessorKey: 'id',
            header: 'Id',   
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'password',
            header: 'Password',
        },
        {
            accessorKey: 'role.id',
            header: 'Role Id',
        },
        {
            accessorKey: 'role.name',
            header: 'Role name',
        },
        {
            accessorKey: 'refreshToken',
            header: 'Refresh Token',
        },
        {
            accessorKey: 'refreshTokenExpiryTime',
            header: 'Refresh Token Expiry Time',
        },
        {
            accessorKey: 'isLocked',
            header: 'Is Locked',
        }
    ];

    const GetValue = async (pageIndex) => {
        //books.setPageSize(await fetchGetCountPage());
        employees.setData(await fetchEmployees(pageIndex === null || pageIndex <= 0 ? 0 : pageIndex));
    }

    useEffect(() => {
        GetValue(pagination);
    }, []);

    var values = employees.Data;
    if (values !== null) {
        return (
            <div className="d-flex flex-column">
                <MaterialReactTable columns={columns} data={values}
                    muiTableBodyCellProps={({ cell }) => ({
                        onClick: (event) => {

                            employees.setId(cell.row._valuesCache.id);
                            employees.setName(cell.row._valuesCache.name);
                            employees.setEmail(cell.row._valuesCache.email);
                            employees.setPassword(cell.row._valuesCache.password);
                            employees.setRoleId(cell.row._valuesCache["role.id"]);
                            employees.setRoleName(cell.row._valuesCache["role.name"]);
                            employees.setRefreshToken(cell.row._valuesCache.refreshToken == '' || cell.row._valuesCache.refreshToken == null ? null : cell.row._valuesCache.refreshToken);
                            employees.setRefreshTokenExpiryTime(cell.row._valuesCache.refreshTokenExpiryTime == '' || cell.row._valuesCache.refreshTokenExpiryTime == null ? null : cell.row._valuesCache.refreshTokenExpiryTime.split('T')[0]);
                            employees.setIsLocked(cell.row._valuesCache.isLocked);

                            setEmployeesVisible(true);
                        },
                    })}
                />
                <CreateEmployees show={employeesVisible} onHide={() => setEmployeesVisible(false)} />
                <button type="button" class="btn btn-primary align-self-end m-3" onClick={() => {
                    setEmployeesVisible(true);
                    employees.setClean();
                }}>Add new employees</button>
            </div>
        );
    }
    return <div>Loading...</div>
});

export default Employees;