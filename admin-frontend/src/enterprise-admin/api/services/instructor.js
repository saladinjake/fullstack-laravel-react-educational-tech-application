/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";

export const getInstructors = async () => {
  let request = axios.get("instructors/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstructor = async (userId) => {
  let request = axios.get(`instructors/${userId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getAuthProfile = async  => {
  let request = axios.get(`instructors/my/profile`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const getInstructorCourses = async () => {
  let request = axios.get("courses/my/courses");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const getActiveInstructors = async () => {
  let request = axios.get("instructors/active/Profiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


// /
export const getPendingInstructors = async () => {
  let request = axios.get("instructors/pending/Profiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


// /

export const getActivated = async (userId) => {
  let request = axios.put(`instructors/${userId}/activate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const getDeactivated = async (userId) => {
  let request = axios.put(`instructors/${userId}/deactivate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const getDeleted = async (userId) => {
  let request = axios.put(`instructors/${userId}/delete`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};





export const upgradeLearner = (userId) => {
  let request = axios.patch(`learners/${userId}/upgrade`)
  return request.then((response)=>{
    if (response.status===200) {
      return response && response
    }
  })
}