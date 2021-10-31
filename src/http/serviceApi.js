import {$authHost} from "./index";

export const createService = async (category) => {
    const {data} = await $authHost.post('api/service/add', category)
    return data
}

export const fetchServices = async () =>{
    const {data} = await $authHost.get('api/service')
    return data
}

export const updateService = async (id, titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu)  =>{
    const {data} = await $authHost.post('api/service/updateservice', {id, titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu})
    return data
}

export const getService = async (id)  =>{
    const {data} = await $authHost.get('api/service/getservice/' + id)
    return data
}

export const deleteService = async (id)  =>{
    const {data} = await $authHost.post('api/service/deleteservice', {id})
    return data
}

export const fetchCategories = async () => {
    const {data} = await $authHost.get('api/category')
    return data
}

export const fetchSubCategories = async () => {
    const {data} = await $authHost.get('api/category')
    return data
}

export const fetchCategoryName = async (id) => {
    const {data} = await $authHost.get('api/category/getcategory/' + id)
    return data
}