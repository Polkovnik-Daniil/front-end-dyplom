import { makeAutoObservable } from "mobx";
export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._access = false;
        this._user = {};

        makeAutoObservable(this)
    }
    
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setAccess(bool) {
        this._access = bool;
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get Access() {
        return this._access
    }
}