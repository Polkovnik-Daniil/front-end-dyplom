import { makeAutoObservable } from "mobx";


export default class BookStore {
    constructor() {
        this._dataServ = [];
        this._countPage = 0;
        this._Id = "";
        this._title = "";
        this._realise = "";
        this._quantity = "";
        this._genres = [];
        this._oper = '';
        makeAutoObservable(this);
    }

    setPageSize(value) {
        this._countPage = value;
    }

    async setData(value) {
        console.log(value);
        this._dataServ = value;
        console.log(this._dataServ[0].title);
    }

    setOper(value) {
        this._oper = value;
    }

    setClean() {
        this._Id = "";
        this._title = "";
        this._realise = "";
        this._quantity = "";
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
}