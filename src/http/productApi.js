import {$authHost} from "./index";

export const createProduct = async (category) => {
    const {data} = await $authHost.post('api/product/add', category)
    return data
}

export const fetchProducts = async (categoryId, user) => {
    const {data} = await $authHost.get('api/product', {params: {
            categoryId, user
        }})
    return data
}


export const fetchUsers = async (categoryId) => {
    const {data} = await $authHost.get('api/user/search', {params: {
            categoryId
        }})
    return data
}

export const updateProduct = async (category)  =>{
    const {data} = await $authHost.post('api/product/updateproduct', category)
    return data
}

export const getProduct = async (id)  =>{
    const {data} = await $authHost.get('api/product/getproduct/' + id)
    return data
}

export const deleteProduct = async (id)  =>{
    const {data} = await $authHost.post('api/product/deleteproduct', {id})
    return data
}

export const fetchCategories = async () => {
    const {data} = await $authHost.get('api/category')
    return data
}

export const getCategory = async (id)  =>{
    const {data} = await $authHost.get('api/category/getcategory/' + id)
    return data
}

