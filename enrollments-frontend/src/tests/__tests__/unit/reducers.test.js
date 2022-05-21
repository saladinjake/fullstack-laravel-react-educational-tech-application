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



//todo: fix error after api endpoint is up
const initialState = {
  isAuthenticated:  false,
  user:  null,
  access_token:  null,
  errFlag: false,
  error:false,
  // isRegistered: false,
  loading: false,
  prevPath: "",
 // token: null,
  user_roles: null,
  
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REGISTER_SUCCESS', () => {
    initialState.user = {};
    initialState.isAuthenticated = true;
   
    expect(authReducer(undefined, {
      type: types.LOGIN_SUCCESS,
      user: {},
      isAuthenticated: true,
      errFlag: false,
      error:false,
      access_token:null,
      loading: false,
      prevPath: "",
 // token: null,
      user_roles: null,
    })).toEqual(initialState);
  });



  it('should handle LOG_OUT', () => {
    initialState.isAuthenticated = false;
    initialState.user = null;
    expect(authReducer(undefined, {
      type: types.LOGOUT,
      user: null,
      isAuthenticated: false,
      error:false
    })).toEqual(initialState);
  });

});