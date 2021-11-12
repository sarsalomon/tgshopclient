import AddCategory from "./pages/add/AddCategory"
import AddProduct from "./pages/add/AddProduct"
import AddUser from "./pages/add/AddUser"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Notfounded from "./pages/Notfounded"
import Setting from "./pages/Setting"
import UpdateCategory from "./pages/update/UpdateCategory"
import UpdateHistory from "./pages/update/UpdateHistory"
import UpdateOrder from "./pages/update/UpdateOrder"
import UpdateProduct from "./pages/update/UpdateProduct"
import UpdateUser from "./pages/update/UpdateUser"
import Categories from "./pages/view/Categories"
import Histories from "./pages/view/Histories"
import Members from "./pages/view/Members"
import Orders from "./pages/view/Orders"
import Products from "./pages/view/Products"
import Users from "./pages/view/Users"
import { ADD_CATEGORY_ROUTE, ADD_PRODUCT_ROUTER, ADD_USER_ROUTER, CATEGORY_ROUTER, DASHBOARD_ROUTER, GET_CATEGORY_ROUTER, GET_HISTORY_ROUTER, GET_ORDER_ROUTER, GET_PRODUCT_ROUTER, GET_USER_ROUTER, HISTORY_ROUTER, LOGIN_ROUTER, MEMBER_ROUTER, NOTFOUNDED_ROUTER, ORDER_ROUTER, PRODUCT_ROUTER, REGISTRATION_ROUTER, SETTING_ROUTER, USER_ROUTER } from "./utils/consts"

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
        path: HISTORY_ROUTER,
        Component: Histories
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
        path: ADD_CATEGORY_ROUTE,
        Component: AddCategory
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
        path: GET_HISTORY_ROUTER + '/:id',
        Component: UpdateHistory
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