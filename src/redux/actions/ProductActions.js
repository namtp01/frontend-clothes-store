import axios from "axios"
import { logout } from './UserActions'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_EDIT_SUCCESS } from './../constants/ProductConstants';
import api from './../../api';

//  PRODUCT LIST
export const listProduct = (keyword=" ", pageNumber = " ") => async(dispatch) => {
    try {
        console.log(pageNumber); 
        dispatch({ type: PRODUCT_LIST_REQUEST})
        //const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        const {data} = await api.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data})
        //dispatch({ type: PRODUCT_LIST_SUCCESS, payload: Array.isArray(data) ? data : data.products})
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

// SINGLE PRODUCT
export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST})
        //const {data} = await axios.get(`/api/products/${id}`)
        const {data} = await api.get(`/api/products/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

// PRODUCT REVIEW CREATE
export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //await axios.post(`/api/products/${productId}/review`, review, config)
        await api.post(`/api/products/${productId}/review`, review, config)
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        })
    }
}

export const updateProductQuantity = (id, countInStock ) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST})

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //const {data} = await axios.put(`/api/products/${id}/updatequantity`, { countInStock }, config)
        const {data} = await api.put(`/api/products/${id}/updatequantity`, { countInStock }, config)
        
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }

        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        })
    }
}
