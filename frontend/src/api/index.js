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
export const getProductById = (id) => API.get(`/users/product/${id}`);
export const addFeedback = (data) => API.post('/feedback/add' , data );




export const addProduct = (data) => API.post('/admin/add' , data , { withCredentials: true } )
export const addMultiImage = (data) => API.post('/admin/multiImage' , data , { withCredentials: true })
export const getProductList = () => API.get('/admin/view')
export const deleteProduct = (id) => API.delete('/admin/delete/' + id)
export const updateProduct = (data,id) => API.put('/admin/update/'+id , data)
export const users = () => API.get('/users/' , { withCredentials: true })
export const deleteSingleImage = (id, imageUrl) => API.delete(`/admin/deleteImage/${id}`, { data: { imageUrl } });
export const getFeedback = () => API.get('/feedback/view')
export const deleteFeedback = (id) => API.delete('/feedback/delete/' + id)
export const getUserCart = () => API.get('/cart/admin/view/',{ withCredentials: true })
// get user by id
export const getUserById = (id) => API.get('/users/user/' + id , { withCredentials: true })




// activate account 
export const activateAccount = (token) => API.get('/users/activate/' + token);




// cart
export const addToCartApi = (cartItems) => API.post('/cart/add' , {cartItems} , { withCredentials: true } )
export const viewCart = () => API.get('/cart/view', { withCredentials: true });
export const deleteCartItem = (productId) => API.delete(`/cart/delete/${productId}`, { withCredentials: true });
export const deleteOneCartItem = (productId) => API.delete(`/cart/deleteOne/${productId}` , { withCredentials: true });
export const clearCart = () => API.delete('/cart/clearCart' , { withCredentials: true });








// paymemt 
export const orderapi = (amount) => API.post('/payment/payment',{amount},{withCredentials : true})
export const verifyPayment = (paymentDetails) => API.post('/payment/verify', paymentDetails, { withCredentials: true });




// order
export const createOrder = (orderDetails) => API.post('/order/create-order', orderDetails, { withCredentials: true });
export const getAllOrders = () => API.get('/order/admin/get-orders',{withCredentials:true})
export const getOrdersById = () => API.get('/order/get-order',{withCredentials:true})
export const updateOrder = (id,status) => API.put('/order/admin/updateOrder/'+ id, {status} , {withCredentials:true})
export const getOrderByOrderId = (id) => API.get('/order/order-page/order/'+ id, {withCredentials:true})