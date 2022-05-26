/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";

export const enrollCourses = async (data) => {
  let request = axios.post("enrollments/enrol/learnerEnrolMultiple",data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const checkoutCourses = async (data) => {
  let request = axios.post("checkout", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};