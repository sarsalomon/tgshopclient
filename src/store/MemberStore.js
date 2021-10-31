import { makeAutoObservable } from "mobx"

export default class MemberStore{
    constructor(){
        this._members = []
        makeAutoObservable(this)
    }
    
    setMembers(members){
        this._members = members
    }

    get members(){
        return this._members
    }


}