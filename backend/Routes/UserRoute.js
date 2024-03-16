import express from 'express';
import { validateSignup , validateLogin } from '../Middleware/validation.js';
import { login, signup, getAllUser, getUserDetail, updateUserDetail } from '../Controllers/user.js';
import { googleLogin, googleSignUp } from '../Controllers/googleAuth.js';
import auth from '../Middleware/auth.js';
import { uploadImage } from '../Controllers/imageUpload.js';
import upload from '../Middleware/multer.js';

const route = express.Router();

// Get all users
route.get('/', getAllUser);

// Signup route with validation middleware
route.post('/signup', validateSignup, signup);

// Login route
route.post('/login', validateLogin, login);


// google login
route.post('/googlelogin', googleLogin);


// google signup
route.post('/googlesignup', googleSignUp);



// get user detail
route.get('/auth/userDetail', auth, getUserDetail)




// upload a image
route.post('/upload', auth , upload.single('image') ,uploadImage);



// update user
route.put('/updateUser', auth, updateUserDetail);



export default route;