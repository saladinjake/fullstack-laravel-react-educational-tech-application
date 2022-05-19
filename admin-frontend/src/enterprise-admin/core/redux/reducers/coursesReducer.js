import {
    GET_COURSES,
    COURSE_ERROR,
    SET_LOADING,
} from '../actions/types';

const initialState = {
  courses: [],
  categories: [],
  courseLoading: true,
  error: null,
};

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