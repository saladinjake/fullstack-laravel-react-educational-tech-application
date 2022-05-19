/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: get request for industries table list
*@params: null
*@usage: async function Attempt(data){ await getIndustries()}
*/
export const getIndustries = () => {
  let request = axios.get("industries");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
