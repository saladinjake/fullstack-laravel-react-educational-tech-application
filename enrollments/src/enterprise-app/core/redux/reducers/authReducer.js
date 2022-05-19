// import action types
import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_ERROR,
  SET_PATH,
  SET_LOADING,
} from "./../actions/types";

//prefetch initial existing states
const cachedUser = localStorage && JSON?.parse(localStorage.getItem("user"));
const cachedRole = localStorage && JSON?.parse(localStorage.getItem("user_roles"));
const cachedToken = localStorage && localStorage.getItem("token");
const cachedAuthorization = localStorage.user && localStorage.token;

//set initial state
const initialState = {
  isAuthenticated: cachedAuthorization ? true : false,
  user: cachedUser ? cachedUser : null,
  token: cachedToken ? cachedToken : null,
  user_roles: cachedRole ? cachedRole : null,
  error: null,
  loading: false,
  errFlag: false,
  prevPath: "",
};




/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: reducer for authentication
*@params: Object  state; Object action
*@usage: dispatch(reducer)
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("user_roles", JSON.stringify(action.payload.user_roles));
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.access_token,
        user_roles:action.payload.user_roles,
        isAuthenticated: true,
        errFlag: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_roles");
      return {
        ...state,
        token: null,
        loading: false,
        user_roles:null,
        isAuthenticated: false,
        isRegistered: false,
        user: null,
        errFlag: true,
        error: action.payload,
      };
    case SET_PATH:
      return {
        ...state,
        prevPath: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        loading: false,
        errFlag: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
