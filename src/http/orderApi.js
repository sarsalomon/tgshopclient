import {$authHost} from "./index";

export const fetchOrders = async (categoryId, user, status) => {
    const {data} = await $authHost.get('api/order', {params: {
            categoryId, user, status
        }})
    return data
}

export const updateOrder = async (id, productId, chatId, status)  =>{
    const {data} = await $authHost.post('api/order/updateorder', {id, productId, chatId, status})
    return data
}

export const getOrder = async (id)  =>{
    const {data} = await $authHost.get('api/order/getorder/' + id)
    return data
}

export const getCategory = async (id)  =>{
    const {data} = await $authHost.get('api/order/getcategory/' + id)
    return data
}

export const getProduct = async (id)  =>{
    const {data} = await $authHost.get('api/order/getproduct/' + id)
    return data
}

export const getUser = async (id)  =>{
    const {data} = await $authHost.get('api/order/getuser/' + id)
    return data
}

export const getMember = async (id)  =>{
    const {data} = await $authHost.get('api/order/getmember/' + id)
    return data
}

export const deleteOrder = async (id)  =>{
    const {data} = await $authHost.post('api/order/deleteorder', {id})
    return data
}
