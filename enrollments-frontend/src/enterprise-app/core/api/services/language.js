/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform language fetch
*@params: null
*@usage: async function Attempt(data){ await getLanguages()}
*/
export const getLanguages = () => {
  let request = axios.get("languages");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
