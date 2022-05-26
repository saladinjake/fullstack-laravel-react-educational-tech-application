/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform authentication signup
*@params: Object  data
*@usage: async function Attempt(data){ await registerInstructor(data)}
*/
export const getInstitutions = async () => {
  let request = axios.get("business/activeProfiles");
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
*@description: api request to perform institution fetch
*@params: int  id
*@usage: async function Attempt(data){ await getInstitution(data)}
*/

export const getInstitution = async (userId) => {
  let request = axios.get(`business/${userId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
