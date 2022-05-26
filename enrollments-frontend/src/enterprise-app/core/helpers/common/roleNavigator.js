/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: role navigator function

*/

const roleNavigator = (role) => {
  let route;
  switch (role) {
    case "Admin":
      route = "/admin";
      break;
    case "Instructor":
      route = "/instructor";
      break;
    case "User":
      route = "/courses/display";
      break;
    default:
      route = "/login";
  }
  return route;
};
export default roleNavigator;
