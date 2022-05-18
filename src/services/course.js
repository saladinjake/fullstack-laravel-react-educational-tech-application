/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const getCourses = async () => {
  let request = axios.get("courses");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const getCourse = async (id) => {
  let request = axios.get(`courses/${id}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
