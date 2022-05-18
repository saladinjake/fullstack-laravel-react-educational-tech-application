import {
  GET_COURSES,
  COURSE_ERROR,
  SET_LOADING
} from "./types";


export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
