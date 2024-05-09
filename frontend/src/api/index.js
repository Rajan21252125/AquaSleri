import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });
console.log(API)




export const signUp = (formData) => API.post(`/users/signup`, formData , { withCredentials: true });
export const login = (formData) => API.post(`/users/login`, formData , { withCredentials: true });
export const logout = () => API.get(`/users/logout`, { withCredentials: true });
export const googleLogin = (credentials) => API.post(`/users/googlelogin`, {accessToken : credentials} , { withCredentials: true });
export const googleSignup = (credentials) => API.post(`/users/googlesignup`, {accessToken : credentials} , { withCredentials: true });
export const userId = (id) => API.get(`/users/${id}`);
export const userData = () => API.post(`/users/auth/userDetail`,{}, { withCredentials: true });
export const uploadImage = (data) => API.post(`/users/upload`, data ,{ withCredentials: true });
export const updateUser = (data) => API.put(`/users/updateUser`, data ,{ withCredentials: true });
export const getProductById = (id) => API.get(`/users/product/${id}`);
export const addFeedback = (data) => API.post('/feedback/add' , data );




export const addProduct = (data) => API.post('/admin/add' , data )
export const addMultiImage = (data) => API.post('/admin/multiImage' , data )
export const getProductList = () => API.get('/admin/view')
export const deleteProduct = (id) => API.delete('/admin/delete/' + id)
export const updateProduct = (data,id) => API.put('/admin/update/'+id , data)
export const users = () => API.get('/users/')
export const deleteSingleImage = (id, imageUrl) => API.delete(`/admin/deleteImage/${id}`, { data: { imageUrl } });
export const getFeedback = () => API.get('/feedback/view')
export const deleteFeedback = (id) => API.delete('/feedback/delete/' + id)




// activate account 
export const activateAccount = (token) => API.get('/users/activate/' + token);





// cart
export const addToCartApi = (user,cartItems) => API.post('/cart/add' , {user,cartItems} )
export const viewCart = (id) => API.get('/cart/view/' + id);
export const deleteCartItem = (data) => API.delete('/cart/delete' , { data } );