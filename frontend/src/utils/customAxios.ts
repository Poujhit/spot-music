import axios from "axios";

const customAxios = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
  headers: {
    Authorization: window.localStorage.getItem("spot-token")
      ? `Bearer ${window.localStorage.getItem("spot-token")}`
      : undefined, // this will be undefined initially(when this instance is created)
    // when user is logged out coz this file be excecuted once only when loading. It is not bound by the reactive scope
    // of solidjs. So the flow is like this
    // when user is logged out - he needs to go to login again. When logged out, authorisation token is empty string
    // so customAxios will not have any headers set according to the above logic
    // After logging in we are setting the headers by setting like this axiosInstance.defaults.headers.Authorization
    // in AuthPage.tsx (see the login onClick function)

    // When the user is logged in, the token is available, so authorisation is set when this instance is created.
  },
});

export default customAxios;
