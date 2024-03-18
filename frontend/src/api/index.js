import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });



export const signUp = (formData) => API.post(`/users/signup`, formData , { withCredentials: true });
export const login = (formData) => API.post(`/users/login`, formData , { withCredentials: true });
export const logout = () => API.get(`/users/logout`, { withCredentials: true });
export const googleLogin = (credentials) => API.post(`/users/googlelogin`, {accessToken : credentials} , { withCredentials: true });
export const googleSignup = (credentials) => API.post(`/users/googlesignup`, {accessToken : credentials} , { withCredentials: true });
export const userId = (id) => API.get(`/users/${id}`);
export const userData = () => API.post(`/users/auth/userDetail`,{}, { withCredentials: true });
export const uploadImage = (data) => API.post(`/users/upload`, data ,{ withCredentials: true });
export const updateUser = (data) => API.put(`/users/updateUser`, data ,{ withCredentials: true });

  
// Authorization
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("id")) {
//     const token = JSON.parse(localStorage.getItem("id"));
//     req.headers.authorization = `Bearer ${token}`;
//   }
//   return req;
// });