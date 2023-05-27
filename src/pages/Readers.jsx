import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import "./Books.css";
import { useContext } from "react"
import MaterialReactTable from 'material-react-table';
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchReader, fetchGetCountPage } from "../http/readerAPI";
import CreateReader from "../components/modals/CreateReader";



const Reader = observer(() => {
    const { readers, user } = useContext(Context);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 0, //customize the default page size
    });
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
        readers.setPageSize(await fetchGetCountPage(pageIndex));
        setPagination({ pageIndex: pagination.pageIndex, pageSize: readers.CountPage });
        readers.setData(await fetchReader(pageIndex === null || pageIndex <= 0 ? 0 : pageIndex));
        setPagination(pageIndex);
    }

    useEffect(() => {
        GetValue(pagination.pageIndex);
    }, []);

    var values = readers.Data;
    if (values !== null) {
        return (
            <div className="d-flex flex-column">
                <div class="text-center">
                    <h1 class="display-1 fw-bold text-white">Readers</h1>
                </div>
                <MaterialReactTable columns={columns} data={values}
                    pageCount={ pagination }
                    onPaginationChange={setPagination}
                    muiTableBodyCellProps={({ cell }) => ({
                        onClick: (event) => {
                            
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
                <CreateReader show={readersVisible} onHide={() => setReadersVisible(false)} />
                { user.Role !== 'User' ? <button type="button" class="btn btn-primary align-self-end m-3" onClick={() => {
                    setReadersVisible(true);
                    readers.setClean();
                }}>Add new reader</button> : null}
            </div>
        );
    }
    return <div>Loading...</div>
});

export default Reader
