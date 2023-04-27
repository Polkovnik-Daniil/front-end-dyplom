import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import "./Books.css";
import { useContext } from "react"
import MaterialReactTable from 'material-react-table';
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBooks, fetchGetCountPage } from "../http/bookAPI";
import CreateBook from "../components/modals/CreateBook";


 
const Books = observer(() => {
    const { books, user } = useContext(Context);

    const [pagination, setPagination] = useState(0);
    const [bookVisible, setBookVisible] = useState(false);

    const columns = [
        {
            accessorKey: 'id',
            header: 'Id',
        },
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'realise',
            header: 'Realise',
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
        }
    ];

    const GetValue = async (pageIndex) => {
        //books.setPageSize(await fetchGetCountPage());
        books.setData(await fetchBooks(pageIndex === null || pageIndex <= 0 ? 0 : pageIndex));
    }

    useEffect(() => {
        GetValue(pagination);
    }, []);

    var values = books.Data;
    if (values !== null) {
        return (
            <div className="d-flex flex-column">
                <MaterialReactTable columns={columns} data={values}
                    muiTableBodyCellProps={({ cell }) => ({
                        onClick: (event) => {
                            books.setId(cell.row._valuesCache.id);
                            books.setTitle(cell.row._valuesCache.title);
                            books.setRealise(cell.row._valuesCache.realise.split('T')[0]);
                            books.setQuantity(cell.row._valuesCache.quantity);
                            setBookVisible(true);
                        },
                    })}
                />
                { user.Role !== 'User' ? <CreateBook show={bookVisible} onHide={() => setBookVisible(false)} /> : null }
                <button type="button" class="btn btn-outline-primary align-self-end m-3" onClick={() => {
                    setBookVisible(true);
                    books.setClean();
                }}>Add new book</button>
            </div>
        );
    }
    return <div>Loading...</div>
});

export default Books
