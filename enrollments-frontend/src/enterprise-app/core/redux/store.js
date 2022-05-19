import {
 createStore,
 applyMiddleware
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: state manager through out the app
*@params: Object  rootReducer
*@params: Object  initialState
*@params: Function composeWithDevTools
*@usage: <Provider store={store}></Provider>
*/
const initialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;