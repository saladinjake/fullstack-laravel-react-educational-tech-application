/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";
import qs from "qs";

export const getCourses = async () => {
  let request = axios.get("courses",{ crossdomain: true });
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getLearners = async () => {
  let request = axios.get("learners",{ crossdomain: true });
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

// ​/learners​/{userId}
export const getLearnerProfile = async (learnerID) => {
  let request = axios.get(`learners/${learnerID}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstructors = async () => {
  let request = axios.get("instructors");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstructorProfile = async (instructorID) => {
  let request = axios.get(`instructors/${instructorID}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const activateCourse = async (courseId) => {
  let request = axios.put(`courses/${courseId}/activate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const deactivateCourse = async (courseId) => {
  let request = axios.put(`courses/${courseId}/deactivate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const pendCourse = async (courseId) => {
  let request = axios.put(`courses/${courseId}/pending`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

// Business
export const createBusiness = async (data) => {
  let request = axios.post("business/register", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getBusinessDetails = async (businessID) => {
  let request = axios.get(`business/${businessID}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getActiveBusiness = async () => {
  let request = axios.get("business/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getPendingBusiness = async () => {
  let request = axios.get("business/all/pendingProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getDeactivatedBusiness = async () => {
  let request = axios.get("business/all/deactivatedProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const activateBusiness = async (profileId) => {
  let request = axios.put(`business/${profileId}/activate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const deactivateBusiness = async (profileId) => {
  let request = axios.put(`business/${profileId}/deactivate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const deleteBusiness = async (userId) => {
  let request = axios.get(`business/profile/${userId}/delete`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

//Categories

export const getCategories = async () => {
  let request = axios.get("categories");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getParentCategories = async () => {
  let request = axios.get("categories/parent");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const createParentCategory = async (data) => {
  let request = axios.post("categories/parent", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getCategoryDetails = async (categoryId) => {
  let request = axios.get(`categories/${categoryId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const updateParentCategory = async (categoryId, data) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  let request = axios.put(
    `categories/parent/${categoryId}`,
    qs.stringify(data),
    config
  );
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const deleteParentCategory = async (categoryId) => {
  let request = axios.delete(`categories/${categoryId}/delete`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const createSubCategory = async (data) => {
  let request = axios.post("categories/subcategory", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const updateSubCategory = async (categoryId, data) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  let request = axios.put(
    `categories/subcategory/${categoryId}`,
    qs.stringify(data),
    config
  );
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const deleteSubCategory = async (subCategoryId) => {
  let request = axios.delete(`categories/${subCategoryId}/removeSubcategory`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

// /categories/{categoryId}/restore

export const restoreCategory = async (categoryId) => {
  let request = axios.post(`categories/${categoryId}/restore`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


// Certificates

export const getCertificates = async () => {
  let request = axios.get("certificates");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getCertificateDetails = async (certificateId) => {
  let request = axios.get(`certificates/${certificateId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const createCertificate = async (data) => {
  let request = axios.post("certificates/create", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const updateCertificate = async (certificateId, data) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  let request = axios.put(
    `certificates/update/${certificateId}`,
    qs.stringify(data),
    config
  );
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const deleteCetificate = async (certificateId) => {
  let request = axios.delete(`certificates/${certificateId}/delete`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};






export const persistenceCheckExistence = async () => {
  let request = axios.get("auth/me");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const currentUserInfo = async () => {
  let request = axios.get("auth/my/info");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};