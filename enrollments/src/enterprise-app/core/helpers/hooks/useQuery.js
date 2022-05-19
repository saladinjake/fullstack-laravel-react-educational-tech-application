import { useLocation } from "react-router-dom";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: url query hook function

*/

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
