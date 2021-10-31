import {$authHost} from "./index";

export const fetchOrders = async (categoryId, status, subcategoryId, productorservice) => {
    const {data} = await $authHost.get('api/order', {params: {
            categoryId, status, subcategoryId, productorservice
        }})
    return data
}

export const updateOrder = async (id, status, ratingstatus)  =>{
    const {data} = await $authHost.post('api/order/updateorder', {id, status, ratingstatus})
    return data
}

export const getOrder = async (id)  =>{
    const {data} = await $authHost.get('api/order/getorder/' + id)
    return data
}