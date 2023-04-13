import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useMemo } from 'react';
import "./Books.css";
import { useContext } from "react"
import { fetchBooks } from "../http/bookAPI";
import MaterialReactTable from 'material-react-table';
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";


 
const Books = observer(() => {
    const [pagination, setPagination] = useState(0);
    const { books } = useContext(Context);
    books.setColumns(useMemo(
        () => [
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
        ]))
    const GetValue = async (pageIndex) => {
        books.setData(pageIndex);
    }
    useEffect(() => {
        GetValue(pagination);
    }, []);
    if (books.Data !== null) {
        var a = books.Data;
        return <MaterialReactTable columns={books.columns} data={a} />;
    }
    return <div>Loading...</div>
});

export default Books
