import {$authHost} from "./index";

export const createProduct = async (category) => {
    const {data} = await $authHost.post('api/product/add', category)
    return data
}

export const fetchProducts = async (categoryId, subcategoryId, productorservice) => {
    const {data} = await $authHost.get('api/product', {params: {
            categoryId, subcategoryId, productorservice
        }})
    return data
}

export const fetchUsers = async (categoryId, subcategoryId) => {
    const {data} = await $authHost.get('api/user/search', {params: {
            categoryId, subcategoryId
        }})
    return data
}

export const updateProduct = async (id, titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu, сurrency, productorservice, item)  =>{
    const {data} = await $authHost.post('api/product/updateproduct', {id, titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu, сurrency, productorservice, item})
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

export const fetchSubCategories = async (categoryId)  =>{
    const {data} = await $authHost.get('api/product/getsubcategory/' + categoryId)
    return data
}

export const getCategory = async (id)  =>{
    const {data} = await $authHost.get('api/category/getcategory/' + id)
    return data
}

