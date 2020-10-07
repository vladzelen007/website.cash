import axios from "axios";
import Cookie from 'js-cookie';
import config from '../config';  

export const STRAPI_API_URL = config.strapi.api_url;


export const getSocialLinks = () => {
  return new Promise((resolve, reject) => {
    axios
    .get(`${STRAPI_API_URL}/links`, {
      headers: {
        Authorization: `Bearer ${Cookie.get('token')}`,
      },
    })
    .then((res) => {
      resolve(res)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const payeerCallback = (query) => {
  return new Promise((resolve, reject) => {
    axios
    .get(`${STRAPI_API_URL}/payeercallback${query}`)
    .then((res) => {
      resolve(res)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const updateMe = (data) => {
  return new Promise((resolve, reject) => {
    axios
    .put(`${STRAPI_API_URL}/users/me`, data, {
      headers: {
        Authorization: `Bearer ${Cookie.get('token')}`
      }
    })
    .then(res => {
      resolve(res)
    })
    .catch(error => {
      reject(error)
    })
  })
}

export const isAuth = (token) => {
  return new Promise((resolve, reject) => {
    axios
    .get(`${STRAPI_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
     resolve(res)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const login = (identifier, password) => {
  return new Promise((resolve, reject) => {
    axios
    .post(`${STRAPI_API_URL}/auth/local`, { identifier, password })
    .then((res) => {
      Cookie.set("token", res.data.jwt);
      resolve(res);
    })
    .catch((error) => {
      reject(error.response);
    });
  }) 
}

export const registerUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    axios
    .post(`${STRAPI_API_URL}/auth/local/register`, { username, email, password })
    .then((res) => {
      Cookie.set("token", res.data.jwt);
      resolve(res);
    })
    .catch((error) => {
      reject(error.response)
    })
  })
}

export const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    axios
    .post(`${STRAPI_API_URL}/auth/forgot-password`, { email })
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error.response);
    })
  })
}

export const resetPassword = (code, password, passwordConfirmation) => {
  return new Promise((resolve, reject) => {
    axios
    .post(`${STRAPI_API_URL}/auth/reset-password`, {
      code: code,
      password: password,
      passwordConfirmation: passwordConfirmation
    })
    .then(res => {
      resolve(res)
    })
    .catch(error => {
      reject(error.response)
    })
  })
}

export const logout = () => {
  Cookie.remove("token");
}

export const sendEmailWithUsersInfo = (username, email, password) => {
  return new Promise((resolve, reject) => {
    axios
    .post(`${STRAPI_API_URL}/sendmail`, { username, email, password })
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
  }) 
}


export const getPaymentUrls = (payToken) => {
  return new Promise((resolve, reject) => {
    axios
    .get(`${STRAPI_API_URL}/payeer/${payToken}`)
    .then((res) => {
     resolve(res)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const paymentCallback = (params) => {
  return new Promise((resolve, reject) => {
    axios
    .get(`${STRAPI_API_URL}/payeer/`)
    .then((res) => {
     resolve(res)
    })
    .catch((error) => {
      reject(error)
    })
  })
}


// export const updateUser = (token) => {
//   return new Promise((resolve, reject) => {
//     axios
//     .put(`${STRAPI_API_URL}/users/`)
//     .then((res) => {
//      resolve(res)
//     })
//     .catch((error) => {
//       reject(error)
//     })
//   })
// }