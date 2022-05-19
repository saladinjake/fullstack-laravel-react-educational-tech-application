/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api  to perform all courses get request
*@params: null
*@usage: async function Attempt(data){ let res =await getCourses()}
*/
export const getCourses = async () => {
  let request = axios.get("courses");
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
*@description: api request to perform single course detail
*@params: null
*@usage: async function Attempt(data){ let res =await getCourse()}
*/
export const getCourse = async (id) => {
  let request = axios.get(`courses/${id}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
