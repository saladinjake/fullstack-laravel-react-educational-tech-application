/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";

export const getNotifications = async (data) => {
  let request = axios.get("notifications", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


