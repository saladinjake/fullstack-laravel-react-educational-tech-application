
  
import axios from "./axiosConfig";
  
  export const getBundlesPaymentDetail = (orderId) => {
    let request = axios.get(`bundles/payments/${orderId}`);
    return request.then((response) => {
      if (response.status === 200) {
        return response && response;
      }
    });
  };


  export const getCoursesPaymentHistory = () => {
    let request = axios.get("courses/payments");
    return request.then((response) => {
      if (response.status === 200) {
        return response && response;
      }
    });
  };



  export const getCoursesPaymentDetail= (orderId) => {
    let request = axios.get(`course/order/${orderId}`);
    return request.then((response) => {
      if (response.status === 200) {
        return response && response;
      }
    });
  };


  export const getBundlesPaymentHistory= () => {
    let request = axios.get("bundles/payments");
    return request.then((response) => {
      if (response.status === 200) {
        return response && response;
      }
    });
  };