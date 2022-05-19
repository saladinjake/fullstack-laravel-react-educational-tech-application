import  {combineReducers} from 'redux';
import coursesReducer from './coursesReducer';
import cartReducer from "./cartReducer";
import authReducer from './authReducer';


export default combineReducers({
    course: coursesReducer,
    cart:cartReducer,
    auth:authReducer
});

