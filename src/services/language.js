/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const getLanguages = () => {
  let request = axios.get("languages");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
