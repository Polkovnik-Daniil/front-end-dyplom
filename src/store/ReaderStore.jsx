import { makeAutoObservable } from "mobx";


export default class ReaderStore {
    constructor() {
        this._dataServ = [];
        this._countPage = 0;

        this._Id = "";
        this._name = "";
        this._surname = "";
        this._patronymic = "";
        this._placeOfResidence = "";
        this._phoneNumber = "";

        this._oper = '';
        makeAutoObservable(this);
    }

    setId(value) {
        this._Id = value;
    }

    setSurname(value) {
        this._surname = value;
    }

    setName(value) {
        this._name = value;
    }

    setPatronymic(value) {
        this._patronymic = value;
    }

    setPlaceOfResidence(value) {
        this._placeOfResidence = value;
    }

    setPhoneNumber(value) {
        this._phoneNumber = value;
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
        this._surname = '';
        this._patronymic = "";
        this._placeOfResidence = "";
        this._phoneNumber = "";
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

    get Surname() {
        return this._surname;
    }

    get Patronymic() {
        return this._patronymic;
    }

    get PlaceOfResidence() {
        return this._placeOfResidence;
    }

    get PhoneNumber() {
        return this._phoneNumber;
    }

}