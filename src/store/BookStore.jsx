import { makeAutoObservable } from "mobx";


export default class BookStore {
    constructor() {
        this._new = false;
        this._dataServ = [];
        this._countPage = 0;
        this._index = -1;
        this._Id = "";
        this._title = "";
        this._realise = "";
        this._quantity = "";
        this._genres = [];
        this._count = 0;
        this._oper = '';
        makeAutoObservable(this);
    }

    setPageSize(value) {
        this._countPage = value;
    }

    async setData(value) {
        this._dataServ = value;
    }

    setOper(value) {
        this._oper = value;
    }
    setIndex(value) {
        this._index = value;
    }
    setClean() {
        this._new = true;
        this._Id = "";
        this._title = "";
        this._realise = "";
        this._quantity = "";
        this._index = -1;
        this._count = 0;
        this._genres = [];
    }
    setNew(value) {
        this._new = value;
    }
    setId(value) {
        this._Id = value;
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
    setCount(value) {
        this._count = value;
    }
    setGenres(data) {
        this._genres = data;
    }
    get Oper() {
        return this._oper;
    }
    get Data() {
        return this._dataServ;
    }

    get Id() {
        return this._Id;
    }

    get Title() {
        return this._title;
    }

    get Realise() {
        return this._realise;
    }

    get Quantity() {
        return this._quantity;
    }
    get PageSize() {
        return this._countPage;
    }
    get Index() {
        return this._index;
    }
    get Genres(){
        return this._genres;
    }
    get New() {
        return this._new;
    }
    get Count() {
        return this._count;
    }
}