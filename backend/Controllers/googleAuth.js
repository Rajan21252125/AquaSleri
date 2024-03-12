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
      return res.status(401).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(sub, 10);
    const newUser = await Users.create({
      fullName: name,
      email,
      password: hashedPassword,
      image: picture
    });
    const data = {
      user: {
          id: newUser.id,
          email: newUser.email
      }
  };
    const token = jwt.sign(
      data,
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(201).json({ user: { fullName: newUser.name }, token });
  } catch (error) {
    console.log(error);
  }
};

export const googleLogin = async (req, res) => {
  const { email, name, sub } = jwt.decode(req.body.accessToken);

  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      sub,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const data = {
      user: {
          id: existingUser._id,
          email: existingUser.email
      }
  };
    const token = jwt.sign(
      data,
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ user: { name: existingUser.name }, token });
  } catch (error) {
    console.log(error);
  }
};