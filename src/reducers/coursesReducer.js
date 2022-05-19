import {
    GET_COURSES,
    COURSE_ERROR,
    SET_LOADING,
} from '../actions/types';

//state initial
const initialState = {
  courses: [],
  categories: [],
  courseLoading: true,
  error: null,
};

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: reducer for authentication
*@params: Object  state; Object action
*@usage:  dispatch(reducer)
*/
export default (state=initialState,action) => {
    switch(action.type) {
        case GET_COURSES:
            return {
              ...state,
              courses: action.payload,
              courseLoading: false,
            };
        case SET_LOADING:
            return {
              ...state,
              courseLoading: true
            }
        case COURSE_ERROR:
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        default:
            return state;
    }
}