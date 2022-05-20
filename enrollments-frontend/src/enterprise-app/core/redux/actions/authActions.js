/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: auth action handlers

*/

import {
    RESET_ERROR,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    // LOGIN_FAIL,
    LOGOUT,
    SET_PATH,
    SET_LOADING, 
} from './types';


//basics
export const setRegister = user => ({
  type: REGISTER_SUCCESS,
  user,
});

//advanced with async

export const setLoading = () => async (dispatch) => {
    dispatch({
        type:SET_LOADING
    });
}
export const login = (response) => async (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });
}



export const setPrevPath = (path) => async (dispatch) => {
  dispatch({
      type: SET_PATH,
      payload:path
  });
};

export const resetErrFlag = () => async (dispatch) => {
        dispatch({
            type: RESET_ERROR
        });
}

export const logOut = () => async (dispatch) => {
    dispatch({
        type:LOGOUT
    });
}