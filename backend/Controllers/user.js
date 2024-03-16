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
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ msg: result.errors[0].msg });
    }

    const { email, password, fullName } = req.body;
    if (await User.findOne({ email })) {
        return res.status(400).json({ msg: 'User already exists.' });
    }

    try {
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with hashed password
        const user = await User.create({
            email,
            password: hashedPassword,
            fullName,
        });

        const data = {
            user: {
                id: user.id,
                email: user.email
            }
        };
        const token = JWT.sign(data, secretKey);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ msg: error.errors[0].msg });
    }
    const { email, password } = req.body;

    try {
        // Check if the email is an email
        const user = await User.findOne({ email: email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ msg: 'This E-Mail id is not registered' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Invalid password.' });
        }

        // If email and password are correct, generate JWT token
        const data = {
            user: {
                id: user.id,
                email: user.email
            }
        };
        const token = JWT.sign(data, secretKey);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
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
        const hashedPassword = await bcrypt.hash(password, 10);
        // Find the user by ID and update the fields
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { fullName, hashedPassword, image },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        return res.status(200).json({ msg: 'Update Successfully!', user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};
