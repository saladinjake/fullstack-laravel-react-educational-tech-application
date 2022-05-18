/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const enrollCourses = async (data) => {
  let request = axios.post("enrollments/enrol",data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};