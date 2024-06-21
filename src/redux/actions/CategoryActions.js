import { CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_EDIT_FAIL, CATEGORY_EDIT_REQUEST, CATEGORY_EDIT_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS } from "../constants/CategoryConstants";
import axios from 'axios';
import { logout } from "./UserActions";
import api from './../../api';

export const listCategories = () => async (dispatch, getState) =>
{
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await api.get(`/api/categories`, config)

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })

  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message

    if (message === "Not Authorized, Token Failed") {
      dispatch(logout())
    }

    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message,
    })
  }
}

// CREATE CATEGORY
export const createCategory = (name, image, parent) => async (dispatch, getState) =>
{
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.post(
      `/api/categories/`,
      { name, image, parent },
      config
    );

    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === 'Not Authorized, Token Failed') {
      dispatch(logout());
    }

    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};


 
// EDIT CATEGORY
export const editCategory = (id) => async(dispatch) => {
  try {
      dispatch({ type: CATEGORY_EDIT_REQUEST})
      const {data} = await api.get(`/api/categories/${id}`)
      dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data})
  } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message

      if (message === "Not Authorized, Token Failed") {
          dispatch(logout())
      }

      dispatch({
          type: CATEGORY_EDIT_FAIL,
          payload: message,
      })
  }
}

// UPDATE CATEGORY
export const updateCategory = (id, name, image, parent) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.put(
      `/api/categories/${id}`,
      { name, image, parent },
      config
    );

    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not Authorized, Token Failed") {
      dispatch(logout());
    }

    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = (id) => async(dispatch, getState) => {
  try {
      dispatch({ type: CATEGORY_DELETE_REQUEST})

      const { userLogin: { userInfo }} = getState()

      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }

      await api.delete(`/api/categories/${id}`, config)
      
      dispatch({ type: CATEGORY_DELETE_SUCCESS })

  } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message

      if (message === "Not Authorized, Token Failed") {
          dispatch(logout())
      }

      dispatch({
          type: CATEGORY_DELETE_FAIL,
          payload: message,
      })
  }
}