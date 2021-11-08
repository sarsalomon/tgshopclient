import {$authHost} from "./index";

export const updateSetting = async (percent,phone) => {
    const {data} = await $authHost.post('api/setting/appupdate', {percent,phone})
    return data
}

export const getSetting = async ()  =>{
    const {data} = await $authHost.get('api/setting')
    return data
}