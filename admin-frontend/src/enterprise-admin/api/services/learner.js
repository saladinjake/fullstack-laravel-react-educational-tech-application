/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";

export const getAuthProfile = () => {
  let request = axios.get("enrollments/me");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const activateLearner = (userId) => {
	let request = axios.put(`learners/${userId}/activate`)
	return request.then((response)=>{
		if (response.status===200) {
			return response && response
		}
	})
}


export const deactivateLearner = (userId) => {
	let request = axios.put(`learners/${userId}/deactivate`)
	return request.then((response)=>{
		if (response.status===200) {
			return response && response
		}
	})
}


export const deleteLearner = (userId) => {
	let request = axios.delete(`learners/${userId}/delete`)
	return request.then((response)=>{
		if (response.status===200) {
			return response && response
		}
	})
}



export const upgradeLearner = (userId) => {
	let request = axios.patch(`learners/${userId}/upgrade`)
	return request.then((response)=>{
		if (response.status===200) {
			return response && response
		}
	})
}




export const getActiveLearners = () => {
  let request = axios.get("learners/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

// export const getPendingLearners = () => {
//   let request = axios.get("enrollments/me");
//   return request.then((response) => {
//     if (response.status === 200) {
//       return response && response;
//     }
//   });
// };


export const getDeactivatedLearners = () => {
  let request = axios.get("learners/deactivatedProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

