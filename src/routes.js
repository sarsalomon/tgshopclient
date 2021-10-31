import AddCategory from "./pages/add/AddCategory"
import AddProduct from "./pages/add/AddProduct"
import AddService from "./pages/add/AddService"
import AddSubCategory from "./pages/add/AddSubCategory"
import AddUser from "./pages/add/AddUser"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Notfounded from "./pages/Notfounded"
import Setting from "./pages/Setting"
import UpdateCategory from "./pages/update/UpdateCategory"
import UpdateOrder from "./pages/update/UpdateOrder"
import UpdateProduct from "./pages/update/UpdateProduct"
import UpdateSubCategory from "./pages/update/UpdateSubCategory"
import UpdateUser from "./pages/update/UpdateUser"
import Categories from "./pages/view/Categories"
import Members from "./pages/view/Members"
import Orders from "./pages/view/Orders"
import Products from "./pages/view/Products"
import Services from "./pages/view/Services"
import Users from "./pages/view/Users"
import { ADD_CATEGORY_ROUTE, ADD_PRODUCT_ROUTER, ADD_SERVICE_ROUTE, ADD_SUBCATEGORY_ROUTE, ADD_USER_ROUTER, CATEGORY_ROUTER, DASHBOARD_ROUTER, GET_CATEGORY_ROUTER, GET_ORDER_ROUTER, GET_PRODUCT_ROUTER, GET_SUBCATEGORY_ROUTER, GET_USER_ROUTER, LOGIN_ROUTER, MEMBER_ROUTER, NOTFOUNDED_ROUTER, ORDER_ROUTER, PRODUCT_ROUTER, REGISTRATION_ROUTER, SERVICE_ROUTER, SETTING_ROUTER, USER_ROUTER } from "./utils/consts"

export const authRoutes = [
    {
        path: DASHBOARD_ROUTER,
        Component: Dashboard
    },
    {
        path: SETTING_ROUTER,
        Component: Setting
    },
    {
        path: SERVICE_ROUTER,
        Component: Services
    },
    {
        path: PRODUCT_ROUTER,
        Component: Products
    },
    {
        path: MEMBER_ROUTER,
        Component: Members
    },
    {
        path: USER_ROUTER,
        Component: Users
    },
    {
        path: SETTING_ROUTER,
        Component: Setting
    },
    {
        path: ORDER_ROUTER,
        Component: Orders
    },
    {
        path: CATEGORY_ROUTER,
        Component: Categories
    },
    {
        path: ADD_PRODUCT_ROUTER,
        Component: AddProduct
    },
    {
        path: ADD_SERVICE_ROUTE,
        Component: AddService
    },
    {
        path: ADD_CATEGORY_ROUTE,
        Component: AddCategory
    },      
    {
        path: ADD_SUBCATEGORY_ROUTE,
        Component: AddSubCategory
    },    
    {
        path: ADD_USER_ROUTER,
        Component: AddUser
    },
    {
        path: GET_CATEGORY_ROUTER + '/:id',
        Component: UpdateCategory
    },    
    {
        path: GET_SUBCATEGORY_ROUTER + '/:id',
        Component: UpdateSubCategory
    },
    {
        path: GET_ORDER_ROUTER + '/:id',
        Component: UpdateOrder
    },
    {
        path: GET_PRODUCT_ROUTER + '/:id',
        Component: UpdateProduct
    },
    {
        path: GET_USER_ROUTER + '/:id',
        Component: UpdateUser
    },
    {
        path: NOTFOUNDED_ROUTER,
        Component: Notfounded
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTER,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTER,
        Component: Auth
    },
    {
        path: NOTFOUNDED_ROUTER,
        Component: Notfounded
    }
]