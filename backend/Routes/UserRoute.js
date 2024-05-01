import express from 'express';
import { validateSignup , validateLogin } from '../Middleware/validation.js';
import { login, signup, getAllUser, getUserDetail, updateUserDetail, userLogout, activationAccount, resendVerification } from '../Controllers/user.js';
import { googleLogin, googleSignUp } from '../Controllers/googleAuth.js';
import auth from '../Middleware/auth.js';
import { uploadImage } from '../Controllers/imageUpload.js';
import upload from '../Middleware/multer.js';
import { getProductById } from '../Controllers/product.js';

const route = express.Router();

// Get all users
route.get('/', getAllUser);

// Signup route with validation middleware
route.post('/signup', validateSignup, signup);

// Login route
route.post('/login', validateLogin, login);


// logout
route.get('/logout', auth , userLogout )



// google login
route.post('/googlelogin', googleLogin);


// google signup
route.post('/googlesignup', googleSignUp);



// get user detail
route.post('/auth/userDetail', auth, getUserDetail)




// upload a image
route.post('/upload' , upload.single('image') ,uploadImage);



// update user
route.put('/updateUser', auth, updateUserDetail);



// to get a product by ID
route.get("/product/:id", getProductById);





// activate user
route.get('/activate/:token', activationAccount);



// resend email verification
route.post('/resend-verification', resendVerification)



export default route;
