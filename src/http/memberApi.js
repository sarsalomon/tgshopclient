import { $authHost } from "./index"

export const fetchMembers = async () =>{
    const {data} = await $authHost.get('api/member')
    return data
}


