import Users from "../Schema/UserSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();



export const googleSignUp = async (req, res) => {
  const { email, name, sub , picture } = jwt.decode(req.body.accessToken);
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(401).json({status: false , message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(sub, 10);
    let role
        if (email === "aquasleri@gmail.com")  return role = "admin";
    const newUser = await Users.create({
      fullName: name,
      email,
      password: hashedPassword,
      image: picture,
      role
    });
    const data = {
      user: {
          id: newUser.id,
      }
  };
    const token = jwt.sign(
      data,
      process.env.JWT_SECRET,
      { expiresIn: 3 * 24 * 60 * 60 }
    );
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({ status: true, msg: 'Login successful.' , role : newUser.role });
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: false , msg: "Internal server issue" });
  }
};

export const googleLogin = async (req, res) => {
  const { email, name, sub } = jwt.decode(req.body.accessToken);

  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({status:false, message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      sub,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({status:false , message: "Incorrect password" });
    }

    const data = {
      user: {
          id: existingUser._id,
      }
  };
    const token = jwt.sign(
      data,
      process.env.JWT_SECRET,
      { expiresIn: 3 * 24 * 60 * 60 }
    );
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({ status: true, msg: 'Login successful.' , role: existingUser.role });
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: false , msg: "Internal server issue" });
  }
};