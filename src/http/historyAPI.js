import {$authHost} from "./index";

export const fetchHistories = async (categoryId,user) => {
    const {data} = await $authHost.get('api/history', {params: {
            categoryId,user
        }})
    return data
}

export const getHistory = async (id)  =>{
    const {data} = await $authHost.get('api/history/gethistory/' + id)
    return data
}