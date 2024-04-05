import User from '../Schema/UserSchema.js';
import { validationResult } from 'express-validator';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;




export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
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

        const { email, password, fullName } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, msg: 'Email is already registered.' });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with hashed password
        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullName,
        });

        const data = { user: { id: newUser.id } };
        const token = JWT.sign(data, secretKey, { expiresIn: '3d' });
        res.cookie('token', token, { withCredentials: true, httpOnly: true });

        return res.status(201).json({ status: true, msg: 'Account created successfully.' });
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

        return res.status(200).json({ status: true, msg: 'Login successful.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
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
        console.log(req.body)

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
