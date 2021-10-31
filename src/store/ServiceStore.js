import {makeAutoObservable} from "mobx";

export default class ServiceStore {
    constructor() {
        this._categories = []
        this._services = []
        makeAutoObservable(this)
    }

    setCategories(categories){
        this._categories = categories
    }

    setServices(services) {
        this._services = services
    }

    get categories(){
        return this._categories
    }

    get services() {
        return this._services
    }
    
}