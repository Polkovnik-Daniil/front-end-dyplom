
import { makeAutoObservable } from "mobx";


export default class AuthorStore {
    constructor() {
        this._dataServ = [];
        this._countPage = 0;
        this._Id = "";
        this._name = "";
        this._oper = '';
        makeAutoObservable(this);
    }

    setPageSize(value) {
        this._countPage = value;
    }

    setData(value) {
        this._dataServ = value;
    }

    setOper(value) {
        this._oper = value;
    }

    setClean() {
        this._Id = "";
        this._name = "";
    }

    setId(value) {
        this._Id = value;
    }

    setName(value) {
        this._name = value;
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

    get Name() {
        return this._name;
    }

}