/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";

export const getCategories = () => {
  let request = axios.get("categories");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const getCertificates = () => {
  let request = axios.get("certificates");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
