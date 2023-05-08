
import { makeAutoObservable } from "mobx";


export default class AuthorshipStore {
    constructor() {
        this._dataServ = [];
        this._countPage = 0;
        this._bookId = "";
        this._bookTitle = "";
        this._authorId = "";
        this._authorName = "";
        this._new = true;
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
    setNew(value) {
        this._new = value;
    }
    setClean() {
        this._Id = "";
        this._name = "";
    }

    setBookId(value) {
        this._bookId = value;
    }

    setBookTitle(value) {
        this._bookTitle = value;
    }
    setAuthorId(value) {
        this._authorId = value;
    }

    setAuthorName(value) {
        this._authorName = value;
    }
    get Oper() {
        return this._oper;
    }

    get Data() {
        return this._dataServ;
    }

    get BookId() {
        return this._bookId;
    }
    get New() {
        return this._new;
    }
    get BookTitle() {
        return this._bookTitle;
    }
    get AuthorId() {
        return this._authorId;
    }

    get AuthorName() {
        return this._authorName;
    }

}