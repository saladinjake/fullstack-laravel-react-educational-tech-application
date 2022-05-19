import * as yup from "yup";

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: validation object for instructor registeration

*/

// const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

//   phone_number: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("Required"),

export const instructorSchema = yup.object({
  first_name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name Required"),
  last_name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name Required"),
  email: yup
    .string()
    .email("Invalid email")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Valid Email Required"),
  phone_number: yup.number()
    .required("Required")
    .positive("No negative number")
    .integer(),
  gender: yup.string().required("Valid Gender Required"),
  date_of_birth: yup.string().required("Valid Date Required"),
  country_id: yup.string().required("Select a Country"),
  industry_id: yup.string().required("Select an industry"),
  biography: yup.string().required("Biography Required"),
  employment_status: yup.string().required("Required"),
  marital_status: yup.string().required("Required"),
  experience_level: yup.string().required("Required"),
  education_level: yup.string().required("Required"),
  degree_obtained: yup.string().required("Required"),
  language: yup.string().required("Required"),
  facebook_url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter facebook url!"
    )
    .required("Required"),
  linkedin_url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter linkedin url!"
    )
    .required("Required"),
  twitter_url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter twitter url!"
    )
    .required("Required"),
  current_employer_name: yup.string().required("Required"),
  current_employer_designation: yup.string().required("Required"),
  previous_employer_name: yup.string().required("Required"),
  previous_employer_designation: yup.string().required("Required"),
});
