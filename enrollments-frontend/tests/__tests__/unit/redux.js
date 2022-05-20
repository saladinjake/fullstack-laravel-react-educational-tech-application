import {
    RESET_ERROR,
    LOGIN_SUCCESS,
    // LOGIN_FAIL,
    LOGOUT,
    SET_PATH,
    SET_LOADING,
    ADD_TO_CART,
    GET_COURSES,
    COURSE_ERROR,
    REMOVE_FROM_CART,
    ADD_QUANTITY,
    SUB_QUANTITY,
    CLEAR_CART,
    GET_COURSES,
    COURSE_ERROR,
    SET_LOADING 
} from "../../../src/enterprise-app/core/helpers/redux/types"
import { 
	setLoading, login, 
	logOut, 
	setPrevPath 
} from "../../../src/enterprise-app/core/helpers/redux/actions/authActions"
import { 
	fetchCourses, 
	addToCart, 
	removeFromCart ,
    addQuantity,
    clearCart,
    subQuantity
} from "../../../src/enterprise-app/core/helpers/redux/actions/cartActions"
