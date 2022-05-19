/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform authentication signin
*@params: Object  data
*@usage: async function Attempt(data){ await loginUser(data)}
*/
export const loginUser = async (details) => {
  let request = axios.post("auth/login", details);
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
*@description: api request to perform authentication signup
*@params: Object  data
*@usage: async function Attempt(data){ await registerLearner(data)}
*/
export const registerLearner = async (details) => {
  let request = axios.post("auth/register", details);
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
*@description: api request to perform authentication signup
*@params: Object  data
*@usage: async function Attempt(data){ await registerInstructor(data)}
*/
export const registerInstructor = async (details) => {
  let request = axios.post("teachers/register", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
