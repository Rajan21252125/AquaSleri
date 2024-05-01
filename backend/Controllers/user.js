import User from '../Schema/UserSchema.js';
import { validationResult } from 'express-validator';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {sendMail} from '../utils/sendEmail.js';
dotenv.config();

const secretKey = process.env.JWT_SECRET;




export const getAllUser = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const signup = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ status: false, msg: result.errors[0].msg });
        }

        const { email, password, fullName , phoneNumber } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, msg: 'Email is already registered.' });
        }

        const existingPhone = await User.findOne({ phoneNumber });
        if (existingPhone) {
            return res.status(400).json({ status: false, msg: 'Phone number is already registered.' });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with hashed password
        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullName,
            phoneNumber
        });


        const activationToken = createActivationToken(newUser);
        const activationUrl = `http://localhost:5173/activation/${activationToken}`;

        try {
            await sendMail({
              email: newUser.email,
              subject: "Activate your account",
              message: `Hello ${newUser.fullName}, please click on the link to activate your account: ${activationUrl}`,
            });
            res.status(201).json({
              status: true,
              msg: `please check your email:- ${newUser.email} to activate your account!`,
            });
          } catch (error) {
            console.log(error);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
          }
        // const data = { user: { id: newUser.id } };
        // const token = JWT.sign(data, secretKey, { expiresIn: '3d' });
        // res.cookie('token', token, { withCredentials: true, httpOnly: true });
        // return res.status(201).json({ status: true, msg: 'Account created successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ status: false, msg: error.errors[0].msg });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, msg: 'Email not found.' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, msg: 'Invalid password.' });
        }

        // Generate JWT token
        const data = { user: { id: user.id } };
        const token = JWT.sign(data, secretKey, { expiresIn: '3d' });
        res.cookie('token', token, { withCredentials: true, httpOnly: true });

        return res.status(200).json({ status: true, msg: 'Login successful.' , isVerified : user?.isVerified });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};




// create activation token
const createActivationToken = (user) => {
    return JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
};


// activate email
export const activationAccount = async (req, res) => {
    try {
      // Extract the activation token from the request parameters
      const { token } = req.params;
      
      // Verify the activation token
      const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
      
      // Extract the user ID from the decoded token
      const { userId } = decodedToken;
      
      // Find the user by ID in the database
      const user = await User.findById(userId);
      
      // If the user is not found, return an error response
      if (!user) {
        return res.status(404).json({ status: false, msg: 'User not found' });
      }
      
      // If the user is already verified, return a msg indicating so
      if (user.isVerified) {
        return res.status(400).json({ status: false, msg: 'User is already verified' });
      }
      
      // Update the user document to set isVerified to true
      user.isVerified = true;
      await user.save();
      console.log(user)
      
      // Redirect or respond with a success msg
      return res.status(200).json({ status: true, msg: 'User account activated successfully' });
    } catch (error) {
      // Handle any errors and return an error response
      console.error(error);
      return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
  };


// resend email verification
export const resendVerification = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Check if the user is already verified
        if (user.verified) {
            return res.status(400).json({ success: false, message: 'User is already verified.' });
        }

        // Generate a new activation token
        const activationToken = createActivationToken(user);
        const activationUrl = `http://localhost:5173/activation/${activationToken}`;

        // Send the verification email
        await sendMail({
            email: user.email,
            subject: 'Activate your account',
            message: `Hello ${user.fullName}, please click on the link to activate your account: ${activationUrl}`,
        });

        return res.status(200).json({ success: true, message: 'Verification email sent successfully.' });
    } catch (error) {
        console.error('Error resending verification email:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};  



// get the user detail 
export const getUserDetail = async (req,res) => {
    try {
        const user = await User.findById(req.user.user.id).select('-password');
        if(!user){
            return res.status(404).json({ msg: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}





// update the user detail
export const updateUserDetail = async (req, res) => {
    try {
        const userId = req.user.user.id;
        const { fullName, password, image } = req.body;

        // Validate input data
        if (!fullName && !password && !image) {
            return res.status(400).json({ msg: 'No fields to update.' });
        }

        // Update fields conditionally based on provided data
        const updateFields = {};
        if (fullName) {
            updateFields.fullName = fullName;
        }
        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }
        if (image) {
            updateFields.image = image;
        }

        // Find the user by ID and update the fields
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        return res.status(200).json({ msg: 'Update Successful!'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};




export const userLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({status: true , msg: 'Logout Successful!' });
    } catch (error) {
        console.log(error)
    }
}
