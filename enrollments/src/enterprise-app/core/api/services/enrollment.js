/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform multiple enrolment
*@params: object data
*@usage: async function Attempt(data){ let res =await enrollCourses(data)}
*/
export const enrollCourses = async (data) => {
  let request = axios.post("enrollments/enrol",data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};