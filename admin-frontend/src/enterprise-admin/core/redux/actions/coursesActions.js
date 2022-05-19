import {
  GET_COURSES,
  COURSE_ERROR,
  SET_LOADING
} from "./types";
import { getCourses } from "../../../api/services/course";

export const fetchCourses = () => async (dispatch) => {
  try {
    await setLoading();
    const res = await getCourses();
    dispatch({
      type: GET_COURSES,
      payload: res.data.data.courses,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: "An Error occured",
    });
  }
};

export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
