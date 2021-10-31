import {$authHost} from "./index";

export const updateSetting = async (percent) => {
    const {data} = await $authHost.post('api/setting/appupdate', {percent})
    return data
}

export const getSetting = async ()  =>{
    const {data} = await $authHost.get('api/setting')
    return data
}