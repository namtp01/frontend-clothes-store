
import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/CartConstants.js';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from '../constants/OrderConstants.js';
import { logout } from './UserActions';
import api from './../../api';

// CREATE ORDER
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //const {data} = await axios.post(`/api/orders`, order, config)
        const {data} = await api.post(`/api/orders`, order, config)
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data})
        dispatch({ type: CART_CLEAR_ITEMS, payload: data})

        localStorage.removeItem("cartItems")

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        if (!userInfo) {
            throw new Error('User not logged in')
        }

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //const {data} = await axios.get(`/api/orders/${id}`, config)
        const {data} = await api.get(`/api/orders/${id}`, config)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data})

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}

// ORDER PAY
export const payOrder = (orderId,paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        const {data} = await api.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data})

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        })
    }
}

// USER ORDERS
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //const {data} = await axios.get(`/api/orders/`, config)
        const {data} = await api.get(`/api/orders/`, config)
        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data})

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: message,
        })
    }
}

export const sendOrderDetailsEmail = (email) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'SEND_ORDER_DETAILS_EMAIL_REQUEST' })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await api.post(`/api/orders/send-order-details`, { email }, config)

        dispatch({
            type: 'SEND_ORDER_DETAILS_EMAIL_SUCCESS',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'SEND_ORDER_DETAILS_EMAIL_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}