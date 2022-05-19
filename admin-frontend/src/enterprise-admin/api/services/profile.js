/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";
import qs from "qs";

export const getLearnerProfile = async () => {
  let request = axios.get("learners/profile");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstructorProfile = async () => {
  let request = axios.get("instructors/my/profile");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const updateLearnerProfile = async (userId, data) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  let request = axios.put(
    `learners/profile/${userId}`,
    qs.stringify(data),
    config
  );
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const updateInstructorProfile = async (userId, data) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  let request = axios.put(
    `instructors/profile/${userId}`,
    qs.stringify(data),
    config
  );
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
