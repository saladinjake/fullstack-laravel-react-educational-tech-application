/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform all instructors profile fetch
*@params: null
*@usage: async function Attempt(data){ await getInstructors()}
*/
export const getInstructors = async () => {
  let request = axios.get("teachers/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform instructor details
*@params: null
*@usage: async function Attempt(data){ await getInstructor()}
*/
export const getInstructor = async (userId) => {
  let request = axios.get(`teachers/${userId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform instructor profile fetch
*@params: null
*@usage: async function Attempt(data){ await getInstructorValues()}
*/

export const getInstructorValues = async () => {
  let request = axios.get("teachers/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

