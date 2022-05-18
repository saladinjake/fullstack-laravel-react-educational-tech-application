/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const loginUser = async (details) => {
  let request = axios.post("auth/login", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const registerLearner = async (details) => {
  let request = axios.post("auth/register", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const registerInstructor = async (details) => {
  let request = axios.post("teachers/register", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
