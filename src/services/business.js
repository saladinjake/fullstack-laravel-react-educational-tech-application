/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const getInstitutions = async () => {
  let request = axios.get("business/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstitution = async (userId) => {
  let request = axios.get(`business/${userId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
