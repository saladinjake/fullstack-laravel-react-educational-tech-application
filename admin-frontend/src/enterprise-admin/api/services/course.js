/* eslint-disable no-unused-vars */
import axios from "./axiosConfig";
import qs from "qs";

export const getCourses = async () => {
  let request = axios.get("courses");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const getActivatedCourses = () => {
  let request = axios.get("courses/activeCourses");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getDeactivatedCourses = () => {
  let request = axios.get("courses/deactivatedCourses");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const getCourse = async (id) => {
  let request = axios.get(`courses/${id}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const createCourse = async (details) => {
  let request = axios.post("courses/create", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const updateCourse = async (courseId,data) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "_method":"PUT"
    },
  };

  let request = axios.put(
    `courses/${courseId}`, 
    qs.stringify(data),
    // data,
    config

    )
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const sendFeaturedCourses = async (details) => {
   let request = axios.post("courses/topPicks", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
}








export const getBundles = () => {
  let request = axios.get("bundles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getBundle = (bundleId) => {
  let request = axios.get(`bundles/${bundleId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const createBundles = async (details) => {
   let request = axios.post("bundles/create", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
}


export const getActivatedBundles= () => {
  let request = axios.get("bundles/activeBundles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getDeactivatedBundles = () => {
  let request = axios.get("bundles/deactivatedBundles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const activateBundles= (bundleId) => {
  let request = axios.put(`bundles/${bundleId}/activate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const deactivateBundles = (bundleId) => {
  let request = axios.put(`bundles/${bundleId}/deactivate`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const deleteBundles = (bundleId) => {
  let request = axios.put(`bundles/${bundleId}/delete`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
