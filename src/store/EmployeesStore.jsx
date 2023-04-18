import { makeAutoObservable } from "mobx";


export default class EmployeesStore {
    constructor() {
        this._dataServ = [];
        this._countPage = 0;
        this._Id = "";
        this._name = "";
        this._email = "";
        this._password="";
        this._roleId = "";
        this._roleName = "";
        this._refreshToken="";
        this._refreshTokenExpiryTime="";
        this._isLocked=false;
        this._oper = '';
        makeAutoObservable(this);
    }

    setPageSize(value) {
        this._countPage = value;
    }

    setData(value) {
        this._dataServ = value;
    }

    setClean() {
        this._Id = "";
        this._name = "";
        this._email = "";
        this._password = "";
        this._roleId = "";
        this._roleName = "";
        this._refreshToken = "";
        this._refreshTokenExpiryTime = "";
        this._isLocked = false;
    }

    setId(value) {
        this._Id = value;
    }

    setName(value) {
        this._name = value;
    }

    setEmail(value) {
        this._email = value;
    }

    setPassword(value) {
        this._password = value;
    }

    setRoleId(value) {
        this._roleId = value;
    }

    setRoleName(value) {
        this._roleName = value;
    }

    setRefreshToken(value) {
        this._refreshToken = value;
    }

    setRefreshTokenExpiryTime(value) {
        this._refreshTokenExpiryTime = value;
    }

    setIsLocked(value) {
        this._isLocked = value;
    }

    setOper(value) {
        this._oper = value;
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

    get Email() {
        return this._email;
    }

    get Password() {
        return this._password;
    }

    get RoleId() {
        return this._roleId;
    }

    get RefreshToken() {
        return this._refreshToken;
    }

    get RefreshTokenExpiryTime() {
        return this._refreshTokenExpiryTime;
    }

    get IsLocked() {
        return this._isLocked;
    }

    get Oper() {
        return this._oper;
    }
}