/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform categories fetch
*@params: null
*@usage: async function Attempt(data){ await getCategories()}
*/
export const getCategories = () => {
  let request = axios.get("categories");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
