/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const getAuthProfile = () => {
  let request = axios.get("enrollments/me");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
