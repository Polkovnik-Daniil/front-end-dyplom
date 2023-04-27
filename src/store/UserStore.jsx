import { makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode";

export default class UserStore {
    constructor() {
        this.setParams();
        makeAutoObservable(this);
    }

    //сохранить роль пользователя его токены, состояние авторизации,его доступ
    setParams() {
        var accessToken = localStorage.getItem("accessToken");
        var refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken === null || accessToken === null || refreshToken === "" || accessToken === "") {
            this.logOut();
            return;
        }
        var data = jwt_decode(accessToken);
        this._isAuth = true;
        this._refreshToken = refreshToken;
        this._accessToken = accessToken;
        this._role = data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        this._serialNumber = data["http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber"];
        this._access = this._role === "Admin" ? true : false;
    }

    logOut() {
        this._isAuth = false;
        this._refreshToken = "";
        this._accessToken = "";
        this._role = "";
        this._serialNumber = "";
        this._access = false;
    }

    setTokens(value) {
        this._accessToken = value.accessToken;
        this._refreshToken = value.refreshToken;
        localStorage.setItem("accessToken", this._accessToken);
        localStorage.setItem("refreshToken", this._refreshToken);
        this.setParams();
    }

    setRefreshToken(value) {
        this._refreshToken = value;
    }

    setAccessToken(value) {
        this._accessToken = value;
    }

    setUser(value) {
        if (value) {
            this.setParams();
            return;
        }
        this.logOut();
    }

    get isAuth() {
        return this._isAuth;
    }

    get Access() {
        return this._access;
    }

    get Role() {
        return this._role;
    }

    get SerialNumber() {
        return this._serialNumber;
    }
}