import { $authHost } from "./index"

export const createCategory = async (titleUz, titleRu) =>{
    const {data} = await $authHost.post('api/category/add',{titleUz, titleRu})
    return data
}

export const createSubCategory = async (category) =>{
    const {data} = await $authHost.post('api/category/addsubcategory',category)
    return data
}

export const fetchCategories = async () =>{
    const {data} = await $authHost.get('api/category')
    return data
}

export const fetchSubCategories = async (categoryId) =>{
    const {data} = await $authHost.get('api/category/subcategory', {params: {
        categoryId
    }})
    return data
}

export const updateCategory = async (id, titleUz, titleRu)  =>{
    const {data} = await $authHost.post('api/category/updatecategory', {id, titleUz, titleRu})
    return data
}

export const updateSubCategory = async (id, titleUz, titleRu, categoryId)  =>{
    const {data} = await $authHost.post('api/category/updatesubcategory', {id, titleUz, titleRu, categoryId})
    return data
}

export const getCategory = async (id)  =>{
    const {data} = await $authHost.get('api/category/getcategory/' + id)
    return data
}

export const getSubCategory = async (id)  =>{
    const {data} = await $authHost.get('api/category/getsubcategory/' + id)
    return data
}

export const deleteCategory = async (id)  =>{
    const {data} = await $authHost.post('api/category/deletecategory', {id})
    return data
}

export const deleteSubCategory = async (id)  =>{
    const {data} = await $authHost.post('api/category/deletesubcategory', {id})
    return data
}