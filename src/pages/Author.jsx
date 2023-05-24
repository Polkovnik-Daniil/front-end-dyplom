import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import "./Books.css";
import { useContext } from "react"
import MaterialReactTable from 'material-react-table';
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchAuthor, fetchGetCountPage } from "../http/authorAPI";
import CreateAuthor from "../components/modals/CreateAuthor";



const Author = observer(() => {
    const { author, user } = useContext(Context);

    const [pagination, setPagination] = useState(0);
    const [authorVisible, setAuthorVisible] = useState(false);

    const columns = [
        {
            accessorKey: 'id',
            header: 'Id',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        }
    ];

    const GetValue = async (pageIndex) => {
        //books.setPageSize(await fetchGetCountPage());
        author.setData(await fetchAuthor(pageIndex === null || pageIndex <= 0 ? 0 : pageIndex));
    }

    useEffect(() => {
        GetValue(pagination);
    }, []);

    var values = author.Data;
    if (values !== null) {
        return (
            <div className="d-flex flex-column">
                <MaterialReactTable columns={columns} data={values}
                    muiTableBodyCellProps={({ cell }) => ({
                        onClick: (event) => {
                            author.setId(cell.row._valuesCache.id);
                            author.setName(cell.row._valuesCache.name);
                            setAuthorVisible(true);
                        },
                    })}
                />
                <CreateAuthor show={authorVisible} onHide={() => setAuthorVisible(false)} /> 
                {user.Role !== 'User' ? <button type="button" class="btn btn-primary align-self-end m-3" onClick={() => {
                    setAuthorVisible(true);
                    author.setClean();
                }}>Add new author</button> : null}
            </div>
        );
    }
    return <div>Loading...</div>
});

export default Author
