import { makeAutoObservable } from "mobx";


export default class HistoryStore {
    constructor() {
        this._dataServ = [];
        this._countPage = 0;

        this._Id = "";
        this._new = false;
        this._book = null;
        this._bookId = 0;
        this._bookTitle = "";

        this._reader = null;
        this._readerId = 0;
        this._readerName = "";
        this._readerSurname = "";
        this._readerPatronymic = "";


        this._dateTimeStart = null;
        this._dateTimeEnd = null;

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
        this._new = true;


        this._book = null;
        this._bookId = 0;
        this._bookTitle = "";

        this._reader = null;
        this._readerId = 0;
        this._readerName = "";
        this._readerSurname = "";
        this._readerPatronymic = "";


        this._dateTimeStart = null;
        this._dateTimeEnd = null;
    }

    setId(value) {
        this._Id = value;
    }

    setNew(value) {
        this._new = value;
    }
    setBook(value) {
        this._book = value;
    }
    setBookId(value) {
        this._bookId = value;
    }
    setBookTitle(value){
        this._bookTitle=value;
    }

    
    setReader(value) {
        this._reader = value;
    }
    setReaderId(value) {
        this._readerId = value;
    }
    setReaderName(value){
        this._readerName=value;
    }
    setReaderSurname(value){
        this._readerSurname=value;
    }
    setReaderPatronymic(value){
        this._readerPatronymic=value;
    }


    setDateTimeStart(value) {
        this._dateTimeStart = value;
    }
    setDateTimeEnd(value) {
        this._dateTimeEnd = value;
    }

    get Oper() {
        return this._oper;
    }

    get Data() {
        return this._dataServ;
    }
    get New() {
        return this._new;
    }


    get Book() {
        return this._book;
    }
    get BookId() {
        return this._bookId;
    }
    get BookTitle(){
        return this._bookTitle;
    }


    get Reader() {
        return this._reader;
    }
    get ReaderId() {
        return this._readerId;
    }
    get ReaderName() {
        return this._readerName;
    }
    get ReaderSurname() {
        return this._readerSurname;
    }
    get ReaderPatronymic() {
        return this._readerPatronymic;
    }



    get DateTimeStart() {
        return this._dateTimeStart;
    }
    get DateTimeEnd() {
        return this._dateTimeEnd;
    }
}