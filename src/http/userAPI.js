import { $authHost, $host } from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (login, password, role, fish, phone) =>{
    const {data} = await $host.post('api/user/registration',{login, password, role, fish, phone})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const signIn = async (login, password) =>{
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const addUser = async (login, password, categoryId, fish, phone, role) =>{
    const {data} = await $authHost.post('api/user/adduser', {login, password, categoryId, fish, phone, role})
    return data
}

export const createUser = async (user) => {
    const {data} = await $authHost.post('api/user/add', user)
    return data
}

export const updateUser = async (id, fish, role, categoryId)  =>{
    const {data} = await $authHost.post('api/user/updateuser', {id, fish, role, categoryId})
    return data
}

export const fetchUsers = async (categoryId, subcategoryId) =>{
    const {data} = await $authHost.get('api/user', {params: {
        categoryId, subcategoryId
    }})
    return data
}

export const getUser = async (id)  =>{
    const {data} = await $authHost.get('api/user/getuser/' + id)
    return data
}

export const deleteUser = async (id)  =>{
    const {data} = await $authHost.post('api/user/deleteuser', {id})
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
