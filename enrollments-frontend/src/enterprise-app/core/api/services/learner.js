/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform token authourization
*@params: null
*@usage: async function Attempt(data){ await getAuthProfile()}
*/
export const getAuthProfile = () => {
  let request = axios.get("enrollments/me");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
