/*@testCases: test individual actions
 *@testType: unit test
 *@testCategory: simple
 *@author: saladinjake victor
 *@company: Ficticious EMS
 *@date" 5/20/2022
*/

import React from "react"
import ReactDOM from 'react-dom';
import { 
  BrowserRouter , 
  Switch, 
  Route 
} from "react-router-dom";
import { shallow , mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import * as types from '../../../enterprise-app/core/redux/actions/types';
import * as authActions from "../../../enterprise-app/core/redux/actions/authActions";
import * as cartActions from "../../../enterprise-app/core/redux/actions/cartActions";

// we need this to test for redux actions or reducers
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';


// configure adapter
configure({ adapter: new Adapter() });
window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//simple action use case test
describe('login actions', () => {
  it('handles login', () => {
    const user = {};
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      user
    };
    expect(authActions.setLogin(user)).toEqual(expectedAction);
  });
});


//simple action use case test
describe('register actions', () => {
  it('handles registration', () => {
    const user = {
      user: {}
    };

    const expectedAction = {
      type:  types.REGISTER_SUCCESS,
      user
    };

    expect(authActions.setRegister(user)).toEqual(expectedAction);
  });
});



//aUTH ACTION ASYNC

// learn to mock data by not disturbing the real databases
const loginUser = {
  username: 'saladinjake',
  email: 'jayboy@yakk.com',
};

describe('Login A User via the async api request caller', () => {
  const dispatch = jest.fn(); // mock dispatcher
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
    // call the asyn request to make the api call
    await authActions.login()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.LOGIN_SUCCESS);
  });
});

describe('Mock loading action', () => {
  const dispatch = jest.fn(); // mock dispatcher
  it('should show loading implementation say after a btn click event', async () => {
    // mockAxios.post.mockImplementationOnce(() => Promise.resolve({
    //   data: {  },
    // }));
    // call the asyn request to make the api call
    await authActions.setLoading()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.SET_LOADING);
  });
});



describe('Mock set previous path', () => {
  const dispatch = jest.fn(); // mock dispatcher
  const historyLocation ={
    previousPath:"/cart",
  }
  it('should set initial part of a page prior to the login visited page so as to redirect to previous page', async () => {
    
    // call the asyn request to make the api call
    await authActions.setPrevPath(historyLocation)(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    // console.log(dispatch.mock.calls[0][0])
    expect(dispatch.mock.calls[0][0].type).toEqual(types.SET_PATH);
    expect(dispatch.mock.calls[0][0].payload).toEqual(historyLocation);
  });
});





describe('Logout', () => {
  const dispatch = jest.fn(); // mock dispatcher
  
  it('should set initial part of a page prior to the login visited page so as to redirect to previous page', async () => {
    
    // call the asyn request to make the api call
    await authActions.logOut()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    // console.log(dispatch.mock.calls[0][0])
    expect(dispatch.mock.calls[0][0].type).toEqual(types.LOGOUT);

  });
});











//CART ACTIONS ASYNC



describe('cLEAR CART', () => {
  const dispatch = jest.fn(); // mock dispatcher
  it('should show loading implementation say after a btn click event', async () => {
    
    // call the asyn request to make the api call
    await cartActions.clearCart()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.CLEAR_CART);
  });
});




describe('sUB QUANTITY', () => {
  const dispatch = jest.fn(); // mock dispatcher
  it('should show loading implementation say after a btn click event', async () => {
    
   let id= 3
   
  
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      id: id  ,
    }));
    // call the asyn request to make the api call
    await cartActions.subQuantity(id)(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.SUB_QUANTITY);
   expect(dispatch.mock.calls[0][0].payload).toEqual(3);
  
  });
});




describe('REMOVEFROMCART', () => {
  const dispatch = jest.fn(); // mock dispatcher
  let cart =[
    {
      id:4,
      name:"Learning Laravel"
    },
    {
      id:7,
      name:"Learning Symfony"
    },
    {
      id:9,
      name:"Learning Laravel"
    }
  ]
  it('should show loading implementation say after a btn click event', async () => {
    cart  = cart.splice(0,1); //the removed result
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: {cart  },
    }));
    // call the asyn request to make the api call
    await cartActions.removeFromCart(cart)(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.REMOVE_FROM_CART);
    
    expect(dispatch.mock.calls[0][0].payload).toEqual(cart);
  
  });
});














describe('Fetch Courses', () => {
  const dispatch = jest.fn();
  const successResponse = {
    data: [
      {
        coursename: "Python Programming",
        course_id: "3",
        description: "this is a demo description",
        overview: "hello baby",
        topics: [
        "introduction to python",
        "data types in python",
        "basic syntax",
        "loops and conditions",
        "operations in python"

        ],
        
      }
    ]
  };

  it('should sign up user successfully', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: { ...successResponse },
    }));
    //uncomment the codes below only when backend api is up and running
    //await cartActions.fetchCourses()(dispatch);
    //expect(dispatch).toHaveBeenCalledTimes(1);
    //expect(dispatch.mock.calls[0][0].type).toEqual(types.GET_COURSES);
     //expect(dispatch.mock.calls[0][0].payload).toEqual(successResponse);
  
  });
});
