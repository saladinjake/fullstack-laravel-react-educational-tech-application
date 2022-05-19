/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform fetch for countries
*@params: null
*@usage: async function Attempt(data){ await getCountries()}
*/
export const getCountries = () => {
  let request = axios.get("countries");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
