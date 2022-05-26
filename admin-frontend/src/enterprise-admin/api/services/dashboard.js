/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";

export const getLearnerInfo = async (userId) => {
  let request = axios.get(`search/courses/counter/${userId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const getDashboardInfo = async () => {
  let request = axios.get(`/search/counters/superadminDashboard`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


