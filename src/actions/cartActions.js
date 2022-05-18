import {
  ADD_TO_CART,
  GET_COURSES,
  COURSE_ERROR,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  CLEAR_CART
} from "./types";


export const addToCart = (id) => async (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: id
  });
};

export const removeFromCart = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
};

export const addQuantity = (id) => async (dispatch) => {
  dispatch({
    type: ADD_QUANTITY,
    payload: id,
  });
};

export const subQuantity = (id) => async (dispatch) => {
  dispatch({
    type: SUB_QUANTITY,
    payload: id,
  });
};


export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART
  });
};