/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const getInstructors = async () => {
  let request = axios.get("teachers/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstructor = async (userId) => {
  let request = axios.get(`teachers/${userId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstructorValues = async () => {
  let request = axios.get("teachers/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

