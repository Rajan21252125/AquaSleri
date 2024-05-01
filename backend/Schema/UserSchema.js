import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    default: ""
  },
  createdAt : {
    type: Date,
    default: new Date()
  },
  addresses:[
    {
      country: {
        type: String,
      },
      city:{
        type: String,
      },
      address1:{
        type: String,
      },
      address2:{
        type: String,
      },
      zipCode:{
        type: Number,
      },
      addressType:{
        type: String,
      },
    }
  ],
  isVerified : {
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    default: "user",
  },
});

const User = model('User', userSchema);

export default User;
