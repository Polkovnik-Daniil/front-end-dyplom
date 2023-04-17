import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import "./Books.css";
import { useContext } from "react"
import MaterialReactTable from 'material-react-table';
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchGenres, fetchGetCountPage } from "../http/genreAPI";
import CreateGenre from "../components/modals/CreateGenre";



const Genre = observer(() => {
    const { genres } = useContext(Context);

    const [pagination, setPagination] = useState(0);
    const [genresVisible, setGenresVisible] = useState(false);

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
        genres.setData(await fetchGenres(pageIndex === null || pageIndex <= 0 ? 0 : pageIndex));
    }

    useEffect(() => {
        GetValue(pagination);
    }, []);

    var values = genres.Data;
    if (values !== null) {
        return (
            <div className="d-flex flex-column">
                <MaterialReactTable columns={columns} data={values}
                    muiTableBodyCellProps={({ cell }) => ({
                        onClick: (event) => {
                            console.info(cell.row._valuesCache.title);
                            genres.setId(cell.row._valuesCache.id);
                            genres.setName(cell.row._valuesCache.name);
                            setGenresVisible(true);
                        },
                    })}
                />
                <CreateGenre show={genresVisible} onHide={() => setGenresVisible(false)} id={genres.Id} name={genres.Name} />
                <button type="button" class="btn btn-outline-primary align-self-end m-3" onClick={() => {
                    setGenresVisible(true);
                    genres.setClean();
                }}>Add new genre</button>
            </div>
        );
    }
    return <div>Loading...</div>
});

export default Genre
