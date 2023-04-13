import { makeAutoObservable } from "mobx";
import React, { useEffect, useMemo } from 'react';
import { fetchBooks } from "../http/bookAPI";


export default class BookStore {
    constructor() {
        this._dataServ = [];
        this._title = "";
        this._realise = "";
        this._quantity = null;
        this._columns = [
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
        makeAutoObservable(this);
    }
    setColumns(value) {
        this._columns = value;
    }

    async setData(pageIndex) {
        this._dataServ = await fetchBooks(pageIndex === null || pageIndex <= 0 ? 0 : pageIndex);
    }

    setTitle(value) {
        this._title = value;
    }

    setRealise(value) {
        this._realise = value;
    }

    setQuantity(data) {
        this._quantity = data;
    }

    get Data() {
        return this._dataServ;
    }

    get Columns() {
        return this._columns;
    }
}