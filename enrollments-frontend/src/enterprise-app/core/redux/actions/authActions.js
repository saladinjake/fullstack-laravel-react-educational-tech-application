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
//basics
export const setLogin = user => ({
  type: LOGIN_SUCCESS,
  user,
});

//advanced with async

export const setLoading = () => async (dispatch) => {
    dispatch({
        type:SET_LOADING
    });
}
export const login = (response) => async (dispatch) => {
    //the api request is done some where else for concise and 
    // brevity reason.. check the api/services
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });
    setLogin(response)
}


//advanced
export const setPrevPath = (path) => async (dispatch) => {
  dispatch({
      type: SET_PATH,
      payload:path
  });
};
//advanced
export const resetErrFlag = () => async (dispatch) => {
        dispatch({
            type: RESET_ERROR
        });
}
// advanced
export const logOut = () => async (dispatch) => {
    dispatch({
        type:LOGOUT
    });
}