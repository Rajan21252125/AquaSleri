import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });



export const signUp = (formData) => API.post(`/users/signup`, formData);
export const login = (formData) => API.post(`/users/login`, formData);
export const googleLogin = (credentials) => API.post(`/users/googlelogin`, {accessToken : credentials});
export const googleSignup = (credentials) => API.post(`/users/googlesignup`, {accessToken : credentials});
export const userId = (id) => API.get(`/users/${id}`);
export const userData = (token) => API.get(`/users/auth/userDetail`, { headers: { Authorization: `Bearer ${token}` } });

  
// Authorization
API.interceptors.request.use((req) => {
  if (localStorage.getItem("id")) {
    const token = JSON.parse(localStorage.getItem("id"));
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});