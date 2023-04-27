import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import "./Books.css";
import { useContext } from "react"
import MaterialReactTable from 'material-react-table';
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchHistory, fetchGetCountPage } from "../http/historyAPI";
import CreateHistory from "../components/modals/CreateHistory";



const History = observer(() => {
    const { history } = useContext(Context);

    const [pagination, setPagination] = useState(0);
    const [historyVisible, setHistoryVisible] = useState(false);

    const columns = [
        {
            accessorKey: 'bookId',
            header: 'Book Id',
        },
        {
            accessorKey: 'book.title',
            header: 'Book name',
        },
        {
            accessorKey: 'readerId',
            header: 'Reader Id',
        },
        {
            accessorKey: 'reader.name',
            header: 'Reader Name',
        },
        {
            accessorKey: 'reader.surname',
            header: 'Reader Surname',
        },
        {
            accessorKey: 'reader.patronymic',
            header: 'Reader Patronymic',
        },
        {
            accessorKey: 'dateTimeStart',
            header: 'Issue date of the book',
        },
        {
            accessorKey: 'dateTimeEnd',
            header: 'Due date of the book',
        }
    ];

    const GetValue = async (pageIndex) => {
        history.setData(await fetchHistory(pageIndex === null || pageIndex <= 0 ? 0 : pageIndex));
    }

    useEffect(() => {
        GetValue(pagination);
    }, []);

    var values = history.Data;
    if (values !== null) {
        return (
            <div className="d-flex flex-column">
                <MaterialReactTable columns={columns} data={values}
                    muiTableBodyCellProps={({ cell }) => ({
                        onClick: (event) => {

                            console.log(cell.row._valuesCache[cell.row.index]);
                            console.log(cell.row._valuesCache["book.title"]);

                            history.setId(cell.row._valuesCache.id);

                            history.setBookId(cell.row._valuesCache.bookId);
                            history.setBookTitle(cell.row._valuesCache["book.title"]);

                            history.setReaderId(cell.row._valuesCache.readerId);
                            history.setReaderName(cell.row._valuesCache["reader.name"]);
                            history.setReaderSurname(cell.row._valuesCache["reader.surname"]);
                            history.setReaderPatronymic(cell.row._valuesCache["reader.patronymic"]);

                            history.setDateTimeStart(cell.row._valuesCache.dateTimeStart.split('T')[0]);
                            history.setDateTimeEnd(cell.row._valuesCache.dateTimeEnd.split('T')[0]);

                            setHistoryVisible(true);
                        },
                    })}
                />
                <CreateHistory show={historyVisible} onHide={() => setHistoryVisible(false)} />
                <button type="button" class="btn btn-outline-primary align-self-end m-3" onClick={() => {
                    setHistoryVisible(true);
                    history.setClean();
                }}>Add new history</button>
            </div>
        );
    }
    return <div>Loading...</div>
});

export default History
