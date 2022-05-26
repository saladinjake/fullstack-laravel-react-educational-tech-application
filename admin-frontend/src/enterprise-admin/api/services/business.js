/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";

export const getInstitutions = async () => {
  let request = axios.get("business/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getBusiness = async () => {
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




export const activateBusiness = async (userId) => {
  let request = axios.get(`business/${userId}/activate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const pendBusiness = async (userId) => {
  let request = axios.get(`business/${userId}/pending`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const deactivateBusiness = async (userId) => {
  let request = axios.get(`business/${userId}/deactivate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
