import  {combineReducers} from 'redux';
// import all reducer files
import coursesReducer from './coursesReducer';
import cartReducer from "./cartReducer";
import authReducer from './authReducer';


/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: reducer for authentication
*@params: Object  reducers
*@usage: async function combineReducers({...allreducers})
*/
export default combineReducers({
    course: coursesReducer,
    cart:cartReducer,
    auth:authReducer
});

