import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as user from './reducers/UserReducers'
import * as product from './reducers/ProductReducers'
import * as cart from './reducers/CartReducers'
import * as order from './reducers/OrderReducers'
import * as category from './reducers/CategoryReducers'
const rootReducer = combineReducers({
    userLogin: user.userLoginReducer,
    userRegister: user.userRegisterReducer,
    userDetails: user.userDetailsReducer,
    userUpdateProfile: user.userUpdateProfileReducer,
    productList: product.productListReducer,
    productDetails: product.productDetailsReducer,
    productReviewCreate: product.productCreateReviewReducer,
    cart: cart.cartReducer,
    orderCreate: order.orderCreateReducer,
    orderDetails: order.orderDetailsReducer,
    orderPay: order.orderPayReducer,
    orderListMy: order.orderListMyReducer,
    categoryList: category.categoryListReducer
})

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage
    },
    userLogin: {
        userInfo: userInfoFromLocalStorage
    }
}

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})

export default store
