import * as yup from "yup";


var passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})");

export const businessSchema = yup.object({
  // first_name: yup.string().required("First Name Required"),
  // last_name: yup.string().required("Last Name Required"),
  // password: yup.string()
  //   .min(8, "Minimum of eight characters!")
  //   .max(50, "Too Long!")
  //   .required("Required")
  //   .matches(
  //     passwordRegex,
  //     "Password must contain One letter, One Number with a minimum of eight characters"
  //   ),
  // email: yup.string().email("Invalid email").required("Valid Email Required"),
  // phone_number: yup
  //   .number()
  //   .required("Required")
  //   .positive("No negative number")
  //   .integer(),

  // company_phone: yup
  //   .number()
  //   .required("Required")
  //   .positive("No negative number")
  //   .integer(),
  // company_description: yup.string().required("Company Decription Required"),
  // company_name: yup.string().required("Company Name Required"),
  //   country_id: yup.string().required("Select a Country"),
  // industry_id: yup.string().required("Select an industry"),
  // no_of_employees: yup.string().required("Number of employees Required"),
  // type_of_institution: yup.string().required("Institution type  Required"),
  
  // registration_number: yup.string().required("Registration Number Required"),
  // color_theme: yup.string().required("Color Theme Required"),
  // facebook_page: yup
  //   .string()
  //   .matches(
  //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //     "Enter facebook url!"
  //   )
  //   .required("Required"),
  // linkedin_page: yup
  //   .string()
  //   .matches(
  //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //     "Enter linkedin url!"
  //   )
  //   .required("Required"),
  // website: yup
  //   .string()
  //   .matches(
  //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //     "Enter Website url!"
  //   )
  //   .required("Required"),
});

// export const instructorSchema = yup.object({
//   first_name: yup
//     .string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("First Name Required"),
//   last_name: yup
//     .string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Last Name Required"),
//   email: yup
//     .string()
//     .email("Invalid email")
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Valid Email Required"),
//   phone_number: yup
//     .number()
//     .required("Required")
//     .positive("No negative number")
//     .integer(),
//   gender: yup.string().required("Valid Gender Required"),
//   date_of_birth: yup.string().required("Valid Date Required"),
//   country_id: yup.string().required("Select a Country"),
//   industry_id: yup.string().required("Select an industry"),
//   biography: yup.string().required("Biography Required"),
//   employment_status: yup.string().required("Required"),
//   marital_status: yup.string().required("Required"),
//   experience_level: yup.string().required("Required"),
//   education_level: yup.string().required("Required"),
//   degree_obtained: yup.string().required("Required"),
//   language: yup.string().required("Required"),
//   facebook_url: yup
//     .string()
//     .matches(
//       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
//       "Enter facebook url!"
//     )
//     .required("Required"),
//   linkedin_url: yup
//     .string()
//     .matches(
//       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
//       "Enter linkedin url!"
//     )
//     .required("Required"),
//   twitter_url: yup
//     .string()
//     .matches(
//       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
//       "Enter twitter url!"
//     )
//     .required("Required"),
//   current_employer_name: yup.string().required("Required"),
//   current_employer_designation: yup.string().required("Required"),
//   previous_employer_name: yup.string().required("Required"),
//   previous_employer_designation: yup.string().required("Required"),
// });





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
  phone_number: yup
    .number()
    .required("Required")
    .positive("No negative number")
    .integer(),
  
  country_id: yup.string().required("Select a Country"),
  category_id: yup.string().required("Select a category"),
  other_info: yup.string().required("Other information"),
 
  experience_level: yup.string().required("Required"),
  // previous_institutions: yup.array().required("Required"),
  // niche_courses: yup.string().required("Required")
  
});
export const courseSchema = yup.object({
  course_name: yup.string().required("Required"),
  learning_style: yup.string().required("Required"),
  duration: yup.string().required("Required"),
  language_id: yup.number().required("Required"),
  certificate_id: yup.number().required("Required"),
  category_id: yup.number().required("Required"),
  // course_description: yup.string().required("Required"),
  course_code:yup.string().required("Required"),
  price: yup.string().required("Required"),
  // course_thumbnail: yup.mixed().required(),
  business_id: yup.number().required("Required"),
  introduction_video: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter introduction video url!"
    )
    .required("Required"),
  start_date: yup.string().required("Required"),
  end_date: yup.string().required("Required"),
  enrollment_start: yup.string().required("Required"),
  enrollment_end: yup.string().required("Required"),
  // course_overview: yup.string().required("Required"),
  // prerequisite_course: yup.string().required("Required"),
  entrance_exam: yup.number().required("Required"),
  license: yup.string().required("Required"),
  overall_grade_range: yup.number().required("Required"),
  grace_period_on_deadline: yup.string().required("Required"),
  // course_cover_image: yup.mixed().required(),
  // intructor_ids:yup.mixed().required(),
  //instructor_id
  //instructors
});

export const learnerSchema = yup.object({
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
  middle_name: yup.string().required("Middle Name Required"),
  username: yup.string().required("Middle Name Required"),
  phone_number: yup
    .number()
    .required("Required")
    .positive("No negative number")
    .integer(),
  gender: yup.string().required("Valid Gender Required"),
  date_of_birth: yup.string().required("Valid Date Required"),
  country_id: yup.string().required("Select a Country"),
  biography: yup
    .string("Must be a String")
    .required("Biography Required")
    .nullable(),
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
});
