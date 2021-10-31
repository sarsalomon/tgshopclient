import { makeAutoObservable } from "mobx"

export default class CategoryStore{
    constructor(){
        this._categories = []
        this._titleUz = []
        this._titleRu = []
        this._deleteCategoryId = {}
        makeAutoObservable(this)
    }
    
    setCategories(categories){
        this._categories = categories
    }

    setTitleUz(titleUz){
        this._titleUz = titleUz
    }

    setTitleRu(titleRu){
        this._titleRu = titleRu
    }

    setdeleteCategoryId(deleteCategoryId){
        this._deleteCategoryId = deleteCategoryId
    }

    get categories(){
        return this._categories
    }

    get titleUz(){
        return this._titleUz
    }

    get titleRu(){
        return this._titleRu
    }
    
    get deleteCategoryId(){
        return this.deleteCategoryId
    }
}