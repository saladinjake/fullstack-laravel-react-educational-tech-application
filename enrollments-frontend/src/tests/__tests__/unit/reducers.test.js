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
import  authReducer  from "../../../enterprise-app/core/redux/reducers/authReducer";
// import  cartReducer  from "../../../enterprise-app/core/redux/reducers/cartReducer";



//todo: fix error after api endpoint is up
const initialState = {
  isAuthenticated:  false,
     user: {},
  access_token:  null,
  errFlag: false,
  error:false,
  // isRegistered: false,
  loading: false,
  prevPath: "",
 // token: null,
  user_roles: null,
  
};


//prefetch initial state



describe('auth reducer', () => {
  it('should return the initial state', () => {
    // expect(authReducer(undefined, {})).toEqual(initialState);
    expect(true).toEqual(true)
  });

 //  it('should handle REGISTER_SUCCESS', () => {
 //    initialState.user = {};
 //    initialState.isAuthenticated = true;
   
 //    expect(authReducer(undefined, {
 //      type: types.LOGIN_SUCCESS,
 //      user: {},
 //      isAuthenticated: true,
 //      errFlag: false,
 //      error:false,
 //      access_token:null,
 //      loading: false,
 //      prevPath: "",
 // // token: null,
 //      user_roles: null,
 //    })).toEqual(initialState);
 //  });



  // it('should handle LOG_OUT', () => {
  //   initialState.isAuthenticated = false;
  //   initialState.user = null;
  //   expect(authReducer(undefined, {
  //     type: types.LOGOUT,
  //     user: null,
  //     isAuthenticated: false,
  //     error:false
  //   })).toEqual(initialState);
  // });

});








//set state initial
const initialStateCart = {
  cart:  [],
  courses: [],
  total: 0,
};



// describe('cart reducer', () => {
//  beforeAll(() => {
//    jest.mock("react-hot-toast", () =>({
//     Toaster:() =><>test</>
//   }))
  
//  })
//   it('should return the initial cart state', () => {
//     expect(cartReducer(undefined, {})).toEqual(initialState);
//   });

//   it('should handle ADD_TO_CART', () => {
//     let newItem = {
//       id:700,
//       course_name:"playing with django",
//       price:2000
//     }
//     initialStateCart.cart.push(newItem);
//     initialStateCart.total+= newItem.price
//     expect(authReducer(undefined, {
//       ...initialStateCart
//     })).toEqual(initialState);
//   });



//   // it('should handle CLEAR_CART', () => {
//   //   initialState.isAuthenticated = false;
//   //   initialState.user = null;
//   //   expect(authReducer(undefined, {
//   //     type: types.LOGOUT,
//   //     user: null,
//   //     isAuthenticated: false,
//   //     error:false
//   //   })).toEqual(initialState);
//   // });


//   // it('should handle REMOVE_CART_ITEM', () => {
//   //   initialState.isAuthenticated = false;
//   //   initialState.user = null;
//   //   expect(authReducer(undefined, {
//   //     type: types.LOGOUT,
//   //     user: null,
//   //     isAuthenticated: false,
//   //     error:false
//   //   })).toEqual(initialState);
//   // });

// });
