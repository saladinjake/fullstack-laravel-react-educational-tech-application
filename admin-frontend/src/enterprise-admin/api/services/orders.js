
import axios from "./axiosConfig";
export const getOrders = () => {
    let request = axios.get("course/orders");
    return request.then((response) => {
      if (response.status === 200) {
        return response && response;
      }
    });
  };
  


  export const getOrder = (orderId) => {
    let request = axios.get(`course/order/${orderId}`);
    return request.then((response) => {
      if (response.status === 200) {
        return response && response;
      }
    });
  };


  export const getBundleOrders = () => {
    let request = axios.get("bundle/orders");
    return request.then((response) => {
      if (response.status === 200) {
        return response && response;
      }
    });
  };


  export const getBundleOrder = (id) => {
    let request = axios.get(`bundle/order/${id}`);
    return request.then((response) => {
      if (response.status === 200) {
        return response && response;
      }
    });
  };