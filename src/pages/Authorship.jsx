import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import "./Books.css";
import { useContext } from "react"
import MaterialReactTable from 'material-react-table';
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchAuthorship, fetchGetCountPage } from "../http/authorshipAPI";
import CreateAuthorship from "../components/modals/CreateAuthorship";



const Authorship = observer(() => {
    const { authorship } = useContext(Context);

    const [pagination, setPagination] = useState(0);
    const [authorshipVisible, setAuthorshipVisible] = useState(false);

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
            accessorKey: 'authorId',
            header: 'Author Id',
        },
        {
            accessorKey: 'author.name',
            header: 'Author Name',
        }
    ];

    const GetValue = async (pageIndex) => {
        authorship.setData(await fetchAuthorship(pageIndex === null || pageIndex <= 0 ? 0 : pageIndex));
    }

    useEffect(() => {
        GetValue(pagination);
    }, []);

    var values = authorship.Data;
    if (values !== null) {
        return (
            <div className="d-flex flex-column">
                <div class="text-center">
                    <h1 class="display-1 fw-bold text-white">Authorships</h1>
                </div>
                <MaterialReactTable columns={columns} data={values}

                    muiTableBodyCellProps={({ cell }) => ({
                        onClick: (event) => {

                            authorship.setBookId(cell.row._valuesCache.bookId);
                            authorship.setBookTitle(cell.row._valuesCache["book.title"]);

                            authorship.setAuthorId(cell.row._valuesCache.authorId);
                            authorship.setAuthorName(cell.row._valuesCache["author.name"]);

                            authorship.setNew(false);
                            setAuthorshipVisible(true);
                        },
                    })}
                />
                <CreateAuthorship show={authorshipVisible} onHide={() => setAuthorshipVisible(false)} />
                <button type="button" class="btn btn-primary align-self-end m-3" onClick={() => {
                    setAuthorshipVisible(true);
                    authorship.setClean();
                    authorship.setNew(true);
                }}>Add new Authorship</button>
            </div>
        );
    }
    return <div>Loading...</div>
});

export default Authorship
