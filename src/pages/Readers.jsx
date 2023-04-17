import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import "./Books.css";
import { useContext } from "react"
import MaterialReactTable from 'material-react-table';
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchReader } from "../http/readerAPI";
import CreateReader from "../components/modals/CreateReader";



const Reader = observer(() => {
    const { readers } = useContext(Context);

    const [pagination, setPagination] = useState(0);
    const [readersVisible, setReadersVisible] = useState(false);

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
            accessorKey: 'surname',
            header: 'Surname',
        },
        {
            accessorKey: 'patronymic',
            header: 'Patronymic',
        },
        {
            accessorKey: 'placeOfResidence',
            header: 'Place of residence',
        },
        {
            accessorKey: 'phoneNumber',
            header: 'Phone number',
        }
    ];

    const GetValue = async (pageIndex) => {
        //readers.setPageSize(await fetchGetCountPage());
        readers.setData(await fetchReader(pageIndex === null || pageIndex <= 0 ? 0 : pageIndex));
    }

    useEffect(() => {
        GetValue(pagination);
    }, []);

    var values = readers.Data;
    if (values !== null) {
        return (
            <div className="d-flex flex-column">
                <MaterialReactTable columns={columns} data={values}
                    muiTableBodyCellProps={({ cell }) => ({
                        onClick: (event) => {
                            console.info(cell.row._valuesCache.title);

                            readers.setId(cell.row._valuesCache.id);
                            readers.setName(cell.row._valuesCache.name);
                            readers.setSurname(cell.row._valuesCache.surname);
                            readers.setPatronymic(cell.row._valuesCache.patronymic);
                            readers.setPlaceOfResidence(cell.row._valuesCache.placeOfResidence);
                            readers.setPhoneNumber(cell.row._valuesCache.phoneNumber);

                            setReadersVisible(true);
                        },
                    })}
                />
                <CreateReader show={readersVisible} onHide={() => setReadersVisible(false)}/>
                <button type="button" class="btn btn-outline-primary align-self-end m-3" onClick={() => {
                    setReadersVisible(true);
                    readers.setClean();
                }}>Add new reader</button>
            </div>
        );
    }
    return <div>Loading...</div>
});

export default Reader
