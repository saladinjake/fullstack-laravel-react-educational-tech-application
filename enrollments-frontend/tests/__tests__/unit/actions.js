/*@testCases: test individual actions
 *@testType: unit test
 *@testCategory: simple
 *@author: saladinjake victor
 *@company: Ficticious EMS
 *@date" 5/20/2022
*/
import {
    RESET_ERROR,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
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







import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
// import * as types from '../../actions/actionsTypes';
// import * as actions from '../../actions/userActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login actions', () => {
  it('handles login', () => {
    const user = {};
    const expectedAction = {
      type: LOGIN_SUCCESS,
      user
    };

    expect(login(user)).toEqual(expectedAction);
  });
});

describe('register actions', () => {
  it('handles registration', () => {
    const data = {
      user: {}
    };

    const expectedAction = {
      type: REGISTER_SUCCESS,
      data
    };

    expect(setRegister(user)).toEqual(expectedAction);
  });
});


describe('logout actions', () => {
  it('handles logout', () => {

    const expectedAction = {
      type: LOG_OUT,
    };

    expect(logOut()).toEqual(expectedAction);
  });
});


const loginUser = {
  username: 'Dubby',
  email: 'jacy@yahoo.com',
};

describe('Login User()', () => {
  const dispatch = jest.fn();
  const successResponse = {
    data: [
      {
        user: loginUser,
        token: 'secret'
      }
    ]
  };

  it('should login user successfully', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: { ...successResponse },
    }));
    await actions.loginRequest()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.REGISTER_BEGIN);
  });
});

describe('Register user()', () => {
  const dispatch = jest.fn();
  const successResponse = {
    data: [
      {
        fistname: "Jacy",
        lastname: "Alexa",
        othernames: "Dubem",
        username: "Dubby",
        phoneNumber: "08076543453",
        email: "jac@yahoo.com",
        password: '567dfghj',
        confirmPassword: "567dfghj"
      }
    ]
  };

  it('should sign up user successfully', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: { ...successResponse },
    }));
    await actions.registerRequest()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.REGISTER_BEGIN);
  });
});


describe('Register user()', () => {
  const dispatch = jest.fn();
  const successResponse = {
    data: [
      {
        fistname: "Jacy",
        lastname: "Alexa",
        othernames: "Dubem",
        username: "Dubby",
        phoneNumber: "08076543453",
        email: "jac@yahoo.com",
        password: '567dfghj',
        confirmPassword: "567dfghj"
      }
    ]
  };

  it('should sign up user successfully', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: { ...successResponse },
    }));
    await actions.registerRequest()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.REGISTER_BEGIN);
  });
});