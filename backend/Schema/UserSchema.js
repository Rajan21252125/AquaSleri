import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    default: ""
  }
});

const User = model('User', userSchema);

export default User;
